<?php
/**
 * Created by PhpStorm.
 * User: valentinlacour
 * Date: 13/05/2019
 * Time: 14:35
 */

namespace Infra\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Infra\Entity\User;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;


/**
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository
{
    /**
     * @var DenormalizerInterface
     */
    private $denormalizer;

    public function __construct(RegistryInterface $registry, DenormalizerInterface $denormalizable)
    {
        parent::__construct($registry, User::class);
        $this->denormalizer = $denormalizable;
    }

    public function findByUsername($username): ?User
    {
        return $this
            ->createQueryBuilder('u')
            ->where('u.email = :email')
            ->setParameter('email', $username)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function findLinkedUsers(User $user)
    {
        $connection = $this->getEntityManager()->getConnection();

        $movieLinkQuery = $connection->createQueryBuilder();
        $movieLinkQuery
            ->from('movie_user_link', 'mul2')
            ->select(['sum(mul2.liked) as score', 'mul2.user_id'])
            ->innerJoin('mul2', 'movie_user_link', 'mul3', 'mul2.movie_id = mul3.movie_id')
            ->where('mul3.user_id = :id')
            ->andWhere('mul3.liked = 1')
            ->andWhere('mul2.user_id != :id')
            ->groupBy('mul2.user_id');

        $query = $connection
            ->createQueryBuilder()
            ->from('user', 'u');
        $query
            ->where($query->expr()->orX($user->getGender() !== 'neutral' ? 'u.interested_by = :gender' : '', 'u.interested_by = '.$query->expr()->literal('all')))
            ->setParameter('gender', $user->getGender());

        if ($user->getInterestedBy() !== 'all') {
            $query
                ->andWhere('u.gender = :interestedBy')
                ->setParameter('interestedBy', $user->getInterestedBy());
        }

        $query
            ->select(['u.*', 'COALESCE(mul.score, 0) as score'])
            ->leftJoin('u', sprintf('(%s)', $movieLinkQuery->getSQL()), 'mul', 'mul.user_id = u.id')
            ->setParameter('id', $user->getId())
            ->orderBy('mul.score', 'DESC')
            ->setMaxResults(30);

        return $query
            ->getConnection()
            ->fetchAll($query->getSQL(), $query->getParameters());
    }
}