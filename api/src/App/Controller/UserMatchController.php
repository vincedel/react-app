<?php
/**
 * Created by PhpStorm.
 * User: valentinlacour
 * Date: 15/05/2019
 * Time: 12:20
 */

namespace App\Controller;


use Infra\Repository\UserMatchRepository;
use Symfony\Component\Security\Core\User\UserInterface;

class UserMatchController
{

    public function getMatches(UserMatchRepository $repository, UserInterface $user)
    {
        return $repository->getMatchesByUser($user);
    }

}