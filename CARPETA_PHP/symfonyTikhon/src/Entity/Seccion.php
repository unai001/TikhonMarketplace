<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Seccion
 *
 * @ORM\Table(name="seccion")
 * @ORM\Entity(repositoryClass="App\Repository\SeccionRepository")
 */
class Seccion implements \JsonSerializable
{
    /**
     * @var int
     *
     * @ORM\Column(name="idSeccion", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idseccion;

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
     * @var string|null
     *
     * @ORM\Column(name="imagen", type="string", length=100, nullable=true, options={"default"="NULL"})
     */
    private $imagen = 'NULL';

    /**
     * @var string|null
     *
     * @ORM\Column(name="desarrollador", type="string", length=20, nullable=true, options={"default"="NULL"})
     */
    private $desarrollador = 'NULL';

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="anoLanzamiento", type="date", nullable=true, options={"default"="NULL"})
     */
    private $anolanzamiento = 'NULL';

    /**
     * @var string|null
     *
     * @ORM\Column(name="acronimo", type="string", length=50, nullable=true, options={"default"="NULL"})
     */
    private $acronimo = 'NULL';

    /**
     * @var string|null
     *
     * @ORM\Column(name="imagenSecundaria", type="string", length=100, nullable=true, options={"default"="NULL"})
     */
    private $imagensecundaria = 'NULL';

    /**
     * @var string|null
     *
     * @ORM\Column(name="logo", type="string", length=100, nullable=true, options={"default"="NULL"})
     */
    private $logo = 'NULL';

    /**
     * @var string|null
     *
     * @ORM\Column(name="fondo", type="string", length=100, nullable=true, options={"default"="NULL"})
     */
    private $fondo = 'NULL';

    /**
     * @var int|null
     *
     * @ORM\Column(name="popularidad", type="integer", nullable=true, options={"default"="NULL"})
     */
    private $popularidad = NULL;

    /**
     * @var string|null
     *
     * @ORM\Column(name="colorPrincipal", type="string", length=50, nullable=true, options={"default"="NULL"})
     */
    private $colorprincipal = 'NULL';

    /**
     * @var string|null
     *
     * @ORM\Column(name="colorSecundario", type="string", length=50, nullable=true, options={"default"="NULL"})
     */
    private $colorsecundario = 'NULL';

    public function getIdseccion(): ?int
    {
        return $this->idseccion;
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

    public function getImagen(): ?string
    {
        return $this->imagen;
    }

    public function setImagen(?string $imagen): self
    {
        $this->imagen = $imagen;

        return $this;
    }

    public function getDesarrollador(): ?string
    {
        return $this->desarrollador;
    }

    public function setDesarrollador(?string $desarrollador): self
    {
        $this->desarrollador = $desarrollador;

        return $this;
    }

    public function getAnolanzamiento(): ?\DateTimeInterface
    {
        return $this->anolanzamiento;
    }

    public function setAnolanzamiento(?\DateTimeInterface $anolanzamiento): self
    {
        $this->anolanzamiento = $anolanzamiento;

        return $this;
    }

    public function getAcronimo(): ?string
    {
        return $this->acronimo;
    }

    public function setAcronimo(?string $acronimo): self
    {
        $this->acronimo = $acronimo;

        return $this;
    }

    public function getImagensecundaria(): ?string
    {
        return $this->imagensecundaria;
    }

    public function setImagensecundaria(?string $imagensecundaria): self
    {
        $this->imagensecundaria = $imagensecundaria;

        return $this;
    }

    public function getLogo(): ?string
    {
        return $this->logo;
    }

    public function setLogo(?string $logo): self
    {
        $this->logo = $logo;

        return $this;
    }

    public function getFondo(): ?string
    {
        return $this->fondo;
    }

    public function setFondo(?string $fondo): self
    {
        $this->fondo = $fondo;

        return $this;
    }

    public function getPopularidad(): ?int
    {
        return $this->popularidad;
    }

    public function setPopularidad(?int $popularidad): self
    {
        $this->popularidad = $popularidad;

        return $this;
    }

    public function getColorprincipal(): ?string
    {
        return $this->colorprincipal;
    }

    public function setColorprincipal(?string $colorprincipal): self
    {
        $this->colorprincipal = $colorprincipal;

        return $this;
    }

    public function getColorsecundario(): ?string
    {
        return $this->colorsecundario;
    }

    public function setColorsecundario(?string $colorsecundario): self
    {
        $this->colorsecundario = $colorsecundario;

        return $this;
    }
    public function jsonSerialize(): mixed
    {
        $respuesta=[
            "idSeccion"=>$this->idseccion,
            "nombre"=>$this->nombre,
            "descripcion"=>$this->descripcion,
            "imagen"=>$this->imagen,
            "desarrollador"=>$this->desarrollador,
            "descripcion"=>$this->descripcion,
            "anoLanzamiento"=>$this->anolanzamiento,
            "acronimo"=>$this->acronimo,
            "imagenSecundaria"=>$this->imagensecundaria,
            "logo"=>$this->logo,
            "fondo"=>$this->fondo,
            "popularidad"=>$this->popularidad,
            "colorPrincipal"=>$this->colorprincipal,
            "colorSecundario"=>$this->colorsecundario
        ];
        return $respuesta;
    }

}
