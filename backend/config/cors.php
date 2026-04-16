<?php

return [
    'paths' => ['submit-order'],

    'allowed_methods' => ['POST'],

    'allowed_origins' => [
        env('FRONTEND_URL', 'http://localhost:3000'),
        'https://svai12.рф',
        'https://www.svai12.рф',
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,
];
