<?php
require_once 'vendor/autoload.php';

function accumulus_portal_form($atts, $content = null) {

	extract( shortcode_atts( array(
		'environment' => '',
		'show_header' => 'true',
		'header_text' => '',
		'login_screen' => 'false',
		'show_widget_headers' => 'false',
		'empty_widget_area_url' => '',
		'company_logo_url' => '',
		'custom_css' => '',
		'force_password_change' => 'true',
		'show_profile' => 'true',
		'show_subscription_list' => 'true',
		'show_statement_history' => 'true',
		'show_balance' => 'true',
		'show_header' => 'true',
		'show_usage_history' => 'true',
		'show_usage_balances' => 'true',
		'show_payment_methods' => 'true',
		'show_make_payment' => 'true',
		'profile_on_customer_edit' => '',
		'profile_on_password_change' => '',
		'profile_show_change_password' => 'true',
		'profile_tax_tnformation_countries' => '',
		'profile_vat_on_e_services' => 'false',
		'subscription_list_cancel_subscription' => 'true',
		'subscription_list_item_fields_handler' => '',
		'usage_history_skip' => '0',
		'usage_history_take' => '10',
		'payment_methods_show_credit_cards' => 'true',
		'payment_methods_show_bank_accounts' => 'false',
		'payment_methods_show_billing_agreements' => 'false',
		'payment_methods_confirm_url' => '',
		'payment_methods_cancel_url' => '',
		'vat_on_e_services' => 'false',
		'tax_information_countries' => ''
	), $atts ) );

  $customer_id = accumulus_get_current_customer_id();
	if (empty($customer_id) || $customer_id === 0) {
		echo "Invalid customer id";
		exit;
	}

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

	if (empty($resourceUrl)) {
		$resourceUrl = plugins_url('accumulus-subscription-commerce/public').'/';
  }

	$baseAjaxUrl = 'https://'.$environment_prefix.'ajax.accumulus.com';
	$token = get_option('accumulus_'.$environment_prefix.'token');
	if (empty($token)) {
    _e("The Accumulus ".$environment." account is not connected. Please connect it under the Accumulus plugin settings before using the portal form.", "accumulus");
		exit;
	}

	wp_enqueue_style('accumulus-ui-css', $resourceUrl.'/css/accumulus.ui.css');
	if (!empty($custom_css)) {
		wp_add_inline_style( 'accumulus-ui-css', $custom_css );
	}

  wp_enqueue_script('jquery-ui', 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js', array( 'jquery') );
	wp_enqueue_script('jquery-validate', 'https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.17.0/jquery.validate.min.js', array( 'jquery'));
	wp_enqueue_script('jquery-validate-methods', 'https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.17.0/additional-methods.min.js', array( 'jquery'));
	wp_enqueue_script('jquery-format-currency', $resourceUrl.'dependencies/jQueryFormatCurrencyPlugin/jquery.formatCurrency-1.4.0.js', array( 'jquery'));
	wp_enqueue_script('jquery-format-currency-us', $resourceUrl.'dependencies/jQueryFormatCurrencyPlugin/i18n/jquery.formatCurrency.en-US.js', array( 'jquery'));
	wp_enqueue_script('accumulus-core', $resourceUrl.'js/accumulus.core.js', array( 'jquery'));
	wp_enqueue_script('accumulus-ui', $resourceUrl.'js/accumulus.ui.js', array( 'jquery', 'accumulus-core'));
	wp_add_inline_script( 'accumulus-ui','
		var Accumulus = {
			resourcesUrl: "'.$resourceUrl.'",
			serviceUrl: "'.$baseAjaxUrl.'/webapi",
			global: {
					localize: false,
					defaultCountryCode: "USA"
			}
		};');

	//echo 'Access Token: ' . $token->getToken() . "<br>";
  //echo 'Already expired? ' . ($token->hasExpired() ? 'expired' : 'not expired') . "<br>";
	//echo 'Refresh Token: ' . $token->getRefreshToken() . "<br>";
	//echo 'Expired in: ' . $token->getExpires() . "<br>";

  // refresh the oauth access token if it has expired
	if ($token->hasExpired()) {
		$client_id = get_option('accumulus_'.$environment_prefix.'client_id');
		$client_secret = get_option('accumulus_'.$environment_prefix.'client_secret');
		if ($client_id && $client_secret)
		{
			 $provider = new League\OAuth2\Client\Provider\Accumulus([
				  "environmentPrefix" =>  $environment_prefix,
					"clientId"          =>  $client_id,
					"clientSecret"      =>  $client_secret,
					"redirectUri"       => admin_url("options-general.php?page=accumulus")
			 ]);
		} else {
			_e("The Accumulus ".$environment." account is not connected. Please verify the client id and secret have been configured and the account connected under the Accumulus plugin settings before using the portal form.", "accumulus");
			exit;
		}

	  $token = $provider->getAccessToken('refresh_token', [
	       'refresh_token' => $token->getRefreshToken()
    ]);
		update_option("accumulus_'.$environment_prefix.'token", $token, TRUE );
	}

  // obtain the Accumulus ajax sso token for this customer
	$client = new GuzzleHttp\Client(['base_uri' => 'https://'.$environment_prefix.'webapi.accumulus.com']);
	$headers = [
	    'Authorization' => 'Bearer ' . $token->getToken(),
	    'Accept'        => 'application/json',
	];
  $response = $client->request('GET',
					'/settings/hostedpages/portal/customers/'.$customer_id.'/token', [
	        'headers' => $headers,
					'exceptions' => false
	]);
	$statusCode = $response->getStatusCode();
  switch ($statusCode) {
  	case '200':
  		break;
		case '404':
		  _e('Customer '.$customer_id.' not found', 'accumulus');
			exit;
			break;
  	default:
			_e('Cannot get customer '.$customer_id.' ('.$statusCode.')', 'accumulus');
			exit;
  		break;
  }

	$hostedPagesTokenRespone = json_decode($response->getBody());
	ob_start();
  ?>

	<div class="acc-portal"
		tenantid="<?=$hostedPagesTokenRespone->{'tenantId'}?>"
		token="<?=$hostedPagesTokenRespone->{'value'}?>"
		showHeader="<?=$show_header?>"
		headerText="<?=$header_text?>"
		loginScreen="<?=$login_screen?>"
		showWidgetHeaders="<?=$show_widget_headers?>"
		emptyWidgetAreaUrl="<?=$empty_widget_area_url?>"
		companyLogoUrl="<?=$company_logo_url?>"
		force_password_change="<?=$force_password_change?>"
		showProfile="<?=$show_profile?>"
		showSubscriptionList="<?=$show_subscription_list?>"
		showStatementHistory="<?=$show_statement_history?>"
		showBalance="<?=$show_balance?>"
		showUsageHistory="<?=$show_usage_history?>"
		showUsageBalances="<?=$show_usage_balances?>"
		showPaymentMethods="<?=$show_payment_methods?>"
		showMakePayment="<?=$show_make_payment?>"
		profileOnCustomerEdit="<?=$profile_on_customer_edit?>"
		profileOnPasswordChange="<?=$profile_on_password_change?>"
		profileShowChangePassword="<?=$profile_show_change_password?>"
		profileTaxInformationCountries="<?=$profile_tax_information_countries?>"
		profileVatOnEServices="<?=$profile_vat_on_e_services?>"
		subscriptionListCancelSubscription="<?=$subscription_list_cancel_subscription?>"
		subscriptionListItemFieldsHandler="<?=$subscription_list_item_fields_handler?>"
		usageHistorySkip="<?=$usage_history_skip?>"
		usageHistoryTake="<?=$usage_history_take?>"
		paymentMethodsShowCreditCards="<?=$payment_methods_show_credit_cards?>"
		paymentMethodsShowBankAccounts="<?=$payment_methods_show_bank_accounts?>"
		paymentMethodsShowBillingAgreements="<?=$payment_methods_show_billing_agreements?>"
		paymentMethodsConfirmUrl="<?=$paymentMethods_confirm_url?>"
		paymentMethodsCancelUrl="<?=$paymentMethods_cancel_url?>"
		vatOnEServices="<?=$vat_on_e_services?>"
		taxInformationCountries="<?=$tax_information_countries?>">
  </div>
<?php

	return ob_get_clean();
}
add_shortcode('accumulus_portal_form', 'accumulus_portal_form');
