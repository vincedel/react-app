<?php
/**
 * Created by PhpStorm.
 * User: valentinlacour
 * Date: 13/05/2019
 * Time: 15:35
 */

namespace Domain\User;


class UserLoginOutput extends UserOutput
{
    /**
     * @var string
     */
    private $token;

    /**
     * @return string
     */
    public function getToken(): string
    {
        return $this->token;
    }

    /**
     * @param string $token
     * @return UserLoginOutput
     */
    public function setToken(string $token): UserLoginOutput
    {
        $this->token = $token;

        return $this;
    }
}