<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Oferta
 *
 * @ORM\Table(name="oferta")
 * @ORM\Entity(repositoryClass="App\Repository\OfertaRepository")
 */
class Oferta
{
    /**
     * @var int
     *
     * @ORM\Column(name="idOferta", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idoferta;

    /**
     * @var bool|null
     *
     * @ORM\Column(name="isActive", type="boolean", nullable=true, options={"default"="NULL"})
     */
    private $isactive = 'NULL';

    /**
     * @var int|null
     *
     * @ORM\Column(name="descuento", type="integer", nullable=true, options={"default"="NULL"})
     */
    private $descuento = NULL;

    public function getIdoferta(): ?int
    {
        return $this->idoferta;
    }

    public function getIsactive(): ?bool
    {
        return $this->isactive;
    }

    public function setIsactive(?bool $isactive): self
    {
        $this->isactive = $isactive;

        return $this;
    }

    public function getDescuento(): ?int
    {
        return $this->descuento;
    }

    public function setDescuento(?int $descuento): self
    {
        $this->descuento = $descuento;

        return $this;
    }


}
