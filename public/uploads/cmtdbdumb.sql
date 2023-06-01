-- MariaDB dump 10.19  Distrib 10.6.11-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: cmtdb
-- ------------------------------------------------------
-- Server version	10.6.11-MariaDB-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `CONFERENCE`
--

DROP TABLE IF EXISTS `CONFERENCE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CONFERENCE` (
  `CONF_ID` int(11) NOT NULL AUTO_INCREMENT,
  `CONF_NAME` varchar(50) DEFAULT NULL,
  `CONF_MODE` tinyint(1) DEFAULT NULL,
  `CONF_ABST_DDAY` date DEFAULT NULL,
  `CONF_PAPER_DDAY` date DEFAULT NULL,
  `CONF_KWORDS` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`CONF_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CONFERENCE`
--

LOCK TABLES `CONFERENCE` WRITE;
/*!40000 ALTER TABLE `CONFERENCE` DISABLE KEYS */;
INSERT INTO `CONFERENCE` VALUES (20,'conference one',1,'2021-05-03','2028-01-15',NULL),(21,'conference two',0,'2023-05-07','2028-01-01',NULL),(22,'conference three',1,NULL,NULL,NULL),(23,'conference FOUR',1,'2021-08-20','2024-01-15',NULL),(24,'conference FIVE',0,NULL,NULL,NULL),(25,'my conference',0,NULL,NULL,NULL),(26,'conf example',1,NULL,NULL,NULL),(27,'conf example',1,NULL,NULL,NULL),(28,'conf example',0,'2023-06-15',NULL,NULL);
/*!40000 ALTER TABLE `CONFERENCE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CONF_ROLE`
--

DROP TABLE IF EXISTS `CONF_ROLE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CONF_ROLE` (
  `CONF_ID` int(11) NOT NULL,
  `USER_ID` int(11) NOT NULL,
  `ROLE` varchar(10) NOT NULL,
  PRIMARY KEY (`CONF_ID`,`USER_ID`,`ROLE`),
  KEY `USER_ID` (`USER_ID`),
  CONSTRAINT `CONF_ROLE_ibfk_1` FOREIGN KEY (`CONF_ID`) REFERENCES `CONFERENCE` (`CONF_ID`),
  CONSTRAINT `CONF_ROLE_ibfk_2` FOREIGN KEY (`USER_ID`) REFERENCES `USER` (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CONF_ROLE`
--

LOCK TABLES `CONF_ROLE` WRITE;
/*!40000 ALTER TABLE `CONF_ROLE` DISABLE KEYS */;
INSERT INTO `CONF_ROLE` VALUES (20,10,'organiser'),(21,10,'organiser'),(21,17,'reviewer'),(21,19,'areachair'),(22,20,'organiser'),(23,10,'areachair'),(23,16,'organiser'),(23,17,'organiser'),(23,18,'reviewer'),(23,19,'reviewer'),(23,20,'organiser'),(23,21,'organiser'),(24,17,'organiser'),(24,19,'reviewer'),(24,20,'author'),(25,10,'organiser'),(25,16,'areachair'),(26,17,'organiser'),(26,19,'areachair'),(27,17,'organiser'),(27,18,'organiser'),(27,19,'areachair'),(28,10,'organiser'),(28,16,'areachair'),(28,17,'organiser'),(28,17,'reviewer'),(28,18,'organiser'),(28,19,'areachair');
/*!40000 ALTER TABLE `CONF_ROLE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RESOURCES`
--

DROP TABLE IF EXISTS `RESOURCES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `RESOURCES` (
  `RES_ID` int(11) NOT NULL AUTO_INCREMENT,
  `RES_RANK` varchar(20) DEFAULT NULL,
  `RES_TYPE` varchar(64) DEFAULT NULL,
  `RES_PATH` varchar(128) DEFAULT NULL,
  `SUB_ID` int(11) NOT NULL,
  PRIMARY KEY (`RES_ID`),
  KEY `SUB_ID` (`SUB_ID`),
  CONSTRAINT `RESOURCES_ibfk_1` FOREIGN KEY (`SUB_ID`) REFERENCES `SUBMISSION` (`SUB_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RESOURCES`
--

LOCK TABLES `RESOURCES` WRITE;
/*!40000 ALTER TABLE `RESOURCES` DISABLE KEYS */;
/*!40000 ALTER TABLE `RESOURCES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SUBMISSION`
--

DROP TABLE IF EXISTS `SUBMISSION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SUBMISSION` (
  `SUB_ID` int(11) NOT NULL AUTO_INCREMENT,
  `CONF_ID` int(11) NOT NULL,
  `USER_ID` int(11) NOT NULL,
  `ABSTRACT` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`SUB_ID`),
  KEY `CONF_ID` (`CONF_ID`),
  KEY `USER_ID` (`USER_ID`),
  CONSTRAINT `SUBMISSION_ibfk_1` FOREIGN KEY (`CONF_ID`) REFERENCES `CONFERENCE` (`CONF_ID`),
  CONSTRAINT `SUBMISSION_ibfk_2` FOREIGN KEY (`USER_ID`) REFERENCES `USER` (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SUBMISSION`
--

LOCK TABLES `SUBMISSION` WRITE;
/*!40000 ALTER TABLE `SUBMISSION` DISABLE KEYS */;
INSERT INTO `SUBMISSION` VALUES (22,23,10,'My 1st sub'),(29,23,19,'kmkmj'),(30,21,19,'knhhvvfytvjkniubbubn hkhbyhvhybv khbhbnjn'),(31,21,19,'ppppppppppppppppppppppppp'),(32,21,10,'nnnnnnnnnnn'),(33,23,10,'khdfbkvjbfbvfdsljnvlkefvkdfjlnbvjlrnlrjn;fkdjpdiwjfwenjgfbehbwvihfebgiyreiuq;bgkjfbvj;obn'),(34,20,10,'My submission'),(36,21,10,'This is an abstract'),(37,21,10,'This is an abstract'),(38,21,10,'This is an abstract'),(39,28,10,'this is my abstract');
/*!40000 ALTER TABLE `SUBMISSION` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USER`
--

DROP TABLE IF EXISTS `USER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USER` (
  `USER_ID` int(11) NOT NULL AUTO_INCREMENT,
  `USER_NAME` varchar(20) DEFAULT NULL,
  `USER_EMAIL` varchar(30) DEFAULT NULL,
  `USER_EXPERTISE` varchar(50) DEFAULT NULL,
  `USER_DOMAIN` varchar(50) DEFAULT NULL,
  `USER_PWORD` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USER`
--

LOCK TABLES `USER` WRITE;
/*!40000 ALTER TABLE `USER` DISABLE KEYS */;
INSERT INTO `USER` VALUES (10,'Muano','muano@gmail.com','Software','wits.ac.za','c1ebbee46d8c6128b95feb21c187c2ed2edde97994a9a2bac822f78b71789f29'),(16,'Makhokha','mak@gmail.com','Design','uct.ac.za','5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5'),(17,'Aphiwe','aphiwe@yahoo.com','Coding','wits.ac.za','91a3615e6ddac8817e12058547535bbee1522ac86eed659189d5150bdb58465'),(18,'Madambi','madambi@yahoo.com','Backend','wits.ac.za','fa53658163bc3a606b597ea42173ad153e8098d4dcd13f95f68d1cc9496fa60'),(19,'Sakhe','sakhe@outlook.com','Programmer','up.ac.za','bf4707099438d931f18e7d642f112dab6ea2d042d9b0b62c52713bc51bbd47f4'),(20,'Zwavhudi','zwavhudi@outlook.com','Programmer','up.ac.za','341f0b35ef10df38e4ded07551f658f7ed9fe329a27d0a767e03411890cdcd13'),(21,'userOne','userone@gmail.com','useroneExpertise','userDom','a041b9462caa4a31bac3567e0b6e6fd9100787db2ab433d96f6d178cabfce90');
/*!40000 ALTER TABLE `USER` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-07 13:38:51
