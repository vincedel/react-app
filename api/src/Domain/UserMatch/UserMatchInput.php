<?php
/**
 * Created by PhpStorm.
 * User: valentinlacour
 * Date: 15/05/2019
 * Time: 15:52
 */

namespace Domain\UserMatch;


class UserMatchInput
{
    /**
     * @var string
     */
    private $user;

    /**
     * @return string
     */
    public function getUser(): string
    {
        return $this->user;
    }

    /**
     * @param string $user
     * @return UserMatchInput
     */
    public function setUser(string $user): UserMatchInput
    {
        $this->user = $user;

        return $this;
    }
}