{**
 * "Design → Preview → Order" — compact CTA banner card.
 *}
<section class="arden-custom-printing" aria-labelledby="arden-custom-printing-title">
  <div class="arden-custom-printing__inner">
    <div class="arden-custom-printing__copy">
      <p class="arden-section-eyebrow">{l s='Design Studio' d='Shop.Theme.Global'}</p>
      <h2 id="arden-custom-printing-title" class="arden-display arden-custom-printing__title">{l s='Design → Preview → Order — all in one flow' d='Shop.Theme.Global'}</h2>
      <p class="arden-custom-printing__lead">
        {l s='Upload your artwork, preview on garment mockups, and place the order without leaving the browser. Built for schools, teams, and growing brands.' d='Shop.Theme.Global'}
      </p>
    </div>
    <div class="arden-custom-printing__actions">
      <a class="arden-btn arden-btn--primary" href="{$arden_cms.design_studio|default:$urls['pages']['contact']}">{l s='Launch Studio' d='Shop.Theme.Global'}</a>
    </div>
  </div>
</section>
