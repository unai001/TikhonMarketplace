<?php

namespace App\Repository;

use App\Entity\InfoProducto;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method InfoProducto|null find($id, $lockMode = null, $lockVersion = null)
 * @method InfoProducto|null findOneBy(array $criteria, array $orderBy = null)
 * @method InfoProducto[]    findAll()
 * @method InfoProducto[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class InfoProductoRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, InfoProducto::class);
    }

    public function findByIdProducto(string $id):InfoProducto{
        $query = $this->getEntityManager()->createQueryBuilder()
            ->select("i")
            ->from(InfoProducto::class,"i")
            ->where("i.idproducto= :idProducto")->setParameter("idProducto",$id);
        return $query->getQuery()->getOneOrNullResult(1);
    }
    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function add(InfoProducto $entity, bool $flush = true): void
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
    public function remove(InfoProducto $entity, bool $flush = true): void
    {
        $this->_em->remove($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    // /**
    //  * @return InfoProducto[] Returns an array of InfoProducto objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('i.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?InfoProducto
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
