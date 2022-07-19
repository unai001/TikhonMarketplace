<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Pedidos
 *
 * @ORM\Table(name="pedidos", indexes={@ORM\Index(name="ref_idUser", columns={"idUser"})})
 * @ORM\Entity(repositoryClass="App\Repository\PedidosRepository")
 */
class Pedidos
{
    /**
     * @var int
     *
     * @ORM\Column(name="idPedido", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idpedido;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="fecha", type="date", nullable=true, options={"default"="NULL"})
     */
    private $fecha = 'NULL';

    /**
     * @var int|null
     *
     * @ORM\Column(name="precioTotal", type="integer", nullable=true, options={"default"="NULL"})
     */
    private $preciototal = NULL;

    /**
     * @var \Usuario
     *
     * @ORM\ManyToOne(targetEntity="Usuario")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idUser", referencedColumnName="idUser")
     * })
     */
    private $iduser;

    public function getIdpedido(): ?int
    {
        return $this->idpedido;
    }

    public function getFecha(): ?\DateTimeInterface
    {
        return $this->fecha;
    }

    public function setFecha(?\DateTimeInterface $fecha): self
    {
        $this->fecha = $fecha;

        return $this;
    }

    public function getPreciototal(): ?int
    {
        return $this->preciototal;
    }

    public function setPreciototal(?int $preciototal): self
    {
        $this->preciototal = $preciototal;

        return $this;
    }

    public function getIduser(): ?Usuario
    {
        return $this->iduser;
    }

    public function setIduser(?Usuario $iduser): self
    {
        $this->iduser = $iduser;

        return $this;
    }


}
