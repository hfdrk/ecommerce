<?php
/**
 * Exposes category URLs (by link_rewrite) to the Arden theme Smarty templates.
 */
if (!defined('_PS_VERSION_')) {
    exit;
}

class Ardenhomelinks extends Module
{
    public function __construct()
    {
        $this->name = 'ardenhomelinks';
        $this->tab = 'front_office_features';
        $this->version = '1.2.0';
        $this->author = 'Arden';
        $this->need_instance = 0;
        $this->bootstrap = true;

        parent::__construct();

        $this->displayName = $this->l('Arden home links');
        $this->description = $this->l('Maps catalog categories to the Arden home page (hero & pillars).');
        $this->ps_versions_compliancy = ['min' => '8.0.0', 'max' => _PS_VERSION_];
    }

    public function install()
    {
        return parent::install()
            && $this->registerHook('displayHeader');
    }

    public function hookDisplayHeader()
    {
        if (!isset($this->context->link)) {
            return '';
        }

        $idLang = (int) $this->context->language->id;
        $link = $this->context->link;

        $map = [
            'dtf' => 'dtf-transfers',
            'blank' => 'blank-apparel',
            'blanks_nav' => 'blanks-catalog',
            'acc' => 'blank-accessories',
            'psvc' => 'print-services',
        ];

        $urls = [];
        foreach ($map as $key => $rewrite) {
            $idCategory = $this->findCategoryIdByLinkRewrite($rewrite, $idLang);
            $urls[$key] = $idCategory
                ? $link->getCategoryLink($idCategory)
                : '#';
        }

        $dtfTools = [
            'dtf_size' => 'dtf-transfer-by-size',
            'dtf_gang' => 'dtf-gangsheet-builder',
            'dtf_upload' => 'dtf-upload-gang-sheet',
        ];
        $dtfToolUrls = [];
        foreach ($dtfTools as $key => $rewrite) {
            $idCategory = $this->findCategoryIdByLinkRewrite($rewrite, $idLang);
            $dtfToolUrls[$key] = $idCategory
                ? $link->getCategoryLink($idCategory)
                : '#';
        }

        $cmsMap = [
            'design_studio' => 'design-studio',
            'design_library' => 'design-library',
            'membership' => 'membership',
        ];
        $cmsUrls = [];
        foreach ($cmsMap as $key => $rewrite) {
            $idCms = $this->findCmsIdByRewrite($rewrite, $idLang, (int) $this->context->shop->id);
            $cmsUrls[$key] = $idCms ? $link->getCMSLink((int) $idCms) : '#';
        }

        $legalMap = [
            'privacy' => 'privacy-policy',
            'terms' => 'terms-conditions',
            'returns' => 'returns-policy',
        ];
        $legalUrls = [];
        foreach ($legalMap as $key => $rewrite) {
            $idCms = $this->findCmsIdByRewrite($rewrite, $idLang, (int) $this->context->shop->id);
            $legalUrls[$key] = $idCms ? $link->getCMSLink((int) $idCms) : '#';
        }

        $this->context->smarty->assign([
            'arden_cat' => $urls,
            'arden_dtf_tools' => $dtfToolUrls,
            'arden_cms' => $cmsUrls,
            'arden_legal' => $legalUrls,
            'arden_catalog' => $link->getPageLink('new-products'),
            'arden_shop' => $link->getPageLink('new-products'),
            'arden_pod' => $link->getPageLink('new-products'),
            'arden_contact' => $link->getPageLink('contact'),
        ]);

        return '';
    }

    private function findCategoryIdByLinkRewrite(string $linkRewrite, int $idLang): int
    {
        $sql = new DbQuery();
        $sql->select('c.`id_category`');
        $sql->from('category', 'c');
        $sql->innerJoin('category_lang', 'cl', 'c.`id_category` = cl.`id_category`');
        $sql->where('cl.`link_rewrite` = \'' . pSQL($linkRewrite) . '\'');
        $sql->where('cl.`id_lang` = ' . (int) $idLang);

        return (int) Db::getInstance(_PS_USE_SQL_SLAVE_)->getValue($sql);
    }

    private function findCmsIdByRewrite(string $linkRewrite, int $idLang, int $idShop): int
    {
        return (int) Db::getInstance()->getValue(
            'SELECT l.`id_cms` FROM `' . _DB_PREFIX_ . 'cms_lang` l
             WHERE l.`link_rewrite` = \'' . pSQL($linkRewrite) . '\'
               AND l.`id_lang` = ' . (int) $idLang . '
               AND l.`id_shop` = ' . (int) $idShop
        );
    }
}
