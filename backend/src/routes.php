<?php

declare(strict_types=1);

use Backend\Auth;
use Backend\Database;
use Backend\Security;

require __DIR__ . '/../vendor/autoload.php';

$config = require __DIR__ . '/../config.php';

Security::cors($config['cors']['allowed_origins']);
Security::csrfGuard();

$db = new Database($config['db']);
$auth = new Auth($db->pdo(), $config['jwt']);

$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$input = json_decode(file_get_contents('php://input') ?: '{}', true) ?? [];

try {
    if ($path === '/api/register' && $method === 'POST') {
        $id = $auth->register((string)($input['email'] ?? ''), (string)($input['password'] ?? ''));
        setcookie('csrf_token', bin2hex(random_bytes(16)), [
            'httponly' => false,
            'secure' => true,
            'samesite' => 'Lax',
            'path' => '/',
        ]);
        Security::json(['userId' => $id, 'message' => 'Registered']);
    }

    if ($path === '/api/login' && $method === 'POST') {
        $token = $auth->login((string)($input['email'] ?? ''), (string)($input['password'] ?? ''));
        setcookie('csrf_token', bin2hex(random_bytes(16)), [
            'httponly' => false,
            'secure' => true,
            'samesite' => 'Lax',
            'path' => '/',
        ]);
        Security::json(['token' => $token]);
    }

    if ($path === '/api/logout' && $method === 'POST') {
        // Stateless: instruct client to drop JWT and clear csrf cookie.
        setcookie('csrf_token', '', [
            'httponly' => false,
            'secure' => true,
            'samesite' => 'Lax',
            'path' => '/',
            'expires' => time() - 3600,
        ]);
        Security::json(['message' => 'Logged out']);
    }

    if ($path === '/api/profile' && $method === 'GET') {
        $user = $auth->requireUser($_SERVER['HTTP_AUTHORIZATION'] ?? '');
        $stmt = $db->pdo()->prepare('SELECT id, email, created_at FROM users WHERE id = :id LIMIT 1');
        $stmt->execute([':id' => $user['sub']]);
        $profile = $stmt->fetch();
        Security::json(['profile' => $profile]);
    }

    // Public product feed (stubbed)
    if ($path === '/api/products' && $method === 'GET') {
        $products = [
            ['id' => 1, 'name' => 'Ceylon Blue Sapphire', 'price' => 3800, 'kind' => 'stone'],
            ['id' => 2, 'name' => 'Lumina Halo Ring', 'price' => 6400, 'kind' => 'jewellery'],
        ];
        Security::json(['items' => $products]);
    }

    http_response_code(404);
    Security::json(['error' => 'Not found'], 404);
} catch (Throwable $e) {
    Security::json(['error' => $e->getMessage()], 400);
}
