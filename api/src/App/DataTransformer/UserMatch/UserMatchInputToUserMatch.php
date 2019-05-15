<?php
/**
 * Created by PhpStorm.
 * User: valentinlacour
 * Date: 15/05/2019
 * Time: 15:54
 */

namespace App\DataTransformer\UserMatch;


use ApiPlatform\Core\DataTransformer\DataTransformerInterface;
use Domain\UserMatch\UserMatchInput;
use Infra\Entity\UserMatch;
use Infra\Repository\UserRepository;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;

class UserMatchInputToUserMatch implements DataTransformerInterface
{
    /**
     * @var UserInterface
     */
    private $user;
    /**
     * @var UserRepository
     */
    private $userReporistory;

    /**
     * UserMatchInputToUserMatch constructor.
     * @param Security $security
     * @param UserRepository $userRepository
     */
    public function __construct(Security $security, UserRepository $userRepository)
    {
        $this->user = $security->getToken()->getUser();
        $this->userReporistory = $userRepository;
    }

    /**
     * @param UserMatchInput $object
     * @param string $to
     * @param array $context
     * @return UserMatch
     */
    public function transform($object, string $to, array $context = [])
    {
        /** @var UserMatch $boUser */
        $boUser = new UserMatch();

        $boUser
            ->setUser1($this->user)
            ->setUser2($this->userReporistory->find($object->getUser()))
            ->setDate(new \DateTime());

        return $boUser;
    }

    /**
     * {@inheritDoc}
     */
    public function supportsTransformation($object, string $to, array $context = []): bool
    {
        if ($object instanceof UserMatch) {
            return false;
        }

        return UserMatch::class === $to && UserMatchInput::class == ($context['input']['class'] ?? null);
    }
}