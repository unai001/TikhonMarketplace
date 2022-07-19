<?php

namespace App\Repository;

use App\Entity\PedidoProductos;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method PedidoProductos|null find($id, $lockMode = null, $lockVersion = null)
 * @method PedidoProductos|null findOneBy(array $criteria, array $orderBy = null)
 * @method PedidoProductos[]    findAll()
 * @method PedidoProductos[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PedidoProductosRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PedidoProductos::class);
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function add(PedidoProductos $entity, bool $flush = true): void
    {
        $this->_em->persist($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function remove(PedidoProductos $entity, bool $flush = true): void
    {
        $this->_em->remove($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    // /**
    //  * @return PedidoProductos[] Returns an array of PedidoProductos objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?PedidoProductos
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
