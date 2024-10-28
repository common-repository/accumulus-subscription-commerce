<?php
/*
Plugin Name: Accumulus Subscription Commerce
Plugin URI: https://accumulus.com/wordpress
Description: Enable fully automated (paid) subscriptions for your WordPress site or premium content.
Author: Accumulus
Author URI: https://accumulus.com
Version: 2.5.2
License: GPLv2
License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/

/**********************************
* constants and globals
**********************************/

if(!defined('ACCUMULUS_BASE_URL')) {
	define('ACCUMULUS_BASE_URL', plugin_dir_url(__FILE__));
}
if(!defined('ACCUMULUS_BASE_DIR')) {
	define('ACCUMULUS_BASE_DIR', dirname(__FILE__));
}

$accumulus_options = get_option('accumulus_settings');

/*******************************************
* plugin text domain for translations
*******************************************/

load_plugin_textdomain( 'accumulus', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );

/**********************************
* includes
**********************************/

if(is_admin()) {
	// load admin includes
	include(ACCUMULUS_BASE_DIR . '/settings.php');
	include(ACCUMULUS_BASE_DIR . '/includes/accumulus-functions.php');

} else {

	// load front-end includes
	include(ACCUMULUS_BASE_DIR . '/signup_form_shortcode.php');
  include(ACCUMULUS_BASE_DIR . '/portal_form_shortcode.php');
	include(ACCUMULUS_BASE_DIR . '/includes/accumulus-functions.php');
}

/**********************************
* uninstall hook
**********************************/

function accumulus_activate(){
    register_uninstall_hook( __FILE__, 'accumulus_uninstall' );
}
register_activation_hook( __FILE__, 'accumulus_activate' );

// And here goes the uninstallation function:
function accumulus_uninstall(){
    //  codes to perform during unistallation
}
