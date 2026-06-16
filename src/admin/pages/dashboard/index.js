import { __ } from "@wordpress/i18n";
import {
    Card,
    CardHeader,
    CardBody,
    __experimentalHeading as Heading,
} from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";
import { TEXT_DOMAIN } from "../../constants";
import { fetch as fetchData } from "../../api/dashboard";
import Skeleton from "./skeleton";
import { toast } from "../../utils/toast";

const CHECKLIST = [
    { key: "pluginEnabled",           label: __("Enable the plugin",                         "price-by-user-role-for-woocommerce") },
    { key: "pricingMethodConfigured", label: __("Set up at least one pricing method",         "price-by-user-role-for-woocommerce") },
    { key: "pricesAssigned",          label: __("Assign prices to a product",                 "price-by-user-role-for-woocommerce") },
];


function Dashboard() {
    const [data, setData]         = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        fetchData()
            .then((result) => { if (mounted) setData(result || {}); })
            .catch((error) => toast.error(error?.message || __("Failed to load dashboard data", TEXT_DOMAIN)))
            .finally(() => { if (mounted) setLoading(false); });

        return () => { mounted = false; };
    }, []);

    if (isLoading || !data) return <Skeleton />;

    const checks = CHECKLIST.map((item) => !!data[item.key]);
    const completedCount = checks.filter(Boolean).length;
    const totalCount     = CHECKLIST.length;
    const progress       = totalCount ? (completedCount / totalCount) * 100 : 0;
    const isComplete     = completedCount === totalCount;

    return (
        <>
            <div className="pbur-page-header">
                <h2>{__("Dashboard", TEXT_DOMAIN)}</h2>
                <p>{__("Get started with Product Prices by User Roles", TEXT_DOMAIN)}</p>
            </div>

            <div className="pbur-dashboard-content">
                {/* Getting Started */}
                <Card isRounded={false} className="pbur-card">
                    <CardHeader className="pbur-card-header">
                        <Heading level={4}>{__("Getting Started", TEXT_DOMAIN)}</Heading>
                    </CardHeader>
                    <CardBody>
                        <div className="pbur-progress-header">
                            <span className="pbur-progress-label">
                                {isComplete
                                    ? __("Setup Complete!", TEXT_DOMAIN)
                                    : `${completedCount} ${__("of", TEXT_DOMAIN)} ${totalCount} ${__("completed", TEXT_DOMAIN)}`}
                            </span>
                            <span className="pbur-progress-pct">{Math.round(progress)}%</span>
                        </div>
                        <div className="pbur-progress-bar" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
                            <div className="pbur-progress-bar-fill" style={{ width: `${progress}%` }} />
                        </div>

                        <div className="pbur-checklist">
                            {CHECKLIST.map((item, i) => (
                                <div key={item.key} className={`pbur-checklist-item ${checks[i] ? "is-done" : ""}`}>
                                    <div className="pbur-checklist-icon" aria-hidden="true" />
                                    <span className="pbur-checklist-label">{item.label}</span>
                                </div>
                            ))}
                        </div>

                        {isComplete && (
                            <div className="pbur-success-banner">
                                <strong>{__("All set!", TEXT_DOMAIN)}</strong>{" "}
                                {__("You've completed the initial setup. Your store is now using role-based pricing.", TEXT_DOMAIN)}
                            </div>
                        )}
                    </CardBody>
                </Card>

                {/* Upgrade to Pro */}
                <Card isRounded={false} className="pbur-card">
                    <CardHeader className="pbur-card-header">
                        <Heading level={4}>{__("Unlock powerful pricing features available in the Pro version.", TEXT_DOMAIN)}</Heading>
                    </CardHeader>
                    <CardBody style={{ paddingTop: "12px" }}>
                        <div className="pbur-checklist" style={{ marginTop: 0 }}>
                            {[
                                __("Rule-based pricing (by role, product, or category)", TEXT_DOMAIN),
                                __("Quantity-range discounts per role", TEXT_DOMAIN),
                                __("Percentage and fixed-amount price adjustments", TEXT_DOMAIN),
                                __("Unlimited per-product role prices", TEXT_DOMAIN),
                                __("Exclude product categories from role pricing", TEXT_DOMAIN),
                                __("Show all role prices on the product page", TEXT_DOMAIN),
                            ].map((feature, i) => (
                                <div key={i} className="pbur-checklist-item is-done">
                                    <div className="pbur-checklist-icon" aria-hidden="true" />
                                    <span className="pbur-checklist-label">{feature}</span>
                                </div>
                            ))}
                        </div>
                        <a
                            href="https://woocommerce.com/products/product-prices-by-user-roles-for-woocommerce/?utm_source=lite-plugin&utm_medium=dashboard&utm_campaign=upgrade-to-pro"
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
            </div>
        </>
    );
}

export default Dashboard;
