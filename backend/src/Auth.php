<?php

declare(strict_types=1);

namespace Backend;

use PDO;
use RuntimeException;

final class Auth
{
    private PDO $db;
    private array $jwtCfg;

    public function __construct(PDO $db, array $jwtCfg)
    {
        $this->db = $db;
        $this->jwtCfg = $jwtCfg;
    }

    public function register(string $email, string $password): int
    {
        $email = strtolower(trim($email));
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new RuntimeException('Invalid email');
        }
        if (strlen($password) < 8) {
            throw new RuntimeException('Password too short');
        }
        $hash = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $this->db->prepare('INSERT INTO users (email, password_hash, created_at) VALUES (:email, :hash, CURRENT_TIMESTAMP)');
        $stmt->execute([':email' => $email, ':hash' => $hash]);
        return (int)$this->db->lastInsertId();
    }

    public function login(string $email, string $password): string
    {
        $stmt = $this->db->prepare('SELECT id, password_hash FROM users WHERE email = :email LIMIT 1');
        $stmt->execute([':email' => strtolower(trim($email))]);
        $user = $stmt->fetch();
        if (!$user || !password_verify($password, $user['password_hash'])) {
            throw new RuntimeException('Invalid credentials');
        }
        $now = time();
        $payload = [
          'sub' => (int)$user['id'],
          'email' => $email,
          'iat' => $now,
          'nbf' => $now,
          'exp' => $now + $this->jwtCfg['ttl'],
          'iss' => $this->jwtCfg['issuer'],
          'aud' => $this->jwtCfg['audience'],
        ];
        return JWT::encode($payload, $this->jwtCfg['secret']);
    }

    public function logout(): void
    {
        // Stateless JWT logout: client should discard the token. Optionally issue a short-lived invalidation.
        // Here we simply respond OK; token invalidation list can be added if needed.
    }

    public function requireUser(string $authHeader): array
    {
        if (!str_starts_with($authHeader, 'Bearer ')) {
            throw new RuntimeException('Missing bearer token');
        }
        $token = substr($authHeader, 7);
        $payload = JWT::decode($token, $this->jwtCfg['secret']);
        return $payload;
    }
}
