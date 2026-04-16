<?php
$h = $argv[1] ?? 'mariadb';
$p = $argv[2] ?? '3306';
try {
    $dsn = "mysql:host={$h};port={$p};dbname=prestashop;charset=utf8mb4";
    new PDO($dsn, 'prestashop', 'prestashop', [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    echo "OK dsn={$dsn}\n";
} catch (Throwable $e) {
    echo "ERR: " . $e->getMessage() . "\n";
}
