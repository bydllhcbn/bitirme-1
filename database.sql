-- Server version: 10.3.16-MariaDB

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ilan`
--

-- --------------------------------------------------------

--
-- Table structure for table `ads`
--

CREATE TABLE `ads` (
  `id` int(11) NOT NULL,
  `board_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `subtitle` varchar(255) NOT NULL DEFAULT '',
  `price` float NOT NULL,
  `location` varchar(255) NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ads`
--

INSERT INTO `ads` (`id`, `board_id`, `title`, `subtitle`, `price`, `location`, `created_at`) VALUES
(10, 1, 'Fiat Linea 1.3', 'TEST', 68750, 'MALATYA', '2020-05-25 22:31:17'),
(17, 1, 'Satılık Daire ', 'DENİZ MANZARALI -KAPALI ISITMALI', 295, 'VAN / TUŞBA', '2020-05-27 14:10:36'),
(19, 2, 'OPEL CORSA', '2013 OPEL CORSA 1.4 TWİNPORT', 102900, 'İSTANBUL', '2020-05-31 12:02:36'),
(20, 3, 'Renoult Clio 1.5', 'DOĞAN OTOMOTİV Clio 1.2 Icon 2013 Model', 72250, 'BURSA', '2020-06-04 10:05:15'),
(25, 1, 'Land Rover ', '217BİNDE HİÇ OYNANMAMIŞ', 119000, 'İzmir', '2020-07-08 22:14:05'),
(26, 1, 'Yamaha Motor', 'SAHİBİNDEN 150 KM\'DE 2019 MODEL', 82500, 'Ankara', '2020-07-08 22:16:00'),
(27, 1, 'Mercedes - Benz ', '2017 GLC 250D AMG BAYİ 15.KM-ÇİFT HAFIZA', 795000, 'Trabzon', '2020-07-08 22:17:58'),
(28, 1, 'Bodrumda Satılık Villa', 'Yalıçiftlik (Kızılağaç) Ormanla iç içe.', 2850000, 'Muğla', '2020-07-08 22:20:32'),
(29, 1, ' SEAT İBİZA', 'DİZEL OTOMOTİK HATASIZ BOYASIZ', 125500, 'İstanbul', '2020-07-08 22:22:44'),
(30, 1, 'Renault Megane ', 'SAHiBİNDEN Mavi BONCUK', 48500, 'İstanbul ', '2020-07-08 22:25:46'),
(31, 1, 'Chevrolet Spark ', 'Tertemiz Chevrolet Spark', 53250, 'Bursa', '2020-07-08 22:28:03'),
(32, 1, '2+1 daire üst kat', 'ortak havuzun hemen yanında', 385000, 'Muğla', '2020-07-08 22:29:31');

-- --------------------------------------------------------

--
-- Table structure for table `ad_images`
--

CREATE TABLE `ad_images` (
  `id` int(11) UNSIGNED NOT NULL,
  `ad_id` int(11) UNSIGNED NOT NULL,
  `url` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ad_images`
--

INSERT INTO `ad_images` (`id`, `ad_id`, `url`, `created_at`) VALUES
(8, 7, 'test', '2020-05-24 17:46:13'),
(9, 7, 'test2', '2020-05-24 17:46:13'),
(10, 8, 'https://s.sinavla.com/sql.php?db=tercihdonemi&table=api_solved_questions&sql_query=SELE', '2020-05-24 17:47:21'),
(11, 8, 'https://mdbootstrap.com/docs/jquery/forms/inputs/', '2020-05-24 17:47:21'),
(24, 5, 'test', '2020-05-24 18:35:34'),
(25, 5, 'test2\r', '2020-05-24 18:35:34'),
(26, 5, 'aaa\r', '2020-05-24 18:35:34'),
(27, 5, '\r', '2020-05-24 18:35:34'),
(28, 5, '\r', '2020-05-24 18:35:34'),
(29, 5, '', '2020-05-24 18:35:34'),
(30, 6, 'test', '2020-05-25 19:09:13'),
(31, 6, 'test2\r', '2020-05-25 19:09:13'),
(32, 6, '', '2020-05-25 19:09:13'),
(237, 20, 'https://arbstorage.mncdn.com/ilanfotograflari/2020/05/17/14427793/e714baad-beae-410a-ae4a-68de71ccd510_image_for_silan_14427793_580x435.jpg', '2020-06-04 10:05:15'),
(241, 1, '1', '2020-07-06 19:39:12'),
(257, 19, 'https://i0.shbdn.com/photos/02/20/65/x5_8370220656n2.jpg', '2020-07-06 19:53:03'),
(258, 19, 'https://i0.shbdn.com/photos/02/20/65/x5_8370220650mc.jpg', '2020-07-06 19:53:03'),
(259, 19, 'https://i0.shbdn.com/photos/02/20/65/x5_837022065utx.jpg', '2020-07-06 19:53:03'),
(268, 17, 'https://i0.shbdn.com/photos/43/84/27/x5_838438427iav.jpg', '2020-07-07 09:06:26'),
(269, 17, 'https://i0.shbdn.com/photos/43/84/27/x5_8384384277sf.jpg', '2020-07-07 09:06:26'),
(270, 17, 'https://i0.shbdn.com/photos/43/84/27/x5_8384384277sf.jpg', '2020-07-07 09:06:26'),
(277, 25, 'https://i0.shbdn.com/photos/08/94/13/x5_8380894139oh.jpg', '2020-07-08 22:14:05'),
(278, 25, 'https://i0.shbdn.com/photos/08/94/13/x5_838089413o5x.jpg', '2020-07-08 22:14:05'),
(279, 25, 'https://i0.shbdn.com/photos/08/94/13/x5_838089413ksj.jpg', '2020-07-08 22:14:05'),
(280, 26, 'https://i0.shbdn.com/photos/15/44/81/x5_797154481o0u.jpg', '2020-07-08 22:16:00'),
(281, 27, 'https://i0.shbdn.com/photos/11/60/83/x5_8391160832bx.jpg', '2020-07-08 22:17:58'),
(282, 27, 'https://i0.shbdn.com/photos/11/60/83/x5_839116083mpf.jpg', '2020-07-08 22:17:58'),
(283, 28, 'https://i0.shbdn.com/photos/28/91/59/x5_656289159s4k.jpg', '2020-07-08 22:20:32'),
(284, 28, 'https://i0.shbdn.com/photos/28/91/59/x5_656289159hom.jpg', '2020-07-08 22:20:32'),
(286, 29, 'https://i0.shbdn.com/photos/37/10/02/x5_837371002o7b.jpg', '2020-07-08 22:23:11'),
(289, 30, 'https://i0.shbdn.com/photos/36/79/17/x5_839367917xkd.jpg', '2020-07-08 22:26:05'),
(290, 30, 'https://i0.shbdn.com/photos/36/79/17/x5_839367917v26.jpg', '2020-07-08 22:26:05'),
(291, 31, 'https://i0.shbdn.com/photos/24/87/72/x5_839248772p2j.jpg', '2020-07-08 22:28:03'),
(292, 31, 'https://i0.shbdn.com/photos/24/87/72/x5_839248772l8h.jpg', '2020-07-08 22:28:03'),
(295, 32, 'https://i0.shbdn.com/photos/02/83/54/x5_839028354uhl.jpg', '2020-07-08 22:29:46'),
(296, 32, 'https://i0.shbdn.com/photos/02/83/54/x5_83902835413r.jpg', '2020-07-08 22:29:46'),
(297, 10, 'https://i0.shbdn.com/photos/64/62/45/x5_837646245tep.jpg', '2020-07-10 12:46:24'),
(298, 10, 'https://i0.shbdn.com/photos/64/62/45/x5_8376462453jb.jpg', '2020-07-10 12:46:24'),
(299, 10, 'https://i0.shbdn.com/photos/64/62/45/x5_8376462450nz.jpg', '2020-07-10 12:46:24');

-- --------------------------------------------------------

--
-- Table structure for table `ad_info`
--

CREATE TABLE `ad_info` (
  `ad_id` int(11) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ad_info`
--

INSERT INTO `ad_info` (`ad_id`, `name`, `content`) VALUES
(19, 'KM', '75.000'),
(19, 'Model', '1.4 Twinport Active '),
(19, 'Vites', 'Otomatik'),
(19, 'Yakıt', 'Benzin'),
(19, 'Yıl', '2013'),
(17, 'Oda Sayısı', '2+1'),
(17, 'Bulunduğu Kat', '4'),
(17, 'Isıtma', 'Doğalgaz (Kombi)'),
(25, 'Model', '2.5 TD5 '),
(25, 'KM', '217000'),
(25, 'Vites', 'Otomatik'),
(25, 'Yakıt', 'Dizel'),
(25, 'Yıl', '2003'),
(26, 'Tipi', 'Chopper / Cruiser'),
(26, 'Vites', 'Manuel'),
(26, 'Km', '150'),
(26, 'Yıl', '2019'),
(27, 'Model', '250 d AMG '),
(27, 'KM', '15000'),
(27, 'Vites', 'Yarı Otomatik'),
(27, 'Yakıt', 'Dizel'),
(27, 'Yıl', '2017'),
(28, 'm² (Brüt)', '340'),
(28, 'Kat Sayısı', '2'),
(28, 'Oda Sayısı', '5+1'),
(29, 'Vites', 'Yarı Otomatik'),
(29, 'KM', '122000'),
(29, 'Model', '1.4 TDI Style '),
(29, 'Yakıt', 'Dizel'),
(29, 'Yıl', '2016'),
(30, 'Vites', 'Manuel'),
(30, 'KM', '193000'),
(30, 'Model', '1.4 Authentique '),
(30, 'Yakıt', 'Benzin & LPG'),
(30, 'Yıl', '2005'),
(31, 'Model', '1.2 LS '),
(31, 'KM', '175000'),
(31, 'Vites', 'Manuel'),
(31, 'Yakıt', 'Benzin & LPG'),
(31, 'Yıl', '2010'),
(32, 'Bulunduğu Kat', 'Kot 2'),
(32, 'Kat Sayısı', '2'),
(32, 'm² (Brüt)', '75'),
(32, 'Oda Sayısı', '2+1'),
(10, 'Model', '1.3 Multijet Active Plus '),
(10, 'Yıl', '2015'),
(10, 'Yakıt', 'Dizel'),
(10, 'Vites', 'Manuel'),
(10, 'KM', '186000');

-- --------------------------------------------------------

--
-- Table structure for table `boards`
--

CREATE TABLE `boards` (
  `id` int(11) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `boards`
--

INSERT INTO `boards` (`id`, `title`) VALUES
(1, 'İlan Test'),
(2, 'İlan Tahtası'),
(3, 'qetqet');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ads`
--
ALTER TABLE `ads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ad_images`
--
ALTER TABLE `ad_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `board` (`ad_id`);

--
-- Indexes for table `boards`
--
ALTER TABLE `boards`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ads`
--
ALTER TABLE `ads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `ad_images`
--
ALTER TABLE `ad_images`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=300;

--
-- AUTO_INCREMENT for table `boards`
--
ALTER TABLE `boards`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
