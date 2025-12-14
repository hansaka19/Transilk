<?php

declare(strict_types=1);

namespace Backend;

final class Security
{
    public static function json(array $data, int $status = 200): void
    {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        header('X-Content-Type-Options: nosniff');
        header('X-Frame-Options: DENY');
        header('Referrer-Policy: no-referrer');
        echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        exit;
    }

    public static function cors(array $allowedOrigins): void
    {
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
        if ($origin && in_array($origin, $allowedOrigins, true)) {
            header("Access-Control-Allow-Origin: $origin");
            header('Vary: Origin');
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Allow-Headers: Content-Type, Authorization, X-CSRF-Token');
            header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        }
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(204);
            exit;
        }
    }

    public static function csrfGuard(): void
    {
        $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
        if ($method === 'GET' || $method === 'OPTIONS') {
            return;
        }
        $headerToken = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
        $cookieToken = $_COOKIE['csrf_token'] ?? '';
        if (!$headerToken || !$cookieToken || !hash_equals($cookieToken, $headerToken)) {
            self::json(['error' => 'CSRF validation failed'], 403);
        }
    }
}
