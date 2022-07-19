<?php

namespace App\Controller;

use App\Repository\InfoProductoRepository;
use App\Repository\ProductoRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class InfoProductoController extends AbstractController
{
    private $infoProductoRespository;
    private $productoRepository;
    private $serializer;

    public function __construct( InfoProductoRepository $infoProductoRepository, ProductoRepository $productoRepository,SerializerInterface $serializer)
    {
        $this->infoProductoRespository=$infoProductoRepository;
        $this->productoRepository=$productoRepository;
        $this->serializer=$serializer;
    }
//    /**
//     * @Route("/info/producto", name="app_info_producto")
//     */
//    public function index(): Response
//    {
//        return $this->json([
//            'message' => 'Welcome to your new controller!',
//            'path' => 'src/Controller/InfoProductoController.php',
//        ]);
//    }

      /**
       * @Route ("/getInfoProductoById/{id}",name="app_infoProducto_getInfoByID",methods={"GET"})
       */
      public function getInfoProductoById($id):JsonResponse{
          $infoProducto= $this->infoProductoRespository->findByIdProducto($id);
          $producto= $this->productoRepository->find($id);
          $data="";
          switch ($producto->getCategoria()){
              case "Cuenta":
              $data= $this->serializer->serialize(
                  $infoProducto,
                  "json",
                  ["groups"=>"Cuenta"]
              );
                  break;
              case "Skin":
                  $data= $this->serializer->serialize(
                      $infoProducto,
                      "json",
                      ["groups"=>"Skin"]
                  );
                  break;
              case "Codigo":
                  $data= $this->serializer->serialize(
                      $infoProducto,
                      "json",
                      ["groups"=>"Codigo"]
                  );
                  break;
          }
          return new JsonResponse($data);
      }
}
