import { __ } from "@wordpress/i18n";
import { Route, Routes } from "react-router-dom";
import SubNav from "../../components/SubNav";
import GeneralSettings from "./GeneralSettings";
import MultipliersSettings from "./MultipliersSettings";
import PerProductSettings from "./PerProductSettings";
import MessagesSettings from "./MessagesSettings";

const SUB_NAV = [
    { path: "/settings", label: __("General", "price-by-user-role-for-woocommerce") },
    { path: "/settings/multipliers", label: __("Multipliers", "price-by-user-role-for-woocommerce") },
    { path: "/settings/per-product", label: __("Per Product", "price-by-user-role-for-woocommerce") },
    { path: "/settings/messages", label: __("Messages", "price-by-user-role-for-woocommerce"), proOnly: true },
];

function Settings() {
    return (
        <div className="pbur-settings-page">
            <div className="pbur-page-header">
                <h2>{__("Settings", "price-by-user-role-for-woocommerce")}</h2>
                <p>{__("Configure plugin options and preferences", "price-by-user-role-for-woocommerce")}</p>
                <a
                    href="https://www.tychesoftwares.com/docs/docs/price-based-on-user-role-for-woocommerce/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pbur-docs-link"
                >
                    {__("Read the documentation", "price-by-user-role-for-woocommerce")}
                    <span className="dashicons dashicons-external" aria-hidden="true" />
                </a>
            </div>

            <SubNav links={SUB_NAV} />

            <Routes>
                <Route index element={<GeneralSettings />} />
                <Route path="multipliers" element={<MultipliersSettings />} />
                <Route path="per-product" element={<PerProductSettings />} />
                <Route path="messages" element={<MessagesSettings />} />
            </Routes>
        </div>
    );
}

export default Settings;
