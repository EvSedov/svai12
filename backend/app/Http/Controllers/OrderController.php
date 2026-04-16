<?php

namespace App\Http\Controllers;

use App\Mail\OrderSubmitted;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    public function submitOrder(Request $request)
    {
        $minimumFillMs = (int) env('FORM_MIN_FILL_MS', 1500);
        $turnstileEnabled = filter_var(env('TURNSTILE_ENABLED', false), FILTER_VALIDATE_BOOLEAN);
        $turnstileSecret = (string) env('TURNSTILE_SECRET_KEY', '');

        Log::info('svai12 form submission received.');

        if (config('app.debug')) {
            Log::info('Received data (debug):', $request->except(['description', 'file']));
        }

        $validator = Validator::make($request->all(), [
            'fullName'        => 'required|string|max:255',
            'selectedService' => 'required|string|max:255',
            'phoneNumber'     => 'required|string|max:255',
            'address'         => 'required|string|max:255',
            'description'     => 'nullable|string',
            'discount'        => 'nullable|numeric',
            'website'         => 'nullable|string|max:0',
            'formStartedAt'   => 'required|integer',
            'cf-turnstile-response' => 'nullable|string|max:2048',
            'file'            => 'nullable|file|mimes:pdf,jpg,jpeg,png,webp|max:5120',
        ], [
            'fullName.required' => 'Укажите имя.',
            'selectedService.required' => 'Выберите тип строения.',
            'phoneNumber.required' => 'Укажите телефон.',
            'address.required' => 'Укажите адрес монтажа.',
            'description.string' => 'Описание должно быть текстом.',
            'website.max' => 'Проверка формы не пройдена.',
            'formStartedAt.required' => 'Форма заполнена некорректно. Обновите страницу.',
            'formStartedAt.integer' => 'Форма заполнена некорректно. Обновите страницу.',
            'cf-turnstile-response.string' => 'Проверка безопасности не пройдена.',
            'file.file' => 'Не удалось прочитать прикрепленный файл.',
            'file.mimes' => 'Допустимы только PDF, JPG, JPEG, PNG или WEBP.',
            'file.max' => 'Размер файла не должен превышать 5 МБ.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors'  => $validator->errors(),
            ], 422);
        }

        $validated = $validator->validated();
        $uploadedFile = $request->file('file');
        $elapsed = (int) (round(microtime(true) * 1000) - (int) $validated['formStartedAt']);

        if ($elapsed < $minimumFillMs) {
            Log::warning('Order form rejected due to suspiciously fast submit.', [
                'ip' => $request->ip(),
                'elapsed_ms' => $elapsed,
            ]);

            return response()->json([
                'message' => 'Validation failed.',
                'errors' => [
                    'form' => ['Форма отправлена слишком быстро. Попробуйте еще раз.'],
                ],
            ], 422);
        }

        if ($turnstileEnabled) {
            if ($turnstileSecret === '') {
                Log::error('Turnstile is enabled but secret key is missing.');

                return response()->json([
                    'message' => 'Security verification unavailable.',
                ], 500);
            }

            $turnstileToken = $validated['cf-turnstile-response'] ?? '';

            if ($turnstileToken === '') {
                return response()->json([
                    'message' => 'Validation failed.',
                    'errors' => [
                        'form' => ['Подтвердите, что вы не робот.'],
                    ],
                ], 422);
            }

            try {
                $turnstileResponse = Http::asForm()
                    ->timeout(10)
                    ->post('https://challenges.cloudflare.com/turnstile/v0/siteverify', [
                        'secret' => $turnstileSecret,
                        'response' => $turnstileToken,
                        'remoteip' => $request->ip(),
                    ]);

                $turnstileData = $turnstileResponse->json();
                $turnstileSuccess = (bool) ($turnstileData['success'] ?? false);

                if (!$turnstileResponse->ok() || !$turnstileSuccess) {
                    Log::warning('Turnstile validation failed.', [
                        'ip' => $request->ip(),
                        'status' => $turnstileResponse->status(),
                        'codes' => $turnstileData['error-codes'] ?? [],
                    ]);

                    return response()->json([
                        'message' => 'Validation failed.',
                        'errors' => [
                            'form' => ['Не удалось подтвердить проверку. Обновите форму и попробуйте еще раз.'],
                        ],
                    ], 422);
                }
            } catch (\Throwable $exception) {
                Log::error('Turnstile verification request failed.', [
                    'exception' => $exception,
                ]);

                return response()->json([
                    'message' => 'Security verification unavailable.',
                    'errors' => [
                        'form' => ['Проверка безопасности временно недоступна. Попробуйте еще раз позже.'],
                    ],
                ], 422);
            }
        }

        try {
            $recipient = config('mail.orders_recipient', env('ORDERS_RECIPIENT'));

            Mail::to($recipient)->send(new OrderSubmitted(
                $validated['fullName'],
                $validated['selectedService'],
                $validated['phoneNumber'],
                $validated['address'],
                $validated['description'] ?? '',
                $validated['discount'] ?? null,
                $uploadedFile
            ));

            Log::info('svai12 email sent successfully.');

            return response()->json([
                'message' => 'Order submitted successfully.',
            ]);
        } catch (\Exception $e) {
            Log::error('Mail sending failed: ' . $e->getMessage(), ['exception' => $e]);

            return response()->json([
                'message' => 'Failed to submit order.',
            ], 500);
        }
    }
}
