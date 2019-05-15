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
use Infra\Entity\UserMatch;
use Symfony\Bridge\Doctrine\RegistryInterface;


/**
 * @method UserMatch|null find($id, $lockMode = null, $lockVersion = null)
 * @method UserMatch|null findOneBy(array $criteria, array $orderBy = null)
 * @method UserMatch[]    findAll()
 * @method UserMatch[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserMatchRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, UserMatch::class);
    }

    public function getMatchesByUser(User $user)
    {
        return $this->createQueryBuilder('u')
            ->where('u.user1 = :user')
            ->orWhere('u.user2 = :user')
            ->setParameter('user', $user->getId())
            ->getQuery()
            ->getResult();
    }
}