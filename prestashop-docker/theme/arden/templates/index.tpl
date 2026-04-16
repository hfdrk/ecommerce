{**
 * Home: hero → trust → shop modules (slider + featured) first for sales, then story blocks.
 *}
{extends file='page.tpl'}

{block name='page_content_container'}
  <section id="content" class="page-home arden-page-home">
    {block name='page_content_top'}{/block}

    {block name='page_content'}
      {include file='_partials/arden-hero.tpl'}
      {include file='_partials/arden-trust-signals.tpl'}
      {include file='_partials/arden-category-tiles.tpl'}
      <div class="arden-home-modules">
        <header class="arden-home-modules__head">
          <p class="arden-section-eyebrow">Shop</p>
          <h2 class="arden-display arden-home-modules__title" id="arden-shop-modules-title">See what’s in stock</h2>
          <p class="arden-home-modules__lead">Browse featured items and new arrivals — add to cart when you’re ready.</p>
        </header>
      {block name='hook_home'}
        {$HOOK_HOME nofilter}
      {/block}
      </div>
      {include file='_partials/arden-pillars.tpl'}
      {include file='_partials/arden-value-props.tpl'}
      {include file='_partials/arden-custom-printing-cta.tpl'}
      {include file='_partials/arden-cta-strip.tpl'}
      {include file='_partials/arden-dtf-hub.tpl'}
      {include file='_partials/arden-blank-banner.tpl'}
      {include file='_partials/arden-design-studio.tpl'}
      {include file='_partials/arden-membership.tpl'}
    {/block}
  </section>
{/block}
