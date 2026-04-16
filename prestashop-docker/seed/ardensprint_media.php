<?php
/**
 * Canonical demo media URLs from https://ardensprint.com/ (public /assets/media).
 * Used by cli-import + ardensprint_sync_demo_assets — keep in sync if the live site moves files.
 */
declare(strict_types=1);

$base = 'https://ardensprint.com/assets/media/';

return [
    'base' => $base,
    /** Hero rotation (matches live homepage slider assets). */
    'hero_slides' => [
        ['file' => 'hero-1.png', 'title' => 'DTF transfers', 'legend' => 'DTF transfers'],
        ['file' => 'hero-2.png', 'title' => 'Blank apparel', 'legend' => 'Blank apparel'],
        ['file' => 'hero-3.png', 'title' => 'Custom print', 'legend' => 'Custom print'],
        ['file' => 'hero-4.png', 'title' => 'Print on demand', 'legend' => 'Print on demand'],
    ],
    /** Product grid on live “bestseller” strip — use as cover art for demo SKUs. */
    'products' => [
        $base . 'products/product-1.png',
        $base . 'products/product-2.png',
        $base . 'products/product-3.png',
        $base . 'products/product-4.png',
        $base . 'products/product-5.png',
    ],
    /** Extra category-style art (DTF hub, services). */
    'dtf_transfer_by_size' => $base . 'DTF-Transfer-by-size.png',
    'dtf_gang_builder' => $base . 'DTF-Gang-shift-builder.png',
    'dtf_upload' => $base . 'upload-a-print-ready-file.png',
    'dtf_ready' => $base . 'DTF-Ready-transfer.png',
];
