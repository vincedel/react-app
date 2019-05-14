<?php
/**
 * Created by PhpStorm.
 * User: valentinlacour
 * Date: 13/05/2019
 * Time: 14:23
 */

namespace Infra\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Class User
 *
 * @ORM\Entity(repositoryClass="Infra\Repository\UserRepository")
 * @ApiResource(
 *     itemOperations={
 *      "get"={
 *          "output"="Domain\User\UserOutput"
 *      }
 *      },
 *     collectionOperations={
 *      "get" = {
 *          "output"="Domain\User\UserOutput"
 *      },
 *      "signUp"={
 *          "method"="POST",
 *          "path"="/sign-up",
 *          "input"="Domain\User\UserSignUpInput",
 *          "output"="Domain\User\UserOutput"
 *      },
 *      "login"={
 *          "method"="POST",
 *          "path"="/login",
 *          "controller"="\App\Controller\UserController::login",
 *          "input"="Domain\User\UserLoginInput",
 *          "output"="Domain\User\UserLoginOutput"
 *      }
 *     }
 * )
 * @UniqueEntity("email", message="Votre adresse email a déjà été utilisé")
 */
class User implements UserInterface
{
    /**
     * @var string
     *
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="UUID")
     * @ORM\Column(type="guid")
     */
    private $id;
    /**
     * @var string
     *
     * @Assert\NotBlank(message="Veuiller saisir un prénom valide")
     * @ORM\Column(type="string", length=255)
     */
    private $fname;
    /**
     * @var string
     *
     * @Assert\NotBlank(message="Veuiller saisir un nom valide")
     * @ORM\Column(type="string", length=255)
     */
    private $name;
    /**
     * @var string
     *
     * @ORM\Column(type="string", length=255, unique=true)
     * @Assert\Email(message="Veuillez saisir un email valide")
     */
    private $email;
    /**
     * @var string
     *
     * @Assert\NotBlank(message="Veuiller saisir un mot de passe valide")
     * @Assert\Regex(
     *     pattern="/^.{0,8}$/",
     *     match=false,
     *     message="Votre mot de passe doit être composé d'au moins 8 caractères"
     * )
     * @ORM\Column(type="string", length=255)
     */
    private $password;
    /**
     * @var \DateTime
     *
     * @ORM\Column(type="date", length=255)
     */
    private $birthdate;
    /**
     * @var string
     *
     * @ORM\Column(type="string", length=255)
     */
    private $avatar;
    /**
     * @var string
     *
     * @ORM\Column(type="string", columnDefinition="ENUM('male', 'female', 'neutral')")
     */
    private $gender;
    /**
     * @var string
     *
     * @ORM\Column(type="string")
     */
    private $city;
    /**
     * @var string
     *
     * @ORM\Column(type="string", columnDefinition="ENUM('male', 'female', 'all')")
     */
    private $interestedBy;

    /**
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param string $id
     * @return User
     */
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * @return string
     */
    public function getFname()
    {
        return $this->fname;
    }

    /**
     * @param string $fname
     * @return User
     */
    public function setFname($fname)
    {
        $this->fname = $fname;

        return $this;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param string $name
     * @return User
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @param string $email
     * @return User
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * @return string
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * @param string $password
     * @return User
     */
    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getBirthdate()
    {
        return $this->birthdate;
    }

    /**
     * @param \DateTime $birthdate
     * @return User
     */
    public function setBirthdate($birthdate)
    {
        $this->birthdate = $birthdate;

        return $this;
    }

    /**
     * @return string
     */
    public function getAvatar()
    {
        return $this->avatar;
    }

    /**
     * @param string $avatar
     * @return User
     */
    public function setAvatar($avatar)
    {
        $this->avatar = $avatar;

        return $this;
    }

    /**
     * @return string
     */
    public function getGender(): string
    {
        return $this->gender;
    }

    /**
     * @param string $gender
     * @return User
     */
    public function setGender(string $gender): User
    {
        $this->gender = $gender;

        return $this;
    }

    /**
     * @return string
     */
    public function getCity(): string
    {
        return $this->city;
    }

    /**
     * @param string $city
     * @return User
     */
    public function setCity(string $city): User
    {
        $this->city = $city;

        return $this;
    }

    /**
     * @return string
     */
    public function getInterestedBy(): string
    {
        return $this->interestedBy;
    }

    /**
     * @param string $interestedBy
     * @return User
     */
    public function setInterestedBy(string $interestedBy): User
    {
        $this->interestedBy = $interestedBy;

        return $this;
    }

    public function getRoles()
    {
        return ['ROLE_USER'];
    }

    public function getSalt()
    {
        return '';
    }

    public function getUsername()
    {
        return $this->email;
    }

    public function eraseCredentials()
    {

    }

}