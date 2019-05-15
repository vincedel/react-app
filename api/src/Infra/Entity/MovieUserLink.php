<?php
/**
 * Created by PhpStorm.
 * User: valentinlacour
 * Date: 14/05/2019
 * Time: 15:00
 */

namespace Infra\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;

/**
 * Class MovieUserLink
 *
 * @ORM\Entity(repositoryClass="Infra\Repository\MovieUserLinkRepository")
 * @ApiResource(
 *     itemOperations={
 *      "get_status"={
 *          "method"="GET",
 *          "path"="/movies/{id}/status",
 *          "output"="Domain\MovieUserLink\StatusOutput",
 *          "controller"="App\Controller\MovieUserLinkController::getStatus",
 *          "swagger_context"={
 *              "parameters"={
 *                  {
 *                      "in"="path",
 *                      "name"="id",
 *                      "type"="string",
 *                      "required"=true,
 *                      "description"="Movie id"
 *                  }
 *              }
 *          },
 *          "defaults"={"_api_receive"=false}
 *       }
 *      },
 *     collectionOperations={
 *      "like_movie"={
 *          "method"="POST",
 *          "path"="/movies/{id}/status",
 *          "input"="Domain\MovieUserLink\StatusInput",
 *          "output"="Domain\MovieUserLink\StatusOutput",
 *          "controller"="App\Controller\MovieUserLinkController::likeMovie",
 *          "swagger_context"={
 *              "parameters"={
 *                  {
 *                      "in"="path",
 *                      "name"="id",
 *                      "type"="string",
 *                      "required"=true,
 *                      "description"="Movie id"
 *                  }
 *              }
 *          }
 *      },
 *     "update_like_movie"={
 *          "method"="PUT",
 *          "path"="/movies/{id}/status",
 *          "input"="Domain\MovieUserLink\StatusInput",
 *          "output"="Domain\MovieUserLink\StatusOutput",
 *          "controller"="App\Controller\MovieUserLinkController::likeMovie",
 *          "swagger_context"={
 *              "parameters"={
 *                  {
 *                      "in"="path",
 *                      "name"="id",
 *                      "type"="string",
 *                      "required"=true,
 *                      "description"="Movie id"
 *                  }
 *              }
 *          }
 *      }
 *     }
 * )
 */
class MovieUserLink
{
    /**
     * @var Movie
     *
     * @ORM\Id()
     * @ORM\ManyToOne(targetEntity="movie", inversedBy="id")
     */
    private $movie;
    /**
     * @var User
     *
     * @ORM\Id()
     * @ORM\ManyToOne(targetEntity="user", inversedBy="id")
     */
    private $user;
    /**
     * @var int
     *
     * @ORM\Column(type="smallint")
     */
    private $liked;

    /**
     * @return Movie
     */
    public function getMovie(): Movie
    {
        return $this->movie;
    }

    /**
     * @param Movie $movie
     * @return MovieUserLink
     */
    public function setMovie(Movie $movie): MovieUserLink
    {
        $this->movie = $movie;

        return $this;
    }

    /**
     * @return User
     */
    public function getUser(): User
    {
        return $this->user;
    }

    /**
     * @param User $user
     * @return MovieUserLink
     */
    public function setUser(User $user): MovieUserLink
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return int
     */
    public function isLiked(): int
    {
        return $this->liked;
    }

    /**
     * @param int $liked
     * @return MovieUserLink
     */
    public function setLiked(int $liked): MovieUserLink
    {
        $this->liked = $liked;

        return $this;
    }
}