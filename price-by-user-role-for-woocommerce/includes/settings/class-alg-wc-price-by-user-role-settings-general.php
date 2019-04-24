<?php
/**
 * Price by User Role for WooCommerce - General Section Settings
 *
 * @version 1.2.0
 * @since   1.0.0
 * @author  Tyche Softwares
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

if ( ! class_exists( 'Alg_WC_Price_By_User_Role_Settings_General' ) ) :

class Alg_WC_Price_By_User_Role_Settings_General extends Alg_WC_Price_By_User_Role_Settings_Section {

	/**
	 * Constructor.
	 *
	 * @version 1.0.0
	 * @since   1.0.0
	 */
	function __construct() {
		$this->id   = '';
		$this->desc = __( 'General', 'price-by-user-role-for-woocommerce' );
		parent::__construct();
	}

	/**
	 * get_section_settings.
	 *
	 * @version 1.2.0
	 * @since   1.0.0
	 */
	function get_section_settings() {
		$settings = array(
			array(
				'title'    => __( 'Price by User Role Options', 'price-by-user-role-for-woocommerce' ),
				'type'     => 'title',
				'id'       => 'alg_wc_price_by_user_role_options',
			),
			array(
				'title'    => __( 'WooCommerce Price by User Role', 'price-by-user-role-for-woocommerce' ),
				'desc'     => '<strong>' . __( 'Enable plugin', 'price-by-user-role-for-woocommerce' ) . '</strong>',
				'desc_tip' => __( 'Price based on User Role for WooCommerce.', 'price-by-user-role-for-woocommerce' ),
				'id'       => 'alg_wc_price_by_user_role_enabled',
				'default'  => 'yes',
				'type'     => 'checkbox',
			),
			array(
				'title'    => __( 'Search engine bots', 'price-by-user-role-for-woocommerce' ),
				'desc'     => __( 'Disable "Price by User Role" for bots', 'price-by-user-role-for-woocommerce' ),
				'id'       => 'alg_wc_price_by_user_role_for_bots_disabled',
				'default'  => 'no',
				'type'     => 'checkbox',
			),
			array(
				'type'     => 'sectionend',
				'id'       => 'alg_wc_price_by_user_role_options',
			),
		);
		return $settings;
	}

}

endif;

return new Alg_WC_Price_By_User_Role_Settings_General();
