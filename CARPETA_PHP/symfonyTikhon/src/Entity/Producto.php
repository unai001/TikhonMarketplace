<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Producto
 *
 * @ORM\Table(name="producto", indexes={@ORM\Index(name="ref_oferta", columns={"idOferta"}), @ORM\Index(name="ref_seccion", columns={"idSeccion"}), @ORM\Index(name="ref_divisa", columns={"divisa"}), @ORM\Index(name="ref_idUserProducto", columns={"idUser"})})
 * @ORM\Entity(repositoryClass="App\Repository\ProductoRepository")
 */
class Producto implements \JsonSerializable
{
    /**
     * @var int
     *
     * @ORM\Column(name="idProducto", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idproducto;

    /**
     * @var string|null
     *
     * @ORM\Column(name="nombre", type="string", length=50, nullable=true, options={"default"="NULL"})
     */
    private $nombre = 'NULL';

    /**
     * @var string|null
     *
     * @ORM\Column(name="descripcion", type="text", length=65535, nullable=true, options={"default"="NULL"})
     */
    private $descripcion = 'NULL';

    /**
     * @var int|null
     *
     * @ORM\Column(name="precioTotalstock", type="integer", nullable=true, options={"default"="NULL"})
     */
    private $preciototalstock = NULL;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="fechaPublicacion", type="date", nullable=true, options={"default"="NULL"})
     */
    private $fechapublicacion = 'NULL';

    /**
     * @var string|null
     *
     * @ORM\Column(name="imagen", type="string", length=100, nullable=true, options={"default"="NULL"})
     */
    private $imagen = 'NULL';

    /**
     * @var string|null
     *
     * @ORM\Column(name="categoria", type="string", length=20, nullable=true, options={"default"="NULL"})
     */
    private $categoria = 'NULL';

    /**
     * @var string
     *
     * @ORM\Column(name="estado", type="string", length=50, nullable=false)
     */
    private $estado;

    /**
     * @var \Usuario
     *
     * @ORM\ManyToOne(targetEntity="Usuario")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idUser", referencedColumnName="idUser")
     * })
     */
    private $iduser;

    /**
     * @var \Seccion
     *
     * @ORM\ManyToOne(targetEntity="Seccion")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idSeccion", referencedColumnName="idSeccion")
     * })
     */
    private $idseccion;

    /**
     * @var \Divisa
     *
     * @ORM\ManyToOne(targetEntity="Divisa")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="divisa", referencedColumnName="id")
     * })
     */
    private $divisa;

    /**
     * @var \Oferta
     *
     * @ORM\ManyToOne(targetEntity="Oferta")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idOferta", referencedColumnName="idOferta")
     * })
     */
    private $idoferta;

    public function getIdproducto(): ?int
    {
        return $this->idproducto;
    }

    public function getNombre(): ?string
    {
        return $this->nombre;
    }

    public function setNombre(?string $nombre): self
    {
        $this->nombre = $nombre;

        return $this;
    }

    public function getDescripcion(): ?string
    {
        return $this->descripcion;
    }

    public function setDescripcion(?string $descripcion): self
    {
        $this->descripcion = $descripcion;

        return $this;
    }

    public function getPreciototalstock(): ?int
    {
        return $this->preciototalstock;
    }

    public function setPreciototalstock(?int $preciototalstock): self
    {
        $this->preciototalstock = $preciototalstock;

        return $this;
    }

    public function getFechapublicacion(): ?\DateTimeInterface
    {
        return $this->fechapublicacion;
    }

    public function setFechapublicacion(?\DateTimeInterface $fechapublicacion): self
    {
        $this->fechapublicacion = $fechapublicacion;

        return $this;
    }

    public function getImagen(): ?string
    {
        return $this->imagen;
    }

    public function setImagen(?string $imagen): self
    {
        $this->imagen = $imagen;

        return $this;
    }

    public function getCategoria(): ?string
    {
        return $this->categoria;
    }

    public function setCategoria(?string $categoria): self
    {
        $this->categoria = $categoria;

        return $this;
    }

    public function getEstado(): ?string
    {
        return $this->estado;
    }

    public function setEstado(string $estado): self
    {
        $this->estado = $estado;

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

    public function getIdseccion(): ?Seccion
    {
        return $this->idseccion;
    }

    public function setIdseccion(?Seccion $idseccion): self
    {
        $this->idseccion = $idseccion;

        return $this;
    }

    public function getDivisa(): ?Divisa
    {
        return $this->divisa;
    }

    public function setDivisa(?Divisa $divisa): self
    {
        $this->divisa = $divisa;

        return $this;
    }

    public function getIdoferta(): ?Oferta
    {
        return $this->idoferta;
    }

    public function setIdoferta(?Oferta $idoferta): self
    {
        $this->idoferta = $idoferta;

        return $this;
    }

    public function jsonSerialize(): mixed
    {
        $respuesta=[
            "idProducto"=>$this->idproducto,
            "idUser"=>$this->iduser->getIduser(),
            "idSeccion"=>$this->idseccion->getIdseccion(),
            "idOferta"=>$this->idoferta,
            "nombre"=>$this->nombre,
            "descripcion"=>$this->descripcion,
            "precioTotalstock"=>$this->preciototalstock,
            "fechaPublicacion"=>$this->fechapublicacion,
            "imagen"=>$this->imagen,
            "categoria"=>$this->categoria,
            "divisa"=>$this->divisa,
            "estado"=>$this->estado
        ];
        return $respuesta;
    }


}
