<?php
/**
 * Created by PhpStorm.
 * User: valentinlacour
 * Date: 13/05/2019
 * Time: 14:42
 */

namespace App\DataTransformer\User;


use ApiPlatform\Core\DataTransformer\DataTransformerInterface;
use Domain\User\UserSignUpInput;
use Infra\Entity\User;

class UserSignUpInputToUser implements DataTransformerInterface
{
    /**
     * @param UserSignUpInput $object
     * @param string $to
     * @param array $context
     * @return User
     */
    public function transform($object, string $to, array $context = [])
    {
        /** @var User $boUser */
        $boUser = new User();

        $boUser
            ->setFname($object->getFname())
            ->setName($object->getName())
            ->setEmail($object->getEmail())
            ->setPassword($object->getPassword())
            ->setAvatar($object->getAvatar())
            ->setGender($object->getGender())
            ->setCity($object->getCity())
            ->setBirthdate(new \DateTime($object->getBirthdate()));

        return $boUser;
    }

    /**
     * {@inheritDoc}
     */
    public function supportsTransformation($object, string $to, array $context = []): bool
    {
        if ($object instanceof User) {
            return false;
        }

        return User::class === $to && UserSignUpInput::class == ($context['input']['class'] ?? null);
    }
}