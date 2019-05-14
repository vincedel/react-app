<?php
/**
 * Created by PhpStorm.
 * User: valentinlacour
 * Date: 13/05/2019
 * Time: 15:37
 */

namespace App\DataTransformer\User;


use ApiPlatform\Core\DataTransformer\DataTransformerInterface;
use Domain\User\UserOutput;
use Infra\Entity\User;

class UserToUserOuput implements DataTransformerInterface
{
    /**
     * @param User $object
     * @param string $to
     * @param array $context
     * @return UserOutput
     */
    public function transform($object, string $to, array $context = [])
    {
        return (new UserOutput())
            ->setId($object->getId())
            ->setName($object->getName())
            ->setFname($object->getFname())
            ->setEmail($object->getEmail())
            ->setGender($object->getGender())
            ->setCity($object->getCity())
            ->setBirthdate($object->getBirthdate()->format(\DateTime::ISO8601))
            ->setAvatar($object->getAvatar());
    }

    /**
     * {@inheritDoc}
     */
    public function supportsTransformation($object, string $to, array $context = []): bool
    {
        return UserOutput::class === $to && $object instanceof User;
    }
}