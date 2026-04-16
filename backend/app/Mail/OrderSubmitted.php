<?php

namespace App\Mail;

use Illuminate\Http\UploadedFile;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class OrderSubmitted extends Mailable
{
    use SerializesModels;

    public string $fullName;
    public string $selectedService;
    public string $phoneNumber;
    public string $address;
    public string $description;
    public ?float $discount;
    public ?UploadedFile $uploadedFile;

    public function __construct(
        string $fullName,
        string $selectedService,
        string $phoneNumber,
        string $address,
        string $description,
        ?float $discount,
        ?UploadedFile $uploadedFile
    ) {
        $this->fullName        = $fullName;
        $this->selectedService = $selectedService;
        $this->phoneNumber     = $phoneNumber;
        $this->address         = $address;
        $this->description     = $description;
        $this->discount        = $discount;
        $this->uploadedFile    = $uploadedFile;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Новый заказ с сайта svai12.рф',
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.orders.submitted',
            with: [
                'fullName'        => $this->fullName,
                'selectedService' => $this->selectedService,
                'phoneNumber'     => $this->phoneNumber,
                'address'         => $this->address,
                'description'     => $this->description,
                'discount'        => $this->discount,
                'fileName'        => $this->uploadedFile?->getClientOriginalName(),
            ],
        );
    }

    public function attachments(): array
    {
        if (!$this->uploadedFile) {
            return [];
        }

        return [
            Attachment::fromPath($this->uploadedFile->getRealPath())
                ->as($this->uploadedFile->getClientOriginalName())
                ->withMime($this->uploadedFile->getMimeType() ?? 'application/octet-stream'),
        ];
    }
}
