<?php
/**
 * Created by PhpStorm.
 * User: valentinlacour
 * Date: 15/05/2019
 * Time: 14:47
 */

namespace App\DataTransformer\UserMatch;

use ApiPlatform\Core\DataTransformer\DataTransformerInterface;
use App\DataTransformer\User\UserToUserOutput;
use Domain\User\UserOutput;
use Domain\UserMatch\UserMatchOutput;
use Infra\Entity\UserMatch;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;

class UserMatchToUserMatchOutput implements DataTransformerInterface
{
    /**
     * @var UserInterface
     */
    private $user;
    /**
     * @var UserToUserOutput
     */
    private $userTransformer;

    /**
     * UserMatchToUserMatchOutput constructor.
     * @param Security $security
     * @param UserToUserOutput $userTransformer
     */
    public function __construct(Security $security, UserToUserOutput $userTransformer)
    {
        $this->user = $security->getToken()->getUser();
        $this->userTransformer = $userTransformer;
    }

    /**
     * @param UserMatch $object
     * @param string $to
     * @param array $context
     * @return UserMatchOutput
     */
    public function transform($object, string $to, array $context = [])
    {
        return (new UserMatchOutput())
            ->setUser($this->userTransformer->transform(
                $object->getUser1()->getId() !== $this->user->getId()
                    ? $object->getUser1() : $object->getUser2(),
                UserOutput::class
            ))
            ->setDate($object->getDate());
    }

    /**
     * {@inheritDoc}
     */
    public function supportsTransformation($object, string $to, array $context = []): bool
    {
        return UserMatchOutput::class === $to && $object instanceof UserMatch;
    }
}