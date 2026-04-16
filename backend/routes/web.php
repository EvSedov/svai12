<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;

Route::post('/submit-order', [OrderController::class, 'submitOrder'])->middleware('throttle:orders');
