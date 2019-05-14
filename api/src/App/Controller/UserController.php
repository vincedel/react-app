<?php
/**
 * Created by PhpStorm.
 * User: valentinlacour
 * Date: 13/05/2019
 * Time: 15:12
 */

namespace App\Controller;


use ApiPlatform\Core\Exception\FilterValidationException;
use ApiPlatform\Core\Exception\InvalidArgumentException;
use Infra\Entity\User;
use Infra\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\ConstraintViolation;
use Symfony\Component\Validator\ConstraintViolationList;

class UserController
{
    public function login(Request $request, UserRepository $repository)
    {
        /** @var User $user */
        $user = $request->attributes->get('data');

        $databaseUser = $repository->findByUsername($user->getUsername());

        if ($databaseUser->getPassword() !== $user->getPassword()) {
            $violation = new ConstraintViolation(
                'Votre mot de passe est incorrect',
                'Votre mot de passe est incorrect',
                ['password'],
                '',
                '',
                $databaseUser->getPassword()
                );
            return new ConstraintViolationList([$violation]);
        }

        return $databaseUser;
    }
}