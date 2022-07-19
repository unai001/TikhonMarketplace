<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Usuario
 *
 * @ORM\Table(name="usuario", indexes={@ORM\Index(name="pk_idDivisa_producto", columns={"idDivisa"})})
 * @ORM\Entity(repositoryClass="App\Repository\UsuarioRepository")
 */
class Usuario implements \JsonSerializable
{
    /**
     * @var int
     *
     * @ORM\Column(name="idUser", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $iduser;

    /**
     * @var string|null
     *
     * @ORM\Column(name="usuario", type="string", length=20, nullable=true, options={"default"="NULL"})
     */
    private $usuario = 'NULL';

    /**
     * @var string|null
     *
     * @ORM\Column(name="nombre", type="string", length=20, nullable=true, options={"default"="NULL"})
     */
    private $nombre = 'NULL';

    /**
     * @var string|null
     *
     * @ORM\Column(name="apellidos", type="string", length=30, nullable=true, options={"default"="NULL"})
     */
    private $apellidos = 'NULL';

    /**
     * @var string|null
     *
     * @ORM\Column(name="email", type="string", length=50, nullable=true, options={"default"="NULL"})
     */
    private $email = 'NULL';

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="fechaNacimiento", type="date", nullable=true, options={"default"="NULL"})
     */
    private $fechanacimiento = 'NULL';

    /**
     * @var string|null
     *
     * @ORM\Column(name="pais", type="string", length=20, nullable=true, options={"default"="NULL"})
     */
    private $pais = 'NULL';

    /**
     * @var int|null
     *
     * @ORM\Column(name="saldo", type="integer", nullable=true)
     */
    private $saldo = '0';

    /**
     * @var bool|null
     *
     * @ORM\Column(name="administrator", type="boolean", nullable=true, options={"default"="NULL"})
     */
    private $administrator = 'NULL';

    /**
     * @var string|null
     *
     * @ORM\Column(name="password", type="string", length=45, nullable=true, options={"default"="NULL"})
     */
    private $password = 'NULL';

    /**
     * @var \Divisa
     *
     * @ORM\ManyToOne(targetEntity="Divisa")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idDivisa", referencedColumnName="id")
     * })
     */
    private $iddivisa;

    public function getIduser(): ?int
    {
        return $this->iduser;
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

    public function getNombre(): ?string
    {
        return $this->nombre;
    }

    public function setNombre(?string $nombre): self
    {
        $this->nombre = $nombre;

        return $this;
    }

    public function getApellidos(): ?string
    {
        return $this->apellidos;
    }

    public function setApellidos(?string $apellidos): self
    {
        $this->apellidos = $apellidos;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getFechanacimiento(): ?\DateTimeInterface
    {
        return $this->fechanacimiento;
    }

    public function setFechanacimiento(?\DateTimeInterface $fechanacimiento): self
    {
        $this->fechanacimiento = $fechanacimiento;

        return $this;
    }

    public function getPais(): ?string
    {
        return $this->pais;
    }

    public function setPais(?string $pais): self
    {
        $this->pais = $pais;

        return $this;
    }

    public function getSaldo(): ?int
    {
        return $this->saldo;
    }

    public function setSaldo(?int $saldo): self
    {
        $this->saldo = $saldo;

        return $this;
    }

    public function getAdministrator(): ?bool
    {
        return $this->administrator;
    }

    public function setAdministrator(?bool $administrator): self
    {
        $this->administrator = $administrator;

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

    public function getIddivisa(): ?Divisa
    {
        return $this->iddivisa;
    }

    public function setIddivisa(?Divisa $iddivisa): self
    {
        $this->iddivisa = $iddivisa;

        return $this;
    }
    public function jsonSerialize(): mixed
    {
        $respuesta=[
            "idUser"=>$this->iduser,
            "usuario"=>$this->usuario,
            "nombre"=>$this->nombre,
            "apellidos"=>$this->apellidos,
            "email"=>$this->email,
            "fechaNacimiento"=>$this->fechanacimiento->format('Y-m-d'),
            "pais"=>$this->pais,
            "saldo"=>$this->saldo,
            "administrador"=>$this->administrator,
            "password"=>$this->password
        ];
        return $respuesta;
    }

}
