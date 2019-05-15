<?php
/**
 * Created by PhpStorm.
 * User: valentinlacour
 * Date: 13/05/2019
 * Time: 15:37
 */

namespace App\DataTransformer\MovieUserLink;


use ApiPlatform\Core\DataTransformer\DataTransformerInterface;
use Domain\MovieUserLink\StatusOutput;
use Infra\Entity\MovieUserLink;

class MovieUserLinkToStatusOutput implements DataTransformerInterface
{
    /**
     * @param MovieUserLink $object
     * @param string $to
     * @param array $context
     * @return StatusOutput
     */
    public function transform($object, string $to, array $context = [])
    {
        return (new StatusOutput())
            ->setUser($object->getUser()->getId())
            ->setMovie($object->getMovie()->getId())
            ->setLiked((bool)$object->isLiked());
    }

    /**
     * {@inheritDoc}
     */
    public function supportsTransformation($object, string $to, array $context = []): bool
    {
        return StatusOutput::class === $to && $object instanceof MovieUserLink;
    }
}