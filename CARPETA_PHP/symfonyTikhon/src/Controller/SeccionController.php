<?php

namespace App\Controller;

use App\Repository\SeccionRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SeccionController extends AbstractController
{
//    /**
//     * @Route("/seccion", name="app_seccion")
//     */
//    public function index(): Response
//    {
//        return $this->json([
//            'message' => 'Welcome to your new controller!',
//            'path' => 'src/Controller/SeccionController.php',
//        ]);
//    }
private $seccionRepository;
    public function __construct(SeccionRepository $seccionRepository)
    {
        $this->seccionRepository=$seccionRepository;
    }

    /**
     * @Route("/seccionByAcronimo",methods={"POST"})
     */
    public function getSeccionByAcronimo(): JsonResponse
    {
//        dd(json_decode($request->getContent(),true))
        $acronimo= file_get_contents("php://input");

        $seccion= $this->seccionRepository->findBy(array("acronimo"=>$acronimo));
//        dd($seccion[0]->getDescripcion());
        $respuesta = new JsonResponse();
        $respuesta->setData([
            "idSeccion"=>$seccion[0]->getIdseccion(),
            "nombre"=>$seccion[0]->getNombre(),
            "descripcion"=>$seccion[0]->getDescripcion(),
            "imagen"=>$seccion[0]->getImagen(),
            "desarrollador"=>$seccion[0]->getDesarrollador(),
            "anoLanzamiento"=>$seccion[0]->getAnolanzamiento(),
            "acronimo"=>$seccion[0]->getAcronimo()
        ]);
        $respuesta->headers->set("Access-Control-Allow-Origin","*");
        $respuesta->headers->set("Content-Type","application/json");
        $respuesta->headers->set("Access-Control-Allow-Headers","X-API-KEY, Origin, X-Requested-With, Content-Type,Accept, Access-Control-Request-Method");
        $respuesta->headers->set("Access-Control-Allow-Methods"," GET, POST, OPTIONS, PUT, DELETE");
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type,Accept, Access-Control-Request-Method");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

        return $respuesta;
    }
    public function getIdSeccionByAcronimo($acronimo){
        $seccion= $this->seccionRepository->findBy(array("acronimo"=>$acronimo));
        return $seccion[0]->getIdseccion();
    }

    /**
     * @Route ("/getAllSecciones",name="app_seccion_getAll",methods={"GET"})
     */
    public function getAllSecciones():JsonResponse{
        $secciones = $this->seccionRepository->findAll();
        return new JsonResponse($secciones);
    }

    /**
     * @Route("/getSeccionById",methods={"POST"})
     */
    public function getSeccionById(): JsonResponse
    {
        $id = file_get_contents('php://input');
        return new JsonResponse($this->seccionRepository->findSectionById($id));
    }


}
