<?php
/**
 * Created by PhpStorm.
 * User: valentinlacour
 * Date: 13/05/2019
 * Time: 14:42
 */

namespace App\DataTransformer\User;


use ApiPlatform\Core\DataTransformer\DataTransformerInterface;
use Domain\User\UserLoginInput;
use Domain\User\UserSignUpInput;
use Infra\Entity\User;

class UserLoginInputToUser implements DataTransformerInterface
{
    /**
     * @param UserLoginInput $object
     * @param string $to
     * @param array $context
     * @return User
     */
    public function transform($object, string $to, array $context = [])
    {
        /** @var User $boUser */
        $boUser = new User();

        $boUser
            ->setEmail($object->getEmail())
            ->setPassword($object->getPassword());

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

        return User::class === $to && UserLoginInput::class == ($context['input']['class'] ?? null);
    }
}