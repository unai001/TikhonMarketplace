<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * PedidoProductos
 *
 * @ORM\Table(name="pedido_productos", indexes={@ORM\Index(name="ref_pedido", columns={"idPedido"})})
 * @ORM\Entity(repositoryClass="App\Repository\PedidoProductosRepository")
 */
class PedidoProductos
{
    /**
     * @var int
     *
     * @ORM\Column(name="idPedido_Productos", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idpedidoProductos;

    /**
     * @var int|null
     *
     * @ORM\Column(name="producto1", type="integer", nullable=true, options={"default"="NULL"})
     */
    private $producto1 = NULL;

    /**
     * @var int|null
     *
     * @ORM\Column(name="producto2", type="integer", nullable=true, options={"default"="NULL"})
     */
    private $producto2 = NULL;

    /**
     * @var int|null
     *
     * @ORM\Column(name="producto3", type="integer", nullable=true, options={"default"="NULL"})
     */
    private $producto3 = NULL;

    /**
     * @var int|null
     *
     * @ORM\Column(name="producto4", type="integer", nullable=true, options={"default"="NULL"})
     */
    private $producto4 = NULL;

    /**
     * @var int|null
     *
     * @ORM\Column(name="producto5", type="integer", nullable=true, options={"default"="NULL"})
     */
    private $producto5 = NULL;

    /**
     * @var int|null
     *
     * @ORM\Column(name="producto6", type="integer", nullable=true, options={"default"="NULL"})
     */
    private $producto6 = NULL;

    /**
     * @var int|null
     *
     * @ORM\Column(name="producto7", type="integer", nullable=true, options={"default"="NULL"})
     */
    private $producto7 = NULL;

    /**
     * @var int|null
     *
     * @ORM\Column(name="producto8", type="integer", nullable=true, options={"default"="NULL"})
     */
    private $producto8 = NULL;

    /**
     * @var int|null
     *
     * @ORM\Column(name="producto9", type="integer", nullable=true, options={"default"="NULL"})
     */
    private $producto9 = NULL;

    /**
     * @var int|null
     *
     * @ORM\Column(name="producto10", type="integer", nullable=true, options={"default"="NULL"})
     */
    private $producto10 = NULL;

    /**
     * @var \Pedidos
     *
     * @ORM\ManyToOne(targetEntity="Pedidos")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idPedido", referencedColumnName="idPedido")
     * })
     */
    private $idpedido;

    public function getIdpedidoProductos(): ?int
    {
        return $this->idpedidoProductos;
    }

    public function getProducto1(): ?int
    {
        return $this->producto1;
    }

    public function setProducto1(?int $producto1): self
    {
        $this->producto1 = $producto1;

        return $this;
    }

    public function getProducto2(): ?int
    {
        return $this->producto2;
    }

    public function setProducto2(?int $producto2): self
    {
        $this->producto2 = $producto2;

        return $this;
    }

    public function getProducto3(): ?int
    {
        return $this->producto3;
    }

    public function setProducto3(?int $producto3): self
    {
        $this->producto3 = $producto3;

        return $this;
    }

    public function getProducto4(): ?int
    {
        return $this->producto4;
    }

    public function setProducto4(?int $producto4): self
    {
        $this->producto4 = $producto4;

        return $this;
    }

    public function getProducto5(): ?int
    {
        return $this->producto5;
    }

    public function setProducto5(?int $producto5): self
    {
        $this->producto5 = $producto5;

        return $this;
    }

    public function getProducto6(): ?int
    {
        return $this->producto6;
    }

    public function setProducto6(?int $producto6): self
    {
        $this->producto6 = $producto6;

        return $this;
    }

    public function getProducto7(): ?int
    {
        return $this->producto7;
    }

    public function setProducto7(?int $producto7): self
    {
        $this->producto7 = $producto7;

        return $this;
    }

    public function getProducto8(): ?int
    {
        return $this->producto8;
    }

    public function setProducto8(?int $producto8): self
    {
        $this->producto8 = $producto8;

        return $this;
    }

    public function getProducto9(): ?int
    {
        return $this->producto9;
    }

    public function setProducto9(?int $producto9): self
    {
        $this->producto9 = $producto9;

        return $this;
    }

    public function getProducto10(): ?int
    {
        return $this->producto10;
    }

    public function setProducto10(?int $producto10): self
    {
        $this->producto10 = $producto10;

        return $this;
    }

    public function getIdpedido(): ?Pedidos
    {
        return $this->idpedido;
    }

    public function setIdpedido(?Pedidos $idpedido): self
    {
        $this->idpedido = $idpedido;

        return $this;
    }


}
