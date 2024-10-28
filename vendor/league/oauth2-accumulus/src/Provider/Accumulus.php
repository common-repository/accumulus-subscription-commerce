<?php

namespace League\OAuth2\Client\Provider;

use League\OAuth2\Client\Provider\Exception\AccumulusIdentityProviderException;
use League\OAuth2\Client\Token\AccessToken;
use League\OAuth2\Client\Tool\BearerAuthorizationTrait;
use Psr\Http\Message\ResponseInterface;

class Accumulus extends AbstractProvider
{
    use BearerAuthorizationTrait;

    /**
     * @var string
     */
    public $environmentPrefix = '';

    /**
     * Domain
     *
     * @var string
     */
    public $domain = 'identity.accumulus.com';

    /**
     * Api domain
     *
     * @var string
     */
    public $apiDomain = 'webapi.accumulus.com';

    /**
     * Get authorization url to begin OAuth flow
     *
     * @return string
     */
    public function getBaseAuthorizationUrl()
    {
        return 'https://'.$this->environmentPrefix.$this->domain.'/connect/authorize';
    }

    /**
     * Get access token url to retrieve token
     *
     * @param  array $params
     *
     * @return string
     */
    public function getBaseAccessTokenUrl(array $params)
    {
        return 'https://'.$this->environmentPrefix.$this->domain.'/connect/token';
    }

    /**
     * Get provider url to fetch user details
     *
     * @param  AccessToken $token
     *
     * @return string
     */
    public function getResourceOwnerDetailsUrl(AccessToken $token)
    {
        return 'https://'.$this->environmentPrefix.$this->domain.'/connect/userinfo';
    }

    /**
     * Get the default scopes used by this provider.
     *
     * This should not be a complete list of all scopes, but the minimum
     * required for the provider user interface!
     *
     * @return array
     */
    protected function getDefaultScopes()
    {
        return ['api','offline_access'];
    }

    /**
     * Returns the string that should be used to separate scopes when building
     * the URL for requesting an access token.
     *
     * @return string Scope separator, defaults to ' '
     */
    protected function getScopeSeparator()
    {
        return ' ';
    }

    /**
     * Check a provider response for errors.
     *
     * @throws IdentityProviderException
     * @param  ResponseInterface $response
     * @param  string $data Parsed response data
     * @return void
     */
    protected function checkResponse(ResponseInterface $response, $data)
    {
        if ($response->getStatusCode() >= 400) {
            throw AccumulusIdentityProviderException::clientException($response, $data);
        } elseif (isset($data['error'])) {
            throw AccumulusIdentityProviderException::oauthException($response, $data);
        }
    }

    /**
     * Generate a user object from a successful user details request.
     *
     * @param array $response
     * @param AccessToken $token
     * @return League\OAuth2\Client\Provider\ResourceOwnerInterface
     */
    protected function createResourceOwner(array $response, AccessToken $token)
    {
        $user = new AccumulusResourceOwner($response);

        return $user->setDomain('https://'.$this->environmentPrefix.$this->domain);
    }
}
