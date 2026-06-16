import { __ } from "@wordpress/i18n";
import { Card, CardBody, Panel, PanelBody } from "@wordpress/components";
import { TEXT_DOMAIN } from "../../constants";

const FAQS = [
    {
        title:   __("How do I set different prices for different user roles?", "price-by-user-role-for-woocommerce"),
        content: __("Enable the plugin in Settings → General, then use one of two methods: Multipliers (percentage-based adjustments across all products) or Per Product settings (exact prices set directly on each product's edit page for specific roles).", "price-by-user-role-for-woocommerce"),
    },
    {
        title:   __("What is the difference between Multipliers and Per Product pricing?", "price-by-user-role-for-woocommerce"),
        content: __("Multipliers apply a single multiplier value across all products for a given role. Per Product pricing lets you set exact prices directly on each product's edit page for specific roles, giving you granular per-product control.", "price-by-user-role-for-woocommerce"),
    },
    {
        title:   __("What does 'Make empty price' mean?", "price-by-user-role-for-woocommerce"),
        content: __('When "Make empty price" is enabled for a role in Multipliers or Per Product settings, the product price is hidden entirely for that role.', "price-by-user-role-for-woocommerce"),
    },
    {
        title:   __("Why should I disable the plugin for search engine bots?", "price-by-user-role-for-woocommerce"),
        content: __("Search engines index product prices. If bots see role-specific prices (e.g. a restricted or empty price), it can affect SEO and how products appear in search results. Disabling for bots ensures crawlers always see standard WooCommerce prices.", "price-by-user-role-for-woocommerce"),
    },
    {
        title:   __("What happens if I have both Multipliers and Per Product pricing enabled?", "price-by-user-role-for-woocommerce"),
        content: __("Per Product prices take precedence over Multipliers by default. If a product has a per-product price set for a role, that price is used. Otherwise, the Multiplier is applied to the standard WooCommerce price.", "price-by-user-role-for-woocommerce"),
    },
    {
        title:   __("Can I apply role-based pricing to shipping costs?", "price-by-user-role-for-woocommerce"),
        content: __('Yes. In Settings → Multipliers, enable the "Apply to Shipping" option. The same multiplier configured for a role\'s product prices will also be applied to shipping costs at checkout.', "price-by-user-role-for-woocommerce"),
    },
];

function FAQs() {
    return (
        <>
            <div className="pbur-page-header">
                <h2>{__("Frequently Asked Questions", TEXT_DOMAIN)}</h2>
                <p>{__("Find answers to common questions about Product Prices by User Roles.", TEXT_DOMAIN)}</p>
            </div>

            <Card isRounded={false} className="pbur-card">
                <CardBody style={{ padding: 0 }}>
                    <Panel className="pbur-faq-panel">
                        {FAQS.map((faq, i) => (
                            <PanelBody key={i} title={faq.title} initialOpen={false}>
                                <p>{faq.content}</p>
                            </PanelBody>
                        ))}
                    </Panel>
                </CardBody>
            </Card>

            <div className="pbur-faq-support">
                <p>{__("Didn't find your answer? Our support team is just a message away.", TEXT_DOMAIN)}</p>
                <a
                    href="https://www.tychesoftwares.com/support/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {__("Contact Support", TEXT_DOMAIN)} &rarr;
                </a>
            </div>
        </>
    );
}

export default FAQs;
