<?php
// Wrong: host contains :port in one string (some clients break)
try {
    new PDO(
        'mysql:host=mariadb:3306;dbname=prestashop',
        'prestashop',
        'prestashop',
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
    echo "BAD_DSN_UNEXPECTED_OK\n";
} catch (Throwable $e) {
    echo "BAD_DSN_ERR: " . $e->getMessage() . "\n";
}
