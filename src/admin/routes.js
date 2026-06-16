import { Route, Routes } from "react-router-dom";
import { __ } from "@wordpress/i18n";
import { Dashboard, FAQs, Settings } from "./pages";
import ProFeaturePage from "./components/ProFeaturePage";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/settings/*" element={<Settings />} />
            <Route path="/rules" element={
                <ProFeaturePage
                    icon="dashicons-list-view"
                    title={__("Pricing Rules", "price-by-user-role-for-woocommerce")}
                    description={__("Build condition-based rules that automatically apply the right price to the right products, users, and quantities.", "price-by-user-role-for-woocommerce")}
                    features={[
                        __("Apply prices per user role, product, or category", "price-by-user-role-for-woocommerce"),
                        __("Set percentage or fixed-amount price adjustments", "price-by-user-role-for-woocommerce"),
                        __("Quantity-range discounts (e.g. buy 10+ units, get 20% off)", "price-by-user-role-for-woocommerce"),
                        __("Multiple rules with priority ordering", "price-by-user-role-for-woocommerce"),
                        __("Combine role-based and category-based conditions", "price-by-user-role-for-woocommerce"),
                    ]}
                />
            } />
            <Route path="/faqs" element={<FAQs />} />
        </Routes>
    );
};
