-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 26-Abr-2019 às 19:22
-- Versão do servidor: 10.1.38-MariaDB
-- versão do PHP: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ourstore`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `city`
--

CREATE TABLE `city` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `stateId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `city`
--

INSERT INTO `city` (`id`, `name`, `stateId`) VALUES
(1, 'Rio Grande Novo', 4),
(2, 'Pelotas', 4),
(3, 'Porto Alegre', 4),
(4, 'Florianópolis', 5),
(5, 'Sombrio', 5),
(6, 'Santa Maria', 4),
(7, 'Passo Fundo', 4);

-- --------------------------------------------------------

--
-- Estrutura da tabela `state`
--

CREATE TABLE `state` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `region` varchar(100) NOT NULL,
  `initials` varchar(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `state`
--

INSERT INTO `state` (`id`, `name`, `region`, `initials`) VALUES
(1, 'Rio Grande do Sul', 'Sul', 'RS'),
(2, 'Santa Catarina', 'Sul', 'SC'),
(3, 'Paraná', 'Sul', 'PR'),
(4, 'São Paulo', 'Sudeste', 'SP'),
(5, 'Rio de Janeiro', 'Sudeste', 'RJ'),
(6, 'Espirito Santo', 'Sudeste', 'ES'),
(7, 'Minas Gerais', 'Sudeste', 'MG'),
(8, 'Mato Grosso do Sul', 'Centro Oeste', 'MS'),
(9, 'Mato Grosso', 'Centro Oeste', 'MT'),
(10, 'Goiás', 'Centro Oeste', 'GO'),
(11, 'Distrito Federal', 'Centro Oeste', 'DF'),
(12, 'Rondônia', 'Norte', 'RO'),
(13, 'Acre', 'Norte', 'AC'),
(14, 'Amazonas', 'Norte', 'AM'),
(15, 'Tocantins', 'Norte', 'TO'),
(16, 'Pará', 'Norte', 'PA'),
(17, 'Amapá', 'Norte', 'AM'),
(18, 'Roraima', 'Norte', 'RR'),
(19, 'Maranhão', 'Nordeste', 'MA'),
(20, 'Piauí', 'Nordeste', 'PI'),
(21, 'Ceará', 'Nordeste', 'CE'),
(22, 'Rio Grande do Norte', 'Nordeste', 'RN'),
(23, 'Paraiba', 'Nordeste', 'PB'),
(24, 'Pernambuco', 'Nordeste', 'PE'),
(25, 'Bahia', 'Nordeste', 'BA');

-- --------------------------------------------------------

--
-- Estrutura da tabela `stores`
--

CREATE TABLE `stores` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `cnpj` varchar(255) NOT NULL,
  `workingHour` varchar(255) NOT NULL,
  `cityId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `stores`
--

INSERT INTO `stores` (`id`, `name`, `address`, `phone`, `cnpj`, `workingHour`, `cityId`) VALUES
(1, 'Loja Silva Paes', 'Rua Nova', '(00) 0000-0000', '00.000.000/0000-00', 'Diariamente das 11hs às 23hs', 1),
(2, 'Loja Pelotas 1', 'Rua TRF', '(00) 0000-0000', '00.000.000/0000-00', 'Diariamente das 11hs às 23hs', 2),
(3, 'Rio Rande 2', 'Rua EF', '(00) 0000-0000', '00.000.000/0000-00', 'Diariamente das 11hs às 23hs', 1),
(4, 'Loja F', 'Rua HM', '(00) 0000-0000', '00.000.000/0000-00', 'Diariamente das 11hs às 23hs', 4),
(5, 'Loja G', 'Rua AS', '(00) 0000-0000', '00.000.000/0000-00', 'Diariamente das 11hs às 23hs', 5),
(6, 'Loja Rio Grande 8', 'General Câmara, 568', '(XX)XXXXX-XX', '00.000.000/0000-00', 'Diariamente das 11hs às 23hs', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_e99de556ee56afe72154f3ed04a` (`stateId`);

--
-- Indexes for table `state`
--
ALTER TABLE `state`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stores`
--
ALTER TABLE `stores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_2d4b77997b25a4c1e6d04f2579b` (`cityId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `city`
--
ALTER TABLE `city`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `state`
--
ALTER TABLE `state`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `stores`
--
ALTER TABLE `stores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `city`
--
ALTER TABLE `city`
  ADD CONSTRAINT `FK_e99de556ee56afe72154f3ed04a` FOREIGN KEY (`stateId`) REFERENCES `state` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `stores`
--
ALTER TABLE `stores`
  ADD CONSTRAINT `FK_2d4b77997b25a4c1e6d04f2579b` FOREIGN KEY (`cityId`) REFERENCES `city` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
