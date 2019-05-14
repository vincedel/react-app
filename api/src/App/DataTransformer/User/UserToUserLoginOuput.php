<?php
/**
 * Created by PhpStorm.
 * User: valentinlacour
 * Date: 13/05/2019
 * Time: 15:37
 */

namespace App\DataTransformer\User;


use ApiPlatform\Core\DataTransformer\DataTransformerInterface;
use Defuse\Crypto\Crypto;
use Domain\User\UserLoginOutput;
use Infra\Entity\User;

class UserToUserLoginOuput implements DataTransformerInterface
{
    /**
     * @param User $object
     * @param string $to
     * @param array $context
     * @return UserLoginOutput
     */
    public function transform($object, string $to, array $context = [])
    {
        return (new UserLoginOutput())
            ->setId($object->getId())
            ->setName($object->getName())
            ->setFname($object->getFname())
            ->setEmail($object->getEmail())
            ->setBirthdate($object->getBirthdate()->format(\DateTime::ISO8601))
            ->setAvatar($object->getAvatar())
            ->setGender($object->getGender())
            ->setCity($object->getCity())
            ->setInterestedBy($object->getInterestedBy())
            ->setToken(Crypto::encryptWithPassword($object->getId(), 'react'));
    }

    /**
     * {@inheritDoc}
     */
    public function supportsTransformation($object, string $to, array $context = []): bool
    {
        return UserLoginOutput::class === $to && $object instanceof User;
    }
}