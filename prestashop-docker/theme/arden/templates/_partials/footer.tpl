{**
 * Arden — footer with live-site contact block + PrestaShop hooks
 *}
<div class="container">
  <div class="row">
    {block name='hook_footer_before'}
      {hook h='displayFooterBefore'}
    {/block}
  </div>
</div>
<div class="footer-container">
  <div class="container">
    <div class="row arden-footer-brand-row">
      <div class="col-md-4 mb-3 mb-md-0">
        <p class="arden-footer-eyebrow">{l s="Arden's Print" d='Shop.Theme.Global'}</p>
        <p class="arden-footer-addr">
          {l s='Tomball, TX' d='Shop.Theme.Global'}<br>
          16131 N Eldridge Pkwy, Suite 108<br>
          Tomball, TX 77377
        </p>
        <p class="arden-footer-contact-links mb-0">
          <a href="tel:+18324808080" class="arden-footer-tel">(832) 480-8080</a><br>
          <a href="mailto:info@ardensprint.com" class="arden-footer-mail">info@ardensprint.com</a>
        </p>
      </div>
      <div class="col-md-8">
        <p class="arden-footer-tagline text-muted small mb-2">{l s='DTF transfers, blank apparel, custom print & print on demand.' d='Shop.Theme.Global'}</p>
      </div>
    </div>
    <div class="row">
      {block name='hook_footer'}
        {hook h='displayFooter'}
      {/block}
    </div>
    <div class="row">
      {block name='hook_footer_after'}
        {hook h='displayFooterAfter'}
      {/block}
    </div>
    <div class="row">
      <div class="col-md-12">
        <p class="text-sm-center arden-footer-copy">
          {block name='copyright_link'}
            <span class="arden-copyright">© {'Y'|date} {l s="Arden's Print" d='Shop.Theme.Global'}</span>
            <span class="arden-footer-sep"> · </span>
            <a href="{$arden_legal.privacy|default:'#'}" class="arden-footer-legal">{l s='Privacy Policy' d='Shop.Theme.Global'}</a>
            <span class="arden-footer-sep"> · </span>
            <a href="{$arden_legal.terms|default:'#'}" class="arden-footer-legal">{l s='Terms & Conditions' d='Shop.Theme.Global'}</a>
            <span class="arden-footer-sep"> · </span>
            <a href="{$arden_legal.returns|default:$urls.pages.contact}" class="arden-footer-legal">{l s='Returns Policy' d='Shop.Theme.Global'}</a>
          {/block}
        </p>
      </div>
    </div>
  </div>
</div>
