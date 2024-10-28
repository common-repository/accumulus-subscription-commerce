<?php

if (is_admin()) {
	add_action( 'edit_user_profile', 'accumulus_custom_user_profile_fields', 10, 1 ); // for other user profiles
	add_action( 'edit_user_profile_update', 'accumulus_save_custom_user_profile_fields' ); // for other user profiles
}

 // Register the rest route here.
 add_action( 'rest_api_init', function () {
				register_rest_route( 'accumulus/v1', 'customers',array(
						'methods'  => 'POST',
						'callback' => 'accumulus_new_customer_handler'
				) );
				register_rest_route( 'accumulus/v1', 'customers',array(
						'methods'  => 'PUT',
						'callback' => 'accumulus_update_customer_handler'
				) );
 } );

// retrieve the accumulus customer id for the current user
function accumulus_get_current_customer_id() {
    if ( ! function_exists( 'wp_get_current_user' ) )
        return 0;
    $user = wp_get_current_user();
    return ( isset( $user->accumulus_id) ? (int) $user->accumulus_id : 0 );
}

// show the accumulus customer id field in the profile editor for admin users
function accumulus_custom_user_profile_fields( $user )
{
    echo '<h3 class="heading">Accumulus</h3>';
    ?>
    <table class="form-table">
    <tr>
      <th><label for="contact">Customer Id</label></th>
      <td><input type="text" class="input-text form-control" name="accumulus_id" id="accumulus_id"
				value="<?php echo esc_attr( get_the_author_meta( 'accumulus_id', $user->ID ) ); ?>"/>
      </td>
    </tr>
    </table>

    <?php
}

// save the accumulus customer id
function accumulus_save_custom_user_profile_fields( $user_id )
{
    $custom_data = $_POST['accumulus_id'];
    update_user_meta( $user_id, 'accumulus_id', $custom_data );
}

function accumulus_authenticate_webhook() {
	header("Content-Type: application/json");
	if ($_SERVER["CONTENT_TYPE"] != 'application/json') {
			echo json_encode(array('success' => false, 'error' => 'Wrong content type selected'));
			exit;
	}

	$accumulus_webhook_endpoint_enabled = get_option('accumulus_webhook_endpoint_enabled');
	if (empty($accumulus_webhook_endpoint_enabled) || $accumulus_webhook_endpoint_enabled === false) {
			echo json_encode(array('success' => false, 'error' => 'Accumulus webhooks are not enabled'));
			exit;
	}

	$webhook_auth_user = get_option('accumulus_webhook_auth_user');
	$webhook_auth_password = get_option('accumulus_webhook_auth_password');
	if (!empty($webhook_auth_user) &&
			!empty($webhook_auth_password) &&
			($webhook_auth_user !== $_SERVER['PHP_AUTH_USER']) ||
			 $webhook_auth_password !== $_SERVER['PHP_AUTH_PW']) {
		 echo json_encode(array('success' => false, 'error' => 'authentication failed'));
		 exit;
	}
}

 function accumulus_new_customer_handler()
 {
	 	accumulus_authenticate_webhook();
		$raw_data = file_get_contents('php://input');
    $data = json_decode($raw_data);
    $customer = accumulus_add_customer($data);
    echo json_encode(array('success' => true, 'customer' => $customer));
    exit;
 }

 function accumulus_update_customer_handler()
 {
	 	accumulus_authenticate_webhook();
		$raw_data = file_get_contents('php://input');
    $data = json_decode($raw_data);
    $customer = accumulus_update_customer($data);
    echo json_encode(array('success' => true, 'customer' => $customer));
    exit;
 }

 function accumulus_get_user_by_id( $id ) {
 		// Query for users based on the meta data
 		$user_query = new WP_User_Query(
 				array(
 					'meta_key'	  =>	'accumulus_id',
 					'meta_value'	=>	$id
 				)
 		);
 		// Get the results from the query, returning the first user
 		$users = $user_query->get_results();
 		return $user = empty ( $users[0] ) ? null : $users[0];
 }

 function accumulus_update_customer($customer) {
	 	$user = accumulus_get_user_by_id($customer->id);
   	if (empty($user)) {
		 	echo json_encode(array('success' => false, 'error' => 'Customer not found '.$customer->id));
		 	exit;
	 	}

		$user_id = wp_update_user( array(
			'ID' => $user->id,
			'user_email' => $customer->primaryContact->email,
			'first_name' => $customer->primaryContact->firstName,
			'last_name' => $customer->primaryContact->lastName
		) );

		$active_customer_role = get_option('accumulus_active_customer_role');
	 	if ($customer->status === "active") {
				$user->add_role( $active_customer_role );
	 	} else {
		 		$user->remove_role( $active_customer_role );
	 	}
	 return $customer;
 }

 function accumulus_add_customer($customer) {

	 $user_name = $customer->primaryContact->email;
	 $user_email = $customer->primaryContact->email;
	 $user_id = username_exists( $user_name );
	 if ( !$user_id and email_exists($user_email) == false ) {
	 		$random_password = wp_generate_password( $length=12, $include_standard_special_chars=false );
	 		$user_id = wp_create_user( $user_name, $random_password, $user_email );
			wp_update_user( array(
				'ID' => $user_id,
				'first_name' => $customer->primaryContact->firstName,
				'last_name' => $customer->primaryContact->lastName
			) );
			wp_new_user_notification($user_id, $random_password);
	 } else {
       $user = accumulus_get_user_by_id($customer->id);
      	if (empty($user)) {
   		 	  echo json_encode(array('success' => false, 'error' => 'Customer email already exists '.$customer->primaryContact->email));
   		 	  exit;
   	 	  } else {
          return accumulus_update_customer($customer);
        }
	 }

	 update_user_meta($user_id, 'accumulus_id', $customer->id);

	 if ($customer->status === "active") {
			 $user = new WP_User( $user_id );
			 $user->set_role( get_option('accumulus_active_customer_role') );
	 }

	 return $customer;
 }
