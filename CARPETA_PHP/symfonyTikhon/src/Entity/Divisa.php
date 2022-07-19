<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Divisa
 *
 * @ORM\Table(name="divisa")
 * @ORM\Entity(repositoryClass="App\Repository\DivisaRepository")
 */
class Divisa implements \JsonSerializable
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="nombre", type="string", length=250, nullable=false)
     */
    private $nombre;

    /**
     * @var string
     *
     * @ORM\Column(name="símbolo", type="string", length=250, nullable=false)
     */
    private $símbolo;

    /**
     * @var string
     *
     * @ORM\Column(name="valor", type="decimal", precision=11, scale=2, nullable=false)
     */
    private $valor;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNombre(): ?string
    {
        return $this->nombre;
    }

    public function setNombre(string $nombre): self
    {
        $this->nombre = $nombre;

        return $this;
    }

    public function getSímbolo(): ?string
    {
        return $this->símbolo;
    }

    public function setSímbolo(string $símbolo): self
    {
        $this->símbolo = $símbolo;

        return $this;
    }

    public function getValor(): ?string
    {
        return $this->valor;
    }

    public function setValor(string $valor): self
    {
        $this->valor = $valor;

        return $this;
    }
    public function jsonSerialize(): mixed
    {
        $respuesta=[
            "idDivisa"=>$this->id,
            "nombre"=>$this->nombre,
            "simbolo"=>$this->símbolo,
            "valor"=>$this->valor
        ];
        return $respuesta;
    }


}
