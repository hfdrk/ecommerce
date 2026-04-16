<?php
/**
 * Generates PrestaShop 8.x-compatible CSVs (semicolon-separated) for:
 * - Categories (import first)
 * - Products (import second)
 *
 * Run on the host (PHP 7.4+): php generate-catalog-csv.php
 * Outputs: arden_categories.csv, arden_products.csv in this directory.
 */

declare(strict_types=1);

// Always write next to this script (run from repo: php generate-catalog-csv.php).
$dir = __DIR__;
$outCategories = $dir . '/arden_categories.csv';
$outProducts = $dir . '/arden_products.csv';

$media = require $dir . '/ardensprint_media.php';

$categoryNames = [
    'DTF Transfers',
    'Blank Apparel',
    'Accessories',
    'Print Services',
];

$categoryDescriptions = [
    'Full-color DTF film, gang sheets, and rolls for production decorators.',
    'Retail-ready blanks with consistent specs for repeat orders.',
    'Bags, add-ons, and finishing goods.',
    'Rush handling, fulfillment, and shop services.',
];

$categorySlugs = [
    'dtf-transfers',
    'blank-apparel',
    'accessories',
    'print-services',
];

$products = [
    ['slug' => '47-brand-4700', 'name' => '47 Brand 4700', 'price' => 7.5, 'category' => 'Blank Apparel', 'sku' => 'BB-4700', 'description' => 'Your next bestseller awaits — same style featured on ardensprint.com.', 'image_url' => $media['products'][0]],
    ['slug' => 'american-apparel-1304', 'name' => 'American Apparel 1304', 'price' => 8.81, 'category' => 'Blank Apparel', 'sku' => 'AA-1304', 'description' => 'Fine jersey with a smooth hand-feel — demo pricing matches live homepage.', 'image_url' => $media['products'][1]],
    ['slug' => 'dtf-gang-sheet-12x16', 'name' => 'DTF Gang Sheet — 12×16', 'price' => 18.0, 'category' => 'DTF Transfers', 'sku' => 'DTF-GS-1216', 'description' => 'Full-color DTF transfer sized for hats, pockets, and youth placements. Press-ready.', 'image_url' => $media['dtf_transfer_by_size']],
    ['slug' => 'dtf-ready-roll-10yd', 'name' => 'DTF Ready Roll — 10 yd', 'price' => 129.0, 'category' => 'DTF Transfers', 'sku' => 'DTF-RL-10', 'description' => 'Continuous roll for high-volume shops. Vibrant whites, predictable stretch.', 'image_url' => $media['dtf_ready']],
    ['slug' => 'canvas-tote-12oz', 'name' => 'Canvas Tote — 12 oz', 'price' => 14.25, 'category' => 'Accessories', 'sku' => 'AC-TOTE-12', 'description' => 'Heavy canvas with reinforced handles. Perfect for retail and event merch.', 'image_url' => $media['products'][4]],
    ['slug' => 'pod-rush-fulfillment', 'name' => 'Rush POD Fulfillment', 'price' => 2.5, 'category' => 'Print Services', 'sku' => 'SRV-RUSH', 'description' => 'Per-piece rush handling for tight deadlines. Pairs with any in-catalog garment.', 'image_url' => $media['dtf_gang_builder']],
    ['slug' => 'quarter-zip-performance', 'name' => 'Quarter-Zip — Performance', 'price' => 36.0, 'category' => 'Blank Apparel', 'sku' => 'QZ-PERF-01', 'description' => 'Moisture-wicking layer with clean zipper and minimal branding for relabeling.', 'image_url' => $media['products'][2]],
    ['slug' => 'fleece-hood-premium', 'name' => 'Fleece Hood — Premium', 'price' => 42.0, 'category' => 'Blank Apparel', 'sku' => 'FL-HD-PR', 'description' => 'Plush interior, stable shrinkage profile. Built for repeat heat applications.', 'image_url' => $media['products'][3]],
];

$categoryHeader = 'Category ID;Active (0/1);Name *;Parent category;Root category (0/1);Description;Meta title;Meta keywords;Meta description;URL rewritten;Image URL';

$linesCat = [$categoryHeader];
foreach ($categoryNames as $i => $name) {
    $desc = $categoryDescriptions[$i];
    $slug = $categorySlugs[$i];
    $metaTitle = $name . " · Arden's Print";
    $linesCat[] = sprintf(
        ';1;%s;Home;0;%s;%s;%s;%s;%s;',
        csv_escape($name),
        csv_escape($desc),
        csv_escape($metaTitle),
        csv_escape(str_replace([' ', '—'], ['-', ''], $name)),
        csv_escape($desc),
        csv_escape($slug)
    );
}

file_put_contents($outCategories, implode("\n", $linesCat) . "\n");

$productHeader = 'Product ID;Active (0/1);Name *;Categories (x,y,z...);Price tax excluded;Tax rules ID;Wholesale price;On sale (0/1);Discount amount;Discount percent;Discount from (yyyy-mm-dd);Discount to (yyyy-mm-dd);Reference #;Supplier reference #;Supplier;Manufacturer;EAN13;UPC;Ecotax;Width;Height;Depth;Weight;Delivery time of in-stock products;Delivery time of out-of-stock products with allowed orders;Quantity;Minimal quantity;Low stock level;Receive a low stock alert by email;Visibility;Additional shipping cost;Unity;Unit price;Summary;Description;Tags (x,y,z...);Meta title;Meta keywords;Meta description;URL rewritten;Text when in stock;Text when backorder allowed;Available for order (0 = No, 1 = Yes);Product available date;Product creation date;Show price (0 = No, 1 = Yes);Image URLs (x,y,z...);Image alt texts (x,y,z...);Delete existing images (0 = No, 1 = Yes);Feature(Name:Value:Position);Available online only (0 = No, 1 = Yes);Condition;Customizable (0 = No, 1 = Yes);Uploadable files (0 = No, 1 = Yes);Text fields (0 = No, 1 = Yes);Out of stock action;Virtual product;File URL;Number of allowed downloads;Expiration date;Number of days;ID / Name of shop;Advanced stock management;Depends On Stock;Warehouse;Acessories  (x,y,z...)';

$linesProd = [$productHeader];
foreach ($products as $p) {
    $summary = '<p>' . htmlspecialchars($p['description'], ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') . '</p>';
    $desc = $summary;
    $imgUrl = $p['image_url'];
    $tags = implode(', ', array_filter(preg_split('/[\s,—]+/u', $p['name'])));
    $metaTitle = $p['name'] . " · Arden's Print";
    $metaDesc = substr($p['description'], 0, 160);
    // Match default demo products tax group (see ps_product.id_tax_rules_group in a typical install).
    $taxRulesId = 9;
    $row = array_fill(0, 66, '');
    $row[0] = '';
    $row[1] = '1';
    $row[2] = $p['name'];
    $row[3] = $p['category'];
    $row[4] = (string) $p['price'];
    $row[5] = (string) $taxRulesId;
    $row[6] = '0';
    $row[7] = '0';
    $row[12] = $p['sku'];
    $row[25] = '100';
    $row[26] = '1';
    $row[33] = $summary;
    $row[34] = $desc;
    $row[35] = $tags;
    $row[36] = $metaTitle;
    $row[37] = $tags;
    $row[38] = $metaDesc;
    $row[39] = $p['slug'];
    $row[40] = 'In stock';
    $row[41] = 'Made to order';
    $row[42] = '1';
    $row[45] = '1';
    $row[46] = $imgUrl;
    $row[47] = $p['name'];
    $row[48] = '0';
    $row[50] = '0';
    $row[51] = 'new';
    $row[52] = '0';
    $row[53] = '0';
    $row[54] = '0';
    $linesProd[] = implode(';', array_map('csv_escape_cell', $row));
}

file_put_contents($outProducts, implode("\n", $linesProd) . "\n");

echo "Wrote $outCategories and $outProducts\n";

function csv_escape(string $s): string
{
    return str_replace(["\r", "\n", '"'], [' ', ' ', '""'], $s);
}

function csv_escape_cell(string $s): string
{
    if ($s === '') {
        return $s;
    }
    if (strpos($s, ';') !== false || strpos($s, '"') !== false || strpos($s, "\n") !== false) {
        return '"' . str_replace('"', '""', $s) . '"';
    }

    return $s;
}
