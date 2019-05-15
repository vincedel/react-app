<?php
/**
 * Created by PhpStorm.
 * User: valentinlacour
 * Date: 13/05/2019
 * Time: 14:35
 */

namespace Infra\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Infra\Entity\MovieUserLink;
use Symfony\Bridge\Doctrine\RegistryInterface;


/**
 * @method MovieUserLink|null find($id, $lockMode = null, $lockVersion = null)
 * @method MovieUserLink|null findOneBy(array $criteria, array $orderBy = null)
 * @method MovieUserLink[]    findAll()
 * @method MovieUserLink[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MovieUserLinkRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, MovieUserLink::class);
    }

    public function findByMovieIdAndUserId($movieId, $userId)
    {
        return $this
            ->createQueryBuilder('m')
            ->where('m.user = :user')
            ->andWhere('m.movie = :movie')
            ->setParameter('user', $userId)
            ->setParameter('movie', $movieId)
            ->getQuery()
            ->getOneOrNullResult();
    }
}