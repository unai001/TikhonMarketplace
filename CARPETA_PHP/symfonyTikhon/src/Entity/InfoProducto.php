<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * InfoProducto
 *
 * @ORM\Table(name="info_producto", indexes={@ORM\Index(name="pk_idProducto_producto", columns={"idProducto"})})
 * @ORM\Entity(repositoryClass="App\Repository\InfoProductoRepository")
 */
class InfoProducto
{
    /**
     * @var int
     *
     * @ORM\Column(name="id_info_producto", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     * @Groups({"Cuenta","Skin","Codigo"})
     */
    private $idInfoProducto;

    /**
     * @var string|null
     *
     * @ORM\Column(name="usuario", type="string", length=45, nullable=true, options={"default"="NULL"})
     * @Groups({"Cuenta","Skin"})
     */
    private $usuario = 'NULL';

    /**
     * @var string|null
     *
     * @ORM\Column(name="correo", type="string", length=45, nullable=true, options={"default"="NULL"})
     * @Groups({"Cuenta","Skin"})
     */
    private $correo = 'NULL';

    /**
     * @var string|null
     *
     * @ORM\Column(name="password", type="string", length=45, nullable=true, options={"default"="NULL"})
     * @Groups({"Cuenta"})
     */
    private $password = 'NULL';

    /**
     * @var string|null
     *
     * @ORM\Column(name="secret_answer", type="string", length=45, nullable=true, options={"default"="NULL"})
     * @Groups({"Cuenta"})
     */
    private $secretAnswer = 'NULL';

    /**
     * @var string|null
     *
     * @ORM\Column(name="codigo", type="string", length=150, nullable=true, options={"default"="NULL"})
     * @Groups({"Codigo"})
     */
    private $codigo = 'NULL';

    /**
     * @var \Producto
     *
     * @ORM\ManyToOne(targetEntity="Producto")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idProducto", referencedColumnName="idProducto")
     * })
     * @Groups({"Cuenta","Skin","Codigo"})
     */
    private $idproducto;

    public function getIdInfoProducto(): ?int
    {
        return $this->idInfoProducto;
    }

    public function getUsuario(): ?string
    {
        return $this->usuario;
    }

    public function setUsuario(?string $usuario): self
    {
        $this->usuario = $usuario;

        return $this;
    }

    public function getCorreo(): ?string
    {
        return $this->correo;
    }

    public function setCorreo(?string $correo): self
    {
        $this->correo = $correo;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(?string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getSecretAnswer(): ?string
    {
        return $this->secretAnswer;
    }

    public function setSecretAnswer(?string $secretAnswer): self
    {
        $this->secretAnswer = $secretAnswer;

        return $this;
    }

    public function getCodigo(): ?string
    {
        return $this->codigo;
    }

    public function setCodigo(?string $codigo): self
    {
        $this->codigo = $codigo;

        return $this;
    }

    public function getIdproducto(): ?Producto
    {
        return $this->idproducto;
    }

    public function setIdproducto(?Producto $idproducto): self
    {
        $this->idproducto = $idproducto;

        return $this;
    }


}
