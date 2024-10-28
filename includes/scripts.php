<?php

function accumulus_load_scripts() {

	global $accumulus_options;
	$baseAjaxUrl = 'https://itestajax.accumulus.com';

	// check to see which environment we are in
	if(isset($accumulus_options['base_ajax_url'])) {
		$baseAjaxUrl = $accumulus_options['base_ajax_url'];
	}

	wp_register_style('jquery-ui', $baseAjaxUrl.'/accumulus-widgets-2.3/dependencies/jQueryUI-1.12.0/jquery-ui.min.css');
	wp_register_style('jquery-ui-custome-theme', $baseAjaxUrl.'/accumulus-widgets-2.3/css/themes/default/jquery-ui-1.12.0.custom.css');
	wp_register_style('accumulus-ui', $baseAjaxUrl.'/accumulus-widgets-2.3/css/accumulus.ui.css');
	wp_register_style('jquery-ui', $baseAjaxUrl.'/accumulus-widgets-2.3/dependencies/jQueryUI-1.12.0/jquery-ui.min.css');

	//wp_enqueue_script('jquery', '//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js');




/*
	wp_localize_script('accumulus-processing', 'accumulus_vars', array(
			'publishable_key' => $publishable,
		)
	);*/
}
add_action('wp_enqueue_scripts', 'accumulus_load_scripts');
