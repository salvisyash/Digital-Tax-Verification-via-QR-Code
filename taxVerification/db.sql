/*
SQLyog Community Edition- MySQL GUI v7.01 
MySQL - 5.0.27-community-nt : Database - tax-verification
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/`tax-verification` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `tax-verification`;

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL auto_increment,
  `email` varchar(255) default NULL,
  `fname` varchar(255) default NULL,
  `mobile` varchar(255) default NULL,
  `password` varchar(255) default NULL,
  `username` varchar(255) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `user` */

insert  into `user`(`id`,`email`,`fname`,`mobile`,`password`,`username`) values (1,'yashsalvi1999@gmail.com','Yash Salvi','9930090883','yash','yashssalvi'),(2,'roshanmundekar@gmail.com','Roshan mundekar','5485965854','roshan','roshanmund'),(3,'yashsalvi1999@gmail.com','Amol Nerlekar','6589564585','amol','amolnerlekar'),(4,'gaurijaygond@gmail.com','Gauri jaygond','9854587586','gaurijaygond','gaurijaygond');

/*Table structure for table `usertaxdata` */

DROP TABLE IF EXISTS `usertaxdata`;

CREATE TABLE `usertaxdata` (
  `id` bigint(20) NOT NULL auto_increment,
  `file` varchar(255) default NULL,
  `accnumber` varchar(255) default NULL,
  `address` varchar(255) default NULL,
  `credits` varchar(255) default NULL,
  `dob` varchar(255) default NULL,
  `edate` varchar(255) default NULL,
  `fillingstatus` varchar(255) default NULL,
  `fname` varchar(255) default NULL,
  `income` varchar(255) default NULL,
  `sdate` varchar(255) default NULL,
  `taxno` varchar(255) default NULL,
  `username` varchar(255) default NULL,
  `transactionid` varchar(255) default NULL,
  `status` varchar(255) default NULL,
  `qrpath` varchar(255) default NULL,
  `taxamount` varchar(255) default NULL,
  `duedate` varchar(255) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `usertaxdata` */

insert  into `usertaxdata`(`id`,`file`,`accnumber`,`address`,`credits`,`dob`,`edate`,`fillingstatus`,`fname`,`income`,`sdate`,`taxno`,`username`,`transactionid`,`status`,`qrpath`,`taxamount`,`duedate`) values (1,'FormSign/Admin Home Page.jpg','965854854856','vedika soc sagar nagar vikhroli park site','Income Tax','2024-03-20','2024-03-29','Single','Yash Salvi','460000','2024-03-04','5896589584','yashssalvi','tok_1Oub8BSDM2aTW7qpT5JHO1Sm','Verify','QR/EHz4ZH89bo.png','32200','2024-03-23'),(2,'FormSign/WhatsApp Image 2023-06-30 at 10.33.52.jpeg','859659685965','vikhroli park site','Property','2024-02-28','2024-03-30','Married Filing Jointly','Roshan mundekar','340000','2024-03-12','3244234234','roshanmund','None','None','None','0','None');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
