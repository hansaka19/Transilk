<?php

declare(strict_types=1);

namespace Backend;

final class JWT
{
    public static function encode(array $payload, string $secret): string
    {
        $header = ['alg' => 'HS256', 'typ' => 'JWT'];
        $segments = [
            self::b64(json_encode($header, JSON_THROW_ON_ERROR)),
            self::b64(json_encode($payload, JSON_THROW_ON_ERROR)),
        ];
        $signingInput = implode('.', $segments);
        $signature = hash_hmac('sha256', $signingInput, $secret, true);
        $segments[] = self::b64($signature);
        return implode('.', $segments);
    }

    public static function decode(string $token, string $secret): array
    {
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            throw new \RuntimeException('Malformed token');
        }
        [$h64, $p64, $s64] = $parts;
        $payload = json_decode(self::ub64($p64), true, 8, JSON_THROW_ON_ERROR);
        $sig = self::ub64($s64);
        $expected = hash_hmac('sha256', "$h64.$p64", $secret, true);
        if (!hash_equals($expected, $sig)) {
            throw new \RuntimeException('Invalid signature');
        }
        $now = time();
        if (isset($payload['exp']) && $payload['exp'] < $now) {
            throw new \RuntimeException('Token expired');
        }
        if (isset($payload['nbf']) && $payload['nbf'] > $now) {
            throw new \RuntimeException('Token not valid yet');
        }
        return $payload;
    }

    private static function b64(string $data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    private static function ub64(string $data): string
    {
        $pad = strlen($data) % 4;
        if ($pad) {
            $data .= str_repeat('=', 4 - $pad);
        }
        return base64_decode(strtr($data, '-_', '+/'), true) ?: '';
    }
}
