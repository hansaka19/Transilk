<?php

declare(strict_types=1);

// Basic configuration. Keep secrets in environment variables.
return [
    'app_name' => 'Transilk API',
    'db' => [
        // Default to a local SQLite database file for quick testing. Override with MySQL DSN via env.
        'dsn' => getenv('DB_DSN') ?: 'sqlite:' . __DIR__ . '/data/app.db',
        'user' => getenv('DB_USER') ?: '',
        'pass' => getenv('DB_PASS') ?: '',
    ],
    'jwt' => [
        'secret' => getenv('JWT_SECRET') ?: 'replace-with-strong-secret',
        'issuer' => 'transilk',
        'audience' => 'transilk-clients',
        'ttl' => 60 * 60 * 24, // 1 day
    ],
    'cors' => [
        'allowed_origins' => explode(',', getenv('CORS_ORIGINS') ?: 'http://localhost:5173'),
    ],
];
