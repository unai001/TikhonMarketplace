-- phpMyAdmin SQL Dump
-- version 5.3.0-dev+20220510.314f251104
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-05-2022 a las 18:15:57
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tikhon`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `divisa`
--

CREATE TABLE `divisa` (
  `id` int(11) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `símbolo` varchar(250) NOT NULL,
  `valor` decimal(11,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `divisa`
--

INSERT INTO `divisa` (`id`, `nombre`, `símbolo`, `valor`) VALUES
(1, 'Euro', '€', '1.00'),
(2, 'Dolar', '$', '0.94'),
(3, 'Libra', '£', '1.18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrega`
--

CREATE TABLE `entrega` (
  `idEntrega` int(11) NOT NULL,
  `receptor` int(11) DEFAULT NULL,
  `remitente` int(11) DEFAULT NULL,
  `metodo` varchar(20) DEFAULT NULL,
  `estado` varchar(20) DEFAULT NULL,
  `direccion` varchar(50) DEFAULT NULL,
  `correo` varchar(20) DEFAULT NULL,
  `numeroPedido` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `entrega`
--

INSERT INTO `entrega` (`idEntrega`, `receptor`, `remitente`, `metodo`, `estado`, `direccion`, `correo`, `numeroPedido`) VALUES
(1, 0, 0, 'Correo', 'Completado', '', 'asd@gmail.com', 1),
(2, 0, 0, 'SMS', 'Comletado', '912391239', '912912912', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `info_producto`
--

CREATE TABLE `info_producto` (
  `id_info_producto` int(11) NOT NULL,
  `usuario` varchar(45) DEFAULT NULL,
  `correo` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `secret_answer` varchar(45) DEFAULT NULL,
  `codigo` varchar(150) DEFAULT NULL,
  `idProducto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `info_producto`
--

INSERT INTO `info_producto` (`id_info_producto`, `usuario`, `correo`, `password`, `secret_answer`, `codigo`, `idProducto`) VALUES
(1, 'faraon', 'hola@gmail.com', 'hola', '123', NULL, 1),
(9, 'JR1926', 'rrinconguigosa@gmail.com', '123', 'Duke', NULL, 27);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oferta`
--

CREATE TABLE `oferta` (
  `idOferta` int(11) NOT NULL,
  `isActive` tinyint(1) DEFAULT NULL,
  `descuento` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `oferta`
--

INSERT INTO `oferta` (`idOferta`, `isActive`, `descuento`) VALUES
(-1, 0, 0),
(1, 0, 10),
(2, 1, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `idPedido` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `precioTotal` int(11) DEFAULT NULL,
  `idUser` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`idPedido`, `fecha`, `precioTotal`, `idUser`) VALUES
(1, '0000-00-00', 10, 1),
(2, '0000-00-00', 20, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido_productos`
--

CREATE TABLE `pedido_productos` (
  `idPedido_Productos` int(11) NOT NULL,
  `idPedido` int(11) DEFAULT NULL,
  `producto1` int(11) DEFAULT NULL,
  `producto2` int(11) DEFAULT NULL,
  `producto3` int(11) DEFAULT NULL,
  `producto4` int(11) DEFAULT NULL,
  `producto5` int(11) DEFAULT NULL,
  `producto6` int(11) DEFAULT NULL,
  `producto7` int(11) DEFAULT NULL,
  `producto8` int(11) DEFAULT NULL,
  `producto9` int(11) DEFAULT NULL,
  `producto10` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pedido_productos`
--

INSERT INTO `pedido_productos` (`idPedido_Productos`, `idPedido`, `producto1`, `producto2`, `producto3`, `producto4`, `producto5`, `producto6`, `producto7`, `producto8`, `producto9`, `producto10`) VALUES
(1, 1, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `idProducto` int(11) NOT NULL,
  `idUser` int(11) DEFAULT NULL,
  `idSeccion` int(11) DEFAULT NULL,
  `idOferta` int(11) DEFAULT -1,
  `nombre` varchar(50) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `precioTotalstock` int(11) DEFAULT NULL,
  `fechaPublicacion` date DEFAULT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  `categoria` varchar(20) DEFAULT NULL,
  `divisa` int(11) DEFAULT NULL,
  `estado` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`idProducto`, `idUser`, `idSeccion`, `idOferta`, `nombre`, `descripcion`, `precioTotalstock`, `fechaPublicacion`, `imagen`, `categoria`, `divisa`, `estado`) VALUES
(1, 1, 1, 1, 'Cuenta lvl 20', 'Vendo cuenta de valorant nivel 20, lista para poder jugar rankeds y con las skins de la temporada 1 desbloqueadas', 40, '2022-01-01', 'CARPETA_PHP/images/productos/Player_Card.jpg', 'Cuenta', 1, ''),
(3, 1, 1, 1, 'Cuenta lvl 26', 'asd', 50, '2022-03-29', 'CARPETA_PHP/images/productos/Player_Card.jpg', 'Cuenta', 1, ''),
(4, 1, 1, 1, 'Cuenta lvl 20', 'Vendo cuenta de valorant nivel 20, lista para poder jugar rankeds y con las skins de la temporada 1 desbloqueadas', 40, '2022-03-29', 'CARPETA_PHP/images/productos/Player_Card.jpg', 'Cuenta', 1, ''),
(7, 3, 2, -1, 'Skin', 'Hola esto es una skin', 10, '2022-04-20', 'CARPETA_PHP/images/productos/mordekaiser.jpg', 'Skin', 1, ''),
(27, 2, 4, NULL, 'Skin ', 'Skin de Teemo', 26, '2022-05-23', 'CARPETA_PHP/images/productos/skinMorde.png', 'Skin', 2, '');

--
-- Disparadores `producto`
--
DELIMITER $$
CREATE TRIGGER `insertarProducto` BEFORE INSERT ON `producto` FOR EACH ROW BEGIN
     set new.fechaPublicacion=CURDATE();
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seccion`
--

CREATE TABLE `seccion` (
  `idSeccion` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  `desarrollador` varchar(20) DEFAULT NULL,
  `anoLanzamiento` date DEFAULT NULL,
  `acronimo` varchar(50) DEFAULT NULL,
  `imagenSecundaria` varchar(100) DEFAULT NULL,
  `logo` varchar(100) DEFAULT NULL,
  `fondo` varchar(100) DEFAULT NULL,
  `popularidad` int(11) DEFAULT NULL,
  `colorPrincipal` varchar(50) DEFAULT NULL,
  `colorSecundario` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `seccion`
--

INSERT INTO `seccion` (`idSeccion`, `nombre`, `descripcion`, `imagen`, `desarrollador`, `anoLanzamiento`, `acronimo`, `imagenSecundaria`, `logo`, `fondo`, `popularidad`, `colorPrincipal`, `colorSecundario`) VALUES
(1, 'Valorant', 'Valorant es un juego de disparos en primera persona en el que dos equipos de cinco jugadores se enfrentan entre ellos. Además de los consabidos tiros, el objetivo de las partidas es colocar un dispositivo llamado Spike en una zona concreta del mapa. Una vez hecho, el equipo contrario tendrá que conseguir desactivarlo antes de que pasen 45 segundos.', 'CARPETA_PHP/images/iconosJuegos/valorant.png', 'Riot Games', '2020-06-02', 'valorant', 'CARPETA_PHP/images/scciones/img/cartaValorant.webp', 'CARPETA_PHP/images/scciones/logo/tituloValorant.png', 'CARPETA_PHP/images/scciones/fondo/fondoValorant.JPG', 0, '#f94956', '#111823'),
(2, 'Counter Strike: Global Offensive', 'Counter-Strike: Global Offensive (CS:GO) es un videojuego de disparos en primera persona desarrollado por Valve Corporation y Hidden Path Entertainment. Es el cuarto juego de la saga Counter-Strike. El juego consiste en dos equipos, los Terroristas y los Antiterroristas (T y CT, respectivamente), los cuales se enfrentan entre ellos en diferentes modos de juego.', 'CARPETA_PHP/images/iconosJuegos/csgo.png', 'Valve', '2012-08-21', 'csgo', 'CARPETA_PHP/images/scciones/img/imgCS.jpg\r\n', 'CARPETA_PHP/images/scciones/logo/tituloCS.png\r\n', 'CARPETA_PHP/images/scciones/fondo/fondoCS.jpg\r\n', NULL, NULL, NULL),
(3, 'Fortnite', 'Fortnite es un juego online de disparos (lo que se conoce como un shooter) en tercera persona. Tiene dos modos de juego: Salvar al mundo y Battle Royale.Battle Royale es el modo que está causando furor entre los adolescentes. Se trata de un modo competitivo donde el jugador es parte de un equipo de cuatro personas (conocidas o desconocidas), que debe tratar de sobrevivir.', 'CARPETA_PHP/images/iconosJuegos/fortnite.png', 'Epic Games', '2011-12-10', 'fortnite', 'CARPETA_PHP/images/scciones/img/imgFornite.png', 'CARPETA_PHP/images/scciones/logo/tituloFornite.png', 'CARPETA_PHP/images/scciones/fondo/fondoFornite.jpg', NULL, NULL, NULL),
(4, 'League of Legends', 'League of Legends es un juego de estrategia por equipos en el que dos equipos de cinco campeones se enfrentan para ver quién destruye antes la base del otro. Elige de entre un elenco de 140 campeones para realizar jugadas épicas, asesinar rivales y derribar torretas para alzarte con la victoria.', 'CARPETA_PHP/images/iconosJuegos/lol.png', 'Riot Games', '2009-10-27', 'lol', 'CARPETA_PHP/images/scciones/img/imgLOL.png', 'CARPETA_PHP/images/scciones/logo/tituloLOL.webp', 'CARPETA_PHP/images/scciones/fondo/fondoLOL.jpg', NULL, NULL, NULL),
(5, 'Overwatch', 'Overwatch es un variado juego de acción basado en equipos que presenta un listado diverso de héroes poderosos. Viaja por el mundo, forma un equipo y cumple objetivos en un emocionante combate de 6 vs. 6.', 'CARPETA_PHP/images/iconosJuegos/ow.png', 'Blizzard Entertainme', '2016-05-24', 'ow', 'CARPETA_PHP/images/scciones/img/imgOver.png', 'CARPETA_PHP/images/scciones/logo/tituloOver.png', 'CARPETA_PHP/images/scciones/fondo/fondoOver.jpg', NULL, NULL, NULL),
(6, 'Dota 2', 'Dota 2 es un juego multijugador de estrategia en tiempo real, distribuido por la plataforma Steam de Valve. En este, dos equipos de cinco jugadores tienen el objetivo de destruir las estructuras rivales controlando a personajes denominados héroes.', 'CARPETA_PHP/images/iconosJuegos/dota2.png', 'Valve', '2013-07-09', 'dota', 'CARPETA_PHP/images/scciones/img/imgDota.png', 'CARPETA_PHP/images/scciones/logo/tituloDota.png', 'CARPETA_PHP/images/scciones/fondo/fondoDota.webp', NULL, NULL, NULL),
(7, 'Team Fortess 2', 'Team Fortress 2, abreviado por su acrónimo TF2, es un videojuego multijugador de disparos en primera persona. En este juego los jugadores deben elegir entre uno de los dos equipos y una de las 9 clases de personajes para jugar en distintos modos como capturar la bandera o rey de la colina. ', 'CARPETA_PHP/images/iconosJuegos/tf2.png', 'Valve', '2007-10-10', 'tf2', 'CARPETA_PHP/images/scciones/img/imgTf2.webp', 'CARPETA_PHP/images/scciones/logo/tf2.png', 'CARPETA_PHP/images/scciones/fondo/fondoTf2.png', NULL, NULL, NULL),
(8, 'StarCraft 2', 'StarCraft II: Wings of Liberty (traducido como Alas de libertad) es un videojuego de estrategia en tiempo real. Ambientado en el siglo XXVI en el lejano Sector Koprulu, el juego gira en torno a tres especies: los Terran, humanos exiliados de la Tierra; los Zerg, una especie de formas de vida que asimilan otras organizada en enjambres; y los Protoss, una raza tecnológicamente avanzada con poderes psiónicos. ', 'CARPETA_PHP/images/iconosJuegos/sc2.png', 'Blizzard Entertainme', '2010-07-27', 'sc2', 'CARPETA_PHP/images/scciones/img/imgSc2.png', 'CARPETA_PHP/images/scciones/logo/sc2.png', 'CARPETA_PHP/images/scciones/fondo/fondoSc2.jpg', NULL, NULL, NULL),
(9, 'Minecraft', 'Minecraft es un videojuego de mundo abierto donde la exploración y las construcciones son fundamentales, nos permite desarrollar nuestros propios universos fantásticos y artísticos, mediante la colocación y destrucción de bloques.  Al ser un videojuego de mundo abierto, no tiene una misión concreta (salvo alguno de sus modos de juego) y consiste en la construcción libre mediante el uso de cubos con texturas tridimensionales.', 'CARPETA_PHP/images/iconosJuegos/minecraft.png', 'Markus Persson(Notch', '2011-11-18', 'minecraft', 'CARPETA_PHP/images/scciones/img/imgMinecraft.webp', 'CARPETA_PHP/images/scciones/logo/minecraft.png', 'CARPETA_PHP/images/scciones/fondo/fondoMinecraft.jpg', NULL, NULL, NULL),
(10, 'World of Warcraft', 'Está basado en el mundo de ficción y la historia de Warcraft, donde se adopta el papel de un personaje virtual que interactúa con otros personajes y desarrolla situaciones en un ambiente fantástico como en un juego de rol, siendo la cuarta entrega situada en este universo.', 'CARPETA_PHP/images/iconosJuegos/wow.png', 'Blizzard Entertainme', '2004-11-23', 'wow', 'CARPETA_PHP/images/scciones/img/imgWow.webp', 'CARPETA_PHP/images/scciones/logo/wow.png', 'CARPETA_PHP/images/scciones/fondo/fondoWow.jpg', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUser` int(11) NOT NULL,
  `usuario` varchar(20) DEFAULT NULL,
  `nombre` varchar(20) DEFAULT NULL,
  `apellidos` varchar(30) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `fechaNacimiento` date DEFAULT NULL,
  `pais` varchar(20) DEFAULT NULL,
  `saldo` int(11) DEFAULT 0,
  `administrator` tinyint(1) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `idDivisa` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUser`, `usuario`, `nombre`, `apellidos`, `email`, `fechaNacimiento`, `pais`, `saldo`, `administrator`, `password`, `idDivisa`) VALUES
(0, 'user', 'user', 'user', 'user@tikhon.com', '0000-00-00', 'user', 0, 1, 'user', 1),
(1, 'elmachacA', 'unai', 'manzano', 'unai@tikhon.com', '2001-10-24', 'Espana', 20000, 1, 'unai', 1),
(2, 'yuel', 'joel', 'rincon', 'joel@tikhon.com', '2005-01-01', 'Catalonia', 23, 0, 'yuel', 1),
(3, 'maricon', 'marc', 'iñiguez', 'marc@tikhon.com', '2001-05-11', 'Catalonia', 999999, 1, 'marc', 1),
(4, 'JR1926', 'Joel', 'Rincón', 'rrinconguigosa@gmail.com', '2002-04-26', 'España', 0, 1, '1234', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `divisa`
--
ALTER TABLE `divisa`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `entrega`
--
ALTER TABLE `entrega`
  ADD PRIMARY KEY (`idEntrega`);

--
-- Indices de la tabla `info_producto`
--
ALTER TABLE `info_producto`
  ADD PRIMARY KEY (`id_info_producto`),
  ADD KEY `pk_idProducto_producto` (`idProducto`);

--
-- Indices de la tabla `oferta`
--
ALTER TABLE `oferta`
  ADD PRIMARY KEY (`idOferta`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`idPedido`),
  ADD KEY `ref_idUser` (`idUser`);

--
-- Indices de la tabla `pedido_productos`
--
ALTER TABLE `pedido_productos`
  ADD PRIMARY KEY (`idPedido_Productos`),
  ADD KEY `ref_pedido` (`idPedido`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`idProducto`),
  ADD KEY `ref_idUserProducto` (`idUser`),
  ADD KEY `ref_oferta` (`idOferta`),
  ADD KEY `ref_seccion` (`idSeccion`),
  ADD KEY `ref_divisa` (`divisa`);

--
-- Indices de la tabla `seccion`
--
ALTER TABLE `seccion`
  ADD PRIMARY KEY (`idSeccion`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUser`),
  ADD KEY `pk_idDivisa_producto` (`idDivisa`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `entrega`
--
ALTER TABLE `entrega`
  MODIFY `idEntrega` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `info_producto`
--
ALTER TABLE `info_producto`
  MODIFY `id_info_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `oferta`
--
ALTER TABLE `oferta`
  MODIFY `idOferta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `idPedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `pedido_productos`
--
ALTER TABLE `pedido_productos`
  MODIFY `idPedido_Productos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `idProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `seccion`
--
ALTER TABLE `seccion`
  MODIFY `idSeccion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `info_producto`
--
ALTER TABLE `info_producto`
  ADD CONSTRAINT `pk_idProducto_producto` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `ref_idUser` FOREIGN KEY (`idUser`) REFERENCES `usuario` (`idUser`);

--
-- Filtros para la tabla `pedido_productos`
--
ALTER TABLE `pedido_productos`
  ADD CONSTRAINT `ref_pedido` FOREIGN KEY (`idPedido`) REFERENCES `pedidos` (`idPedido`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `ref_divisa` FOREIGN KEY (`divisa`) REFERENCES `divisa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ref_idUserProducto` FOREIGN KEY (`idUser`) REFERENCES `usuario` (`idUser`),
  ADD CONSTRAINT `ref_oferta` FOREIGN KEY (`idOferta`) REFERENCES `oferta` (`idOferta`),
  ADD CONSTRAINT `ref_seccion` FOREIGN KEY (`idSeccion`) REFERENCES `seccion` (`idSeccion`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `pk_idDivisa_producto` FOREIGN KEY (`idDivisa`) REFERENCES `divisa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;



