<?php
/**
 * Created by PhpStorm.
 * User: valentinlacour
 * Date: 13/05/2019
 * Time: 15:12
 */

namespace App\Controller;


use ApiPlatform\Core\Bridge\Symfony\Validator\Exception\ValidationException;
use Infra\Entity\User;
use Infra\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\ConstraintViolation;
use Symfony\Component\Validator\ConstraintViolationList;

class UserController
{
    public function login(Request $request, UserRepository $repository)
    {
        /** @var User $user */
        $user = $request->attributes->get('data');

        $databaseUser = $repository->findByUsername($user->getUsername());

        if (is_null($databaseUser)) {
            $violation = new ConstraintViolation(
                'Aucun compte n\'est liè à cet email',
                'Aucun compte n\'est liè à cet email',
                ['email'],
                '',
                '',
                $user->getUsername()
            );
            throw new ValidationException(new ConstraintViolationList([$violation]));
        }

        if ($databaseUser->getPassword() !== $user->getPassword()) {
            $violation = new ConstraintViolation(
                'Votre mot de passe est incorrect',
                'Votre mot de passe est incorrect',
                ['password'],
                '',
                '',
                $user->getPassword()
                );
            throw new ValidationException(new ConstraintViolationList([$violation]));
        }

        return $databaseUser;
    }

    public function getLinkedUsers(UserRepository $repository, UserInterface $user)
    {
        return $repository->findLinkedUsers($user);
    }
}