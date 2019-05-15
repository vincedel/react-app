<?php
/**
 * Created by PhpStorm.
 * User: valentinlacour
 * Date: 15/05/2019
 * Time: 09:59
 */

namespace Domain\MovieUserLink;


class StatusOutput
{
    /**
     * @var int
     */
    private $movie;
    /**
     * @var string
     */
    private $user;
    /**
     * @var boolean
     */
    private $liked;

    /**
     * @return int
     */
    public function getMovie(): int
    {
        return $this->movie;
    }

    /**
     * @param int $movie
     * @return StatusOutput
     */
    public function setMovie(int $movie): StatusOutput
    {
        $this->movie = $movie;

        return $this;
    }

    /**
     * @return string
     */
    public function getUser(): string
    {
        return $this->user;
    }

    /**
     * @param string $user
     * @return StatusOutput
     */
    public function setUser(string $user): StatusOutput
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return boolean
     */
    public function isLiked(): bool
    {
        return $this->liked;
    }

    /**
     * @param boolean $liked
     * @return StatusOutput
     */
    public function setLiked(bool $liked): StatusOutput
    {
        $this->liked = $liked;

        return $this;
    }
}