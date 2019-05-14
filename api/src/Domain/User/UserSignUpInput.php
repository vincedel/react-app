<?php
/**
 * Created by PhpStorm.
 * User: valentinlacour
 * Date: 13/05/2019
 * Time: 15:10
 */

namespace Domain\User;


class UserSignUpInput
{
    /**
     * @var string
     */
    private $fname;
    /**
     * @var string
     */
    private $name;
    /**
     * @var string
     */
    private $email;
    /**
     * @var string
     */
    private $password;
    /**
     * @var string
     */
    private $birthdate;
    /**
     * @var string
     */
    private $avatar;
    /**
     * @var string
     */
    private $gender;
    /**
     * @var string
     */
    private $city;

    /**
     * @return string
     */
    public function getFname()
    {
        return $this->fname;
    }

    /**
     * @param string $fname
     * @return UserLoginInput
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
     * @return UserLoginInput
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
     * @return UserLoginInput
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
     * @return UserLoginInput
     */
    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @return string
     */
    public function getBirthdate()
    {
        return $this->birthdate;
    }

    /**
     * @param string $birthdate
     * @return UserLoginInput
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
     * @return UserLoginInput
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
     * @return UserSignUpInput
     */
    public function setGender(string $gender): UserSignUpInput
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
     * @return UserSignUpInput
     */
    public function setCity(string $city): UserSignUpInput
    {
        $this->city = $city;

        return $this;
    }
}