<?php
session_start();
require_once 'vendor/autoload.php';

add_action('admin_menu', 'accumulus_plugin_create_menu');
add_action('admin_init', 'accumulus_handle_oauth_response');
add_action('admin_post_oauth_submit', 'accumulus_handle_oauth');
add_action('admin_post_oauth_test_submit', 'accumulus_handle_oauth_test');
add_action('admin_post_oauth_itest_submit', 'accumulus_handle_oauth_itest');

add_action('admin_post_disconnect_oauth_submit', 'accumulus_handle_oauth_disconnect');
add_action('admin_post_disconnect_oauth_test_submit', 'accumulus_handle_oauth_test_disconnect');
add_action('admin_post_disconnect_oauth_itest_submit', 'accumulus_handle_oauth_itest_disconnect');

function accumulus_plugin_create_menu() {
  add_options_page('Accumulus', 'Accumulus', 'manage_options', 'accumulus', 'accumulus_plugin_settings_page');
	add_action( 'admin_init', 'accumulus_register_plugin_settings' );
}

function accumulus_register_plugin_settings() {
	register_setting( 'accumulus-settings-group', 'accumulus_client_id' );
	register_setting( 'accumulus-settings-group', 'accumulus_client_secret' );
  register_setting( 'accumulus-settings-group', 'accumulus_testclient_id' );
	register_setting( 'accumulus-settings-group', 'accumulus_testclient_secret' );
  register_setting( 'accumulus-settings-group', 'accumulus_itestclient_id' );
  register_setting( 'accumulus-settings-group', 'accumulus_itestclient_secret' );
  register_setting( 'accumulus-settings-group', 'accumulus_webhook_auth_user' );
	register_setting( 'accumulus-settings-group', 'accumulus_webhook_auth_password' );
  register_setting( 'accumulus-settings-group', 'accumulus_active_customer_role' );
  register_setting( 'accumulus-settings-group', 'accumulus_webhook_endpoint_enabled' );
}

function accumulus_plugin_settings_page() {
?>
<div class="wrap">
<h1>Accumulus Settings</h1>

<form method="post" action="options.php">
    <?php settings_fields( 'accumulus-settings-group' ); ?>
    <?php do_settings_sections( 'accumulus-settings-group' ); ?>
    <?php
      $accumulus_active_customer_role = get_option('accumulus_active_customer_role');
      $accumulus_webhook_endpoint_enabled = get_option('accumulus_webhook_endpoint_enabled');
      if (empty($accumulus_webhook_endpoint_enabled))
        $accumulus_webhook_endpoint_enabled = false;
    ?>
    <table class="form-table">

        <tr valign="top">
        <th scope="row"><?php _e("Live Client ID:", "accumulus"); ?></th>
        <td><input type="text" name="accumulus_client_id" value="<?php echo esc_attr( get_option('accumulus_client_id') ); ?>" /></td>
        </tr>

        <tr valign="top">
        <th scope="row"><?php _e("Live Client Secret:", "accumulus"); ?></th>
        <td><input type="password" name="accumulus_client_secret" value="<?php echo esc_attr( get_option('accumulus_client_secret') ); ?>" /></td>
        </tr>

        <tr valign="top">
        <th scope="row"><?php _e("Test Client ID:", "accumulus"); ?></th>
        <td><input type="text" name="accumulus_testclient_id" value="<?php echo esc_attr( get_option('accumulus_testclient_id') ); ?>" /></td>
        </tr>

        <tr valign="top">
        <th scope="row"><?php _e("Test Client Secret:", "accumulus"); ?></th>
        <td><input type="password" name="accumulus_testclient_secret" value="<?php echo esc_attr( get_option('accumulus_testclient_secret') ); ?>" /></td>
        </tr>

        <?php if ($_GET["showitest"] == "true") { ?>
        <tr valign="top">
        <th scope="row"><?php _e("iTest Client ID:", "accumulus"); ?></th>
        <td><input type="text" name="accumulus_itestclient_id" value="<?php echo esc_attr( get_option('accumulus_itestclient_id') ); ?>" /></td>
        </tr>

        <tr valign="top">
        <th scope="row"><?php _e("iTest Client Secret:", "accumulus"); ?></th>
        <td><input type="password" name="accumulus_itestclient_secret" value="<?php echo esc_attr( get_option('accumulus_itestclient_secret') ); ?>" /></td>
        </tr>

        <?php } ?>
        <tr valign="top">
        <th scope="row"><?php _e("Webhook Enabled:", "accumulus"); ?></th>
        <td>
            <input type="checkbox" name="accumulus_webhook_endpoint_enabled" value="1"<?php checked( $accumulus_webhook_endpoint_enabled ); ?>>
            Allow automatic creation and updating of users in wordpress via Accumulus webhooks. NOTE: You also need to configure webhooks in Accumulus for customer create and update events.
            </input>
        </td>
        </tr>
        <tr valign="top">
        <th scope="row"><?php _e("Webhook Url", "accumulus"); ?></th>
        <td>
            <?php echo 'https://'.$_SERVER['HTTP_HOST'].'/?rest_route=/accumulus/v1/customers'; ?>
        </td>
        </tr>
        <tr valign="top">
        <th scope="row"><?php _e("Webhook User:", "accumulus"); ?></th>
        <td><input type="text" name="accumulus_webhook_auth_user" value="<?php echo esc_attr( get_option('accumulus_webhook_auth_user') ); ?>" /></td>
        </tr>

        <tr valign="top">
        <th scope="row"><?php _e("Webhook Password:", "accumulus"); ?></th>
        <td><input type="password" name="accumulus_webhook_auth_password" value="<?php echo esc_attr( get_option('accumulus_webhook_auth_password') ); ?>" /></td>
        </tr>
        <tr valign="top">
        <th scope="row"><?php _e("Active Customer Role:", "accumulus"); ?></th>
        <td>
            <select name="accumulus_active_customer_role">
                <?php wp_dropdown_roles( empty($accumulus_active_customer_role) ? "subscriber" : $accumulus_active_customer_role); ?>
            </select>
        </td>
        </tr>

    <?php submit_button(); ?>
</form>


<table class="form-table">
    <tr valign="top">
    <th scope="row"><?php _e("Live Account:", "accumulus"); ?></th>
    <td>
      <?php
        $token = get_option("accumulus_token");
        if (empty($token)) {
        _e("The Accumulus live account is not connected.", "accumulus");
        ?>
        <form method="post" action="<?php echo admin_url( 'admin-post.php'); ?>">
           <input type="hidden" name="action" value="oauth_submit" />
           <input class="button" type="submit" value="<?php _e("Connect Live Account", "accumulus"); ?>" />
        </form>
      <?php } else {
        _e("The Accumulus live account is connected.", "accumulus");
        ?>
        <form method="post" action="<?php echo admin_url( 'admin-post.php'); ?>">
           <input type="hidden" name="action" value="disconnect_oauth_submit" />
           <input class="button" type="submit" name="diconnect" value="<?php _e("Disconnect Live Account", "accumulus"); ?>" />
        </form>
      <?php
      }
      ?>
    </td>
    </tr>
</table>

<table class="form-table">
    <tr valign="top">
    <th scope="row"><?php _e("Test Account:", "accumulus"); ?></th>
    <td>
      <?php
        $token = get_option("accumulus_testtoken");
        if (empty($token)) {
        _e("The Accumulus test account is not connected.", "accumulus");
        ?>
        <form method="post" action="<?php echo admin_url( 'admin-post.php'); ?>">
           <input type="hidden" name="action" value="oauth_test_submit" />
           <input class="button" type="submit" value="<?php _e("Connect Test Account", "accumulus"); ?>" />
        </form>
      <?php } else {
        _e("The Accumulus test account is connected.", "accumulus");
        ?>
        <form method="post" action="<?php echo admin_url( 'admin-post.php'); ?>">
           <input type="hidden" name="action" value="disconnect_oauth_test_submit" />
           <input class="button" type="submit" name="diconnect" value="<?php _e("Disconnect Test Account", "accumulus"); ?>" />
        </form>
      <?php
      }
      ?>
    </td>
    </tr>
</table>

<?php if ($_GET["showitest"] == "true") { ?>
  <table class="form-table">
      <tr valign="top">
      <th scope="row"><?php _e("iTest Account:", "accumulus"); ?></th>
      <td>
        <?php
          $token = get_option("accumulus_itesttoken");
          if (empty($token)) {
          _e("The Accumulus iTest account is not connected.", "accumulus");
          ?>
          <form method="post" action="<?php echo admin_url( 'admin-post.php'); ?>">
             <input type="hidden" name="action" value="oauth_itest_submit" />
             <input class="button" type="submit" value="<?php _e("Connect iTest Account", "accumulus"); ?>" />
          </form>
        <?php } else {
          _e("The Accumulus iTest account is connected.", "accumulus");
          ?>
          <form method="post" action="<?php echo admin_url( 'admin-post.php'); ?>">
             <input type="hidden" name="action" value="disconnect_oauth_itest_submit" />
             <input class="button" type="submit" name="diconnect" value="<?php _e("Disconnect iTest Account", "accumulus"); ?>" />
          </form>
        <?php
        }
        ?>
      </td>
      </tr>
  </table>
<?php }

}

// remove the access token
function accumulus_handle_oauth_disconnect() {
	delete_option("accumulus_token");
  exit(wp_redirect(admin_url('options-general.php?page=accumulus')));
}

function accumulus_handle_oauth_test_disconnect() {
	delete_option("accumulus_testtoken");
  exit(wp_redirect(admin_url('options-general.php?page=accumulus')));
}

function accumulus_handle_oauth_itest_disconnect() {
	delete_option("accumulus_itesttoken");
  exit(wp_redirect(admin_url('options-general.php?page=accumulus')));
}

function accumulus_handle_oauth() {
    accumulus_handle_oauth_internal("");
}

function accumulus_handle_oauth_test() {
    accumulus_handle_oauth_internal("test");
}

function accumulus_handle_oauth_itest() {
    accumulus_handle_oauth_internal("itest");
}

// initiate obtaining an access token from the identity server
function accumulus_handle_oauth_internal($environment_prefix) {
   $client_id = get_option('accumulus_'.$environment_prefix.'client_id');
   $client_secret = get_option('accumulus_'.$environment_prefix.'client_secret');
   if ($client_id && $client_secret)
   {
      $provider = new League\OAuth2\Client\Provider\Accumulus([
         "environmentPrefix" =>  $environment_prefix,
         "clientId"          =>  $client_id,
         "clientSecret"      =>  $client_secret,
         "redirectUri"       => admin_url("options-general.php?page=accumulus"),
      ]);

     // start the OAuth workflow
     if (!isset($_GET["code"]) && $_SERVER["REQUEST_METHOD"] === "POST") {
        // If we don't have an authorization code, then get one
        $authUrl = $provider->getAuthorizationUrl();

        $_SESSION["oauth2state"] = $provider->getState();
        $_SESSION["oauth2environmentprefix"] = $environment_prefix;
        header("Location: ".$authUrl);
        exit;
     }
   }
}

// handle the response from the identity server
function accumulus_handle_oauth_response() {

	if ($_GET["page"] === "accumulus" &&
      !empty($_GET["state"]) &&
      ($_GET["state"] === $_SESSION["oauth2state"])) {
      // Get an access token (using the authorization code grant)
      $environment_prefix = $_SESSION["oauth2environmentprefix"];
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
	    }

      $token = $provider->getAccessToken("authorization_code", [
         "code" => $_GET["code"]
      ]);

      // Save the token for future use
      update_option('accumulus_'.$environment_prefix.'token', $token, TRUE );
      exit(wp_redirect(admin_url('options-general.php?page=accumulus')));
   }
}
?>
