import { __ } from "@wordpress/i18n";
import { Card, CardBody } from "@wordpress/components";
import { TEXT_DOMAIN } from "../constants";

function ProFeaturePage({ icon, title, description, features }) {
    return (
        <Card isRounded={false} className="pbur-card">
            <CardBody>
                <div className="pbur-section-header" style={{ marginBottom: "12px" }}>
                    <h3>
                        {icon && <span className={`dashicons ${icon}`} aria-hidden="true" style={{ marginRight: "6px", verticalAlign: "middle" }} />}
                        {title}
                    </h3>
                    {description && <p>{description}</p>}
                </div>
                <div className="pbur-checklist" style={{ marginTop: 0 }}>
                    {features.map((feature, i) => (
                        <div key={i} className="pbur-checklist-item is-done">
                            <div className="pbur-checklist-icon" aria-hidden="true" />
                            <span className="pbur-checklist-label">{feature}</span>
                        </div>
                    ))}
                </div>
                <a
                    href="https://woocommerce.com/products/product-prices-by-user-roles-for-woocommerce/?utm_source=lite-plugin&utm_medium=pro-feature-page&utm_campaign=upgrade-to-pro"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: "inline-block",
                        marginTop: "20px",
                        padding: "8px 18px",
                        background: "var(--wp-admin-theme-color, #2271b1)",
                        color: "#fff",
                        borderRadius: "var(--pbur-radius)",
                        textDecoration: "none",
                        fontWeight: 600,
                    }}
                >
                    {__("Upgrade to Pro", TEXT_DOMAIN)} &rarr;
                </a>
            </CardBody>
        </Card>
    );
}

export default ProFeaturePage;
