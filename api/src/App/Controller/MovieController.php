<?php
/**
 * Created by PhpStorm.
 * User: valentinlacour
 * Date: 14/05/2019
 * Time: 13:43
 */

namespace App\Controller;


use Infra\Repository\MovieRepository;
use Symfony\Component\HttpFoundation\Request;

class MovieController
{

    public function last(Request $request, MovieRepository $repository)
    {
        if ($request->get('s')) {
            return $repository->search($request->get('s'));
        } else {
            return $repository->findLatest();
        }
    }

}