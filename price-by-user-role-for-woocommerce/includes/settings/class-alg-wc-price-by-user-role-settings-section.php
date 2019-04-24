<?php
/**
 * Price by User Role for WooCommerce - Section Settings
 *
 * @version 1.2.0
 * @since   1.0.0
 * @author  Tyche Softwares
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

if ( ! class_exists( 'Alg_WC_Price_By_User_Role_Settings_Section' ) ) :

class Alg_WC_Price_By_User_Role_Settings_Section {

	/**
	 * Constructor.
	 *
	 * @version 1.0.0
	 * @since   1.0.0
	 */
	function __construct() {
		add_filter( 'woocommerce_get_sections_alg_wc_price_by_user_role',                   array( $this, 'settings_section' ) );
		add_filter( 'woocommerce_get_settings_alg_wc_price_by_user_role' . '_' . $this->id, array( $this, 'get_settings' ), PHP_INT_MAX );
	}

	/**
	 * settings_section.
	 *
	 * @version 1.0.0
	 * @since   1.0.0
	 */
	function settings_section( $sections ) {
		$sections[ $this->id ] = $this->desc;
		return $sections;
	}

	/**
	 * get_settings.
	 *
	 * @version 1.2.0
	 * @since   1.0.0
	 */
	function get_settings() {
		return array_merge( $this->get_section_settings(), array(
			array(
				'title'     => __( 'Reset Settings', 'price-by-user-role-for-woocommerce' ),
				'type'      => 'title',
				'id'        => 'alg_wc_price_by_user_role' . '_' . $this->id . '_reset_options',
			),
			array(
				'title'     => __( 'Reset section settings', 'price-by-user-role-for-woocommerce' ),
				'desc'      => '<strong>' . __( 'Reset', 'price-by-user-role-for-woocommerce' ) . '</strong>',
				'id'        => 'alg_wc_price_by_user_role' . '_' . $this->id . '_reset',
				'default'   => 'no',
				'type'      => 'checkbox',
			),
			array(
				'type'      => 'sectionend',
				'id'        => 'alg_wc_price_by_user_role' . '_' . $this->id . '_reset_options',
			),
		) );
	}

}

endif;
