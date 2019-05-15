<?php
/**
 * Created by PhpStorm.
 * User: valentinlacour
 * Date: 15/05/2019
 * Time: 12:14
 */

namespace Infra\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;

/**
 * Class UserMatch
 *
 * @ORM\Entity(repositoryClass="Infra\Repository\UserMatchRepository")
 * @ApiResource(
 *     itemOperations={"get"},
 *     collectionOperations={
 *      "get"={
 *          "controller"="App\Controller\UserMatchController::getMatches",
 *          "output"="Domain\UserMatch\UserMatchOutput"
 *       },
 *      "post"={
 *          "input"="Domain\UserMatch\UserMatchInput",
 *          "output"="Domain\UserMatch\UserMatchOutput"
 *       }
 *     }
 * )
 */
class UserMatch
{
    /**
     * @var User
     *
     * @ORM\Id()
     * @ORM\ManyToOne(targetEntity="user", inversedBy="id")
     */
    private $user1;
    /**
     * @var User
     *
     * @ORM\Id()
     * @ORM\ManyToOne(targetEntity="user", inversedBy="id")
     */
    private $user2;
    /**
     * @var \DateTime
     *
     * @ORM\Column(type="datetime", length=255)
     */
    private $date;

    /**
     * @return User
     */
    public function getUser1(): User
    {
        return $this->user1;
    }

    /**
     * @param User $user1
     * @return UserMatch
     */
    public function setUser1(User $user1): UserMatch
    {
        $this->user1 = $user1;

        return $this;
    }

    /**
     * @return User
     */
    public function getUser2(): User
    {
        return $this->user2;
    }

    /**
     * @param User $user2
     * @return UserMatch
     */
    public function setUser2(User $user2): UserMatch
    {
        $this->user2 = $user2;

        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getDate(): \DateTime
    {
        return $this->date;
    }

    /**
     * @param \DateTime $date
     * @return UserMatch
     */
    public function setDate(\DateTime $date): UserMatch
    {
        $this->date = $date;

        return $this;
    }
}