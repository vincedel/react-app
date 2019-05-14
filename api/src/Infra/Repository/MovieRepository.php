<?php
/**
 * Created by PhpStorm.
 * User: valentinlacour
 * Date: 13/05/2019
 * Time: 14:35
 */

namespace Infra\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Infra\Entity\Movie;
use Symfony\Bridge\Doctrine\RegistryInterface;


/**
 * @method Movie|null find($id, $lockMode = null, $lockVersion = null)
 * @method Movie|null findOneBy(array $criteria, array $orderBy = null)
 * @method Movie[]    findAll()
 * @method Movie[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MovieRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Movie::class);
    }

    public function findLatest()
    {
        return $this
            ->createQueryBuilder('m')
            ->orderBy('m.year', 'DESC')
            ->setMaxResults(15)
            ->getQuery()
            ->getResult();
    }

    public function search($query)
    {
        return $this
            ->createQueryBuilder('m')
            ->where('m.title LIKE :title')
            ->setParameter('title', '%'.$query.'%')
            ->setMaxResults(15)
            ->getQuery()
            ->getResult();
    }
}