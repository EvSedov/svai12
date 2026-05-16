<?php

return [
    'paths' => ['submit-order'],

    'allowed_methods' => ['POST'],

    'allowed_origins' => [
        env('FRONTEND_URL', 'http://localhost:3000'),
        'https://svai12.ru',
        'https://www.svai12.ru',
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,
];
