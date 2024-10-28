=== Plugin Name ===
Contributors: accumulus
Requires at least: 3.0.1
Tested up to: 5.2.2
Stable tag: 2.5.2
License: GPLv2
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Enable fully automated (paid) subscriptions for your WordPress site or premium content.

== Description ==

This plugin enables you to include signup and customer self-service subscription management widgets connected to an Accumulus Subscription Commerce platform account into your new or existing WordPress website to achieve fully automated paid content subscriptions for your website's premium content.

The Accumulus Subscription Commerce platform provides you with all the tools needed to fully automate your customer lifecycles, including plans, signup, payments, notifications, reporting, and much more. When combined with WordPress, the leading content management and website solution on the web, it creates a powerful content monetization platform to monetize your paid/premium content online.

Please note that you will need an Accumulus account to use this WordPress plug-in. If you do not have an Accumulus account, you can obtain one at accumulus.com.

You can use the WordPress shortcode (details below) to configure and include the signup plugin. In order to use the customer portal plugin, you have to connect the Accumulus WordPress plugin via the Accumulus settings page in WordPress to an Accumulus to an account (either test or live), you can use the portal shortcode and associated attributes to display the customer self-service widget. Please note that you *must use HTTPS* on those pages within your site to use those widgets.

= Signup Shortcode =

`[accumulus_signup_form code="YOUR_PLAN_CODE_GOES_HERE" tenant_id="YOUR_ACCUMULUS_ID_GOES_HERE"]`

Optional attributes:

>    browser_unsupported_message - text/html for custom 'browser unsupported' message
>    cancellation_message - text/html shown upon cancellation of signup
>    collect_coupon - true/false value for showing coupon input (defaults to 'false')
>    confirmation_message - text/html for sign up confirmation,
>    default_country_code - default country code (defaults to 'US')
>    environment - environment setting (defaults to "live", specify "test" for test)
>    layout - determines layout of signup form as either 'single-step' or 'multi-step' (default)
>    payment_method_types - comma separated list of supported payment method types (defaults to 'credit-card')
>    reseller_id - reseller id
>    base_resource_url - base resource url for loading language file (defaults to <local plug-in directory>/public/resources)
>    sections - comma separated list of supported sections (defaults to let plug-in determine needed sections)


= Customer Subscription Management Shortcode =

`[accumulus_portal_form]`

Optional attributes:
>    environment -  defaults to "live", specify "test" for test environment
>    custom_css -  custom CSS for signup widget
>    show_profile -  true/false to show profile section
>    show_subscription_list -  true/false to show subscriptions section
>    show_statement_history -  true/false to show statements section
>    show_balance -  true/false to show balance section
>    show_usage_history -  true/false to show usage history section
>    show_usage_balances -  true/false to show usage balance section
>    show_payment_methods -  true/false to show payment methods section
>    show_make_payment -  true/false to show make payment section
>    subscription_list_cancel_subscription -  true/false to allow cancel
>    payment_methods_show_credit_cards -  true/false to show credit card(s)
>    payment_methods_show_bank_accounts -  true/false to show bank account(s)
>    payment_methods_show_billing_agreements -  true/false to show PayPal account(s)
>    paypal_confirmurl -  PayPal confirmation Url
>    paypal_cancelurl -  PayPal cancellation Url

== Installation ==

1. Upload plug-in zipfile to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Go to Settings->Accumulus to connect to an Accumulus test and/or live account. Supply the OAuth client id and client secret, obtained from within your Accumulus account (create an api client under Settings->Api Clients in Accumulus). Save the client id and client secret in WordPress and then click the "Connect" button to connect the account.
4. Place a short code (accumulus_signup_form or accumulus_portal_form) on the page where you would like the signup or portal widget to appear
5. View the page to verify the widget appears

In order to have new customer automatically created in your WordPress site as well as in Accumulus upon signup, you need to create a Webhook in Accumulus. Create the Webhook for "customer created and customer updated" event types in Accumulus and point them to your WordPress site (use the URL listed on the WordPress Accumulus settings page for this).

== Frequently Asked Questions ==

= How do I connect the plugin to my Accumulus account =

Once you have installed the plugin, you can connect it to your Accumulus account by going to the Accumulus settings page within your WordPress settings. Supply the OAuth client id and client secret, obtained from within your Accumulus account (create an api client under Settings->Api Clients in Accumulus). Save the client id and client secret in WordPress and then click the "Connect" button to connect the account.

= How do automatically create a new user in my WordPress site when he/she signs up via Accumulus =

In order to have new customer automatically created in your WordPress site as well as in Accumulus upon signup, you need to create a Webhook in Accumulus. Create the Webhook for "customer created and customer updated" event types in Accumulus and point them to your WordPress site (use the URL listed on the WordPress Accumulus settings page for this).

== Screenshots ==

1. Accumulus Subscription Commerce Signup Widget for Wordpress
2. Accumulus WordPress Settings

== Changelog ==

= 1.0 =
* Initial commit.

= 1.1 =
* Signup and portal shortcodes.

= 1.2 =
* Updated description and images.

= 1.3 =
* Fixed uninstall.

= 1.4 =
* Fixed plugin directory.

= 1.5 =
* Removed role output.

= 2.0 =
* Version 2 signup form

= 2.1 =
* Added local css

= 2.2 =
* Added grecaptcha support and card images

= 2.2.2 =
* Fixed scroll issue

= 2.2.3 =
* Removed modal css

= 2.2.4 =
* Fixed overflow issue

= 2.2.5 =
* Fix for base service and resource url change

= 2.5 =
* Version cleanup

= 2.5.1 =
* Base resource url fix

= 2.5.1 =
* Service url fix
