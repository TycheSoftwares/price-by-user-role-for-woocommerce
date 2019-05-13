=== Price based on User Role for WooCommerce ===
Contributors: tychesoftwares
Tags: woocommerce, price by user role, woo commerce
Requires at least: 4.4
Tested up to: 5.2
Stable tag: 1.3
License: GNU General Public License v3.0
License URI: http://www.gnu.org/licenses/gpl-3.0.html

Display WooCommerce products prices by user roles.

== Description ==

**Price based on User Role for WooCommerce** plugin lets you display WooCommerce products prices by user roles.

Prices can be set **globally** or on **per product** basis.

When setting prices **globally**, you just need to set price multiplier for each user role.

When setting prices **per product** basis, you can set exact price for each product. Works with variable products.

You can also **hide product prices** for selected user roles.

= Feedback =
* We are open to your suggestions and feedback. Thank you for using or trying out one of our plugins!

== Installation ==

1. Upload the entire plugin folder to the `/wp-content/plugins/` directory.
2. Activate the plugin through the "Plugins" menu in WordPress.
3. Start by visiting plugin settings at "WooCommerce > Settings > Price by User Role".

== Changelog ==

= 1.3 - 13/05/2019 =
* Tweak - Modified the code to load the roles and prices for per product settings using jQuery instead of forcing a page reload.
* Fix - Added the uninstall.php file to ensure plugin cleans up its records when deleted.

= 1.2.2 - 16/11/2018
* Author name and URL updated due to handover of the plugins

= 1.2.1 - 31/10/2018 =
* Compatibility with WooCommerce 3.5.0 tested.

= 1.2.0 - 09/09/2018 =
* Dev - Per Product - Listing all variations for variable products (instead of "available" only).
* Dev - Code refactoring: `version_updated()` function added; autoloading plugin options; settings are saved as main class property; `admin` folder renamed etc.
* Dev - Admin setting descriptions updated. Minor meta box restyling. Outputting tooltip with `wc_help_tip()`.
* Dev - Plugin URI updated.

= 1.1.1 - 09/06/2018 =
* Dev - Plugin renamed to "Price based on User Role for WooCommerce" from "Price by User Role for WooCommerce".

= 1.1.0 - 12/05/2017 =
* Dev - WooCommerce 3.x.x compatibility - `get_formatted_variation_attributes()`.
* Dev - WooCommerce 3.x.x compatibility - Product ID.
* Dev - WooCommerce 3.x.x compatibility - Price hooks.
* Fix - `woocommerce_variation_prices_sale_price` hook fixed.
* Dev - Code refactoring - `alg_get_product_display_price()`.
* Dev - Code refactoring - Price hooks.
* Tweak - Plugin header (Text Domain etc.) updated.
* Tweak - Plugin link changed from `http://coder.fm` to `https://wpcodefactory.com`.

= 1.0.0 - 27/01/2017 =
* Initial Release.

== Upgrade Notice ==

= 1.0.0 =
This is the first release of the plugin.
