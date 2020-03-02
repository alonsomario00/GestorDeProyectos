CREATE DATABASE  IF NOT EXISTS `jpm` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `jpm`;
-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: jpm
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `fichajes`
--

DROP TABLE IF EXISTS `fichajes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fichajes` (
  `idFichaje` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `idTarea` int(11) NOT NULL DEFAULT '0',
  `idUsuario` int(11) NOT NULL,
  `entrada` tinyint(4) NOT NULL,
  PRIMARY KEY (`idFichaje`),
  KEY `fk_idUsuario_idx` (`idUsuario`),
  CONSTRAINT `fk_idUsuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fichajes`
--

LOCK TABLES `fichajes` WRITE;
/*!40000 ALTER TABLE `fichajes` DISABLE KEYS */;
INSERT INTO `fichajes` VALUES (96,'2020-02-08','14:11:38',0,29,1),(97,'2020-02-08','14:13:31',0,29,0),(98,'2020-02-08','14:13:41',0,29,1),(99,'2020-02-08','14:13:42',0,29,0),(100,'2020-02-08','14:13:43',0,29,1),(101,'2020-02-08','14:13:45',0,29,0),(102,'2020-02-09','21:23:41',0,23,1),(103,'2020-02-09','21:23:44',0,23,1),(104,'2020-02-09','21:24:19',0,23,1),(105,'2020-02-09','21:24:42',0,23,1),(106,'2020-02-09','21:24:44',0,23,1),(107,'2020-02-09','21:24:46',0,23,0),(108,'2020-02-09','21:24:48',0,23,1),(109,'2020-02-09','21:24:50',0,23,0),(110,'2020-02-09','21:25:22',0,23,0),(111,'2020-02-09','21:26:29',0,23,1),(112,'2020-02-09','21:26:31',0,23,0),(113,'2020-02-09','22:09:37',0,23,1),(114,'2020-02-09','22:09:39',0,23,0);
/*!40000 ALTER TABLE `fichajes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyectos`
--

DROP TABLE IF EXISTS `proyectos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proyectos` (
  `idProyecto` int(11) NOT NULL AUTO_INCREMENT,
  `nombreProyecto` varchar(100) NOT NULL,
  `idBoss` int(11) DEFAULT NULL,
  `descripcionProyecto` varchar(500) DEFAULT NULL,
  `fechaInicioProyecto` date DEFAULT NULL,
  `fechaFinProyecto` date DEFAULT NULL,
  PRIMARY KEY (`idProyecto`),
  KEY `fk_Proyectos_Usuarios1_idx` (`idBoss`),
  CONSTRAINT `fk_Proyectos_Usuarios` FOREIGN KEY (`idBoss`) REFERENCES `usuarios` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyectos`
--

LOCK TABLES `proyectos` WRITE;
/*!40000 ALTER TABLE `proyectos` DISABLE KEYS */;
INSERT INTO `proyectos` VALUES (61,'Crear pagina web',27,'Crear','2020-02-08','2022-02-08','2023-02-08'),(62,'Robar banco',27,'Rapido','2020-02-08','2021-01-01','2021-01-03'),(63,'HP Software',27,'Software para HP','2020-01-01','2020-01-01','2020-01-01'),(64,'INDRA Solutions',27,'Software para Indra','2020-01-01','2020-01-01','2020-01-01'),(65,'Crear pagina web',27,'asdf','2020-12-30','2023-12-31','2020-01-02'),(66,'Crear pagina web',24,'asdf','2020-01-01','2020-02-11','2020-01-01');
/*!40000 ALTER TABLE `proyectos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `puesto`
--

DROP TABLE IF EXISTS `puesto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `puesto` (
  `idPuesto` int(11) NOT NULL AUTO_INCREMENT,
  `puesto` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idPuesto`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `puesto`
--

LOCK TABLES `puesto` WRITE;
/*!40000 ALTER TABLE `puesto` DISABLE KEYS */;
INSERT INTO `puesto` VALUES (1,'Administrador'),(2,'Jefe de Proyecto'),(3,'Programador Senior'),(4,'Programador Junior');
/*!40000 ALTER TABLE `puesto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `repositorio`
--

DROP TABLE IF EXISTS `repositorio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `repositorio` (
  `idRepositorio` int(11) NOT NULL AUTO_INCREMENT,
  `nombreArchivo` varchar(100) NOT NULL,
  `fechaSubidaArchivo` datetime DEFAULT NULL,
  `idPropietario` int(11) DEFAULT NULL,
  `fechaUltimaModificacion` datetime DEFAULT NULL,
  `idUltimaModificacion` int(11) DEFAULT NULL,
  `descripcionArchivo` varchar(500) DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idRepositorio`),
  KEY `fk_Propietario_idx` (`idPropietario`),
  KEY `fk_Autor_ult_mofif_idx` (`idUltimaModificacion`),
  CONSTRAINT `fk_Autor_ult_mofif` FOREIGN KEY (`idUltimaModificacion`) REFERENCES `usuarios` (`idUsuario`),
  CONSTRAINT `fk_Propietario` FOREIGN KEY (`idPropietario`) REFERENCES `usuarios` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `repositorio`
--

LOCK TABLES `repositorio` WRITE;
/*!40000 ALTER TABLE `repositorio` DISABLE KEYS */;
INSERT INTO `repositorio` VALUES (34,'descarga.jpg','2020-02-10 09:47:55',NULL,NULL,NULL,'Holi',NULL);
/*!40000 ALTER TABLE `repositorio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('579vA6JkBEjRTtCtFCJMW1tMUa5YUH51',1581522272,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('AtZJbAaubfYQQ7JBmT-GyZdhdCgfweIj',1581468739,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":\"alonsomario00@gmail.com\"}}'),('CyVh2YQ8W0ks9lSiqEhx-ujBeVCbgay1',1581522272,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('KPFnk_HHxDuxVJD1MhSTJkIBPzNmL8Pl',1581522385,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":\"alonsomario00@gmail.com\"}}'),('RiJ5hyQ_GSSPwhLkewDLk56VPEATY5fY',1581468793,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":\"alonsomario00@gmail.com\"}}'),('Ynh517b9FSGYrM8idqxhZukH04g1cuRb',1581529865,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":\"alonsomario00@gmail.com\"}}'),('ZcsHayYvq9i6Iq0e9LbkYrym6Xklc8r6',1581522272,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('mB7iFn41XJB_sx19sU3CAInevaQKahu6',1581508277,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":\"alonsomario00@gmail.com\"}}'),('nnvY03YcmoYZdhx4IHCRkzifZkY1LcEF',1581443647,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{}}'),('xgQWCFjZC_lMzur39eeuc_MS7O3HMq6x',1581501910,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":\"alonsomario00@gmail.com\"}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tareas`
--

DROP TABLE IF EXISTS `tareas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tareas` (
  `idTarea` int(11) NOT NULL AUTO_INCREMENT,
  `nombreTarea` varchar(100) DEFAULT NULL,
  `descripcionTarea` varchar(500) DEFAULT NULL,
  `fechaInicioTarea` date DEFAULT NULL,
  `fechaFinTarea` date DEFAULT NULL,
  `idSenior` int(11) DEFAULT NULL,
  `idJunior` int(11) DEFAULT NULL,
  `idProyecto` int(11) DEFAULT NULL,
  PRIMARY KEY (`idTarea`),
  KEY `fk_Proyecto_idx` (`idProyecto`),
  KEY `fk_puesto_idx` (`idJunior`,`idSenior`),
  CONSTRAINT `fk_idProyecto` FOREIGN KEY (`idProyecto`) REFERENCES `proyectos` (`idProyecto`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tareas`
--

LOCK TABLES `tareas` WRITE;
/*!40000 ALTER TABLE `tareas` DISABLE KEYS */;
INSERT INTO `tareas` VALUES (10,'Front-End','Desarrollo interfaz Pagina Web 2','2020-02-08','2020-02-16','2020-02-17',28,29,64),(11,'cucu','asdf','2020-01-01','2020-01-01','2020-01-01',25,26,65),(12,'Crear pagina web','asdf','2020-01-01','2020-01-01','2020-01-01',25,29,61),(14,'alta tarea','adsf','2020-01-01','2020-01-01','2020-01-01',25,26,63),(15,'Crear pagina web 3','asdf','2020-01-01','2020-01-01','2020-01-01',28,29,64),(16,'Crear pagina web 4','asdf','2020-01-01','2020-01-01','2020-01-01',28,26,62),(17,'Crear pagina web 5','asdf','2020-01-01','2020-01-01','2020-01-01',28,26,64),(18,'Crear pagina web 6','asdf','2020-01-01','2020-01-01','2020-01-01',25,26,62);
/*!40000 ALTER TABLE `tareas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombreUsuario` varchar(50) NOT NULL,
  `apellido1` varchar(100) NOT NULL,
  `apellido2` varchar(100) NOT NULL,
  `nacimiento` date NOT NULL,
  `idPuesto` int(11) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `ciudad` varchar(100) DEFAULT NULL,
  `cp` int(5) DEFAULT NULL,
  `correo` varchar(100) NOT NULL COMMENT 'No puede haber dos direcciones de correo iguales',
  `provincia` varchar(50) DEFAULT NULL,
  `descripcion` varchar(250) DEFAULT NULL,
  `clave` varchar(64) NOT NULL,
  PRIMARY KEY (`idUsuario`,`idPuesto`,`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8 COMMENT='		';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (23,'Mario','Alonso','Raneros','2020-01-01',1,'648745204','Calle Rosaleda 2 3D','Leon',24007,'alonsomario00@gmail.com','ES-LE','asdf','$2a$10$YwlSHg/lNB7daiTwDIWE1ehFC3/EUnz6uBsNxZiQG8Pz5WwS61Byi'),(24,'Luis','Gomez','Gonzalez','2020-01-01',2,'648745204','Calle Rosaleda 2 3D','Leon',24007,'boss@gmail.com','ES-LE','asdf','$2a$10$Dej.NbB3DQ7pYpEZQupcguUEGCc6UepuJBvlrEz80qRYQzY7e3iVe'),(25,'Pepe','Perez','Fernandez','2019-11-15',3,'648745204','Calle Rosaleda 2 3D','Leon',24007,'senior@gmail.com','ES-LE','asdfasdf','$2a$10$b/hPj5oSbzr9iH9D0dnF/ehp8sP5LMBmfZN0vz6aWG14EbQoLQnE2'),(26,'pepito','erter','rerte','2020-01-01',3,'234623456345','456345634','3456345',12345213,'tpm@kk.com','234werg','wertyw5','wert34w5r'),(27,'Tomas','Rivera','Diez','1998-12-31',2,'648745204','Calle Rosaleda 2 3D','Leon',24007,'boss2@gmail.com','ES-LE','asdf','$2a$10$3AZYQkp8KSXUKcgNtAa3e.P/2P1xFC5Si8eJpFF9gWS7/ZqI/UyIu'),(28,'Miguel','Menendez','de la Rosa','1975-12-31',3,'648745204','Calle Rosaleda 2 3D','Leon',24007,'senior2@gmail.com','ES-LE','asdf','$2a$10$otWTr4.Qbpxcjt5oVG9Rn.4l3lpLwp.kE08olykyI8ft6FK7X0oTm'),(29,'Rebeca','Prada','Soto','1980-02-06',4,'648745204','Calle Rosaleda 2 3D','Leon',24007,'junior2@gmail.com','ES-LE','asdf','$2a$10$PzT41MWenmbvW72XZCjj6OC217g0EvMwHcm0hj5cumwtutt4aWNPu'),(30,'ana','alonso','raneros','2020-02-02',2,'234234234','Calle Rosaleda 2 3D','Leon',24007,'ana@gmail.com','ES-LE','lista','$2a$10$ETRb77B./OpQ71v6pwzYh.s.xJuxp2KnbD4yobb.yPVPltaSUBtUC'),(31,'branncott','branncott','branncott','2020-01-02',1,'648745204','Calle Rosaleda 2 3D','Leon',24007,'branncott@gmail.com','ES-LE','asdf','$2a$10$v57TvRpZXmjaUbEk7gbp5uIGrZ5t938w0VBVb1d6a7wmDRdPt27jO'),(32,'Jose Luis','Perez','Gonzalez','2020-01-01',2,'648745204','Calle Rosaleda 2 3D','Leon',24007,'joseluis@gmail.com','ES-LE','asdf','$2a$10$45YErD3vjD2K4ccsVyaqt.NOB34r9dnVuueUwrApcij7RY75e3pSi');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-11 18:59:11
