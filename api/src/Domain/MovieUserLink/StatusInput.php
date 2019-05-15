<?php
/**
 * Created by PhpStorm.
 * User: valentinlacour
 * Date: 14/05/2019
 * Time: 15:46
 */

namespace Domain\MovieUserLink;


class StatusInput
{
    /**
     * @var boolean
     */
    private $liked;

    /**
     * @return boolean
     */
    public function isLiked(): bool
    {
        return $this->liked;
    }

    /**
     * @param boolean $liked
     * @return StatusInput
     */
    public function setLiked(bool $liked): StatusInput
    {
        $this->liked = $liked;

        return $this;
    }
}