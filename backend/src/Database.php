<?php

declare(strict_types=1);

namespace Backend;

use PDO;
use PDOException;

final class Database
{
    private PDO $pdo;

    public function __construct(array $config)
    {
        $dsn = $config['dsn'];
        if (str_starts_with($dsn, 'sqlite:')) {
            $path = substr($dsn, 7);
            $dir = dirname($path);
            if (!is_dir($dir)) {
                mkdir($dir, 0770, true);
            }
        }

        $this->pdo = new PDO(
            $dsn,
            $config['user'],
            $config['pass'],
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::ATTR_STRINGIFY_FETCHES => false,
            ]
        );

        if (!str_starts_with($dsn, 'sqlite:')) {
            $this->pdo->exec('SET SESSION wait_timeout=60');
        } else {
            $this->pdo->exec('PRAGMA journal_mode=WAL');
            $this->pdo->exec('PRAGMA foreign_keys=ON');
            $this->ensureSchema();
        }
    }

    public function pdo(): PDO
    {
        return $this->pdo;
    }

    private function ensureSchema(): void
    {
        $stmt = $this->pdo->query("SELECT name FROM sqlite_master WHERE type='table' AND name='users'");
        if ($stmt->fetchColumn()) {
            return;
        }
        $schemaPath = __DIR__ . '/../schema.sql';
        $sql = file_get_contents($schemaPath);
        if ($sql === false) {
            throw new PDOException('Failed to load schema.sql');
        }
        $this->pdo->exec($sql);
    }
}
