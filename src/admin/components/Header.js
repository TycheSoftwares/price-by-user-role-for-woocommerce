import { __ } from "@wordpress/i18n";
import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
    { name: __("Dashboard", "price-by-user-role-for-woocommerce"), path: "/",         icon: "dashicons-admin-home" },
    { name: __("Settings",  "price-by-user-role-for-woocommerce"), path: "/settings", icon: "dashicons-admin-settings" },
    { name: __("Rules", "price-by-user-role-for-woocommerce"), path: "/rules", icon: "dashicons-list-view", proOnly: true },
    { name: __("FAQs",      "price-by-user-role-for-woocommerce"), path: "/faqs",     icon: "dashicons-editor-help" },
];

function Header() {
    return (
        <div id="pbur-header">
            <div className="pbur-topbar">
                <div className="pbur-topbar-inner">
                    <h1>{__("Product Prices by User Roles for WooCommerce", "price-by-user-role-for-woocommerce")}</h1>
                    <p>{__("Manage product prices by user roles for WooCommerce", "price-by-user-role-for-woocommerce")}</p>
                </div>

                <nav className="pbur-navigation-menu" aria-label={__("Plugin navigation", "price-by-user-role-for-woocommerce")}>
                    {NAV_ITEMS.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === "/"}
                            className={({ isActive }) => [
                                isActive ? "is-active" : "",
                                item.proOnly ? "pbur-nav-pro-item" : "",
                            ].filter(Boolean).join(" ")}
                        >
                            <span className={`dashicons ${item.icon}`} aria-hidden="true" />
                            {item.name}
                            {item.proOnly && <span className="pbur-pro-badge">{__("Pro", "price-by-user-role-for-woocommerce")}</span>}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </div>
    );
}

export default Header;
