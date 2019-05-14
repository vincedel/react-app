<?php
/**
 * Created by PhpStorm.
 * User: valentinlacour
 * Date: 14/05/2019
 * Time: 11:58
 */

namespace Infra\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;

/**
 * Class Movie
 *
 * @ORM\Entity(repositoryClass="Infra\Repository\MovieRepository")
 * @ApiResource(
 *     collectionOperations={
 *      "get"={
 *          "method"="GET",
 *          "controller"="App\Controller\MovieController::last",
 *          "swagger_context"={
 *              "parameters"={
 *                  {
 *                      "in"="query",
 *                      "name"="s",
 *                      "type"="string",
 *                      "required"=false,
 *                      "description"="Search query"
 *                  }
 *              }
 *          }
 *      }
 *     },
 *     itemOperations={"get"}
 * )
 */
class Movie
{
    /**
     * @var int
     *
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    private $id;
    /**
     * @var string
     *
     * @ORM\Column(type="string")
     */
    private $title;
    /**
     * @var array
     *
     * @ORM\Column(type="json_array")
     */
    private $types;
    /**
     * @var string
     *
     * @ORM\Column(type="string")
     */
    private $year;
    /**
     * @var string
     *
     * @ORM\Column(type="string")
     */
    private $description;
    /**
     * @var string
     *
     * @ORM\Column(type="string")
     */
    private $poster;

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int $id
     * @return Movie
     */
    public function setId(int $id): Movie
    {
        $this->id = $id;

        return $this;
    }

    /**
     * @return string
     */
    public function getTitle(): string
    {
        return $this->title;
    }

    /**
     * @param string $title
     * @return Movie
     */
    public function setTitle(string $title): Movie
    {
        $this->title = $title;

        return $this;
    }

    /**
     * @return array
     */
    public function getTypes(): array
    {
        return $this->types;
    }

    /**
     * @param array $types
     * @return Movie
     */
    public function setTypes(array $types): Movie
    {
        $this->types = $types;

        return $this;
    }

    /**
     * @return string
     */
    public function getYear(): string
    {
        return $this->year;
    }

    /**
     * @param string $year
     * @return Movie
     */
    public function setYear(string $year): Movie
    {
        $this->year = $year;

        return $this;
    }

    /**
     * @return string
     */
    public function getDescription(): string
    {
        return $this->description;
    }

    /**
     * @param string $description
     * @return Movie
     */
    public function setDescription(string $description): Movie
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return string
     */
    public function getPoster(): string
    {
        return $this->poster;
    }

    /**
     * @param string $poster
     * @return Movie
     */
    public function setPoster(string $poster): Movie
    {
        $this->poster = $poster;

        return $this;
    }
}