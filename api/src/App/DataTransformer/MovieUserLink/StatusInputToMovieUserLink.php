<?php
/**
 * Created by PhpStorm.
 * User: valentinlacour
 * Date: 14/05/2019
 * Time: 15:47
 */

namespace App\DataTransformer\MovieUserLink;

use ApiPlatform\Core\DataTransformer\DataTransformerInterface;
use Domain\MovieUserLink\StatusInput;
use Infra\Entity\MovieUserLink;

class StatusInputToMovieUserLink implements DataTransformerInterface
{
    /**
     * @param StatusInput $object
     * @param string $to
     * @param array $context
     * @return MovieUserLink
     */
    public function transform($object, string $to, array $context = [])
    {
        $movie = new MovieUserLink();

        $movie
            ->setLiked($object->isLiked() ? 1 : -1);

        return $movie;
    }

    /**
     * {@inheritDoc}
     */
    public function supportsTransformation($object, string $to, array $context = []): bool
    {
        if ($object instanceof MovieUserLink) {
            return false;
        }

        return MovieUserLink::class === $to && StatusInput::class == ($context['input']['class'] ?? null);
    }
}