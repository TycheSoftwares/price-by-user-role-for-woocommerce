import { __ } from "@wordpress/i18n";
import Alert from "./Alert";

const TYCHE_URL = "https://www.tychesoftwares.com";
const SUPPORT_URL =
    "https://wordpress.org/support/plugin/price-by-user-role-for-woocommerce/";
const REVIEW_URL =
    "https://wordpress.org/support/plugin/price-by-user-role-for-woocommerce/reviews/#new-post";

function Footer() {
    return (
        <div id="pbur-footer">
            <p>
                <a
                    href={SUPPORT_URL}
                    target="_blank"
                    rel="noreferrer"
                    title={__("Open the support forum for this plugin on WordPress.org", "price-by-user-role-for-woocommerce")}
                >
                    {__("Need Support?", "price-by-user-role-for-woocommerce")}
                </a>{" "}
                {__("We're always happy to help you.", "price-by-user-role-for-woocommerce")}
            </p>
            <p>
                {__("If this plugin helped you,", "price-by-user-role-for-woocommerce")}{" "}
                <a
                    href={REVIEW_URL}
                    target="_blank"
                    rel="noreferrer"
                    title={__("Leave a review for this plugin on WordPress.org", "price-by-user-role-for-woocommerce")}
                >
                    {__("please rate it", "price-by-user-role-for-woocommerce")}
                </a>{" "}
                <span aria-hidden="true" style={{ color: "#f0ad00" }}>{"★".repeat(5)}</span>
            </p>
            <p>
                {__("Check out more plugins by", "price-by-user-role-for-woocommerce")}{" "}
                <a
                    href={TYCHE_URL}
                    target="_blank"
                    rel="noreferrer"
                    title={__("Visit Tyche Softwares to explore more WooCommerce plugins", "price-by-user-role-for-woocommerce")}
                >
                    {__("Tyche Softwares", "price-by-user-role-for-woocommerce")}
                </a>
                {"."}
            </p>
        </div>
    );
}

export default Footer;
