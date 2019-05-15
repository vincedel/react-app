<?php
/**
 * Created by PhpStorm.
 * User: valentinlacour
 * Date: 15/05/2019
 * Time: 14:47
 */

namespace Domain\UserMatch;


use Domain\User\UserOutput;

class UserMatchOutput
{
    /**
     * @var UserOutput
     */
    private $user;
    /**
     * @var \DateTime
     */
    private $date;

    /**
     * @return UserOutput
     */
    public function getUser(): UserOutput
    {
        return $this->user;
    }

    /**
     * @param UserOutput $user
     * @return UserMatchOutput
     */
    public function setUser(UserOutput $user): UserMatchOutput
    {
        $this->user = $user;

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
     * @return UserMatchOutput
     */
    public function setDate(\DateTime $date): UserMatchOutput
    {
        $this->date = $date;

        return $this;
    }
}