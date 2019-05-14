<?php

namespace App\Authentication;

use Defuse\Crypto\Crypto;
use Infra\Repository\UserRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Guard\AbstractGuardAuthenticator;
use Symfony\Component\Security\Guard\AuthenticatorInterface;

/**
 * Created by PhpStorm.
 * User: valentinlacour
 * Date: 13/05/2019
 * Time: 16:01
 */
class DefaultAuthenticator extends AbstractGuardAuthenticator implements AuthenticatorInterface
{

    /**
     * @var UserRepository
     */
    private $repository;

    /**
     * DefaultAuthentificator constructor.
     * @param UserRepository $repository
     */
    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * {@inheritDoc}
     */
    public function start(Request $request, AuthenticationException $authException = null)
    {
        $message = 'Auth header required';

        if ($authException && $authException->getPrevious() && $authException->getPrevious()->getCode() == 403) {
            $message = $authException->getPrevious()->getMessage();
        }

        return new JsonResponse(['message' => $message], 403);
    }

    /**
     * {@inheritDoc}
     */
    public function supports(Request $request)
    {
        return !in_array($request->getPathInfo(), ['/', '/login', '/sign-up']);
    }

    /**
     * {@inheritDoc}
     */
    public function getCredentials(Request $request)
    {
        return ['api_key' => $request->headers->get('X-AUTH-TOKEN')];
    }

    /**
     * {@inheritDoc}
     */
    public function getUser($credentials, UserProviderInterface $userProvider)
    {
        if (!isset($credentials['api_key'])) {
            throw new AuthenticationException('No Authentication Header');
        }

        try {
            return $this->getUserFromToken($credentials['api_key']);
        } catch (\Exception $e) {
            throw new AuthenticationException("Login Error");
        }

    }


    public function getUserFromToken($apiKey)
    {
        die(Crypto::decryptWithPassword($apiKey, 'react'));
        return $this->repository->find(Crypto::decryptWithPassword($apiKey, 'react'));
    }

    /**
     * {@inheritDoc}
     */
    public function checkCredentials($credentials, UserInterface $user)
    {
        return true;
    }

    /**
     * {@inheritDoc}
     */
    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        return new JsonResponse(["message" => $exception->getMessage()], 403);
    }

    /**
     * {@inheritDoc}
     */
    public function onAuthenticationSuccess(Request $request, TokenInterface $token, $providerKey)
    {
        return null;
    }

    /**
     * {@inheritDoc}
     */
    public function supportsRememberMe()
    {
        return false;
    }
}