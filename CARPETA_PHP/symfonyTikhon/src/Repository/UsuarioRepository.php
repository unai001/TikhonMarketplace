<?php

namespace App\Repository;

use App\Entity\Usuario;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Usuario|null find($id, $lockMode = null, $lockVersion = null)
 * @method Usuario|null findOneBy(array $criteria, array $orderBy = null)
 * @method Usuario[]    findAll()
 * @method Usuario[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UsuarioRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Usuario::class);
    }
    public function findById(string $id): Usuario{
        $query = $this->getEntityManager()
            ->createQueryBuilder()
            ->select("u")
            ->from(Usuario::class,"u")
            ->where("u.iduser= :idUser")->setParameter("idUser",$id);
//        dd($query,$query->getQuery());
//        dd($id);

        //$usuario= $this->getEntityManager()->createQuery($dql)->getOneOrNullResult();
        return $query->getQuery()->getOneOrNullResult(1);
//        return $usuario;
    }
    public function checkUser(string $usuario,string $pass): Usuario{
        $query = $this->getEntityManager()
            ->createQueryBuilder()
            ->select("u")
            ->from(Usuario::class,"u")
            ->where("u.usuario= :usuario ")->setParameter("usuario",$usuario)
            ->andWhere("u.password = :pass")->setParameter("pass",$pass);
//        dd($query,$query->getQuery());
//        dd($id);

        //$usuario= $this->getEntityManager()->createQuery($dql)->getOneOrNullResult();
        return $query->getQuery()->getOneOrNullResult(1);
//        return $usuario;
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function add(Usuario $entity, bool $flush = true): void
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
    public function remove(Usuario $entity, bool $flush = true): void
    {
        $this->_em->remove($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    // /**
    //  * @return Usuario[] Returns an array of Usuario objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('u.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Usuario
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
    function jwtGetCodeJSON(Usuario $usuario){                                                    // PASO EL CONTENIDO A TRAVES DEL CUAL HARA EL HASH
        $header = base64_encode(json_encode(array('alg' => 'HS256', 'typ' => 'JWT')) );     // LO HASHEAMOS CON BASE64
        $payload = base64_encode(json_encode(["idUser"=>$usuario->getIduser(),"usuario"=>$usuario->getUsuario()]));
        $secret_key = 'clave secreta';
        $signature = base64_encode(hash_hmac('sha256', $header . '.' . $payload, $secret_key, true));
        $jwt_token = $header . '.' . $payload . '.' . $signature;   // AQUI CONCATENO EL TOKEN
        return $jwt_token;                                          // Y LO DEVUELVO
    }
    function jwtCheckCodeJSON($jwt_token){
        $secret_key = 'clave secreta';                  // PASO LA KEY
        $jwt_values = explode('.', $jwt_token);         // LA SEPARO

        $header =$jwt_values[0] ;                       // EN 3 VARIABLES
        $payload = $jwt_values[1];
        $signature = $jwt_values[2];

        $resultedsignature = base64_encode(hash_hmac('sha256', $header . '.' . $payload , $secret_key, true));

        if($resultedsignature == $signature){           // SI EL HASH ES EL MISMO RETORNAMOS TRUE, SINO FALSE
            return true;
        } else {
            return false;
        }
    }
    function returnContentToken($jwt_token){// PASO LA KEY
        $jwt_values = explode('.', $jwt_token);         // LA SEPARO
        $payload = $jwt_values[1];
        $contenido= base64_decode($payload);
        return $contenido;

    }
}
