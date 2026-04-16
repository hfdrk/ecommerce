{**
 * Arden — footer with contact block, social links, + PrestaShop hooks
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
        <div class="arden-footer-socials">
          <a href="https://www.instagram.com/ardensprint/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="arden-social-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
          </a>
          <a href="https://www.facebook.com/ardensprint/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="arden-social-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
          </a>
          <a href="https://www.tiktok.com/@ardensprint" target="_blank" rel="noopener noreferrer" aria-label="TikTok" class="arden-social-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a4 4 0 104 4V4a5 5 0 005 5"/></svg>
          </a>
        </div>
      </div>
      <div class="col-md-8">
        <p class="arden-footer-tagline text-muted small mb-2">{l s='DTF transfers, blank apparel, custom print & print on demand — serving decorators and brands from Tomball, Texas.' d='Shop.Theme.Global'}</p>
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
