{**
 * Home: full parity with ardensprint.com — hero → trust → categories → DTF → shop → how-it-works → design library → pillars → blanks → design studio → membership → value props (7) → CTA
 *}
{extends file='page.tpl'}

{block name='page_content_container'}
  <section id="content" class="page-home arden-page-home">
    {block name='page_content_top'}{/block}

    {block name='page_content'}
      {include file='_partials/arden-hero.tpl'}
      {include file='_partials/arden-trust-signals.tpl'}
      {include file='_partials/arden-category-tiles.tpl'}
      {include file='_partials/arden-dtf-hub.tpl'}
      <div class="arden-home-modules">
        <header class="arden-home-modules__head">
          <p class="arden-section-eyebrow">Catalog</p>
          <h2 class="arden-display arden-home-modules__title" id="arden-shop-modules-title">Your next bestseller awaits</h2>
          <p class="arden-home-modules__lead">A snapshot of blanks and services decorators order most often.</p>
        </header>
      {block name='hook_home'}
        {$HOOK_HOME nofilter}
      {/block}
      </div>
      {include file='_partials/arden-how-it-works.tpl'}
      {include file='_partials/arden-custom-printing-cta.tpl'}
      {include file='_partials/arden-pillars.tpl'}
      {include file='_partials/arden-blank-banner.tpl'}
      {include file='_partials/arden-design-library.tpl'}
      {include file='_partials/arden-design-studio.tpl'}
      {include file='_partials/arden-membership.tpl'}
      {include file='_partials/arden-value-props.tpl'}
      {include file='_partials/arden-cta-strip.tpl'}
    {/block}
  </section>
{/block}
