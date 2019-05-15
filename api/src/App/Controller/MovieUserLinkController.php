<?php
/**
 * Created by PhpStorm.
 * User: valentinlacour
 * Date: 14/05/2019
 * Time: 15:51
 */

namespace App\Controller;


use Infra\Entity\MovieUserLink;
use Infra\Repository\MovieRepository;
use Infra\Repository\MovieUserLinkRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Security\Core\User\UserInterface;

class MovieUserLinkController
{

    public function likeMovie($id, Request $request, MovieRepository $movieRepository, UserInterface $user)
    {
        /** @var MovieUserLink $userMovieLink */
        $userMovieLink = $request->attributes->get('data');

        $userMovieLink
            ->setMovie($movieRepository->find($id))
            ->setUser($user);

        return $userMovieLink;
    }

    public function getStatus($id, MovieUserLinkRepository $repository, UserInterface $user)
    {
        $movieUserLink = $repository->findByMovieIdAndUserId($id, $user->getId());

        if (!$movieUserLink) {
            throw new NotFoundHttpException();
        }

        return $movieUserLink;
    }

}