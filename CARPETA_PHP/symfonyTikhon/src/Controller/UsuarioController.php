<?php

namespace App\Controller;

use App\Entity\Usuario;
use App\Repository\DivisaRepository;
use App\Repository\UsuarioRepository;
use DateTime;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class UsuarioController extends AbstractController
{

    public function __construct(UsuarioRepository $usuarioRepository)
    {
        $this->usuarioRepository = $usuarioRepository;
    }
//    /**
//     * @Route("/usuario", name="app_usuario")
//     */
//    public function index(): Response
//    {
//        return $this->json([
//            'message' => 'Welcome to your new controller!',
//            'path' => 'src/Controller/UsuarioController.php',
//        ]);
//    }
      /**
       *@Route ("/addUser",name="app_usuario_addUser",methods={"POST"})
       */
      public function addUser(Request $request, DivisaRepository $divisaRepository):JsonResponse{
          $usuario= new Usuario();
          $usuario->setUsuario($request->get("usuario"));
          $usuario->setNombre($request->get("nombre"));
          $usuario->setApellidos($request->get("apellidos"));
          $usuario->setEmail($request->get("email"));
          $usuario->setPais($request->get("pais"));
          $usuario->setFechanacimiento(DateTime::createFromFormat("Y-m-d",$request->get("fechaNacimiento")));
          $usuario->setPassword($request->get("password"));
          $usuario->setIddivisa($divisaRepository->find(1));

          try {
              $this->usuarioRepository->add($usuario);
              return new JsonResponse(["correcto"=>true]);
          } catch (OptimisticLockException|ORMException $e) {
              return new JsonResponse(["correcto"=>false,"error"=>$e->getMessage()]);
          }


      }

    /**
     * @Route ("/login",name="app_usuario_login",methods={"POST"})
     */
    public function login(Request $request){
        if ($request->get("usuario")=="" || $request->get("password")==""){
            return new JsonResponse(["correcto"=>false]);
        }
        $usuario=$this->usuarioRepository->checkUser($request->get("usuario"),$request->get("password"));
        if($usuario==null){
            return new JsonResponse(["correcto"=>false]);
        }
        $token=$this->usuarioRepository->jwtGetCodeJSON($usuario);
        return new JsonResponse(["correcto"=>true,"token"=>$token,"idUser"=>$usuario->getIduser(),"usuario"=>$usuario->getUsuario()]);
    }

      /**
       * @Route ("/getFullUsuarioById",name="app_usuarioById", methods={"POST"})
       */
      public function getFullUsuarioById( ProductoController $productoController):JsonResponse{
          $id=json_decode(file_get_contents("php://input"));
          $usuario=$this->usuarioRepository->findById($id);
//          $productos = $productoController->getProductosByUserId($id);
          return new JsonResponse($usuario);

      }
    /**
     * @Route("checkToken",name="app_usuario_checkToken",methods={"POST"})
     */
    public function checkToken(Request $request):JsonResponse{
        if($this->usuarioRepository->jwtCheckCodeJSON($request->get("token"))){
            $data=$this->usuarioRepository->returnContentToken($request->get("token"));
            $contenido= json_decode($data);
//            dd($contenido->idUser);
            $idUser=$contenido->idUser;
            $usuario=$contenido->usuario;
            return new JsonResponse(["correcto"=>true,"idUser"=>$idUser,"usuario"=>$usuario]);
        }
        return new JsonResponse(["correcto"=>false]);
    }

    /**
     * @Route ("/updateUser",name="app_updateUser", methods={"PUT"})
     */
      public function updateUser(Request $request): JsonResponse
      {
          $data = json_decode($request->getContent(),true);
//          dd($data["idUser"]);
          $usuario=$this->usuarioRepository->findById($data["idUser"]);
//        dd($data["usuario"]["usuario"]);
          $usuario->setUsuario($data["usuario"]["usuario"]);
          $usuario->setNombre($data["usuario"]["nombre"]);
          $usuario->setApellidos($data["usuario"]["apellidos"]);
          $usuario->setEMail($data["usuario"]["email"]);
          $usuario->setFechanacimiento(DateTime::createFromFormat("Y-m-d",$data["usuario"]["fechaNacimiento"]));
          $usuario->setPais($data["usuario"]["pais"]);
          $usuario->setPassword($data["usuario"]["password"]);

          $this->usuarioRepository->add($usuario);
          $repuesta=["correcto"=>true];
          return $this->json(json_encode($repuesta));

      }


}
