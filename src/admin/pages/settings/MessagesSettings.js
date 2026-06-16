import { __ } from "@wordpress/i18n";
import { TEXT_DOMAIN } from "../../constants";
import ProFeaturePage from "../../components/ProFeaturePage";

function MessagesSettings() {
    return (
        <ProFeaturePage
            icon="dashicons-format-chat"
            title={__("Custom Price Messages", TEXT_DOMAIN)}
            description={__("Control what users see when a product price is hidden or unavailable for their role.", TEXT_DOMAIN)}
            features={[
                __("Custom message when a product price is hidden for a role", TEXT_DOMAIN),
                __("Custom message when a product has no price set for a role", TEXT_DOMAIN),
                __("Messages shown on shop, archive, and product pages", TEXT_DOMAIN),
                __("Enable or disable messages per role", TEXT_DOMAIN),
                __("Full HTML support in message content", TEXT_DOMAIN),
            ]}
        />
    );
}

export default MessagesSettings;
