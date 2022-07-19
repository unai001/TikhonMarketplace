<?php

namespace App\Controller;

use App\Repository\DivisaRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DivisaController extends AbstractController
{
    private $divisaRepository;
    public function __construct(DivisaRepository $divisaRepository){
        $this->divisaRepository= $divisaRepository;
    }
//    #[Route('/divisa', name: 'app_divisa')]
//    public function index(): Response
//    {
//        return $this->json([
//            'message' => 'Welcome to your new controller!',
//            'path' => 'src/Controller/DivisaController.php',
//        ]);
//    }

        /**
         * @Route("/getAllDivisas",name="app_getAllDivisa",methods={"GET"})
         */
        public function getAllDivisas():JsonResponse{
            $divisas=$this->divisaRepository->findAll();
            return new JsonResponse($divisas);
        }

    /**
     * @Route("/getDivisaById/{id}",name="app_getDivisaById",methods={"GET"})
     */
    public function getDivisaById($id):JsonResponse{
        $divisas=$this->divisaRepository->find($id);

        return new JsonResponse($divisas);
    }

}
