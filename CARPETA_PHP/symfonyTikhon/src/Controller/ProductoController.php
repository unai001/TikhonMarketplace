<?php

namespace App\Controller;

use App\Entity\InfoProducto;
use App\Entity\Producto;
use App\Repository\DivisaRepository;
use App\Repository\InfoProductoRepository;
use App\Repository\OfertaRepository;
use App\Repository\ProductoRepository;
use App\Repository\SeccionRepository;
use App\Repository\UsuarioRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use PhpParser\Node\Expr\AssignOp\Div;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ProductoController extends AbstractController
{
    private $productoRepository;
    public function __construct(ProductoRepository $productoRepository)
    {
        $this->productoRepository = $productoRepository;
    }
//    /**
//     * @Route("/producto", name="app_producto")
//     */
//    public function index(): Response
//    {
//        return $this->json([
//            'message' => 'Welcome to your new controller!',
//            'path' => 'src/Controller/ProductoController.php',
//        ]);
//    }


    /**
     * @Route("/productoByAcronimo", name="app_productoByName",methods={"POST"})
     */
    public function getProductoByAcronimo(SeccionController $seccionController, SeccionRepository $seccionRepository): JsonResponse
    {
        $acronimo= file_get_contents("php://input");
        $query = $this->productoRepository->createQueryBuilder("p")
            ->select("p")
            ->andWhere("p.idseccion = :idSeccion")->setParameter("idSeccion",$seccionController->getIdSeccionByAcronimo($acronimo,$seccionRepository))
        ->getQuery();
        $productos= $query->execute();

        $jsonResponse=  new JsonResponse();
        $jsonResponse->setData($productos);
        return $jsonResponse;
    }

    /**
     * @Route("/getProductosByUserId/{id}",name="app_producto_getByUserId",methods={"GET"})
     */
    public function getProductosByUserId($id):JsonResponse{
        $productos = $this->productoRepository->findBy(array("iduser"=>$id));
        return new JsonResponse($productos);
    }
     /**
     * @Route("/allProductos", name="app_allProducts",methods={"GET"})
     */
public static function getAllProductos(ProductoRepository $productoRepository):JsonResponse{
    $acronimo= file_get_contents("php://input");
   $allProducts = $productoRepository -> findAll();
    $jsonResponse=  new JsonResponse();
    $jsonResponse->setData($allProducts);
    return $jsonResponse;
}

    /**
     * @Route("/ProdutoById", name="app_ProdutoById",methods={"GET"})
     */
    public static function ProdutoById(Request $request, ProductoRepository $productoRepository):JsonResponse{
        $allProducts = $productoRepository -> findAll();
        $jsonResponse=  new JsonResponse();
        $jsonResponse->setData($allProducts);
        return $jsonResponse;
    }

    /**
     * @Route ("/putProducto",name="app_producto_anadirProducto",methods={"POST"})
     */
    public function putProducto(Request $request, UsuarioRepository $usuarioRepository, InfoProductoRepository $infoProductoRepository, SeccionRepository $seccionRepository, DivisaRepository $divisaRepository, OfertaRepository $ofertaRepository):JsonResponse{
        $imagen="";
        $respuesta= new JsonResponse();
        foreach($_FILES as $file){
            $nombreImagen=$file["tmp_name"];
            move_uploaded_file($nombreImagen,"..\..\images\productos".DIRECTORY_SEPARATOR.$file["name"]);
            $imagen="CARPETA_PHP/images/productos/".$file["name"];
        }

        $producto= new Producto();
        $producto->setNombre($request->get("nombre"));
        $producto->setIduser($usuarioRepository->findById($request->get("idUser")));
        $producto->setDescripcion($request->get("descripcion"));
        $producto->setPreciototalstock($request->get("precio"));
        $producto->setCategoria($request->get("categoria"));
        $divisa= $divisaRepository->find($request->get("divisa"));
        $producto->setDivisa($divisa);
        $producto->setFechapublicacion(null);
        $producto->setImagen($imagen);
        $producto->setIdseccion($seccionRepository->find($request->get("idSeccion")));
        $oferta=$ofertaRepository->find("-1");
        $producto->setIdoferta($oferta);
        $producto->setEstado("Venta");

        try {
            $this->productoRepository->add($producto);
        } catch (OptimisticLockException|ORMException $e) {
            $respuesta->setData(["correcto"=>false,"error"=>$e->getMessage()]);
            return $respuesta;
        }

        $infoProducto= new InfoProducto();
        $infoProducto->setIdproducto($producto);
        switch ($producto->getCategoria()){
            case "Cuenta":
                $infoProducto->setUsuario($request->get("usuario"));
                $infoProducto->setPassword($request->get("password"));
                $infoProducto->setCorreo($request->get("correo"));
                $infoProducto->setSecretAnswer($request->get("secretAnswer"));
                break;
            case "Skin":
                $infoProducto->setUsuario($request->get("usuario"));
                $infoProducto->setCorreo($request->get("correo"));
                break;
            case "Codigo":
                $infoProducto->setCodigo($request->get("codigo"));
                break;
        }
        try {
            $infoProductoRepository->add($infoProducto);
        } catch (OptimisticLockException|ORMException $e) {
            $respuesta->setData(["correcto"=>false,"error"=>$e->getMessage()]);
            return $respuesta;
        }
        $respuesta->setData(["correcto"=>true]);
        return $respuesta;
    }

    /**
     * @Route("/deleteProducto/{id}",name="app_producto_deleteProducto",methods={"DELETE"})
     */
    public function deleteProducto($id):JsonResponse{
        $producto = $this->productoRepository->find($id);
        $respuesta = new JsonResponse();
        try {
            $this->productoRepository->remove($producto);
            $respuesta->setData(["correcto"=>true]);
            return $respuesta;
        } catch (OptimisticLockException|ORMException $e) {
            $respuesta->setData(["correcto"=>false,"error"=>$e->getMessage()]);
            return $respuesta;
        }

    }
    
    /**
     * @Route("/getProductsBySeccionId",methods={"POST"})
     */
    public function getProductsBySeccionId(): JsonResponse
    {
        $id = file_get_contents('php://input');
        $res = $this->productoRepository->getProductsBySeccionId($id);

        $jsonResponse=  new JsonResponse();
        $jsonResponse->setData($res);
        return $jsonResponse;

    }
    /**
     * @Route ("/getProducto/{id}",name="app_producto_getProductoByID",methods={"GET"})
     */
    public function getProductoById($id,UsuarioRepository $usuarioRepository): JsonResponse
    {
        $producto = $this->productoRepository->find($id);
        return new JsonResponse($producto);

    }

    /**
     * @Route ("/updateProducto",name="app_producto_putProducto",methods={"POST"})
     */
    public function updateProducto(Request $request, InfoProductoRepository $infoProductoRepository, SeccionRepository $seccionRepository, DivisaRepository $divisaRepository){
        $imagen="";
        $respuesta= new JsonResponse();

        foreach($_FILES as $file){
            $nombreImagen=$file["tmp_name"];
            move_uploaded_file($nombreImagen,"..\..\images\productos".DIRECTORY_SEPARATOR.$file["name"]);
            $imagen="CARPETA_PHP/images/productos/".$file["name"];
        }

        $producto= $this->productoRepository->find($request->get("idProducto"));
        $producto->setNombre($request->get("nombre"));
        $producto->setDescripcion($request->get("descripcion"));
        $producto->setPreciototalstock($request->get("precio"));
        $producto->setCategoria($request->get("categoria"));
//        dd($request->get("divisa"));
        $divisa= $divisaRepository->find($request->get("divisa"));

        $producto->setDivisa($divisa);

        if($imagen==""){

        }else{
            $producto->setImagen($imagen);
        }

        $producto->setIdseccion($seccionRepository->find($request->get("idSeccion")));

        try {
            $this->productoRepository->add($producto);
        } catch (OptimisticLockException|ORMException $e) {
            $respuesta->setData(["correcto"=>false,"error"=>$e->getMessage()]);
            return $respuesta;
        }

        $infoProducto= $infoProductoRepository->findByIdProducto($request->get("idProducto"));
        $infoProducto->setIdproducto($producto);
        switch ($producto->getCategoria()){
            case "Cuenta":
                $infoProducto->setUsuario($request->get("usuario"));
                $infoProducto->setPassword($request->get("password"));
                $infoProducto->setCorreo($request->get("correo"));
                $infoProducto->setSecretAnswer($request->get("secretAnswer"));
                break;
            case "Skin":
                $infoProducto->setUsuario($request->get("usuario"));
                $infoProducto->setCorreo($request->get("correo"));
                break;
            case "Codigo":
                $infoProducto->setCodigo($request->get("codigo"));
                break;
        }

        try {
            $infoProductoRepository->add($infoProducto);
        } catch (OptimisticLockException|ORMException $e) {
            $respuesta->setData(["correcto"=>false,"error"=>$e->getMessage()]);
            return $respuesta;
        }

        $respuesta->setData(["correcto"=>true]);
        return $respuesta;
    }

    /**
     * @Route ("/productTrade",name="app_producto_productTrade",methods={"POST"})
     */
    public function productTrade(Request $request, UsuarioRepository $usuarioRepository): JsonResponse
    {
        $idProducto = $request->get("idProducto");
        $idUser = $request->get("idUser");
        $producto = $this->productoRepository->find($idProducto);
        $vendedor = $usuarioRepository->find($producto->getIduser());
        $vendedor->setSaldo($vendedor->getSaldo()+$producto->getPreciototalstock());
        $comprador = $usuarioRepository->find($idUser);
        $comprador->setSaldo($comprador->getSaldo()-$producto->getPreciototalstock());
        $producto->setIduser($comprador);
        $producto->setEstado("Compra");
        try {
            $this->productoRepository->add($producto);
            $usuarioRepository->add($comprador);
            $usuarioRepository->add($vendedor);
        } catch (OptimisticLockException|ORMException $e) {
            return new JsonResponse(["correcto"=>false,"error"=>$e->getMessage()]);
        }
        return new JsonResponse(["correcto"=>true]);


    }

}
