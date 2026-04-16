{**
 * Category header — Classic + Arden: clearer path to purchase (who/what/how).
 * Parent: catalog/listing/category.tpl
 *}
<div id="js-product-list-header">
    {if $listing.pagination.items_shown_from == 1}
        <div class="block-category card card-block arden-block-category">
            <h1 class="h1">{$category.name}</h1>

            <div class="arden-category-intro" aria-label="{l s='How to order from this category' d='Shop.Theme.Catalog'}">
                <p class="arden-category-lead">
                    {l s='Browse in-stock items below. Choose options on the product page, then add to cart—your total updates before you pay.' d='Shop.Theme.Catalog'}
                </p>
                <ol class="arden-category-steps">
                    <li>{l s='Open a product' d='Shop.Theme.Catalog'}</li>
                    <li>{l s='Select size, color, or quantity' d='Shop.Theme.Catalog'}</li>
                    <li>{l s='Add to cart and complete secure checkout' d='Shop.Theme.Catalog'}</li>
                </ol>
            </div>

            <div class="block-category-inner">
                {if $category.description}
                    <div id="category-description" class="arden-category-description text-muted">{$category.description nofilter}</div>
                {/if}
                {if !empty($category.image.large.url)}
                    <div class="category-cover">
                        <picture>
                            {if !empty($category.image.large.sources.avif)}<source srcset="{$category.image.large.sources.avif}" type="image/avif">{/if}
                            {if !empty($category.image.large.sources.webp)}<source srcset="{$category.image.large.sources.webp}" type="image/webp">{/if}
                            <img src="{$category.image.large.url}" alt="{if !empty($category.image.legend)}{$category.image.legend}{else}{$category.name}{/if}" loading="lazy" width="141" height="180">
                        </picture>
                    </div>
                {/if}
            </div>
        </div>
    {/if}
</div>
