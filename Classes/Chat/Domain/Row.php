<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Chat\Domain;

/**
 * Reading a database row without trusting its shape.
 *
 * A `json` column comes back decoded on some platforms and as text on others,
 * and every integer arrives as a string on MySQL — so the two models share one
 * place that turns a row into typed values.
 */
final class Row
{
    /**
     * @param array<string, mixed> $row
     */
    public static function int(array $row, string $key): int
    {
        $value = $row[$key] ?? 0;

        return is_numeric($value) ? (int)$value : 0;
    }

    /**
     * @param array<string, mixed> $row
     */
    public static function string(array $row, string $key, string $default = ''): string
    {
        $value = $row[$key] ?? $default;

        return is_scalar($value) ? (string)$value : $default;
    }

    /**
     * @param array<string, mixed> $row
     */
    public static function bool(array $row, string $key): bool
    {
        return self::int($row, $key) === 1;
    }

    /**
     * A JSON object column, as a string-keyed array.
     *
     * @param array<string, mixed> $row
     *
     * @return array<string, mixed>
     */
    public static function jsonObject(array $row, string $key): array
    {
        $decoded = self::decoded($row[$key] ?? null);

        return self::stringKeyed($decoded);
    }

    /**
     * A JSON column holding a list of objects.
     *
     * @param array<string, mixed> $row
     *
     * @return list<array<string, mixed>>
     */
    public static function jsonList(array $row, string $key): array
    {
        $list = [];
        foreach (self::decoded($row[$key] ?? null) as $item) {
            if (is_array($item)) {
                $list[] = self::stringKeyed($item);
            }
        }

        return $list;
    }

    /**
     * @param array<array-key, mixed> $values
     *
     * @return array<string, mixed>
     */
    public static function stringKeyed(array $values): array
    {
        $result = [];
        foreach ($values as $key => $value) {
            if (is_string($key)) {
                $result[$key] = $value;
            }
        }

        return $result;
    }

    /**
     * @return array<array-key, mixed>
     */
    private static function decoded(mixed $raw): array
    {
        if (is_string($raw)) {
            $raw = $raw === '' ? null : json_decode($raw, true);
        }

        return is_array($raw) ? $raw : [];
    }
}
