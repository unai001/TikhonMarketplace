<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Entrega
 *
 * @ORM\Table(name="entrega")
 * @ORM\Entity(repositoryClass="App\Repository\EntregaRepository")
 */
class Entrega
{
    /**
     * @var int
     *
     * @ORM\Column(name="idEntrega", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $identrega;

    /**
     * @var int|null
     *
     * @ORM\Column(name="receptor", type="integer", nullable=true, options={"default"="NULL"})
     */
    private $receptor = NULL;

    /**
     * @var int|null
     *
     * @ORM\Column(name="remitente", type="integer", nullable=true, options={"default"="NULL"})
     */
    private $remitente = NULL;

    /**
     * @var string|null
     *
     * @ORM\Column(name="metodo", type="string", length=20, nullable=true, options={"default"="NULL"})
     */
    private $metodo = 'NULL';

    /**
     * @var string|null
     *
     * @ORM\Column(name="estado", type="string", length=20, nullable=true, options={"default"="NULL"})
     */
    private $estado = 'NULL';

    /**
     * @var string|null
     *
     * @ORM\Column(name="direccion", type="string", length=50, nullable=true, options={"default"="NULL"})
     */
    private $direccion = 'NULL';

    /**
     * @var string|null
     *
     * @ORM\Column(name="correo", type="string", length=20, nullable=true, options={"default"="NULL"})
     */
    private $correo = 'NULL';

    /**
     * @var int|null
     *
     * @ORM\Column(name="numeroPedido", type="integer", nullable=true, options={"default"="NULL"})
     */
    private $numeropedido = NULL;

    public function getIdentrega(): ?int
    {
        return $this->identrega;
    }

    public function getReceptor(): ?int
    {
        return $this->receptor;
    }

    public function setReceptor(?int $receptor): self
    {
        $this->receptor = $receptor;

        return $this;
    }

    public function getRemitente(): ?int
    {
        return $this->remitente;
    }

    public function setRemitente(?int $remitente): self
    {
        $this->remitente = $remitente;

        return $this;
    }

    public function getMetodo(): ?string
    {
        return $this->metodo;
    }

    public function setMetodo(?string $metodo): self
    {
        $this->metodo = $metodo;

        return $this;
    }

    public function getEstado(): ?string
    {
        return $this->estado;
    }

    public function setEstado(?string $estado): self
    {
        $this->estado = $estado;

        return $this;
    }

    public function getDireccion(): ?string
    {
        return $this->direccion;
    }

    public function setDireccion(?string $direccion): self
    {
        $this->direccion = $direccion;

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

    public function getNumeropedido(): ?int
    {
        return $this->numeropedido;
    }

    public function setNumeropedido(?int $numeropedido): self
    {
        $this->numeropedido = $numeropedido;

        return $this;
    }


}
