<?php
require_once 'vendor/autoload.php';

function accumulus_signup_form($atts, $content = null) {

	extract( shortcode_atts( array(
			  'code' => '',
		    'browser_unsupported_message' => 'Your current browser is unsupported.',
				'cancellation_message' => '',
				'collect_coupon' => 'false',
				'confirmation_message' => 'Your have successfully subscribed.',
				'default_country_code' => 'US',
				'environment' => '',
				'grecaptcha_site_key' => '',
				'layout' => 'multi-step',
				'no_payment' => false,
				'payment_method_types' => 'credit-card',
				'reseller_id' => '',
				'base_resource_url' => plugins_url('accumulus-subscription-commerce/public').'/resources',
				'sections' => '',
				'tenant_id' => ''
	), $atts ) );

  switch (strtolower($environment))
	{
			case "test":
					$environment_prefix = "test";
			break;

			case "itest":
					$environment_prefix = "itest";
			break;

			default:
				  $environment_prefix = "";

	}

  $paymentMethod = '';
  if ($no_payment) {
		$paymentMethod = ', paymentMethod: {type: "none", agreement: {}, bankAccount: {}, creditCard: {}}';
	}

	$sections = str_replace(' ', '', $sections);
	$sections = '["'.str_replace(',', '","', $sections).'"]';

  $payment_method_types = str_replace(' ', '', $payment_method_types);
	$payment_method_types = '["'.str_replace(',', '","', $payment_method_types).'"]';

	wp_enqueue_style('accumulus-base-css', plugins_url('accumulus-subscription-commerce/public/css/base.css'));
	//wp_enqueue_style('accumulus-modal-css', plugins_url('accumulus-subscription-commerce/public/css/modal.css'));
	wp_enqueue_style('accumulus-theme-css', plugins_url('accumulus-subscription-commerce/public/css/theme.css'));

	if($grecaptcha_site_key) {
		wp_enqueue_script('accumulus-signup', 'https://'.$environment_prefix.'portal.accumulus.com/scripts/signup.js?noCss=true&recaptchaSiteKey='.$grecaptcha_site_key);
	} else {
	  wp_enqueue_script('accumulus-signup', 'https://'.$environment_prefix.'portal.accumulus.com/scripts/signup.js?noCss=true');
  }

  $signup_div_name = 'signup'.uniqid();

	ob_start();
  ?>
	<div id="<?=$signup_div_name?>"/>

<?php
wp_add_inline_script( 'accumulus-signup','
<script>

						accumulus.showSignup("#'.$signup_div_name.'",
						{
							  tenantId: "'.$tenant_id.'",
							  planCode: "'.$code.'",
								collectCoupon: '.$collect_coupon.',
								layout: "'.$layout.'",
								paymentMethodTypes: '.$payment_method_types.',
								paymentIconsUrl:"'.plugins_url('accumulus-subscription-commerce/public').'/images",
								sections: '.$sections.',
								serviceUrl: "https://'.$environment_prefix.'webapi.accumulus.com/signup",
								baseResourcesUrl:"'.$base_resource_url.'",
								resellerId: "'.$reseller_id.'",
								confirmationMessage: "'.$confirmation_message.'",
								cancellationMessage: "'.$cancellation_message.'",
								browserUnsupportedMessage: "'.$browser_unsupported_message.'",
								partialValue: {
									address: {
											countryCode: "'.$default_country_code.'"
									}'.$paymentMethod.'
								}
						});
</script>
');

	return ob_get_clean();
}
add_shortcode('accumulus_signup_form', 'accumulus_signup_form');
