const events = [
  {
    id: "evt_2XWA16C4CB712XWA36C4CB7W2X",
    sport: "Football",
    league: "Ligue des champions",
    title: "Manchester City vs. Real Madrid",
    date: "1 Juin 2026",
    dateISO: "2026-06-01",
    location: "Londres",
    status: "Passe",
    communityScore: 9.6,
    reviews: 1240,
    result: "2 - 1",
    image: "images/events/uefa_champions_league_final_01062024.jpg",
  },
  {
    id: "evt_VH688P4QC0JKVH686P4QC0HQVH",
    sport: "Basketball",
    league: "Playoffs NBA",
    title: "Los Angeles Lakers vs. Boston Celtics",
    date: "21 Mai 2026",
    dateISO: "2026-05-21",
    location: "Los Angeles",
    status: "Passe",
    communityScore: 9.2,
    reviews: 980,
    result: "4 - 2",
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_4XSQZKBS4RDR4XSR1KBS4REM4X",
    sport: "Tennis",
    league: "Roland-Garros",
    title: "Finale messieurs",
    date: "7 Juin 2026",
    dateISO: "2026-06-07",
    location: "Paris",
    status: "",
    communityScore: 8.4,
    reviews: 560,
    image: "images/events/wimbledon_mens_final_14072024.jpg",
  },
  {
    id: "evt_P8FP3D10YMJCP8FP5D10YMK7P8",
    sport: "Sport auto",
    league: "Formule 1",
    title: "Monaco Grand Prix",
    date: "25 Mai 2026",
    dateISO: "2026-05-25",
    location: "Monte Carlo",
    status: "Passe",
    communityScore: 8.2,
    reviews: 430,
    result: "Vainqueur: Verstappen",
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_8QNPM1627RQF8QNPJ1627RPM8Q",
    sport: "Football",
    league: "Premier League",
    title: "Arsenal vs. Liverpool",
    date: "22 Fev 2026",
    dateISO: "2026-02-22",
    location: "Londres",
    status: "",
    communityScore: 8.8,
    reviews: 720,
    image: "images/events/world_cup_final_qatar_18122022.jpg",
  },
  {
    id: "evt_7CY3Q2W40JDW7CY3S2W40JEQ7C",
    sport: "Football",
    league: "Ligue 1",
    title: "PSG vs. Marseille",
    date: "3 Jan 2026",
    dateISO: "2026-01-03",
    location: "Paris",
    status: "Passe",
    communityScore: 9.2,
    reviews: 980,
    result: "2 - 1",
    image: "images/events/world_cup_final_qatar_18122022.jpg",
  },
  {
    id: "evt_KC99T85TMTS1KC99R85TMTR6KC",
    sport: "Football",
    league: "Ligue 1",
    title: "Lyon vs. Monaco",
    date: "5 Jan 2026",
    dateISO: "2026-01-05",
    location: "Lyon",
    status: "Passe",
    communityScore: 8.2,
    reviews: 640,
    result: "1 - 1",
    image: "images/events/world_cup_final_russia_15072018.jpg",
  },
  {
    id: "evt_1RSV13C470791RSTZ3C4706E1R",
    sport: "Football",
    league: "Premier League",
    title: "Liverpool vs. Chelsea",
    date: "7 Jan 2026",
    dateISO: "2026-01-07",
    location: "Liverpool",
    status: "Passe",
    communityScore: 8.6,
    reviews: 710,
    result: "3 - 2",
    image: "images/events/uefa_champions_league_final_01062024.jpg",
  },
  {
    id: "evt_TGNXVAR7Y8AETGNXSAR7Y89KTG",
    sport: "Football",
    league: "Premier League",
    title: "Manchester City vs. Arsenal",
    date: "8 Jan 2026",
    dateISO: "2026-01-08",
    location: "Manchester",
    status: "Passe",
    communityScore: 9,
    reviews: 830,
    result: "2 - 2",
    image: "images/events/world_cup_final_qatar_18122022.jpg",
  },
  {
    id: "evt_7HMMM3WBF9WE7HMMP3WBF9XA7H",
    sport: "Football",
    league: "La Liga",
    title: "FC Barcelona vs. Atletico Madrid",
    date: "10 Jan 2026",
    dateISO: "2026-01-10",
    location: "Barcelone",
    status: "Passe",
    communityScore: 8.8,
    reviews: 760,
    result: "1 - 0",
    image: "images/events/world_cup_final_russia_15072018.jpg",
  },
  {
    id: "evt_T6KH5M27VA2TT6KH7M27VA3NT6",
    sport: "Football",
    league: "La Liga",
    title: "Real Madrid vs. Sevilla",
    date: "12 Jan 2026",
    dateISO: "2026-01-12",
    location: "Madrid",
    status: "Passe",
    communityScore: 8.4,
    reviews: 690,
    result: "2 - 0",
    image: "images/events/uefa_champions_league_final_01062024.jpg",
  },
  {
    id: "evt_FFF4H834S2XRFFF4K834S2YKFF",
    sport: "Football",
    league: "Serie A",
    title: "Juventus vs. Inter",
    date: "15 Jan 2026",
    dateISO: "2026-01-15",
    location: "Turin",
    status: "Passe",
    communityScore: 8.6,
    reviews: 720,
    result: "1 - 2",
    image: "images/events/world_cup_final_qatar_18122022.jpg",
  },
  {
    id: "evt_921K67TARQ00921K87TARQ0V92",
    sport: "Football",
    league: "Serie A",
    title: "Milan vs. Napoli",
    date: "18 Jan 2026",
    dateISO: "2026-01-18",
    location: "Milan",
    status: "Passe",
    communityScore: 8.2,
    reviews: 610,
    result: "2 - 2",
    image: "images/events/world_cup_final_russia_15072018.jpg",
  },
  {
    id: "evt_CABWJFT20MR1CABWMFT20MRWCA",
    sport: "Football",
    league: "Bundesliga",
    title: "Bayern Munich vs. Dortmund",
    date: "20 Jan 2026",
    dateISO: "2026-01-20",
    location: "Munich",
    status: "Passe",
    communityScore: 9.4,
    reviews: 990,
    result: "3 - 1",
    image: "images/events/uefa_champions_league_final_01062024.jpg",
  },
  {
    id: "evt_0DNPTTHJZ3PA0DNPWTHJZ3Q50D",
    sport: "Football",
    league: "Bundesliga",
    title: "RB Leipzig vs. Leverkusen",
    date: "22 Jan 2026",
    dateISO: "2026-01-22",
    location: "Leipzig",
    status: "Passe",
    communityScore: 8,
    reviews: 520,
    result: "1 - 0",
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_N77DQVEGTZC7N77DSVEGTZD2N7",
    sport: "Football",
    league: "Ligue 1",
    title: "PSG vs. Lille",
    date: "25 Jan 2026",
    dateISO: "2026-01-25",
    location: "Paris",
    status: "Passe",
    communityScore: 8.4,
    reviews: 640,
    result: "2 - 2",
    image: "images/events/world_cup_final_qatar_18122022.jpg",
  },
  {
    id: "evt_Q86RHGF5AQV3Q86RKGF5AQVYQ8",
    sport: "Football",
    league: "Liga Portugal",
    title: "Porto vs. Benfica",
    date: "27 Jan 2026",
    dateISO: "2026-01-27",
    location: "Porto",
    status: "Passe",
    communityScore: 8.6,
    reviews: 680,
    result: "1 - 1",
    image: "images/events/world_cup_final_russia_15072018.jpg",
  },
  {
    id: "evt_B6XHF0GMEZAFB6XHD0GMEZ9MB6",
    sport: "Football",
    league: "Liga Portugal",
    title: "Sporting vs. Braga",
    date: "28 Jan 2026",
    dateISO: "2026-01-28",
    location: "Lisbonne",
    status: "Passe",
    communityScore: 8,
    reviews: 480,
    result: "3 - 0",
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_ZCT5C8M82F7ZZCT5A8M82F74ZC",
    sport: "Football",
    league: "Eredivisie",
    title: "Ajax vs. PSV",
    date: "30 Jan 2026",
    dateISO: "2026-01-30",
    location: "Amsterdam",
    status: "Passe",
    communityScore: 8.8,
    reviews: 730,
    result: "2 - 1",
    image: "images/events/world_cup_final_qatar_18122022.jpg",
  },
  {
    id: "evt_2EK73ZGQN6VP2EK75ZGQN6WJ2E",
    sport: "Football",
    league: "Eredivisie",
    title: "Feyenoord vs. AZ",
    date: "1 Fev 2026",
    dateISO: "2026-02-01",
    location: "Rotterdam",
    status: "Passe",
    communityScore: 8,
    reviews: 510,
    result: "1 - 0",
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_8HCBVDH6HB308HCBSDH6HB258H",
    sport: "Football",
    league: "Liga Argentina",
    title: "Boca Juniors vs. River Plate",
    date: "2 Fev 2026",
    dateISO: "2026-02-02",
    location: "Buenos Aires",
    status: "Passe",
    communityScore: 9.2,
    reviews: 880,
    result: "2 - 2",
    image: "images/events/world_cup_final_russia_15072018.jpg",
  },
  {
    id: "evt_Q2W4Y39HESBVQ2W5039HESCPQ2",
    sport: "Football",
    league: "Super Lig",
    title: "Galatasaray vs. Fenerbahce",
    date: "3 Fev 2026",
    dateISO: "2026-02-03",
    location: "Istanbul",
    status: "Passe",
    communityScore: 8.6,
    reviews: 760,
    result: "1 - 1",
    image: "images/events/uefa_champions_league_final_01062024.jpg",
  },
  {
    id: "evt_H9E6FJJ31RGMH9E6HJJ31RHFH9",
    sport: "Football",
    league: "Premiership",
    title: "Celtic vs. Rangers",
    date: "4 Fev 2026",
    dateISO: "2026-02-04",
    location: "Glasgow",
    status: "Passe",
    communityScore: 9,
    reviews: 820,
    result: "2 - 1",
    image: "images/events/world_cup_final_qatar_18122022.jpg",
  },
  {
    id: "evt_QREZH000NGCEQREZF000NGBKQR",
    sport: "Football",
    league: "Liga Argentina",
    title: "Boca Juniors vs. Independiente",
    date: "5 Fev 2026",
    dateISO: "2026-02-05",
    location: "Buenos Aires",
    status: "Passe",
    communityScore: 7.8,
    reviews: 420,
    result: "1 - 0",
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_41WD5WN90AS241WD7WN90ASX41",
    sport: "Football",
    league: "Serie A",
    title: "AS Roma vs. Lazio",
    date: "6 Fev 2026",
    dateISO: "2026-02-06",
    location: "Rome",
    status: "Passe",
    communityScore: 8.8,
    reviews: 770,
    result: "2 - 1",
    image: "images/events/world_cup_final_russia_15072018.jpg",
  },
  {
    id: "evt_6F5FZVCZZHTY6F5G1VCZZHVS6F",
    sport: "Rugby",
    league: "Tournoi des Six Nations",
    title: "France vs. Ireland",
    date: "14 Fev 2026",
    dateISO: "2026-02-14",
    location: "Paris",
    status: "Passe",
    communityScore: 8.8,
    reviews: 520,
    result: "27 - 20",
    image: "images/events/six_nations_16032024.jpg",
  },
  {
    id: "evt_P9KN6C4YTAVWP9KN4C4YTAV1P9",
    sport: "Rugby",
    league: "Tournoi des Six Nations",
    title: "England vs. Scotland",
    date: "14 Fev 2026",
    dateISO: "2026-02-14",
    location: "Londres",
    status: "Passe",
    communityScore: 8.5,
    reviews: 480,
    result: "19 - 22",
    image: "images/events/samplerugby1.jpg",
  },
  {
    id: "evt_ZJVS48S3XDP2ZJVS28S3XDN6ZJ",
    sport: "Rugby",
    league: "Tournoi des Six Nations",
    title: "Wales vs. Italy",
    date: "15 Fev 2026",
    dateISO: "2026-02-15",
    location: "Cardiff",
    status: "Passe",
    communityScore: 7.8,
    reviews: 320,
    result: "26 - 17",
    image: "images/events/samplerubgy2.jpg",
  },
  {
    id: "evt_0QNQSAJJVFZZ0QNQQAJJVFZ40Q",
    sport: "Rugby",
    league: "Tournoi des Six Nations",
    title: "Ireland vs. Wales",
    date: "21 Fev 2026",
    dateISO: "2026-02-21",
    location: "Dublin",
    status: "Passe",
    communityScore: 8.1,
    reviews: 350,
    result: "28 - 14",
    image: "images/events/samplerugby1.jpg",
  },
  {
    id: "evt_6GJ4YP5KWC146GJ4WP5KWC096G",
    sport: "Rugby",
    league: "Tournoi des Six Nations",
    title: "Scotland vs. France",
    date: "21 Fev 2026",
    dateISO: "2026-02-21",
    location: "Edimbourg",
    status: "Passe",
    communityScore: 8.4,
    reviews: 410,
    result: "18 - 24",
    image: "images/events/six_nations_16032024.jpg",
  },
  {
    id: "evt_M7REQ6RM56T8M7RES6RM56V3M7",
    sport: "Rugby",
    league: "Tournoi des Six Nations",
    title: "Italy vs. England",
    date: "22 Fev 2026",
    dateISO: "2026-02-22",
    location: "Rome",
    status: "Passe",
    communityScore: 7.6,
    reviews: 290,
    result: "15 - 29",
    image: "images/events/samplerubgy2.jpg",
  },
  {
    id: "evt_QKEMF6X5K7T1QKEMH6X5K7TWQK",
    sport: "Rugby",
    league: "Tournoi des Six Nations",
    title: "Ireland vs. England",
    date: "28 Fev 2026",
    dateISO: "2026-02-28",
    location: "Dublin",
    status: "",
    communityScore: 8.7,
    reviews: 560,
    image: "images/events/samplerugby1.jpg",
  },
  {
    id: "evt_9Q7PP8NYVR0F9Q7PM8NYVQZM9Q",
    sport: "Rugby",
    league: "Tournoi des Six Nations",
    title: "Scotland vs. Italy",
    date: "28 Fev 2026",
    dateISO: "2026-02-28",
    location: "Edimbourg",
    status: "",
    communityScore: 7.7,
    reviews: 300,
    image: "images/events/samplerubgy2.jpg",
  },
  {
    id: "evt_TSKV2M1AWDVPTSKV0M1AWDTVTS",
    sport: "Rugby",
    league: "Tournoi des Six Nations",
    title: "France vs. Wales",
    date: "1 Mar 2026",
    dateISO: "2026-03-01",
    location: "Paris",
    status: "",
    communityScore: 8.2,
    reviews: 430,
    image: "images/events/six_nations_16032024.jpg",
  },
  {
    id: "evt_MPKWRK53QV1VMPKWTK53QV2PMP",
    sport: "Rugby",
    league: "Tournoi des Six Nations",
    title: "Wales vs. Scotland",
    date: "7 Mar 2026",
    dateISO: "2026-03-07",
    location: "Cardiff",
    status: "",
    communityScore: 8,
    reviews: 360,
    image: "images/events/samplerugby1.jpg",
  },
  {
    id: "evt_F0ST547ED532F0ST747ED53YF0",
    sport: "Rugby",
    league: "Tournoi des Six Nations",
    title: "England vs. France",
    date: "7 Mar 2026",
    dateISO: "2026-03-07",
    location: "Londres",
    status: "",
    communityScore: 8.9,
    reviews: 620,
    image: "images/events/six_nations_16032024.jpg",
  },
  {
    id: "evt_M767BAXHQ78EM767DAXHQ799M7",
    sport: "Rugby",
    league: "Tournoi des Six Nations",
    title: "Italy vs. Ireland",
    date: "8 Mar 2026",
    dateISO: "2026-03-08",
    location: "Rome",
    status: "",
    communityScore: 7.5,
    reviews: 270,
    image: "images/events/samplerubgy2.jpg",
  },
  {
    id: "evt_BDEXH8DCCJY4BDEXK8DCCJYZBD",
    sport: "Rugby",
    league: "Tournoi des Six Nations",
    title: "Italy vs. France",
    date: "14 Mar 2026",
    dateISO: "2026-03-14",
    location: "Rome",
    status: "",
    communityScore: 7.9,
    reviews: 310,
    image: "images/events/samplerugby1.jpg",
  },
  {
    id: "evt_B4BZXMYS0GDXB4BZVMYS0GD2B4",
    sport: "Rugby",
    league: "Tournoi des Six Nations",
    title: "Scotland vs. Ireland",
    date: "14 Mar 2026",
    dateISO: "2026-03-14",
    location: "Edimbourg",
    status: "",
    communityScore: 8.3,
    reviews: 390,
    image: "images/events/six_nations_16032024.jpg",
  },
  {
    id: "evt_5KCW1KEFJ0B05KCVZKEFJ0A55K",
    sport: "Rugby",
    league: "Tournoi des Six Nations",
    title: "Wales vs. England",
    date: "15 Mar 2026",
    dateISO: "2026-03-15",
    location: "Cardiff",
    status: "",
    communityScore: 8.4,
    reviews: 450,
    image: "images/events/samplerubgy2.jpg",
  },
  {
    id: "evt_EDD65VQ9E9N0EDD63VQ9E9M5ED",
    sport: "Basketball",
    league: "Finales WNBA",
    title: "Las Vegas Aces vs. New York Liberty",
    date: "30 Sep 2026",
    dateISO: "2026-09-30",
    location: "Las Vegas",
    status: "",
    communityScore: 9,
    reviews: 210,
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_99F2HMZY9WNE99F2KMZY9WP999",
    sport: "Cyclisme",
    league: "Tour de France",
    title: "Etape 18 - Alpes",
    date: "24 Juil 2026",
    dateISO: "2026-07-24",
    location: "Alpes",
    status: "",
    communityScore: 9.2,
    reviews: 410,
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_FV8J5N0W4TKYFV8J7N0W4TMTFV",
    sport: "Cyclisme",
    league: "Tour de France",
    title: "Etape 12 - Pyrenees",
    date: "18 Juil 2026",
    dateISO: "2026-07-18",
    location: "Pyrenees",
    status: "",
    communityScore: 8.8,
    reviews: 260,
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_V8G6SJSJ109BV8G6QJSJ108GV8",
    sport: "Cyclisme",
    league: "Tour de France",
    title: "Etape 20 - Contre-la-montre",
    date: "26 Juil 2026",
    dateISO: "2026-07-26",
    location: "Nice",
    status: "",
    communityScore: 8.6,
    reviews: 210,
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_PQ8AEN3PBCTYPQ8ACN3PBCT3PQ",
    sport: "Cyclisme",
    league: "UCI WorldTour",
    title: "Strade Bianche 2025",
    date: "8 Mar 2025",
    dateISO: "2025-03-08",
    location: "Siena",
    status: "Passe",
    communityScore: 8.3,
    reviews: 980,
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_GMFN1W2TYQMAGMFMZW2TYQKFGM",
    sport: "Cyclisme",
    league: "UCI WorldTour",
    title: "Milan-San Remo 2025",
    date: "22 Mar 2025",
    dateISO: "2025-03-22",
    location: "Sanremo",
    status: "Passe",
    communityScore: 9,
    reviews: 1420,
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_RFV1ZNQTT2EHRFV21NQTT2FCRF",
    sport: "Cyclisme",
    league: "UCI WorldTour",
    title: "Tour des Flandres 2025",
    date: "6 Avr 2025",
    dateISO: "2025-04-06",
    location: "Flandre",
    status: "Passe",
    communityScore: 9.1,
    reviews: 1650,
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_NMM7F1CJKH9ANMM7D1CJKH8FNM",
    sport: "Cyclisme",
    league: "UCI WorldTour",
    title: "Paris-Roubaix 2025",
    date: "13 Avr 2025",
    dateISO: "2025-04-13",
    location: "Roubaix",
    status: "Passe",
    communityScore: 9.3,
    reviews: 1900,
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_VTDMCAG67WJMVTDMEAG67WKGVT",
    sport: "Cyclisme",
    league: "UCI WorldTour",
    title: "Amstel Gold Race 2025",
    date: "20 Avr 2025",
    dateISO: "2025-04-20",
    location: "Limbourg",
    status: "Passe",
    communityScore: 8.4,
    reviews: 1050,
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_F4GTVY6NXADAF4GTSY6NXACFF4",
    sport: "Cyclisme",
    league: "UCI WorldTour",
    title: "La Fleche Wallonne 2025",
    date: "23 Avr 2025",
    dateISO: "2025-04-23",
    location: "Huy",
    status: "Passe",
    communityScore: 8.1,
    reviews: 920,
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_9MG0J575Q3KP9MG0M575Q3MH9M",
    sport: "Cyclisme",
    league: "UCI WorldTour",
    title: "Liege-Bastogne-Liege 2025",
    date: "27 Avr 2025",
    dateISO: "2025-04-27",
    location: "Liege",
    status: "Passe",
    communityScore: 8.8,
    reviews: 1280,
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_T9XT4TT60NWTT9XT2TT60NVZT9",
    sport: "Cyclisme",
    league: "UCI WorldTour",
    title: "Clasica San Sebastian 2025",
    date: "2 Aout 2025",
    dateISO: "2025-08-02",
    location: "San Sebastian",
    status: "Passe",
    communityScore: 8,
    reviews: 840,
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_8NH16RCQG9F88NH18RCQG9G38N",
    sport: "Cyclisme",
    league: "UCI WorldTour",
    title: "Il Lombardia 2025",
    date: "11 Oct 2025",
    dateISO: "2025-10-11",
    location: "Come",
    status: "Passe",
    communityScore: 8.7,
    reviews: 1190,
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_QMSY4N3T5R2KQMSY6N3T5R3EQM",
    sport: "Cyclisme",
    league: "UCI WorldTour",
    title: "Strade Bianche 2026",
    date: "7 Mar 2026",
    dateISO: "2026-03-07",
    location: "Siena",
    status: "",
    communityScore: 8.5,
    reviews: 1020,
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_HQZPQW301J3AHQZPSW301J45HQ",
    sport: "Cyclisme",
    league: "UCI WorldTour",
    title: "Milan-San Remo 2026",
    date: "21 Mar 2026",
    dateISO: "2026-03-21",
    location: "Sanremo",
    status: "",
    communityScore: 8.9,
    reviews: 1500,
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_QK4G9NQQ5E9SQK4G7NQQ5E8YQK",
    sport: "Cyclisme",
    league: "UCI WorldTour",
    title: "Tour des Flandres 2026",
    date: "5 Avr 2026",
    dateISO: "2026-04-05",
    location: "Flandre",
    status: "",
    communityScore: 9.1,
    reviews: 1680,
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_JF7GD1C4DTVZJF7GF1C4DTWTJF",
    sport: "Cyclisme",
    league: "UCI WorldTour",
    title: "Paris-Roubaix 2026",
    date: "12 Avr 2026",
    dateISO: "2026-04-12",
    location: "Roubaix",
    status: "",
    communityScore: 9.2,
    reviews: 1950,
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_Z6KKEAGNVNXFZ6KKCAGNVNWMZ6",
    sport: "Cyclisme",
    league: "UCI WorldTour",
    title: "Amstel Gold Race 2026",
    date: "19 Avr 2026",
    dateISO: "2026-04-19",
    location: "Limbourg",
    status: "",
    communityScore: 8.4,
    reviews: 1100,
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_BZ43SY67QKZZBZ43VY67QM0VBZ",
    sport: "Cyclisme",
    league: "UCI WorldTour",
    title: "La Fleche Wallonne 2026",
    date: "22 Avr 2026",
    dateISO: "2026-04-22",
    location: "Huy",
    status: "",
    communityScore: 8.2,
    reviews: 980,
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_8G4WW570EJ1S8G4WT570EJ0Y8G",
    sport: "Cyclisme",
    league: "UCI WorldTour",
    title: "Liege-Bastogne-Liege 2026",
    date: "26 Avr 2026",
    dateISO: "2026-04-26",
    location: "Liege",
    status: "",
    communityScore: 8.8,
    reviews: 1320,
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_VDDVTTTB3GBTVDDVWTTB3GCNVD",
    sport: "Cyclisme",
    league: "UCI WorldTour",
    title: "Clasica San Sebastian 2026",
    date: "1 Aout 2026",
    dateISO: "2026-08-01",
    location: "San Sebastian",
    status: "",
    communityScore: 8.1,
    reviews: 880,
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_BTXG8RD5NWFVBTXG6RD5NWF0BT",
    sport: "Cyclisme",
    league: "UCI WorldTour",
    title: "Il Lombardia 2026",
    date: "10 Oct 2026",
    dateISO: "2026-10-10",
    location: "Come",
    status: "",
    communityScore: 8.7,
    reviews: 1220,
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_38JM576PBC5X38JM376PBC5138",
    sport: "MMA",
    league: "UFC 300",
    title: "Carte principale",
    date: "12 Avr 2026",
    dateISO: "2026-04-12",
    location: "Las Vegas",
    status: "Passe",
    communityScore: 8,
    reviews: 870,
    result: "Main event passe",
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_PH1C32ZAEK9TPH1C12ZAEK8ZPH",
    sport: "Football",
    league: "Ligue des champions",
    title: "Finale UEFA 2024",
    date: "1 Juin 2024",
    dateISO: "2024-06-01",
    location: "Londres",
    status: "Passe",
    communityScore: 9.4,
    reviews: 1950,
    result: "1 - 0",
    image: "images/events/uefa_champions_league_final_01062024.jpg",
  },
  {
    id: "evt_61SP4437XDBZ61SP2437XDB461",
    sport: "Football",
    league: "Coupe du monde",
    title: "Finale Coupe du monde 2022",
    date: "18 Dec 2022",
    dateISO: "2022-12-18",
    location: "Lusail",
    status: "Passe",
    communityScore: 9.8,
    reviews: 3800,
    result: "3 - 3 (4-2 TAB)",
    image: "images/events/world_cup_final_qatar_18122022.jpg",
  },
  {
    id: "evt_YNX91GHP7HZJYNX93GHP7J0DYN",
    sport: "Football",
    league: "Coupe du monde",
    title: "Finale Coupe du monde 2018",
    date: "15 Juil 2018",
    dateISO: "2018-07-15",
    location: "Moscou",
    status: "Passe",
    communityScore: 9.4,
    reviews: 2500,
    result: "4 - 2",
    image: "images/events/world_cup_final_russia_15072018.jpg",
  },
  {
    id: "evt_MMDBDWFY73FMMMDBBWFY73ESMM",
    sport: "Football",
    league: "Coupe du monde",
    title: "Finale Coupe du monde 2014",
    date: "13 Juil 2014",
    dateISO: "2014-07-13",
    location: "Rio de Janeiro",
    status: "Passe",
    communityScore: 9.2,
    reviews: 2100,
    result: "1 - 0",
    image: "images/events/world_cup_final_brazil_13072014.jpg",
  },
  {
    id: "evt_MHCB04QT475QMHCB24QT476JMH",
    sport: "Football",
    league: "Copa America",
    title: "Finale Copa America 2024",
    date: "14 Juil 2024",
    dateISO: "2024-07-14",
    location: "Miami",
    status: "Passe",
    communityScore: 8.8,
    reviews: 1600,
    image: "images/events/copa_america_final_14072024.jpg",
  },
  {
    id: "evt_PYN4WCFYSGR3PYN4TCFYSGQ8PY",
    sport: "Football",
    league: "CAN",
    title: "Finale CAN 2024",
    date: "11 Fev 2024",
    dateISO: "2024-02-11",
    location: "Abidjan",
    status: "Passe",
    communityScore: 8.6,
    reviews: 1200,
    image: "images/events/afcon_final_11022024.jpg",
  },
  {
    id: "evt_ZWXVXGXN286NZWXVZGXN287GZW",
    sport: "Rugby",
    league: "Coupe du monde de rugby",
    title: "Finale Coupe du monde 2023",
    date: "28 Oct 2023",
    dateISO: "2023-10-28",
    location: "Paris",
    status: "Passe",
    communityScore: 9,
    reviews: 980,
    image: "images/events/rugby_world_cup_final_28102023.jpg",
  },
  {
    id: "evt_63Z5KSYR1HS763Z5HSYR1HRC63",
    sport: "Rugby",
    league: "Tournoi des Six Nations",
    title: "Super samedi 2024",
    date: "16 Mar 2024",
    dateISO: "2024-03-16",
    location: "Europe",
    status: "Passe",
    communityScore: 8.4,
    reviews: 620,
    image: "images/events/six_nations_16032024.jpg",
  },
  {
    id: "evt_E6VMQ5TVCT68E6VMS5TVCT73E6",
    sport: "Cricket",
    league: "T20 World Cup",
    title: "Finale T20 World Cup 2024",
    date: "29 Juin 2024",
    dateISO: "2024-06-29",
    location: "Barbade",
    status: "Passe",
    communityScore: 8.2,
    reviews: 540,
    image: "images/events/t20_world_cup_final_29062024.jpg",
  },
  {
    id: "evt_8ZS6A4ATFMV38ZS684ATFMT88Z",
    sport: "Tennis",
    league: "Wimbledon",
    title: "Finale messieurs 2024",
    date: "14 Juil 2024",
    dateISO: "2024-07-14",
    location: "Londres",
    status: "Passe",
    communityScore: 9.2,
    reviews: 1400,
    image: "images/events/wimbledon_mens_final_14072024.jpg",
  },
  {
    id: "evt_FRE66085WGKMFRE68085WGMFFR",
    sport: "Athlétisme",
    league: "Marathon de Berlin",
    title: "Marathon de Berlin 2023",
    date: "24 Sep 2023",
    dateISO: "2023-09-24",
    location: "Berlin",
    status: "Passe",
    communityScore: 8.6,
    reviews: 520,
    image: "images/events/berlin_marathon_24092023.jpg",
  },
  {
    id: "evt_HP7XPER2F1T2HP7XMER2F1S7HP",
    sport: "Athlétisme",
    league: "Jeux Olympiques",
    title: "Finale 100m 2024",
    date: "4 Aout 2024",
    dateISO: "2024-08-04",
    location: "Paris",
    status: "Passe",
    communityScore: 9.6,
    reviews: 1600,
    image: "images/events/olympics_100m_final_04082024.jpg",
  },
  {
    id: "evt_5W50JA8F58AA5W50GA8F589F5W",
    sport: "Multi-sport",
    league: "Jeux Olympiques",
    title: "Ceremonie d'ouverture 2024",
    date: "26 Juil 2024",
    dateISO: "2024-07-26",
    location: "Paris",
    status: "Passe",
    communityScore: 8.4,
    reviews: 1100,
    image: "images/events/olympics_opening_ceremony_26072024.jpg",
  },
  {
    id: "evt_3PEZFMACFEDB3PEZDMACFECF3P",
    sport: "Multi-sport",
    league: "Jeux Olympiques d'hiver",
    title: "Ceremonie d'ouverture 2022",
    date: "4 Fev 2022",
    dateISO: "2022-02-04",
    location: "Pekin",
    status: "Passe",
    communityScore: 8,
    reviews: 760,
    image: "images/events/winter_olympics_opening_04022022.jpg",
  },
  {
    id: "evt_DJADRY5W4PK9DJADTY5W4PM5DJ",
    sport: "Golf",
    league: "Ryder Cup",
    title: "Jour final 2023",
    date: "1 Oct 2023",
    dateISO: "2023-10-01",
    location: "Rome",
    status: "Passe",
    communityScore: 8.2,
    reviews: 420,
    image: "images/events/ryder_cup_final_day_01102023.jpg",
  },
  {
    id: "evt_7N0YCT50QY527N0YAT50QY477N",
    sport: "Golf",
    league: "Masters",
    title: "Finale Masters 2024",
    date: "14 Avr 2024",
    dateISO: "2024-04-14",
    location: "Augusta",
    status: "Passe",
    communityScore: 8.8,
    reviews: 680,
    image: "images/events/the_masters_final_round_14042024.jpg",
  },
  {
    id: "evt_JTHE7M9TB41YJTHE5M9TB413JT",
    sport: "Sport auto",
    league: "Formule 1",
    title: "Monaco Grand Prix 2024",
    date: "26 Mai 2024",
    dateISO: "2024-05-26",
    location: "Monte Carlo",
    status: "Passe",
    communityScore: 8.4,
    reviews: 980,
    image: "images/events/event-f1-monaco.svg",
  },
  {
    id: "evt_3854V2KN6RP43854X2KN6RPZ38",
    sport: "Basketball",
    league: "Playoffs NBA",
    title: "Finale de conference 2024",
    date: "30 Mai 2024",
    dateISO: "2024-05-30",
    location: "Etats-Unis",
    status: "Passe",
    communityScore: 8.6,
    reviews: 1120,
    image: "images/events/event-nba-playoffs.svg",
  },
  {
    id: "evt_XZNF6CTC2DD1XZNF8CTC2DDWXZ",
    sport: "Football",
    league: "Premier League",
    title: "Choc du top 4 2024",
    date: "10 Mar 2024",
    dateISO: "2024-03-10",
    location: "Londres",
    status: "Passe",
    communityScore: 8.2,
    reviews: 860,
    image: "images/events/event-premier-league.svg",
  },
  {
    id: "evt_4ZBW6B80M93X4ZBW4B80M9324Z",
    sport: "Tennis",
    league: "Roland-Garros",
    title: "Finale messieurs 2024",
    date: "9 Juin 2024",
    dateISO: "2024-06-09",
    location: "Paris",
    status: "Passe",
    communityScore: 9.4,
    reviews: 1480,
    image: "images/events/event-roland-garros.svg",
  },
  {
    id: "evt_K5XYV537VXJTK5XYX537VXKNK5",
    sport: "Football",
    league: "Ligue des champions",
    title: "Finale UEFA 2014",
    date: "24 Mai 2014",
    dateISO: "2014-05-24",
    location: "Lisbonne",
    status: "Passe",
    communityScore: 9.2,
    reviews: 2100,
    image: "images/events/event-ucl-final.svg",
  },
  {
    id: "evt_REJS8WGQF36TREJSAWGQF37NRE",
    sport: "Football",
    league: "Classique",
    title: "Derby historique",
    date: "15 Avr 2023",
    dateISO: "2023-04-15",
    location: "Europe",
    status: "Passe",
    communityScore: 8,
    reviews: 740,
    image: "images/events/samplefoot1.jpg",
  },
  {
    id: "evt_8DN7TR6F0JZZ8DN7RR6F0JZ38D",
    sport: "Rugby",
    league: "Test match",
    title: "Test match 2023",
    date: "19 Aout 2023",
    dateISO: "2023-08-19",
    location: "Europe",
    status: "Passe",
    communityScore: 8.4,
    reviews: 510,
    image: "images/events/samplerugby1.jpg",
  },
  {
    id: "evt_A8WV3SQD4YPEA8WV5SQD4YQ9A8",
    sport: "Rugby",
    league: "Match historique",
    title: "Classique rugby 2022",
    date: "12 Nov 2022",
    dateISO: "2022-11-12",
    location: "Europe",
    status: "Passe",
    communityScore: 8.2,
    reviews: 430,
    image: "images/events/samplerubgy2.jpg",
  },
  {
    id: "evt_4Z6S0ZV4SHB84Z6RYZV4SHAC4Z",
    sport: "Football",
    league: "Premier League",
    title: "Leeds United vs Nottingham Forest",
    date: "6 Fev 2026",
    dateISO: "2026-02-06",
    location: "Leeds",
    status: "Passe",
    communityScore: 8.4,
    reviews: 840,
    result: "Leeds 3-1 Nottingham Forest",
    image: "images/events/samplefoot1.jpg",
  },
  {
    id: "evt_NRQTQQ871G1RNRQTNQ871G0XNR",
    sport: "Football",
    league: "Supercopa Rei",
    title: "Flamengo vs Corinthians",
    date: "1 Fev 2026",
    dateISO: "2026-02-01",
    location: "Brasilia",
    status: "Passe",
    communityScore: 8.6,
    reviews: 1200,
    result: "Corinthians 2-0 Flamengo",
    image: "images/events/world_cup_final_russia_15072018.jpg",
  },
  {
    id: "evt_GTK793BPTEDSGTK773BPTECYGT",
    sport: "Cyclisme",
    league: "Volta à la Comunitat Valenciana",
    title: "Etape 1 - Segorbe > Torreblanca",
    date: "4 Fev 2026",
    dateISO: "2026-02-04",
    location: "Espagne",
    status: "Passe",
    communityScore: 8.2,
    reviews: 520,
    result: "Vainqueur: Biniam Girmay",
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_DN6G73B8MR0EDN6G93B8MR1ADN",
    sport: "Cyclisme",
    league: "Volta à la Comunitat Valenciana",
    title: "Etape 2 - Carlet > Alginet (CLM)",
    date: "5 Fev 2026",
    dateISO: "2026-02-05",
    location: "Espagne",
    status: "Passe",
    communityScore: 8,
    reviews: 480,
    result: "Vainqueur: Remco Evenepoel",
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_KBXT96B0KXPNKBXT76B0KXNSKB",
    sport: "Boxe",
    league: "Super fight",
    title: "Mayweather vs Pacquiao",
    date: "2 Mai 2015",
    dateISO: "2015-05-02",
    location: "Las Vegas",
    status: "Passe",
    communityScore: 8,
    reviews: 1400,
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_GQS1JYKF9B8HGQS1MYKF9B9CGQ",
    sport: "Tennis",
    league: "ATP Finals",
    title: "Finale ATP Finals 2023",
    date: "19 Nov 2023",
    dateISO: "2023-11-19",
    location: "Turin",
    status: "Passe",
    communityScore: 8.6,
    reviews: 880,
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_RCXRKTE1ZD5MRCXRHTE1ZD4SRC",
    sport: "Basketball",
    league: "NBA",
    title: "Kobe 81 points",
    date: "22 Jan 2006",
    dateISO: "2006-01-22",
    location: "Los Angeles",
    status: "Passe",
    communityScore: 9.8,
    reviews: 2600,
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_PNGZE4BSGTWPPNGZC4BSGTVVPN",
    sport: "Football",
    league: "Liga",
    title: "Match reve des jeunes",
    date: "21 Avr 2024",
    dateISO: "2024-04-21",
    location: "Barcelone",
    status: "Passe",
    communityScore: 8.4,
    reviews: 620,
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_NKZN0BGCCKPXNKZN2BGCCKQRNK",
    sport: "Basketball",
    league: "Finales NBA",
    title: "Finale NBA 1998 - Game 6",
    date: "14 Juin 1998",
    dateISO: "1998-06-14",
    location: "Salt Lake City",
    status: "Passe",
    communityScore: 9.8,
    reviews: 3100,
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_1J72EK830Y6G1J72CK830Y5N1J",
    sport: "Natation",
    league: "Jeux Olympiques",
    title: "Finale 100m papillon 2008",
    date: "16 Aout 2008",
    dateISO: "2008-08-16",
    location: "Pekin",
    status: "Passe",
    communityScore: 9.4,
    reviews: 1500,
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_C2BNA4S1XTT4C2BNC4S1XTTZC2",
    sport: "Sport auto",
    league: "Formule 1",
    title: "Grand Prix du Japon 2004",
    date: "10 Oct 2004",
    dateISO: "2004-10-10",
    location: "Suzuka",
    status: "Passe",
    communityScore: 8.8,
    reviews: 920,
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_07GCYASQ1FC307GD0ASQ1FCY07",
    sport: "Boxe",
    league: "Heavyweight",
    title: "Tyson vs Holyfield II",
    date: "28 Juin 1997",
    dateISO: "1997-06-28",
    location: "Las Vegas",
    status: "Passe",
    communityScore: 8.2,
    reviews: 1800,
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_TNNNYRQFVKSVTNNNWRQFVKS0TN",
    sport: "Basketball",
    league: "NBA",
    title: "Finales NBA 2023",
    date: "12 Juin 2023",
    dateISO: "2023-06-12",
    location: "Denver",
    status: "Passe",
    communityScore: 9.2,
    reviews: 1900,
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_TPV6NW8D17E4TPV6KW8D17D9TP",
    sport: "Tennis",
    league: "Wimbledon",
    title: "Finale Wimbledon 2017",
    date: "16 Juil 2017",
    dateISO: "2017-07-16",
    location: "Londres",
    status: "Passe",
    communityScore: 9.6,
    reviews: 2100,
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_67VVB4KZT9VZ67VVD4KZT9WT67",
    sport: "Tennis",
    league: "US Open",
    title: "Finale US Open 2014",
    date: "7 Sep 2014",
    dateISO: "2014-09-07",
    location: "New York",
    status: "Passe",
    communityScore: 9,
    reviews: 1500,
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_1J2862J9H2BJ1J2842J9H2AP1J",
    sport: "Basketball",
    league: "Finales NBA",
    title: "Finale NBA 2000",
    date: "19 Juin 2000",
    dateISO: "2000-06-19",
    location: "Los Angeles",
    status: "Passe",
    communityScore: 9.2,
    reviews: 1700,
    image: "images/events/samplegeneric.jpeg",
  },
  {
    id: "evt_397V35GZ417T397V55GZ418P39",
    sport: "Baseball",
    league: "MLB",
    title: "Saison 2023 d'exception",
    date: "1 Oct 2023",
    dateISO: "2023-10-01",
    location: "Los Angeles",
    status: "Passe",
    communityScore: 9,
    reviews: 980,
    image: "images/events/samplegeneric.jpeg",
  },
];

function getEventYear(event) {
  if (event.dateISO && /^\d{4}/.test(event.dateISO)) {
    return Number(event.dateISO.slice(0, 4));
  }
  const match = (event.date || "").match(/(19|20)\d{2}/);
  return match ? Number(match[0]) : null;
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const leagueRenameAliases = {
  // Alias support to keep historical names under one canonical league ID.
  "dauphine-libere": "tour-d-auvergne-ra",
};

function resolveLeagueCanonicalKey(leagueName) {
  const rawKey = slugify(leagueName || "");
  return leagueRenameAliases[rawKey] || rawKey;
}

const leagueCatalog = new Map();
const leagueSeasonCatalog = new Map();

events.forEach((event) => {
  const year = getEventYear(event);
  const rawLeagueName = String(event.league || "").trim();
  const canonicalLeagueKey = resolveLeagueCanonicalKey(rawLeagueName);
  const leagueId = canonicalLeagueKey ? `league-${canonicalLeagueKey}` : null;
  const leagueSeasonId = leagueId ? `${leagueId}-${year || "na"}` : null;

  if (leagueId && !leagueCatalog.has(leagueId)) {
    leagueCatalog.set(leagueId, {
      id: leagueId,
      key: canonicalLeagueKey,
      nature: "League",
      title: rawLeagueName || "Competition",
      sport: event.sport,
      eventIds: [],
      _seasonIds: new Set(),
      _nameHistoryMap: new Map(),
      _latestYear: Number.isFinite(year) ? year : null,
    });
  }

  if (leagueId) {
    const leagueEntry = leagueCatalog.get(leagueId);
    if (leagueEntry) {
      leagueEntry.eventIds.push(event.id);
      if (leagueSeasonId) {
        leagueEntry._seasonIds.add(leagueSeasonId);
      }
      const historyName = rawLeagueName || "Competition";
      const historyEntry = leagueEntry._nameHistoryMap.get(historyName) || {
        name: historyName,
        firstYear: Number.isFinite(year) ? year : null,
        lastYear: Number.isFinite(year) ? year : null,
        eventCount: 0,
      };
      if (Number.isFinite(year)) {
        historyEntry.firstYear = historyEntry.firstYear == null ? year : Math.min(historyEntry.firstYear, year);
        historyEntry.lastYear = historyEntry.lastYear == null ? year : Math.max(historyEntry.lastYear, year);
        leagueEntry._latestYear = leagueEntry._latestYear == null ? year : Math.max(leagueEntry._latestYear, year);
      }
      historyEntry.eventCount += 1;
      leagueEntry._nameHistoryMap.set(historyName, historyEntry);
    }
  }

  if (leagueSeasonId && !leagueSeasonCatalog.has(leagueSeasonId)) {
    leagueSeasonCatalog.set(leagueSeasonId, {
      id: leagueSeasonId,
      leagueId,
      nature: "LeagueSeason",
      title: `${rawLeagueName}${year ? ` ${year}` : ""}`.trim(),
      league: rawLeagueName,
      sport: event.sport,
      year,
      seasonKey: Number.isFinite(year) ? String(year) : "na",
      eventIds: [],
    });
  }

  if (leagueSeasonId) {
    const seasonEntry = leagueSeasonCatalog.get(leagueSeasonId);
    if (seasonEntry) {
      seasonEntry.eventIds.push(event.id);
    }
  }

  event.nature = event.nature || "Match";
  event.leagueId = leagueId;
  event.leagueSeasonId = leagueSeasonId;
  event.leagueTitle = leagueSeasonId ? leagueSeasonCatalog.get(leagueSeasonId).title : null;
});

const leagueSeasons = Array.from(leagueSeasonCatalog.values()).map((league) => {
  const matches = (league.eventIds || [])
    .map((eventId) => events.find((event) => event.id === eventId))
    .filter(Boolean)
    .sort((a, b) => {
      const timeA = parseEventDateTime(a)?.getTime() || 0;
      const timeB = parseEventDateTime(b)?.getTime() || 0;
      return timeA - timeB;
    });
  const firstMatch = matches[0] || null;
  const lastMatch = matches[matches.length - 1] || null;
  const startDate = firstMatch ? parseEventDateTime(firstMatch) : null;
  const endDate = lastMatch ? parseEventDateTime(lastMatch) : null;
  const matchCount = matches.length;
  const totalCommunityScore = matches.reduce((total, event) => total + Number(event.communityScore || 0), 0);
  const avgCommunityScore = matchCount ? Number((totalCommunityScore / matchCount).toFixed(1)) : 0;
  const reviews = matches.reduce((total, event) => total + Number(event.reviews || 0), 0);

  return {
    ...league,
    count: matchCount,
    startDateISO: firstMatch?.dateISO || (startDate ? formatDateKey(startDate) : ""),
    endDateISO: lastMatch?.dateISO || (endDate ? formatDateKey(endDate) : ""),
    dateISO: lastMatch?.dateISO || (endDate ? formatDateKey(endDate) : ""),
    dateTimeISO: endDate ? endDate.toISOString() : "",
    image: lastMatch ? getEventImage(lastMatch) : "images/events/samplegeneric.jpeg",
    location: firstMatch?.location || "",
    communityScore: avgCommunityScore,
    reviews,
  };
});

const leagues = Array.from(leagueCatalog.values()).map((league) => {
  const matches = (league.eventIds || [])
    .map((eventId) => events.find((event) => event.id === eventId))
    .filter(Boolean)
    .sort((a, b) => {
      const timeA = parseEventDateTime(a)?.getTime() || 0;
      const timeB = parseEventDateTime(b)?.getTime() || 0;
      return timeA - timeB;
    });
  const firstMatch = matches[0] || null;
  const lastMatch = matches[matches.length - 1] || null;
  const startDate = firstMatch ? parseEventDateTime(firstMatch) : null;
  const endDate = lastMatch ? parseEventDateTime(lastMatch) : null;
  const seasonIds = Array.from(league._seasonIds || []);
  const seasonCount = seasonIds.length;
  const totalCommunityScore = matches.reduce((total, event) => total + Number(event.communityScore || 0), 0);
  const avgCommunityScore = matches.length ? Number((totalCommunityScore / matches.length).toFixed(1)) : 0;
  const reviews = matches.reduce((total, event) => total + Number(event.reviews || 0), 0);
  const nameHistory = Array.from(league._nameHistoryMap.values())
    .sort((a, b) => {
      const yearA = a.firstYear == null ? 0 : a.firstYear;
      const yearB = b.firstYear == null ? 0 : b.firstYear;
      return yearA - yearB;
    })
    .map((entry) => ({
      ...entry,
      period: entry.firstYear == null
        ? "Date inconnue"
        : entry.firstYear === entry.lastYear
          ? `${entry.firstYear}`
          : `${entry.firstYear}-${entry.lastYear}`,
    }));
  const latestName = nameHistory
    .slice()
    .sort((a, b) => {
      const yearA = a.lastYear == null ? 0 : a.lastYear;
      const yearB = b.lastYear == null ? 0 : b.lastYear;
      return yearB - yearA;
    })[0]?.name || league.title;

  return {
    id: league.id,
    key: league.key,
    nature: "League",
    title: latestName,
    sport: league.sport,
    eventIds: league.eventIds,
    seasonIds,
    seasonCount,
    count: matches.length,
    startDateISO: firstMatch?.dateISO || (startDate ? formatDateKey(startDate) : ""),
    endDateISO: lastMatch?.dateISO || (endDate ? formatDateKey(endDate) : ""),
    dateISO: lastMatch?.dateISO || (endDate ? formatDateKey(endDate) : ""),
    dateTimeISO: endDate ? endDate.toISOString() : "",
    image: lastMatch ? getEventImage(lastMatch) : "images/events/samplegeneric.jpeg",
    location: firstMatch?.location || "",
    communityScore: avgCommunityScore,
    reviews,
    latestYear: league._latestYear,
    nameHistory,
  };
});

const leagueEvents = leagueSeasons;
const leagueSeasonsById = Object.fromEntries(leagueSeasons.map((league) => [league.id, league]));
const leaguesById = Object.fromEntries(leagueEvents.map((league) => [league.id, league]));
const leagueRootsById = Object.fromEntries(leagues.map((league) => [league.id, league]));

const users = [
  {
    id: "usr_2SGNEH2HBH7S2SGNCH2HBH6Y2S",
    name: "Diego M.",
    handle: "@diegom",
    followers: 2400,
    location: "Madrid",
    bio: "Supporter de football et chasseur de derbies.",
    favoriteSports: ["Football"],
    badge: "Top noteur",
  },
  {
    id: "usr_ZZG4WXPGSFTZZZG4TXPGSFT4ZZ",
    name: "Nina P.",
    handle: "@ninap",
    followers: 1800,
    location: "Paris",
    bio: "Fan de finales et d'ambiances folles.",
    favoriteSports: ["Football", "Tennis"],
    badge: "Curatrice",
  },
  {
    id: "usr_WCPDCEC9K78HWCPDEEC9K79CWC",
    name: "Marcus L.",
    handle: "@marcusl",
    followers: 3200,
    location: "Los Angeles",
    bio: "Basket et playoffs, toujours.",
    favoriteSports: ["Basketball"],
    badge: "Playoffs addict",
  },
  {
    id: "usr_1Y8A7RTBXKQ71Y8A5RTBXKPC1Y",
    name: "Elle R.",
    handle: "@eller",
    followers: 900,
    location: "Monaco",
    bio: "Passionnee de sport auto et de strategie.",
    favoriteSports: ["Sport auto"],
    badge: "Pit wall",
  },
  {
    id: "usr_B2E0M1X3B939B2E0P1X3B944B2",
    name: "Jamal T.",
    handle: "@jamalt",
    followers: 2700,
    location: "Grenoble",
    bio: "Passionne de cyclisme et d'etapes de montagne.",
    favoriteSports: ["Cyclisme"],
    badge: "Grimpeur",
  },
  {
    id: "usr_E3GXNGXY98Y8E3GXQGXY98Z3E3",
    name: "Riley K.",
    handle: "@rileyk",
    followers: 1500,
    location: "Las Vegas",
    bio: "MMA, finishes et soirées de combat.",
    favoriteSports: ["MMA"],
    badge: "Fight night",
  },
  {
    id: "usr_KHHE5RBM3W4HKHHE7RBM3W5CKH",
    name: "Louise B.",
    handle: "@louiseb",
    followers: 1100,
    location: "Lyon",
    bio: "Cyclisme et grandes etapes mythiques.",
    favoriteSports: ["Cyclisme"],
    badge: "Historienne",
  },
];

const athletes = [
  { id: "ath_8DAHGRY334558DAHJRY334608D", name: "Kylian Mbappe", sport: "Football", country: "France", teamId: "tm_TEQA79WSWY5GTEQA99WSWY6BTE", role: "Attaquant", bio: "Vitesse, percussion, et sens du but.", image: "images/athletes/kylian_mbappe.jpg" },
  { id: "ath_2XDY9NV3RD302XDY7NV3RD252X", name: "LeBron James", sport: "Basketball", country: "Etats-Unis", teamId: "tm_YWWKB6VYW1TWYWWKD6VYW1VQYW", role: "Ailier", bio: "Leader, vision de jeu, et clutch time.", image: "images/athletes/lebron_james.jpg" },
  { id: "ath_PKE2AMX10M3APKE28MX10M2FPK", name: "Iga Swiatek", sport: "Tennis", country: "Pologne", team: "Équipe nationale", role: "Joueuse", bio: "Maestra de la terre battue.", image: "images/athletes/iga_swiatek.jpg" },
  { id: "ath_WG635X9EQAS8WG633X9EQARDWG", name: "Max Verstappen", sport: "Sport auto", country: "Pays-Bas", teamId: "tm_YM59JRV9KA9HYM59GRV9KA8PYM", role: "Pilote", bio: "Pace brut, agressivite, et précision.", image: "images/athletes/max_verstappen.jpg" },
  { id: "ath_3CXXQC4658C23CXXSC4658CY3C", name: "Tadej Pogacar", sport: "Cyclisme", country: "Slovenie", team: "UAE Team Emirates", role: "Grimpeur", bio: "Explosif sur les cols et redoutable en attaques." },
  { id: "ath_8Q94NQ3W2FRP8Q94KQ3W2FQV8Q", name: "Rodri", sport: "Football", country: "Espagne", teamId: "tm_5225QYARZGVR5225SYARZGWK52", role: "Milieu", bio: "Chef d'orchestre et couverture defensive." },
  { id: "ath_N6W2GXXCXK50N6W2EXXCXK45N6", name: "Bukayo Saka", sport: "Football", country: "Angleterre", teamId: "tm_030PARA1RYP1030PCRA1RYPW03", role: "Ailier", bio: "Percussion et creativite sur le côté." },
  { id: "ath_1AAXPJG7W5SB1AAXRJG7W5T61A", name: "Jayson Tatum", sport: "Basketball", country: "Etats-Unis", teamId: "tm_Y7N59W7VHN0CY7N57W7VHMZHY7", role: "Ailier", bio: "Scoreur complet et défense elite." },
  { id: "ath_VKTRT0PRSFGGVKTRR0PRSFFNVK", name: "A'ja Wilson", sport: "Basketball", country: "Etats-Unis", teamId: "tm_TVGZGJFCJT9MTVGZJJFCJTAFTV", role: "Interieure", bio: "Domination dans la raquette." },
  { id: "ath_TRXR02Z415Z0TRXQY2Z415Y5TR", name: "Aryna Sabalenka", sport: "Tennis", country: "Bielorussie", team: "Équipe nationale", role: "Joueuse", bio: "Puissance et intensite." },
  { id: "ath_ZXS5W10AYYXXZXS5T10AYYX2ZX", name: "Lewis Hamilton", sport: "Sport auto", country: "Royaume-Uni", teamId: "tm_ESJ72M82SZECESJ74M82SZF7ES", role: "Pilote", bio: "Experience et vitesse pure.", image: "images/athletes/lewis_hamilton.jpg" },
  { id: "ath_W8JCJFA1TQDTW8JCGFA1TQCZW8", name: "Antoine Dupont", sport: "Rugby", country: "France", teamId: "tm_490FYFV4C8XB490FWFV4C8WG49", role: "Demi de melee", bio: "Accelerations et vision de jeu." },
  { id: "ath_SVFJ6ZG3NJDBSVFJ8ZG3NJE6SV", name: "Matthieu Jalibert", sport: "Rugby", country: "France", teamId: "tm_490FYFV4C8XB490FWFV4C8WG49", role: "Demi d'ouverture", bio: "Jeu au pied et creativite." },
  { id: "ath_GB62VD6BEWWPGB62SD6BEWVVGB", name: "Jonas Vingegaard", sport: "Cyclisme", country: "Danemark", team: "Team Visma", role: "Grimpeur", bio: "Régulier et solide en haute montagne." },
  { id: "ath_X98K12PHZKMFX98JZ2PHZKKMX9", name: "Mathieu van der Poel", sport: "Cyclisme", country: "Pays-Bas", team: "Alpecin-Deceuninck", role: "Classiqueur", bio: "Explosif sur les paves et les sprints courts." },
  { id: "ath_EY474310H193EY472310H188EY", name: "Wout van Aert", sport: "Cyclisme", country: "Belgique", team: "Team Visma", role: "Puncheur", bio: "Puissant, polyvalent, et redoutable en chrono." },
  { id: "ath_D7G4H9K3PZ0YD7G4H9K3PZ0Y1", name: "Isaac Del Toro", sport: "Cyclisme", country: "Etats-Unis", team: "Ineos Grenadiers", role: "Rouleur", bio: "Rouleur tenace, bon en chrono et en attaques de rupture." },
  { id: "ath_W0L9P7X2MZ3AW0L9P7X2MZ3A", name: "Arnaud De Lie", sport: "Cyclisme", country: "Belgique", team: "Lotto Dstny", role: "Puncheur", bio: "Sprinteur puissant qui brille sur les classiques vallonnees." },
  { id: "ath_Z6F8B3R1QY5GZ6F8B3R1QY5G", name: "Christian Scaroni", sport: "Cyclisme", country: "Italie", team: "EF Education-EasyPost", role: "Classiqueur", bio: "Rouleur italien à l'aise sur les routes cassees et venteuses." },
  { id: "ath_P5N8M2A6L1OP5N8M2A6L1O", name: "Jonathan Milan", sport: "Cyclisme", country: "Italie", team: "Ineos Grenadiers", role: "Chronoman", bio: "Spécialiste du contre-la-montre et des sprints en petit groupe." },
  { id: "ath_U3T9A4N5D2RSU3T9A4N5D2R", name: "Tobias Lund Andresen", sport: "Cyclisme", country: "Danemark", team: "Uno-X Pro Cycling", role: "Puncheur", bio: "Jeune danois costaud sur les bosses de courte duree." },
  { id: "ath_S6T4O7R9E1M0S6T4O7R9E1M", name: "Michael Storer", sport: "Cyclisme", country: "Australie", team: "DSM-Firmenich", role: "Grimpeur", bio: "Attaquant en montagne, bon aussi sur les routes etroites." },
  { id: "ath_J1O8R2G5N4S6M3J1O8R2G5N4S", name: "Matteo Jorgenson", sport: "Cyclisme", country: "Etats-Unis", team: "UAE Team Emirates", role: "Chronoman", bio: "Americain agile en contre-la-montre et sur les finales cassees." },
  { id: "ath_G7A3L2F9X1ZFG7A3L2F9X1Z", name: "Felix Gall", sport: "Cyclisme", country: "Autriche", team: "Intermarche-Wanty", role: "Puncheur", bio: "Puncheur autrichien qui aime les classiques vallonnees." },
  { id: "ath_Z60126046HCPZ60146046HDHZ6", name: "Remco Evenepoel", sport: "Cyclisme", country: "Belgique", team: "Soudal Quick-Step", role: "Rouleur", bio: "Attaquant, excellent en contre-la-montre." },
  { id: "ath_351FB7FV6WXY351F97FV6WX235", name: "Primoz Roglic", sport: "Cyclisme", country: "Slovenie", team: "Bora-Hansgrohe", role: "Grimpeur", bio: "Régulier et dangereux en montagne." },
  { id: "ath_9WJD29Q5R5579WJD09Q5R54C9W", name: "Egan Bernal", sport: "Cyclisme", country: "Colombie", team: "Ineos Grenadiers", role: "Grimpeur", bio: "Finesse et endurance sur les grands cols." },
  { id: "ath_GWKFA456YH73GWKFC456YH7YGW", name: "Julian Alaphilippe", sport: "Cyclisme", country: "France", team: "Soudal Quick-Step", role: "Puncheur", bio: "Panache et attaques tranchantes." },
  { id: "ath_M3HFS2BYPBCEM3HFV2BYPBD9M3", name: "Tom Pidcock", sport: "Cyclisme", country: "Royaume-Uni", team: "Ineos Grenadiers", role: "Puncheur", bio: "Explosif, technique, et audacieux." },
  { id: "ath_3T17JAP1V9GK3T17MAP1V9HE3T", name: "Filippo Ganna", sport: "Cyclisme", country: "Italie", team: "Ineos Grenadiers", role: "Rouleur", bio: "Machine a chrono et puissance brute." },
  { id: "ath_5GCWSR7K02VZ5GCWVR7K02WT5G", name: "Joao Almeida", sport: "Cyclisme", country: "Portugal", team: "UAE Team Emirates", role: "Grimpeur", bio: "Régulier sur les etapes de montagne." },
  { id: "ath_27J8E524R71C27J8C524R70H27", name: "Adam Yates", sport: "Cyclisme", country: "Royaume-Uni", team: "UAE Team Emirates", role: "Grimpeur", bio: "Experience et constance." },
  { id: "ath_Y3T2TTQH47A1Y3T2WTQH47AWY3", name: "Simon Yates", sport: "Cyclisme", country: "Royaume-Uni", team: "Jayco AlUla", role: "Grimpeur", bio: "Attaquant sur les longues montees." },
  { id: "ath_SVANEWFBD59GSVANCWFBD58NSV", name: "Marc Hirschi", sport: "Cyclisme", country: "Suisse", team: "UAE Team Emirates", role: "Puncheur", bio: "Accents explosifs sur les côtés." },
  { id: "ath_11NDCYYCVB2A11NDEYYCVB3511", name: "Matej Mohoric", sport: "Cyclisme", country: "Slovenie", team: "Bahrain Victorious", role: "Classiqueur", bio: "Descendeur de folie et finisseur." },
  { id: "ath_X84VB7CB30X2X84VD7CB30XXX8", name: "Michael Matthews", sport: "Cyclisme", country: "Australie", team: "Jayco AlUla", role: "Sprinteur", bio: "Rapide sur les arrivees en petit groupe." },
  { id: "ath_6SFYZ3KWDQ936SFZ13KWDQ9Y6S", name: "Alberto Bettiol", sport: "Cyclisme", country: "Italie", team: "EF Education-EasyPost", role: "Classiqueur", bio: "Puissance sur les paves." },
  { id: "ath_SCZX5C7936K7SCZX7C7936M2SC", name: "Christophe Laporte", sport: "Cyclisme", country: "France", team: "Team Visma", role: "Classiqueur", bio: "Solide et régulier sur les classiques." },
  { id: "ath_XAWPJZKJB777XAWPMZKJB782XA", name: "Sepp Kuss", sport: "Cyclisme", country: "Etats-Unis", team: "Team Visma", role: "Grimpeur", bio: "Allie de luxe en haute montagne." },
  { id: "ath_N501XDCY6Q7JN501ZDCY6Q8DN5", name: "Biniam Girmay", sport: "Cyclisme", country: "Erythree", team: "Intermarche-Wanty", role: "Sprinteur", bio: "Vitesse et sens du placement." },
  { id: "ath_SHPKTH0N4YPASHPKRH0N4YNFSH", name: "Jasper Philipsen", sport: "Cyclisme", country: "Belgique", team: "Alpecin-Deceuninck", role: "Sprinteur", bio: "Le roi des arrivées massives." },
  { id: "ath_32HDK9KWYYDY32HDH9KWYYD332", name: "Mads Pedersen", sport: "Cyclisme", country: "Danemark", team: "Lidl-Trek", role: "Puncheur", bio: "Puissance sur les classiques venteuses." },
  { id: "ath_3YCZHBJCC34X3YCZKBJCC35R3Y", name: "Romain Ntamack", sport: "Rugby", country: "France", teamId: "tm_490FYFV4C8XB490FWFV4C8WG49", role: "Demi d'ouverture", bio: "Précision et gestion du tempo." },
  { id: "ath_7YGNAH8F083P7YGN8H8F082V7Y", name: "Gregory Alldritt", sport: "Rugby", country: "France", teamId: "tm_490FYFV4C8XB490FWFV4C8WG49", role: "Troisieme ligne", bio: "Puissance et leadership." },
  { id: "ath_MF6060GPA1VPMF6080GPA1WJMF", name: "Damian Penaud", sport: "Rugby", country: "France", teamId: "tm_490FYFV4C8XB490FWFV4C8WG49", role: "Ailier", bio: "Vitesse et flair offensif." },
  { id: "ath_0TCAG4KSAX6B0TCAE4KSAX5G0T", name: "Thomas Ramos", sport: "Rugby", country: "France", teamId: "tm_490FYFV4C8XB490FWFV4C8WG49", role: "Arriere", bio: "Fiabilite au pied et relances." },
  { id: "ath_61A2HR3PGMBV61A2KR3PGMCP61", name: "Gael Fickou", sport: "Rugby", country: "France", teamId: "tm_490FYFV4C8XB490FWFV4C8WG49", role: "Centre", bio: "Défense solide et experience." },
  { id: "ath_AM39ZSNFBWD3AM3A1SNFBWDYAM", name: "Maro Itoje", sport: "Rugby", country: "Angleterre", teamId: "tm_MKQJ36CMK808MKQJ16CMK7ZDMK", role: "Deuxieme ligne", bio: "Puissance et presence en touche." },
  { id: "ath_F4F365KAG0E3F4F345KAG0D8F4", name: "Owen Farrell", sport: "Rugby", country: "Angleterre", teamId: "tm_MKQJ36CMK808MKQJ16CMK7ZDMK", role: "Ouvreur", bio: "Leadership et jeu au pied." },
  { id: "ath_PR56RGM35V8APR56TGM35V96PR", name: "Marcus Smith", sport: "Rugby", country: "Angleterre", teamId: "tm_MKQJ36CMK808MKQJ16CMK7ZDMK", role: "Ouvreur", bio: "Creativite et acceleration." },
  { id: "ath_8Z2C4AH31K5H8Z2C2AH31K4P8Z", name: "Finn Russell", sport: "Rugby", country: "Ecosse", teamId: "tm_67FZXF65J0SV67FZZF65J0TP67", role: "Ouvreur", bio: "Passeur instinctif et imprévisible." },
  { id: "ath_TJRA41E55NE1TJRA61E55NEWTJ", name: "Stuart Hogg", sport: "Rugby", country: "Ecosse", teamId: "tm_67FZXF65J0SV67FZZF65J0TP67", role: "Arriere", bio: "Relances tranchantes." },
  { id: "ath_7X3PGM4VRY9Q7X3PEM4VRY8V7X", name: "Huw Jones", sport: "Rugby", country: "Ecosse", teamId: "tm_67FZXF65J0SV67FZZF65J0TP67", role: "Centre", bio: "Percussions efficaces." },
  { id: "ath_9RQX1NYQJ1GK9RQX3NYQJ1HE9R", name: "Johnny Sexton", sport: "Rugby", country: "Irlande", teamId: "tm_ST6YEF7ATNHKST6YCF7ATNGRST", role: "Ouvreur", bio: "Maestro du jeu irlandais." },
  { id: "ath_N2SNF28K7ZRSN2SND28K7ZQYN2", name: "Josh van der Flier", sport: "Rugby", country: "Irlande", teamId: "tm_ST6YEF7ATNHKST6YCF7ATNGRST", role: "Troisieme ligne", bio: "Endurance et impact." },
  { id: "ath_Y3E3HXE00M28Y3E3KXE00M33Y3", name: "Tadhg Furlong", sport: "Rugby", country: "Irlande", teamId: "tm_ST6YEF7ATNHKST6YCF7ATNGRST", role: "Pilier", bio: "Puissance et mobilite." },
  { id: "ath_ZT6J0ZR4DE2AZT6J2ZR4DE35ZT", name: "Caelan Doris", sport: "Rugby", country: "Irlande", teamId: "tm_ST6YEF7ATNHKST6YCF7ATNGRST", role: "Troisieme ligne", bio: "Dominant dans les collisions." },
  { id: "ath_61J2QNK4N4ZR61J2SNK4N50K61", name: "Alun Wyn Jones", sport: "Rugby", country: "Pays de Galles", teamId: "tm_W71BADS3BN91W71BCDS3BN9XW7", role: "Deuxieme ligne", bio: "Experience legendaire." },
  { id: "ath_EZFG6D020D6QEZFG4D020D5WEZ", name: "Louis Rees-Zammit", sport: "Rugby", country: "Pays de Galles", teamId: "tm_W71BADS3BN91W71BCDS3BN9XW7", role: "Ailier", bio: "Vitesse supersonique." },
  { id: "ath_AD3VW963QAJNAD3VT963QAHTAD", name: "Dan Biggar", sport: "Rugby", country: "Pays de Galles", teamId: "tm_W71BADS3BN91W71BCDS3BN9XW7", role: "Ouvreur", bio: "Précision et temperament." },
  { id: "ath_VM8N3ZX0V20TVM8N5ZX0V21NVM", name: "Paolo Garbisi", sport: "Rugby", country: "Italie", teamId: "tm_JY0A0A7KCXX9JY09YA7KCXWEJY", role: "Ouvreur", bio: "Talent et culot." },
  { id: "ath_8M9ATS4RV4JG8M9AWS4RV4KB8M", name: "Ange Capuozzo", sport: "Rugby", country: "Italie", teamId: "tm_JY0A0A7KCXX9JY09YA7KCXWEJY", role: "Arriere", bio: "Relances spectaculaires." },
  { id: "ath_C5PX86HWNR3XC5PX66HWNR31C5", name: "Israel Adesanya", sport: "MMA", country: "Nigeria", team: "City Kickboxing", role: "Middleweight", bio: "Précision et striking de haut niveau." },
  { id: "ath_JJGT7QW30GEXJJGT5QW30GE2JJ", name: "Francis Ngannou", sport: "MMA", country: "Cameroun", team: "MMA Factory", role: "Heavyweight", bio: "Puissance de frappe devastatrice." },
  { id: "ath_K46DDVFYGTG3K46DBVFYGTF8K4", name: "Carlos Alcaraz", sport: "Tennis", image: "images/athletes/carlos_alcaraz.jpg" },
  { id: "ath_8E4ZJRXKW16M8E4ZMRXKW17F8E", name: "Conor McGregor", sport: "MMA", image: "images/athletes/conor_mcgregor.jpg" },
  { id: "ath_MDMWEMWZAWB3MDMWGMWZAWBYMD", name: "Cristiano Ronaldo", sport: "Football", image: "images/athletes/cristiano_ronaldo.jpg" },
  { id: "ath_194F5AQVZDXY194F7AQVZDYS19", name: "David Beckham", sport: "Football", image: "images/athletes/david_beckham.jpg" },
  { id: "ath_Z7FYM0G9GJRNZ7FYJ0G9GJQTZ7", name: "Eliud Kipchoge", sport: "Athlétisme", image: "images/athletes/eliud_kipchoge.jpg" },
  { id: "ath_BYHYJ4HNNZ7YBYHYM4HNNZ8SBY", name: "Erling Haaland", sport: "Football", teamId: "tm_5225QYARZGVR5225SYARZGWK52", image: "images/athletes/erling_haaland.jpg" },
  { id: "ath_YFK5F337GWFDYFK5D337GWEJYF", name: "Fernando Alonso", sport: "Sport auto", image: "images/athletes/fernando_alonso.jpg" },
  { id: "ath_XCRSKKCM3DCHXCRSNKCM3DDDXC", name: "Floyd Mayweather Jr", sport: "Boxe", image: "images/athletes/floyd_mayweather_jr.jpg" },
  { id: "ath_X9X6HNM98RBMX9X6KNM98RCFX9", name: "Giannis Antetokounmpo", sport: "Basketball", image: "images/athletes/giannis_antetokounmpo.jpg" },
  { id: "ath_6BABK0E93QDK6BABN0E93QEE6B", name: "Jannik Sinner", sport: "Tennis", image: "images/athletes/jannik_sinner.jpg" },
  { id: "ath_V8TERW1F6792V8TETW1F679XV8", name: "Jude Bellingham", sport: "Football", teamId: "tm_TEQA79WSWY5GTEQA99WSWY6BTE", image: "images/athletes/jude_bellingham.jpg" },
  { id: "ath_SBTJ3VSZW7QDSBTJ1VSZW7PHSB", name: "Karim Benzema", sport: "Football", teamId: "tm_TEQA79WSWY5GTEQA99WSWY6BTE", image: "images/athletes/karim_benzema.jpg" },
  { id: "ath_3F9D82MYJRPF3F9D62MYJRNM3F", name: "Kevin De Bruyne", sport: "Football", teamId: "tm_5225QYARZGVR5225SYARZGWK52", image: "images/athletes/kevin_de_bruyne.jpg" },
  { id: "ath_Z0CYM9RH764MZ0CYJ9RH763SZ0", name: "Kevin Durant", sport: "Basketball", image: "images/athletes/kevin_durant.jpg" },
  { id: "ath_N7C474004NVDN7C494004NW8N7", name: "Kobe Bryant", sport: "Basketball", image: "images/athletes/kobe_bryant.jpg" },
  { id: "ath_TA6WM2YK8XY9TA6WJ2YK8XXETA", name: "Lamine Yamal", sport: "Football", image: "images/athletes/lamine_yamal.jpg" },
  { id: "ath_6MJ3P7XNNGN26MJ3R7XNNGNX6M", name: "Lionel Messi", sport: "Football", teamId: "tm_VHSCCA6SE39HVHSCAA6SE38PVH", image: "images/athletes/lionel_messi.jpg" },
  { id: "ath_V87M22C54VZVV87M02C54VZ0V8", name: "Luka Modric", sport: "Football", teamId: "tm_TEQA79WSWY5GTEQA99WSWY6BTE", image: "images/athletes/luka_modric.jpg" },
  { id: "ath_W9Y4X8F0XBNFW9Y4V8F0XBMMW9", name: "Michael Jordan", sport: "Basketball", image: "images/athletes/michael_jordan.jpg" },
  { id: "ath_VAGZW3PQB2RJVAGZT3PQB2QQVA", name: "Michael Phelps", sport: "Natation", image: "images/athletes/michael_phelps.jpg" },
  { id: "ath_0MV0SPE9DTFT0MV0VPE9DTGN0M", name: "Michael Schumacher", sport: "Sport auto", image: "images/athletes/michael_schumacher.jpg" },
  { id: "ath_XVGXQ6Z4WMR4XVGXS6Z4WMRZXV", name: "Mikaela Shiffrin", sport: "Ski", image: "images/athletes/mikaela_shiffrin.jpg" },
  { id: "ath_7W7N9E4RCHHW7W7NBE4RCHJQ7W", name: "Mike Tyson", sport: "Boxe", image: "images/athletes/mike_tyson.jpg" },
  { id: "ath_FYQHY66M4ZFTFYQHW66M4ZEYFY", name: "Neymar Jr", sport: "Football", teamId: "tm_4K4X0NQSCCDB4K4X2NQSCCE64K", image: "images/athletes/neymar.jpg" },
  { id: "ath_FX1YTZBV3PG1FX1YRZBV3PF6FX", name: "Nikola Jokic", sport: "Basketball", image: "images/athletes/nikola_jokic.jpg" },
  { id: "ath_S9FZ4914JG25S9FZ6914JG30S9", name: "Novak Djokovic", sport: "Tennis", image: "images/athletes/novak_djokovic.jpg" },
  { id: "ath_K8V86MPDYJY0K8V84MPDYJX5K8", name: "Rafael Nadal", sport: "Tennis", image: "images/athletes/rafael_nadal.jpg" },
  { id: "ath_DMCZJ6P7TQE9DMCZM6P7TQF4DM", name: "Roger Federer", sport: "Tennis", image: "images/athletes/roger_federer.jpg" },
  { id: "ath_ASH52VT7Z0NPASH50VT7Z0MVAS", name: "Ronaldinho", sport: "Football", image: "images/athletes/ronaldinho.jpg" },
  { id: "ath_DET1K779X35XDET1N779X36RDE", name: "Sadio Mane", sport: "Football", teamId: "tm_56YBRFV0285C56YBPFV0284H56", image: "images/athletes/sadio_mane.jpg" },
  { id: "ath_RFPYMC7WK10GRFPYJC7WK0ZNRF", name: "Serena Williams", sport: "Tennis", image: "images/athletes/serena_williams.jpg" },
  { id: "ath_WQ1CN57PQNGXWQ1CQ57PQNHRWQ", name: "Shaquille O'Neal", sport: "Basketball", image: "images/athletes/shaquille_oneal.jpg" },
  { id: "ath_7V7QPYY5WZJ47V7QRYY5WZJZ7V", name: "Shohei Ohtani", sport: "Baseball", image: "images/athletes/shohei_ohtani.jpg" },
  { id: "ath_KDDNYYEXZPWWKDDP0YEXZPXQKD", name: "Simone Biles", sport: "Gymnastique", image: "images/athletes/simone_biles.jpg" },
  { id: "ath_3EW6ZYCVQC873EW71YCVQC923E", name: "Stephen Curry", sport: "Basketball", teamId: "tm_84N5TZZCDWB284N5RZZCDWA784", image: "images/athletes/stephen_curry.jpg" },
  { id: "ath_T06545873PQNT06565873PRGT0", name: "Tiger Woods", sport: "Golf", image: "images/athletes/tiger_woods.jpg" },
  { id: "ath_YVS6E1G4V7ABYVS6G1G4V7B7YV", name: "Usain Bolt", sport: "Athlétisme", image: "images/athletes/usain_bolt.jpg" },
  { id: "ath_K9J3JW7THRATK9J3MW7THRBPK9", name: "Yuzuru Hanyu", sport: "Patinage artistique", image: "images/athletes/yuzuru_hanyu.jpg" },
  { id: "ath_0YHPN79Y60960YHPQ79Y60A10Y", name: "Zinedine Zidane", sport: "Football", image: "images/athletes/zinedine_zidane.jpg" },
  { id: "ath_Q7XYPASR5VS7Q7XYMASR5VRCQ7", name: "Armand Duplantis", sport: "Athlétisme", image: "images/athletes/armand_duplantis.jpg" },
  { id: "ath_HH6SQ7JWPY1GHH6SS7JWPY2BHH", name: "Ayrton Senna", sport: "Sport auto", image: "images/athletes/ayrton_senna.jpg" },
];

const teams = [
  { id: "tm_TEQA79WSWY5GTEQA99WSWY6BTE", name: "Real Madrid", nameFull: "Real Madrid", nameMini: "Real", sport: "Football", city: "Madrid", athleteIds: ["ath_8DAHGRY334558DAHJRY334608D", "ath_V8TERW1F6792V8TETW1F679XV8", "ath_SBTJ3VSZW7QDSBTJ1VSZW7PHSB", "ath_V87M22C54VZVV87M02C54VZ0V8"] },
  { id: "tm_5225QYARZGVR5225SYARZGWK52", name: "Manchester City", nameFull: "Manchester City", nameMini: "Man City", sport: "Football", city: "Manchester", athleteIds: ["ath_8Q94NQ3W2FRP8Q94KQ3W2FQV8Q", "ath_3F9D82MYJRPF3F9D62MYJRNM3F", "ath_BYHYJ4HNNZ7YBYHYM4HNNZ8SBY"] },
  { id: "tm_030PARA1RYP1030PCRA1RYPW03", name: "Arsenal", nameFull: "Arsenal", nameMini: "Arsenal", sport: "Football", city: "Londres", athleteIds: ["ath_N6W2GXXCXK50N6W2EXXCXK45N6"] },
  { id: "tm_W9XJZMCB2E47W9XK1MCB2E52W9", name: "Liverpool", nameFull: "Liverpool", nameMini: "Liverpool", sport: "Football", city: "Liverpool", athleteIds: [] },
  { id: "tm_91PSGCLUB202691PSGCLUB26", name: "Paris Saint-Germain", nameFull: "Paris Saint-Germain", nameMini: "PSG", sport: "Football", city: "Paris", athleteIds: [] },
  { id: "tm_91OMCLUB202691OMCLUB2026", name: "Olympique de Marseille", nameFull: "Olympique de Marseille", nameMini: "OM", sport: "Football", city: "Marseille", athleteIds: [] },
  { id: "tm_BDCJ960ZWVG6BDCJ760ZWVFBBD", name: "France", nameFull: "Équipe de France", nameMini: "France", sport: "Football", city: "Paris", athleteIds: ["ath_8DAHGRY334558DAHJRY334608D"] },
  { id: "tm_VHSCCA6SE39HVHSCAA6SE38PVH", name: "Argentine", nameFull: "Équipe nationale d'Argentine", nameMini: "Argentine", sport: "Football", city: "Buenos Aires", athleteIds: ["ath_6MJ3P7XNNGN26MJ3R7XNNGNX6M"] },
  { id: "tm_4K4X0NQSCCDB4K4X2NQSCCE64K", name: "Bresil", nameFull: "Équipe nationale du Bresil", nameMini: "Bresil", sport: "Football", city: "Rio de Janeiro", athleteIds: ["ath_FYQHY66M4ZFTFYQHW66M4ZEYFY"] },
  { id: "tm_56YBRFV0285C56YBPFV0284H56", name: "Senegal", nameFull: "Équipe nationale du Senegal", nameMini: "Senegal", sport: "Football", city: "Dakar", athleteIds: ["ath_DET1K779X35XDET1N779X36RDE"] },
  { id: "tm_43R35C2CTZPT43R33C2CTZNZ43", name: "Leeds United", nameFull: "Leeds United", nameMini: "Leeds", sport: "Football", city: "Leeds", athleteIds: [] },
  { id: "tm_91VNVCC07Y3891VNSCC07Y2D91", name: "Nottingham Forest", nameFull: "Nottingham Forest", nameMini: "Forest", sport: "Football", city: "Nottingham", athleteIds: [] },
  { id: "tm_TS1HF9NAEDTPTS1HD9NAEDSVTS", name: "Flamengo", nameFull: "Flamengo", nameMini: "Flamengo", sport: "Football", city: "Rio de Janeiro", athleteIds: [] },
  { id: "tm_WVTXJT9KZ04QWVTXMT9KZ05KWV", name: "Corinthians", nameFull: "Corinthians", nameMini: "Corinthians", sport: "Football", city: "Sao Paulo", athleteIds: [] },
  { id: "tm_YWWKB6VYW1TWYWWKD6VYW1VQYW", name: "Los Angeles Lakers", nameFull: "Los Angeles Lakers", nameMini: "Lakers", sport: "Basketball", city: "Los Angeles", athleteIds: ["ath_2XDY9NV3RD302XDY7NV3RD252X"] },
  { id: "tm_Y7N59W7VHN0CY7N57W7VHMZHY7", name: "Boston Celtics", nameFull: "Boston Celtics", nameMini: "Celtics", sport: "Basketball", city: "Boston", athleteIds: ["ath_1AAXPJG7W5SB1AAXRJG7W5T61A"] },
  { id: "tm_TVGZGJFCJT9MTVGZJJFCJTAFTV", name: "Las Vegas Aces", nameFull: "Las Vegas Aces", nameMini: "Aces", sport: "Basketball", city: "Las Vegas", athleteIds: ["ath_VKTRT0PRSFGGVKTRR0PRSFFNVK"] },
  { id: "tm_PGXXVHV935C1PGXXSHV935B6PG", name: "New York Liberty", nameFull: "New York Liberty", nameMini: "Liberty", sport: "Basketball", city: "New York", athleteIds: [] },
  { id: "tm_84N5TZZCDWB284N5RZZCDWA784", name: "Golden State Warriors", nameFull: "Golden State Warriors", nameMini: "Warriors", sport: "Basketball", city: "San Francisco", athleteIds: ["ath_3EW6ZYCVQC873EW71YCVQC923E"] },
  { id: "tm_490FYFV4C8XB490FWFV4C8WG49", name: "France", nameFull: "XV de France", nameMini: "France", sport: "Rugby", city: "Paris", athleteIds: ["ath_W8JCJFA1TQDTW8JCGFA1TQCZW8", "ath_SVFJ6ZG3NJDBSVFJ8ZG3NJE6SV", "ath_3YCZHBJCC34X3YCZKBJCC35R3Y", "ath_7YGNAH8F083P7YGN8H8F082V7Y", "ath_MF6060GPA1VPMF6080GPA1WJMF", "ath_0TCAG4KSAX6B0TCAE4KSAX5G0T", "ath_61A2HR3PGMBV61A2KR3PGMCP61"] },
  { id: "tm_ST6YEF7ATNHKST6YCF7ATNGRST", name: "Ireland", nameFull: "Équipe d'Irlande", nameMini: "Ireland", sport: "Rugby", city: "Dublin", athleteIds: ["ath_9RQX1NYQJ1GK9RQX3NYQJ1HE9R", "ath_N2SNF28K7ZRSN2SND28K7ZQYN2", "ath_Y3E3HXE00M28Y3E3KXE00M33Y3", "ath_ZT6J0ZR4DE2AZT6J2ZR4DE35ZT"] },
  { id: "tm_MKQJ36CMK808MKQJ16CMK7ZDMK", name: "England", nameFull: "Équipe d'Angleterre", nameMini: "England", sport: "Rugby", city: "Londres", athleteIds: ["ath_AM39ZSNFBWD3AM3A1SNFBWDYAM", "ath_F4F365KAG0E3F4F345KAG0D8F4", "ath_PR56RGM35V8APR56TGM35V96PR"] },
  { id: "tm_67FZXF65J0SV67FZZF65J0TP67", name: "Scotland", nameFull: "Équipe d'Ecosse", nameMini: "Scotland", sport: "Rugby", city: "Edimbourg", athleteIds: ["ath_8Z2C4AH31K5H8Z2C2AH31K4P8Z", "ath_TJRA41E55NE1TJRA61E55NEWTJ", "ath_7X3PGM4VRY9Q7X3PEM4VRY8V7X"] },
  { id: "tm_W71BADS3BN91W71BCDS3BN9XW7", name: "Wales", nameFull: "Équipe du Pays de Galles", nameMini: "Wales", sport: "Rugby", city: "Cardiff", athleteIds: ["ath_61J2QNK4N4ZR61J2SNK4N50K61", "ath_EZFG6D020D6QEZFG4D020D5WEZ", "ath_AD3VW963QAJNAD3VT963QAHTAD"] },
  { id: "tm_JY0A0A7KCXX9JY09YA7KCXWEJY", name: "Italy", nameFull: "Équipe d'Italie", nameMini: "Italy", sport: "Rugby", city: "Rome", athleteIds: ["ath_VM8N3ZX0V20TVM8N5ZX0V21NVM", "ath_8M9ATS4RV4JG8M9AWS4RV4KB8M"] },
  { id: "tm_YM59JRV9KA9HYM59GRV9KA8PYM", name: "Red Bull Racing", nameFull: "Oracle Red Bull Racing", nameMini: "Red Bull", sport: "Sport auto", city: "Milton Keynes", athleteIds: ["ath_WG635X9EQAS8WG633X9EQARDWG"] },
  { id: "tm_ESJ72M82SZECESJ74M82SZF7ES", name: "Mercedes", nameFull: "Mercedes-AMG Petronas", nameMini: "Mercedes", sport: "Sport auto", city: "Brackley", athleteIds: ["ath_ZXS5W10AYYXXZXS5T10AYYX2ZX"] },
];

const eventTeams = [
  { eventId: "evt_2XWA16C4CB712XWA36C4CB7W2X", teamIds: ["tm_5225QYARZGVR5225SYARZGWK52", "tm_TEQA79WSWY5GTEQA99WSWY6BTE"] },
  { eventId: "evt_7CY3Q2W40JDW7CY3S2W40JEQ7C", teamIds: ["tm_91PSGCLUB202691PSGCLUB26", "tm_91OMCLUB202691OMCLUB2026"] },
  { eventId: "evt_8QNPM1627RQF8QNPJ1627RPM8Q", teamIds: ["tm_030PARA1RYP1030PCRA1RYPW03", "tm_W9XJZMCB2E47W9XK1MCB2E52W9"] },
  { eventId: "evt_VH688P4QC0JKVH686P4QC0HQVH", teamIds: ["tm_YWWKB6VYW1TWYWWKD6VYW1VQYW", "tm_Y7N59W7VHN0CY7N57W7VHMZHY7"] },
  { eventId: "evt_EDD65VQ9E9N0EDD63VQ9E9M5ED", teamIds: ["tm_TVGZGJFCJT9MTVGZJJFCJTAFTV", "tm_PGXXVHV935C1PGXXSHV935B6PG"] },
  { eventId: "evt_6F5FZVCZZHTY6F5G1VCZZHVS6F", teamIds: ["tm_490FYFV4C8XB490FWFV4C8WG49", "tm_ST6YEF7ATNHKST6YCF7ATNGRST"] },
  { eventId: "evt_P9KN6C4YTAVWP9KN4C4YTAV1P9", teamIds: ["tm_MKQJ36CMK808MKQJ16CMK7ZDMK", "tm_67FZXF65J0SV67FZZF65J0TP67"] },
  { eventId: "evt_ZJVS48S3XDP2ZJVS28S3XDN6ZJ", teamIds: ["tm_W71BADS3BN91W71BCDS3BN9XW7", "tm_JY0A0A7KCXX9JY09YA7KCXWEJY"] },
  { eventId: "evt_0QNQSAJJVFZZ0QNQQAJJVFZ40Q", teamIds: ["tm_ST6YEF7ATNHKST6YCF7ATNGRST", "tm_W71BADS3BN91W71BCDS3BN9XW7"] },
  { eventId: "evt_6GJ4YP5KWC146GJ4WP5KWC096G", teamIds: ["tm_67FZXF65J0SV67FZZF65J0TP67", "tm_490FYFV4C8XB490FWFV4C8WG49"] },
  { eventId: "evt_M7REQ6RM56T8M7RES6RM56V3M7", teamIds: ["tm_JY0A0A7KCXX9JY09YA7KCXWEJY", "tm_MKQJ36CMK808MKQJ16CMK7ZDMK"] },
  { eventId: "evt_QKEMF6X5K7T1QKEMH6X5K7TWQK", teamIds: ["tm_ST6YEF7ATNHKST6YCF7ATNGRST", "tm_MKQJ36CMK808MKQJ16CMK7ZDMK"] },
  { eventId: "evt_9Q7PP8NYVR0F9Q7PM8NYVQZM9Q", teamIds: ["tm_67FZXF65J0SV67FZZF65J0TP67", "tm_JY0A0A7KCXX9JY09YA7KCXWEJY"] },
  { eventId: "evt_TSKV2M1AWDVPTSKV0M1AWDTVTS", teamIds: ["tm_490FYFV4C8XB490FWFV4C8WG49", "tm_W71BADS3BN91W71BCDS3BN9XW7"] },
  { eventId: "evt_MPKWRK53QV1VMPKWTK53QV2PMP", teamIds: ["tm_W71BADS3BN91W71BCDS3BN9XW7", "tm_67FZXF65J0SV67FZZF65J0TP67"] },
  { eventId: "evt_F0ST547ED532F0ST747ED53YF0", teamIds: ["tm_MKQJ36CMK808MKQJ16CMK7ZDMK", "tm_490FYFV4C8XB490FWFV4C8WG49"] },
  { eventId: "evt_M767BAXHQ78EM767DAXHQ799M7", teamIds: ["tm_JY0A0A7KCXX9JY09YA7KCXWEJY", "tm_ST6YEF7ATNHKST6YCF7ATNGRST"] },
  { eventId: "evt_BDEXH8DCCJY4BDEXK8DCCJYZBD", teamIds: ["tm_JY0A0A7KCXX9JY09YA7KCXWEJY", "tm_490FYFV4C8XB490FWFV4C8WG49"] },
  { eventId: "evt_B4BZXMYS0GDXB4BZVMYS0GD2B4", teamIds: ["tm_67FZXF65J0SV67FZZF65J0TP67", "tm_ST6YEF7ATNHKST6YCF7ATNGRST"] },
  { eventId: "evt_5KCW1KEFJ0B05KCVZKEFJ0A55K", teamIds: ["tm_W71BADS3BN91W71BCDS3BN9XW7", "tm_MKQJ36CMK808MKQJ16CMK7ZDMK"] },
  { eventId: "evt_P8FP3D10YMJCP8FP5D10YMK7P8", teamIds: ["tm_YM59JRV9KA9HYM59GRV9KA8PYM", "tm_ESJ72M82SZECESJ74M82SZF7ES"] },
  { eventId: "evt_JTHE7M9TB41YJTHE5M9TB413JT", teamIds: ["tm_YM59JRV9KA9HYM59GRV9KA8PYM", "tm_ESJ72M82SZECESJ74M82SZF7ES"] },
  { eventId: "evt_XZNF6CTC2DD1XZNF8CTC2DDWXZ", teamIds: ["tm_030PARA1RYP1030PCRA1RYPW03", "tm_W9XJZMCB2E47W9XK1MCB2E52W9"] },
  { eventId: "evt_3854V2KN6RP43854X2KN6RPZ38", teamIds: ["tm_YWWKB6VYW1TWYWWKD6VYW1VQYW", "tm_Y7N59W7VHN0CY7N57W7VHMZHY7"] },
  { eventId: "evt_K5XYV537VXJTK5XYX537VXKNK5", teamIds: ["tm_TEQA79WSWY5GTEQA99WSWY6BTE"] },
  { eventId: "evt_61SP4437XDBZ61SP2437XDB461", teamIds: ["tm_VHSCCA6SE39HVHSCAA6SE38PVH", "tm_BDCJ960ZWVG6BDCJ760ZWVFBBD"] },
  { eventId: "evt_MMDBDWFY73FMMMDBBWFY73ESMM", teamIds: ["tm_4K4X0NQSCCDB4K4X2NQSCCE64K", "tm_VHSCCA6SE39HVHSCAA6SE38PVH"] },
  { eventId: "evt_MHCB04QT475QMHCB24QT476JMH", teamIds: ["tm_VHSCCA6SE39HVHSCAA6SE38PVH", "tm_4K4X0NQSCCDB4K4X2NQSCCE64K"] },
  { eventId: "evt_PYN4WCFYSGR3PYN4TCFYSGQ8PY", teamIds: ["tm_56YBRFV0285C56YBPFV0284H56"] },
  { eventId: "evt_4Z6S0ZV4SHB84Z6RYZV4SHAC4Z", teamIds: ["tm_43R35C2CTZPT43R33C2CTZNZ43", "tm_91VNVCC07Y3891VNSCC07Y2D91"] },
  { eventId: "evt_NRQTQQ871G1RNRQTNQ871G0XNR", teamIds: ["tm_TS1HF9NAEDTPTS1HD9NAEDSVTS", "tm_WVTXJT9KZ04QWVTXMT9KZ05KWV"] },
];

const athleteParticipation = [
  { eventId: "evt_2XWA16C4CB712XWA36C4CB7W2X", athleteIds: ["ath_8DAHGRY334558DAHJRY334608D", "ath_8Q94NQ3W2FRP8Q94KQ3W2FQV8Q", "ath_BYHYJ4HNNZ7YBYHYM4HNNZ8SBY"] },
  { eventId: "evt_8QNPM1627RQF8QNPJ1627RPM8Q", athleteIds: ["ath_N6W2GXXCXK50N6W2EXXCXK45N6", "ath_3F9D82MYJRPF3F9D62MYJRNM3F"] },
  { eventId: "evt_VH688P4QC0JKVH686P4QC0HQVH", athleteIds: ["ath_2XDY9NV3RD302XDY7NV3RD252X", "ath_1AAXPJG7W5SB1AAXRJG7W5T61A", "ath_3EW6ZYCVQC873EW71YCVQC923E"] },
  { eventId: "evt_EDD65VQ9E9N0EDD63VQ9E9M5ED", athleteIds: ["ath_VKTRT0PRSFGGVKTRR0PRSFFNVK"] },
  { eventId: "evt_4XSQZKBS4RDR4XSR1KBS4REM4X", athleteIds: ["ath_PKE2AMX10M3APKE28MX10M2FPK", "ath_TRXR02Z415Z0TRXQY2Z415Y5TR", "ath_K8V86MPDYJY0K8V84MPDYJX5K8"] },
  { eventId: "evt_P8FP3D10YMJCP8FP5D10YMK7P8", athleteIds: ["ath_WG635X9EQAS8WG633X9EQARDWG", "ath_ZXS5W10AYYXXZXS5T10AYYX2ZX", "ath_YFK5F337GWFDYFK5D337GWEJYF"] },
  { eventId: "evt_6F5FZVCZZHTY6F5G1VCZZHVS6F", athleteIds: ["ath_W8JCJFA1TQDTW8JCGFA1TQCZW8", "ath_3YCZHBJCC34X3YCZKBJCC35R3Y", "ath_9RQX1NYQJ1GK9RQX3NYQJ1HE9R", "ath_N2SNF28K7ZRSN2SND28K7ZQYN2"] },
  { eventId: "evt_P9KN6C4YTAVWP9KN4C4YTAV1P9", athleteIds: ["ath_AM39ZSNFBWD3AM3A1SNFBWDYAM", "ath_F4F365KAG0E3F4F345KAG0D8F4", "ath_8Z2C4AH31K5H8Z2C2AH31K4P8Z", "ath_TJRA41E55NE1TJRA61E55NEWTJ"] },
  { eventId: "evt_ZJVS48S3XDP2ZJVS28S3XDN6ZJ", athleteIds: ["ath_61J2QNK4N4ZR61J2SNK4N50K61", "ath_EZFG6D020D6QEZFG4D020D5WEZ", "ath_VM8N3ZX0V20TVM8N5ZX0V21NVM", "ath_8M9ATS4RV4JG8M9AWS4RV4KB8M"] },
  { eventId: "evt_0QNQSAJJVFZZ0QNQQAJJVFZ40Q", athleteIds: ["ath_9RQX1NYQJ1GK9RQX3NYQJ1HE9R", "ath_ZT6J0ZR4DE2AZT6J2ZR4DE35ZT", "ath_AD3VW963QAJNAD3VT963QAHTAD", "ath_EZFG6D020D6QEZFG4D020D5WEZ"] },
  { eventId: "evt_6GJ4YP5KWC146GJ4WP5KWC096G", athleteIds: ["ath_8Z2C4AH31K5H8Z2C2AH31K4P8Z", "ath_7X3PGM4VRY9Q7X3PEM4VRY8V7X", "ath_W8JCJFA1TQDTW8JCGFA1TQCZW8", "ath_61A2HR3PGMBV61A2KR3PGMCP61"] },
  { eventId: "evt_M7REQ6RM56T8M7RES6RM56V3M7", athleteIds: ["ath_VM8N3ZX0V20TVM8N5ZX0V21NVM", "ath_8M9ATS4RV4JG8M9AWS4RV4KB8M", "ath_AM39ZSNFBWD3AM3A1SNFBWDYAM", "ath_PR56RGM35V8APR56TGM35V96PR"] },
  { eventId: "evt_QKEMF6X5K7T1QKEMH6X5K7TWQK", athleteIds: ["ath_9RQX1NYQJ1GK9RQX3NYQJ1HE9R", "ath_Y3E3HXE00M28Y3E3KXE00M33Y3", "ath_F4F365KAG0E3F4F345KAG0D8F4", "ath_AM39ZSNFBWD3AM3A1SNFBWDYAM"] },
  { eventId: "evt_9Q7PP8NYVR0F9Q7PM8NYVQZM9Q", athleteIds: ["ath_8Z2C4AH31K5H8Z2C2AH31K4P8Z", "ath_TJRA41E55NE1TJRA61E55NEWTJ", "ath_VM8N3ZX0V20TVM8N5ZX0V21NVM", "ath_8M9ATS4RV4JG8M9AWS4RV4KB8M"] },
  { eventId: "evt_TSKV2M1AWDVPTSKV0M1AWDTVTS", athleteIds: ["ath_W8JCJFA1TQDTW8JCGFA1TQCZW8", "ath_MF6060GPA1VPMF6080GPA1WJMF", "ath_AD3VW963QAJNAD3VT963QAHTAD", "ath_61J2QNK4N4ZR61J2SNK4N50K61"] },
  { eventId: "evt_MPKWRK53QV1VMPKWTK53QV2PMP", athleteIds: ["ath_EZFG6D020D6QEZFG4D020D5WEZ", "ath_AD3VW963QAJNAD3VT963QAHTAD", "ath_8Z2C4AH31K5H8Z2C2AH31K4P8Z", "ath_7X3PGM4VRY9Q7X3PEM4VRY8V7X"] },
  { eventId: "evt_F0ST547ED532F0ST747ED53YF0", athleteIds: ["ath_F4F365KAG0E3F4F345KAG0D8F4", "ath_AM39ZSNFBWD3AM3A1SNFBWDYAM", "ath_W8JCJFA1TQDTW8JCGFA1TQCZW8", "ath_0TCAG4KSAX6B0TCAE4KSAX5G0T"] },
  { eventId: "evt_M767BAXHQ78EM767DAXHQ799M7", athleteIds: ["ath_VM8N3ZX0V20TVM8N5ZX0V21NVM", "ath_8M9ATS4RV4JG8M9AWS4RV4KB8M", "ath_9RQX1NYQJ1GK9RQX3NYQJ1HE9R", "ath_N2SNF28K7ZRSN2SND28K7ZQYN2"] },
  { eventId: "evt_BDEXH8DCCJY4BDEXK8DCCJYZBD", athleteIds: ["ath_VM8N3ZX0V20TVM8N5ZX0V21NVM", "ath_8M9ATS4RV4JG8M9AWS4RV4KB8M", "ath_3YCZHBJCC34X3YCZKBJCC35R3Y", "ath_7YGNAH8F083P7YGN8H8F082V7Y"] },
  { eventId: "evt_B4BZXMYS0GDXB4BZVMYS0GD2B4", athleteIds: ["ath_8Z2C4AH31K5H8Z2C2AH31K4P8Z", "ath_TJRA41E55NE1TJRA61E55NEWTJ", "ath_9RQX1NYQJ1GK9RQX3NYQJ1HE9R", "ath_ZT6J0ZR4DE2AZT6J2ZR4DE35ZT"] },
  { eventId: "evt_5KCW1KEFJ0B05KCVZKEFJ0A55K", athleteIds: ["ath_AD3VW963QAJNAD3VT963QAHTAD", "ath_EZFG6D020D6QEZFG4D020D5WEZ", "ath_AM39ZSNFBWD3AM3A1SNFBWDYAM", "ath_PR56RGM35V8APR56TGM35V96PR"] },
  { eventId: "evt_99F2HMZY9WNE99F2KMZY9WP999", athleteIds: ["ath_3CXXQC4658C23CXXSC4658CY3C", "ath_GB62VD6BEWWPGB62SD6BEWVVGB", "ath_XAWPJZKJB777XAWPMZKJB782XA", "ath_351FB7FV6WXY351F97FV6WX235", "ath_D7G4H9K3PZ0YD7G4H9K3PZ0Y1", "ath_S6T4O7R9E1M0S6T4O7R9E1M"] },
  { eventId: "evt_FV8J5N0W4TKYFV8J7N0W4TMTFV", athleteIds: ["ath_3CXXQC4658C23CXXSC4658CY3C", "ath_GB62VD6BEWWPGB62SD6BEWVVGB", "ath_5GCWSR7K02VZ5GCWVR7K02WT5G", "ath_27J8E524R71C27J8C524R70H27"] },
  { eventId: "evt_V8G6SJSJ109BV8G6QJSJ108GV8", athleteIds: ["ath_3T17JAP1V9GK3T17MAP1V9HE3T", "ath_Z60126046HCPZ60146046HDHZ6", "ath_351FB7FV6WXY351F97FV6WX235", "ath_GB62VD6BEWWPGB62SD6BEWVVGB", "ath_J1O8R2G5N4S6M3J1O8R2G5N4S", "ath_D7G4H9K3PZ0YD7G4H9K3PZ0Y1"] },
  { eventId: "evt_GTK793BPTEDSGTK773BPTECYGT", athleteIds: ["ath_N501XDCY6Q7JN501ZDCY6Q8DN5", "ath_SHPKTH0N4YPASHPKRH0N4YNFSH", "ath_32HDK9KWYYDY32HDH9KWYYD332"] },
  { eventId: "evt_DN6G73B8MR0EDN6G93B8MR1ADN", athleteIds: ["ath_Z60126046HCPZ60146046HDHZ6", "ath_3T17JAP1V9GK3T17MAP1V9HE3T", "ath_351FB7FV6WXY351F97FV6WX235"] },
  { eventId: "evt_PQ8AEN3PBCTYPQ8ACN3PBCT3PQ", athleteIds: ["ath_X98K12PHZKMFX98JZ2PHZKKMX9", "ath_EY474310H193EY472310H188EY", "ath_M3HFS2BYPBCEM3HFV2BYPBD9M3", "ath_SVANEWFBD59GSVANCWFBD58NSV"] },
  { eventId: "evt_GMFN1W2TYQMAGMFMZW2TYQKFGM", athleteIds: ["ath_SHPKTH0N4YPASHPKRH0N4YNFSH", "ath_X98K12PHZKMFX98JZ2PHZKKMX9", "ath_X84VB7CB30X2X84VD7CB30XXX8", "ath_32HDK9KWYYDY32HDH9KWYYD332"] },
  { eventId: "evt_RFV1ZNQTT2EHRFV21NQTT2FCRF", athleteIds: ["ath_X98K12PHZKMFX98JZ2PHZKKMX9", "ath_EY474310H193EY472310H188EY", "ath_32HDK9KWYYDY32HDH9KWYYD332", "ath_6SFYZ3KWDQ936SFZ13KWDQ9Y6S"] },
  { eventId: "evt_NMM7F1CJKH9ANMM7D1CJKH8FNM", athleteIds: ["ath_X98K12PHZKMFX98JZ2PHZKKMX9", "ath_EY474310H193EY472310H188EY", "ath_SCZX5C7936K7SCZX7C7936M2SC", "ath_11NDCYYCVB2A11NDEYYCVB3511"] },
  { eventId: "evt_VTDMCAG67WJMVTDMEAG67WKGVT", athleteIds: ["ath_GWKFA456YH73GWKFC456YH7YGW", "ath_SVANEWFBD59GSVANCWFBD58NSV", "ath_M3HFS2BYPBCEM3HFV2BYPBD9M3", "ath_X84VB7CB30X2X84VD7CB30XXX8"] },
  { eventId: "evt_F4GTVY6NXADAF4GTSY6NXACFF4", athleteIds: ["ath_GWKFA456YH73GWKFC456YH7YGW", "ath_SVANEWFBD59GSVANCWFBD58NSV", "ath_11NDCYYCVB2A11NDEYYCVB3511"] },
  { eventId: "evt_9MG0J575Q3KP9MG0M575Q3MH9M", athleteIds: ["ath_Z60126046HCPZ60146046HDHZ6", "ath_351FB7FV6WXY351F97FV6WX235", "ath_GWKFA456YH73GWKFC456YH7YGW", "ath_27J8E524R71C27J8C524R70H27"] },
  { eventId: "evt_T9XT4TT60NWTT9XT2TT60NVZT9", athleteIds: ["ath_11NDCYYCVB2A11NDEYYCVB3511", "ath_X84VB7CB30X2X84VD7CB30XXX8", "ath_M3HFS2BYPBCEM3HFV2BYPBD9M3"] },
  { eventId: "evt_8NH16RCQG9F88NH18RCQG9G38N", athleteIds: ["ath_351FB7FV6WXY351F97FV6WX235", "ath_9WJD29Q5R5579WJD09Q5R54C9W", "ath_5GCWSR7K02VZ5GCWVR7K02WT5G", "ath_Y3T2TTQH47A1Y3T2WTQH47AWY3"] },
  { eventId: "evt_QMSY4N3T5R2KQMSY6N3T5R3EQM", athleteIds: ["ath_X98K12PHZKMFX98JZ2PHZKKMX9", "ath_M3HFS2BYPBCEM3HFV2BYPBD9M3", "ath_SVANEWFBD59GSVANCWFBD58NSV", "ath_Z6F8B3R1QY5GZ6F8B3R1QY5G", "ath_W0L9P7X2MZ3AW0L9P7X2MZ3A"] },
  { eventId: "evt_HQZPQW301J3AHQZPSW301J45HQ", athleteIds: ["ath_SHPKTH0N4YPASHPKRH0N4YNFSH", "ath_X98K12PHZKMFX98JZ2PHZKKMX9", "ath_X84VB7CB30X2X84VD7CB30XXX8", "ath_32HDK9KWYYDY32HDH9KWYYD332", "ath_J1O8R2G5N4S6M3J1O8R2G5N4S"] },
  { eventId: "evt_QK4G9NQQ5E9SQK4G7NQQ5E8YQK", athleteIds: ["ath_EY474310H193EY472310H188EY", "ath_X98K12PHZKMFX98JZ2PHZKKMX9", "ath_32HDK9KWYYDY32HDH9KWYYD332", "ath_6SFYZ3KWDQ936SFZ13KWDQ9Y6S", "ath_W0L9P7X2MZ3AW0L9P7X2MZ3A", "ath_G7A3L2F9X1ZFG7A3L2F9X1Z", "ath_U3T9A4N5D2RSU3T9A4N5D2R"] },
  { eventId: "evt_JF7GD1C4DTVZJF7GF1C4DTWTJF", athleteIds: ["ath_EY474310H193EY472310H188EY", "ath_X98K12PHZKMFX98JZ2PHZKKMX9", "ath_SCZX5C7936K7SCZX7C7936M2SC", "ath_3T17JAP1V9GK3T17MAP1V9HE3T"] },
  { eventId: "evt_Z6KKEAGNVNXFZ6KKCAGNVNWMZ6", athleteIds: ["ath_GWKFA456YH73GWKFC456YH7YGW", "ath_SVANEWFBD59GSVANCWFBD58NSV", "ath_M3HFS2BYPBCEM3HFV2BYPBD9M3", "ath_X84VB7CB30X2X84VD7CB30XXX8"] },
  { eventId: "evt_BZ43SY67QKZZBZ43VY67QM0VBZ", athleteIds: ["ath_GWKFA456YH73GWKFC456YH7YGW", "ath_SVANEWFBD59GSVANCWFBD58NSV", "ath_11NDCYYCVB2A11NDEYYCVB3511"] },
  { eventId: "evt_8G4WW570EJ1S8G4WT570EJ0Y8G", athleteIds: ["ath_Z60126046HCPZ60146046HDHZ6", "ath_351FB7FV6WXY351F97FV6WX235", "ath_27J8E524R71C27J8C524R70H27", "ath_Y3T2TTQH47A1Y3T2WTQH47AWY3"] },
  { eventId: "evt_VDDVTTTB3GBTVDDVWTTB3GCNVD", athleteIds: ["ath_11NDCYYCVB2A11NDEYYCVB3511", "ath_X84VB7CB30X2X84VD7CB30XXX8", "ath_M3HFS2BYPBCEM3HFV2BYPBD9M3"] },
  { eventId: "evt_BTXG8RD5NWFVBTXG6RD5NWF0BT", athleteIds: ["ath_351FB7FV6WXY351F97FV6WX235", "ath_9WJD29Q5R5579WJD09Q5R54C9W", "ath_5GCWSR7K02VZ5GCWVR7K02WT5G", "ath_3T17JAP1V9GK3T17MAP1V9HE3T"] },
  { eventId: "evt_38JM576PBC5X38JM376PBC5138", athleteIds: ["ath_JJGT7QW30GEXJJGT5QW30GE2JJ", "ath_C5PX86HWNR3XC5PX66HWNR31C5", "ath_8E4ZJRXKW16M8E4ZMRXKW17F8E"] },
  { eventId: "evt_PH1C32ZAEK9TPH1C12ZAEK8ZPH", athleteIds: ["ath_8DAHGRY334558DAHJRY334608D", "ath_BYHYJ4HNNZ7YBYHYM4HNNZ8SBY", "ath_3F9D82MYJRPF3F9D62MYJRNM3F"] },
  { eventId: "evt_61SP4437XDBZ61SP2437XDB461", athleteIds: ["ath_6MJ3P7XNNGN26MJ3R7XNNGNX6M", "ath_8DAHGRY334558DAHJRY334608D"] },
  { eventId: "evt_YNX91GHP7HZJYNX93GHP7J0DYN", athleteIds: ["ath_V87M22C54VZVV87M02C54VZ0V8", "ath_8DAHGRY334558DAHJRY334608D"] },
  { eventId: "evt_MMDBDWFY73FMMMDBBWFY73ESMM", athleteIds: ["ath_6MJ3P7XNNGN26MJ3R7XNNGNX6M", "ath_FYQHY66M4ZFTFYQHW66M4ZEYFY"] },
  { eventId: "evt_MHCB04QT475QMHCB24QT476JMH", athleteIds: ["ath_6MJ3P7XNNGN26MJ3R7XNNGNX6M", "ath_FYQHY66M4ZFTFYQHW66M4ZEYFY"] },
  { eventId: "evt_PYN4WCFYSGR3PYN4TCFYSGQ8PY", athleteIds: ["ath_DET1K779X35XDET1N779X36RDE"] },
  { eventId: "evt_ZWXVXGXN286NZWXVZGXN287GZW", athleteIds: ["ath_W8JCJFA1TQDTW8JCGFA1TQCZW8", "ath_SVFJ6ZG3NJDBSVFJ8ZG3NJE6SV"] },
  { eventId: "evt_63Z5KSYR1HS763Z5HSYR1HRC63", athleteIds: ["ath_W8JCJFA1TQDTW8JCGFA1TQCZW8", "ath_SVFJ6ZG3NJDBSVFJ8ZG3NJE6SV"] },
  { eventId: "evt_8ZS6A4ATFMV38ZS684ATFMT88Z", athleteIds: ["ath_K46DDVFYGTG3K46DBVFYGTF8K4", "ath_S9FZ4914JG25S9FZ6914JG30S9"] },
  { eventId: "evt_FRE66085WGKMFRE68085WGMFFR", athleteIds: ["ath_Z7FYM0G9GJRNZ7FYJ0G9GJQTZ7"] },
  { eventId: "evt_HP7XPER2F1T2HP7XMER2F1S7HP", athleteIds: ["ath_YVS6E1G4V7ABYVS6G1G4V7B7YV", "ath_Q7XYPASR5VS7Q7XYMASR5VRCQ7"] },
  { eventId: "evt_5W50JA8F58AA5W50GA8F589F5W", athleteIds: ["ath_KDDNYYEXZPWWKDDP0YEXZPXQKD", "ath_YVS6E1G4V7ABYVS6G1G4V7B7YV"] },
  { eventId: "evt_3PEZFMACFEDB3PEZDMACFECF3P", athleteIds: ["ath_XVGXQ6Z4WMR4XVGXS6Z4WMRZXV", "ath_K9J3JW7THRATK9J3MW7THRBPK9"] },
  { eventId: "evt_DJADRY5W4PK9DJADTY5W4PM5DJ", athleteIds: ["ath_T06545873PQNT06565873PRGT0"] },
  { eventId: "evt_7N0YCT50QY527N0YAT50QY477N", athleteIds: ["ath_T06545873PQNT06565873PRGT0"] },
  { eventId: "evt_JTHE7M9TB41YJTHE5M9TB413JT", athleteIds: ["ath_WG635X9EQAS8WG633X9EQARDWG", "ath_ZXS5W10AYYXXZXS5T10AYYX2ZX", "ath_HH6SQ7JWPY1GHH6SS7JWPY2BHH"] },
  { eventId: "evt_3854V2KN6RP43854X2KN6RPZ38", athleteIds: ["ath_2XDY9NV3RD302XDY7NV3RD252X", "ath_X9X6HNM98RBMX9X6KNM98RCFX9", "ath_Z0CYM9RH764MZ0CYJ9RH763SZ0"] },
  { eventId: "evt_XZNF6CTC2DD1XZNF8CTC2DDWXZ", athleteIds: ["ath_BYHYJ4HNNZ7YBYHYM4HNNZ8SBY", "ath_N6W2GXXCXK50N6W2EXXCXK45N6", "ath_V8TERW1F6792V8TETW1F679XV8"] },
  { eventId: "evt_4ZBW6B80M93X4ZBW4B80M9324Z", athleteIds: ["ath_K46DDVFYGTG3K46DBVFYGTF8K4", "ath_S9FZ4914JG25S9FZ6914JG30S9", "ath_K8V86MPDYJY0K8V84MPDYJX5K8"] },
  { eventId: "evt_K5XYV537VXJTK5XYX537VXKNK5", athleteIds: ["ath_MDMWEMWZAWB3MDMWGMWZAWBYMD", "ath_SBTJ3VSZW7QDSBTJ1VSZW7PHSB", "ath_V87M22C54VZVV87M02C54VZ0V8"] },
  { eventId: "evt_REJS8WGQF36TREJSAWGQF37NRE", athleteIds: ["ath_194F5AQVZDXY194F7AQVZDYS19", "ath_ASH52VT7Z0NPASH50VT7Z0MVAS", "ath_0YHPN79Y60960YHPQ79Y60A10Y"] },
  { eventId: "evt_8DN7TR6F0JZZ8DN7RR6F0JZ38D", athleteIds: ["ath_W8JCJFA1TQDTW8JCGFA1TQCZW8", "ath_SVFJ6ZG3NJDBSVFJ8ZG3NJE6SV"] },
  { eventId: "evt_A8WV3SQD4YPEA8WV5SQD4YQ9A8", athleteIds: ["ath_W8JCJFA1TQDTW8JCGFA1TQCZW8", "ath_SVFJ6ZG3NJDBSVFJ8ZG3NJE6SV"] },
  { eventId: "evt_KBXT96B0KXPNKBXT76B0KXNSKB", athleteIds: ["ath_XCRSKKCM3DCHXCRSNKCM3DDDXC"] },
  { eventId: "evt_GQS1JYKF9B8HGQS1MYKF9B9CGQ", athleteIds: ["ath_6BABK0E93QDK6BABN0E93QEE6B"] },
  { eventId: "evt_RCXRKTE1ZD5MRCXRHTE1ZD4SRC", athleteIds: ["ath_N7C474004NVDN7C494004NW8N7"] },
  { eventId: "evt_PNGZE4BSGTWPPNGZC4BSGTVVPN", athleteIds: ["ath_TA6WM2YK8XY9TA6WJ2YK8XXETA"] },
  { eventId: "evt_NKZN0BGCCKPXNKZN2BGCCKQRNK", athleteIds: ["ath_W9Y4X8F0XBNFW9Y4V8F0XBMMW9"] },
  { eventId: "evt_1J72EK830Y6G1J72CK830Y5N1J", athleteIds: ["ath_VAGZW3PQB2RJVAGZT3PQB2QQVA"] },
  { eventId: "evt_C2BNA4S1XTT4C2BNC4S1XTTZC2", athleteIds: ["ath_0MV0SPE9DTFT0MV0VPE9DTGN0M"] },
  { eventId: "evt_07GCYASQ1FC307GD0ASQ1FCY07", athleteIds: ["ath_7W7N9E4RCHHW7W7NBE4RCHJQ7W"] },
  { eventId: "evt_TNNNYRQFVKSVTNNNWRQFVKS0TN", athleteIds: ["ath_FX1YTZBV3PG1FX1YRZBV3PF6FX"] },
  { eventId: "evt_TPV6NW8D17E4TPV6KW8D17D9TP", athleteIds: ["ath_DMCZJ6P7TQE9DMCZM6P7TQF4DM"] },
  { eventId: "evt_67VVB4KZT9VZ67VVD4KZT9WT67", athleteIds: ["ath_RFPYMC7WK10GRFPYJC7WK0ZNRF"] },
  { eventId: "evt_1J2862J9H2BJ1J2842J9H2AP1J", athleteIds: ["ath_WQ1CN57PQNGXWQ1CQ57PQNHRWQ"] },
  { eventId: "evt_397V35GZ417T397V55GZ418P39", athleteIds: ["ath_7V7QPYY5WZJ47V7QRYY5WZJZ7V"] },
];

const eventInsights = {
  "evt_2XWA16C4CB712XWA36C4CB7W2X": {
    headline: "Un duel tactique decide dans les derniers instants.",
    highlights: ["But à la 95e", "Duel xG 2.4 vs 2.1", "Homme du match: Vinicius Jr."],
    tags: ["Excitant", "OH OUI GREG", "Catastrophe"],
  },
  "evt_VH688P4QC0JKVH686P4QC0HQVH": {
    headline: "Un classique de playoffs rempli de runs et d'intensite defensive.",
    highlights: ["Ecart de 28 points", "Tirs clutch dans le 4e", "88 possessions"],
    tags: ["Opi", "Mbappéisé", "Foufou"],
  },
  "evt_4XSQZKBS4RDR4XSR1KBS4REM4X": {
    headline: "Un marathon sur terre battue avec des bascules de rythme.",
    highlights: ["Match en 4 sets", "42 coups gagnants", "3h18 de jeu"],
    tags: ["Omi", "Nimportequoi", "Banger"],
  },
  "evt_P8FP3D10YMJCP8FP5D10YMK7P8": {
    headline: "Des choix d'arrets qui ont dessine la course en ville.",
    highlights: ["Safety car décisif", "Arrêt 2.1s", "Première ligne verrouillée"],
    tags: ["OH OUI GREG", "Rince", "Catastrophe"],
  },
  "evt_8QNPM1627RQF8QNPJ1627RPM8Q": {
    headline: "Un choc pour le titre avec une enorme pression.",
    highlights: ["Sommet du classement", "Pressing intense", "Ambiance derby"],
    tags: ["Excitant", "Lunaire", "Mbappéisé"],
  },
  "evt_63Z5KSYR1HS763Z5HSYR1HRC63": {
    headline: "Un test international très physique avec une fin folle.",
    highlights: ["Domination en melee", "14 points en 10 minutes", "Carton jaune"],
    tags: ["Opi", "Sale", "On en reparle"],
  },
  "evt_EDD65VQ9E9N0EDD63VQ9E9M5ED": {
    headline: "Un show de rythme, précision, et adresse.",
    highlights: ["Leader en double double", "Impact du banc", "Serie au 4e"],
    tags: ["Foufou", "Electrique", "Epic"],
  },
  "evt_99F2HMZY9WNE99F2KMZY9WP999": {
    headline: "Une etape de montagne pour les grimpeurs et les attaques.",
    highlights: ["Arrivée en altitude", "Col hors catégorie", "Jour décisif"],
    tags: ["Catastrophe", "Ca va partir", "Banger"],
  },
  "evt_FV8J5N0W4TKYFV8J7N0W4TMTFV": {
    headline: "Une etape pyreneenne tailee pour les offensives.",
    highlights: ["Deux cols hors catégorie", "Derniere ascension decisive", "Ecarts attendus"],
    tags: ["Mbappéisé", "Nimportequoi", "Omi"],
  },
  "evt_V8G6SJSJ109BV8G6QJSJ108GV8": {
    headline: "Un contre-la-montre pour renverser le general.",
    highlights: ["Parcours technique", "Difference de watts", "Minuteurs sous pression"],
    tags: ["Lunaire", "OH OUI GREG", "Excitant"],
  },
  "evt_4Z6S0ZV4SHB84Z6RYZV4SHAC4Z": {
    headline: "Un match de championnat rythme, avec des buts et des temps forts.",
    highlights: ["Pressing agressif", "Temps forts des deux équipes", "Public en feu"],
    tags: ["Opi", "Foufou", "Rince"],
  },
  "evt_NRQTQQ871G1RNRQTNQ871G0XNR": {
    headline: "Une finale tendue qui a bascule sur des details.",
    highlights: ["Finale nationale", "Moments décisifs", "Tension jusqu'au bout"],
    tags: ["Catastrophe", "Banger", "On en reparle"],
  },
  "evt_GTK793BPTEDSGTK773BPTECYGT": {
    headline: "Une etape d'ouverture nerveuse avec un sprint tranchant.",
    highlights: ["Sprint massif", "Vitesse finale", "Arrivee technique"],
    tags: ["Omi", "Sale", "Mbappéisé"],
  },
  "evt_DN6G73B8MR0EDN6G93B8MR1ADN": {
    headline: "Un chrono qui a teste les jambes et la précision.",
    highlights: ["Parcours rapide", "Gains au chrono", "Spécialistes en action"],
    tags: ["Excitant", "Nimportequoi", "OH OUI GREG"],
  },
  "evt_38JM576PBC5X38JM376PBC5138": {
    headline: "Une carte enorme avec des finishes et des surprises.",
    highlights: ["Défense de ceinture", "Fin éclair", "Soumission de la nuit"],
    tags: ["Foufou", "Catastrophe", "Opi"],
  },
};

const baseReviewSamples = [
  {
    id: "rev_YTYBDA1BW1W0YTYBBA1BW1V5YT",
    eventId: "evt_2XWA16C4CB712XWA36C4CB7W2X",
    userId: "usr_2SGNEH2HBH7S2SGNCH2HBH6Y2S",
    author: "Diego M.",
    rating: 5,
    note: "Tension tout le match et un final digne d'une finale. Pur drame.",
    likes: 128,
  },
  {
    id: "rev_VNHMBA0XPBENVNHMDA0XPBFHVN",
    eventId: "evt_2XWA16C4CB712XWA36C4CB7W2X",
    userId: "usr_ZZG4WXPGSFTZZZG4TXPGSFT4ZZ",
    author: "Nina P.",
    rating: 4,
    note: "Bataille au milieu pendant 80 minutes puis chaos. Ambiance folle.",
    likes: 84,
  },
  {
    id: "rev_ZPVBFKTBARYKZPVBHKTBARZEZP",
    eventId: "evt_VH688P4QC0JKVH686P4QC0HQVH",
    userId: "usr_WCPDCEC9K78HWCPDEEC9K79CWC",
    author: "Marcus L.",
    rating: 5,
    note: "Serie après serie. Le quatrieme quart etait dingue.",
    likes: 142,
  },
  {
    id: "rev_31BVTTQW7G9131BVWTQW7G9W31",
    eventId: "evt_P8FP3D10YMJCP8FP5D10YMK7P8",
    userId: "usr_1Y8A7RTBXKQ71Y8A5RTBXKPC1Y",
    author: "Elle R.",
    rating: 4,
    note: "Course de strategie mais tension constante. Drame aux stands.",
    likes: 76,
  },
  {
    id: "rev_34TTAXM7APXQ34TT8XM7APWW34",
    eventId: "evt_99F2HMZY9WNE99F2KMZY9WP999",
    userId: "usr_KHHE5RBM3W4HKHHE7RBM3W5CKH",
    author: "Louise B.",
    rating: 5,
    note: "Etape parfaite pour les grimpeurs. Les attaques vont fuser.",
    likes: 101,
  },
  {
    id: "rev_48AW0XMCDHCQ48AW2XMCDHDJ48",
    eventId: "evt_FV8J5N0W4TKYFV8J7N0W4TMTFV",
    userId: "usr_B2E0M1X3B939B2E0P1X3B944B2",
    author: "Jamal T.",
    rating: 4,
    note: "Jour parfait pour les offensives. Les ecarts peuvent exploser.",
    likes: 62,
  },
  {
    id: "rev_5CWQ6XMHQG9R5CWQ4XMHQG8X5C",
    eventId: "evt_V8G6SJSJ109BV8G6QJSJ108GV8",
    userId: "usr_KHHE5RBM3W4HKHHE7RBM3W5CKH",
    author: "Louise B.",
    rating: 4,
    note: "Tout peut basculer sur le chrono. Suspense total.",
    likes: 54,
  },
  {
    id: "rev_87MKF78V3ZBM87MKD78V3ZAS87",
    eventId: "evt_38JM576PBC5X38JM376PBC5138",
    userId: "usr_E3GXNGXY98Y8E3GXQGXY98Z3E3",
    author: "Riley K.",
    rating: 4,
    note: "Tellement de finishes. Le public etait électrique.",
    likes: 96,
  },
  {
    id: "rev_3A7M248S48B83A7M448S48C33A",
    eventId: "evt_7CY3Q2W40JDW7CY3S2W40JEQ7C",
    userId: "usr_ZZG4WXPGSFTZZZG4TXPGSFT4ZZ",
    author: "Nina P.",
    rating: 9,
    note: "Derby intense, du rythme et un stade en fusion.",
    likes: 142,
  },
  {
    id: "rev_6FM344979VBV6FM324979VB06F",
    eventId: "evt_KC99T85TMTS1KC99R85TMTR6KC",
    userId: "usr_WCPDCEC9K78HWCPDEEC9K79CWC",
    author: "Marcus L.",
    rating: 7,
    note: "Beaucoup de jeu au milieu, deux équipes bien en place.",
    likes: 78,
  },
  {
    id: "rev_5BXHY4925PYF5BXJ04925PZA5B",
    eventId: "evt_1RSV13C470791RSTZ3C4706E1R",
    userId: "usr_2SGNEH2HBH7S2SGNCH2HBH6Y2S",
    author: "Diego M.",
    rating: 8,
    note: "Un match ouvert, des transitions rapides tout le long.",
    likes: 121,
  },
  {
    id: "rev_8R3H049HSG9A8R3GY49HSG8F8R",
    eventId: "evt_TGNXVAR7Y8AETGNXSAR7Y89KTG",
    userId: "usr_KHHE5RBM3W4HKHHE7RBM3W5CKH",
    author: "Louise B.",
    rating: 8,
    note: "Tactique, intense, et un final renverse.",
    likes: 115,
  },
  {
    id: "rev_7KZ6T49CJCXQ7KZ6W49CJCYK7K",
    eventId: "evt_7HMMM3WBF9WE7HMMP3WBF9XA7H",
    userId: "usr_1Y8A7RTBXKQ71Y8A5RTBXKPC1Y",
    author: "Elle R.",
    rating: 7,
    note: "Match serré, details décisifs.",
    likes: 89,
  },
  {
    id: "rev_ASBXW49TR3B2ASBXT49TR3A7AS",
    eventId: "evt_T6KH5M27VA2TT6KH7M27VA3NT6",
    userId: "usr_B2E0M1X3B939B2E0P1X3B944B2",
    author: "Jamal T.",
    rating: 8,
    note: "Solide et maitrise, un vrai match de haut niveau.",
    likes: 94,
  },
  {
    id: "rev_9VKJP49PWARA9VKJR49PWAS59V",
    eventId: "evt_FFF4H834S2XRFFF4K834S2YKFF",
    userId: "usr_E3GXNGXY98Y8E3GXQGXY98Z3E3",
    author: "Riley K.",
    rating: 8,
    note: "Derby d'Italie tendu, intensite maximale.",
    likes: 110,
  },
  {
    id: "rev_VMY2R47P6FXRVMY2P47P6FWWVM",
    eventId: "evt_921K67TARQ00921K87TARQ0V92",
    userId: "usr_ZZG4WXPGSFTZZZG4TXPGSFT4ZZ",
    author: "Nina P.",
    rating: 7,
    note: "Beaucoup de rythme et un final a couper le souffle.",
    likes: 86,
  },
  {
    id: "rev_TQK8J47JDJWDTQK8M47JDJX8TQ",
    eventId: "evt_CABWJFT20MR1CABWMFT20MRWCA",
    userId: "usr_2SGNEH2HBH7S2SGNCH2HBH6Y2S",
    author: "Diego M.",
    rating: 9,
    note: "Le Klassiker a tenu toutes ses promesses.",
    likes: 150,
  },
  {
    id: "rev_ERG403EH6PCPERG423EH6PDHER",
    eventId: "evt_0DNPTTHJZ3PA0DNPWTHJZ3Q50D",
    userId: "usr_WCPDCEC9K78HWCPDEEC9K79CWC",
    author: "Marcus L.",
    rating: 7,
    note: "Compact, propre, une bataille tactique.",
    likes: 72,
  },
  {
    id: "rev_FWME63EPDSR8FWME43EPDSQDFW",
    eventId: "evt_N77DQVEGTZC7N77DSVEGTZD2N7",
    userId: "usr_KHHE5RBM3W4HKHHE7RBM3W5CKH",
    author: "Louise B.",
    rating: 8,
    note: "Gros niveau, deux équipes qui se rendent coup pour coup.",
    likes: 101,
  },
  {
    id: "rev_H0ZHW3EVPBA5H0ZHY3EVPBB0H0",
    eventId: "evt_Q86RHGF5AQV3Q86RKGF5AQVYQ8",
    userId: "usr_1Y8A7RTBXKQ71Y8A5RTBXKPC1Y",
    author: "Elle R.",
    rating: 8,
    note: "Classique portugais chaud bouillant.",
    likes: 96,
  },
  {
    id: "rev_J4PB23F0TK49J4PB03F0TK3EJ4",
    eventId: "evt_B6XHF0GMEZAFB6XHD0GMEZ9MB6",
    userId: "usr_B2E0M1X3B939B2E0P1X3B944B2",
    author: "Jamal T.",
    rating: 7,
    note: "Match propre, execution clinique.",
    likes: 66,
  },
  {
    id: "rev_K91ER3F634P5K91ET3F634Q1K9",
    eventId: "evt_ZCT5C8M82F7ZZCT5A8M82F74ZC",
    userId: "usr_E3GXNGXY98Y8E3GXQGXY98Z3E3",
    author: "Riley K.",
    rating: 8,
    note: "Derby total, des occasions partout.",
    likes: 108,
  },
  {
    id: "rev_M6C8Y3F9W1QGM6C8W3F9W1PNM6",
    eventId: "evt_2EK73ZGQN6VP2EK75ZGQN6WJ2E",
    userId: "usr_ZZG4WXPGSFTZZZG4TXPGSFT4ZZ",
    author: "Nina P.",
    rating: 7,
    note: "Solide defensivement, mais suspense jusqu'au bout.",
    likes: 74,
  },
  {
    id: "rev_N9W2M3FEYRSRN9W2P3FEYRTKN9",
    eventId: "evt_8HCBVDH6HB308HCBSDH6HB258H",
    userId: "usr_2SGNEH2HBH7S2SGNCH2HBH6Y2S",
    author: "Diego M.",
    rating: 9,
    note: "Superclasico electrise, un match de legende.",
    likes: 162,
  },
  {
    id: "rev_PEE5T3FM8V3GPEE5R3FM8V2NPE",
    eventId: "evt_Q2W4Y39HESBVQ2W5039HESCPQ2",
    userId: "usr_WCPDCEC9K78HWCPDEEC9K79CWC",
    author: "Marcus L.",
    rating: 8,
    note: "Ambiance folle, tension jusqu'à la derniere minute.",
    likes: 119,
  },
  {
    id: "rev_65VRG3DAG0XV65VRJ3DAG0YP65",
    eventId: "evt_H9E6FJJ31RGMH9E6HJJ31RHFH9",
    userId: "usr_KHHE5RBM3W4HKHHE7RBM3W5CKH",
    author: "Louise B.",
    rating: 8,
    note: "Old Firm au sommet, rythme et intensite.",
    likes: 112,
  },
  {
    id: "rev_7A02P3DFQ49E7A02M3DFQ48J7A",
    eventId: "evt_QREZH000NGCEQREZF000NGBKQR",
    userId: "usr_1Y8A7RTBXKQ71Y8A5RTBXKPC1Y",
    author: "Elle R.",
    rating: 6,
    note: "Match ferme, mais le but a tout change.",
    likes: 58,
  },
  {
    id: "rev_5FD8R9CSZ8VG5FD8P9CSZ8TM5F",
    eventId: "evt_41WD5WN90AS241WD7WN90ASX41",
    userId: "usr_B2E0M1X3B939B2E0P1X3B944B2",
    author: "Jamal T.",
    rating: 8,
    note: "Derby de Rome intense, emotion du début à la fin.",
    likes: 126,
  },
  {
    id: "rev_KHWQP67Z18SAKHWQR67Z18T6KH",
    eventId: "evt_PQ8AEN3PBCTYPQ8ACN3PBCT3PQ",
    userId: "usr_KHHE5RBM3W4HKHHE7RBM3W5CKH",
    author: "Louise B.",
    rating: 8,
    note: "Des graviers partout, j'ai eu de la poussiere dans le salon.",
    likes: 104,
  },
  {
    id: "rev_PQ9ER68D6Z6NPQ9EP68D6Z5TPQ",
    eventId: "evt_GMFN1W2TYQMAGMFMZW2TYQKFGM",
    userId: "usr_2SGNEH2HBH7S2SGNCH2HBH6Y2S",
    author: "Diego M.",
    rating: 9,
    note: "Six heures d'attente pour 30 secondes de chaos: parfait.",
    likes: 151,
  },
  {
    id: "rev_NJQKJ687X09NNJQKM687X0AGNJ",
    eventId: "evt_RFV1ZNQTT2EHRFV21NQTT2FCRF",
    userId: "usr_ZZG4WXPGSFTZZZG4TXPGSFT4ZZ",
    author: "Nina P.",
    rating: 9,
    note: "Des paves, des murs, et mes cris dans le salon.",
    likes: 138,
  },
  {
    id: "rev_G5FQ467FBXVDG5FQ267FBXTJG5",
    eventId: "evt_NMM7F1CJKH9ANMM7D1CJKH8FNM",
    userId: "usr_WCPDCEC9K78HWCPDEEC9K79CWC",
    author: "Marcus L.",
    rating: 9,
    note: "La Reine des classiques m'a secoue le canape.",
    likes: 167,
  },
  {
    id: "rev_F84WY67BK0T3F84X067BK0TYF8",
    eventId: "evt_VTDMCAG67WJMVTDMEAG67WKGVT",
    userId: "usr_1Y8A7RTBXKQ71Y8A5RTBXKPC1Y",
    author: "Elle R.",
    rating: 8,
    note: "La course qui monte, descend, puis remonte encore.",
    likes: 96,
  },
  {
    id: "rev_JDHM067SRQ7EJDHKY67SRQ6KJD",
    eventId: "evt_F4GTVY6NXADAF4GTSY6NXACFF4",
    userId: "usr_B2E0M1X3B939B2E0P1X3B944B2",
    author: "Jamal T.",
    rating: 7,
    note: "Mur de Huy: j'ai monte l'escalier au meme rythme.",
    likes: 82,
  },
  {
    id: "rev_H9TTT67MMFDAH9TTW67MMFE5H9",
    eventId: "evt_9MG0J575Q3KP9MG0M575Q3MH9M",
    userId: "usr_E3GXNGXY98Y8E3GXQGXY98Z3E3",
    author: "Riley K.",
    rating: 8,
    note: "La Doyenne a rappelle pourquoi je rate mes dimanches.",
    likes: 121,
  },
  {
    id: "rev_BWK6C66W3GBTBWK6A66W3GAZBW",
    eventId: "evt_T9XT4TT60NWTT9XT2TT60NVZT9",
    userId: "usr_KHHE5RBM3W4HKHHE7RBM3W5CKH",
    author: "Louise B.",
    rating: 7,
    note: "Le soleil, la côté, le final qui pique.",
    likes: 73,
  },
  {
    id: "rev_ARET666PWC52ARET866PWC5XAR",
    eventId: "evt_8NH16RCQG9F88NH18RCQG9G38N",
    userId: "usr_2SGNEH2HBH7S2SGNCH2HBH6Y2S",
    author: "Diego M.",
    rating: 8,
    note: "Les feuilles tombent, moi aussi après ce finish.",
    likes: 109,
  },
  {
    id: "rev_0X8Z5C9NFEMY0X8Z7C9NFENS0X",
    eventId: "evt_6F5FZVCZZHTY6F5G1VCZZHVS6F",
    userId: "usr_KHHE5RBM3W4HKHHE7RBM3W5CKH",
    author: "Louise B.",
    rating: 8,
    note: "Le début a ete brutal, puis un final qui fait lever du canape.",
    likes: 92,
  },
  {
    id: "rev_ZRXVFC9G6X31ZRXVDC9G6X26ZR",
    eventId: "evt_P9KN6C4YTAVWP9KN4C4YTAV1P9",
    userId: "usr_WCPDCEC9K78HWCPDEEC9K79CWC",
    author: "Marcus L.",
    rating: 8,
    note: "Crunch pas comme les autrès, défense enorme et suspense.",
    likes: 101,
  },
  {
    id: "rev_YVK19C9CE01QYVK1BC9CE02JYV",
    eventId: "evt_ZJVS48S3XDP2ZJVS28S3XDN6ZJ",
    userId: "usr_ZZG4WXPGSFTZZZG4TXPGSFT4ZZ",
    author: "Nina P.",
    rating: 7,
    note: "Du rythme, quelques folies, et un public bien chaud.",
    likes: 68,
  },
  {
    id: "rev_6AQK3CAE1YE96AQK1CAE1YDE6A",
    eventId: "evt_0QNQSAJJVFZZ0QNQQAJJVFZ40Q",
    userId: "usr_2SGNEH2HBH7S2SGNCH2HBH6Y2S",
    author: "Diego M.",
    rating: 8,
    note: "Maitrise totale, mais une fin qui a fait peur.",
    likes: 85,
  },
  {
    id: "rev_565QXCA8QZH9565QZCA8QZJ456",
    eventId: "evt_6GJ4YP5KWC146GJ4WP5KWC096G",
    userId: "usr_1Y8A7RTBXKQ71Y8A5RTBXKPC1Y",
    author: "Elle R.",
    rating: 8,
    note: "Rythme eleve et quelques moments dingues.",
    likes: 88,
  },
  {
    id: "rev_49F67CA53BCH49F65CA53BBP49",
    eventId: "evt_M7REQ6RM56T8M7RES6RM56V3M7",
    userId: "usr_B2E0M1X3B939B2E0P1X3B944B2",
    author: "Jamal T.",
    rating: 7,
    note: "Angleterre solide, mais l'Italie a fait douter tout le monde.",
    likes: 63,
  },
  {
    id: "rev_2BQ69X9CHQJW2BQ6BX9CHQKQ2B",
    eventId: "evt_2XWA16C4CB712XWA36C4CB7W2X",
    userId: "usr_2SGNEH2HBH7S2SGNCH2HBH6Y2S",
    author: "Diego M.",
    rating: 8,
    note: "J'ai rate le début, mais le finish m'a reveille.",
    likes: 20,
  },
  {
    id: "rev_W2DMP9RD3A4QW2DMM9RD3A3WW2",
    eventId: "evt_VH688P4QC0JKVH686P4QC0HQVH",
    userId: "usr_ZZG4WXPGSFTZZZG4TXPGSFT4ZZ",
    author: "Nina P.",
    rating: 7,
    note: "Ce match m'a fait oublier ou etait la telecommande.",
    likes: 23,
  },
  {
    id: "rev_ZTGF6A53YX1BZTGF8A53YX26ZT",
    eventId: "evt_4XSQZKBS4RDR4XSR1KBS4REM4X",
    userId: "usr_WCPDCEC9K78HWCPDEEC9K79CWC",
    author: "Marcus L.",
    rating: 9,
    note: "On dirait un scenario ecrit par un fan trop motive.",
    likes: 26,
  },
  {
    id: "rev_VQ7XXQCKDASQVQ7XZQCKDATJVQ",
    eventId: "evt_P8FP3D10YMJCP8FP5D10YMK7P8",
    userId: "usr_1Y8A7RTBXKQ71Y8A5RTBXKPC1Y",
    author: "Elle R.",
    rating: 8,
    note: "J'ai perdu la voix avant la fin.",
    likes: 29,
  },
  {
    id: "rev_98D3Z80B3BBC98D3X80B3BAG98",
    eventId: "evt_8QNPM1627RQF8QNPJ1627RPM8Q",
    userId: "usr_B2E0M1X3B939B2E0P1X3B944B2",
    author: "Jamal T.",
    rating: 7,
    note: "Si c'etait un film, j'aurais demande la suite.",
    likes: 32,
  },
  {
    id: "rev_23VBAHSCHF2Q23VBCHSCHF3J23",
    eventId: "evt_63Z5KSYR1HS763Z5HSYR1HRC63",
    userId: "usr_E3GXNGXY98Y8E3GXQGXY98Z3E3",
    author: "Riley K.",
    rating: 9,
    note: "Je voulais dormir, le match a dit non.",
    likes: 35,
  },
  {
    id: "rev_NW4DGS07R92JNW4DES07R91QNW",
    eventId: "evt_EDD65VQ9E9N0EDD63VQ9E9M5ED",
    userId: "usr_KHHE5RBM3W4HKHHE7RBM3W5CKH",
    author: "Louise B.",
    rating: 8,
    note: "Mon chien a applaudi, c'est dire.",
    likes: 38,
  },
  {
    id: "rev_D29M36ETCDW8D29M56ETCDX3D2",
    eventId: "evt_99F2HMZY9WNE99F2KMZY9WP999",
    userId: "usr_2SGNEH2HBH7S2SGNCH2HBH6Y2S",
    author: "Diego M.",
    rating: 7,
    note: "Plus d'action que ma semaine entiere.",
    likes: 41,
  },
  {
    id: "rev_KCEKQ6FPKF8TKCEKS6FPKF9NKC",
    eventId: "evt_FV8J5N0W4TKYFV8J7N0W4TMTFV",
    userId: "usr_ZZG4WXPGSFTZZZG4TXPGSFT4ZZ",
    author: "Nina P.",
    rating: 9,
    note: "Je pensais regarder 5 minutes. Spoiler: non.",
    likes: 44,
  },
  {
    id: "rev_Z1B2B48E3NR3Z1B2948E3NQ8Z1",
    eventId: "evt_V8G6SJSJ109BV8G6QJSJ108GV8",
    userId: "usr_WCPDCEC9K78HWCPDEEC9K79CWC",
    author: "Marcus L.",
    rating: 8,
    note: "La tension etait a 200%, mon cafe aussi.",
    likes: 20,
  },
  {
    id: "rev_E8HX9CSYEVEGE8HX7CSYEVDNE8",
    eventId: "evt_38JM576PBC5X38JM376PBC5138",
    userId: "usr_1Y8A7RTBXKQ71Y8A5RTBXKPC1Y",
    author: "Elle R.",
    rating: 7,
    note: "Mon voisin a sonne, je n'ai pas repondu.",
    likes: 23,
  },
  {
    id: "rev_K43YMCYC7XV0K43YJCYC7XT5K4",
    eventId: "evt_PH1C32ZAEK9TPH1C12ZAEK8ZPH",
    userId: "usr_B2E0M1X3B939B2E0P1X3B944B2",
    author: "Jamal T.",
    rating: 9,
    note: "C'etait le chaos, mais du beau chaos.",
    likes: 26,
  },
  {
    id: "rev_8SWK1C81QQ058SWJZC81QPZA8S",
    eventId: "evt_61SP4437XDBZ61SP2437XDB461",
    userId: "usr_E3GXNGXY98Y8E3GXQGXY98Z3E3",
    author: "Riley K.",
    rating: 8,
    note: "Je me suis leve 12 fois du canape.",
    likes: 29,
  },
  {
    id: "rev_QP2TGQMN4MKSQP2TJQMN4MMMQP",
    eventId: "evt_YNX91GHP7HZJYNX93GHP7J0DYN",
    userId: "usr_KHHE5RBM3W4HKHHE7RBM3W5CKH",
    author: "Louise B.",
    rating: 7,
    note: "Ce match avait un bouton turbo.",
    likes: 32,
  },
  {
    id: "rev_RDR1R0P53N82RDR1P0P53N77RD",
    eventId: "evt_MMDBDWFY73FMMMDBBWFY73ESMM",
    userId: "usr_2SGNEH2HBH7S2SGNCH2HBH6Y2S",
    author: "Diego M.",
    rating: 9,
    note: "J'ai crie, puis j'ai ri, puis j'ai crie encore.",
    likes: 35,
  },
  {
    id: "rev_J6PWKNH188J7J6PWNNH188K2J6",
    eventId: "evt_MHCB04QT475QMHCB24QT476JMH",
    userId: "usr_ZZG4WXPGSFTZZZG4TXPGSFT4ZZ",
    author: "Nina P.",
    rating: 8,
    note: "J'ai change de place 3 fois, ca a marche.",
    likes: 38,
  },
  {
    id: "rev_25E4GGPE7P4R25E4EGPE7P3X25",
    eventId: "evt_PYN4WCFYSGR3PYN4TCFYSGQ8PY",
    userId: "usr_WCPDCEC9K78HWCPDEEC9K79CWC",
    author: "Marcus L.",
    rating: 7,
    note: "Un événement parfait pour user le replay.",
    likes: 41,
  },
  {
    id: "rev_2F6JWM9AE8P62F6JYM9AE8Q12F",
    eventId: "evt_ZWXVXGXN286NZWXVZGXN287GZW",
    userId: "usr_1Y8A7RTBXKQ71Y8A5RTBXKPC1Y",
    author: "Elle R.",
    rating: 9,
    note: "J'ai failli envoyer un message au coach.",
    likes: 44,
  },
  {
    id: "rev_T69E30WTRJ78T69E10WTRJ6DT6",
    eventId: "evt_63Z5KSYR1HS763Z5HSYR1HRC63",
    userId: "usr_B2E0M1X3B939B2E0P1X3B944B2",
    author: "Jamal T.",
    rating: 8,
    note: "Le suspense m'a volé une année de vie.",
    likes: 20,
  },
  {
    id: "rev_WYK202PAXREQWYK222PAXRFJWY",
    eventId: "evt_E6VMQ5TVCT68E6VMS5TVCT73E6",
    userId: "usr_E3GXNGXY98Y8E3GXQGXY98Z3E3",
    author: "Riley K.",
    rating: 7,
    note: "J'ai applaudi tout seul, dans mon salon.",
    likes: 23,
  },
  {
    id: "rev_J3151E49X63JJ314ZE49X62QJ3",
    eventId: "evt_8ZS6A4ATFMV38ZS684ATFMT88Z",
    userId: "usr_KHHE5RBM3W4HKHHE7RBM3W5CKH",
    author: "Louise B.",
    rating: 9,
    note: "J'ai rate le début, mais le finish m'a reveille.",
    likes: 26,
  },
  {
    id: "rev_5YGC402QW7KQ5YGC602QW7MJ5Y",
    eventId: "evt_FRE66085WGKMFRE68085WGMFFR",
    userId: "usr_2SGNEH2HBH7S2SGNCH2HBH6Y2S",
    author: "Diego M.",
    rating: 8,
    note: "Ce match m'a fait oublier ou etait la telecommande.",
    likes: 29,
  },
  {
    id: "rev_WHVVJ4MGHWAFWHVVG4MGHW9MWH",
    eventId: "evt_HP7XPER2F1T2HP7XMER2F1S7HP",
    userId: "usr_ZZG4WXPGSFTZZZG4TXPGSFT4ZZ",
    author: "Nina P.",
    rating: 7,
    note: "On dirait un scenario ecrit par un fan trop motive.",
    likes: 32,
  },
  {
    id: "rev_G9QDWC29KMGHG9QDTC29KMFNG9",
    eventId: "evt_5W50JA8F58AA5W50GA8F589F5W",
    userId: "usr_WCPDCEC9K78HWCPDEEC9K79CWC",
    author: "Marcus L.",
    rating: 9,
    note: "J'ai perdu la voix avant la fin.",
    likes: 35,
  },
  {
    id: "rev_BPESMBT5QWCYBPESJBT5QWC3BP",
    eventId: "evt_3PEZFMACFEDB3PEZDMACFECF3P",
    userId: "usr_1Y8A7RTBXKQ71Y8A5RTBXKPC1Y",
    author: "Elle R.",
    rating: 8,
    note: "Si c'etait un film, j'aurais demande la suite.",
    likes: 38,
  },
  {
    id: "rev_QRVR1F7TTCNCQRVR3F7TTCP7QR",
    eventId: "evt_DJADRY5W4PK9DJADTY5W4PM5DJ",
    userId: "usr_B2E0M1X3B939B2E0P1X3B944B2",
    author: "Jamal T.",
    rating: 7,
    note: "Je voulais dormir, le match a dit non.",
    likes: 41,
  },
  {
    id: "rev_B2QG28FHGM2BB2QG08FHGM1GB2",
    eventId: "evt_7N0YCT50QY527N0YAT50QY477N",
    userId: "usr_E3GXNGXY98Y8E3GXQGXY98Z3E3",
    author: "Riley K.",
    rating: 9,
    note: "Mon chien a applaudi, c'est dire.",
    likes: 44,
  },
  {
    id: "rev_K4R42ZFZ40ECK4R40ZFZ40DHK4",
    eventId: "evt_JTHE7M9TB41YJTHE5M9TB413JT",
    userId: "usr_KHHE5RBM3W4HKHHE7RBM3W5CKH",
    author: "Louise B.",
    rating: 8,
    note: "Plus d'action que ma semaine entiere.",
    likes: 20,
  },
  {
    id: "rev_ZJR439FA8DCSZJR459FA8DDMZJ",
    eventId: "evt_3854V2KN6RP43854X2KN6RPZ38",
    userId: "usr_2SGNEH2HBH7S2SGNCH2HBH6Y2S",
    author: "Diego M.",
    rating: 7,
    note: "Je pensais regarder 5 minutes. Spoiler: non.",
    likes: 23,
  },
  {
    id: "rev_YWSYWK726S27YWSYYK726S32YW",
    eventId: "evt_XZNF6CTC2DD1XZNF8CTC2DDWXZ",
    userId: "usr_ZZG4WXPGSFTZZZG4TXPGSFT4ZZ",
    author: "Nina P.",
    rating: 9,
    note: "La tension etait a 200%, mon cafe aussi.",
    likes: 26,
  },
  {
    id: "rev_FS32TCGDHG18FS32RCGDHG0DFS",
    eventId: "evt_4ZBW6B80M93X4ZBW4B80M9324Z",
    userId: "usr_WCPDCEC9K78HWCPDEEC9K79CWC",
    author: "Marcus L.",
    rating: 8,
    note: "Mon voisin a sonne, je n'ai pas repondu.",
    likes: 29,
  },
  {
    id: "rev_152JCF4RGPTC152JEF4RGPV715",
    eventId: "evt_K5XYV537VXJTK5XYX537VXKNK5",
    userId: "usr_1Y8A7RTBXKQ71Y8A5RTBXKPC1Y",
    author: "Elle R.",
    rating: 7,
    note: "C'etait le chaos, mais du beau chaos.",
    likes: 32,
  },
  {
    id: "rev_T0EZF2XJ19Z3T0EZH2XJ19ZYT0",
    eventId: "evt_REJS8WGQF36TREJSAWGQF37NRE",
    userId: "usr_B2E0M1X3B939B2E0P1X3B944B2",
    author: "Jamal T.",
    rating: 9,
    note: "Je me suis leve 12 fois du canape.",
    likes: 35,
  },
  {
    id: "rev_F27R8HBTHWRGF27R6HBTHWQNF2",
    eventId: "evt_8DN7TR6F0JZZ8DN7RR6F0JZ38D",
    userId: "usr_E3GXNGXY98Y8E3GXQGXY98Z3E3",
    author: "Riley K.",
    rating: 8,
    note: "Ce match avait un bouton turbo.",
    likes: 38,
  },
  {
    id: "rev_NM6NCQ9W81MXNM6NEQ9W81NRNM",
    eventId: "evt_A8WV3SQD4YPEA8WV5SQD4YQ9A8",
    userId: "usr_KHHE5RBM3W4HKHHE7RBM3W5CKH",
    author: "Louise B.",
    rating: 7,
    note: "J'ai crie, puis j'ai ri, puis j'ai crie encore.",
    likes: 41,
  },
  {
    id: "rev_MR3WTEAE5P59MR3WREAE5P4EMR",
    eventId: "evt_KBXT96B0KXPNKBXT76B0KXNSKB",
    userId: "usr_2SGNEH2HBH7S2SGNCH2HBH6Y2S",
    author: "Diego M.",
    rating: 9,
    note: "J'ai change de place 3 fois, ca a marche.",
    likes: 44,
  },
  {
    id: "rev_N3RPJFF8WZMEN3RPMFF8WZN9N3",
    eventId: "evt_GQS1JYKF9B8HGQS1MYKF9B9CGQ",
    userId: "usr_ZZG4WXPGSFTZZZG4TXPGSFT4ZZ",
    author: "Nina P.",
    rating: 8,
    note: "Un événement parfait pour user le replay.",
    likes: 20,
  },
  {
    id: "rev_X50VVYNZHDGWX50VSYNZHDG1X5",
    eventId: "evt_RCXRKTE1ZD5MRCXRHTE1ZD4SRC",
    userId: "usr_WCPDCEC9K78HWCPDEEC9K79CWC",
    author: "Marcus L.",
    rating: 7,
    note: "J'ai failli envoyer un message au coach.",
    likes: 23,
  },
  {
    id: "rev_RFNAVEP541EPRFNASEP541DVRF",
    eventId: "evt_PNGZE4BSGTWPPNGZC4BSGTVVPN",
    userId: "usr_1Y8A7RTBXKQ71Y8A5RTBXKPC1Y",
    author: "Elle R.",
    rating: 9,
    note: "Le suspense m'a volé une année de vie.",
    likes: 26,
  },
  {
    id: "rev_4GKZR81E2BT44GKZT81E2BTZ4G",
    eventId: "evt_NKZN0BGCCKPXNKZN2BGCCKQRNK",
    userId: "usr_B2E0M1X3B939B2E0P1X3B944B2",
    author: "Jamal T.",
    rating: 8,
    note: "J'ai applaudi tout seul, dans mon salon.",
    likes: 29,
  },
  {
    id: "rev_R21QZEP3BFKRR21QXEP3BFJWR2",
    eventId: "evt_1J72EK830Y6G1J72CK830Y5N1J",
    userId: "usr_E3GXNGXY98Y8E3GXQGXY98Z3E3",
    author: "Riley K.",
    rating: 7,
    note: "J'ai rate le début, mais le finish m'a reveille.",
    likes: 32,
  },
  {
    id: "rev_NSWB531CCGRCNSWB731CCGS7NS",
    eventId: "evt_C2BNA4S1XTT4C2BNC4S1XTTZC2",
    userId: "usr_KHHE5RBM3W4HKHHE7RBM3W5CKH",
    author: "Louise B.",
    rating: 9,
    note: "Ce match m'a fait oublier ou etait la telecommande.",
    likes: 35,
  },
  {
    id: "rev_ZSEDCY65DTXTZSEDEY65DTYNZS",
    eventId: "evt_07GCYASQ1FC307GD0ASQ1FCY07",
    userId: "usr_2SGNEH2HBH7S2SGNCH2HBH6Y2S",
    author: "Diego M.",
    rating: 8,
    note: "On dirait un scenario ecrit par un fan trop motive.",
    likes: 38,
  },
  {
    id: "rev_A4YP2JHP1G3PA4YP0JHP1G2VA4",
    eventId: "evt_TNNNYRQFVKSVTNNNWRQFVKS0TN",
    userId: "usr_ZZG4WXPGSFTZZZG4TXPGSFT4ZZ",
    author: "Nina P.",
    rating: 7,
    note: "J'ai perdu la voix avant la fin.",
    likes: 41,
  },
  {
    id: "rev_7TZ1V7HE43YR7TZ1S7HE43XX7T",
    eventId: "evt_TPV6NW8D17E4TPV6KW8D17D9TP",
    userId: "usr_WCPDCEC9K78HWCPDEEC9K79CWC",
    author: "Marcus L.",
    rating: 9,
    note: "Si c'etait un film, j'aurais demande la suite.",
    likes: 44,
  },
  {
    id: "rev_S37FPVQ4W4GTS37FRVQ4W4HPS3",
    eventId: "evt_67VVB4KZT9VZ67VVD4KZT9WT67",
    userId: "usr_1Y8A7RTBXKQ71Y8A5RTBXKPC1Y",
    author: "Elle R.",
    rating: 8,
    note: "Je voulais dormir, le match a dit non.",
    likes: 20,
  },
  {
    id: "rev_KSZZV353X7W4KSZZS353X7V9KS",
    eventId: "evt_1J2862J9H2BJ1J2842J9H2AP1J",
    userId: "usr_B2E0M1X3B939B2E0P1X3B944B2",
    author: "Jamal T.",
    rating: 7,
    note: "Mon chien a applaudi, c'est dire.",
    likes: 23,
  },
  {
    id: "rev_MCMA6KG5K7XFMCMA8KG5K7YAMC",
    eventId: "evt_397V35GZ417T397V55GZ418P39",
    userId: "usr_E3GXNGXY98Y8E3GXQGXY98Z3E3",
    author: "Riley K.",
    rating: 9,
    note: "Plus d'action que ma semaine entiere.",
    likes: 26,
  },
  {
    id: "rev_5VJ707C5F2BM5VJ6Y7C5F2AS5V",
    eventId: "evt_4Z6S0ZV4SHB84Z6RYZV4SHAC4Z",
    userId: "usr_2SGNEH2HBH7S2SGNCH2HBH6Y2S",
    author: "Diego M.",
    rating: 8,
    note: "J'ai cligne des yeux, il y avait un but.",
    likes: 31,
  },
  {
    id: "rev_60298MD4YGR56029AMD4YGS060",
    eventId: "evt_NRQTQQ871G1RNRQTNQ871G0XNR",
    userId: "usr_ZZG4WXPGSFTZZZG4TXPGSFT4ZZ",
    author: "Nina P.",
    rating: 8,
    note: "Finale sous tension, mon salon etait un stade.",
    likes: 28,
  },
  {
    id: "rev_FDCM8VZ55VZXFDCMAVZ55W0RFD",
    eventId: "evt_GTK793BPTEDSGTK773BPTECYGT",
    userId: "usr_KHHE5RBM3W4HKHHE7RBM3W5CKH",
    author: "Louise B.",
    rating: 7,
    note: "Sprint propre, j'ai failli renverser mon cafe.",
    likes: 22,
  },
  {
    id: "rev_RWQV76XT53EWRWQV56XT53E1RW",
    eventId: "evt_DN6G73B8MR0EDN6G93B8MR1ADN",
    userId: "usr_B2E0M1X3B939B2E0P1X3B944B2",
    author: "Jamal T.",
    rating: 8,
    note: "Le chrono, c'est de la douleur elegante.",
    likes: 25,
  },
];

const baseCommentSamples = [
  {
    id: "cmt_4WGZP9SW528Z4WGZM9SW52844W",
    eventId: "evt_4XSQZKBS4RDR4XSR1KBS4REM4X",
    userId: "usr_ZZG4WXPGSFTZZZG4TXPGSFT4ZZ",
    author: "Nina P.",
    note: "Qui d'autre a mis une alarme pour la finale ?",
    likes: 18,
    replies: [
      { id: "rep_W6G5V2HBKH35W6G5S2HBKH2AW6", userId: "usr_WCPDCEC9K78HWCPDEEC9K79CWC", author: "Marcus L.", note: "Moi, et une deuxieme au cas ou.", likes: 6 },
    ],
  },
  {
    id: "cmt_5RQQ13QSAMSQ5RQPZ3QSAMRW5R",
    eventId: "evt_8QNPM1627RQF8QNPJ1627RPM8Q",
    userId: "usr_2SGNEH2HBH7S2SGNCH2HBH6Y2S",
    author: "Diego M.",
    note: "Je sens un but à la 90e, je le sens.",
    likes: 22,
    replies: [
      { id: "rep_VRATRT87JW20VRATPT87JW14VR", userId: "usr_KHHE5RBM3W4HKHHE7RBM3W5CKH", author: "Louise B.", note: "J'apporte les mouchoirs si ca tourne mal.", likes: 4 },
    ],
  },
  {
    id: "cmt_K125D2T2ZVA4K125B2T2ZV99K1",
    eventId: "evt_63Z5KSYR1HS763Z5HSYR1HRC63",
    userId: "usr_B2E0M1X3B939B2E0P1X3B944B2",
    author: "Jamal T.",
    note: "Match a regarder avec un casque, ca va taper fort.",
    likes: 14,
    replies: [
      { id: "rep_KH8AZ8YP5E7WKH8AX8YP5E71KH", userId: "usr_E3GXNGXY98Y8E3GXQGXY98Z3E3", author: "Riley K.", note: "Je monte le son, c'est tout.", likes: 3 },
    ],
  },
  {
    id: "cmt_153GD00N6J1J153GB00N6J0Q15",
    eventId: "evt_EDD65VQ9E9N0EDD63VQ9E9M5ED",
    userId: "usr_KHHE5RBM3W4HKHHE7RBM3W5CKH",
    author: "Louise B.",
    note: "On attend un finish clutch ou rien.",
    likes: 11,
    replies: [],
  },
  {
    id: "cmt_M6EZXHJ7D6TNM6EZVHJ7D6STM6",
    eventId: "evt_99F2HMZY9WNE99F2KMZY9WP999",
    userId: "usr_B2E0M1X3B939B2E0P1X3B944B2",
    author: "Jamal T.",
    note: "Si ca explose dans l'avant-dernier col, je saute du canape.",
    likes: 19,
    replies: [
      { id: "rep_5JP7XQ1NRWZT5JP7VQ1NRWYZ5J", userId: "usr_ZZG4WXPGSFTZZZG4TXPGSFT4ZZ", author: "Nina P.", note: "Je mets le cafe, c'est long une etape.", likes: 5 },
    ],
  },
  {
    id: "cmt_DN319HH9N4DKDN317HH9N4CRDN",
    eventId: "evt_FV8J5N0W4TKYFV8J7N0W4TMTFV",
    userId: "usr_2SGNEH2HBH7S2SGNCH2HBH6Y2S",
    author: "Diego M.",
    note: "Celle-la, c'est pour les attaques de loin.",
    likes: 12,
    replies: [],
  },
  {
    id: "cmt_MP47NBJPFVZGMP47QBJPFW0CMP",
    eventId: "evt_V8G6SJSJ109BV8G6QJSJ108GV8",
    userId: "usr_WCPDCEC9K78HWCPDEEC9K79CWC",
    author: "Marcus L.",
    note: "Le chrono peut retourner tout le classement.",
    likes: 16,
    replies: [],
  },
];

const ID_ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
const FNV_OFFSET = 14695981039346656037n;
const FNV_PRIME = 1099511628211n;

function fnv1a64(value) {
  let hash = FNV_OFFSET;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= BigInt(value.charCodeAt(i));
    hash = (hash * FNV_PRIME) & 0xFFFFFFFFFFFFFFFFn;
  }
  return hash;
}

function hashToBase32(seed, length = 26) {
  const values = [];
  for (let i = 0; i < 3; i += 1) {
    const hash = fnv1a64(`${seed}:${i}`);
    for (let j = 0; j < 12; j += 1) {
      const shift = 59n - BigInt(j * 5);
      const val = Number((hash >> shift) & 31n);
      values.push(val);
    }
  }
  return values.slice(0, length).map((val) => ID_ALPHABET[val]).join("");
}

function makeStableId(prefix, seed) {
  return `${prefix}_${hashToBase32(seed)}`;
}

const funReviewLines = [
  "Je pensais regarder 5 minutes. Spoiler: non.",
  "Ce match m'a fait oublier ou etait la telecommande.",
  "J'ai crie, puis j'ai ri, puis j'ai crie encore.",
  "Plus d'action que ma semaine entiere.",
  "Le suspense m'a volé une année de vie.",
  "J'ai applaudi tout seul, dans mon salon.",
  "C'etait le chaos, mais du beau chaos.",
  "Mon chien a applaudi, c'est dire.",
  "La tension etait a 200%, mon cafe aussi.",
  "Un événement parfait pour user le replay.",
];

const funCommentLines = [
  "Qui d'autre a mis une alarme pour ca ?",
  "Je sens un finish dingue, j'espere ne pas me porter l'oeil.",
  "Je prends des snacks, ca va durer.",
  "Ce soir, c'est tele + tension.",
  "Si ca part en sprint, j'explose.",
  "C'est le genre d'événement qui colle au canape.",
  "Je veux juste du drama propre.",
];

syncEventStatuses();

const autoFunReviews = events
  .filter((event) => !isUpcoming(event))
  .map((event, index) => {
    const user = users[index % users.length];
    return {
      id: makeStableId("rev", `auto-${event.id}`),
      eventId: event.id,
      userId: user.id,
      author: user.name,
      rating: 7 + (index % 4),
      note: funReviewLines[index % funReviewLines.length],
      likes: 12 + (index % 9) * 3,
    };
  });

const baseCommentEventIds = new Set(baseCommentSamples.map((comment) => comment.eventId));
const autoFunComments = events
  .filter((event) => isUpcoming(event) && !baseCommentEventIds.has(event.id))
  .map((event, index) => {
    const user = users[index % users.length];
    const replyUser = users[(index + 1) % users.length];
    const replyLines = [
      "Je signe tout de suite.",
      "Je prends place au premier rang.",
      "On se retrouve devant l'ecran.",
      "Ca sent la soirée parfaite.",
      "Je ramene les snacks.",
    ];
    return {
      id: makeStableId("cmt", `auto-${event.id}`),
      eventId: event.id,
      userId: user.id,
      author: user.name,
      note: funCommentLines[index % funCommentLines.length],
      likes: 8 + (index % 7) * 2,
      replies: [
        {
          id: makeStableId("rep", `auto-${event.id}-1`),
          userId: replyUser.id,
          author: replyUser.name,
          note: replyLines[index % replyLines.length],
          likes: 2 + (index % 4),
        },
        {
          id: makeStableId("rep", `auto-${event.id}-2`),
          userId: users[(index + 2) % users.length].id,
          author: users[(index + 2) % users.length].name,
          note: replyLines[(index + 2) % replyLines.length],
          likes: 1 + (index % 3),
        },
      ],
    };
  });

const reviewReplyLines = [
  "Je valide a 100%.",
  "C'etait fou, je confirme.",
  "J'ai revu le replay direct.",
  "Ca m'a retourne.",
  "Respect pour l'analyse.",
];

const critiqueSamples = [...baseReviewSamples, ...autoFunReviews].map((review, index) => {
  const event = events.find((item) => item.id === review.eventId);
  const baseReview = { ...review, date: review.date || (event ? event.date : "") };
  if (review.replies && review.replies.length) {
    return {
      ...baseReview,
      commentType: "critique",
      replies: review.replies.map((reply) => ({ ...reply, parentCommentId: review.id })),
    };
  }
  const firstUser = users[(index + 1) % users.length];
  const secondUser = users[(index + 2) % users.length];
  return {
    ...baseReview,
    commentType: "critique",
    replies: [
      {
        id: makeStableId("rep", `review-${review.id}-1`),
        userId: firstUser.id,
        author: firstUser.name,
        note: reviewReplyLines[index % reviewReplyLines.length],
        likes: 2 + (index % 4),
        parentCommentId: review.id,
      },
      {
        id: makeStableId("rep", `review-${review.id}-2`),
        userId: secondUser.id,
        author: secondUser.name,
        note: reviewReplyLines[(index + 2) % reviewReplyLines.length],
        likes: 1 + (index % 3),
        parentCommentId: review.id,
      },
    ],
  };
});

const teaserSamples = [...baseCommentSamples, ...autoFunComments].map((comment, index) => {
  const event = events.find((item) => item.id === comment.eventId);
  const baseComment = { ...comment, date: comment.date || (event ? event.date : "") };
  const replies = comment.replies ? [...comment.replies] : [];
  const replyLines = [
    "Je signe tout de suite.",
    "Je prends place au premier rang.",
    "On se retrouve devant l'ecran.",
    "Ca sent la soirée parfaite.",
    "Je ramene les snacks.",
  ];
  while (replies.length < 2) {
    const user = users[(index + replies.length + 1) % users.length];
    replies.push({
      id: makeStableId("rep", `comment-${comment.id}-${replies.length + 1}`),
      userId: user.id,
      author: user.name,
      note: replyLines[(index + replies.length) % replyLines.length],
      likes: 1 + ((index + replies.length) % 3),
    });
  }
  return {
    ...baseComment,
    commentType: "teaser",
    replies: replies.map((reply) => ({ ...reply, parentCommentId: comment.id })),
  };
});

const leagueDirectCommentLines = [
  "Cette ligue tient ses promesses semaine apres semaine.",
  "Le niveau global monte a chaque journée, c'est très propre.",
  "On sent une vraie identite tactique sur cette saison.",
  "Calendrier dense, mais la qualite reste elevee.",
  "Le suspense au classement rend cette ligue addictive.",
];

const leagueDirectReviewLines = [
  "Saison solide et scenario ouvert jusqu'aux dernieres journées.",
  "Niveau moyen très eleve, très peu de matchs faciles.",
  "Une edition qui marque par son intensite collective.",
];

const leagueDirectCommentSamples = leagueEvents
  .filter((league) => (league.eventIds || []).length >= 2)
  .slice(0, 10)
  .map((league, index) => {
    const user = users[(index + 1) % users.length];
    const mode = index % 3 === 0 ? "critique" : "teaser";
    const baseComment = {
      id: makeStableId("cmt", `league-direct-${league.id}`),
      eventId: league.id,
      userId: user.id,
      author: user.name,
      note: mode === "critique"
        ? leagueDirectReviewLines[index % leagueDirectReviewLines.length]
        : leagueDirectCommentLines[index % leagueDirectCommentLines.length],
      likes: 2 + (index % 4),
      commentType: mode,
      replies: [],
    };
    if (mode === "critique") {
      baseComment.rating = 7 + (index % 3);
    }
    return baseComment;
  });

// Canonical comment dataset: one object shape, two modes (critique/teaser).
const genericCommentSamples = [...critiqueSamples, ...teaserSamples, ...leagueDirectCommentSamples];
const manualCommentsKey = "cafesport.club_manual_comments_v1";
let storedManualComments = parseStorageArray(manualCommentsKey, []);

function formatInventedCommentDate(dateValue) {
  const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "";
  const months = [
    "janvier",
    "fevrier",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "aout",
    "septembre",
    "octobre",
    "novembre",
    "decembre",
  ];
  const day = String(date.getDate()).padStart(2, "0");
  return `${day} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function assignInventedDatesToComments() {
  // Use a fixed reference so generated demo dates stay stable between reloads.
  const baseDate = new Date(2026, 1, 9, 18, 0, 0, 0);
  genericCommentSamples.forEach((comment, commentIndex) => {
    const commentDate = new Date(baseDate.getTime() - (commentIndex + 1) * 5 * 60 * 60 * 1000);
    comment.createdAt = commentDate.toISOString();
    comment.dateTime = comment.createdAt;
    comment.date = formatInventedCommentDate(commentDate);

    if (!Array.isArray(comment.replies)) return;
    comment.replies.forEach((reply, replyIndex) => {
      const replyDate = new Date(commentDate.getTime() + (replyIndex + 1) * 37 * 60 * 1000);
      reply.createdAt = replyDate.toISOString();
      reply.dateTime = reply.createdAt;
      reply.date = formatInventedCommentDate(replyDate);
    });
  });
}

assignInventedDatesToComments();

const commentsById = Object.fromEntries(genericCommentSamples.map((comment) => [comment.id, comment]));
const reviewSamples = critiqueSamples;
const commentSamples = teaserSamples;

const COMMENT_TARGET_EVENT = "event";
const COMMENT_TARGET_LEAGUE = "league";
const COMMENT_TARGET_LEAGUE_SEASON = "league-season";
const COMMENT_TARGET_TEAM = "team";
const COMMENT_TARGET_ATHLETE = "athlete";
const COMMENT_TARGET_LIST = "list";
const COMMENT_TARGET_USER = "user";
const COMMENT_TARGET_ALLOWED = new Set([
  COMMENT_TARGET_EVENT,
  COMMENT_TARGET_LEAGUE,
  COMMENT_TARGET_LEAGUE_SEASON,
  COMMENT_TARGET_TEAM,
  COMMENT_TARGET_ATHLETE,
  COMMENT_TARGET_LIST,
  COMMENT_TARGET_USER,
]);

function normalizeCommentTargetType(targetType) {
  const safeType = String(targetType || "").trim().toLowerCase();
  if (!safeType) return "";
  if (safeType === "player") return COMMENT_TARGET_ATHLETE;
  return COMMENT_TARGET_ALLOWED.has(safeType) ? safeType : "";
}

function inferLegacyCommentTarget(comment) {
  const legacyId = String(comment?.eventId || "").trim();
  if (!legacyId) return { targetType: "", targetId: "" };
  if (events.some((item) => item.id === legacyId)) {
    return { targetType: COMMENT_TARGET_EVENT, targetId: legacyId };
  }
  if (getLeagueSeasonById(legacyId)) {
    return { targetType: COMMENT_TARGET_LEAGUE_SEASON, targetId: legacyId };
  }
  if (getLeagueRootById(legacyId)) {
    return { targetType: COMMENT_TARGET_LEAGUE, targetId: legacyId };
  }
  if (getTeamById(legacyId)) {
    return { targetType: COMMENT_TARGET_TEAM, targetId: legacyId };
  }
  if (getAthleteById(legacyId)) {
    return { targetType: COMMENT_TARGET_ATHLETE, targetId: legacyId };
  }
  if (curatedLists.some((item) => item.id === legacyId)) {
    return { targetType: COMMENT_TARGET_LIST, targetId: legacyId };
  }
  return { targetType: "", targetId: legacyId };
}

function getCommentTargetType(comment) {
  if (!comment) return "";
  const explicit = normalizeCommentTargetType(comment.targetType);
  if (explicit) return explicit;
  return inferLegacyCommentTarget(comment).targetType;
}

function getCommentTargetId(comment) {
  if (!comment) return "";
  const explicitType = normalizeCommentTargetType(comment.targetType);
  const explicitId = String(comment.targetId || "").trim();
  if (explicitType && explicitId) return explicitId;
  return inferLegacyCommentTarget(comment).targetId;
}

function commentMatchesTarget(comment, targetType, targetId) {
  const safeType = normalizeCommentTargetType(targetType);
  const safeId = String(targetId || "").trim();
  if (!safeType || !safeId || !comment) return false;
  return getCommentTargetType(comment) === safeType && getCommentTargetId(comment) === safeId;
}

function hydrateCommentDates(comment) {
  if (!comment) return comment;
  const now = new Date();
  const createdAt = comment.createdAt || comment.dateTime || now.toISOString();
  const createdDate = new Date(createdAt);
  const safeCreatedDate = Number.isNaN(createdDate.getTime()) ? now : createdDate;
  comment.createdAt = safeCreatedDate.toISOString();
  comment.dateTime = comment.createdAt;
  comment.date = comment.date || formatInventedCommentDate(safeCreatedDate);
  if (Array.isArray(comment.replies)) {
    comment.replies = comment.replies.map((reply, index) => {
      const replyDate = reply.createdAt || reply.dateTime
        || new Date(safeCreatedDate.getTime() + (index + 1) * 19 * 60 * 1000).toISOString();
      const parsedReplyDate = new Date(replyDate);
      const safeReplyDate = Number.isNaN(parsedReplyDate.getTime())
        ? new Date(safeCreatedDate.getTime() + (index + 1) * 19 * 60 * 1000)
        : parsedReplyDate;
      return {
        ...reply,
        createdAt: safeReplyDate.toISOString(),
        dateTime: safeReplyDate.toISOString(),
        date: reply.date || formatInventedCommentDate(safeReplyDate),
        parentCommentId: reply.parentCommentId || comment.id,
      };
    });
  } else {
    comment.replies = [];
  }
  return comment;
}

function sanitizeStoredManualComment(rawComment) {
  if (!rawComment || typeof rawComment !== "object") return null;
  const targetType = normalizeCommentTargetType(rawComment.targetType);
  const targetId = String(rawComment.targetId || "").trim();
  const note = String(rawComment.note || "").trim();
  if (!targetType || !targetId || !note) return null;
  const user = getUserById(rawComment.userId || users[0]?.id || "");
  const commentType = rawComment.commentType === "critique" ? "critique" : "teaser";
  const likes = Math.max(0, Number(rawComment.likes || 0));
  const comment = {
    id: String(rawComment.id || makeStableId("cmt", `manual-${targetType}-${targetId}-${Date.now()}`)),
    targetType,
    targetId,
    eventId: String(rawComment.eventId || targetId),
    userId: user.id,
    author: rawComment.author || user.name || "Vous",
    note,
    likes,
    commentType,
    replies: Array.isArray(rawComment.replies) ? rawComment.replies.map((reply) => ({ ...reply })) : [],
    createdAt: rawComment.createdAt || rawComment.dateTime || new Date().toISOString(),
    dateTime: rawComment.dateTime || rawComment.createdAt || new Date().toISOString(),
    date: rawComment.date || "",
  };
  if (commentType === "critique") {
    const rawRating = Number(rawComment.rating || 0);
    const safeRating = Math.min(10, Math.max(0, Number.isFinite(rawRating) ? rawRating : 0));
    comment.rating = safeRating;
  }
  return hydrateCommentDates(comment);
}

function registerCommentInMemory(comment) {
  if (!comment?.id) return;
  if (!commentsById[comment.id]) {
    genericCommentSamples.push(comment);
    if (getCommentType(comment) === "critique") {
      reviewSamples.push(comment);
    } else {
      commentSamples.push(comment);
    }
  }
  commentsById[comment.id] = comment;
}

function saveManualComments() {
  safeStorageSetItem(manualCommentsKey, JSON.stringify(storedManualComments));
}

function seedManualCommentsFromStorage() {
  if (!Array.isArray(storedManualComments)) {
    storedManualComments = [];
  }
  const normalized = storedManualComments
    .map((entry) => sanitizeStoredManualComment(entry))
    .filter(Boolean);
  storedManualComments = normalized.map((entry) => ({
    id: entry.id,
    targetType: entry.targetType,
    targetId: entry.targetId,
    eventId: entry.eventId,
    userId: entry.userId,
    author: entry.author,
    note: entry.note,
    likes: entry.likes,
    commentType: entry.commentType,
    rating: entry.rating,
    createdAt: entry.createdAt,
    dateTime: entry.dateTime,
    date: entry.date,
    replies: entry.replies,
  }));
  normalized.forEach((comment) => registerCommentInMemory(comment));
  saveManualComments();
}

seedManualCommentsFromStorage();

const curatedLists = [
  {
    id: "lst_1SHKFBQECVCF1SHKDBQECVBM1S",
    title: "Les meilleures etapes du Tour de France",
    description: "Cols mythiques, attaques folles, et finishes historiques.",
    count: 3,
    sport: "Cyclisme",
    ownerId: "usr_KHHE5RBM3W4HKHHE7RBM3W5CKH",
    likes: 680,
    entries: [
      { eventId: "evt_FV8J5N0W4TKYFV8J7N0W4TMTFV", note: "Pyrenees, et une bataille pour les grimpeurs." },
      { eventId: "evt_99F2HMZY9WNE99F2KMZY9WP999", note: "Une etape de montagne pour les favoris." },
      { eventId: "evt_V8G6SJSJ109BV8G6QJSJ108GV8", note: "Le chrono final pour faire la difference." },
    ],
  },
  {
    id: "lst_6CYCLE2026",
    title: "Les coureurs les plus attendus en 2026",
    description: "Ceux que l'on attend dans les classiques, les contre-la-montre et les etapes decisive.",
    count: 8,
    sport: "Cyclisme",
    ownerId: "usr_KHHE5RBM3W4HKHHE7RBM3W5CKH",
    likes: 540,
    itemLabel: "coureurs",
    entries: [
      { athleteId: "ath_D7G4H9K3PZ0YD7G4H9K3PZ0Y1", note: "Isaac Del Toro, rouleur americain pret a briller sur les contre-la-montre et les côtés de rupture.", score: 93 },
      { athleteId: "ath_W0L9P7X2MZ3AW0L9P7X2MZ3A", note: "Arnaud De Lie, sprinteur polyvalent qui cherche sa revanche sur les classiques vallonnees.", score: 91 },
      { athleteId: "ath_Z6F8B3R1QY5GZ6F8B3R1QY5G", note: "Christian Scaroni garde la roue des meilleurs et veut se montrer sur les courses italiennes cassees.", score: 89 },
      { athleteId: "ath_P5N8M2A6L1OP5N8M2A6L1O", note: "Jonathan Milan a confirmé sa fraicheur en chrono et vise les arrivées en petit groupe.", score: 90 },
      { athleteId: "ath_U3T9A4N5D2RSU3T9A4N5D2R", note: "Tobias Lund Andresen, tete chercheuse de relais pour peser sur les puncheurs.", score: 88 },
      { athleteId: "ath_S6T4O7R9E1M0S6T4O7R9E1M", note: "Michael Storer recherche des etapes d'aventure pour poser sa carte.", score: 87 },
      { athleteId: "ath_J1O8R2G5N4S6M3J1O8R2G5N4S", note: "Matteo Jorgenson, americain agile pour les courses a transitions rapides.", score: 86 },
      { athleteId: "ath_G7A3L2F9X1ZFG7A3L2F9X1Z", note: "Felix Gall revient sur les classiques vallonnees pour remplacer la refuge des puncheurs.", score: 85 },
    ],
  },
  {
    id: "lst_5T7XEK952GVJ5T7XGK952GWD5T",
    title: "Derbies europeens a ne pas manquer",
    description: "Les rivalites qui font vibrer la saison.",
    count: 12,
    sport: "Football",
    ownerId: "usr_2SGNEH2HBH7S2SGNCH2HBH6Y2S",
    likes: 520,
    entries: [
      { eventId: "evt_8QNPM1627RQF8QNPJ1627RPM8Q", note: "Pressing, tension, et ambiance folles." },
      { eventId: "evt_2XWA16C4CB712XWA36C4CB7W2X", note: "Une finale avec l'intensite d'un derby." },
    ],
  },
  {
    id: "lst_FFNBNW65RMQYFFNBKW65RMQ3FF",
    title: "Finales de legende",
    description: "Les matchs qui ont change l'histoire du sport.",
    count: 10,
    sport: "Multi-sport",
    ownerId: "usr_ZZG4WXPGSFTZZZG4TXPGSFT4ZZ",
    likes: 740,
    entries: [
      { eventId: "evt_2XWA16C4CB712XWA36C4CB7W2X", note: "Un final inoubliable." },
      { eventId: "evt_VH688P4QC0JKVH686P4QC0HQVH", note: "Un match de playoffs mythique." },
      { eventId: "evt_4XSQZKBS4RDR4XSR1KBS4REM4X", note: "Un duel sur terre battue legendaire." },
      { eventId: "evt_99F2HMZY9WNE99F2KMZY9WP999", note: "Une arrivee en altitude qui marque." },
    ],
  },
];

const activitySamples = [
  { id: "act-1", userId: "usr_2SGNEH2HBH7S2SGNCH2HBH6Y2S", type: "list", label: "a publie le classement Derbies europeens", date: "Il y a 2 jours" },
  { id: "act-2", userId: "usr_2SGNEH2HBH7S2SGNCH2HBH6Y2S", type: "critique", label: "a note Manchester City vs. Real Madrid", date: "Il y a 5 jours" },
  { id: "act-3", userId: "usr_ZZG4WXPGSFTZZZG4TXPGSFT4ZZ", type: "list", label: "a publie le classement Finales de legende", date: "Il y a 1 semaine" },
  { id: "act-4", userId: "usr_ZZG4WXPGSFTZZZG4TXPGSFT4ZZ", type: "critique", label: "a commente la finale Roland-Garros", date: "Il y a 6 jours" },
  { id: "act-5", userId: "usr_WCPDCEC9K78HWCPDEEC9K79CWC", type: "critique", label: "a note Lakers vs. Celtics", date: "Il y a 3 jours" },
  { id: "act-6", userId: "usr_1Y8A7RTBXKQ71Y8A5RTBXKPC1Y", type: "critique", label: "a commente le Grand Prix de Monaco", date: "Il y a 4 jours" },
  { id: "act-7", userId: "usr_B2E0M1X3B939B2E0P1X3B944B2", type: "critique", label: "a commente l'etape alpine du Tour", date: "Il y a 2 semaines" },
  { id: "act-8", userId: "usr_KHHE5RBM3W4HKHHE7RBM3W5CKH", type: "list", label: "a publie le classement Tour de France", date: "Il y a 5 jours" },
];

function renderSiteHeader() {
  const header = document.querySelector("[data-site-header]");
  if (!header) return;
  const showSearch = header.dataset.showSearch === "true";
  const path = window.location.pathname;
  const isHome = path.endsWith("/") || path.endsWith("/index.html") || path.endsWith("index.html");
  const eventsHref = isHome ? "#events" : "index.html#events";
  const discoverHref = isHome ? "#home" : "index.html#home";
  header.innerHTML = `
    <div class="header-main gum-header-main">
      <div class="brand brand-gum">
        <a class="brand-link" href="index.html">
          <img src="images/name.svg" alt="Logo Sofa Critics" />
        </a>
      </div>
      ${showSearch ? `
        <div class="header-search-inline">
          <div class="search header-search">
            <input id="global-search-input" type="search" placeholder="Rechercher une compétition, un joueur, un classement, un utilisateur..." aria-label="Recherche globale" />
            <span class="search-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2" />
                <path d="M16.5 16.5L21 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </span>
          </div>
          <div id="global-search-results" class="search-results header-search-results"></div>
        </div>
      ` : ""}
      <nav class="nav nav-gum">
        <a href="${discoverHref}">Découvrir</a>
        <a href="feed.html">Mon Feed</a>
        <a href="${eventsHref}">Événements</a>
        <a href="calendar.html">Watchlist</a>
      </nav>
      <div class="header-actions">
        <details class="header-user-menu">
          <summary class="ghost-header user-menu-toggle" aria-label="Ouvrir le menu admin">
            <span class="user-menu-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M4 7.5h16M4 12h16M4 16.5h16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                <circle cx="8" cy="7.5" r="1.75" fill="#111111" />
                <circle cx="14" cy="12" r="1.75" fill="#111111" />
                <circle cx="10" cy="16.5" r="1.75" fill="#111111" />
              </svg>
            </span>
          </summary>
          <div class="user-menu-dropdown" role="menu" aria-label="Menu admin">
            <a href="datamodel.html" role="menuitem">DataModel</a>
            <a href="uisamples.html" role="menuitem">UISamples</a>
          </div>
        </details>
        <details class="header-user-menu">
          <summary class="ghost-header user-menu-toggle" aria-label="Ouvrir le menu utilisateur">
            <span class="user-menu-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4.25" fill="none" stroke="currentColor" stroke-width="2" />
                <path d="M4 21c1-4.2 4.2-6.4 8-6.4s7 2.2 8 6.4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </span>
          </summary>
          <div class="user-menu-dropdown" role="menu" aria-label="Menu utilisateur">
            <a href="profile.html" role="menuitem">Profil</a>
            <a href="matierlist.html" role="menuitem">Tierlist</a>
          </div>
        </details>
        <a class="cta cta-header join-beta-header" href="join/index.html">Rejoindre la beta</a>
      </div>
    </div>
  `;
}

function renderSiteFooter() {
  const footer = document.querySelector("[data-site-footer]");
  if (!footer) return;
  const path = window.location.pathname;
  const isHome = path.endsWith("/") || path.endsWith("/index.html") || path.endsWith("index.html");
  const eventsHref = isHome ? "#events" : "index.html#events";
  const discoverHref = isHome ? "#home" : "index.html#home";
  footer.innerHTML = `
    <div>
      <span class="brand-name">Sofa Critics</span>
      <p class="muted">Copyright @Intuitions Studio 2026</p>
    </div>
    <div class="footer-links">
      <a href="${eventsHref}">Événements</a>
      <a href="${discoverHref}">Découvrir</a>
      <a href="feed.html">Mon Feed</a>
      <a href="calendar.html">Watchlist</a>
      <a href="matierlist.html">MaTierlist</a>
      <a href="datamodel.html">DataModel</a>
      <a href="uisamples.html">UISamples</a>
      <a href="join/index.html">Rejoindre</a>
      <a href="mailto:tristan@pytha.app">Contact</a>
    </div>
  `;
}


const legacyIdMaps = {
  events: {"ucl-final": "evt_2XWA16C4CB712XWA36C4CB7W2X", "nba-playoffs": "evt_VH688P4QC0JKVH686P4QC0HQVH", "roland-garros": "evt_4XSQZKBS4RDR4XSR1KBS4REM4X", "f1-monaco": "evt_P8FP3D10YMJCP8FP5D10YMK7P8", "premier-league": "evt_8QNPM1627RQF8QNPJ1627RPM8Q", "foot-2026-psg-marseille": "evt_7CY3Q2W40JDW7CY3S2W40JEQ7C", "foot-2026-lyon-monaco": "evt_KC99T85TMTS1KC99R85TMTR6KC", "foot-2026-liverpool-chelsea": "evt_1RSV13C470791RSTZ3C4706E1R", "foot-2026-city-arsenal": "evt_TGNXVAR7Y8AETGNXSAR7Y89KTG", "foot-2026-barca-atleti": "evt_7HMMM3WBF9WE7HMMP3WBF9XA7H", "foot-2026-real-sevilla": "evt_T6KH5M27VA2TT6KH7M27VA3NT6", "foot-2026-juve-inter": "evt_FFF4H834S2XRFFF4K834S2YKFF", "foot-2026-milan-napoli": "evt_921K67TARQ00921K87TARQ0V92", "foot-2026-bayern-dortmund": "evt_CABWJFT20MR1CABWMFT20MRWCA", "foot-2026-leipzig-leverkusen": "evt_0DNPTTHJZ3PA0DNPWTHJZ3Q50D", "foot-2026-psg-lille": "evt_N77DQVEGTZC7N77DSVEGTZD2N7", "foot-2026-porto-benfica": "evt_Q86RHGF5AQV3Q86RKGF5AQVYQ8", "foot-2026-sporting-braga": "evt_B6XHF0GMEZAFB6XHD0GMEZ9MB6", "foot-2026-ajax-psv": "evt_ZCT5C8M82F7ZZCT5A8M82F74ZC", "foot-2026-feyenoord-az": "evt_2EK73ZGQN6VP2EK75ZGQN6WJ2E", "foot-2026-boca-river": "evt_8HCBVDH6HB308HCBSDH6HB258H", "foot-2026-galatasaray-fener": "evt_Q2W4Y39HESBVQ2W5039HESCPQ2", "foot-2026-celtic-rangers": "evt_H9E6FJJ31RGMH9E6HJJ31RHFH9", "foot-2026-boca-independiente": "evt_QREZH000NGCEQREZF000NGBKQR", "foot-2026-roma-lazio": "evt_41WD5WN90AS241WD7WN90ASX41", "sixn-2026-france-ireland": "evt_6F5FZVCZZHTY6F5G1VCZZHVS6F", "sixn-2026-england-scotland": "evt_P9KN6C4YTAVWP9KN4C4YTAV1P9", "sixn-2026-wales-italy": "evt_ZJVS48S3XDP2ZJVS28S3XDN6ZJ", "sixn-2026-ireland-wales": "evt_0QNQSAJJVFZZ0QNQQAJJVFZ40Q", "sixn-2026-scotland-france": "evt_6GJ4YP5KWC146GJ4WP5KWC096G", "sixn-2026-italy-england": "evt_M7REQ6RM56T8M7RES6RM56V3M7", "sixn-2026-ireland-england": "evt_QKEMF6X5K7T1QKEMH6X5K7TWQK", "sixn-2026-scotland-italy": "evt_9Q7PP8NYVR0F9Q7PM8NYVQZM9Q", "sixn-2026-france-wales": "evt_TSKV2M1AWDVPTSKV0M1AWDTVTS", "sixn-2026-wales-scotland": "evt_MPKWRK53QV1VMPKWTK53QV2PMP", "sixn-2026-england-france": "evt_F0ST547ED532F0ST747ED53YF0", "sixn-2026-italy-ireland": "evt_M767BAXHQ78EM767DAXHQ799M7", "sixn-2026-italy-france": "evt_BDEXH8DCCJY4BDEXK8DCCJYZBD", "sixn-2026-scotland-ireland": "evt_B4BZXMYS0GDXB4BZVMYS0GD2B4", "sixn-2026-wales-england": "evt_5KCW1KEFJ0B05KCVZKEFJ0A55K", "wnba-finals": "evt_EDD65VQ9E9N0EDD63VQ9E9M5ED", "tour-stage-18": "evt_99F2HMZY9WNE99F2KMZY9WP999", "tour-stage-12": "evt_FV8J5N0W4TKYFV8J7N0W4TMTFV", "tour-stage-20": "evt_V8G6SJSJ109BV8G6QJSJ108GV8", "strade-bianche-2025": "evt_PQ8AEN3PBCTYPQ8ACN3PBCT3PQ", "milan-san-remo-2025": "evt_GMFN1W2TYQMAGMFMZW2TYQKFGM", "tour-des-flandres-2025": "evt_RFV1ZNQTT2EHRFV21NQTT2FCRF", "paris-roubaix-2025": "evt_NMM7F1CJKH9ANMM7D1CJKH8FNM", "amstel-gold-race-2025": "evt_VTDMCAG67WJMVTDMEAG67WKGVT", "fleche-wallonne-2025": "evt_F4GTVY6NXADAF4GTSY6NXACFF4", "liege-bastogne-liege-2025": "evt_9MG0J575Q3KP9MG0M575Q3MH9M", "clasica-san-sebastian-2025": "evt_T9XT4TT60NWTT9XT2TT60NVZT9", "il-lombardia-2025": "evt_8NH16RCQG9F88NH18RCQG9G38N", "strade-bianche-2026": "evt_QMSY4N3T5R2KQMSY6N3T5R3EQM", "milan-san-remo-2026": "evt_HQZPQW301J3AHQZPSW301J45HQ", "tour-des-flandres-2026": "evt_QK4G9NQQ5E9SQK4G7NQQ5E8YQK", "paris-roubaix-2026": "evt_JF7GD1C4DTVZJF7GF1C4DTWTJF", "amstel-gold-race-2026": "evt_Z6KKEAGNVNXFZ6KKCAGNVNWMZ6", "fleche-wallonne-2026": "evt_BZ43SY67QKZZBZ43VY67QM0VBZ", "liege-bastogne-liege-2026": "evt_8G4WW570EJ1S8G4WT570EJ0Y8G", "clasica-san-sebastian-2026": "evt_VDDVTTTB3GBTVDDVWTTB3GCNVD", "il-lombardia-2026": "evt_BTXG8RD5NWFVBTXG6RD5NWF0BT", "ufc-300": "evt_38JM576PBC5X38JM376PBC5138", "ucl-final-2024": "evt_PH1C32ZAEK9TPH1C12ZAEK8ZPH", "world-cup-qatar-2022": "evt_61SP4437XDBZ61SP2437XDB461", "world-cup-russia-2018": "evt_YNX91GHP7HZJYNX93GHP7J0DYN", "world-cup-brazil-2014": "evt_MMDBDWFY73FMMMDBBWFY73ESMM", "copa-america-2024": "evt_MHCB04QT475QMHCB24QT476JMH", "afcon-2024": "evt_PYN4WCFYSGR3PYN4TCFYSGQ8PY", "rugby-world-cup-2023": "evt_ZWXVXGXN286NZWXVZGXN287GZW", "six-nations-2024": "evt_63Z5KSYR1HS763Z5HSYR1HRC63", "t20-world-cup-2024": "evt_E6VMQ5TVCT68E6VMS5TVCT73E6", "wimbledon-2024": "evt_8ZS6A4ATFMV38ZS684ATFMT88Z", "berlin-marathon-2023": "evt_FRE66085WGKMFRE68085WGMFFR", "olympics-100m-2024": "evt_HP7XPER2F1T2HP7XMER2F1S7HP", "olympics-opening-2024": "evt_5W50JA8F58AA5W50GA8F589F5W", "winter-olympics-opening-2022": "evt_3PEZFMACFEDB3PEZDMACFECF3P", "ryder-cup-2023": "evt_DJADRY5W4PK9DJADTY5W4PM5DJ", "masters-2024": "evt_7N0YCT50QY527N0YAT50QY477N", "f1-monaco-2024": "evt_JTHE7M9TB41YJTHE5M9TB413JT", "nba-playoffs-2024": "evt_3854V2KN6RP43854X2KN6RPZ38", "premier-league-2024": "evt_XZNF6CTC2DD1XZNF8CTC2DDWXZ", "roland-garros-2024": "evt_4ZBW6B80M93X4ZBW4B80M9324Z", "ucl-final-2014": "evt_K5XYV537VXJTK5XYX537VXKNK5", "classic-football-spotlight": "evt_REJS8WGQF36TREJSAWGQF37NRE", "rugby-test-2023": "evt_8DN7TR6F0JZZ8DN7RR6F0JZ38D", "rugby-classic-2022": "evt_A8WV3SQD4YPEA8WV5SQD4YQ9A8", "leeds-forest-2026": "evt_4Z6S0ZV4SHB84Z6RYZV4SHAC4Z", "supercopa-rei-2026": "evt_NRQTQQ871G1RNRQTNQ871G0XNR", "volta-valencia-2026-stage-1": "evt_GTK793BPTEDSGTK773BPTECYGT", "volta-valencia-2026-stage-2": "evt_DN6G73B8MR0EDN6G93B8MR1ADN", "mayweather-pacquiao-2015": "evt_KBXT96B0KXPNKBXT76B0KXNSKB", "sinner-atp-finals-2023": "evt_GQS1JYKF9B8HGQS1MYKF9B9CGQ", "kobe-81-2006": "evt_RCXRKTE1ZD5MRCXRHTE1ZD4SRC", "yamal-breakthrough-2024": "evt_PNGZE4BSGTWPPNGZC4BSGTVVPN", "jordan-game6-1998": "evt_NKZN0BGCCKPXNKZN2BGCCKQRNK", "phelps-beijing-2008": "evt_1J72EK830Y6G1J72CK830Y5N1J", "schumacher-title-2004": "evt_C2BNA4S1XTT4C2BNC4S1XTTZC2", "tyson-holyfield-1997": "evt_07GCYASQ1FC307GD0ASQ1FCY07", "jokic-mvp-2023": "evt_TNNNYRQFVKSVTNNNWRQFVKS0TN", "federer-wimbledon-2017": "evt_TPV6NW8D17E4TPV6KW8D17D9TP", "serena-usopen-2014": "evt_67VVB4KZT9VZ67VVD4KZT9WT67", "shaq-finals-2000": "evt_1J2862J9H2BJ1J2842J9H2AP1J", "ohtani-2023-season": "evt_397V35GZ417T397V55GZ418P39"},
  athletes: {"a-mbappe": "ath_8DAHGRY334558DAHJRY334608D", "a-lebron": "ath_2XDY9NV3RD302XDY7NV3RD252X", "a-swiatek": "ath_PKE2AMX10M3APKE28MX10M2FPK", "a-verstappen": "ath_WG635X9EQAS8WG633X9EQARDWG", "a-pogacar": "ath_3CXXQC4658C23CXXSC4658CY3C", "a-rodri": "ath_8Q94NQ3W2FRP8Q94KQ3W2FQV8Q", "a-saka": "ath_N6W2GXXCXK50N6W2EXXCXK45N6", "a-tatum": "ath_1AAXPJG7W5SB1AAXRJG7W5T61A", "a-aja": "ath_VKTRT0PRSFGGVKTRR0PRSFFNVK", "a-sabalenka": "ath_TRXR02Z415Z0TRXQY2Z415Y5TR", "a-hamilton": "ath_ZXS5W10AYYXXZXS5T10AYYX2ZX", "a-dupont": "ath_W8JCJFA1TQDTW8JCGFA1TQCZW8", "a-jalibert": "ath_SVFJ6ZG3NJDBSVFJ8ZG3NJE6SV", "a-vingegaard": "ath_GB62VD6BEWWPGB62SD6BEWVVGB", "a-van-der-poel": "ath_X98K12PHZKMFX98JZ2PHZKKMX9", "a-van-aert": "ath_EY474310H193EY472310H188EY", "a-del-toro": "ath_D7G4H9K3PZ0YD7G4H9K3PZ0Y1", "a-de-lie": "ath_W0L9P7X2MZ3AW0L9P7X2MZ3A", "a-scaroni": "ath_Z6F8B3R1QY5GZ6F8B3R1QY5G", "a-milan": "ath_P5N8M2A6L1OP5N8M2A6L1O", "a-andresen": "ath_U3T9A4N5D2RSU3T9A4N5D2R", "a-storer": "ath_S6T4O7R9E1M0S6T4O7R9E1M", "a-jorgenson": "ath_J1O8R2G5N4S6M3J1O8R2G5N4S", "a-gall": "ath_G7A3L2F9X1ZFG7A3L2F9X1Z", "a-evenepoel": "ath_Z60126046HCPZ60146046HDHZ6", "a-roglic": "ath_351FB7FV6WXY351F97FV6WX235", "a-bernal": "ath_9WJD29Q5R5579WJD09Q5R54C9W", "a-alaphilippe": "ath_GWKFA456YH73GWKFC456YH7YGW", "a-pidcock": "ath_M3HFS2BYPBCEM3HFV2BYPBD9M3", "a-ganna": "ath_3T17JAP1V9GK3T17MAP1V9HE3T", "a-almeida": "ath_5GCWSR7K02VZ5GCWVR7K02WT5G", "a-adam-yates": "ath_27J8E524R71C27J8C524R70H27", "a-simon-yates": "ath_Y3T2TTQH47A1Y3T2WTQH47AWY3", "a-hirschi": "ath_SVANEWFBD59GSVANCWFBD58NSV", "a-mohoric": "ath_11NDCYYCVB2A11NDEYYCVB3511", "a-matthews": "ath_X84VB7CB30X2X84VD7CB30XXX8", "a-bettiol": "ath_6SFYZ3KWDQ936SFZ13KWDQ9Y6S", "a-laporte": "ath_SCZX5C7936K7SCZX7C7936M2SC", "a-sepp-kuss": "ath_XAWPJZKJB777XAWPMZKJB782XA", "a-girmay": "ath_N501XDCY6Q7JN501ZDCY6Q8DN5", "a-philipsen": "ath_SHPKTH0N4YPASHPKRH0N4YNFSH", "a-pedersen": "ath_32HDK9KWYYDY32HDH9KWYYD332", "a-ntamack": "ath_3YCZHBJCC34X3YCZKBJCC35R3Y", "a-alldritt": "ath_7YGNAH8F083P7YGN8H8F082V7Y", "a-penaud": "ath_MF6060GPA1VPMF6080GPA1WJMF", "a-ramos": "ath_0TCAG4KSAX6B0TCAE4KSAX5G0T", "a-fickou": "ath_61A2HR3PGMBV61A2KR3PGMCP61", "a-itoje": "ath_AM39ZSNFBWD3AM3A1SNFBWDYAM", "a-farrell": "ath_F4F365KAG0E3F4F345KAG0D8F4", "a-marcus-smith": "ath_PR56RGM35V8APR56TGM35V96PR", "a-finn-russell": "ath_8Z2C4AH31K5H8Z2C2AH31K4P8Z", "a-stuart-hogg": "ath_TJRA41E55NE1TJRA61E55NEWTJ", "a-huw-jones": "ath_7X3PGM4VRY9Q7X3PEM4VRY8V7X", "a-sexton": "ath_9RQX1NYQJ1GK9RQX3NYQJ1HE9R", "a-van-der-flier": "ath_N2SNF28K7ZRSN2SND28K7ZQYN2", "a-furlong": "ath_Y3E3HXE00M28Y3E3KXE00M33Y3", "a-doris": "ath_ZT6J0ZR4DE2AZT6J2ZR4DE35ZT", "a-alun-wyn-jones": "ath_61J2QNK4N4ZR61J2SNK4N50K61", "a-rees-zammit": "ath_EZFG6D020D6QEZFG4D020D5WEZ", "a-biggar": "ath_AD3VW963QAJNAD3VT963QAHTAD", "a-garbisi": "ath_VM8N3ZX0V20TVM8N5ZX0V21NVM", "a-capuozzo": "ath_8M9ATS4RV4JG8M9AWS4RV4KB8M", "a-adesanya": "ath_C5PX86HWNR3XC5PX66HWNR31C5", "a-ngannou": "ath_JJGT7QW30GEXJJGT5QW30GE2JJ", "a-alcaraz": "ath_K46DDVFYGTG3K46DBVFYGTF8K4", "a-conor": "ath_8E4ZJRXKW16M8E4ZMRXKW17F8E", "a-ronaldo": "ath_MDMWEMWZAWB3MDMWGMWZAWBYMD", "a-beckham": "ath_194F5AQVZDXY194F7AQVZDYS19", "a-kipchoge": "ath_Z7FYM0G9GJRNZ7FYJ0G9GJQTZ7", "a-haaland": "ath_BYHYJ4HNNZ7YBYHYM4HNNZ8SBY", "a-alonso": "ath_YFK5F337GWFDYFK5D337GWEJYF", "a-mayweather": "ath_XCRSKKCM3DCHXCRSNKCM3DDDXC", "a-giannis": "ath_X9X6HNM98RBMX9X6KNM98RCFX9", "a-sinner": "ath_6BABK0E93QDK6BABN0E93QEE6B", "a-bellingham": "ath_V8TERW1F6792V8TETW1F679XV8", "a-benzema": "ath_SBTJ3VSZW7QDSBTJ1VSZW7PHSB", "a-debruyne": "ath_3F9D82MYJRPF3F9D62MYJRNM3F", "a-durant": "ath_Z0CYM9RH764MZ0CYJ9RH763SZ0", "a-kobe": "ath_N7C474004NVDN7C494004NW8N7", "a-yamal": "ath_TA6WM2YK8XY9TA6WJ2YK8XXETA", "a-messi": "ath_6MJ3P7XNNGN26MJ3R7XNNGNX6M", "a-modric": "ath_V87M22C54VZVV87M02C54VZ0V8", "a-jordan": "ath_W9Y4X8F0XBNFW9Y4V8F0XBMMW9", "a-phelps": "ath_VAGZW3PQB2RJVAGZT3PQB2QQVA", "a-schumacher": "ath_0MV0SPE9DTFT0MV0VPE9DTGN0M", "a-shiffrin": "ath_XVGXQ6Z4WMR4XVGXS6Z4WMRZXV", "a-tyson": "ath_7W7N9E4RCHHW7W7NBE4RCHJQ7W", "a-neymar": "ath_FYQHY66M4ZFTFYQHW66M4ZEYFY", "a-jokic": "ath_FX1YTZBV3PG1FX1YRZBV3PF6FX", "a-djokovic": "ath_S9FZ4914JG25S9FZ6914JG30S9", "a-nadal": "ath_K8V86MPDYJY0K8V84MPDYJX5K8", "a-federer": "ath_DMCZJ6P7TQE9DMCZM6P7TQF4DM", "a-ronaldinho": "ath_ASH52VT7Z0NPASH50VT7Z0MVAS", "a-mane": "ath_DET1K779X35XDET1N779X36RDE", "a-serena": "ath_RFPYMC7WK10GRFPYJC7WK0ZNRF", "a-shaq": "ath_WQ1CN57PQNGXWQ1CQ57PQNHRWQ", "a-ohtani": "ath_7V7QPYY5WZJ47V7QRYY5WZJZ7V", "a-biles": "ath_KDDNYYEXZPWWKDDP0YEXZPXQKD", "a-curry": "ath_3EW6ZYCVQC873EW71YCVQC923E", "a-tiger": "ath_T06545873PQNT06565873PRGT0", "a-bolt": "ath_YVS6E1G4V7ABYVS6G1G4V7B7YV", "a-hanyu": "ath_K9J3JW7THRATK9J3MW7THRBPK9", "a-zidane": "ath_0YHPN79Y60960YHPQ79Y60A10Y", "a-duplantis": "ath_Q7XYPASR5VS7Q7XYMASR5VRCQ7", "a-senna": "ath_HH6SQ7JWPY1GHH6SS7JWPY2BHH"},
  teams: {"t-real-madrid": "tm_TEQA79WSWY5GTEQA99WSWY6BTE", "t-man-city": "tm_5225QYARZGVR5225SYARZGWK52", "t-arsenal": "tm_030PARA1RYP1030PCRA1RYPW03", "t-liverpool": "tm_W9XJZMCB2E47W9XK1MCB2E52W9", "t-france-football": "tm_BDCJ960ZWVG6BDCJ760ZWVFBBD", "t-argentina": "tm_VHSCCA6SE39HVHSCAA6SE38PVH", "t-brazil": "tm_4K4X0NQSCCDB4K4X2NQSCCE64K", "t-senegal": "tm_56YBRFV0285C56YBPFV0284H56", "t-leeds": "tm_43R35C2CTZPT43R33C2CTZNZ43", "t-nottingham-forest": "tm_91VNVCC07Y3891VNSCC07Y2D91", "t-flamengo": "tm_TS1HF9NAEDTPTS1HD9NAEDSVTS", "t-corinthians": "tm_WVTXJT9KZ04QWVTXMT9KZ05KWV", "t-lakers": "tm_YWWKB6VYW1TWYWWKD6VYW1VQYW", "t-celtics": "tm_Y7N59W7VHN0CY7N57W7VHMZHY7", "t-aces": "tm_TVGZGJFCJT9MTVGZJJFCJTAFTV", "t-liberty": "tm_PGXXVHV935C1PGXXSHV935B6PG", "t-warriors": "tm_84N5TZZCDWB284N5RZZCDWA784", "t-france-rugby": "tm_490FYFV4C8XB490FWFV4C8WG49", "t-ireland-rugby": "tm_ST6YEF7ATNHKST6YCF7ATNGRST", "t-england-rugby": "tm_MKQJ36CMK808MKQJ16CMK7ZDMK", "t-scotland-rugby": "tm_67FZXF65J0SV67FZZF65J0TP67", "t-wales-rugby": "tm_W71BADS3BN91W71BCDS3BN9XW7", "t-italy-rugby": "tm_JY0A0A7KCXX9JY09YA7KCXWEJY", "t-red-bull": "tm_YM59JRV9KA9HYM59GRV9KA8PYM", "t-mercedes": "tm_ESJ72M82SZECESJ74M82SZF7ES"},
  users: {"u-diego": "usr_2SGNEH2HBH7S2SGNCH2HBH6Y2S", "u-nina": "usr_ZZG4WXPGSFTZZZG4TXPGSFT4ZZ", "u-marcus": "usr_WCPDCEC9K78HWCPDEEC9K79CWC", "u-elle": "usr_1Y8A7RTBXKQ71Y8A5RTBXKPC1Y", "u-jamal": "usr_B2E0M1X3B939B2E0P1X3B944B2", "u-riley": "usr_E3GXNGXY98Y8E3GXQGXY98Z3E3", "u-louise": "usr_KHHE5RBM3W4HKHHE7RBM3W5CKH"},
  lists: {"tour-de-france": "lst_1SHKFBQECVCF1SHKDBQECVBM1S", "derbies-europe": "lst_5T7XEK952GVJ5T7XGK952GWD5T", "finales-legendes": "lst_FFNBNW65RMQYFFNBKW65RMQ3FF"},
  reviews: {"rev-ucl-1": "rev_YTYBDA1BW1W0YTYBBA1BW1V5YT", "rev-ucl-2": "rev_VNHMBA0XPBENVNHMDA0XPBFHVN", "rev-nba-1": "rev_ZPVBFKTBARYKZPVBHKTBARZEZP", "rev-f1-1": "rev_31BVTTQW7G9131BVWTQW7G9W31", "rev-tdf-1": "rev_34TTAXM7APXQ34TT8XM7APWW34", "rev-tdf-2": "rev_48AW0XMCDHCQ48AW2XMCDHDJ48", "rev-tdf-3": "rev_5CWQ6XMHQG9R5CWQ4XMHQG8X5C", "rev-ufc-1": "rev_87MKF78V3ZBM87MKD78V3ZAS87", "rev-foot-2026-1": "rev_3A7M248S48B83A7M448S48C33A", "rev-foot-2026-2": "rev_6FM344979VBV6FM324979VB06F", "rev-foot-2026-3": "rev_5BXHY4925PYF5BXJ04925PZA5B", "rev-foot-2026-4": "rev_8R3H049HSG9A8R3GY49HSG8F8R", "rev-foot-2026-5": "rev_7KZ6T49CJCXQ7KZ6W49CJCYK7K", "rev-foot-2026-6": "rev_ASBXW49TR3B2ASBXT49TR3A7AS", "rev-foot-2026-7": "rev_9VKJP49PWARA9VKJR49PWAS59V", "rev-foot-2026-8": "rev_VMY2R47P6FXRVMY2P47P6FWWVM", "rev-foot-2026-9": "rev_TQK8J47JDJWDTQK8M47JDJX8TQ", "rev-foot-2026-10": "rev_ERG403EH6PCPERG423EH6PDHER", "rev-foot-2026-11": "rev_FWME63EPDSR8FWME43EPDSQDFW", "rev-foot-2026-12": "rev_H0ZHW3EVPBA5H0ZHY3EVPBB0H0", "rev-foot-2026-13": "rev_J4PB23F0TK49J4PB03F0TK3EJ4", "rev-foot-2026-14": "rev_K91ER3F634P5K91ET3F634Q1K9", "rev-foot-2026-15": "rev_M6C8Y3F9W1QGM6C8W3F9W1PNM6", "rev-foot-2026-16": "rev_N9W2M3FEYRSRN9W2P3FEYRTKN9", "rev-foot-2026-17": "rev_PEE5T3FM8V3GPEE5R3FM8V2NPE", "rev-foot-2026-18": "rev_65VRG3DAG0XV65VRJ3DAG0YP65", "rev-foot-2026-19": "rev_7A02P3DFQ49E7A02M3DFQ48J7A", "rev-foot-2026-20": "rev_5FD8R9CSZ8VG5FD8P9CSZ8TM5F", "rev-wt-2025-1": "rev_KHWQP67Z18SAKHWQR67Z18T6KH", "rev-wt-2025-2": "rev_PQ9ER68D6Z6NPQ9EP68D6Z5TPQ", "rev-wt-2025-3": "rev_NJQKJ687X09NNJQKM687X0AGNJ", "rev-wt-2025-4": "rev_G5FQ467FBXVDG5FQ267FBXTJG5", "rev-wt-2025-5": "rev_F84WY67BK0T3F84X067BK0TYF8", "rev-wt-2025-6": "rev_JDHM067SRQ7EJDHKY67SRQ6KJD", "rev-wt-2025-7": "rev_H9TTT67MMFDAH9TTW67MMFE5H9", "rev-wt-2025-8": "rev_BWK6C66W3GBTBWK6A66W3GAZBW", "rev-wt-2025-9": "rev_ARET666PWC52ARET866PWC5XAR", "rev-sixn-2026-1": "rev_0X8Z5C9NFEMY0X8Z7C9NFENS0X", "rev-sixn-2026-2": "rev_ZRXVFC9G6X31ZRXVDC9G6X26ZR", "rev-sixn-2026-3": "rev_YVK19C9CE01QYVK1BC9CE02JYV", "rev-sixn-2026-4": "rev_6AQK3CAE1YE96AQK1CAE1YDE6A", "rev-sixn-2026-5": "rev_565QXCA8QZH9565QZCA8QZJ456", "rev-sixn-2026-6": "rev_49F67CA53BCH49F65CA53BBP49", "rev-fun-ucl-final": "rev_2BQ69X9CHQJW2BQ6BX9CHQKQ2B", "rev-fun-nba-playoffs": "rev_W2DMP9RD3A4QW2DMM9RD3A3WW2", "rev-fun-roland-garros": "rev_ZTGF6A53YX1BZTGF8A53YX26ZT", "rev-fun-f1-monaco": "rev_VQ7XXQCKDASQVQ7XZQCKDATJVQ", "rev-fun-premier-league": "rev_98D3Z80B3BBC98D3X80B3BAG98", "rev-fun-six-nations": "rev_23VBAHSCHF2Q23VBCHSCHF3J23", "rev-fun-wnba-finals": "rev_NW4DGS07R92JNW4DES07R91QNW", "rev-fun-tour-stage-18": "rev_D29M36ETCDW8D29M56ETCDX3D2", "rev-fun-tour-stage-12": "rev_KCEKQ6FPKF8TKCEKS6FPKF9NKC", "rev-fun-tour-stage-20": "rev_Z1B2B48E3NR3Z1B2948E3NQ8Z1", "rev-fun-ufc-300": "rev_E8HX9CSYEVEGE8HX7CSYEVDNE8", "rev-fun-ucl-final-2024": "rev_K43YMCYC7XV0K43YJCYC7XT5K4", "rev-fun-world-cup-qatar-2022": "rev_8SWK1C81QQ058SWJZC81QPZA8S", "rev-fun-world-cup-russia-2018": "rev_QP2TGQMN4MKSQP2TJQMN4MMMQP", "rev-fun-world-cup-brazil-2014": "rev_RDR1R0P53N82RDR1P0P53N77RD", "rev-fun-copa-america-2024": "rev_J6PWKNH188J7J6PWNNH188K2J6", "rev-fun-afcon-2024": "rev_25E4GGPE7P4R25E4EGPE7P3X25", "rev-fun-rugby-world-cup-2023": "rev_2F6JWM9AE8P62F6JYM9AE8Q12F", "rev-fun-six-nations-2024": "rev_T69E30WTRJ78T69E10WTRJ6DT6", "rev-fun-t20-world-cup-2024": "rev_WYK202PAXREQWYK222PAXRFJWY", "rev-fun-wimbledon-2024": "rev_J3151E49X63JJ314ZE49X62QJ3", "rev-fun-berlin-marathon-2023": "rev_5YGC402QW7KQ5YGC602QW7MJ5Y", "rev-fun-olympics-100m-2024": "rev_WHVVJ4MGHWAFWHVVG4MGHW9MWH", "rev-fun-olympics-opening-2024": "rev_G9QDWC29KMGHG9QDTC29KMFNG9", "rev-fun-winter-olympics-opening-2022": "rev_BPESMBT5QWCYBPESJBT5QWC3BP", "rev-fun-ryder-cup-2023": "rev_QRVR1F7TTCNCQRVR3F7TTCP7QR", "rev-fun-masters-2024": "rev_B2QG28FHGM2BB2QG08FHGM1GB2", "rev-fun-f1-monaco-2024": "rev_K4R42ZFZ40ECK4R40ZFZ40DHK4", "rev-fun-nba-playoffs-2024": "rev_ZJR439FA8DCSZJR459FA8DDMZJ", "rev-fun-premier-league-2024": "rev_YWSYWK726S27YWSYYK726S32YW", "rev-fun-roland-garros-2024": "rev_FS32TCGDHG18FS32RCGDHG0DFS", "rev-fun-ucl-final-2014": "rev_152JCF4RGPTC152JEF4RGPV715", "rev-fun-classic-football-spotlight": "rev_T0EZF2XJ19Z3T0EZH2XJ19ZYT0", "rev-fun-rugby-test-2023": "rev_F27R8HBTHWRGF27R6HBTHWQNF2", "rev-fun-rugby-classic-2022": "rev_NM6NCQ9W81MXNM6NEQ9W81NRNM", "rev-fun-mayweather-pacquiao-2015": "rev_MR3WTEAE5P59MR3WREAE5P4EMR", "rev-fun-sinner-atp-finals-2023": "rev_N3RPJFF8WZMEN3RPMFF8WZN9N3", "rev-fun-kobe-81-2006": "rev_X50VVYNZHDGWX50VSYNZHDG1X5", "rev-fun-yamal-breakthrough-2024": "rev_RFNAVEP541EPRFNASEP541DVRF", "rev-fun-jordan-game6-1998": "rev_4GKZR81E2BT44GKZT81E2BTZ4G", "rev-fun-phelps-beijing-2008": "rev_R21QZEP3BFKRR21QXEP3BFJWR2", "rev-fun-schumacher-title-2004": "rev_NSWB531CCGRCNSWB731CCGS7NS", "rev-fun-tyson-holyfield-1997": "rev_ZSEDCY65DTXTZSEDEY65DTYNZS", "rev-fun-jokic-mvp-2023": "rev_A4YP2JHP1G3PA4YP0JHP1G2VA4", "rev-fun-federer-wimbledon-2017": "rev_7TZ1V7HE43YR7TZ1S7HE43XX7T", "rev-fun-serena-usopen-2014": "rev_S37FPVQ4W4GTS37FRVQ4W4HPS3", "rev-fun-shaq-finals-2000": "rev_KSZZV353X7W4KSZZS353X7V9KS", "rev-fun-ohtani-2023-season": "rev_MCMA6KG5K7XFMCMA8KG5K7YAMC", "rev-fun-leeds-forest-2026": "rev_5VJ707C5F2BM5VJ6Y7C5F2AS5V", "rev-fun-supercopa-2026": "rev_60298MD4YGR56029AMD4YGS060", "rev-fun-volta-valencia-1-2026": "rev_FDCM8VZ55VZXFDCMAVZ55W0RFD", "rev-fun-volta-valencia-2-2026": "rev_RWQV76XT53EWRWQV56XT53E1RW"},
  comments: {"com-roland-1": "cmt_4WGZP9SW528Z4WGZM9SW52844W", "rep-roland-1": "cmt_W6G5V2HBKH35W6G5S2HBKH2AW6", "com-premier-1": "cmt_5RQQ13QSAMSQ5RQPZ3QSAMRW5R", "rep-premier-1": "cmt_VRATRT87JW20VRATPT87JW14VR", "com-six-1": "cmt_K125D2T2ZVA4K125B2T2ZV99K1", "rep-six-1": "cmt_KH8AZ8YP5E7WKH8AX8YP5E71KH", "com-wnba-1": "cmt_153GD00N6J1J153GB00N6J0Q15", "com-tour-18": "cmt_M6EZXHJ7D6TNM6EZVHJ7D6STM6", "rep-tour-1": "cmt_5JP7XQ1NRWZT5JP7VQ1NRWYZ5J", "com-tour-12": "cmt_DN319HH9N4DKDN317HH9N4CRDN", "com-tour-20": "cmt_MP47NBJPFVZGMP47QBJPFW0CMP"},
  replies: {"rep-roland-1": "rep_W6G5V2HBKH35W6G5S2HBKH2AW6", "rep-premier-1": "rep_VRATRT87JW20VRATPT87JW14VR", "rep-six-1": "rep_KH8AZ8YP5E7WKH8AX8YP5E71KH", "rep-tour-1": "rep_5JP7XQ1NRWZT5JP7VQ1NRWYZ5J"},
};

const legacyCommentMap = Object.fromEntries(
  Object.entries(legacyIdMaps.comments).filter(([key]) => !key.startsWith("rep-"))
);

const state = {
  filter: "Tous",
  query: "",
};

const watchlistState = {
  filter: "Tous",
  query: "",
  sort: "date",
};

const calendarState = {
  watchlistMonthMode: true,
  spotlightOnly: false,
};

const tierlistState = {
  sport: "Tous",
  fromMonthKey: null,
  toMonthKey: null,
};

renderSiteHeader();
renderSiteFooter();

const filtersEl = document.getElementById("sport-filters");
const eventsListEl = document.getElementById("events-list");
const eventsSummaryEl = document.getElementById("events-summary");
const searchInput = document.getElementById("search-input");
const statEvents = document.getElementById("stat-events");
const statSports = document.getElementById("stat-sports");
const detailEl = document.getElementById("event-detail");
const reviewListEl = document.getElementById("review-list");
const leagueDetailEl = document.getElementById("league-detail");
const leagueReviewListEl = document.getElementById("league-review-list");
const leagueCommentComposerEl = document.getElementById("league-comment-composer");
const leagueSeasonBackLinkEl = document.getElementById("league-season-back-link");
const leaguePageDetailEl = document.getElementById("league-page-detail");
const leagueSeasonListEl = document.getElementById("league-season-list");
const leaguePageReviewListEl = document.getElementById("league-page-review-list");
const leaguePageCommentComposerEl = document.getElementById("league-page-comment-composer");
const anticipatedListEl = document.getElementById("anticipated-list");
const bestMonthListEl = document.getElementById("best-month-list");
const curatedListEl = document.getElementById("curated-list");
const globalSearchInput = document.getElementById("global-search-input");
const globalSearchResults = document.getElementById("global-search-results");
const bestOfListEl = document.getElementById("bestof-list");
const bestOfRangeEl = document.getElementById("bestof-range");
const bestOfSportEl = document.getElementById("bestof-sport");
const heroFeaturedEl = document.getElementById("hero-featured");
const heroPrevButton = document.getElementById("hero-prev");
const heroNextButton = document.getElementById("hero-next");
const heroDotsEl = document.getElementById("hero-dots");
const watchlistListEl = document.getElementById("watchlist-list");
const watchlistItemsEl = document.getElementById("watchlist-items");
const watchlistSummaryEl = document.getElementById("watchlist-summary");
const watchlistFilterEl = document.getElementById("watchlist-filter");
const watchlistSearchInput = document.getElementById("watchlist-search-input");
const watchlistSortSelect = document.getElementById("watchlist-sort");
const listDetailEl = document.getElementById("list-detail");
const listEventsEl = document.getElementById("list-events");
const listSidebarEl = document.getElementById("list-sidebar");
const listReviewListEl = document.getElementById("list-review-list");
const listCommentComposerEl = document.getElementById("list-comment-composer");
const userDetailEl = document.getElementById("user-detail");
const athleteDetailEl = document.getElementById("athlete-detail");
const athleteEventsEl = document.getElementById("athlete-events-list");
const athleteReviewListEl = document.getElementById("athlete-review-list");
const athleteCommentComposerEl = document.getElementById("athlete-comment-composer");
const teamDetailEl = document.getElementById("team-detail");
const teamEventsEl = document.getElementById("team-events-list");
const teamAthletesEl = document.getElementById("team-athletes-list");
const teamReviewListEl = document.getElementById("team-review-list");
const teamCommentComposerEl = document.getElementById("team-comment-composer");
const userListsEl = document.getElementById("user-lists");
const homeReviewsEl = document.getElementById("home-reviews");
const homeListsEl = document.getElementById("home-lists");
const feedAlgorithmEl = document.getElementById("feed-algorithm");
const feedHelpToggleEl = document.getElementById("feed-help-toggle");
const feedStreamEl = document.getElementById("feed-stream");
const feedModeSwitchEl = document.getElementById("feed-mode-switch");
const feedTitleEl = document.getElementById("feed-title");
const feedSubtitleEl = document.getElementById("feed-subtitle");
const eventCommentComposerEl = document.getElementById("event-comment-composer");
const objectFeedHelpToggleEl = document.getElementById("object-feed-help-toggle");
const objectFeedStreamEl = document.getElementById("object-feed-stream");
const objectFeedModeSwitchEl = document.getElementById("object-feed-mode-switch");
const objectFeedSeeAllLinkEl = document.getElementById("object-feed-see-all");
const objectFeedTitleEl = document.getElementById("object-feed-title");
const objectFeedSubtitleEl = document.getElementById("object-feed-subtitle");
const objectFeedAddActionEl = document.getElementById("object-feed-add-action");
const feedTopLikedCommentsEl = document.getElementById("feed-top-liked-comments");
const feedFollowingCommentsEl = document.getElementById("feed-following-comments");
const feedFollowedLikedCommentsEl = document.getElementById("feed-followed-liked-comments");
const feedTopLikedRankingsEl = document.getElementById("feed-top-liked-rankings");
const feedAdaptedRankingsEl = document.getElementById("feed-adapted-rankings");
const feedMostLikedEventsEl = document.getElementById("feed-most-liked-events");
const feedMostAwaitedEventsEl = document.getElementById("feed-most-awaited-events");
const feedFavoritesEventsEl = document.getElementById("feed-favorites-events");
const feedUserSuggestionsEl = document.getElementById("feed-user-suggestions");
const feedCompareCompactEl = document.getElementById("feed-compare-compact");
const feedCompareEditorialEl = document.getElementById("feed-compare-editorial");
const calendarDateEl = document.getElementById("calendar-date");
const calendarPeriodControlsEl = document.getElementById("calendar-period-controls");
const calendarMonthLabelEl = document.getElementById("calendar-month-label");
const calendarYearLabelEl = document.getElementById("calendar-year-label");
const calendarListEl = document.getElementById("calendar-list");
const calendarSummaryEl = document.getElementById("calendar-summary");
const calendarModeListEl = document.getElementById("calendar-mode-list");
const calendarModeWatchlistEl = document.getElementById("calendar-mode-watchlist");
const calendarFocusSpotlightEl = document.getElementById("calendar-focus-spotlight");
const userReviewsEl = document.getElementById("user-reviews");
const userLikedCommentsEl = document.getElementById("user-liked-comments");
const userAboutEl = document.getElementById("user-about");
const userActivityEl = document.getElementById("user-activity");
const dataShowcaseEl = document.getElementById("data-showcase");
const uiFrameSamplesEl = document.getElementById("ui-frame-samples");
const uiCardsSamplesEl = document.getElementById("ui-cards-samples");
const uiEventCardsEl = document.getElementById("ui-event-cards");
const uiListCardsEl = document.getElementById("ui-list-cards");
const uiReviewCardsEl = document.getElementById("ui-review-cards");
const uiEventMiniaturesEl = document.getElementById("ui-event-miniatures");
const uiEventOverlaySamplesEl = document.getElementById("ui-event-overlay-samples");
const uiEventImageFilterSamplesEl = document.getElementById("ui-event-image-filter-samples");
const uiCalendarMiniaturesEl = document.getElementById("ui-calendar-miniatures");
const uiSofaGaugesEl = document.getElementById("ui-sofa-gauges");
const uiRatingDistributionEl = document.getElementById("ui-rating-distribution");
const uiSorareSamplesEl = document.getElementById("ui-sorare-samples");
const uiEventTopElementsEl = document.getElementById("ui-event-top-elements");
const uiWatchlistSwitchSamplesEl = document.getElementById("ui-watchlist-switch-samples");
const uiWatchlistPeriodSamplesEl = document.getElementById("ui-watchlist-period-samples");
const uiWatchlistPeriodRangeSamplesEl = document.getElementById("ui-watchlist-period-range-samples");
const uiPlayerMiniatureSamplesEl = document.getElementById("ui-player-miniature-samples");
const uiCommentLikeMetricSamplesEl = document.getElementById("ui-comment-like-metric-samples");
const uiAnswersNumberSamplesEl = document.getElementById("ui-answers-number-samples");
const uiFollowButtonSamplesEl = document.getElementById("ui-follow-button-samples");
const uiUserIdentitySamplesEl = document.getElementById("ui-user-identity-samples");
const uiCommentHeaderSamplesEl = document.getElementById("ui-comment-header-samples");
const uiRelativeDateSamplesEl = document.getElementById("ui-relative-date-samples");
const uiTagTextboxSamplesEl = document.getElementById("ui-tag-textbox-samples");
const uiObjectTagsSamplesEl = document.getElementById("ui-object-tags-samples");
const uiSportFilterSamplesEl = document.getElementById("ui-sport-filter-samples");
const uiTextFormatSamplesEl = document.getElementById("ui-text-format-samples");
const uiEventDescriptionSamplesEl = document.getElementById("ui-event-description-samples");
const uiColorPaletteEl = document.getElementById("ui-color-palette");
const userSportCollectionEl = document.getElementById("user-sport-collection");
const userBestReviewsEl = document.getElementById("user-best-reviews");
const userRatingChartEl = document.getElementById("user-rating-chart");
const tierlistBoardEl = document.getElementById("tierlist-board");
const tierlistSummaryEl = document.getElementById("tierlist-summary");
const tierlistSportFiltersEl = document.getElementById("tierlist-sport-filters");
const tierlistPeriodFiltersEl = document.getElementById("tierlist-period-filters");

function safeStorageGetItem(key, fallback = "") {
  try {
    const value = localStorage.getItem(key);
    return value == null ? fallback : value;
  } catch (error) {
    return fallback;
  }
}

function safeStorageSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    return false;
  }
}

function parseStorageObject(key, fallback = {}) {
  try {
    const rawValue = safeStorageGetItem(key, "");
    if (!rawValue) return { ...fallback };
    const parsed = JSON.parse(rawValue);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return { ...fallback };
    }
    return parsed;
  } catch (error) {
    return { ...fallback };
  }
}

function parseStorageArray(key, fallback = []) {
  try {
    const rawValue = safeStorageGetItem(key, "");
    if (!rawValue) return [...fallback];
    const parsed = JSON.parse(rawValue);
    return Array.isArray(parsed) ? parsed : [...fallback];
  } catch (error) {
    return [...fallback];
  }
}

const ratingsKey = "cafesport.club_ratings";
let storedRatings = parseStorageObject(ratingsKey, {});
const reviewLikesKey = "cafesport.club_review_likes";
let storedReviewLikes = parseStorageObject(reviewLikesKey, {});
const commentLikesKey = "cafesport.club_comment_likes";
let storedCommentLikes = parseStorageObject(commentLikesKey, {});
const replyLikesKey = "cafesport.club_reply_likes";
let storedReplyLikes = parseStorageObject(replyLikesKey, {});
const watchlistKey = "cafesport.club_watchlist";
let storedWatchlist = parseStorageArray(watchlistKey, []);
const listLikesKey = "cafesport.club_list_likes";
let storedListLikes = parseStorageObject(listLikesKey, {});
const favoriteTimelineKey = "cafesport.club_favorite_timeline_v1";
let storedFavoriteTimeline = parseStorageObject(favoriteTimelineKey, {});
const userFollowsKey = "cafesport.club_user_follows";
let storedUserFollows = parseStorageObject(userFollowsKey, {});
const leagueFollowsKey = "cafesport.club_league_follows";
let storedLeagueFollows = parseStorageObject(leagueFollowsKey, {});
const leagueSeasonFollowsKey = "cafesport.club_league_season_follows";
let storedLeagueSeasonFollows = parseStorageObject(leagueSeasonFollowsKey, {});
const athleteFavoritesKey = "cafesport.club_athlete_favorites";
let storedAthleteFavorites = parseStorageObject(athleteFavoritesKey, {});
const teamFavoritesKey = "cafesport.club_team_favorites";
let storedTeamFavorites = parseStorageObject(teamFavoritesKey, {});
const userProfileImagesKey = "cafesport.club_user_profile_images";
let storedUserProfileImages = parseStorageObject(userProfileImagesKey, {});
const tagCatalogKey = "cafesport.club_tag_catalog_v2";
const objectTagsKey = "cafesport.club_object_tags_v2";
const objectTagVotesKey = "cafesport.club_object_tag_votes_v2";

let storedTagCatalog = parseStorageObject(tagCatalogKey, {});
let storedObjectTags = parseStorageObject(objectTagsKey, {});
let storedObjectTagVotes = parseStorageObject(objectTagVotesKey, {});
if (!storedTagCatalog || typeof storedTagCatalog !== "object" || Array.isArray(storedTagCatalog)) {
  storedTagCatalog = {};
}
if (!storedObjectTags || typeof storedObjectTags !== "object" || Array.isArray(storedObjectTags)) {
  storedObjectTags = {};
}
if (!storedObjectTagVotes || typeof storedObjectTagVotes !== "object" || Array.isArray(storedObjectTagVotes)) {
  storedObjectTagVotes = {};
}
const FEED_MODE_STORAGE_KEY = "sofa_feed_mode";
const FEED_OPTIONAL_TABS_STORAGE_KEY = "sofa_feed_optional_tabs_v1";
const FEED_SCOPE_MY = "my";
const FEED_SCOPE_OBJECT = "object";
const FEED_MODE_FOR_YOU = "for-you";
const FEED_MODE_RECENT = "recent";
const FEED_MODE_FAVORITES = "favorites";
const FEED_MODE_ACTIVITY_RECENT = "activity-recent";
const FEED_MODE_ACTIVITY_POPULAR = "activity-popular";
const FEED_MODE_POPULAR = "popular";
const FEED_TARGET_EVENT = "event";
const FEED_TARGET_USER = "user";
const FEED_TARGET_LEAGUE = "league";
const FEED_TARGET_LEAGUE_SEASON = "league-season";
const FEED_TARGET_ATHLETE = "athlete";
const FEED_TARGET_TEAM = "team";
const FEED_ALLOWED_MY_MODES = new Set([
  FEED_MODE_FOR_YOU,
  FEED_MODE_RECENT,
  FEED_MODE_FAVORITES,
  FEED_MODE_ACTIVITY_RECENT,
  FEED_MODE_ACTIVITY_POPULAR,
]);
const FEED_ALLOWED_OBJECT_MODES = new Set([
  FEED_MODE_RECENT,
  FEED_MODE_POPULAR,
]);
const FEED_ALLOWED_TARGET_TYPES = new Set([
  FEED_TARGET_EVENT,
  FEED_TARGET_USER,
  FEED_TARGET_LEAGUE,
  FEED_TARGET_LEAGUE_SEASON,
  FEED_TARGET_ATHLETE,
  FEED_TARGET_TEAM,
]);
let activeFeedMode = loadFeedMode();
let activeFeedRequest = null;
let activeObjectFeedRequest = null;
let storedOptionalFeedTabs = loadOptionalFeedTabs();
let activeSofaScorePointerState = null;

const idMigrationKey = "cafesport.club_id_migration_v2";
const ratingScaleKey = "cafesport.club_rating_scale_v100";
const replyLikesToCommentLikesMigrationKey = "cafesport.club_reply_likes_to_comment_likes_v1";
const favoriteTimelineSeedKey = "cafesport.club_favorite_timeline_seed_v1";
const objectTagsSeedKey = "cafesport.club_object_tags_seed_v2";

function remapObjectKeys(source, map, fallback) {
  if (!source) return {};
  const result = {};
  Object.entries(source).forEach(([key, value]) => {
    const mapped = map[key] || (fallback ? fallback(key) : null);
    if (mapped) {
      result[mapped] = value;
    }
  });
  return result;
}

function remapArray(source, map, fallback) {
  if (!Array.isArray(source)) return [];
  return source
    .map((key) => map[key] || (fallback ? fallback(key) : null))
    .filter(Boolean);
}

function getFavoriteTimelineEntryKey(type, id) {
  return `${String(type || "").trim()}:${String(id || "").trim()}`;
}

function remapFavoriteTimeline(source = {}) {
  const result = {};
  Object.entries(source || {}).forEach(([key, rawTs]) => {
    const [type, rawId] = String(key || "").split(":");
    const ts = Number(rawTs) || 0;
    if (!type || !rawId || !ts) return;
    let mappedId = rawId;
    if (type === "event") {
      mappedId = legacyIdMaps.events[rawId] || rawId;
    } else if (type === "list") {
      mappedId = legacyIdMaps.lists[rawId] || rawId;
    } else if (type === "athlete") {
      mappedId = legacyIdMaps.athletes[rawId] || rawId;
    } else if (type === "team") {
      mappedId = legacyIdMaps.teams[rawId] || rawId;
    } else if (type === "review") {
      mappedId = legacyIdMaps.reviews[rawId] || remapAutoReviewId(rawId) || rawId;
    } else if (type === "comment") {
      mappedId = legacyCommentMap[rawId] || remapAutoCommentId(rawId) || rawId;
    } else if (type === "reply") {
      mappedId = legacyIdMaps.replies[rawId] || remapAutoReplyId(rawId) || rawId;
    }
    const mappedKey = getFavoriteTimelineEntryKey(type, mappedId);
    result[mappedKey] = Math.max(Number(result[mappedKey] || 0), ts);
  });
  return result;
}

function remapAutoReviewId(oldId) {
  if (!oldId || !oldId.startsWith("rev-auto-")) return null;
  const legacyEventId = oldId.replace("rev-auto-", "");
  const newEventId = legacyIdMaps.events[legacyEventId];
  if (!newEventId) return null;
  return makeStableId("rev", `auto-${newEventId}`);
}

function remapAutoCommentId(oldId) {
  if (!oldId || !oldId.startsWith("com-auto-")) return null;
  const legacyEventId = oldId.replace("com-auto-", "");
  const newEventId = legacyIdMaps.events[legacyEventId];
  if (!newEventId) return null;
  return makeStableId("cmt", `auto-${newEventId}`);
}

function remapAutoReplyId(oldId) {
  if (!oldId) return null;
  const autoMatch = oldId.match(/^rep-auto-(.+)-(\\d)$/);
  if (autoMatch) {
    const legacyEventId = autoMatch[1];
    const newEventId = legacyIdMaps.events[legacyEventId];
    if (!newEventId) return null;
    return makeStableId("rep", `auto-${newEventId}-${autoMatch[2]}`);
  }
  const reviewMatch = oldId.match(/^rep-review-(.+)-(\\d)$/);
  if (reviewMatch) {
    const legacyReviewId = reviewMatch[1];
    const newReviewId = legacyIdMaps.reviews[legacyReviewId] || remapAutoReviewId(legacyReviewId);
    if (!newReviewId) return null;
    return makeStableId("rep", `review-${newReviewId}-${reviewMatch[2]}`);
  }
  return null;
}

function migrateStoredIds() {
  if (safeStorageGetItem(idMigrationKey, "")) {
    return;
  }
  storedRatings = remapObjectKeys(storedRatings, legacyIdMaps.events);
  storedWatchlist = remapArray(storedWatchlist, legacyIdMaps.events);
  storedListLikes = remapObjectKeys(storedListLikes, legacyIdMaps.lists);
  storedUserFollows = remapObjectKeys(storedUserFollows, legacyIdMaps.users);
  storedAthleteFavorites = remapObjectKeys(storedAthleteFavorites, legacyIdMaps.athletes);
  storedTeamFavorites = remapObjectKeys(storedTeamFavorites, legacyIdMaps.teams);
  storedReviewLikes = remapObjectKeys(storedReviewLikes, legacyIdMaps.reviews, remapAutoReviewId);
  storedCommentLikes = remapObjectKeys(storedCommentLikes, legacyCommentMap, remapAutoCommentId);
  storedReplyLikes = remapObjectKeys(storedReplyLikes, legacyIdMaps.replies, remapAutoReplyId);
  storedFavoriteTimeline = remapFavoriteTimeline(storedFavoriteTimeline);

  safeStorageSetItem(ratingsKey, JSON.stringify(storedRatings));
  safeStorageSetItem(watchlistKey, JSON.stringify(storedWatchlist));
  safeStorageSetItem(listLikesKey, JSON.stringify(storedListLikes));
  safeStorageSetItem(userFollowsKey, JSON.stringify(storedUserFollows));
  safeStorageSetItem(athleteFavoritesKey, JSON.stringify(storedAthleteFavorites));
  safeStorageSetItem(teamFavoritesKey, JSON.stringify(storedTeamFavorites));
  safeStorageSetItem(reviewLikesKey, JSON.stringify(storedReviewLikes));
  safeStorageSetItem(commentLikesKey, JSON.stringify(storedCommentLikes));
  safeStorageSetItem(replyLikesKey, JSON.stringify(storedReplyLikes));
  safeStorageSetItem(favoriteTimelineKey, JSON.stringify(storedFavoriteTimeline));
  safeStorageSetItem(idMigrationKey, "1");
}

function migrateRatingsScale() {
  if (safeStorageGetItem(ratingScaleKey, "")) {
    return;
  }
  const values = Object.values(storedRatings)
    .map((value) => Number(value))
    .filter((value) => !Number.isNaN(value));
  const max = values.length ? Math.max(...values) : 0;
  if (max <= 10) {
    storedRatings = Object.fromEntries(
      Object.entries(storedRatings).map(([key, value]) => [key, toSofaScore(value)])
    );
    safeStorageSetItem(ratingsKey, JSON.stringify(storedRatings));
  }
  safeStorageSetItem(ratingScaleKey, "1");
}

function migrateReplyLikesToCommentLikes() {
  if (safeStorageGetItem(replyLikesToCommentLikesMigrationKey, "")) {
    return;
  }
  let changed = false;
  Object.keys(storedReplyLikes).forEach((replyId) => {
    if (!storedReplyLikes[replyId]) return;
    if (storedCommentLikes[replyId]) return;
    storedCommentLikes[replyId] = true;
    changed = true;
  });
  if (changed) {
    safeStorageSetItem(commentLikesKey, JSON.stringify(storedCommentLikes));
  }
  safeStorageSetItem(replyLikesToCommentLikesMigrationKey, "1");
}

migrateStoredIds();
migrateRatingsScale();
migrateReplyLikesToCommentLikes();

const watchlist = new Set(storedWatchlist);
seedFavoriteTimelineFromCurrentState();
seedObjectTagsFromDataset();
const heroState = {
  index: 0,
  list: [],
};
let heroAutoTimer = null;
const expandedEventCardGaugeIds = new Set();
const eventCardGaugeHideTimers = new Map();

let activeEventId = null;
let activeLeagueId = null;
let activeLeagueRootId = null;
let activeListId = null;
let activeUserId = null;

const sports = ["Tous", ...new Set(events.map((event) => event.sport))];
const usersById = users.reduce((acc, user) => {
  acc[user.id] = user;
  return acc;
}, {});

Object.entries(storedUserProfileImages).forEach(([userId, image]) => {
  if (!image || typeof image !== "string") return;
  const user = usersById[userId];
  if (user) {
    user.image = image;
  }
});

function saveRatings() {
  safeStorageSetItem(ratingsKey, JSON.stringify(storedRatings));
}

function seedRatingsIfMissing() {
  let changed = false;
  events.forEach((event) => {
    if (isUpcoming(event)) return;
    if (storedRatings[event.id] == null) {
      storedRatings[event.id] = toSofaScore(event.communityScore || 0);
      changed = true;
    }
  });
  if (changed) {
    saveRatings();
  }
}

function clearUpcomingRatings() {
  let changed = false;
  Object.keys(storedRatings).forEach((eventId) => {
    const event = events.find((item) => item.id === eventId);
    if (event && isUpcoming(event)) {
      delete storedRatings[eventId];
      changed = true;
    }
  });
  if (changed) {
    saveRatings();
  }
}

function saveReviewLikes() {
  safeStorageSetItem(reviewLikesKey, JSON.stringify(storedReviewLikes));
}

function saveCommentLikes() {
  safeStorageSetItem(commentLikesKey, JSON.stringify(storedCommentLikes));
}

function saveReplyLikes() {
  safeStorageSetItem(replyLikesKey, JSON.stringify(storedReplyLikes));
}

function saveWatchlist() {
  safeStorageSetItem(watchlistKey, JSON.stringify([...watchlist]));
}

function saveListLikes() {
  safeStorageSetItem(listLikesKey, JSON.stringify(storedListLikes));
}

function saveFavoriteTimeline() {
  safeStorageSetItem(favoriteTimelineKey, JSON.stringify(storedFavoriteTimeline));
}

function saveUserFollows() {
  safeStorageSetItem(userFollowsKey, JSON.stringify(storedUserFollows));
}

function saveLeagueFollows() {
  safeStorageSetItem(leagueFollowsKey, JSON.stringify(storedLeagueFollows));
}

function saveLeagueSeasonFollows() {
  safeStorageSetItem(leagueSeasonFollowsKey, JSON.stringify(storedLeagueSeasonFollows));
}

function saveAthleteFavorites() {
  safeStorageSetItem(athleteFavoritesKey, JSON.stringify(storedAthleteFavorites));
}

function saveTeamFavorites() {
  safeStorageSetItem(teamFavoritesKey, JSON.stringify(storedTeamFavorites));
}

function saveUserProfileImages() {
  safeStorageSetItem(userProfileImagesKey, JSON.stringify(storedUserProfileImages));
}

function saveTagCatalog() {
  safeStorageSetItem(tagCatalogKey, JSON.stringify(storedTagCatalog));
}

function saveObjectTags() {
  safeStorageSetItem(objectTagsKey, JSON.stringify(storedObjectTags));
}

function saveObjectTagVotes() {
  safeStorageSetItem(objectTagVotesKey, JSON.stringify(storedObjectTagVotes));
}

function getSessionUserId() {
  return users[0]?.id || "usr_local";
}

function normalizeTagLabel(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

function normalizeTagSlug(value) {
  return normalizeTagLabel(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getObjectTagObjectKey(objectType, objectId) {
  return `${String(objectType || "").trim()}:${String(objectId || "").trim()}`;
}

function getObjectTagVoteKey(objectType, objectId, tagId) {
  return `${getObjectTagObjectKey(objectType, objectId)}|${String(tagId || "").trim()}`;
}

function getTagBySlug(slug) {
  const safeSlug = String(slug || "").trim();
  if (!safeSlug) return null;
  return Object.values(storedTagCatalog).find((tag) => tag?.slug === safeSlug) || null;
}

function ensureTagIdForLabel(label, options = {}) {
  const safeLabel = normalizeTagLabel(label);
  const safeSlug = normalizeTagSlug(safeLabel);
  if (!safeLabel || !safeSlug) return "";
  const existing = getTagBySlug(safeSlug);
  if (existing?.id) {
    return existing.id;
  }
  const createdBy = options.createdBy || getSessionUserId();
  const createdAt = Number(options.createdAt || Date.now());
  const tagId = makeStableId("tag", safeSlug);
  storedTagCatalog[tagId] = {
    id: tagId,
    label: safeLabel,
    slug: safeSlug,
    createdBy,
    createdAt,
  };
  return tagId;
}

function ensureObjectTagLink(objectType, objectId, tagId) {
  const safeType = String(objectType || "").trim();
  const safeObjectId = String(objectId || "").trim();
  const safeTagId = String(tagId || "").trim();
  if (!safeType || !safeObjectId || !safeTagId) return false;
  const objectKey = getObjectTagObjectKey(safeType, safeObjectId);
  const current = Array.isArray(storedObjectTags[objectKey]) ? storedObjectTags[objectKey].filter(Boolean) : [];
  if (current.includes(safeTagId)) {
    return false;
  }
  storedObjectTags[objectKey] = [...new Set([...current, safeTagId])];
  return true;
}

function getObjectTagVoteSummary(objectType, objectId, tagId) {
  const voteKey = getObjectTagVoteKey(objectType, objectId, tagId);
  const votesMap = storedObjectTagVotes[voteKey] && typeof storedObjectTagVotes[voteKey] === "object"
    ? storedObjectTagVotes[voteKey]
    : {};
  const voteValues = Object.values(votesMap)
    .map((value) => Number(value))
    .filter((value) => value === 1 || value === -1);
  const up = voteValues.filter((value) => value > 0).length;
  const down = voteValues.filter((value) => value < 0).length;
  const total = up + down;
  const score = up - down;
  const currentUserVote = Number(votesMap[getSessionUserId()] || 0);
  return {
    up,
    down,
    total,
    score,
    currentUserVote: currentUserVote === 1 || currentUserVote === -1 ? currentUserVote : 0,
  };
}

function getObjectTagEntries(objectType, objectId) {
  const objectKey = getObjectTagObjectKey(objectType, objectId);
  const tagIds = Array.isArray(storedObjectTags[objectKey]) ? storedObjectTags[objectKey].filter(Boolean) : [];
  return tagIds
    .map((tagId) => {
      const tag = storedTagCatalog[tagId];
      if (!tag) return null;
      const summary = getObjectTagVoteSummary(objectType, objectId, tagId);
      return {
        tagId,
        label: String(tag.label || ""),
        slug: String(tag.slug || ""),
        ...summary,
      };
    })
    .filter(Boolean)
    .sort((a, b) => {
      const scoreDiff = b.score - a.score;
      if (scoreDiff !== 0) return scoreDiff;
      const totalDiff = b.total - a.total;
      if (totalDiff !== 0) return totalDiff;
      return String(a.label || "").localeCompare(String(b.label || ""));
    });
}

function formatObjectTagScore(score) {
  const numeric = Number(score || 0);
  if (!numeric) return "0";
  return numeric > 0 ? `+${numeric}` : String(numeric);
}

function setObjectTagVote(objectType, objectId, tagId, voteValue) {
  const safeVote = Number(voteValue);
  if (safeVote !== 1 && safeVote !== -1) return 0;
  const safeType = String(objectType || "").trim();
  const safeObjectId = String(objectId || "").trim();
  const safeTagId = String(tagId || "").trim();
  if (!safeType || !safeObjectId || !safeTagId) return 0;
  const voteKey = getObjectTagVoteKey(safeType, safeObjectId, safeTagId);
  const currentMap = storedObjectTagVotes[voteKey] && typeof storedObjectTagVotes[voteKey] === "object"
    ? { ...storedObjectTagVotes[voteKey] }
    : {};
  const userId = getSessionUserId();
  const previous = Number(currentMap[userId] || 0);
  if (previous === safeVote) {
    delete currentMap[userId];
  } else {
    currentMap[userId] = safeVote;
  }
  if (Object.keys(currentMap).length) {
    storedObjectTagVotes[voteKey] = currentMap;
  } else {
    delete storedObjectTagVotes[voteKey];
  }
  return previous === safeVote ? 0 : safeVote;
}

function addUserTagToObject(objectType, objectId, rawLabel) {
  const safeType = String(objectType || "").trim();
  const safeObjectId = String(objectId || "").trim();
  const safeLabel = normalizeTagLabel(rawLabel);
  const safeSlug = normalizeTagSlug(safeLabel);
  if (!safeType || !safeObjectId || !safeLabel || !safeSlug || safeLabel.length < 2) return "";
  const tagId = ensureTagIdForLabel(safeLabel, {
    createdBy: getSessionUserId(),
    createdAt: Date.now(),
  });
  if (!tagId) return "";
  ensureObjectTagLink(safeType, safeObjectId, tagId);
  setObjectTagVote(safeType, safeObjectId, tagId, 1);
  return tagId;
}

function getDefaultObjectTagLabels(objectType, objectId) {
  const pickBySeed = (pool = [], max = 3, seed = "") => {
    const list = Array.isArray(pool) ? pool.filter(Boolean) : [];
    if (!list.length) return [];
    const baseSeed = String(seed || "")
      .split("")
      .reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const result = [];
    for (let i = 0; i < list.length && result.length < max; i += 1) {
      const index = (baseSeed + (i * 3)) % list.length;
      const candidate = list[index];
      if (candidate && !result.includes(candidate)) {
        result.push(candidate);
      }
    }
    return result;
  };

  if (objectType === "event") {
    const event = events.find((item) => item.id === objectId);
    if (!event) return [];
    const moodTags = pickBySeed([
      "Excitant",
      "Opi",
      "Omi",
      "OH OUI GREG",
      "Catastrophe",
      "Mbappéisé",
      "Nimportequoi",
      "Banger",
      "Chaotique",
      "Foufou",
    ], 2, `${event.id}:mood`);
    const tempoTags = pickBySeed([
      "Epique",
      "Electrique",
      "Rince",
      "Lunaire",
      "Sale",
      "Injouable",
    ], 1, `${event.id}:tempo`);
    return [
      ...moodTags,
      ...tempoTags,
      isUpcoming(event) ? "Ca va partir" : "On en reparle",
    ];
  }
  if (objectType === "team") {
    const team = getTeamById(objectId);
    if (!team) return [];
    const squadTags = pickBySeed([
      "Sulfureuse",
      "Survoltee",
      "Feu follet",
      "Bordelique",
      "Clinquante",
      "Feroce",
      "Mbappéisée",
      "Lunaire",
      "Insolente",
      "Attachiante",
    ], 3, `${team.id}:team`);
    return [...squadTags];
  }
  if (objectType === "athlete") {
    const athlete = getAthleteById(objectId);
    if (!athlete) return [];
    const athleteTags = pickBySeed([
      "Fulgurant",
      "Magnetique",
      "Filou",
      "Aerial",
      "Viral",
      "Glacial",
      "Soyeux",
      "Lunaire",
      "Ravageur",
      "Iconique",
    ], 3, `${athlete.id}:athlete`);
    return [...athleteTags];
  }
  if (objectType === "list") {
    const list = curatedLists.find((item) => item.id === objectId);
    if (!list) return [];
    const rankingTags = pickBySeed([
      "Demente",
      "Savoureux",
      "Clivant",
      "Piquant",
      "Canaille",
      "Bizarrement juste",
      "Sulfureux",
      "Nerveux",
      "Viral",
      "Mega debattable",
    ], 3, `${list.id}:list`);
    return [...rankingTags];
  }
  if (objectType === "league") {
    const league = getLeagueById(objectId) || getLeagueRootById(objectId);
    if (!league) return [];
    const leagueTags = pickBySeed([
      "Mythique",
      "Surrealiste",
      "Pimentee",
      "Electrique",
      "Crispante",
      "Culte",
      "Impitoyable",
      "Epicee",
      "Iconique",
      "Imprévisible",
    ], 3, `${league.id}:league`);
    return [...leagueTags];
  }
  return [];
}

function getTagSeedVoteDistribution(seed) {
  const numericSeed = String(seed || "")
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return {
    up: 2 + (numericSeed % 4),
    down: numericSeed % 2,
  };
}

function seedObjectTagsFromDataset() {
  let seededMapRaw;
  try {
    seededMapRaw = JSON.parse(safeStorageGetItem(objectTagsSeedKey, "{}") || "{}");
  } catch (error) {
    seededMapRaw = {};
  }
  if (seededMapRaw === 1) return;
  const seededMap = seededMapRaw && typeof seededMapRaw === "object" && !Array.isArray(seededMapRaw)
    ? { ...seededMapRaw }
    : {};
  let hasSeedMapChanged = false;
  let hasTagCatalogChanged = false;
  let hasObjectTagsChanged = false;
  let hasObjectTagVotesChanged = false;
  const objectsToSeed = [
    ...events.map((event) => ({ type: "event", id: event.id })),
    ...teams.map((team) => ({ type: "team", id: team.id })),
    ...athletes.map((athlete) => ({ type: "athlete", id: athlete.id })),
    ...curatedLists.map((list) => ({ type: "list", id: list.id })),
    ...leagues.map((league) => ({ type: "league", id: league.id })),
  ];

  objectsToSeed.forEach(({ type, id }) => {
    const objectKey = getObjectTagObjectKey(type, id);
    if (seededMap[objectKey]) return;
    const labels = getDefaultObjectTagLabels(type, id)
      .map((value) => normalizeTagLabel(value))
      .filter(Boolean);
    const uniqueLabels = [...new Set(labels)].slice(0, 6);
    uniqueLabels.forEach((label) => {
      const existingTagId = getTagBySlug(normalizeTagSlug(label))?.id || "";
      const tagId = ensureTagIdForLabel(label, { createdBy: "usr_seed" });
      if (!tagId) return;
      if (!existingTagId) {
        hasTagCatalogChanged = true;
      }
      if (ensureObjectTagLink(type, id, tagId)) {
        hasObjectTagsChanged = true;
      }
      const voteKey = getObjectTagVoteKey(type, id, tagId);
      const currentVotes = storedObjectTagVotes[voteKey] && typeof storedObjectTagVotes[voteKey] === "object"
        ? { ...storedObjectTagVotes[voteKey] }
        : {};
      const distribution = getTagSeedVoteDistribution(`${type}:${id}:${tagId}`);
      const beforeVoteState = JSON.stringify(currentVotes);
      for (let i = 1; i <= distribution.up; i += 1) {
        currentVotes[`usr_seed_up_${i}`] = 1;
      }
      for (let i = 1; i <= distribution.down; i += 1) {
        currentVotes[`usr_seed_down_${i}`] = -1;
      }
      storedObjectTagVotes[voteKey] = currentVotes;
      if (JSON.stringify(currentVotes) !== beforeVoteState) {
        hasObjectTagVotesChanged = true;
      }
    });
    seededMap[objectKey] = 1;
    hasSeedMapChanged = true;
  });

  if (hasTagCatalogChanged) {
    saveTagCatalog();
  }
  if (hasObjectTagsChanged) {
    saveObjectTags();
  }
  if (hasObjectTagVotesChanged) {
    saveObjectTagVotes();
  }
  if (hasSeedMapChanged) {
    safeStorageSetItem(objectTagsSeedKey, JSON.stringify(seededMap));
  }
}

function getFavoriteActionTimestamp(type, id) {
  const key = getFavoriteTimelineEntryKey(type, id);
  return Number(storedFavoriteTimeline[key] || 0);
}

function setFavoriteActionTimestamp(type, id, timestamp = Date.now()) {
  const key = getFavoriteTimelineEntryKey(type, id);
  const safeTs = Number(timestamp) || Date.now();
  storedFavoriteTimeline[key] = safeTs;
  saveFavoriteTimeline();
  return safeTs;
}

function removeFavoriteActionTimestamp(type, id) {
  const key = getFavoriteTimelineEntryKey(type, id);
  if (!Object.prototype.hasOwnProperty.call(storedFavoriteTimeline, key)) return;
  delete storedFavoriteTimeline[key];
  saveFavoriteTimeline();
}

function getUserProfileImage(user) {
  if (!user) return "";
  const custom = storedUserProfileImages[user.id];
  if (typeof custom === "string" && custom) {
    return custom;
  }
  return user.image || "";
}

function getCommentObject(commentOrId) {
  if (!commentOrId) return null;
  if (typeof commentOrId === "object") return commentOrId;
  const directComment = commentsById[commentOrId]
    || reviewSamples.find((item) => item.id === commentOrId)
    || commentSamples.find((item) => item.id === commentOrId);
  if (directComment) return directComment;
  for (const comment of genericCommentSamples) {
    if (!Array.isArray(comment.replies)) continue;
    const reply = comment.replies.find((item) => item.id === commentOrId);
    if (reply) return reply;
  }
  return null;
}

function getFallbackFavoriteTimestamp(type, id) {
  const key = String(id || "");
  const hash = key.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  const fallbackFromNow = Date.now() - (hash % (20 * 24 * 60 * 60 * 1000));

  if (type === "event") {
    const event = events.find((item) => item.id === id);
    return Math.max(getFeedEventTimestamp(event), fallbackFromNow);
  }
  if (type === "list") {
    const list = curatedLists.find((item) => item.id === id);
    return Math.max(getListFreshnessTimestamp(list), fallbackFromNow);
  }
  if (type === "athlete") {
    const athlete = getAthleteById(id);
    if (!athlete) return fallbackFromNow;
    const timestamp = getAthleteEvents(athlete.id)
      .map((event) => getFeedEventTimestamp(event))
      .reduce((max, value) => Math.max(max, value), 0);
    return Math.max(timestamp, fallbackFromNow);
  }
  if (type === "team") {
    const team = getTeamById(id);
    if (!team) return fallbackFromNow;
    const timestamp = getTeamEvents(team.id)
      .map((event) => getFeedEventTimestamp(event))
      .reduce((max, value) => Math.max(max, value), 0);
    return Math.max(timestamp, fallbackFromNow);
  }
  if (type === "league") {
    const league = getLeagueRootById(id);
    if (!league) return fallbackFromNow;
    const timestamp = (league.eventIds || [])
      .map((eventId) => events.find((event) => event.id === eventId))
      .filter(Boolean)
      .map((event) => getFeedEventTimestamp(event))
      .reduce((max, value) => Math.max(max, value), 0);
    return Math.max(timestamp, fallbackFromNow);
  }
  if (type === "league-season") {
    const season = getLeagueSeasonById(id);
    if (!season) return fallbackFromNow;
    const timestamp = getLeagueMatches(season.id)
      .map((event) => getFeedEventTimestamp(event))
      .reduce((max, value) => Math.max(max, value), 0);
    return Math.max(timestamp, fallbackFromNow);
  }
  if (type === "review" || type === "comment" || type === "reply") {
    const comment = getCommentObject(id);
    if (!comment) return fallbackFromNow;
    if (type === "reply") {
      const parentComment = comment.parentCommentId ? getCommentObject(comment.parentCommentId) : null;
      const parentTs = parentComment ? getFeedCommentTimestamp(parentComment) : 0;
      return Math.max(parentTs, getFeedCommentTimestamp(comment), fallbackFromNow);
    }
    return Math.max(getFeedCommentTimestamp(comment), fallbackFromNow);
  }
  return fallbackFromNow;
}

function seedFavoriteTimelineFromCurrentState() {
  if (safeStorageGetItem(favoriteTimelineSeedKey, "")) return;
  const setIfMissing = (type, id) => {
    if (!id) return;
    if (getFavoriteActionTimestamp(type, id)) return;
    const fallbackTs = getFallbackFavoriteTimestamp(type, id);
    const key = getFavoriteTimelineEntryKey(type, id);
    storedFavoriteTimeline[key] = fallbackTs;
  };

  watchlist.forEach((eventId) => setIfMissing("event", eventId));

  Object.entries(storedListLikes).forEach(([listId, liked]) => {
    if (!liked) return;
    setIfMissing("list", listId);
  });

  Object.entries(storedAthleteFavorites).forEach(([athleteId, liked]) => {
    if (!liked) return;
    setIfMissing("athlete", athleteId);
  });

  Object.entries(storedTeamFavorites).forEach(([teamId, liked]) => {
    if (!liked) return;
    setIfMissing("team", teamId);
  });

  Object.entries(storedLeagueFollows).forEach(([leagueId, followed]) => {
    if (!followed) return;
    setIfMissing("league", leagueId);
  });

  Object.entries(storedLeagueSeasonFollows).forEach(([seasonId, followed]) => {
    if (!followed) return;
    setIfMissing("league-season", seasonId);
  });

  Object.entries(storedReviewLikes).forEach(([reviewId, liked]) => {
    if (!liked) return;
    setIfMissing("review", reviewId);
  });

  Object.entries(storedCommentLikes).forEach(([commentId, liked]) => {
    if (!liked) return;
    const comment = getCommentObject(commentId);
    if (comment && !comment.eventId && comment.parentCommentId) {
      setIfMissing("reply", commentId);
      return;
    }
    setIfMissing("comment", commentId);
  });

  Object.entries(storedReplyLikes).forEach(([replyId, liked]) => {
    if (!liked) return;
    setIfMissing("reply", replyId);
  });

  saveFavoriteTimeline();
  safeStorageSetItem(favoriteTimelineSeedKey, "1");
}

function getCommentType(commentOrId) {
  const comment = getCommentObject(commentOrId);
  if (!comment) return "teaser";
  if (comment.commentType === "critique" || comment.commentType === "teaser") {
    return comment.commentType;
  }
  if (Number.isFinite(comment.rating)) {
    return "critique";
  }
  return "teaser";
}

function getCommentsForEvent(eventId, commentType) {
  return genericCommentSamples.filter((comment) => {
    if (!commentMatchesTarget(comment, COMMENT_TARGET_EVENT, eventId)) return false;
    if (!commentType) return true;
    return getCommentType(comment) === commentType;
  });
}

function sortCommentsForDisplay(comments = []) {
  return comments
    .slice()
    .sort((a, b) => {
      const likesDiff = getCommentTotalLikes(b) - getCommentTotalLikes(a);
      if (likesDiff !== 0) return likesDiff;
      return getFeedCommentTimestamp(b) - getFeedCommentTimestamp(a);
    });
}

function getCommentsForTarget(targetType, targetId, options = {}) {
  const {
    commentType = "",
  } = options;
  const safeType = normalizeCommentTargetType(targetType);
  const safeId = String(targetId || "").trim();
  if (!safeType || !safeId) return [];
  const list = genericCommentSamples.filter((comment) => {
    if (!commentMatchesTarget(comment, safeType, safeId)) return false;
    if (commentType && getCommentType(comment) !== commentType) return false;
    return true;
  });
  return sortCommentsForDisplay(list);
}

function getCommentsForLeague(leagueId, options = {}) {
  const {
    commentType = "",
  } = options;
  const league = getLeagueById(leagueId);
  if (!league) return [];
  const matchIds = new Set(getLeagueMatches(leagueId).map((event) => event.id));
  const list = genericCommentSamples.filter((comment) => {
    const isDirectLeagueComment = commentMatchesTarget(comment, COMMENT_TARGET_LEAGUE_SEASON, league.id);
    const isLeagueMatchComment = commentMatchesTarget(comment, COMMENT_TARGET_EVENT, getCommentTargetId(comment))
      && matchIds.has(getCommentTargetId(comment));
    if (!isDirectLeagueComment && !isLeagueMatchComment) return false;
    if (commentType && getCommentType(comment) !== commentType) return false;
    return true;
  });
  return sortCommentsForDisplay(list);
}

function getLeagueReviewCount(leagueId) {
  return getCommentsForLeague(leagueId).length;
}

function isCommentLiked(commentOrId) {
  const comment = getCommentObject(commentOrId);
  if (!comment) return false;
  if (getCommentType(comment) === "critique") {
    return Boolean(storedReviewLikes[comment.id]);
  }
  return Boolean(storedCommentLikes[comment.id]);
}

function getCommentTotalLikes(commentOrId) {
  const comment = getCommentObject(commentOrId);
  if (!comment) return 0;
  return (comment.likes || 0) + (isCommentLiked(comment) ? 1 : 0);
}

function getLikedProfileComments() {
  const likedIds = new Set();
  [storedReviewLikes, storedCommentLikes, storedReplyLikes].forEach((store) => {
    Object.entries(store || {}).forEach(([id, liked]) => {
      if (liked) likedIds.add(id);
    });
  });

  return [...likedIds]
    .map((likedId) => {
      const likedItem = getCommentObject(likedId);
      if (!likedItem) return null;
      const parentComment = likedItem.parentCommentId ? commentsById[likedItem.parentCommentId] : null;
      const likedTargetType = getCommentTargetType(likedItem);
      const likedTargetId = getCommentTargetId(likedItem);
      const parentTargetType = getCommentTargetType(parentComment);
      const parentTargetId = getCommentTargetId(parentComment);
      const eventId = likedTargetType === COMMENT_TARGET_EVENT
        ? likedTargetId
        : parentTargetType === COMMENT_TARGET_EVENT
          ? parentTargetId
          : "";
      const isReply = !getCommentTargetId(likedItem) && Boolean(parentComment);
      return {
        id: likedId,
        item: isReply ? { ...likedItem, replies: [] } : likedItem,
        eventId,
        mode: Number.isFinite(likedItem.rating) ? "review" : "comment",
        isReply,
      };
    })
    .filter(Boolean)
    .sort((a, b) => {
      const left = Date.parse(a.item.dateTime || a.item.createdAt || a.item.dateISO || "");
      const right = Date.parse(b.item.dateTime || b.item.createdAt || b.item.dateISO || "");
      return (Number.isNaN(right) ? 0 : right) - (Number.isNaN(left) ? 0 : left);
    });
}

function toggleCommentLike(commentOrId) {
  const comment = getCommentObject(commentOrId);
  if (!comment) return false;
  const isCritique = getCommentType(comment) === "critique";
  const isReply = !comment.eventId && Boolean(comment.parentCommentId);
  const favoriteType = isCritique ? "review" : (isReply ? "reply" : "comment");
  const store = isCritique ? storedReviewLikes : storedCommentLikes;
  if (store[comment.id]) {
    delete store[comment.id];
    removeFavoriteActionTimestamp(favoriteType, comment.id);
  } else {
    store[comment.id] = true;
    setFavoriteActionTimestamp(favoriteType, comment.id);
  }
  if (isCritique) {
    saveReviewLikes();
  } else {
    saveCommentLikes();
  }
  return Boolean(store[comment.id]);
}

function getReplySessionUser() {
  return users[0] || { id: "usr_local", name: "Vous", handle: "@vous" };
}

function buildReplyTrigger(commentId, eventId = "", parentReplyId = "", compact = false) {
  if (!commentId || !getCommentObject(commentId)) return "";
  return `
    <button
      class="comment-reply-btn ${compact ? "is-compact" : ""}"
      type="button"
      data-comment-reply-trigger
      data-comment-id="${commentId}"
      data-event-id="${eventId || ""}"
      data-parent-reply-id="${parentReplyId || ""}"
      aria-label="Répondre au commentaire"
    >Répondre</button>
  `;
}

function buildReplyComposer(commentId, eventId = "", parentReplyId = "", compact = false) {
  if (!commentId || !getCommentObject(commentId)) return "";
  return `
    <div
      class="comment-reply-composer ${compact ? "is-compact" : ""}"
      data-comment-reply-composer
      data-comment-id="${commentId}"
      data-event-id="${eventId || ""}"
      data-parent-reply-id="${parentReplyId || ""}"
    >
      <textarea
        class="comment-reply-input"
        rows="${compact ? 2 : 3}"
        placeholder="${parentReplyId ? "Répondre à ce message..." : "Écrire une réponse..."}"
      ></textarea>
      <div class="comment-reply-composer-actions">
        <button class="ghost small" type="button" data-comment-reply-cancel>Annuler</button>
        <button class="cta small" type="button" data-comment-reply-submit>Publier</button>
      </div>
    </div>
  `;
}

function closeReplyComposers(scope = document) {
  if (!scope) return;
  scope.querySelectorAll("[data-comment-reply-composer].is-open").forEach((composer) => {
    composer.classList.remove("is-open");
  });
}

function appendReplyToComment(commentId, text, parentReplyId = "") {
  const comment = getCommentObject(commentId);
  if (!comment) return null;
  if (!Array.isArray(comment.replies)) {
    comment.replies = [];
  }
  const user = getReplySessionUser();
  const cleanText = String(text || "")
    .trim()
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
  if (!cleanText) return null;
  const reply = {
    id: makeStableId("rep", `manual-${comment.id}-${Date.now()}-${comment.replies.length + 1}`),
    userId: user.id,
    author: user.name || "Vous",
    note: cleanText,
    date: "À l'instant",
    likes: 0,
    parentCommentId: comment.id,
  };
  if (parentReplyId) {
    reply.parentReplyId = parentReplyId;
  }
  comment.replies.push(reply);
  return reply;
}

function getCommentTargetTitle(targetType) {
  const safeType = normalizeCommentTargetType(targetType);
  if (safeType === COMMENT_TARGET_EVENT) return "événement";
  if (safeType === COMMENT_TARGET_LEAGUE) return "compétition";
  if (safeType === COMMENT_TARGET_LEAGUE_SEASON) return "saison";
  if (safeType === COMMENT_TARGET_TEAM) return "équipe";
  if (safeType === COMMENT_TARGET_ATHLETE) return "sportif";
  if (safeType === COMMENT_TARGET_LIST) return "classement";
  if (safeType === COMMENT_TARGET_USER) return "profil";
  return "objet";
}

function buildObjectCommentComposer(targetType, targetId, options = {}) {
  const safeType = normalizeCommentTargetType(targetType);
  const safeId = String(targetId || "").trim();
  if (!safeType || !safeId) return "";
  const submitLabel = options.submitLabel || "Publier";
  const placeholder = options.placeholder || `Ajouter un commentaire sur ce ${getCommentTargetTitle(safeType)}...`;
  const defaultMode = options.defaultMode === "critique" ? "critique" : "teaser";
  const ratingValue = Math.max(0, Math.min(10, Number.isFinite(Number(options.rating)) ? Math.round(Number(options.rating)) : 8));
  return `
    <div class="object-comment-composer" data-object-comment-composer data-target-type="${escapeHtml(safeType)}" data-target-id="${escapeHtml(safeId)}">
      <textarea
        class="object-comment-input"
        rows="3"
        maxlength="600"
        placeholder="${escapeHtml(placeholder)}"
        data-object-comment-input
      ></textarea>
      <div class="object-comment-actions">
        <label class="object-comment-mode">
          Type
          <select data-object-comment-mode>
            <option value="teaser" ${defaultMode === "teaser" ? "selected" : ""}>Commentaire</option>
            <option value="critique" ${defaultMode === "critique" ? "selected" : ""}>Critique</option>
          </select>
        </label>
        <label class="object-comment-rating ${defaultMode === "critique" ? "" : "is-hidden"}" data-object-comment-rating-wrap>
          Note
          <input type="number" min="0" max="10" step="1" value="${ratingValue}" data-object-comment-rating ${defaultMode === "critique" ? "" : "disabled"}>
        </label>
        <button
          class="cta small"
          type="button"
          data-object-comment-submit
          data-target-type="${escapeHtml(safeType)}"
          data-target-id="${escapeHtml(safeId)}"
        >${escapeHtml(submitLabel)}</button>
      </div>
    </div>
  `;
}

function syncObjectCommentComposerMode(composer) {
  if (!composer) return;
  const modeSelect = composer.querySelector("[data-object-comment-mode]");
  const ratingWrap = composer.querySelector("[data-object-comment-rating-wrap]");
  const ratingInput = composer.querySelector("[data-object-comment-rating]");
  const isCritique = modeSelect ? modeSelect.value === "critique" : false;
  if (ratingWrap) {
    ratingWrap.classList.toggle("is-hidden", !isCritique);
  }
  if (ratingInput) {
    ratingInput.disabled = !isCritique;
    if (!Number.isFinite(Number(ratingInput.value)) || Number(ratingInput.value) < 0) {
      ratingInput.value = "0";
    }
  }
}

function mountObjectCommentComposer(mountEl, targetType, targetId, options = {}) {
  if (!mountEl) return;
  mountEl.innerHTML = buildObjectCommentComposer(targetType, targetId, options);
  const composer = mountEl.querySelector("[data-object-comment-composer]");
  if (composer) {
    syncObjectCommentComposerMode(composer);
  }
}

function createRootCommentForTarget(targetType, targetId, note, options = {}) {
  const safeType = normalizeCommentTargetType(targetType);
  const safeId = String(targetId || "").trim();
  const cleanText = String(note || "").trim();
  if (!safeType || !safeId || !cleanText) return null;
  const user = getReplySessionUser();
  const mode = options.mode === "critique" ? "critique" : "teaser";
  const rawRating = Number(options.rating || 0);
  const safeRating = Math.max(0, Math.min(10, Number.isFinite(rawRating) ? Math.round(rawRating) : 0));
  const now = new Date();
  const comment = hydrateCommentDates({
    id: makeStableId("cmt", `manual-${safeType}-${safeId}-${Date.now()}`),
    targetType: safeType,
    targetId: safeId,
    eventId: safeType === COMMENT_TARGET_EVENT ? safeId : "",
    userId: user.id,
    author: user.name || "Vous",
    note: cleanText,
    likes: 0,
    replies: [],
    commentType: mode,
    createdAt: now.toISOString(),
    dateTime: now.toISOString(),
    date: formatInventedCommentDate(now),
    ...(mode === "critique" ? { rating: safeRating } : {}),
  });
  registerCommentInMemory(comment);
  storedManualComments.push({
    id: comment.id,
    targetType: comment.targetType,
    targetId: comment.targetId,
    eventId: comment.eventId,
    userId: comment.userId,
    author: comment.author,
    note: comment.note,
    likes: comment.likes,
    commentType: comment.commentType,
    rating: comment.rating,
    createdAt: comment.createdAt,
    dateTime: comment.dateTime,
    date: comment.date,
    replies: comment.replies,
  });
  saveManualComments();
  return comment;
}

function buildObjectCommentFallbackCard(targetType, targetId, message = "") {
  const safeType = normalizeCommentTargetType(targetType);
  const safeId = String(targetId || "").trim();
  if (!safeType || !safeId) return buildEmptyStateCard(message || "Aucun commentaire pour le moment.");
  const fallback = {
    id: `fallback-${safeType}-${safeId}`,
    targetType: safeType,
    targetId: safeId,
    userId: "usr_KHHE5RBM3W4HKHHE7RBM3W5CKH",
    author: "Équipe Sofa Critics",
    commentType: "teaser",
    note: message || `Soyez la première personne à commenter ce ${getCommentTargetTitle(safeType)}.`,
    likes: 0,
    replies: [],
  };
  return buildUnifiedCommentCard(fallback, {
    mode: "comment",
    eventName: "N",
    showFollowButton: false,
  });
}

function renderTargetReviewList(targetType, targetId, mountEl, options = {}) {
  if (!mountEl) return;
  const safeType = normalizeCommentTargetType(targetType);
  const safeId = String(targetId || "").trim();
  if (!safeType || !safeId) {
    mountEl.innerHTML = buildEmptyStateCard("Aucun commentaire disponible.");
    return;
  }
  const fallbackMessage = options.fallbackMessage || "";
  const comments = Array.isArray(options.comments)
    ? options.comments
    : getCommentsForTarget(safeType, safeId);
  if (!comments.length) {
    mountEl.innerHTML = buildObjectCommentFallbackCard(safeType, safeId, fallbackMessage);
    return;
  }
  mountEl.innerHTML = comments
    .map((comment) => {
      const mode = getCommentType(comment) === "critique" ? "review" : "comment";
      const commentTargetType = getCommentTargetType(comment);
      const commentTargetId = getCommentTargetId(comment);
      const linkedEventId = commentTargetType === COMMENT_TARGET_EVENT ? commentTargetId : "";
      return buildUnifiedCommentCard(comment, {
        mode,
        eventId: linkedEventId,
        eventName: linkedEventId ? "Y" : "N",
      });
    })
    .join("");
}

function shouldRefreshActiveLeague(eventId = "") {
  if (!activeLeagueId) return false;
  if (!eventId) return true;
  if (eventId === activeLeagueId) return true;
  const league = getLeagueById(activeLeagueId);
  if (!league) return false;
  return Array.isArray(league.eventIds) && league.eventIds.includes(eventId);
}

function shouldRefreshActiveLeagueRoot(eventId = "") {
  if (!activeLeagueRootId) return false;
  if (!eventId) return true;
  const league = getLeagueRootById(activeLeagueRootId);
  if (!league) return false;
  if (eventId === league.id) return true;
  const seasons = getLeagueSeasonsByLeagueId(league.id);
  if (seasons.some((season) => season.id === eventId)) return true;
  return Array.isArray(league.eventIds) && league.eventIds.includes(eventId);
}

function refreshLeagueSurfaces(eventId = "") {
  const hasSeasonSurface = Boolean(leagueDetailEl || leagueReviewListEl);
  const hasRootSurface = Boolean(leaguePageDetailEl || leaguePageReviewListEl || leagueSeasonListEl);

  if (hasSeasonSurface) {
    if (!activeLeagueId) {
      renderLeagueDetail();
    } else if (shouldRefreshActiveLeague(eventId)) {
      renderLeagueDetail();
    }
  }

  if (hasRootSurface) {
    if (!activeLeagueRootId) {
      renderLeaguePage();
      return;
    }
    if (shouldRefreshActiveLeagueRoot(eventId)) {
      renderLeaguePage();
    }
  }
}

function refreshCommentSurfaces(eventId = "") {
  if (reviewListEl) {
    const eventIdToRender = eventId || activeEventId || "";
    if (eventIdToRender) {
      renderReviews(eventIdToRender);
    }
  }
  refreshLeagueSurfaces(eventId);
  if (eventsListEl) {
    renderEvents();
  }
  if (watchlistListEl) {
    renderWatchlist();
  }
  if (anticipatedListEl) {
    renderAnticipated();
  }
  if (bestMonthListEl) {
    renderBestMonth();
  }
  if (bestOfListEl) {
    renderBestOf();
  }
  if (listDetailEl || listEventsEl) {
    renderListDetail();
  }
  if (userDetailEl) {
    renderUserProfile();
  }
  if (athleteDetailEl) {
    renderAthleteProfile();
  }
  if (teamDetailEl) {
    renderTeamProfile();
  }
  if (homeReviewsEl || homeListsEl) {
    renderHomeHighlights();
  }
  renderFeedPage();
  if (uiEventCardsEl || uiListCardsEl || uiReviewCardsEl || uiEventMiniaturesEl || uiCalendarMiniaturesEl || uiSofaGaugesEl || uiColorPaletteEl) {
    renderUISamples();
  }
}

seedRatingsIfMissing();
clearUpcomingRatings();

function renderStars(container, currentRating, eventId, size = "") {
  container.innerHTML = "";
  for (let i = 1; i <= 10; i += 1) {
    const star = document.createElement("button");
    star.className = i <= currentRating ? "is-active" : "";
    star.textContent = "★";
    star.dataset.value = i;
    star.dataset.eventId = eventId;
    if (size === "hero") {
      star.style.fontSize = "1.2rem";
    }
    container.appendChild(star);
  }
}

function getHeroEvents() {
  const completed = filterEventsByActiveSports(events).filter((event) => !isUpcoming(event));
  const list = completed.length ? completed : events.slice();
  return list.slice().sort((a, b) => b.communityScore - a.communityScore).slice(0, 6);
}

function getTopReviewForEvent(event) {
  if (!event) return null;
  const reviews = reviewSamples.filter((review) => review.eventId === event.id);
  if (!reviews.length) return null;
  return reviews.slice().sort((a, b) => getCommentTotalLikes(b) - getCommentTotalLikes(a))[0];
}

function renderHeroFeatured() {
  if (!heroFeaturedEl) return;
  if (!heroState.list.length) {
    heroState.list = getHeroEvents();
  }
  if (!heroState.list.length) return;
  const event = heroState.list[heroState.index % heroState.list.length];
  const teamsForEvent = getTeamsForEvent(event.id);
  const topReview = getTopReviewForEvent(event);
  const fallbackQuote = getTopQuote(event);
  const review = topReview || {
    id: `hero-${event.id}`,
    author: fallbackQuote?.author || "Sofa Critics",
    note: fallbackQuote?.text || "Aucune critique pour le moment, soyez le premier à laisser un avis.",
    likes: fallbackQuote?.likes || 0,
    rating: Math.round(event.communityScore || 0),
  };
  const reviewUser = review.userId ? getUserById(review.userId) : null;
  const reviewRating = toSofaScore(review.rating || event.communityScore || 0);
  const heroScoreBadge = buildScoreBadge(reviewRating, "large");
  const totalLikes = getCommentTotalLikes(review);
  const natureLabel = event.nature || "Match";
  const leagueLine = natureLabel === "Match" && event.leagueTitle ? `<span>Ligue: ${event.leagueTitle}</span>` : "";
  const detailLabel = natureLabel === "Ligue" ? "Voir la ligue" : "Voir l'événement";
  const heroCard = buildFrameElement(`
    <div class="hero-review-media">
      <img src="${getEventImage(event)}" alt="${event.title}">
      <div class="hero-review-tags">
        <span class="tag">${event.league}</span>
        ${buildEventStatusTag(event)}
      </div>
    </div>
    <div class="hero-review-content">
      <div class="hero-review-top">
        <span class="pill">Critique à la une</span>
        <span class="hero-review-score">${heroScoreBadge}</span>
      </div>
      <p class="hero-review-quote">“${truncateQuote(review.note, 220)}”</p>
      <div class="hero-review-author">
        <span class="mini-avatar">${getInitials(review.author)}</span>
        <div>
          <strong>${review.author}</strong>
          ${reviewUser?.handle ? `<span class="hero-review-handle">${reviewUser.handle}</span>` : ""}
        </div>
      </div>
      <div class="hero-review-meta">
        <span>❤ ${formatNumber(totalLikes)} likes</span>
        <span>${event.title}</span>
        <span>${getEventDateLabel(event)} · ${event.location}</span>
        ${leagueLine}
        ${teamsForEvent.length ? `<span>${teamsForEvent.map((team) => team.name).join(" vs ")}</span>` : ""}
        ${event.result ? `<span>Resultat: ${event.result}</span>` : ""}
      </div>
      <div class="hero-review-actions">
        <a class="event-link" href="${eventUrlFor(event)}">${detailLabel}</a>
        <a class="ghost small" href="${eventUrlFor(event)}#reviews">Lire la critique</a>
      </div>
    </div>
  `, {
    tag: "article",
    className: `hero-review-card ${getStatusClass(event)}`,
    attributes: `data-href="${eventUrlFor(event)}"`,
  });
  heroFeaturedEl.innerHTML = `
    <div class="hero-slide">
      ${heroCard}
    </div>
  `;

  if (heroDotsEl) {
    heroDotsEl.innerHTML = heroState.list
      .map((_, idx) => `<button class="hero-dot ${idx === heroState.index ? "is-active" : ""}" data-hero-index="${idx}" aria-label="Aller à l'événement ${idx + 1}"></button>`)
      .join("");
  }
}

function parseEventDate(dateString) {
  if (!dateString) {
    return null;
  }
  const value = String(dateString).trim();
  const isoDateMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoDateMatch) {
    const year = Number(isoDateMatch[1]);
    const month = Number(isoDateMatch[2]) - 1;
    const day = Number(isoDateMatch[3]);
    return new Date(year, month, day);
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }
  return parsed;
}

const frMonthNamesLong = [
  "janvier",
  "fevrier",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "aout",
  "septembre",
  "octobre",
  "novembre",
  "decembre",
];

const frMonthNamesShort = [
  "janv",
  "fevr",
  "mars",
  "avr",
  "mai",
  "juin",
  "juil",
  "aout",
  "sept",
  "oct",
  "nov",
  "dec",
];

function formatFrenchDateLabel(dateInput, options = {}) {
  const {
    day = "2-digit",
    month = "long",
    year = "numeric",
    uppercase = false,
  } = options;
  const parsed = dateInput instanceof Date ? new Date(dateInput.getTime()) : parseEventDate(dateInput);
  if (!parsed || Number.isNaN(parsed.getTime())) return "";
  const monthNames = month === "short" ? frMonthNamesShort : frMonthNamesLong;
  const parts = [];
  if (day) {
    const rawDay = parsed.getDate();
    parts.push(day === "2-digit" ? String(rawDay).padStart(2, "0") : String(rawDay));
  }
  parts.push(monthNames[parsed.getMonth()]);
  if (year) {
    parts.push(String(parsed.getFullYear()));
  }
  const label = parts.join(" ");
  return uppercase ? label.toUpperCase() : label;
}

function getEventDateLabel(event, options = {}) {
  if (!event) return "";
  const sourceDate = event.dateISO || event.date;
  return formatFrenchDateLabel(sourceDate, options) || String(event.date || "");
}

function getEventTimeLabel(event) {
  if (!event) return "";
  const rawTime = String(event.timeISO || event.time || "").trim();
  const timeMatch = rawTime.match(/^(\d{1,2})(?::|h)?(\d{2})?$/i);
  if (timeMatch) {
    const hours = String(Math.max(0, Math.min(23, Number(timeMatch[1]) || 0))).padStart(2, "0");
    const minutes = String(Math.max(0, Math.min(59, Number(timeMatch[2] || 0)))).padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  const dateTimeSource = event.dateTimeISO || event.dateTime;
  if (!dateTimeSource) return "";
  const parsed = parseEventDate(dateTimeSource);
  if (!parsed) return "";
  return parsed.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

function getEventDateTimeLabel(event) {
  if (!event) return "";
  const dateLabel = getEventDateLabel(event);
  const timeLabel = getEventTimeLabel(event);
  if (!dateLabel) return timeLabel;
  return timeLabel ? `${dateLabel} · ${timeLabel}` : dateLabel;
}

function parseEventDateTime(event) {
  if (!event) return null;
  const dateTimeSource = event.dateTimeISO || event.dateTime;
  if (dateTimeSource) {
    const parsedDateTime = parseEventDate(dateTimeSource);
    if (parsedDateTime) return parsedDateTime;
  }

  const baseDate = parseEventDate(event.dateISO || event.date);
  if (!baseDate) return null;

  const nextDate = new Date(baseDate);
  const rawTime = String(event.timeISO || event.time || "").trim();
  if (!rawTime) {
    // Sans heure explicite, on considere la fin de journée.
    nextDate.setHours(23, 59, 59, 999);
    return nextDate;
  }

  const timeMatch = rawTime.match(/^(\d{1,2})(?::|h)?(\d{2})?$/i);
  if (!timeMatch) {
    nextDate.setHours(23, 59, 59, 999);
    return nextDate;
  }

  const hours = Math.max(0, Math.min(23, Number(timeMatch[1]) || 0));
  const minutes = Math.max(0, Math.min(59, Number(timeMatch[2] || 0)));
  nextDate.setHours(hours, minutes, 0, 0);
  return nextDate;
}

function getEventStatusLabel(event, now = new Date()) {
  const eventDateTime = parseEventDateTime(event);
  if (!eventDateTime) return "";
  return eventDateTime > now ? "" : "Passe";
}

function isUpcoming(event, now = new Date()) {
  const eventDateTime = parseEventDateTime(event);
  if (!eventDateTime) return false;
  return eventDateTime > now;
}

function getUpcomingCountdownLabel(event, now = new Date()) {
  const eventDateTime = parseEventDateTime(event);
  if (!eventDateTime) return "";
  const deltaMs = eventDateTime.getTime() - now.getTime();
  if (deltaMs <= 0) return "";

  const hourMs = 60 * 60 * 1000;
  const dayMs = 24 * hourMs;

  const hours = Math.max(1, Math.ceil(deltaMs / hourMs));
  if (hours < 24) {
    return `Dans ${hours} ${hours > 1 ? "heures" : "heure"}`;
  }

  const days = Math.max(1, Math.ceil(deltaMs / dayMs));
  if (days < 31) {
    return `Dans ${days} ${days > 1 ? "jours" : "jour"}`;
  }

  const months = Math.max(1, Math.ceil(days / 31));
  if (months < 12) {
    return `Dans ${months} mois`;
  }

  const years = Math.max(1, Math.ceil(months / 12));
  return `Dans ${years} ${years > 1 ? "ans" : "an"}`;
}

function buildEventUpcomingCountdownText(event) {
  if (!event || !isUpcoming(event)) return "";
  const label = getUpcomingCountdownLabel(event);
  if (!label) return "";
  return `<span class="event-corner-upcoming-text">${escapeHtml(label)}</span>`;
}

function syncEventStatuses(now = new Date()) {
  events.forEach((event) => {
    if (!event) return;
    if (!event.time && !event.timeISO) {
      event.time = "20:00";
    }
    if (!event.dateTimeISO && event.dateISO) {
      const safeTime = String(event.timeISO || event.time || "20:00").replace("h", ":");
      const hhmm = safeTime.match(/^(\d{1,2})(?::)?(\d{2})$/);
      if (hhmm) {
        const hours = String(Math.max(0, Math.min(23, Number(hhmm[1]) || 0))).padStart(2, "0");
        const minutes = String(Math.max(0, Math.min(59, Number(hhmm[2]) || 0))).padStart(2, "0");
        event.dateTimeISO = `${event.dateISO}T${hours}:${minutes}:00`;
      }
    }
    const upcoming = isUpcoming(event, now);
    // Un événement à venir ne doit jamais exposer de resultat.
    if (upcoming && Object.prototype.hasOwnProperty.call(event, "result")) {
      delete event.result;
    }
    event.status = upcoming ? "" : "Passe";
  });
}

function getStatusClass(event) {
  return isUpcoming(event) ? "is-upcoming" : "is-past";
}

function buildEventStatusTag() {
  return "";
}

function isInWatchlist(eventId) {
  return watchlist.has(eventId);
}

function getUserById(userId) {
  return usersById[userId] || { id: userId || "u-unknown", name: "Utilisateur", handle: "@profil", followers: 0 };
}

function getFollowersCount(userId) {
  const user = getUserById(userId);
  return user.followers + (storedUserFollows[userId] ? 1 : 0);
}

function normalizeFollowTargetType(targetType) {
  const safeType = String(targetType || "").trim().toLowerCase();
  if (!safeType) return "";
  if (safeType === "player") return "athlete";
  return safeType;
}

function getFollowStoreConfig(targetType) {
  const safeType = normalizeFollowTargetType(targetType);
  if (safeType === "user") {
    return { store: storedUserFollows, save: saveUserFollows, timelineType: "" };
  }
  if (safeType === "athlete") {
    return { store: storedAthleteFavorites, save: saveAthleteFavorites, timelineType: "athlete" };
  }
  if (safeType === "team") {
    return { store: storedTeamFavorites, save: saveTeamFavorites, timelineType: "team" };
  }
  if (safeType === "league") {
    return { store: storedLeagueFollows, save: saveLeagueFollows, timelineType: "league" };
  }
  if (safeType === "league-season") {
    return { store: storedLeagueSeasonFollows, save: saveLeagueSeasonFollows, timelineType: "league-season" };
  }
  return null;
}

function isFollowTargetFollowed(targetType, targetId) {
  const safeId = String(targetId || "").trim();
  const config = getFollowStoreConfig(targetType);
  if (!safeId || !config?.store) return false;
  return Boolean(config.store[safeId]);
}

function setFollowTargetFollowed(targetType, targetId, shouldFollow) {
  const safeId = String(targetId || "").trim();
  const config = getFollowStoreConfig(targetType);
  if (!safeId || !config?.store || typeof config.save !== "function") return false;
  if (shouldFollow) {
    config.store[safeId] = true;
  } else {
    delete config.store[safeId];
  }
  config.save();
  if (config.timelineType) {
    if (shouldFollow) {
      setFavoriteActionTimestamp(config.timelineType, safeId);
    } else {
      removeFavoriteActionTimestamp(config.timelineType, safeId);
    }
  }
  return Boolean(shouldFollow);
}

function toggleFollowTarget(targetType, targetId) {
  const currentlyFollowed = isFollowTargetFollowed(targetType, targetId);
  return setFollowTargetFollowed(targetType, targetId, !currentlyFollowed);
}

function getFavoriteSports() {
  const counts = {};
  Object.keys(storedRatings).forEach((eventId) => {
    const event = events.find((item) => item.id === eventId);
    if (!event) return;
    if (isUpcoming(event)) return;
    counts[event.sport] = (counts[event.sport] || 0) + 1;
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([sport]) => sport);
}

function eventUrlFor(event) {
  return `event.html?id=${event.id}`;
}

function leagueUrlFor(league) {
  return `league.html?id=${league.id}`;
}

function leagueSeasonUrlFor(leagueSeason) {
  return `league-season.html?id=${leagueSeason.id}`;
}

function getLeagueById(leagueId) {
  return getLeagueSeasonById(leagueId);
}

function getLeagueSeasonById(leagueSeasonId) {
  if (!leagueSeasonId) return null;
  return leagueSeasonsById[leagueSeasonId] || null;
}

function getLeagueRootById(leagueId) {
  if (!leagueId) return null;
  return leagueRootsById[leagueId] || null;
}

function getLeagueSeasonsByLeagueId(leagueId, options = {}) {
  const {
    sort = "desc",
  } = options;
  if (!leagueId) return [];
  const league = getLeagueRootById(leagueId);
  if (!league) return [];
  const list = (league.seasonIds || [])
    .map((seasonId) => getLeagueSeasonById(seasonId))
    .filter(Boolean)
    .sort((a, b) => {
      const dateA = parseEventDate(a.dateISO || a.startDateISO || a.endDateISO || "") || new Date(0);
      const dateB = parseEventDate(b.dateISO || b.startDateISO || b.endDateISO || "") || new Date(0);
      return sort === "asc" ? dateA - dateB : dateB - dateA;
    });
  return list;
}

function getLeagueMatches(leagueId, options = {}) {
  const {
    sort = "asc",
  } = options;
  const league = getLeagueSeasonById(leagueId);
  if (!league) return [];
  const list = (league.eventIds || [])
    .map((eventId) => events.find((event) => event.id === eventId))
    .filter(Boolean);
  list.sort((a, b) => {
    const timeA = parseEventDateTime(a)?.getTime() || 0;
    const timeB = parseEventDateTime(b)?.getTime() || 0;
    return sort === "desc" ? timeB - timeA : timeA - timeB;
  });
  return list;
}

function getLeagueDateWindow(leagueId) {
  const matches = getLeagueMatches(leagueId, { sort: "asc" });
  if (!matches.length) {
    return { start: null, end: null };
  }
  return {
    start: parseEventDateTime(matches[0]),
    end: parseEventDateTime(matches[matches.length - 1]),
  };
}

function getLeagueCommunityScore(leagueId) {
  const league = getLeagueSeasonById(leagueId);
  if (!league) return 0;
  const matches = getLeagueMatches(leagueId);
  if (!matches.length) return Number(league.communityScore || 0);
  const avg = matches.reduce((total, event) => total + Number(event.communityScore || 0), 0) / matches.length;
  return Number(avg.toFixed(1));
}

function getLeagueRootDateWindow(leagueId) {
  const league = getLeagueRootById(leagueId);
  if (!league) {
    return { start: null, end: null };
  }
  const matches = (league.eventIds || [])
    .map((eventId) => events.find((event) => event.id === eventId))
    .filter(Boolean)
    .sort((a, b) => {
      const timeA = parseEventDateTime(a)?.getTime() || 0;
      const timeB = parseEventDateTime(b)?.getTime() || 0;
      return timeA - timeB;
    });
  if (!matches.length) {
    return { start: null, end: null };
  }
  return {
    start: parseEventDateTime(matches[0]),
    end: parseEventDateTime(matches[matches.length - 1]),
  };
}

function getEventTimestampForSélection(event) {
  if (!event) return 0;
  const date = parseEventDateTime(event) || parseEventDate(event.dateISO || event.date) || null;
  return date ? date.getTime() : 0;
}

function pickPrimaryEvent(eventsList, options = {}) {
  const {
    now = new Date(),
  } = options;
  const list = Array.isArray(eventsList) ? eventsList.filter(Boolean) : [];
  if (!list.length) return null;
  const nowTime = now.getTime();
  const enriched = list.map((event) => ({
    event,
    time: getEventTimestampForSélection(event),
  }));
  const upcoming = enriched
    .filter((item) => item.time >= nowTime)
    .sort((a, b) => a.time - b.time);
  if (upcoming.length) return upcoming[0].event;
  const past = enriched.sort((a, b) => b.time - a.time);
  return past[0]?.event || list[0] || null;
}

function getCommentsForLeagueRoot(leagueId, options = {}) {
  const {
    commentType = "",
  } = options;
  const seasons = getLeagueSeasonsByLeagueId(leagueId, { sort: "desc" });
  const rootDirectComments = getCommentsForTarget(COMMENT_TARGET_LEAGUE, leagueId, { commentType });
  if (!seasons.length) return rootDirectComments;
  const seenIds = new Set();
  const all = [];
  rootDirectComments.forEach((comment) => {
    seenIds.add(comment.id);
    all.push(comment);
  });
  seasons.forEach((season) => {
    getCommentsForLeague(season.id, { commentType }).forEach((comment) => {
      if (seenIds.has(comment.id)) return;
      seenIds.add(comment.id);
      all.push(comment);
    });
  });
  return sortCommentsForDisplay(all);
}

function parseEventIdFromHref(href) {
  if (!href) return "";
  try {
    const url = new URL(String(href), window.location.origin);
    const eventId = url.searchParams.get("id") || "";
    if (!eventId) return "";
    return events.some((item) => item.id === eventId) ? eventId : "";
  } catch {
    return "";
  }
}

function getEventIdForOverlayFromTarget(target) {
  if (!target) return "";

  const explicitOverlayTrigger = target.closest("[data-event-overlay-event-id]");
  if (explicitOverlayTrigger) {
    const explicitEventId = explicitOverlayTrigger.dataset.eventOverlayEventId || "";
    return events.some((item) => item.id === explicitEventId) ? explicitEventId : "";
  }

  const miniLink = target.closest("a.event-mini");
  if (miniLink) {
    return parseEventIdFromHref(miniLink.getAttribute("href"));
  }

  if (target.closest("button, input, textarea, select, label")) {
    return "";
  }

  const calendarPreview = target.closest(
    "#calendar-list .calendar-chip, #calendar-list .calendar-item, #watchlist-items .calendar-chip, #watchlist-items .calendar-item, #ui-calendar-miniatures .calendar-chip, #ui-calendar-miniatures .calendar-item, #ui-event-overlay-samples .calendar-chip, #ui-event-overlay-samples .calendar-item"
  );
  if (calendarPreview) {
    const byDataHref = parseEventIdFromHref(calendarPreview.dataset.href);
    if (byDataHref) return byDataHref;
    const byDataEventId = calendarPreview.dataset.eventId || "";
    return events.some((item) => item.id === byDataEventId) ? byDataEventId : "";
  }

  if (target.closest("a")) {
    return "";
  }

  return "";
}

function ensureCardOverlayHost() {
  let host = document.getElementById("event-card-overlay");
  if (host) return host;
  host = document.createElement("div");
  host.id = "event-card-overlay";
  host.className = "event-card-overlay";
  host.setAttribute("aria-hidden", "true");
  host.innerHTML = `
    <button class="event-card-overlay-backdrop" type="button" data-card-overlay-close data-event-overlay-close aria-label="Fermer"></button>
    <div class="event-card-overlay-panel" role="dialog" aria-modal="true" aria-label="Aperçu de la carte" data-card-overlay-panel>
      <div class="event-card-overlay-body" data-card-overlay-body data-event-overlay-body></div>
    </div>
  `;
  document.body.appendChild(host);
  return host;
}

function closeCardOverlay() {
  const host = document.getElementById("event-card-overlay");
  if (!host) return;
  host.classList.remove("is-open");
  host.setAttribute("aria-hidden", "true");
  const body = host.querySelector("[data-card-overlay-body]");
  if (body) {
    body.innerHTML = "";
  }
  document.body.classList.remove("has-card-overlay");
  document.body.classList.remove("has-event-card-overlay");
}

function openCardOverlay(cardHtml, options = {}) {
  if (!cardHtml) return;
  const {
    ariaLabel = "Aperçu de la carte",
  } = options;
  const resolvedCardHtml = typeof cardHtml === "string"
    ? cardHtml
    : cardHtml?.outerHTML || "";
  if (!resolvedCardHtml) return;
  const host = ensureCardOverlayHost();
  const panel = host.querySelector("[data-card-overlay-panel]");
  const body = host.querySelector("[data-card-overlay-body]");
  if (!body) return;
  if (panel) {
    panel.setAttribute("aria-label", String(ariaLabel));
  }
  body.innerHTML = resolvedCardHtml;
  host.classList.add("is-open");
  host.setAttribute("aria-hidden", "false");
  document.body.classList.add("has-card-overlay");
  document.body.classList.add("has-event-card-overlay");
  syncAllSofaScoreThumbPositions();
}

function ensureEventCardOverlayHost() {
  return ensureCardOverlayHost();
}

function closeEventCardOverlay() {
  closeCardOverlay();
}

function openEventCardOverlay(eventId) {
  if (!eventId) return;
  const event = events.find((item) => item.id === eventId);
  if (!event) return;
  openCardOverlay(buildEventCard(event, { linkMode: "overlay" }), {
    ariaLabel: "Aperçu de l'événement",
  });
}

function getEventImage(event) {
  return event.image || "images/events/samplegeneric.jpeg";
}

function getAthleteImage(athlete) {
  return athlete?.image || "images/events/samplegeneric.jpeg";
}

function getListItems(list) {
  if (!list || !Array.isArray(list.entries)) return [];
  return list.entries
    .map((entry, index) => {
      const event = entry.eventId ? events.find((item) => item.id === entry.eventId) : null;
      const athlete = entry.athleteId ? getAthleteById(entry.athleteId) : null;
      if (!event && !athlete) return null;
      return { entry, event, athlete, note: entry.note, order: index + 1 };
    })
    .filter(Boolean);
}

function getListItemImage(item) {
  if (!item) return "images/events/samplegeneric.jpeg";
  if (item.event) return getEventImage(item.event);
  if (item.athlete) return getAthleteImage(item.athlete);
  return "images/events/samplegeneric.jpeg";
}

function getListItemLink(item) {
  if (!item) return "#";
  if (item.event) return eventUrlFor(item.event);
  if (item.athlete) return athleteUrlFor(item.athlete);
  return "#";
}

function getListItemLabel(list) {
  return list?.itemLabel || "événements";
}

function getListItemDisplayName(item) {
  if (!item) return "";
  if (item.event?.title) return item.event.title;
  if (item.athlete?.name) return item.athlete.name;
  return "";
}

function getEventParticipants(eventId) {
  const entry = athleteParticipation.find((item) => item.eventId === eventId);
  if (!entry) return [];
  return entry.athleteIds
    .map((athleteId) => athletes.find((athlete) => athlete.id === athleteId))
    .filter(Boolean);
}

function getAthleteById(athleteId) {
  return athletes.find((athlete) => athlete.id === athleteId);
}

function getAthleteEvents(athleteId) {
  return athleteParticipation
    .filter((entry) => entry.athleteIds.includes(athleteId))
    .map((entry) => events.find((event) => event.id === entry.eventId))
    .filter(Boolean);
}

function getAthleteFollowerCount(athlete) {
  if (!athlete) return 0;
  if (Number.isFinite(athlete.followers)) {
    return Math.max(0, Math.round(athlete.followers));
  }
  const seed = String(athlete.id || athlete.name || "")
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const base = 1200 + (seed % 2600);
  return base + (storedAthleteFavorites[athlete.id] ? 1 : 0);
}

function getPopularParticipants(eventId, limit = 3) {
  return getEventParticipants(eventId)
    .slice()
    .sort((a, b) => {
      const diff = getAthleteFollowerCount(b) - getAthleteFollowerCount(a);
      if (diff !== 0) return diff;
      return String(a.name || "").localeCompare(String(b.name || ""));
    })
    .slice(0, limit);
}

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

function getAthleteAvatar(athlete) {
  if (athlete.image) {
    return `<img src="${athlete.image}" alt="${athlete.name}">`;
  }
  return `<span class="participant-fallback">${getInitials(athlete.name)}</span>`;
}

function buildPlayerMiniatureElement(athlete, options = {}) {
  if (!athlete) return "";
  const {
    showName = false,
    className = "",
  } = options;
  const safeName = escapeHtml(athlete.name || "Sportif");
  const extraClass = className ? ` ${className}` : "";
  return `
    <a class="player-miniature ${showName ? "with-name" : ""}${extraClass}" href="${athleteUrlFor(athlete)}" aria-label="Voir ${safeName}" title="${safeName}">
      <span class="player-miniature-avatar">
        ${getAthleteAvatar(athlete)}
      </span>
      ${showName ? `<span class="player-miniature-name">${safeName}</span>` : ""}
    </a>
  `;
}

function buildEventPlayerMiniaturesElement(eventId, options = {}) {
  if (!eventId) return "";
  const {
    maxPlayers = 6,
    showName = false,
    compact = false,
    className = "",
  } = options;
  const safeMax = Math.max(1, Math.min(12, Number(maxPlayers) || 6));
  const players = getPopularParticipants(eventId, safeMax);
  if (!players.length) return "";
  const extraClass = className ? ` ${className}` : "";
  const compactClass = compact ? " is-compact" : "";
  const playerClass = compact ? "is-compact" : "";
  return `
    <div class="participant-avatars event-player-miniatures${compactClass}${extraClass}">
      ${players.map((athlete) => buildPlayerMiniatureElement(athlete, { showName, className: playerClass })).join("")}
    </div>
  `;
}

function athleteUrlFor(athlete) {
  return `athlete.html?id=${athlete.id}`;
}

function teamUrlFor(team) {
  return `team.html?id=${team.id}`;
}

function getAthleteSports(athlete) {
  if (Array.isArray(athlete.sports)) return athlete.sports;
  if (Array.isArray(athlete.sport)) return athlete.sport;
  if (athlete.sport) return [athlete.sport];
  return [];
}

function getAthleteSportLabel(athlete) {
  const sports = getAthleteSports(athlete);
  return sports.length ? sports.join(" / ") : "Non renseigné";
}

function getTeamById(teamId) {
  return teams.find((team) => team.id === teamId) || null;
}

function getTeamMembers(team) {
  return (team.athleteIds || [])
    .map((athleteId) => athletes.find((athlete) => athlete.id === athleteId))
    .filter(Boolean);
}

function getAthleteTeamName(athlete) {
  if (athlete.teamId) {
    const team = getTeamById(athlete.teamId);
    if (team) return team.name;
  }
  return athlete.team || "Non renseigné";
}

function getTeamsForEvent(eventId) {
  const entry = eventTeams.find((item) => item.eventId === eventId);
  if (!entry) return [];
  return entry.teamIds.map((teamId) => getTeamById(teamId)).filter(Boolean);
}

function getTopQuote(event) {
  if (!event) return null;
  if (isUpcoming(event)) {
    const comments = getCommentsForEvent(event.id, "teaser");
    if (!comments.length) return null;
    const top = comments.slice().sort((a, b) => getCommentTotalLikes(b) - getCommentTotalLikes(a))[0];
    return { text: top.note, author: top.author, likes: getCommentTotalLikes(top) };
  }
  const reviews = getCommentsForEvent(event.id, "critique");
  if (!reviews.length) return null;
  const top = reviews.slice().sort((a, b) => getCommentTotalLikes(b) - getCommentTotalLikes(a))[0];
  return { text: top.note, author: top.author, likes: getCommentTotalLikes(top) };
}

function truncateQuote(text, maxLength = 110) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

function buildCommentPreview(event, compact = false, contextNote = "") {
  if (!event) return "";
  const isFuture = isUpcoming(event);
  const sourceType = isFuture ? "teaser" : "critique";
  const source = getCommentsForEvent(event.id, sourceType);
  const items = source
    .slice()
    .sort((a, b) => getCommentTotalLikes(b) - getCommentTotalLikes(a));
  if (!items.length) {
    return `
      <div class="comment-preview ${compact ? "compact" : ""}">
        ${contextNote ? `<div class="comment-preview-context">${contextNote}</div>` : ""}
        <div class="comment-preview-empty">Aucun commentaire pour le moment.</div>
      </div>
    `;
  }

  const initialLimit = compact ? 1 : 2;
  const expandedLimit = compact ? 3 : 4;
  const displayItems = items.slice(0, expandedLimit);
  const showToggle = items.length > initialLimit;
  const commentIcon = `
    <svg class="comment-preview-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 15a3 3 0 0 1-3 3H9l-5 3V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
    </svg>
  `;

  const itemsHtml = displayItems.map((item, index) => {
    const user = getUserById(item.userId);
    const authorLink = user ? `profile.html?id=${user.id}` : "#";
    const ratingValue = clampSofaScore(toSofaScore(isFuture ? event.communityScore : item.rating || 0));
    const scoreBadge = buildScoreBadge(ratingValue, "small");
    const liked = isCommentLiked(item);
    const totalLikes = getCommentTotalLikes(item);
    const repliesCount = item.replies ? item.replies.length : 0;
    const avatarMarkup = user && user.image
      ? `<img src="${user.image}" alt="${user.name}">`
      : getInitials(item.author);
    const likeButton = isFuture
      ? buildCommentLikeButton({
        type: "comment",
        liked,
        totalLikes,
        commentId: item.id,
        className: "comment-preview-like",
      })
      : buildCommentLikeButton({
        type: "review",
        liked,
        totalLikes,
        reviewId: item.id,
        eventId: event.id,
        className: "comment-preview-like",
      });
    const replyButton = buildReplyTrigger(item.id, event.id, "", compact);
    const replyComposer = buildReplyComposer(item.id, event.id, "", compact);
    return buildFrameElement(`
      <div class="comment-preview-item-head">
        <a class="comment-preview-avatar" href="${authorLink}" aria-label="Voir ${item.author}">
          ${avatarMarkup}
        </a>
        <div class="comment-preview-item-meta">
          <span class="comment-preview-stars">${scoreBadge}</span>
          <div class="comment-preview-item-line">
            <a class="comment-preview-author" href="${authorLink}">${item.author}</a>
            <span class="comment-preview-sep">·</span>
          <span class="comment-preview-date">${item.date}</span>
          </div>
        </div>
        <div class="comment-preview-item-actions">
          <span class="comment-preview-action">${commentIcon}<span>${formatNumber(repliesCount)}</span></span>
          ${likeButton}
          ${replyButton}
        </div>
      </div>
      <p class="comment-preview-text">${truncateQuote(item.note, compact ? 90 : 140)}</p>
      ${replyComposer}
    `, {
      tag: "article",
      className: `comment-preview-item ${index >= initialLimit ? "is-extra" : ""}`,
    });
  }).join("");

  return `
    <div class="comment-preview ${compact ? "compact" : ""}">
      <div class="comment-preview-header ${showToggle ? "" : "is-hidden"}">
        <button class="comment-preview-toggle" data-event-id="${event.id}">Agrandir</button>
      </div>
      ${contextNote ? `<div class="comment-preview-context">${contextNote}</div>` : ""}
      <div class="comment-preview-list">
        ${itemsHtml}
      </div>
    </div>
  `;
}

function formatNumber(value) {
  return new Intl.NumberFormat("fr-FR").format(value);
}

function buildCommentLikeMetric(totalLikes, options = {}) {
  const {
    className = "",
    ariaHidden = false,
    liked = false,
  } = options;
  const safeCount = formatNumber(Number(totalLikes) || 0);
  const extraClass = `${liked ? " is-liked" : ""}${className ? ` ${className}` : ""}`;
  const hiddenAttr = ariaHidden ? ' aria-hidden="true"' : "";
  return `
    <span class="comment-like-metric${extraClass}"${hiddenAttr}>
      <span class="heart" aria-hidden="true">❤</span>
      <span class="like-count">${safeCount}</span>
    </span>
  `;
}

function buildAnswersNumber(totalAnswers, options = {}) {
  const {
    className = "",
    ariaHidden = false,
    label,
    asButton = false,
    expanded = false,
    commentId = "",
    controlsId = "",
  } = options;
  const countValue = Number(totalAnswers) || 0;
  const safeCount = formatNumber(countValue);
  const labelText = label ?? (countValue === 1 ? "1 réponse" : `${safeCount} réponses`);
  const expandedLabel = countValue === 1 ? "Masquer la réponse" : "Masquer les réponses";
  const collapsedLabel = countValue === 1 ? "Afficher 1 réponse" : `Afficher ${safeCount} réponses`;
  const stateLabel = expanded ? expandedLabel : collapsedLabel;
  const extraClass = className ? ` ${className}` : "";
  const hiddenAttr = ariaHidden ? ' aria-hidden="true"' : "";
  const labelAttr = ariaHidden ? "" : ` aria-label="${escapeHtml(asButton ? stateLabel : labelText)}"`;
  const controlsAttr = controlsId ? ` aria-controls="${escapeHtml(controlsId)}"` : "";
  const buttonAttrs = asButton
    ? ` type="button" data-comment-answers-toggle data-comment-id="${escapeHtml(commentId)}" data-label-collapsed="${escapeHtml(collapsedLabel)}" data-label-expanded="${escapeHtml(expandedLabel)}" aria-expanded="${expanded ? "true" : "false"}"${controlsAttr}`
    : "";
  const tag = asButton ? "button" : "span";
  return `
    <${tag} class="answers-number${asButton ? " answers-number-toggle" : ""}${expanded ? " is-expanded" : ""}${extraClass}"${hiddenAttr}${labelAttr}${buttonAttrs}>
      <svg class="answers-number-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 15a3 3 0 0 1-3 3H9l-5 3V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
      </svg>
      <span class="answers-number-count">${safeCount}</span>
    </${tag}>
  `;
}

function buildCommentLikeButton(options = {}) {
  const {
    type = "comment",
    targetType = "",
    targetId = "",
    liked = false,
    totalLikes = 0,
    commentId = "",
    reviewId = "",
    replyId = "",
    listId = "",
    rankingId = "",
    athleteId = "",
    teamId = "",
    eventId = "",
    className = "",
    label = "",
  } = options;
  const legacyType = String(type || "").trim().toLowerCase();
  const explicitTargetType = String(targetType || "").trim().toLowerCase();
  const resolvedTargetType = explicitTargetType
    || (legacyType === "review" ? "review"
      : legacyType === "reply" ? "reply"
      : legacyType === "list" || legacyType === "ranking" ? "list"
      : legacyType === "favorite-athlete" ? "athlete"
      : legacyType === "favorite-team" ? "team"
      : "comment");
  const resolvedTargetId = String(
    targetId
    || (resolvedTargetType === "review" ? reviewId : "")
    || (resolvedTargetType === "reply" ? replyId : "")
    || (resolvedTargetType === "list" ? (listId || rankingId) : "")
    || (resolvedTargetType === "athlete" ? athleteId : "")
    || (resolvedTargetType === "team" ? teamId : "")
    || commentId
    || ""
  ).trim();

  const baseClass = resolvedTargetType === "review"
    ? "like-button"
    : resolvedTargetType === "reply"
      ? "reply-like-btn"
      : "comment-like-btn";

  const targetAttrs = resolvedTargetType && resolvedTargetId
    ? ` data-target-type="${escapeHtml(resolvedTargetType)}" data-target-id="${escapeHtml(resolvedTargetId)}"`
    : "";
  const legacyAttrs = resolvedTargetType === "review"
    ? ` data-review-id="${escapeHtml(resolvedTargetId)}"${eventId ? ` data-event-id="${escapeHtml(eventId)}"` : ""}`
    : resolvedTargetType === "reply"
      ? ` data-reply-id="${escapeHtml(resolvedTargetId)}"`
      : resolvedTargetType === "list"
        ? ` data-list-id="${escapeHtml(resolvedTargetId)}"`
        : resolvedTargetType === "athlete"
          ? ` data-athlete-id="${escapeHtml(resolvedTargetId)}"`
          : resolvedTargetType === "team"
            ? ` data-team-id="${escapeHtml(resolvedTargetId)}"`
            : ` data-comment-id="${escapeHtml(resolvedTargetId)}"`;
  const dataAttrs = `${targetAttrs}${legacyAttrs}`;

  const stateLabel = resolvedTargetType === "list"
    ? liked ? "Retirer le like du classement" : "Liker le classement"
    : resolvedTargetType === "athlete" || resolvedTargetType === "team"
      ? liked ? "Retirer des favoris" : "Ajouter aux favoris"
      : liked ? "Retirer le like" : "Liker";
  const extraClass = className ? ` ${className}` : "";
  const textLabel = label ? `<span class="comment-like-label">${escapeHtml(label)}</span>` : "";
  return `
    <button class="${baseClass} ${liked ? "is-liked" : ""}${extraClass}" type="button"${dataAttrs} aria-label="${stateLabel}">
      ${textLabel}
      ${buildCommentLikeMetric(totalLikes, { ariaHidden: true, liked })}
    </button>
  `;
}

function buildUnifiedCommentCard(item, options = {}) {
  if (!item) return "";
  const {
    mode = "comment",
    likeButtonType = "",
    eventId = "",
    eventName = false,
    showFollowButton = true,
    showReplyAction = true,
    showReplyComposer = true,
    showReplies = true,
    showScore = true,
    compact = false,
    className = "",
  } = options;
  const size = compact ? "compact" : "default";
  const safeMode = mode === "review" ? "review" : "comment";
  const resolvedEventId = eventId || item.eventId || "";
  const event = events.find((entry) => entry.id === resolvedEventId);
  const user = getUserById(item.userId);
  const safeNote = escapeHtml(item.note || "");
  const liked = isCommentLiked(item);
  const totalLikes = getCommentTotalLikes(item);
  const likeType = likeButtonType || (safeMode === "review" ? "review" : "comment");
  const likeButton = buildCommentLikeButton({
    type: likeType,
    liked,
    totalLikes,
    commentId: item.id,
    reviewId: item.id,
    eventId: resolvedEventId,
  });
  const headerScore = safeMode === "review" && showScore && Number.isFinite(item.rating)
    ? toSofaScore(item.rating || 0)
    : null;
  const showEventName = eventName === true || String(eventName || "").trim().toLowerCase() === "y";
  const eventTitle = event?.title || "Événement";
  const eventLeague = event?.leagueTitle || event?.league || "";
  const eventHeadingLabel = eventLeague ? `${eventTitle} - ${eventLeague}` : eventTitle;
  const eventHeadingMarkup = showEventName && event
    ? `
      <button
        class="comment-event-heading-outside"
        type="button"
        data-event-overlay-event-id="${escapeHtml(event.id)}"
        aria-label="Ouvrir l'événement ${escapeHtml(eventHeadingLabel)}"
      >
        ${escapeHtml(eventHeadingLabel)}
      </button>
    `
    : "";
  const headerUser = user || { name: item.author || "Utilisateur" };
  const headerCommentaire = buildHeaderCommentaireElement(headerUser, headerScore ?? 0, {
    size,
    showScore: headerScore !== null,
    link: Boolean(user?.id),
    showFollowButton,
  });
  const dateInput = item.dateTime || item.createdAt || item.dateISO || item.date || event?.dateISO || event?.date || "";
  const dateElement = buildRelativeDateElement(dateInput, {
    size: "compact",
    className: "comment-head-date",
  });
  const replyAction = showReplyAction ? buildReplyTrigger(item.id, resolvedEventId, "", true) : "";
  const replyComposer = showReplyComposer ? buildReplyComposer(item.id, resolvedEventId, "", compact) : "";
  const replies = Array.isArray(item.replies) ? item.replies : [];
  const repliesCount = replies.length;
  const hasReplyThread = showReplies && repliesCount > 0;
  const threadId = hasReplyThread ? `comment-thread-${item.id}` : "";
  const answersMetric = buildAnswersNumber(repliesCount, {
    className: "comment-answers-number",
    asButton: hasReplyThread,
    expanded: false,
    commentId: item.id,
    controlsId: threadId,
  });
  const repliesMarkup = showReplies && replies.length ? `
    <div class="comment-thread is-collapsed" id="${escapeHtml(threadId)}" data-comment-thread data-comment-id="${escapeHtml(item.id)}">
      ${replies.map((reply) => {
        const replyUser = getUserById(reply.userId);
        const replyLiked = isCommentLiked(reply);
        const replyLikes = getCommentTotalLikes(reply);
        const safeReplyNote = escapeHtml(reply.note || "");
        const replyHeaderUser = replyUser || { name: reply.author || "Utilisateur" };
        const replyHeaderCommentaire = buildHeaderCommentaireElement(replyHeaderUser, 0, {
          size: "compact",
          showScore: false,
          link: Boolean(replyUser?.id),
          showFollowButton: false,
          className: "comment-reply-header",
        });
        const replyLikeButton = buildCommentLikeButton({
          type: "comment",
          liked: replyLiked,
          totalLikes: replyLikes,
          commentId: reply.id,
          className: "reply-like-btn",
        });
        return `
          <div class="comment-reply">
            <div class="comment-reply-body">
              <div class="comment-reply-meta">
                <div class="comment-reply-meta-left">
                  ${replyHeaderCommentaire}
                </div>
                ${replyLikeButton}
              </div>
              <p>${safeReplyNote}</p>
            </div>
          </div>
        `;
      }).join("")}
    </div>
  ` : "";
  const compactClass = compact ? " compact" : "";
  const extraClass = className ? ` ${className}` : "";
  const commentContentMarkup = `
    <div class="comment-head">
      ${headerCommentaire}
      <div class="comment-head-right">
        ${likeButton}
      </div>
    </div>
    <p class="comment-text">${safeNote}</p>
    <div class="comment-actions">
      ${dateElement}
      ${answersMetric}
      ${replyAction}
    </div>
    ${replyComposer}
    ${repliesMarkup}
  `;
  const commentCardMarkup = buildFrameElement(commentContentMarkup, {
    tag: "article",
    className: `review-card comment-card unified-comment-card is-${safeMode}${compactClass}${extraClass}`,
  });
  if (!eventHeadingMarkup) {
    return commentCardMarkup;
  }
  const wrapperCompactClass = compact ? " compact" : "";
  return `
    <div class="unified-comment-with-event-heading${wrapperCompactClass}">
      ${eventHeadingMarkup}
      ${commentCardMarkup}
    </div>
  `;
}

function toSofaScore(value) {
  const num = Number(value);
  if (Number.isNaN(num)) return 0;
  if (num <= 10) return Math.round(num * 10);
  return Math.round(num);
}

function clampSofaScore(value) {
  const num = Number(value);
  if (Number.isNaN(num)) return 0;
  return Math.max(0, Math.min(100, Math.round(num)));
}

function getScoreColor(value) {
  return clampSofaScore(value) >= 50 ? "var(--sofa-green)" : "var(--sofa-red)";
}

function getScoreTextColor(value) {
  return clampSofaScore(value) >= 50 ? "#111111" : "#ffffff";
}

function buildScoreBadge(value, size = "") {
  const score = clampSofaScore(value);
  const sizeClass = size ? ` ${size}` : "";
  return `
    <span class="score-badge${sizeClass}" style="--score-color:${getScoreColor(score)}" aria-label="Score ${score}%">
      <span class="score-badge-logo" aria-hidden="true"></span>
      <span class="score-badge-value">${score}%</span>
    </span>
  `;
}

function buildEventMiniature(event) {
  if (!event) return "";
  const title = event.title || "Événement";
  const result = String(event.result || "").trim();
  const titleLine = result ? `${title} - ${result}` : title;
  const league = event.leagueTitle || event.league || "Competition";
  const sport = event.sport || "Sport";
  const isFuture = isUpcoming(event);
  const userRating = storedRatings[event.id] || 0;
  const userScore = clampSofaScore(userRating);
  const hasUserScore = !isFuture && userScore > 0;
  const communityScore = toSofaScore(event.communityScore || 0);
  const dateLabel = getEventDateTimeLabel(event) || "Date non renseignée";
  const safeTitle = escapeHtml(title);
  const safeTitleLine = escapeHtml(titleLine);
  const safeLeague = escapeHtml(league);
  const safeDateLabel = escapeHtml(dateLabel);
  const link = eventUrlFor(event);
  const image = getEventImage(event);
  const leadingTopChip = !isFuture
    ? (hasUserScore
      ? buildEventUserScoreToggleButton(userScore, { eventId: event.id })
      : buildEventRateChipButton({ eventId: event.id, href: link }))
    : "";
  const cornerMeta = buildEventCornerMeta({
    sport,
    isFuture,
    communityScore,
    leadingChipHtml: leadingTopChip,
    watchlistButtonHtml: "",
    className: "event-mini-corner-meta",
    ariaLabel: `Aperçu ${sport}, score communauté ${communityScore}%`,
  });
  return `
    <a class="event-mini" href="${link}" aria-label="${safeTitle}">
      <span class="event-mini-media">
        <img src="${image}" alt="${safeTitle}">
        <span class="event-mini-overlay">
          ${cornerMeta}
          <span class="event-mini-titleline">${safeTitleLine}</span>
          <span class="event-mini-league">${safeLeague}</span>
          <span class="event-mini-date">${safeDateLabel}</span>
        </span>
      </span>
    </a>
  `;
}

function buildSorareCardSample(event) {
  if (!event) return "";
  const statusClass = getStatusClass(event);
  const statusLabel = getEventStatusLabel(event);
  const score = clampSofaScore(toSofaScore(event.communityScore || 0));
  const watchers = formatNumber(getWatchlistCount(event));
  return buildFrameElement(`
    <img class="sorare-card-bg" src="${getEventImage(event)}" alt="${event.title}">
    <div class="sorare-card-overlay">
      <div class="sorare-card-top">
        <span class="sorare-chip">_sorare</span>
        <span class="sorare-score">${score}</span>
      </div>
      <div class="sorare-card-main">
        <span class="sorare-league">${event.league}</span>
        <h3>${event.title}</h3>
        <p>${getEventDateTimeLabel(event)}</p>
      </div>
      <div class="sorare-card-bottom">
        ${statusLabel ? `<span class="sorare-pill ${statusClass}">${statusLabel}</span>` : ""}
        <span class="sorare-watchers">❤ ${watchers}</span>
      </div>
    </div>
  `, {
    tag: "a",
    className: `sorare-card ${statusClass}`,
    attributes: `href="${eventUrlFor(event)}" aria-label="${escapeHtml(event.title)}"`,
  });
}

function sanitizeCssValue(value, fallback = "") {
  const raw = String(value == null ? fallback : value)
    .replaceAll("\"", "")
    .replaceAll("<", "")
    .replaceAll(">", "")
    .trim();
  return raw || String(fallback || "").trim();
}

function buildFrameElement(contentHtml, options = {}) {
  const {
    tag = "div",
    className = "",
    background = "",
    hoverable = true,
    shadowAtRest = false,
    shadowValue = "var(--gum-shadow-hard)",
    attributes = "",
  } = options;
  const safeTag = ["div", "article", "section", "aside", "li", "a"].includes(tag) ? tag : "div";
  const extraClass = className ? ` ${className}` : "";
  const hoverClass = hoverable ? " is-hoverable" : "";
  const safeBackground = sanitizeCssValue(background, "");
  const safeShadowValue = sanitizeCssValue(shadowValue, "var(--gum-shadow-hard)");
  const styleTokens = [
    `--basic-frame-shadow:${shadowAtRest ? safeShadowValue : "none"};`,
  ];
  if (safeBackground) {
    styleTokens.push(`--basic-frame-bg:${safeBackground};`);
  }
  const styleAttr = styleTokens.length ? ` style="${styleTokens.join("")}"` : "";
  const attrs = attributes ? ` ${attributes.trim()}` : "";
  return `<${safeTag} class="basic-frame${hoverClass}${extraClass}"${styleAttr}${attrs}>${contentHtml}</${safeTag}>`;
}

function buildEmptyStateCard(message, options = {}) {
  const {
    className = "event-card empty-card",
    tag = "div",
  } = options;
  return buildFrameElement(escapeHtml(message || ""), {
    tag,
    className,
  });
}

function buildDetailStatCard(label, value, options = {}) {
  const { rawValue = false } = options;
  const safeLabel = escapeHtml(label || "");
  const safeValue = rawValue ? String(value || "") : escapeHtml(value || "");
  return buildFrameElement(`
    <span>${safeLabel}</span>
    <strong>${safeValue}</strong>
  `, {
    className: "detail-card",
  });
}

function buildEventStyleCommentCard(comment, event) {
  if (!comment || !event) return "";
  const statusClass = getStatusClass(event);
  const isFuture = isUpcoming(event);
  const communityScore = toSofaScore(event.communityScore || 0);
  const userScore = Number.isFinite(comment.rating) ? toSofaScore(comment.rating || 0) : 0;
  const watchlistCount = getWatchlistCount(event);
  const watchlistButton = buildAddWatchlistFabButton({
    eventId: event.id,
    isSaved: isInWatchlist(event.id),
    watchlistCount,
  });
  const cornerMeta = buildEventCornerMeta({
    sport: event.sport,
    isFuture,
    communityScore,
    leadingChipHtml: userScore > 0 ? buildEventUserScoreChip(userScore) : "",
    watchlistButtonHtml: watchlistButton,
    ariaLabel: "Comment card UI sample",
  });
  const safeNote = escapeHtml(truncateQuote(comment.note || "", 180));
  const safeAuthor = escapeHtml(comment.author || "Utilisateur");
  const safeEvent = escapeHtml(event.title || "Événement");
  const safeDate = escapeHtml(getEventDateTimeLabel(event));
  const image = getEventImage(event);
  const safeHref = escapeHtml(eventUrlFor(event));
  const content = `
    ${cornerMeta}
    <div class="event-media">
      <img src="${image}" alt="${safeEvent}">
      <div class="event-media-overlay ui-comment-focus-overlay">
        <span class="tag">Comment card</span>
        <p class="ui-comment-focus-quote">"${safeNote}"</p>
        <div class="ui-comment-focus-meta">
          <span>${safeAuthor}</span>
          <span>·</span>
          <span>${safeDate}</span>
        </div>
      </div>
    </div>
  `;
  return buildFrameElement(content, {
    tag: "article",
    className: `event-card ${statusClass} ui-comment-focus-card`,
    attributes: `data-href="${safeHref}"`,
  });
}

function buildObjectTagsWidget(objectType, objectId, options = {}) {
  const safeType = String(objectType || "").trim();
  const safeObjectId = String(objectId || "").trim();
  if (!safeType || !safeObjectId) return "";
  const {
    className = "",
    compact = false,
  } = options;
  const safeTypeAttr = escapeHtml(safeType);
  const safeIdAttr = escapeHtml(safeObjectId);
  const extraClass = className ? ` ${className}` : "";
  const compactClass = compact ? " is-compact" : "";
  const entries = getObjectTagEntries(safeType, safeObjectId);
  const topEntries = entries.slice(0, 3);
  const topMarkup = topEntries.length
    ? topEntries
      .map((entry) => `
        <button
          class="object-tag-chip"
          type="button"
          data-object-tag-popover-toggle
          data-object-type="${safeTypeAttr}"
          data-object-id="${safeIdAttr}"
          title="${escapeHtml(entry.label)} (${formatObjectTagScore(entry.score)})"
        >${escapeHtml(entry.label)}</button>
      `)
      .join("")
    : `
      <button
        class="object-tag-chip"
        type="button"
        data-object-tag-popover-toggle
        data-object-type="${safeTypeAttr}"
        data-object-id="${safeIdAttr}"
      >Ajouter un tag</button>
    `;
  const rowsMarkup = entries.length
    ? entries.map((entry) => `
        <div class="object-tag-row">
          <span class="object-tag-row-label">${escapeHtml(entry.label)}</span>
          <span class="object-tag-row-score">${escapeHtml(formatObjectTagScore(entry.score))}</span>
          <div class="object-tag-row-actions">
            <button
              class="object-tag-vote-btn ${entry.currentUserVote === 1 ? "is-active" : ""}"
              type="button"
              data-tag-vote-action="1"
              data-object-type="${safeTypeAttr}"
              data-object-id="${safeIdAttr}"
              data-tag-id="${escapeHtml(entry.tagId)}"
              aria-label="Approuver le tag ${escapeHtml(entry.label)}"
            >+</button>
            <button
              class="object-tag-vote-btn ${entry.currentUserVote === -1 ? "is-active" : ""}"
              type="button"
              data-tag-vote-action="-1"
              data-object-type="${safeTypeAttr}"
              data-object-id="${safeIdAttr}"
              data-tag-id="${escapeHtml(entry.tagId)}"
              aria-label="Désapprouver le tag ${escapeHtml(entry.label)}"
            >-</button>
          </div>
        </div>
      `).join("")
    : '<p class="object-tags-empty">Aucun tag pour le moment.</p>';

  return `
    <div class="object-tags-widget${extraClass}${compactClass}" data-object-tags-widget data-object-type="${safeTypeAttr}" data-object-id="${safeIdAttr}">
      <div class="object-tags-top">
        ${topMarkup}
      </div>
      <div class="object-tags-popover" role="dialog" aria-label="Gérer les tags">
        <div class="object-tags-popover-head">
          <strong>Tags</strong>
          <span class="muted">${escapeHtml(formatNumber(entries.length))}</span>
        </div>
        <div class="object-tags-list">
          ${rowsMarkup}
        </div>
        <div class="object-tags-add">
          <input
            class="object-tags-input"
            type="text"
            maxlength="28"
            placeholder="Ajouter un tag"
            data-object-tag-input
          >
          <button
            class="object-tags-add-btn"
            type="button"
            data-object-tag-add
            data-object-type="${safeTypeAttr}"
            data-object-id="${safeIdAttr}"
          >Ajouter</button>
        </div>
      </div>
    </div>
  `;
}

function closeObjectTagPopovers(exceptWidget = null) {
  const widgets = document.querySelectorAll("[data-object-tags-widget].is-open");
  widgets.forEach((widget) => {
    if (exceptWidget && widget === exceptWidget) return;
    widget.classList.remove("is-open");
  });
}

function rerenderTagSurfaces() {
  renderEventCardCollections();
  renderCuratedLists();
  renderListDetail();
  renderLeagueDetail();
  renderLeaguePage();
  renderEventDetail();
  renderGlobalSearch();
  renderUISamples();
}

function buildPlayerCard(athlete, options = {}) {
  if (!athlete) return "";
  const {
    className = "",
  } = options;
  const athleteEvents = getAthleteEvents(athlete.id);
  const upcomingCount = athleteEvents.filter((event) => isUpcoming(event)).length;
  const completedCount = Math.max(0, athleteEvents.length - upcomingCount);
  const following = isFollowTargetFollowed("athlete", athlete.id);
  const safeName = escapeHtml(athlete.name || "Sportif");
  const safeTeam = escapeHtml(getAthleteTeamName(athlete) || "Équipe non renseignée");
  const safeCountry = athlete.country ? escapeHtml(athlete.country) : "";
  const safeRole = athlete.role ? escapeHtml(athlete.role) : "";
  const metaParts = [safeCountry, safeRole].filter(Boolean);
  const metaLine = metaParts.length ? `<p class="ui-player-card-meta">${metaParts.join(" · ")}</p>` : "";
  const athleteImage = typeof athlete.image === "string" ? athlete.image.trim() : "";
  const safeImage = athleteImage ? escapeHtml(athleteImage) : "";
  const safeHref = escapeHtml(athleteUrlFor(athlete));
  const extraClass = className ? ` ${className}` : "";
  const tagsWidget = buildObjectTagsWidget("athlete", athlete.id, {
    className: "object-tags-inline",
    compact: true,
  });
  const photoHtml = safeImage
    ? `<img class="ui-player-card-photo" src="${safeImage}" alt="${safeName}">`
    : `<div class="ui-player-card-photo is-empty" aria-hidden="true"></div>`;

  const content = `
    <div class="ui-card-margin-actions ui-player-card-top">
      ${buildFollowButton({
        targetType: "athlete",
        targetId: athlete.id,
        isFollowing: following,
        compact: true,
      })}
    </div>
    <div class="ui-player-card-photo-wrap ${safeImage ? "has-image" : "is-empty"}">
      ${photoHtml}
      <div class="ui-player-card-overlay">
        <h3 class="ui-player-card-name">${safeName}</h3>
        <p class="ui-player-card-team">${safeTeam}</p>
        ${metaLine}
      </div>
    </div>
    <div class="ui-player-card-stats">
      <span class="tag">Competitions effectuees: ${formatNumber(completedCount)}</span>
      <span class="tag ghost subtle">Competitions à venir: ${formatNumber(upcomingCount)}</span>
    </div>
    ${tagsWidget}
  `;
  return buildFrameElement(content, {
    tag: "article",
    className: `event-card ui-player-card${extraClass}`,
    attributes: `data-href="${safeHref}"`,
  });
}

function buildUserCard(user, options = {}) {
  if (!user) return "";
  const {
    className = "",
    stats = null,
  } = options;
  const isFollowing = Boolean(storedUserFollows[user.id]);
  const followers = getFollowersCount(user.id);
  const baseFollowing = Number(user.following) || 0;
  const followingCount = baseFollowing || Math.max(1, Math.round(followers * 0.45) + (user.id.charCodeAt(0) % 7));
  const critiques = reviewSamples.filter((review) => review.userId === user.id);
  const critiquesCount = critiques.length;
  const likesReceived = critiques.reduce((total, comment) => total + getCommentTotalLikes(comment), 0);
  const resolvedStats = {
    followers,
    following: followingCount,
    critiques: critiquesCount,
    likesReceived,
    ...(stats || {}),
  };
  const safeName = escapeHtml(user.name || "Utilisateur");
  const safeHandle = escapeHtml(user.handle || "@profil");
  const safeBadge = user.badge ? escapeHtml(user.badge) : "";
  const favoriteSports = Array.isArray(user.favoriteSports) ? user.favoriteSports.filter(Boolean) : [];
  const userImage = typeof user.image === "string" ? user.image.trim() : "";
  const safeImage = userImage ? escapeHtml(userImage) : "";
  const safeHref = escapeHtml(`profile.html?id=${user.id}`);
  const extraClass = className ? ` ${className}` : "";
  const photoHtml = safeImage
    ? `<img class="ui-player-card-photo" src="${safeImage}" alt="${safeName}">`
    : `<div class="ui-player-card-photo is-empty" aria-hidden="true"></div>`;
  const badgeLine = safeBadge ? `<p class="ui-user-card-badge">${safeBadge}</p>` : "";
  const followButton = buildFollowButton({
    userId: user.id,
    isFollowing,
    followers,
    compact: true,
    className: "ui-user-card-follow",
  });
  const favoriteSportsLine = favoriteSports.length
    ? `<p class="ui-user-card-badge">${favoriteSports.slice(0, 2).map((sport) => escapeHtml(sport)).join(" · ")}</p>`
    : badgeLine;

  const content = `
    <div class="ui-card-margin-actions ui-player-card-top">
      ${followButton}
    </div>
    <div class="ui-player-card-photo-wrap ${safeImage ? "has-image" : "is-empty"}">
      ${photoHtml}
      <div class="ui-player-card-overlay">
        <h3 class="ui-player-card-name">${safeName}</h3>
        <p class="ui-player-card-team">${safeHandle}</p>
        ${favoriteSportsLine}
      </div>
    </div>
    <div class="ui-player-card-stats">
      <span class="tag">Abonnes ${formatNumber(resolvedStats.followers)}</span>
      <span class="tag">Suivis ${formatNumber(resolvedStats.following)}</span>
      <span class="tag">Critiques ${formatNumber(resolvedStats.critiques)}</span>
      <span class="tag ghost subtle">Likes reçus ${formatNumber(resolvedStats.likesReceived)}</span>
    </div>
  `;
  return buildFrameElement(content, {
    tag: "article",
    className: `event-card ui-player-card ui-user-card${extraClass}`,
    attributes: `data-href="${safeHref}"`,
  });
}

function getTeamCardWatchlistCount(team, members = [], teamEvents = []) {
  if (!team) return 0;
  const completedCount = teamEvents.filter((event) => !isUpcoming(event)).length;
  const upcomingCount = Math.max(0, teamEvents.length - completedCount);
  const seed = String(team.id || team.name || "")
    .split("")
    .reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return 900 + (seed % 1400) + (members.length * 36) + (completedCount * 7) + (upcomingCount * 10)
    + (storedTeamFavorites[team.id] ? 1 : 0);
}

function getTeamCardImage(team) {
  if (!team || typeof team.image !== "string") return "";
  return team.image.trim();
}

function buildTeamCard(team, options = {}) {
  if (!team) return "";
  const {
    className = "",
  } = options;
  const members = getTeamMembers(team);
  const teamEvents = getTeamEvents(team.id);
  const upcomingCount = teamEvents.filter((event) => isUpcoming(event)).length;
  const completedCount = Math.max(0, teamEvents.length - upcomingCount);
  const following = isFollowTargetFollowed("team", team.id);
  const safeName = escapeHtml(team.name || "Équipe");
  const safeSport = escapeHtml(team.sport || "Sport non renseigné");
  const safeCity = escapeHtml(team.city || "Ville non renseignée");
  const teamImage = getTeamCardImage(team);
  const safeImage = teamImage ? escapeHtml(teamImage) : "";
  const safeHref = escapeHtml(teamUrlFor(team));
  const extraClass = className ? ` ${className}` : "";
  const tagsWidget = buildObjectTagsWidget("team", team.id, {
    className: "object-tags-inline",
    compact: true,
  });
  const membersStrip = members.length
    ? `<div class="ui-team-card-members">${members.slice(0, 6).map((athlete) => buildPlayerMiniatureElement(athlete)).join("")}</div>`
    : "";
  const photoHtml = safeImage
    ? `<img class="ui-team-card-photo" src="${safeImage}" alt="${safeName}">`
    : `<div class="ui-team-card-photo is-empty" aria-hidden="true"></div>`;

  const content = `
    <div class="ui-card-margin-actions ui-team-card-top">
      ${buildFollowButton({
        targetType: "team",
        targetId: team.id,
        isFollowing: following,
        compact: true,
      })}
    </div>
    <div class="ui-team-card-photo-wrap ${safeImage ? "has-image" : "is-empty"}">
      ${photoHtml}
      <div class="ui-team-card-overlay">
        <h3 class="ui-team-card-name">${safeName}</h3>
        <p class="ui-team-card-meta">${safeSport} · ${safeCity}</p>
        ${membersStrip}
      </div>
    </div>
    <div class="ui-team-card-stats">
      <span class="tag">Effectif: ${formatNumber(members.length)}</span>
      <span class="tag">Competitions effectuees: ${formatNumber(completedCount)}</span>
      <span class="tag ghost subtle">Competitions à venir: ${formatNumber(upcomingCount)}</span>
    </div>
    ${tagsWidget}
  `;
  return buildFrameElement(content, {
    tag: "article",
    className: `event-card ui-team-card${extraClass}`,
    attributes: `data-href="${safeHref}"`,
  });
}

function buildRankingCard(list, options = {}) {
  if (!list) return "";
  const {
    className = "",
    maxMiniatures = 6,
    showOwner = true,
    showFollowButton = false,
    owner: ownerOverride = null,
  } = options;

  const owner = ownerOverride || getUserById(list.ownerId);
  const liked = Boolean(storedListLikes[list.id]);
  const totalLikes = (list.likes || 0) + (liked ? 1 : 0);
  const listItems = getListItems(list);
  const totalItems = listItems.length || list.count || 0;
  const safeTitle = escapeHtml(list.title || "Classement");
  const safeDescription = escapeHtml(list.description || "Classement communautaire.");
  const extraClass = className ? ` ${className}` : "";
  // Kept for API compatibility; the preview is intentionally teaser-style: ... + last 3.
  void maxMiniatures;
  const orderedItems = listItems
    .slice()
    .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
  const previewRowsItems = orderedItems.length <= 3
    ? orderedItems.map((item) => ({ type: "item", item }))
    : [
      { type: "ellipsis" },
      ...orderedItems.slice(-3).map((item) => ({ type: "item", item })),
    ];
  const previewRows = previewRowsItems.map((entry) => {
    if (entry.type === "ellipsis") {
      return `<div class="ranking-card-row-ellipsis" aria-hidden="true">...</div>`;
    }
    const item = entry.item;
    const link = escapeHtml(getListItemLink(item));
    const orderLabel = Number(item.order) || 0;
    let rowLine = "";
    let rowThumb = `<span class="ranking-card-row-thumb is-generic">${escapeHtml(String(orderLabel))}</span>`;
    if (item.event) {
      const safeEventTitle = escapeHtml(item.event.title || "Événement");
      const safeDateTime = escapeHtml(getEventDateTimeLabel(item.event) || "Date non renseignée");
      const safeResult = escapeHtml(item.event.result || "Resultat à venir");
      rowLine = `${safeEventTitle} - ${safeDateTime} - ${safeResult}`;
      rowThumb = `<img class="ranking-card-row-thumb" src="${getEventImage(item.event)}" alt="${safeEventTitle}">`;
    } else if (item.athlete) {
      const safeAthleteName = escapeHtml(item.athlete.name || "Sportif");
      const safeTeamName = escapeHtml(getAthleteTeamName(item.athlete) || "Équipe non renseignée");
      rowLine = `${safeAthleteName} - ${safeTeamName}`;
      rowThumb = `<img class="ranking-card-row-thumb" src="${getAthleteImage(item.athlete)}" alt="${safeAthleteName}">`;
    } else {
      const safeLabel = escapeHtml(getListItemDisplayName(item) || `Element ${orderLabel}`);
      rowLine = safeLabel;
    }
    return `
      <a class="ranking-card-row-link" href="${link}">
        <span class="ranking-card-row-rank">#${orderLabel}</span>
        ${rowThumb}
        <span class="ranking-card-row-line">${rowLine}</span>
      </a>
    `;
  }).join("");
  const ownerIdentity = showOwner
    ? buildUserIdentityElement(owner || { name: "Créateur" }, {
      size: "compact",
      link: Boolean(owner?.id),
      showFollow: true,
    })
    : "";
  const hasRows = previewRows.length > 0;
  const rankingSport = escapeHtml(list.sport || "Multi-sport");
  const tagsWidget = buildObjectTagsWidget("list", list.id, {
    className: "object-tags-inline",
  });
  const rankingLikeButton = buildCommentLikeButton({
    type: "ranking",
    targetType: "list",
    targetId: list.id,
    liked,
    totalLikes,
    listId: list.id,
    className: "list-like-button ranking-card-like-fab",
  });

  return buildFrameElement(`
    <div class="ranking-card-head-outside">
      <div class="ranking-card-head-top">
        ${buildEventSportChip(rankingSport, { className: "ranking-card-sport-chip" })}
        ${rankingLikeButton}
      </div>
      <div class="ranking-card-head-text">
        <h3 class="ranking-card-title"><a class="user-link" href="list.html?id=${list.id}">${safeTitle}</a></h3>
        <p class="muted ranking-card-description">${safeDescription}</p>
      </div>
      <div class="ranking-card-head-owner">
        ${ownerIdentity}
      </div>
      ${tagsWidget}
    </div>
    <div class="ranking-card-preview-frame">
      <div class="ranking-card-position-list">
        ${hasRows
          ? previewRows
          : '<p class="muted ranking-card-position-empty">Aucun element dans ce classement.</p>'}
      </div>
    </div>
  `, {
    tag: "article",
    className: `list-card ranking-card${extraClass}`,
    attributes: `data-href="list.html?id=${list.id}"`,
  });
}

function getLeagueDateRangeLabel(league) {
  if (!league) return "Dates non renseignées";
  const dateWindow = getLeagueDateWindow(league.id);
  const startLabel = dateWindow.start ? formatFrenchDateLabel(dateWindow.start, { day: "2-digit", month: "short", year: "numeric" }) : "";
  const endLabel = dateWindow.end ? formatFrenchDateLabel(dateWindow.end, { day: "2-digit", month: "short", year: "numeric" }) : "";
  if (startLabel && endLabel) {
    return startLabel === endLabel ? startLabel : `${startLabel} - ${endLabel}`;
  }
  if (endLabel) return endLabel;
  return startLabel || "Dates non renseignées";
}

function getLeagueRootDateRangeLabel(league) {
  if (!league) return "Dates non renseignées";
  const dateWindow = getLeagueRootDateWindow(league.id);
  const startLabel = dateWindow.start ? formatFrenchDateLabel(dateWindow.start, { day: "2-digit", month: "short", year: "numeric" }) : "";
  const endLabel = dateWindow.end ? formatFrenchDateLabel(dateWindow.end, { day: "2-digit", month: "short", year: "numeric" }) : "";
  if (startLabel && endLabel) {
    return startLabel === endLabel ? startLabel : `${startLabel} - ${endLabel}`;
  }
  if (endLabel) return endLabel;
  return startLabel || "Dates non renseignées";
}

function getLeagueCardImage(league) {
  if (!league || typeof league.image !== "string") return "";
  return league.image.trim();
}

function getLeagueCardWatchlistCount(league, options = {}) {
  if (!league) return 0;
  const {
    variant = "season",
    matchCount = 0,
    seasonCount = 0,
    reviews = 0,
  } = options;
  const seed = String(league.id || league.title || "")
    .split("")
    .reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  if (variant === "generic") {
    return 1200 + (seed % 2000) + (matchCount * 8) + (seasonCount * 65) + Math.round(reviews / 30);
  }
  return 850 + (seed % 1500) + (matchCount * 12) + Math.round(reviews / 18);
}

function buildLeagueCard(league, options = {}) {
  if (!league) return "";
  const {
    className = "",
    maxRows = 6,
    variant = "auto",
  } = options;

  const isGenericVariant = variant === "generic"
    || (variant === "auto" && (league.nature === "League" || Array.isArray(league.seasonIds)));
  const sportLabel = String(league.sport || "Multi-sport");
  const safeSportLabel = escapeHtml(sportLabel);
  const safeImage = escapeHtml(getLeagueCardImage(league) || "images/events/samplegeneric.jpeg");
  const extraClass = className ? ` ${className}` : "";
  const cardClass = `event-card ui-team-card ui-league-card ${isGenericVariant ? "ui-league-card-generic" : "ui-league-card-season"}${extraClass}`;
  const tagsWidget = buildObjectTagsWidget("league", league.id, {
    className: "object-tags-inline",
  });

  if (isGenericVariant) {
    const seasons = getLeagueSeasonsByLeagueId(league.id, { sort: "desc" });
    const rowsLimit = Math.max(1, Number(maxRows) || 6);
    const previewSeasons = seasons.slice(0, rowsLimit);
    const overflowCount = Math.max(0, seasons.length - previewSeasons.length);
    const seasonCount = Number(league.seasonCount || seasons.length || 0);
    const matchCount = Number(league.count || 0);
    const reviews = Number(league.reviews || 0);
    const communityScore = clampSofaScore(toSofaScore(league.communityScore || 0));
    const dateRange = getLeagueRootDateRangeLabel(league);
    const safeName = escapeHtml(league.title || "Compétition");
    const safeMeta = escapeHtml(`${sportLabel} · ${seasonCount > 1 ? `${seasonCount} saisons` : `${seasonCount} saison`}`);
    const safeDateRange = escapeHtml(dateRange);
    const safeHref = escapeHtml(leagueUrlFor(league));
    const following = isFollowTargetFollowed("league", league.id);
    const seasonStrip = previewSeasons.length
      ? `<div class="ui-team-card-members ui-league-card-seasons">
          ${previewSeasons.map((season) => `<span class="tag ghost subtle">${escapeHtml(String(season.year || season.seasonKey || season.title || ""))}</span>`).join("")}
          ${overflowCount > 0 ? `<span class="tag ghost subtle">+${overflowCount}</span>` : ""}
        </div>`
      : "";

    const content = `
      <div class="ui-card-margin-actions ui-team-card-top">
        ${buildFollowButton({
          targetType: "league",
          targetId: league.id,
          isFollowing: following,
          compact: true,
        })}
      </div>
      <div class="ui-team-card-photo-wrap has-image">
        <img class="ui-team-card-photo" src="${safeImage}" alt="${safeName}">
        <div class="ui-team-card-overlay">
          <h3 class="ui-team-card-name">${safeName}</h3>
          <p class="ui-team-card-meta">${safeMeta}</p>
          <p class="ui-team-card-meta">${safeDateRange}</p>
          ${seasonStrip}
        </div>
      </div>
      <div class="ui-team-card-stats">
        <span class="tag">Saisons: ${formatNumber(seasonCount)}</span>
        <span class="tag">Matchs: ${formatNumber(matchCount)}</span>
        <span class="tag">Communauté: ${formatNumber(communityScore)}%</span>
        <span class="tag ghost subtle">Avis: ${formatNumber(reviews)}</span>
      </div>
      ${tagsWidget}
    `;

    return buildFrameElement(content, {
      tag: "article",
      className: cardClass,
      attributes: `data-href="${safeHref}"`,
    });
  }

  const leagueRoot = getLeagueRootById(league.leagueId);
  const matches = getLeagueMatches(league.id, { sort: "asc" });
  const rowsLimit = Math.max(1, Number(maxRows) || 6);
  const previewMatches = matches.slice(0, rowsLimit);
  const overflowCount = Math.max(0, matches.length - previewMatches.length);
  const upcomingCount = matches.filter((event) => isUpcoming(event)).length;
  const completedCount = Math.max(0, matches.length - upcomingCount);
  const matchCount = matches.length;
  const reviews = Number(league.reviews || 0);
  const communityScore = clampSofaScore(toSofaScore(league.communityScore || 0));
  const dateRange = getLeagueDateRangeLabel(league);
  const safeName = escapeHtml(league.title || "Compétition");
  const safeMeta = leagueRoot
    ? `${safeSportLabel} · ${escapeHtml(leagueRoot.title || "Compétition")}`
    : safeSportLabel;
  const safeDateRange = escapeHtml(dateRange);
  const safeHref = escapeHtml(leagueSeasonUrlFor(league));
  const following = isFollowTargetFollowed("league-season", league.id);
  const matchStrip = previewMatches.length
    ? `<div class="ui-team-card-members ui-league-card-matches">
        ${previewMatches.map((match) => `<span class="tag ghost subtle">${escapeHtml(match.title || "Match")}</span>`).join("")}
        ${overflowCount > 0 ? `<span class="tag ghost subtle">+${overflowCount}</span>` : ""}
      </div>`
    : "";

  const content = `
    <div class="ui-card-margin-actions ui-team-card-top">
      ${buildFollowButton({
        targetType: "league-season",
        targetId: league.id,
        isFollowing: following,
        compact: true,
      })}
    </div>
    <div class="ui-team-card-photo-wrap has-image">
      <img class="ui-team-card-photo" src="${safeImage}" alt="${safeName}">
      <div class="ui-team-card-overlay">
        <h3 class="ui-team-card-name">${safeName}</h3>
        <p class="ui-team-card-meta">${safeMeta}</p>
        <p class="ui-team-card-meta">${safeDateRange}</p>
        ${matchStrip}
      </div>
    </div>
    <div class="ui-team-card-stats">
      <span class="tag">Matchs effectués: ${formatNumber(completedCount)}</span>
      <span class="tag">Matchs à venir: ${formatNumber(upcomingCount)}</span>
      <span class="tag">Communauté: ${formatNumber(communityScore)}%</span>
      <span class="tag ghost subtle">Avis: ${formatNumber(reviews)}</span>
    </div>
    ${tagsWidget}
  `;

  return buildFrameElement(content, {
    tag: "article",
    className: cardClass,
    attributes: `data-href="${safeHref}"`,
  });
}

function buildUISampleWithCode(componentHtml, componentName) {
  const sourceHtml = String(componentHtml || "").trim();
  const rootTagMatch = sourceHtml.match(/^<([a-z0-9-]+)([^>]*)>/i);
  let renderHint = "";
  if (rootTagMatch) {
    const rootTag = (rootTagMatch[1] || "div").toLowerCase();
    const attrs = rootTagMatch[2] || "";
    const classMatch = attrs.match(/\sclass="([^"]+)"/i);
    if (classMatch) {
      const classList = classMatch[1]
        .split(/\s+/)
        .filter(Boolean);
      const classPreview = classList
        .slice(0, 6)
        .map((entry) => `.${entry}`)
        .join(" ");
      const truncatedHint = classList.length > 6 ? " ..." : "";
      renderHint = `\nrender: <${rootTag}> ${classPreview}${truncatedHint}`;
    } else {
      renderHint = `\nrender: <${rootTag}>`;
    }
  }
  const safeName = `${String(componentName || "")}${renderHint}`
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
  return `
    <div class="ui-sample-component">
      ${componentHtml}
      <pre class="ui-component-code"><code>${safeName}</code></pre>
    </div>
  `;
}

function buildTagTextboxElement(value = "", options = {}) {
  const {
    secondary = false,
    placeholder = "",
    asInput = true,
    className = "",
  } = options;
  const safeValue = escapeHtml(String(value || ""));
  const safePlaceholder = escapeHtml(String(placeholder || ""));
  const extraClass = `${secondary ? " is-secondary" : ""}${className ? ` ${className}` : ""}`;
  if (!asInput) {
    return `<span class="tag-textbox${extraClass}">${safeValue || safePlaceholder}</span>`;
  }
  return `<input class="tag-textbox${extraClass}" type="text" value="${safeValue}" placeholder="${safePlaceholder}" aria-label="${secondary ? "Text box secondaire" : "Text box principal"}">`;
}

function normalizeTeamLookupKey(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\b(fc|cf|ac|as|sc|club)\b/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function getTeamMiniName(team) {
  if (!team) return "";
  return String(team.nameMini || team.name || team.nameFull || "").trim();
}

function getTeamNameCandidates(team) {
  if (!team) return [];
  const candidates = [team.name, team.nameFull, team.nameMini]
    .map((item) => String(item || "").trim())
    .filter(Boolean);
  return Array.from(new Set(candidates));
}

function findTeamByName(teamName) {
  const targetSlug = slugify(teamName || "");
  const targetNormalized = normalizeTeamLookupKey(teamName || "");
  if (!targetSlug && !targetNormalized) return null;

  const exactBySlug = teams.find((team) =>
    getTeamNameCandidates(team).some((candidate) => slugify(candidate) === targetSlug)
  );
  if (exactBySlug) return exactBySlug;

  const exactByNormalized = teams.find((team) =>
    getTeamNameCandidates(team).some((candidate) => normalizeTeamLookupKey(candidate) === targetNormalized)
  );
  if (exactByNormalized) return exactByNormalized;

  return teams.find((team) => {
    const candidates = getTeamNameCandidates(team).map((candidate) => normalizeTeamLookupKey(candidate));
    return candidates.some((candidate) =>
      candidate && targetNormalized && (candidate.includes(targetNormalized) || targetNormalized.includes(candidate))
    );
  }) || null;
}

function buildEventTitleWithInlineTeamLinks(event) {
  if (!event) return "";
  const teamsForEvent = getTeamsForEvent(event.id).slice(0, 2);
  if (teamsForEvent.length >= 2) {
    return teamsForEvent
      .map((team) => `<a class="user-link ui-event-description-link" href="${teamUrlFor(team)}">${escapeHtml(getTeamMiniName(team))}</a>`)
      .join(' <span class="ui-event-description-sep">vs</span> ');
  }

  const rawTitle = String(event.title || "Événement");
  const titleMatch = rawTitle.match(/^(.+?)\s+vs\.?\s+(.+)$/i);
  if (!titleMatch) return escapeHtml(rawTitle);

  const leftName = titleMatch[1].trim();
  const rightName = titleMatch[2].trim();
  const leftTeam = findTeamByName(leftName);
  const rightTeam = findTeamByName(rightName);
  const leftHtml = leftTeam
    ? `<a class="user-link ui-event-description-link" href="${teamUrlFor(leftTeam)}">${escapeHtml(getTeamMiniName(leftTeam))}</a>`
    : escapeHtml(leftName);
  const rightHtml = rightTeam
    ? `<a class="user-link ui-event-description-link" href="${teamUrlFor(rightTeam)}">${escapeHtml(getTeamMiniName(rightTeam))}</a>`
    : escapeHtml(rightName);
  return `${leftHtml} <span class="ui-event-description-sep">vs</span> ${rightHtml}`;
}

function getEventLeagueLabelWithYear(event) {
  if (!event) return "";
  if (event.leagueTitle) return String(event.leagueTitle);
  const leagueName = String(event.league || "").trim();
  const year = getEventYear(event);
  if (!leagueName) return year ? `Saison ${year}` : "Competition";
  if (/(19|20)\d{2}/.test(leagueName) || !year) return leagueName;
  return `${leagueName} ${year}`;
}

function buildEventLeagueWithLink(event) {
  if (!event) return "";
  const label = getEventLeagueLabelWithYear(event);
  const season = getLeagueSeasonById(event.leagueSeasonId || event.leagueId);
  if (season) {
    return `<a class="user-link ui-event-description-link" href="${leagueSeasonUrlFor(season)}">${escapeHtml(label)}</a>`;
  }
  const league = getLeagueRootById(event.leagueId);
  if (!league) return escapeHtml(label);
  return `<a class="user-link ui-event-description-link" href="${leagueUrlFor(league)}">${escapeHtml(label)}</a>`;
}

function buildEventDescriptionBlock(event) {
  if (!event) return "";
  const titleMarkup = buildEventTitleWithInlineTeamLinks(event);
  const resultMarkup = event.result
    ? ` <span class="ui-event-description-result">- ${escapeHtml(event.result)}</span>`
    : "";
  const leagueMarkup = buildEventLeagueWithLink(event);
  const dateLabel = getEventDateLabel(event, { day: "2-digit", month: "long", year: "numeric" }) || escapeHtml(event.date || "");
  const timeLabel = getEventTimeLabel(event);
  const dateTimeLabel = [dateLabel, timeLabel].filter(Boolean).join(" · ");
  return `
    <div class="ui-event-description">
      <p class="ui-event-description-line ui-event-description-line-name">${titleMarkup}${resultMarkup}</p>
      <p class="ui-event-description-line">${leagueMarkup}</p>
      <p class="ui-event-description-line ui-event-description-line-meta">${escapeHtml(dateTimeLabel || "Non renseigne")}</p>
    </div>
  `;
}

function buildSportFilterComponent(options = {}) {
  const {
    sports: sportList = ["Aucun", "Tous", "Football", "Cyclisme", "Tennis"],
    activeSport = "Tous",
    interactive = false,
    className = "",
  } = options;
  const list = Array.isArray(sportList) && sportList.length ? sportList : ["Tous"];
  const extraClass = className ? ` ${className}` : "";
  const safeActiveSport = escapeHtml(String(activeSport || ""));
  const interactiveAttr = interactive ? ` data-ui-sport-filter="true" data-active-sport="${safeActiveSport}"` : "";
  const buttons = list
    .map((sport) => {
      const label = escapeHtml(String(sport || ""));
      const isActive = String(sport || "") === String(activeSport || "");
      return `<button class="filter-btn ${isActive ? "is-active" : ""}" type="button" data-sport="${label}">${label}</button>`;
    })
    .join("");
  return `<div class="filters ui-sport-filter${extraClass}" role="group" aria-label="Filtre sport"${interactiveAttr}>${buttons}</div>`;
}

function buildUserIdentityElement(user, options = {}) {
  const {
    size = "default",
    link = false,
    showName = true,
    showFollow = true,
    className = "",
  } = options;
  const rawName = user?.name || "Utilisateur";
  const safeName = escapeHtml(rawName);
  const sizeClass = size === "compact" ? "compact" : "";
  const extraClass = className ? ` ${className}` : "";
  const withNameClass = showName ? " with-name" : "";
  const wrapperTag = link && user?.id ? "a" : "div";
  const hrefAttr = link && user?.id ? ` href="profile.html?id=${user.id}"` : "";
  const ariaAttr = link && user?.id ? ` aria-label="Voir ${safeName}"` : "";
  const titleAttr = ` title="${safeName}"`;
  const image = getUserProfileImage(user);
  const avatar = image
    ? `<img src="${image}" alt="${safeName}">`
    : `<span class="participant-fallback">${escapeHtml(getInitials(rawName))}</span>`;
  const nameHtml = showName ? `<span class="user-identity-name player-miniature-name">${safeName}</span>` : "";
  const showFollowControl = Boolean(showFollow && showName && user?.id);
  const followControl = showFollowControl
    ? buildFollowButton({
      userId: user.id,
      isFollowing: Boolean(storedUserFollows[user.id]),
      followers: getFollowersCount(user.id),
      className: "user-identity-follow",
      compact: size === "compact",
    })
    : "";
  const rowSizeClass = size === "compact" ? " is-compact" : "";
  return `
    <span class="user-identity-row${rowSizeClass}">
      <${wrapperTag} class="user-identity player-miniature${withNameClass} ${sizeClass}${extraClass}"${hrefAttr}${ariaAttr}${titleAttr}>
        <span class="user-identity-avatar player-miniature-avatar">${avatar}</span>
        ${nameHtml}
      </${wrapperTag}>
      ${followControl}
    </span>
  `;
}

function buildEventSportChip(sport, options = {}) {
  const {
    className = "",
    title = "",
  } = options;
  const rawSport = String(sport || "Sport");
  const safeSport = escapeHtml(rawSport);
  const safeTitle = escapeHtml(title || rawSport);
  const extraClass = className ? ` ${className}` : "";
  return `<span class="event-corner-chip event-corner-chip-sport${extraClass}" title="${safeTitle}">${safeSport}</span>`;
}

function buildEventUserScoreChip(score, options = {}) {
  const {
    className = "",
    title = "Mon score",
  } = options;
  const safeScore = clampSofaScore(Number(score) || 0);
  const safeTitle = escapeHtml(title);
  const extraClass = className ? ` ${className}` : "";
  return `<span class="event-corner-chip event-corner-chip-user${extraClass}" title="${safeTitle}">${safeScore}</span>`;
}

function buildEventUserScoreToggleButton(score, options = {}) {
  const {
    eventId = "",
    className = "",
    title = "Afficher la jauge",
  } = options;
  const safeScore = clampSofaScore(Number(score) || 0);
  const safeTitle = escapeHtml(title);
  const safeEventId = escapeHtml(String(eventId || ""));
  const eventIdAttr = safeEventId ? ` data-event-id="${safeEventId}"` : "";
  const extraClass = className ? ` ${className}` : "";
  return `<button class="event-user-score-toggle-btn event-corner-chip event-corner-chip-user${extraClass}" type="button"${eventIdAttr} aria-label="${safeTitle}" title="${safeTitle}">${safeScore}</button>`;
}

function buildEventRateChipButton(options = {}) {
  const {
    eventId = "",
    href = "",
    className = "",
    label = "Noter",
  } = options;
  const safeLabel = escapeHtml(label);
  const safeEventId = escapeHtml(String(eventId || ""));
  const safeHref = escapeHtml(String(href || ""));
  const eventIdAttr = safeEventId ? ` data-event-id="${safeEventId}"` : "";
  const hrefAttr = safeHref ? ` data-href="${safeHref}"` : "";
  const extraClass = className ? ` ${className}` : "";
  return `<button class="event-rate-btn event-corner-chip event-corner-chip-user${extraClass}" type="button"${eventIdAttr}${hrefAttr} aria-label="${safeLabel}" title="${safeLabel}">${safeLabel}</button>`;
}

function buildEventCommunityScoreChip(score, options = {}) {
  const {
    className = "",
    title = "Score communauté",
  } = options;
  const safeScore = clampSofaScore(Number(score) || 0);
  const safeTitle = escapeHtml(title);
  const extraClass = className ? ` ${className}` : "";
  return `<span class="event-corner-chip event-corner-chip-community${extraClass}" title="${safeTitle}">${safeScore}</span>`;
}

function buildAddWatchlistFabButton(options = {}) {
  const {
    eventId = "",
    isSaved = false,
    watchlistCount = 0,
    className = "",
    buttonClassName = "",
    countClassName = "",
    dataAttrName = "event-id",
    dataAttrValue = "",
    activeLabel = "Retirer de la watchlist",
    inactiveLabel = "Ajouter à la watchlist",
    activeSymbol = "✓",
    inactiveSymbol = "+",
  } = options;
  const safeDataAttrName = escapeHtml(String(dataAttrName || "event-id"));
  const rawDataValue = dataAttrValue || eventId;
  const safeDataValue = escapeHtml(String(rawDataValue || ""));
  const safeCount = formatNumber(Number(watchlistCount) || 0);
  const actionLabel = isSaved ? activeLabel : inactiveLabel;
  const label = `${actionLabel} (${safeCount})`;
  const dataAttr = safeDataValue ? ` data-${safeDataAttrName}="${safeDataValue}"` : "";
  const extraClass = className ? ` ${className}` : "";
  const buttonExtraClass = buttonClassName ? ` ${buttonClassName}` : "";
  const countExtraClass = countClassName ? ` ${countClassName}` : "";
  return `
    <span class="watchlist-btn-fab-wrap${extraClass}">
      <button
        class="watchlist-btn watchlist-btn-fab${buttonExtraClass}"
        type="button"${dataAttr}
        aria-label="${label}"
        title="${label}"
      >${isSaved ? activeSymbol : inactiveSymbol}</button>
      <span class="watchlist-btn-fab-count${countExtraClass}">${safeCount}</span>
    </span>
  `;
}

function buildFollowButton(options = {}) {
  const {
    targetType = "user",
    targetId = "",
    userId = "",
    isFollowing = false,
    compact = false,
    className = "",
  } = options;
  const safeTargetType = normalizeFollowTargetType(targetType || (userId ? "user" : ""));
  const safeTargetIdRaw = String(targetId || userId || "").trim();
  if (!safeTargetType || !safeTargetIdRaw) return "";
  const safeTargetId = escapeHtml(safeTargetIdRaw);
  const targetAttr = ` data-follow-target-type="${escapeHtml(safeTargetType)}" data-follow-target-id="${safeTargetId}"`;
  const legacyUserAttr = safeTargetType === "user" ? ` data-user-id="${safeTargetId}"` : "";
  const buttonLabel = isFollowing ? "✓" : "+";
  const targetLabel = safeTargetType === "athlete"
    ? "cet athlète"
    : safeTargetType === "team"
      ? "cette équipe"
      : safeTargetType === "league"
        ? "cette compétition"
        : safeTargetType === "league-season"
          ? "cette saison"
          : "cet utilisateur";
  const actionLabel = isFollowing ? `Ne plus suivre ${targetLabel}` : `Suivre ${targetLabel}`;
  const extraClass = className ? ` ${className}` : "";
  const compactClass = compact ? " is-compact" : "";
  return `
    <span class="follow-btn-fab-wrap${compactClass}${extraClass}">
      <button
        class="follow-button follow-btn-fab ${isFollowing ? "is-following" : ""}"
        type="button"
        ${targetAttr}${legacyUserAttr}
        aria-label="${actionLabel}"
        title="${actionLabel}"
      >${buttonLabel}</button>
    </span>
  `;
}

function buildWatchlistModeSwitch(activeMode = "list", options = {}) {
  const {
    className = "",
    withIds = false,
  } = options;
  const isCalendarActive = activeMode === "calendar";
  const extraClass = className ? ` ${className}` : "";
  const calendarIdAttr = withIds ? ` id="calendar-mode-watchlist"` : "";
  const listIdAttr = withIds ? ` id="calendar-mode-list"` : "";
  return `
    <div class="calendar-mode-switch${extraClass}" role="group" aria-label="Mode d'affichage watchlist">
      <button${calendarIdAttr} class="calendar-mode-btn ${isCalendarActive ? "is-active" : ""}" type="button">Calendrier</button>
      <button${listIdAttr} class="calendar-mode-btn ${isCalendarActive ? "" : "is-active"}" type="button">Liste</button>
    </div>
  `;
}

function buildWatchlistPeriodSelectorsComponent(options = {}) {
  const {
    date = new Date(),
    totalEvents = 0,
    className = "",
  } = options;
  const parsed = date instanceof Date ? new Date(date.getTime()) : parseEventDate(date);
  const baseDate = parsed && !Number.isNaN(parsed.getTime()) ? parsed : new Date();
  const monthLabel = formatFrenchDateLabel(baseDate, { day: false, month: "long", year: false }) || "--";
  const yearLabel = String(baseDate.getFullYear());
  const safeTotal = formatNumber(Number(totalEvents) || 0);
  const eventWord = Number(totalEvents) > 1 ? "événements" : "événement";
  const extraClass = className ? ` ${className}` : "";
  return `
    <div class="calendar-period-controls${extraClass}" aria-label="Sélection du mois et de l'année">
      <div class="calendar-tag-selector" role="group" aria-label="Sélection du mois">
        <button type="button" class="calendar-tag-arrow" aria-label="Mois précédent">&lsaquo;</button>
        <span class="calendar-tag-value">${escapeHtml(monthLabel)}</span>
        <button type="button" class="calendar-tag-arrow" aria-label="Mois suivant">&rsaquo;</button>
      </div>
      <div class="calendar-tag-selector" role="group" aria-label="Sélection de l'année">
        <button type="button" class="calendar-tag-arrow" aria-label="Année précédente">&lsaquo;</button>
        <span class="calendar-tag-value">${escapeHtml(yearLabel)}</span>
        <button type="button" class="calendar-tag-arrow" aria-label="Année suivante">&rsaquo;</button>
      </div>
      <p class="calendar-period-summary">${safeTotal} ${eventWord}</p>
    </div>
  `;
}

function buildWatchlistPeriodRangeFilterComponent(options = {}) {
  const {
    fromDate = new Date(),
    toDate = new Date(),
    interactive = false,
    fromLabel = "De",
    toLabel = "a",
    className = "",
  } = options;
  const parseBound = (value) => {
    const parsed = value instanceof Date ? new Date(value.getTime()) : parseEventDate(value);
    return parsed && !Number.isNaN(parsed.getTime()) ? parsed : new Date();
  };
  const from = parseBound(fromDate);
  const to = parseBound(toDate);
  const formatMonth = (dateValue) => formatFrenchDateLabel(dateValue, { day: false, month: "long", year: false }) || "--";
  const extraClass = className ? ` ${className}` : "";
  const rootInteractiveAttr = interactive ? ` data-tierlist-period-filter="true"` : "";
  const arrowAttrs = (bound, unit, step) => interactive
    ? ` data-tierlist-period-bound="${bound}" data-tierlist-period-unit="${unit}" data-tierlist-period-action="${step}"`
    : "";
  const safeFromLabel = escapeHtml(fromLabel);
  const safeToLabel = escapeHtml(toLabel);
  return `
    <div class="calendar-period-controls watchlist-period-range-filter${extraClass}" aria-label="Filtrer par période"${rootInteractiveAttr}>
      <div class="watchlist-period-bound" role="group" aria-label="Période de début">
        <span class="watchlist-period-bound-label">${safeFromLabel}</span>
        <div class="calendar-tag-selector" role="group" aria-label="Mois de début">
          <button type="button" class="calendar-tag-arrow" aria-label="Mois précédent"${arrowAttrs("from", "month", -1)}>&lsaquo;</button>
          <span class="calendar-tag-value">${escapeHtml(formatMonth(from))}</span>
          <button type="button" class="calendar-tag-arrow" aria-label="Mois suivant"${arrowAttrs("from", "month", 1)}>&rsaquo;</button>
        </div>
        <div class="calendar-tag-selector" role="group" aria-label="Année de début">
          <button type="button" class="calendar-tag-arrow" aria-label="Année précédente"${arrowAttrs("from", "year", -1)}>&lsaquo;</button>
          <span class="calendar-tag-value">${escapeHtml(String(from.getFullYear()))}</span>
          <button type="button" class="calendar-tag-arrow" aria-label="Année suivante"${arrowAttrs("from", "year", 1)}>&rsaquo;</button>
        </div>
      </div>
      <div class="watchlist-period-bound" role="group" aria-label="Période de fin">
        <span class="watchlist-period-bound-label">${safeToLabel}</span>
        <div class="calendar-tag-selector" role="group" aria-label="Mois de fin">
          <button type="button" class="calendar-tag-arrow" aria-label="Mois précédent"${arrowAttrs("to", "month", -1)}>&lsaquo;</button>
          <span class="calendar-tag-value">${escapeHtml(formatMonth(to))}</span>
          <button type="button" class="calendar-tag-arrow" aria-label="Mois suivant"${arrowAttrs("to", "month", 1)}>&rsaquo;</button>
        </div>
        <div class="calendar-tag-selector" role="group" aria-label="Année de fin">
          <button type="button" class="calendar-tag-arrow" aria-label="Année précédente"${arrowAttrs("to", "year", -1)}>&lsaquo;</button>
          <span class="calendar-tag-value">${escapeHtml(String(to.getFullYear()))}</span>
          <button type="button" class="calendar-tag-arrow" aria-label="Année suivante"${arrowAttrs("to", "year", 1)}>&rsaquo;</button>
        </div>
      </div>
    </div>
  `;
}

function buildEventCornerMeta(options = {}) {
  const {
    sport = "",
    isFuture = false,
    communityScore = 0,
    leadingChipHtml = "",
    watchlistButtonHtml = "",
    ariaLabel = "",
    className = "",
  } = options;
  const extraClass = className ? ` ${className}` : "";
  const safeAria = ariaLabel ? ` aria-label="${escapeHtml(ariaLabel)}"` : "";
  const chipsHtml = isFuture
    ? `${buildEventSportChip(sport)}`
    : `${buildEventSportChip(sport)}${buildEventCommunityScoreChip(communityScore)}`;
  return `
    <div class="event-corner-meta${extraClass}"${safeAria}>
      ${leadingChipHtml ? `<span class="event-corner-leading">${leadingChipHtml}</span>` : ""}
      <span class="event-corner-trailing">
        ${chipsHtml}
        ${watchlistButtonHtml}
      </span>
    </div>
  `;
}

function buildHeaderCommentaireElement(user, score, options = {}) {
  const {
    size = "default",
    showScore = true,
    showFollowButton = true,
    eventLabel = "",
    eventLeague = "",
    link = false,
    className = "",
  } = options;
  const safeScore = clampSofaScore(Number(score) || 0);
  const sizeClass = size === "compact" ? "compact" : "";
  const extraClass = className ? ` ${className}` : "";
  const safeEventLabel = escapeHtml(eventLabel || "");
  const safeEventLeague = escapeHtml(eventLeague || "");
  const scoreHtml = showScore
    ? buildEventUserScoreChip(safeScore, { className: "headercommentaire-score" })
    : "";
  return `
    <div class="headercommentaire ${sizeClass}${extraClass}">
      ${safeEventLabel ? `
        <span class="headercommentaire-eventname">
          <span class="headercommentaire-eventname-title">${safeEventLabel}</span>
          ${safeEventLeague ? `<span class="headercommentaire-eventname-league">${safeEventLeague}</span>` : ""}
        </span>
      ` : ""}
      <div class="headercommentaire-main">
        ${scoreHtml}
        ${buildUserIdentityElement(user, { size, link, showFollow: showFollowButton, className: "headercommentaire-identity" })}
      </div>
    </div>
  `;
}

function formatCommentRelativeDate(dateInput, now = new Date()) {
  const parsed = dateInput instanceof Date ? new Date(dateInput.getTime()) : parseEventDate(dateInput);
  if (!parsed || Number.isNaN(parsed.getTime())) return "";
  const sameDay = parsed.getFullYear() === now.getFullYear()
    && parsed.getMonth() === now.getMonth()
    && parsed.getDate() === now.getDate();
  if (sameDay) {
    const hourMs = 1000 * 60 * 60;
    const diffMs = parsed.getTime() - now.getTime();
    if (diffMs > 0) {
      const hours = Math.max(1, Math.ceil(diffMs / hourMs));
      return `dans ${hours} ${hours > 1 ? "heures" : "heure"}`;
    }
    const elapsedMs = Math.max(0, now.getTime() - parsed.getTime());
    const hours = Math.max(1, Math.floor(elapsedMs / hourMs));
    return `il y'a ${hours} ${hours > 1 ? "heures" : "heure"}`;
  }
  const longLabel = formatFrenchDateLabel(parsed, { day: "2-digit", month: "long", year: "numeric" });
  return longLabel ? `le ${longLabel}` : "";
}

function buildRelativeDateElement(dateInput, options = {}) {
  const {
    size = "default",
    now = new Date(),
    className = "",
  } = options;
  const label = formatCommentRelativeDate(dateInput, now) || "le -- mois ----";
  const sizeClass = size === "compact" ? "compact" : "small";
  const extraClass = className ? ` ${className}` : "";
  return `<span class="relative-date-element ${sizeClass}${extraClass}">${label}</span>`;
}

const uiColorTokens = [
  { variable: "--bg", label: "Background", fallback: "#ffffff" },
  { variable: "--bg-soft", label: "Background Soft", fallback: "#fff4e6" },
  { variable: "--text", label: "Texte principal", fallback: "#191c1f" },
  { variable: "--muted", label: "Texte secondaire", fallback: "#5a606b" },
  { variable: "--accent", label: "Accent", fallback: "#ff3131" },
  { variable: "--accent-strong", label: "Accent Strong", fallback: "#d72626" },
  { variable: "--sofa-red", label: "Sofa Red", fallback: "#ff3131" },
  { variable: "--sofa-red-strong", label: "Sofa Red Strong", fallback: "#d72626" },
  { variable: "--sofa-green", label: "Sofa Green", fallback: "#99ff66" },
  { variable: "--sofa-green-strong", label: "Sofa Green Strong", fallback: "#1d6a2f" },
  { variable: "--blue", label: "Blue", fallback: "#0d70ff" },
  { variable: "--green", label: "Green", fallback: "#99ff66" },
  { variable: "--orange", label: "Orange", fallback: "#ff9e01" },
  { variable: "--gum-ink", label: "Gum Ink", fallback: "#111111" },
  { variable: "--gum-paper", label: "Gum Paper", fallback: "#f6f5f2" },
  { variable: "--gum-paper-soft", label: "Gum Paper Soft", fallback: "#ecebe7" },
  { variable: "--gum-pink", label: "Gum Pink", fallback: "#ec8bd7" },
  { variable: "--gum-teal", label: "Gum Teal", fallback: "#2caea3" },
  { variable: "--gum-yellow", label: "Gum Yellow", fallback: "#ecef46" },
];

function getCssColorValue(variable, fallback = "") {
  const rootStyles = window.getComputedStyle(document.documentElement);
  const value = rootStyles.getPropertyValue(variable).trim();
  return value || fallback;
}

function getResolvedCssColorValue(variable, fallback = "") {
  let value = getCssColorValue(variable, fallback);
  let depth = 0;
  while (value.startsWith("var(") && depth < 5) {
    const match = value.match(/^var\((--[^,\s)]+)(?:,\s*([^)]+))?\)$/);
    if (!match) break;
    const nestedVar = match[1];
    const nestedFallback = (match[2] || "").trim();
    const nestedValue = getCssColorValue(nestedVar, nestedFallback);
    if (!nestedValue || nestedValue === value) break;
    value = nestedValue;
    depth += 1;
  }
  return value || fallback;
}

function buildUIColorSample(entry) {
  const rawValue = getCssColorValue(entry.variable, entry.fallback || "");
  const value = getResolvedCssColorValue(entry.variable, entry.fallback || "");
  const swatch = buildFrameElement(`
    <span class="ui-color-preview" style="--swatch-color:${value};" aria-hidden="true"></span>
    <div class="ui-color-meta">
      <strong>${entry.label}</strong>
      <span class="muted">${entry.variable}</span>
      <span class="ui-color-value">${value}</span>
      ${rawValue !== value ? `<span class="ui-color-source">Source: ${rawValue}</span>` : ""}
    </div>
  `, {
    tag: "article",
    className: "ui-sample-card ui-color-card",
  });
  return buildUISampleWithCode(swatch, `${entry.variable}: ${rawValue}`);
}

function buildSofaScoreGauge(event, value, size = "default") {
  if (!event) return "";
  return `
    <div class="sofa-score-gauge sofa-score-gauge--left ${size === "compact" ? "is-compact" : ""}">
      ${buildSofaScoreControl(event, value, size, {
        vertical: true,
        hideCommunityMarker: true,
        scoreLabelMode: "none",
      })}
    </div>
  `;
}

function buildSofaScoreControl(event, value, size = "default", options = {}) {
  const {
    vertical = false,
    hideCommunityMarker = false,
    scoreLabelMode = "default",
  } = options;
  const isAttachedScoreLabel = scoreLabelMode === "attached";
  const isValueLabelHidden = scoreLabelMode === "none";
  const safeValue = clampSofaScore(value);
  const communityScore = toSofaScore(event.communityScore || 0);
  const markerColor = "var(--gum-ink)";
  const scoreColor = vertical ? "var(--gum-pink)" : getScoreColor(safeValue);
  const scoreTextColor = vertical ? "#111111" : getScoreTextColor(safeValue);
  const communityMarkerMarkup = hideCommunityMarker ? "" : `
        <div class="sofa-score-marker" style="--marker:${communityScore}">
          <span class="sofa-score-marker-label">${communityScore}%</span>
        </div>
      `;
  const scoreTooltipMarkup = isValueLabelHidden ? "" : `<div class="sofa-score-tooltip">${safeValue}</div>`;
  const levelDotMarkup = vertical ? `<div class="sofa-score-level-dot" aria-hidden="true"></div>` : "";
  return `
    <div class="sofa-score ${size === "compact" ? "compact" : ""} ${vertical ? "is-vertical" : ""} ${isAttachedScoreLabel ? "is-label-attached" : ""} ${isValueLabelHidden ? "is-label-hidden" : ""}" data-event-id="${event.id}" style="--score:${safeValue}; --marker-color:${markerColor}; --score-color:${scoreColor}; --score-text-color:${scoreTextColor}">
      <div class="sofa-score-track ${vertical ? "sofa-score-track--vertical" : ""}">
        ${communityMarkerMarkup}
        ${scoreTooltipMarkup}
        ${levelDotMarkup}
        <input
          class="sofa-score-input ${vertical ? "sofa-score-input--vertical" : ""}"
          type="range"
          min="0"
          max="100"
          step="1"
          value="${safeValue}"
          data-event-id="${event.id}"
          aria-label="Noter ${event.title} sur 100"
        />
      </div>
    </div>
  `;
}

function getGaugeIntervalColor(score) {
  const t = clampSofaScore(score) / 100;
  const r = Math.round(255 + (153 - 255) * t);
  const g = Math.round(49 + (255 - 49) * t);
  const b = Math.round(49 + (102 - 49) * t);
  return `rgb(${r}, ${g}, ${b})`;
}

function buildRatingDistributionChart(source, options = {}) {
  const scope = options.scope === "user"
    ? "user"
    : options.scope === "league"
      ? "league"
      : "event";
  let scores = [];
  let title = options.title || "Distribution des notes";
  let subtitle = options.subtitle || "";

  if (scope === "user") {
    const userId = typeof source === "string" ? source : source?.id;
    if (!userId) return "";
    scores = reviewSamples
      .filter((review) => review.userId === userId)
      .map((review) => clampSofaScore(toSofaScore(review.rating || 0)))
      .filter((score) => score > 0);
    if (!options.title) {
      title = "Distribution des notes utilisateur";
    }
  } else if (scope === "league") {
    const league = typeof source === "string"
      ? getLeagueById(source)
      : source;
    if (!league) return "";
    const matchIds = new Set(getLeagueMatches(league.id).map((event) => event.id));
    scores = reviewSamples
      .filter((review) => matchIds.has(review.eventId))
      .map((review) => clampSofaScore(toSofaScore(review.rating || 0)))
      .filter((score) => score > 0);
    if (!scores.length) {
      scores.push(clampSofaScore(toSofaScore(getLeagueCommunityScore(league.id) || 0)));
    }
    if (!options.title) {
      title = "Distribution des notes de la ligue";
    }
  } else {
    const event = typeof source === "string"
      ? events.find((item) => item.id === source)
      : source;
    if (!event) return "";
    scores = reviewSamples
      .filter((review) => review.eventId === event.id)
      .map((review) => clampSofaScore(toSofaScore(review.rating || 0)))
      .filter((score) => score > 0);
    if (!scores.length) {
      scores.push(clampSofaScore(toSofaScore(event.communityScore || 0)));
    }
  }

  const intervalSize = 10;
  const totalBins = 10;
  const bins = Array.from({ length: totalBins }, () => 0);

  scores.forEach((score) => {
    const index = Math.min(totalBins - 1, Math.floor(score / intervalSize));
    bins[index] += 1;
  });

  const maxCount = Math.max(...bins, 1);
  const totalVotes = bins.reduce((sum, count) => sum + count, 0);
  if (!subtitle) {
    const scopeLabel = scope === "user" ? "notes attribuées" : scope === "league" ? "notes matchs" : "notes";
    subtitle = totalVotes
      ? `${totalVotes} ${scopeLabel} · intervalles de 10`
      : "Aucune note · intervalles de 10";
  }
  const variantClass = scope === "user" ? "is-user" : scope === "league" ? "is-league" : "is-event";
  const extraClass = options.className ? ` ${options.className}` : "";

  const barsHtml = bins
    .map((count, index) => {
      const start = index * intervalSize;
      const end = index === totalBins - 1 ? 100 : start + intervalSize - 1;
      const center = index === totalBins - 1 ? 100 : start + intervalSize / 2;
      const height = count ? Math.round((count / maxCount) * 100) : 3;
      const color = getGaugeIntervalColor(center);
      const showLabel = index % 1 === 0 || index === totalBins - 1;
      const label = String(start);
      return `
        <div class="rating-dist-bin" title="${start}-${end}% · ${count} note(s)" aria-label="${start}-${end}% : ${count} note(s)">
          <div class="rating-dist-count ${count ? "is-visible" : ""}">${count || ""}</div>
          <div class="rating-dist-bar" style="--bar-height:${height}%; --bar-color:${color}"></div>
          <div class="rating-dist-label ${showLabel ? "" : "is-hidden"}">${label}</div>
        </div>
      `;
    })
    .join("");

  return buildFrameElement(`
    <div class="rating-distribution-head">
      <h3>${title}</h3>
      <span class="muted">${subtitle}</span>
    </div>
    <div class="rating-distribution-scroll">
      <div class="rating-distribution-chart">
        ${barsHtml}
      </div>
    </div>
    <div class="rating-distribution-axis">
      <span>0</span>
      <span>50</span>
      <span>100</span>
    </div>
  `, {
    tag: "section",
    className: `rating-distribution-card ${variantClass}${extraClass}`,
    attributes: `aria-label="${escapeHtml(title)}"`,
  });
}

function updateInlineLikeButton(button, liked, totalLikes) {
  if (!button) return;
  button.classList.toggle("is-liked", liked);
  const countEl = button.querySelector(".like-count");
  if (countEl) {
    countEl.textContent = formatNumber(totalLikes);
  }
}

function escapeHtml(value) {
  if (value == null) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function pickKeys(source, keys) {
  if (!source) return {};
  return keys.reduce((acc, key) => {
    if (source[key] !== undefined) {
      acc[key] = source[key];
    }
    return acc;
  }, {});
}

function getTierlistRatedEvents() {
  return events
    .map((event) => {
      const score = clampSofaScore(storedRatings[event.id] || 0);
      return { event, score };
    })
    .filter(({ event, score }) => {
      if (!event || score <= 0) return false;
      if (isUpcoming(event)) return false;
      return Boolean(parseEventDate(event.dateISO || event.date));
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const dateA = parseEventDate(a.event.dateISO || a.event.date) || new Date(0);
      const dateB = parseEventDate(b.event.dateISO || b.event.date) || new Date(0);
      return dateB - dateA;
    });
}

function getTierlistMonthBounds(ratedEvents) {
  if (!ratedEvents.length) return null;
  let minDate = null;
  let maxDate = null;
  ratedEvents.forEach(({ event }) => {
    const date = parseEventDate(event.dateISO || event.date);
    if (!date) return;
    if (!minDate || date < minDate) minDate = date;
    if (!maxDate || date > maxDate) maxDate = date;
  });
  if (!minDate || !maxDate) return null;
  return {
    minMonthKey: getCalendarMonthKey(minDate),
    maxMonthKey: getCalendarMonthKey(maxDate),
  };
}

function ensureTierlistMonthRange(ratedEvents) {
  const bounds = getTierlistMonthBounds(ratedEvents);
  if (!bounds) return null;
  if (!parseCalendarMonthKey(tierlistState.fromMonthKey || "")) {
    tierlistState.fromMonthKey = bounds.minMonthKey;
  }
  if (!parseCalendarMonthKey(tierlistState.toMonthKey || "")) {
    tierlistState.toMonthKey = bounds.maxMonthKey;
  }
  const fromDate = parseCalendarMonthKey(tierlistState.fromMonthKey);
  const toDate = parseCalendarMonthKey(tierlistState.toMonthKey);
  if (fromDate && toDate && fromDate > toDate) {
    tierlistState.toMonthKey = tierlistState.fromMonthKey;
  }
  return {
    fromDate: parseCalendarMonthKey(tierlistState.fromMonthKey),
    toDate: parseCalendarMonthKey(tierlistState.toMonthKey),
  };
}

function getTierlistSportOptions(ratedEvents) {
  const sportsSet = new Set();
  ratedEvents.forEach(({ event }) => {
    if (event?.sport) sportsSet.add(event.sport);
  });
  const sortedSports = Array.from(sportsSet).sort((a, b) => a.localeCompare(b, "fr"));
  return ["Aucun", "Tous", ...sortedSports];
}

function getTierlistFilteredEvents(ratedEvents) {
  ensureTierlistMonthRange(ratedEvents);
  const fromDate = parseCalendarMonthKey(tierlistState.fromMonthKey || "");
  const toDate = parseCalendarMonthKey(tierlistState.toMonthKey || "");
  const toDateExclusive = toDate ? new Date(toDate.getFullYear(), toDate.getMonth() + 1, 1) : null;
  return ratedEvents.filter(({ event }) => {
    if (!event) return false;
    if (tierlistState.sport === "Aucun") return false;
    if (tierlistState.sport !== "Tous" && tierlistState.sport !== event.sport) return false;
    const eventDate = parseEventDate(event.dateISO || event.date);
    if (!eventDate) return false;
    if (fromDate && eventDate < fromDate) return false;
    if (toDateExclusive && eventDate >= toDateExclusive) return false;
    return true;
  });
}

function renderTierlistFilters(ratedEvents) {
  const sportOptions = getTierlistSportOptions(ratedEvents);
  if (!sportOptions.includes(tierlistState.sport)) {
    tierlistState.sport = "Tous";
  }
  if (tierlistSportFiltersEl) {
    tierlistSportFiltersEl.innerHTML = buildSportFilterComponent({
      sports: sportOptions,
      activeSport: tierlistState.sport,
      className: "tierlist-sport-filter",
    });
  }
  if (tierlistPeriodFiltersEl) {
    const range = ensureTierlistMonthRange(ratedEvents);
    const fromDate = range?.fromDate || new Date();
    const toDate = range?.toDate || fromDate;
    tierlistPeriodFiltersEl.innerHTML = buildWatchlistPeriodRangeFilterComponent({
      fromDate,
      toDate,
      interactive: true,
      fromLabel: "De -",
      toLabel: "a -",
      className: "tierlist-period-filter",
    });
  }
}

function shiftTierlistMonthRange(bound, unit, delta) {
  const targetKey = bound === "to" ? tierlistState.toMonthKey : tierlistState.fromMonthKey;
  const baseDate = parseCalendarMonthKey(targetKey || "") || new Date();
  if (unit === "year") {
    baseDate.setFullYear(baseDate.getFullYear() + delta);
  } else {
    baseDate.setMonth(baseDate.getMonth() + delta);
  }
  const nextKey = getCalendarMonthKey(baseDate);
  if (bound === "to") {
    tierlistState.toMonthKey = nextKey;
  } else {
    tierlistState.fromMonthKey = nextKey;
  }
  const fromDate = parseCalendarMonthKey(tierlistState.fromMonthKey || "");
  const toDate = parseCalendarMonthKey(tierlistState.toMonthKey || "");
  if (fromDate && toDate && fromDate > toDate) {
    if (bound === "from") {
      tierlistState.toMonthKey = tierlistState.fromMonthKey;
    } else {
      tierlistState.fromMonthKey = tierlistState.toMonthKey;
    }
  }
}

function renderTierlistPage() {
  if (!tierlistBoardEl) return;

  const ratedEvents = getTierlistRatedEvents();
  renderTierlistFilters(ratedEvents);
  const filteredEvents = getTierlistFilteredEvents(ratedEvents);
  if (tierlistSummaryEl) {
    const eventWord = filteredEvents.length > 1 ? "événements notés" : "événement noté";
    if (ratedEvents.length !== filteredEvents.length) {
      tierlistSummaryEl.textContent = `${filteredEvents.length} ${eventWord} (${ratedEvents.length} au total)`;
    } else {
      tierlistSummaryEl.textContent = `${filteredEvents.length} ${eventWord}`;
    }
  }

  if (!ratedEvents.length) {
    tierlistBoardEl.innerHTML = buildEmptyStateCard("Aucun événement noté pour le moment.");
    return;
  }

  if (!filteredEvents.length) {
    tierlistBoardEl.innerHTML = buildEmptyStateCard("Aucun événement pour ce filtre.");
    return;
  }

  const tierRows = [
    { key: "legendary", label: "Legendaire", min: 100, max: 100, legendary: true },
    ...Array.from({ length: 10 }, (_, index) => {
      const max = 99 - (index * 10);
      const min = max - 9;
      return {
        key: `range-${min}-${max}`,
        label: `${min}-${max}`,
        min,
        max,
        legendary: false,
      };
    }),
  ];

  tierlistBoardEl.innerHTML = tierRows
    .map((tier) => {
      const items = filteredEvents.filter(({ score }) => {
        if (tier.legendary) return score === 100;
        return score >= tier.min && score <= tier.max;
      });

      return buildFrameElement(`
        <div class="tierlist-row-label">
          <span class="tierlist-range-tag">${tier.label}</span>
          <span class="tierlist-range-count">${items.length}</span>
        </div>
        <div class="tierlist-row-content">
          ${items.length
            ? `<div class="tierlist-mini-grid">${items.map(({ event }) => buildEventMiniature(event)).join("")}</div>`
            : `<div class="tierlist-empty muted">Aucun événement dans cette tranche.</div>`}
        </div>
      `, {
        tag: "article",
        className: `tierlist-row ${tier.legendary ? "is-legendary" : ""}`,
        attributes: `data-tier-key="${tier.key}"`,
      });
    })
    .join("");
}

function renderDataShowcase() {
  if (!dataShowcaseEl) return;
  const sampleEvent = events[0] || {};
  const sampleLeagueRoot = leagues[0] || {};
  const sampleLeagueSeason = leagueSeasons[0] || {};
  const sampleAthlete = athletes[0] || {};
  const sampleTeam = teams[0] || {};
  const sampleUser = users[0] || {};
  const sampleList = curatedLists[0] || {};
  const sampleCommentObject = genericCommentSamples[0] || {};
  const sampleEventTeams = eventTeams[0] || {};
  const sampleParticipation = athleteParticipation[0] || {};
  const sampleSports = sports.filter((sport) => sport !== "Tous").slice(0, 8);
  const tagCatalogRows = Object.values(storedTagCatalog || {}).filter((tag) => tag && typeof tag === "object");
  const objectTagRows = Object.entries(storedObjectTags || {})
    .filter(([objectKey]) => String(objectKey || "").trim())
    .map(([objectKey, tagIds]) => {
      const separatorIndex = String(objectKey).indexOf(":");
      const objectType = separatorIndex >= 0 ? String(objectKey).slice(0, separatorIndex) : "";
      const objectId = separatorIndex >= 0 ? String(objectKey).slice(separatorIndex + 1) : String(objectKey);
      const safeTagIds = Array.isArray(tagIds) ? tagIds.filter(Boolean) : [];
      return {
        objectKey,
        objectType,
        objectId,
        tagCount: safeTagIds.length,
        tagIds: safeTagIds,
      };
    });
  const objectTagVoteRows = Object.entries(storedObjectTagVotes || {})
    .filter(([voteKey]) => String(voteKey || "").trim())
    .map(([voteKey, votesMap]) => {
      const [objectKey = "", tagId = ""] = String(voteKey).split("|");
      const separatorIndex = String(objectKey).indexOf(":");
      const objectType = separatorIndex >= 0 ? String(objectKey).slice(0, separatorIndex) : "";
      const objectId = separatorIndex >= 0 ? String(objectKey).slice(separatorIndex + 1) : String(objectKey);
      const safeVotesMap = votesMap && typeof votesMap === "object" && !Array.isArray(votesMap) ? votesMap : {};
      const voteValues = Object.values(safeVotesMap)
        .map((value) => Number(value))
        .filter((value) => value === 1 || value === -1);
      const up = voteValues.filter((value) => value > 0).length;
      const down = voteValues.filter((value) => value < 0).length;
      return {
        voteKey,
        objectKey,
        objectType,
        objectId,
        tagId,
        up,
        down,
        score: up - down,
      };
    });
  const sampleTag = tagCatalogRows[0] || {};
  const sampleObjectTag = objectTagRows[0] || {};
  const sampleObjectTagVote = objectTagVoteRows[0] || {};

  const listPreview = sampleList
    ? {
        id: sampleList.id,
        title: sampleList.title,
        sport: sampleList.sport,
        ownerId: sampleList.ownerId,
        entries: (sampleList.entries || []).slice(0, 3),
      }
    : {};

  const cards = [
    {
      title: "Events",
      description: "Structure principale des événements sportifs.",
      total: events.length,
      sample: pickKeys(sampleEvent, ["id", "sport", "league", "leagueId", "leagueSeasonId", "title", "dateISO", "status", "communityScore", "result"]),
    },
    {
      title: "Leagues",
      description: "Compétitions canoniques (identité stable).",
      total: leagues.length,
      sample: pickKeys(sampleLeagueRoot, ["id", "title", "sport", "seasonCount", "latestYear", "communityScore"]),
    },
    {
      title: "LeagueSeasons",
      description: "Saisons annuelles d'une compétition.",
      total: leagueSeasons.length,
      sample: pickKeys(sampleLeagueSeason, ["id", "leagueId", "seasonKey", "title", "year", "startDateISO", "endDateISO", "communityScore"]),
    },
    {
      title: "Sports",
      description: "Liste derivee des sports actifs.",
      total: sports.length - 1,
      sample: sampleSports,
    },
    {
      title: "Athletes",
      description: "Fiche de sportif avec sport, pays, et équipe.",
      total: athletes.length,
      sample: pickKeys(sampleAthlete, ["id", "name", "sport", "country", "teamId", "role"]),
    },
    {
      title: "Équipes",
      description: "Équipe et joueurs associés.",
      total: teams.length,
      sample: {
        ...pickKeys(sampleTeam, ["id", "name", "sport", "city"]),
        athleteIds: (sampleTeam.athleteIds || []).slice(0, 4),
      },
    },
    {
      title: "Utilisateurs",
      description: "Profils communautaires Sofa Critics.",
      total: users.length,
      sample: pickKeys(sampleUser, ["id", "name", "handle", "followers", "favoriteSports", "badge"]),
    },
    {
      title: "Classements",
      description: "Classements créés par les utilisateurs.",
      total: curatedLists.length,
      sample: listPreview,
    },
    {
      title: "Commentaires",
      description: "Objet générique: critique (passee) ou teaser (futur), avec réponses et likes.",
      total: genericCommentSamples.length,
      sample: {
        ...pickKeys(sampleCommentObject, ["id", "eventId", "commentType", "author", "rating", "note", "likes"]),
        replies: (sampleCommentObject.replies || []).slice(0, 2),
      },
    },
    {
      title: "TagCatalog",
      description: "Catalogue des tags utilisateurs (id, label, slug, créateur, date).",
      total: tagCatalogRows.length,
      sample: pickKeys(sampleTag, ["id", "label", "slug", "createdBy", "createdAt"]),
    },
    {
      title: "ObjectTags",
      description: "Table polymorphique objet -> tags.",
      total: objectTagRows.length,
      sample: sampleObjectTag,
    },
    {
      title: "ObjectTagVotes",
      description: "Votes utilisateur (+1/-1) sur un tag d'objet.",
      total: objectTagVoteRows.length,
      sample: sampleObjectTagVote,
    },
    {
      title: "Relations équipes",
      description: "Mapping événements <-> équipes.",
      total: eventTeams.length,
      sample: sampleEventTeams,
    },
    {
      title: "Participations",
      description: "Mapping événements <-> sportifs.",
      total: athleteParticipation.length,
      sample: {
        eventId: sampleParticipation.eventId,
        athleteIds: (sampleParticipation.athleteIds || []).slice(0, 6),
      },
    },
  ];

  dataShowcaseEl.innerHTML = cards
    .map((card) => {
      const sample = card.customHtml
        ? card.customHtml
        : `<pre><code>${escapeHtml(JSON.stringify(card.sample, null, 2))}</code></pre>`;
      return buildFrameElement(`
        <div class="data-card-head">
          <h3>${card.title}</h3>
          <span class="mini-pill">${card.total}</span>
        </div>
        <p class="muted">${card.description}</p>
        ${sample}
      `, {
        tag: "article",
        className: `data-card ${card.customHtml ? "data-card-highlight" : ""}`,
      });
    })
    .join("");
}

function renderUISamples() {
  if (!uiFrameSamplesEl && !uiCardsSamplesEl && !uiEventCardsEl && !uiListCardsEl && !uiReviewCardsEl && !uiEventMiniaturesEl && !uiEventOverlaySamplesEl && !uiEventImageFilterSamplesEl && !uiCalendarMiniaturesEl && !uiSofaGaugesEl && !uiRatingDistributionEl && !uiSorareSamplesEl && !uiEventTopElementsEl && !uiWatchlistSwitchSamplesEl && !uiWatchlistPeriodSamplesEl && !uiWatchlistPeriodRangeSamplesEl && !uiPlayerMiniatureSamplesEl && !uiCommentLikeMetricSamplesEl && !uiAnswersNumberSamplesEl && !uiFollowButtonSamplesEl && !uiUserIdentitySamplesEl && !uiCommentHeaderSamplesEl && !uiRelativeDateSamplesEl && !uiTagTextboxSamplesEl && !uiObjectTagsSamplesEl && !uiSportFilterSamplesEl && !uiTextFormatSamplesEl && !uiEventDescriptionSamplesEl && !uiColorPaletteEl) return;
  const sampleEvent = events[0];
  const sampleUser = users[0];
  const upcomingEvent = events.find((event) => isUpcoming(event)) || events[1] || sampleEvent;
  const pastEvent = events.find((event) => !isUpcoming(event)) || sampleEvent;
  const secondaryPastEvent = events.find((event) => event && !isUpcoming(event) && event.id !== pastEvent?.id) || events[2] || pastEvent;
  const bestComment = genericCommentSamples
    .slice()
    .sort((a, b) => getCommentTotalLikes(b) - getCommentTotalLikes(a))[0] || null;

  if (uiColorPaletteEl) {
    uiColorPaletteEl.innerHTML = uiColorTokens
      .map((entry) => buildUIColorSample(entry))
      .join("");
  }

  if (uiFrameSamplesEl) {
    const framePreviewContent = `
      <div class="ui-frame-preview-swatches">
        <span class="ui-frame-swatch is-bg">Fond · var(--gum-paper)</span>
        <span class="ui-frame-swatch is-border">Bordure · 2px var(--gum-ink)</span>
        <span class="ui-frame-swatch is-hover">Hover · translate + shadow</span>
      </div>
      <p>Survolez ce bloc pour voir l'effet utilise sur les cards.</p>
    `;
    uiFrameSamplesEl.innerHTML = [
      buildUISampleWithCode(
        buildFrameElement(framePreviewContent, {
          className: "ui-frame-preview",
          attributes: 'tabindex="0"',
        }),
        "buildFrameElement(content)"
      ),
      buildUISampleWithCode(
        buildFrameElement(framePreviewContent, {
          className: "ui-frame-preview",
          background: "var(--gum-paper-soft)",
          attributes: 'tabindex="0"',
        }),
        'buildFrameElement(content, { background: "var(--gum-paper-soft)" })'
      ),
    ].join("");
  }

  if (uiUserIdentitySamplesEl) {
    const samplePrimaryUser = users[0] || null;
    const sampleSecondaryUser = users[1] || samplePrimaryUser;
    uiUserIdentitySamplesEl.innerHTML = [
      buildUISampleWithCode(
        buildUserIdentityElement(samplePrimaryUser),
        "buildUserIdentityElement(user)"
      ),
      buildUISampleWithCode(
        buildUserIdentityElement(sampleSecondaryUser, { size: "compact" }),
        'buildUserIdentityElement(user, { size: "compact" })'
      ),
    ].join("");
  }

  if (uiFollowButtonSamplesEl) {
    const samplePrimaryUser = users[0] || null;
    const sampleSecondaryUser = users[1] || samplePrimaryUser;
    const primaryFollowers = samplePrimaryUser?.id ? getFollowersCount(samplePrimaryUser.id) : 0;
    const secondaryFollowers = sampleSecondaryUser?.id ? getFollowersCount(sampleSecondaryUser.id) : 0;
    uiFollowButtonSamplesEl.innerHTML = [
      buildUISampleWithCode(
        buildFollowButton({
          userId: samplePrimaryUser?.id || "",
          isFollowing: false,
          followers: primaryFollowers,
        }),
        "buildFollowButton({ userId, isFollowing: false, followers })"
      ),
      buildUISampleWithCode(
        buildFollowButton({
          userId: sampleSecondaryUser?.id || "",
          isFollowing: true,
          followers: secondaryFollowers,
          compact: true,
        }),
        'buildFollowButton({ userId, isFollowing: true, followers, compact: true })'
      ),
    ].join("");
  }

  if (uiPlayerMiniatureSamplesEl) {
    const sampleA = athletes[0] || null;
    const sampleB = athletes[1] || sampleA;
    const sampleC = athletes[2] || sampleA;
    const sampleEventWithPlayers = events.find((event) => getEventParticipants(event.id).length >= 6)
      || events.find((event) => getEventParticipants(event.id).length > 0)
      || sampleEvent;
    uiPlayerMiniatureSamplesEl.innerHTML = [
      buildUISampleWithCode(
        `<div class="participant-avatars">${buildPlayerMiniatureElement(sampleA)}${buildPlayerMiniatureElement(sampleB)}${buildPlayerMiniatureElement(sampleC)}</div>`,
        "buildPlayerMiniatureElement(athlete)"
      ),
      buildUISampleWithCode(
        buildPlayerMiniatureElement(sampleA, { showName: true }),
        'buildPlayerMiniatureElement(athlete, { showName: true })'
      ),
      buildUISampleWithCode(
        buildEventPlayerMiniaturesElement(sampleEventWithPlayers.id, { maxPlayers: 6 }),
        'buildEventPlayerMiniaturesElement(eventId, { maxPlayers: 6 })'
      ),
    ].join("");
  }

  if (uiCommentLikeMetricSamplesEl) {
    uiCommentLikeMetricSamplesEl.innerHTML = [
      buildUISampleWithCode(
        buildCommentLikeMetric(128),
        "buildCommentLikeMetric(totalLikes)"
      ),
      buildUISampleWithCode(
        buildCommentLikeButton({ type: "comment", totalLikes: 128 }),
        'buildCommentLikeButton({ type: "comment", totalLikes })'
      ),
      buildUISampleWithCode(
        buildCommentLikeButton({ type: "comment", liked: true, totalLikes: 129 }),
        'buildCommentLikeButton({ type: "comment", liked: true, totalLikes })'
      ),
    ].join("");
  }

  if (uiAnswersNumberSamplesEl) {
    uiAnswersNumberSamplesEl.innerHTML = [
      buildUISampleWithCode(
        buildAnswersNumber(4),
        "buildAnswersNumber(totalAnswers)"
      ),
      buildUISampleWithCode(
        buildAnswersNumber(1, { label: "1 réponse" }),
        'buildAnswersNumber(1, { label: "1 réponse" })'
      ),
    ].join("");
  }

  if (uiTagTextboxSamplesEl) {
    uiTagTextboxSamplesEl.innerHTML = [
      buildUISampleWithCode(
        buildTagTextboxElement("Texte principal"),
        'buildTagTextboxElement("Texte principal")'
      ),
      buildUISampleWithCode(
        buildTagTextboxElement("Texte secondaire", { secondary: true }),
        'buildTagTextboxElement("Texte secondaire", { secondary: true })'
      ),
    ].join("");
  }

  if (uiObjectTagsSamplesEl) {
    const sampleTeam = teams[0] || null;
    uiObjectTagsSamplesEl.innerHTML = [
      buildUISampleWithCode(
        `<div class="ui-row">${buildObjectTagsWidget("event", pastEvent.id, { compact: true })}</div>`,
        'buildObjectTagsWidget("event", event.id, { compact: true })'
      ),
      sampleTeam
        ? buildUISampleWithCode(
          `<div class="ui-row">${buildObjectTagsWidget("team", sampleTeam.id, { compact: true })}</div>`,
          'buildObjectTagsWidget("team", team.id, { compact: true })'
        )
        : "",
    ].filter(Boolean).join("");
  }

  if (uiSportFilterSamplesEl) {
    const sportOptions = ["Aucun", "Tous", "Football", "Cyclisme", "Tennis", "Basketball"];
    uiSportFilterSamplesEl.innerHTML = [
      buildUISampleWithCode(
        buildSportFilterComponent({ sports: sportOptions, activeSport: "Tous", interactive: true }),
        'buildSportFilterComponent({ sports, activeSport: "Tous", interactive: true })'
      ),
      buildUISampleWithCode(
        buildSportFilterComponent({ sports: sportOptions, activeSport: "Cyclisme" }),
        'buildSportFilterComponent({ sports, activeSport: "Cyclisme" })'
      ),
    ].join("");
  }

  if (uiTextFormatSamplesEl) {
    uiTextFormatSamplesEl.innerHTML = [
      buildUISampleWithCode(
        '<div class="ui-text-format-sample display">Titre principal - format display</div>',
        "Display text (.ui-text-format-sample.display)"
      ),
      buildUISampleWithCode(
        '<div class="ui-text-format-sample heading">Titre de section - niveau composant</div>',
        "Heading text (.ui-text-format-sample.heading)"
      ),
      buildUISampleWithCode(
        '<div class="ui-text-format-sample body">Texte principal pour decrire un événement, une fonctionnalite ou un contexte d usage.</div>',
        "Body text (.ui-text-format-sample.body)"
      ),
      buildUISampleWithCode(
        '<div class="ui-text-format-sample muted">Texte secondaire pour les metadonnées et informations de contexte.</div>',
        "Muted text (.ui-text-format-sample.muted)"
      ),
      buildUISampleWithCode(
        '<div class="ui-text-format-sample small">Small texte pour informations de support et contenus denses.</div>',
        "Small text (.ui-text-format-sample.small)"
      ),
      buildUISampleWithCode(
        '<div class="ui-text-format-sample caption">Caption texte pour legende d image, timestamp ou source.</div>',
        "Caption text (.ui-text-format-sample.caption)"
      ),
      buildUISampleWithCode(
        '<a class="ui-text-format-sample body" href="#ui-text">Texte cliquable (sousligne automatiquement)</a>',
        "Clickable text (a.ui-text-format-sample.body)"
      ),
      buildUISampleWithCode(
        '<div class="ui-row"><span class="tag-textbox">Texte principal</span><span class="tag-textbox is-secondary">Texte secondaire</span></div>',
        ".tag-textbox / .tag-textbox.is-secondary"
      ),
      buildUISampleWithCode(
        '<div class="ui-text-format-sample mono">event_id: evt_2XWA16... · score: 87 · statut: passe</div>',
        "Monospace data text (.ui-text-format-sample.mono)"
      ),
    ].join("");
  }

  if (uiEventDescriptionSamplesEl) {
    const samplePast = pastEvent || sampleEvent;
    const sampleUpcoming = upcomingEvent || events.find((event) => isUpcoming(event)) || samplePast;
    uiEventDescriptionSamplesEl.innerHTML = [
      samplePast
        ? buildUISampleWithCode(
          buildEventDescriptionBlock(samplePast),
          "buildEventDescriptionBlock(event) // event passe (avec resultat)"
        )
        : "",
      sampleUpcoming
        ? buildUISampleWithCode(
          buildEventDescriptionBlock(sampleUpcoming),
          "buildEventDescriptionBlock(event) // event à venir"
        )
        : "",
    ].filter(Boolean).join("");
  }

  if (uiCommentHeaderSamplesEl) {
    const samplePrimaryUser = users[0] || null;
    const sampleSecondaryUser = users[1] || samplePrimaryUser;
    const primaryScore = clampSofaScore(storedRatings[sampleEvent?.id] || 62);
    const secondaryScore = clampSofaScore(primaryScore + 9);
    uiCommentHeaderSamplesEl.innerHTML = [
      buildUISampleWithCode(
        buildHeaderCommentaireElement(samplePrimaryUser, primaryScore),
        "headercommentaire"
      ),
      buildUISampleWithCode(
        buildHeaderCommentaireElement(sampleSecondaryUser, secondaryScore, { size: "compact" }),
        'headercommentaire (compact)'
      ),
    ].join("");
  }

  if (uiRelativeDateSamplesEl) {
    const now = new Date();
    const sameDayDate = new Date(now.getTime() - (5 * 60 * 60 * 1000));
    const olderDate = new Date(now.getTime() - (36 * 60 * 60 * 1000));
    uiRelativeDateSamplesEl.innerHTML = [
      buildUISampleWithCode(
        buildRelativeDateElement(sameDayDate, { now }),
        "buildRelativeDateElement(date) -> il y'a N heures"
      ),
      buildUISampleWithCode(
        buildRelativeDateElement(olderDate, { now }),
        "buildRelativeDateElement(date) -> le JJ mois AAAA"
      ),
      buildUISampleWithCode(
        buildRelativeDateElement(sameDayDate, { now, size: "compact" }),
        'buildRelativeDateElement(date, { size: "compact" })'
      ),
    ].join("");
  }

  if (uiWatchlistSwitchSamplesEl) {
    uiWatchlistSwitchSamplesEl.innerHTML = [
      buildUISampleWithCode(
        buildWatchlistModeSwitch("calendar"),
        'buildWatchlistModeSwitch("calendar")'
      ),
      buildUISampleWithCode(
        buildWatchlistModeSwitch("list"),
        'buildWatchlistModeSwitch("list")'
      ),
    ].join("");
  }

  if (uiWatchlistPeriodSamplesEl) {
    uiWatchlistPeriodSamplesEl.innerHTML = [
      buildUISampleWithCode(
        buildWatchlistPeriodSelectorsComponent({ date: new Date(2026, 1, 1), totalEvents: 11 }),
        'buildWatchlistPeriodSelectorsComponent({ date, totalEvents })'
      ),
    ].join("");
  }

  if (uiWatchlistPeriodRangeSamplesEl) {
    uiWatchlistPeriodRangeSamplesEl.innerHTML = [
      buildUISampleWithCode(
        buildWatchlistPeriodRangeFilterComponent({ fromDate: new Date(2025, 1, 1), toDate: new Date(2026, 9, 1) }),
        'buildWatchlistPeriodRangeFilterComponent({ fromDate, toDate })'
      ),
    ].join("");
  }

  if (uiEventTopElementsEl) {
    const sampleSportLabel = sampleEvent?.sport || "Football";
    const sampleUserScore = clampSofaScore(storedRatings[sampleEvent?.id] || 62);
    const sampleGlobalScore = toSofaScore(sampleEvent?.communityScore || 88);
    const sampleWatchlistCount = getWatchlistCount(sampleEvent);
    const sampleRateChip = buildEventRateChipButton({
      eventId: sampleEvent?.id || "",
      href: sampleEvent ? eventUrlFor(sampleEvent) : "event.html",
    });
    const watchlistButtonBase = buildAddWatchlistFabButton({ watchlistCount: sampleWatchlistCount });
    const watchlistButtonSaved = buildAddWatchlistFabButton({ isSaved: true, watchlistCount: sampleWatchlistCount });
    const assembledRow = buildEventCornerMeta({
      sport: sampleSportLabel,
      communityScore: sampleGlobalScore,
      leadingChipHtml: buildEventUserScoreChip(sampleUserScore),
      watchlistButtonHtml: watchlistButtonBase,
      className: "ui-event-corner-preview",
      ariaLabel: "Exemple d'elements de tete event card",
    });
    uiEventTopElementsEl.innerHTML = [
      buildUISampleWithCode(`<div class="ui-top-element-wrap">${buildEventSportChip(sampleSportLabel)}</div>`, "buildEventSportChip(sport)"),
      buildUISampleWithCode(`<div class="ui-top-element-wrap">${buildEventUserScoreChip(sampleUserScore)}</div>`, "buildEventUserScoreChip(score)"),
      buildUISampleWithCode(`<div class="ui-top-element-wrap">${sampleRateChip}</div>`, "buildEventRateChipButton({ eventId, href })"),
      buildUISampleWithCode(`<div class="ui-top-element-wrap">${buildEventCommunityScoreChip(sampleGlobalScore)}</div>`, "buildEventCommunityScoreChip(score)"),
      buildUISampleWithCode(`<div class="ui-watchlist-fab-stack">${watchlistButtonBase}${watchlistButtonSaved}</div>`, "buildAddWatchlistFabButton({ isSaved, watchlistCount })"),
      buildUISampleWithCode(assembledRow, "buildEventCornerMeta(...)"),
    ].join("");
  }

  if (uiEventMiniaturesEl) {
    const miniEvents = [];
    [sampleEvent, upcomingEvent, secondaryPastEvent, events[3]].forEach((event) => {
      if (!event) return;
      if (miniEvents.some((item) => item.id === event.id)) return;
      miniEvents.push(event);
    });
    uiEventMiniaturesEl.innerHTML = miniEvents
      .slice(0, 3)
      .map((event) => buildUISampleWithCode(buildEventMiniature(event), "buildEventMiniature(event)"))
      .join("");
  }

  if (uiEventOverlaySamplesEl) {
    const overlaySamples = [];
    [pastEvent, upcomingEvent].forEach((event) => {
      if (!event) return;
      if (overlaySamples.some((item) => item.id === event.id)) return;
      overlaySamples.push(event);
    });
    uiEventOverlaySamplesEl.innerHTML = overlaySamples.length
      ? [
        buildUISampleWithCode(
          buildEventMiniature(overlaySamples[0]),
          "buildEventMiniature(event) -> clic ouvre l'overlay EventCard"
        ),
        overlaySamples[1]
          ? buildUISampleWithCode(
            `<div class="calendar-mini-grid">${buildCalendarEventChip(overlaySamples[1])}</div>`,
            "buildCalendarEventChip(event) -> clic ouvre l'overlay EventCard"
          )
          : "",
      ].join("")
      : buildEmptyStateCard("Aucun événement disponible.");
  }

  if (uiEventImageFilterSamplesEl) {
    const filterEvent = pastEvent || sampleEvent;
    const image = getEventImage(filterEvent);
    const safeTitle = escapeHtml(filterEvent?.title || "Événement");
    const filterVariants = [
      {
        name: "00 · Defaut (Paper vintage)",
        filter: "saturate(0.94) contrast(0.98) brightness(1.09)",
        overlay: "linear-gradient(180deg, rgba(236,235,231,0.84) 0%, rgba(246,245,242,0.82) 100%)",
      },
      {
        name: "01 · Naturel",
        filter: "saturate(1.02) contrast(1.01) brightness(1.06)",
        overlay: "linear-gradient(180deg, rgba(246,245,242,0.78) 0%, rgba(246,245,242,0.84) 100%)",
      },
      {
        name: "02 · Jaune doux",
        filter: "saturate(1.06) contrast(1.01) brightness(1.08)",
        overlay: "linear-gradient(180deg, rgba(246,245,242,0.8) 0%, rgba(236,239,70,0.76) 100%)",
      },
      {
        name: "03 · Teal terrain",
        filter: "saturate(1.1) contrast(1.02) brightness(1.05)",
        overlay: "linear-gradient(180deg, rgba(44,174,163,0.74) 0%, rgba(246,245,242,0.72) 100%)",
      },
      {
        name: "04 · Pink hype",
        filter: "saturate(1.14) contrast(1.03) brightness(1.04)",
        overlay: "linear-gradient(180deg, rgba(236,139,215,0.78) 0%, rgba(246,245,242,0.7) 100%)",
      },
      {
        name: "05 · Red matchday",
        filter: "saturate(1.12) contrast(1.04) brightness(1.03)",
        overlay: "linear-gradient(180deg, rgba(255,49,49,0.7) 0%, rgba(246,245,242,0.72) 100%)",
      },
      {
        name: "06 · Green crowd",
        filter: "saturate(1.08) contrast(1.02) brightness(1.08)",
        overlay: "linear-gradient(180deg, rgba(153,255,102,0.78) 0%, rgba(236,235,231,0.74) 100%)",
      },
      {
        name: "07 · Paper vintage",
        filter: "saturate(0.94) contrast(0.98) brightness(1.09)",
        overlay: "linear-gradient(180deg, rgba(236,235,231,0.84) 0%, rgba(246,245,242,0.82) 100%)",
      },
      {
        name: "08 · Teal + yellow",
        filter: "saturate(1.1) contrast(1.03) brightness(1.06)",
        overlay: "linear-gradient(180deg, rgba(44,174,163,0.72) 0%, rgba(236,239,70,0.76) 100%)",
      },
      {
        name: "09 · Punchy sport",
        filter: "saturate(1.16) contrast(1.06) brightness(1.04)",
        overlay: "linear-gradient(180deg, rgba(236,139,215,0.72) 0%, rgba(255,49,49,0.76) 56%, rgba(236,239,70,0.72) 100%)",
      },
      {
        name: "10 · High impact",
        filter: "saturate(1.18) contrast(1.08) brightness(1.03)",
        overlay: "linear-gradient(180deg, rgba(246,245,242,0.72) 0%, rgba(44,174,163,0.78) 45%, rgba(236,239,70,0.8) 100%)",
      },
    ];
    const filterCards = filterVariants
      .map((variant) => `
        <div class="ui-event-filter-preview is-filtered" style="--ui-event-filter:${variant.filter}; --ui-event-overlay:${variant.overlay};">
          <img src="${image}" alt="${safeTitle}">
          <span class="tag">${escapeHtml(variant.name)}</span>
        </div>
      `)
      .join("");
    uiEventImageFilterSamplesEl.innerHTML = buildUISampleWithCode(
      `
        <div class="ui-event-filter-grid">
          ${filterCards}
        </div>
      `,
      "Filtre image EventCard (comparatif)"
    );
  }

  if (uiCalendarMiniaturesEl) {
    const calendarSamples = [];
    [pastEvent, upcomingEvent].forEach((event) => {
      if (!event) return;
      if (calendarSamples.some((item) => item.id === event.id)) return;
      calendarSamples.push(event);
    });
    uiCalendarMiniaturesEl.innerHTML = calendarSamples
      .slice(0, 2)
      .map((event) => buildUISampleWithCode(buildCalendarEventChip(event), "buildCalendarEventChip(event)"))
      .join("");
  }

  if (uiSofaGaugesEl) {
    const primaryRating = storedRatings[pastEvent?.id] || toSofaScore(pastEvent?.communityScore || 0);
    const secondaryRating = storedRatings[secondaryPastEvent?.id] || toSofaScore(secondaryPastEvent?.communityScore || 0);
    uiSofaGaugesEl.innerHTML = [
      buildUISampleWithCode(buildSofaScoreGauge(pastEvent, primaryRating, "default"), 'buildSofaScoreGauge(event, rating, "default")'),
      buildUISampleWithCode(buildSofaScoreGauge(secondaryPastEvent, secondaryRating, "compact"), 'buildSofaScoreGauge(event, rating, "compact")'),
    ].join("");
  }

  if (uiRatingDistributionEl) {
    uiRatingDistributionEl.innerHTML = [
      buildUISampleWithCode(
        buildRatingDistributionChart(pastEvent, { scope: "event" }),
        'buildRatingDistributionChart(event, { scope: "event" })'
      ),
      buildUISampleWithCode(
        buildRatingDistributionChart(sampleUser, { scope: "user" }),
        'buildRatingDistributionChart(user, { scope: "user" })'
      ),
    ].join("");
  }

  if (uiSorareSamplesEl) {
    uiSorareSamplesEl.innerHTML = buildUISampleWithCode(
      buildSorareCardSample(upcomingEvent || sampleEvent),
      "buildSorareCardSample(event)"
    );
  }

  if (uiCardsSamplesEl) {
    const sampleCardComment = bestComment || genericCommentSamples[0] || reviewSamples[0] || commentSamples[0];
    const sampleCardEvent = events.find((event) => event.id === sampleCardComment?.eventId) || pastEvent || sampleEvent;
    const sampleAthlete = athletes[0] || null;
    const sampleTeam = teams[0] || null;
    const sampleUserForCard = users[0] || null;
    const sampleLeagueSeason = leagueSeasons.find((league) => (league.eventIds || []).length >= 3) || leagueSeasons[0] || null;
    const sampleLeagueGeneric = leagues.find((league) => Number(league.seasonCount || 0) >= 2) || leagues[0] || null;
    uiCardsSamplesEl.innerHTML = [
      buildUISampleWithCode(
        buildEventCard(sampleCardEvent),
        "buildEventCard(event)"
      ),
      buildUISampleWithCode(
        buildEventStyleCommentCard(sampleCardComment, sampleCardEvent),
        "buildEventStyleCommentCard(comment, event)"
      ),
      sampleAthlete
        ? buildUISampleWithCode(
          buildPlayerCard(sampleAthlete),
          "buildPlayerCard(athlete)"
        )
        : "",
      sampleUserForCard
        ? buildUISampleWithCode(
          buildUserCard(sampleUserForCard, {
            stats: {
              followers: 2401,
              following: 1085,
              critiques: 25,
              likesReceived: 1396,
            },
          }),
          "buildUserCard(user, { stats })"
        )
        : "",
      sampleTeam
        ? buildUISampleWithCode(
          buildTeamCard(sampleTeam),
          "buildTeamCard(team)"
        )
        : "",
      sampleLeagueSeason
        ? buildUISampleWithCode(
          buildLeagueCard(sampleLeagueSeason, { variant: "season" }),
          'buildLeagueCard(leagueSeason, { variant: "season" })'
        )
        : "",
      sampleLeagueGeneric
        ? buildUISampleWithCode(
          buildLeagueCard(sampleLeagueGeneric, { variant: "generic" }),
          'buildLeagueCard(league, { variant: "generic" })'
        )
        : "",
    ].join("");
  }

  if (uiEventCardsEl) {
    const rowOneCards = [
      buildUISampleWithCode(buildEventCard(pastEvent), "buildEventCard(event)"),
      buildUISampleWithCode(buildEventCard(upcomingEvent), "buildEventCard(upcomingEvent)"),
    ];
    const rowTwoEvents = events.filter((event) => event.id !== pastEvent.id && event.id !== upcomingEvent.id).slice(0, 3);
    const rowTwoCards = rowTwoEvents.map((event, index) => {
      const isCompactCard = index > 0;
      return buildUISampleWithCode(
        buildEventCard(event, isCompactCard ? { size: "compact", label: "Compact" } : {}),
        isCompactCard
          ? 'buildEventCard(event, { size: "compact", label: "Compact" })'
          : "buildEventCard(event)"
      );
    });
    const rowThreeEvents = events
      .filter((event) => ![pastEvent.id, upcomingEvent.id, ...rowTwoEvents.map((item) => item.id)].includes(event.id))
      .slice(0, 4);
    const rowThreeCards = rowThreeEvents.map((event) => buildUISampleWithCode(
      buildEventCard(event, { size: "compact", label: "Compact" }),
      'buildEventCard(event, { size: "compact", label: "Compact" })'
    ));
    uiEventCardsEl.classList.add("ui-event-cards-layout");
    uiEventCardsEl.innerHTML = `
      <div class="ui-event-cards-row cols-2">${rowOneCards.join("")}</div>
      <div class="ui-event-cards-row cols-3">${rowTwoCards.join("")}</div>
      <div class="ui-event-cards-row cols-4">${rowThreeCards.join("")}</div>
    `;
  }

  if (uiListCardsEl) {
    const list = curatedLists[0];
    const samples = [
      list ? buildUISampleWithCode(buildRankingCard(list), "buildRankingCard(list)") : "",
    ].filter(Boolean);
    uiListCardsEl.innerHTML = samples.length
      ? samples.join("")
      : buildEmptyStateCard("Aucun classement.");
  }

  if (uiReviewCardsEl) {
    const review = reviewSamples[0];
    const comment = commentSamples[0];
    const reviewWithEventNameMarkup = review
      ? buildUnifiedCommentCard(
        { ...review, replies: (review.replies || []).slice(0, 1) },
        {
          mode: "review",
          eventId: review.eventId,
          eventName: "Y",
          showFollowButton: false,
          showReplyComposer: false,
        }
      )
      : "";
    const reviewMarkup = review
      ? buildUnifiedCommentCard(
        { ...review, replies: (review.replies || []).slice(0, 1) },
        {
          mode: "review",
          eventId: review.eventId,
          showFollowButton: false,
          showReplyComposer: false,
        }
      )
      : "";
    const commentMarkup = comment
      ? buildUnifiedCommentCard(
        { ...comment, replies: (comment.replies || []).slice(0, 2) },
        {
          mode: "comment",
          eventId: comment.eventId,
          showFollowButton: false,
          showReplyComposer: false,
        }
      )
      : "";
    uiReviewCardsEl.innerHTML = [
      reviewWithEventNameMarkup ? buildUISampleWithCode(reviewWithEventNameMarkup, 'buildUnifiedCommentCard(review, { mode: "review", eventName: "Y" })') : "",
      reviewMarkup ? buildUISampleWithCode(reviewMarkup, 'buildUnifiedCommentCard(review, { mode: "review" })') : "",
      commentMarkup ? buildUISampleWithCode(commentMarkup, 'buildUnifiedCommentCard(comment, { mode: "comment" })') : "",
    ].join("");
  }
  syncAllSofaScoreThumbPositions();
}

function getWatchlistCount(event) {
  const base = event.watchlistCount || Math.round((event.reviews || 0) * 1.4 + event.communityScore * 120);
  const jitter = event.id ? event.id.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % 120 : 0;
  return base + jitter + (isInWatchlist(event.id) ? 1 : 0);
}

function getListPreviewImages(list, max = 5) {
  const items = getListItems(list);
  let images = items
    .map((item) => getListItemImage(item))
    .filter(Boolean);

  if (!images.length) {
    images = events
      .filter((event) => list.sport === "Multi-sport" || event.sport === list.sport)
      .slice(0, max)
      .map((event) => getEventImage(event));
  }

  if (!images.length) {
    images = ["images/events/samplegeneric.jpeg"];
  }

  const original = images.slice();
  while (images.length < max) {
    images.push(original[images.length % original.length]);
  }

  return images.slice(0, max);
}

function renderHomeHighlights() {
  if (!homeReviewsEl || !homeListsEl) return;
  const active = getActiveSports();

  const topReviews = reviewSamples
    .map((review) => ({
      review,
      event: events.find((event) => event.id === review.eventId),
    }))
    .filter(({ event }) => event && active.has(event.sport))
    .sort((a, b) => getCommentTotalLikes(b.review) - getCommentTotalLikes(a.review))
    .slice(0, 3);

  if (!topReviews.length) {
    homeReviewsEl.innerHTML = buildEmptyStateCard("Aucune critique pour ce filtre.");
  } else {
    homeReviewsEl.innerHTML = topReviews
      .map(({ review, event }) => {
        return buildUnifiedCommentCard(
          { ...review, replies: (review.replies || []).slice(0, 1) },
          {
            mode: "review",
            eventId: event.id,
            eventName: "Y",
            showFollowButton: false,
            showReplyAction: false,
            showReplyComposer: false,
            showReplies: false,
            className: "highlight-review-card",
          }
        );
      })
      .join("");
  }

  const topLists = curatedLists
    .filter((list) => {
      if (list.sport === "Multi-sport") {
        return (list.entries || []).some((entry) => {
          const event = events.find((item) => item.id === entry.eventId);
          return event && active.has(event.sport);
        });
      }
      return active.has(list.sport);
    })
    .slice()
    .sort((a, b) => (b.likes || 0) - (a.likes || 0))
    .slice(0, 3);

  if (!topLists.length) {
    homeListsEl.innerHTML = buildEmptyStateCard("Aucun classement pour ce filtre.");
  } else {
    homeListsEl.innerHTML = topLists
      .map((list) => {
        const owner = getUserById(list.ownerId);
        return buildRankingCard(list, {
          owner,
          showOwner: true,
          showFollowButton: false,
        });
      })
      .join("");
  }
}

function getFeedCommentTimestamp(comment) {
  if (!comment) return 0;
  const rawDate = comment.dateTime || comment.createdAt || comment.dateISO || "";
  const timestamp = Date.parse(rawDate);
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

function sortFeedCommentsByRelevance(list) {
  return (Array.isArray(list) ? list.slice() : [])
    .sort((a, b) => {
      const likesDiff = getCommentTotalLikes(b) - getCommentTotalLikes(a);
      if (likesDiff !== 0) return likesDiff;
      return getFeedCommentTimestamp(b) - getFeedCommentTimestamp(a);
    });
}

function getFollowedUserIds() {
  return Object.entries(storedUserFollows)
    .filter(([, isFollowing]) => Boolean(isFollowing))
    .map(([userId]) => userId)
    .filter((userId) => Boolean(usersById[userId]));
}

function getTopLikedComments(limit = 18) {
  return sortFeedCommentsByRelevance(genericCommentSamples).slice(0, Math.max(0, limit));
}

function getCommentsFromFollowedUsers(limit = 14) {
  const followedIds = new Set(getFollowedUserIds());
  if (!followedIds.size) return [];
  const comments = genericCommentSamples.filter((comment) => followedIds.has(comment.userId));
  return sortFeedCommentsByRelevance(comments).slice(0, Math.max(0, limit));
}

function hashFeedSeed(value) {
  return String(value || "")
    .split("")
    .reduce((acc, char) => ((acc * 31) + char.charCodeAt(0)) >>> 0, 0);
}

function getSimulatedFollowedCommentSignals(options = {}) {
  const {
    limit = 14,
    mode = "liked",
  } = options;
  const followedIds = getFollowedUserIds();
  if (!followedIds.length) return [];
  const pool = sortFeedCommentsByRelevance(genericCommentSamples);
  if (!pool.length) return [];

  const pickedById = new Map();
  followedIds.forEach((userId, userIndex) => {
    const baseSeed = hashFeedSeed(`${mode}-${userId}-${userIndex}`);
    const picks = mode === "repost" ? 1 + (baseSeed % 2) : 2 + (baseSeed % 2);
    const stride = 1 + (hashFeedSeed(`${mode}-${userId}-stride`) % Math.max(1, Math.min(pool.length, 7)));
    for (let index = 0; index < picks; index += 1) {
      const selectedIndex = (baseSeed + (index * stride)) % pool.length;
      const comment = pool[selectedIndex];
      if (comment) {
        const score = 1000 - (index * 10) + (getCommentTotalLikes(comment) * 2);
        const commentTs = getFeedCommentTimestamp(comment) || Date.now();
        const syntheticOffsetMs = (mode === "repost" ? 2 : 1) * 60 * 60 * 1000;
        const jitterMs = (baseSeed % 17) * 60 * 1000;
        const signalTimestamp = Math.min(Date.now(), commentTs + syntheticOffsetMs + jitterMs);
        const previous = pickedById.get(comment.id);
        if (!previous || previous.score < score) {
          pickedById.set(comment.id, {
            comment,
            actorUserId: userId,
            score,
            timestamp: signalTimestamp,
          });
        }
      }
    }
  });

  return Array.from(pickedById.values())
    .sort((a, b) => {
      const scoreDiff = b.score - a.score;
      if (scoreDiff !== 0) return scoreDiff;
      return getFeedCommentTimestamp(b.comment) - getFeedCommentTimestamp(a.comment);
    })
    .slice(0, Math.max(0, limit));
}

function getSimulatedFollowedLikedCommentSignals(limit = 14) {
  return getSimulatedFollowedCommentSignals({ limit, mode: "liked" });
}

function getSimulatedFollowedRepostCommentSignals(limit = 10) {
  return getSimulatedFollowedCommentSignals({ limit, mode: "repost" });
}

function getSimulatedFollowedLikedComments(limit = 14) {
  return getSimulatedFollowedLikedCommentSignals(limit).map((entry) => entry.comment);
}

function getListLikeScore(list) {
  if (!list) return 0;
  return Number(list.likes || 0) + (storedListLikes[list.id] ? 1 : 0);
}

function getTopLikedRankings(limit = 8) {
  return curatedLists
    .slice()
    .sort((a, b) => {
      const scoreDiff = getListLikeScore(b) - getListLikeScore(a);
      if (scoreDiff !== 0) return scoreDiff;
      return String(a.title || "").localeCompare(String(b.title || ""));
    })
    .slice(0, Math.max(0, limit));
}

function getListSports(list) {
  if (!list) return [];
  const sportsSet = new Set();
  if (list.sport && list.sport !== "Multi-sport") {
    sportsSet.add(list.sport);
  }
  getListItems(list).forEach((item) => {
    if (item.event?.sport) {
      sportsSet.add(item.event.sport);
    }
    if (item.athlete) {
      getAthleteSports(item.athlete).forEach((sport) => {
        if (sport) sportsSet.add(sport);
      });
    }
  });
  return Array.from(sportsSet);
}

function getListSportAffinity(list, favoriteSports = []) {
  const favorites = Array.isArray(favoriteSports) ? favoriteSports : [];
  if (!favorites.length) return 0;
  const listSports = getListSports(list);
  if (!listSports.length) return 0;
  const matchingCount = listSports.filter((sport) => favorites.includes(sport)).length;
  return Math.max(0, Math.min(1, matchingCount / listSports.length));
}

function getAdaptedRankings(limit = 8) {
  const favoriteSports = getFavoriteSports();
  const followedIds = new Set(getFollowedUserIds());
  const baseScores = curatedLists.map((list) => getListLikeScore(list));
  const maxLikeScore = Math.max(1, ...baseScores);

  return curatedLists
    .map((list) => {
      const likeScore = getListLikeScore(list);
      const likeNorm = likeScore / maxLikeScore;
      const sportAffinity = getListSportAffinity(list, favoriteSports);
      const followAffinity = followedIds.has(list.ownerId) ? 1 : 0;
      const score = (0.5 * likeNorm) + (0.3 * sportAffinity) + (0.2 * followAffinity);
      return { list, likeScore, score };
    })
    .sort((a, b) => {
      const scoreDiff = b.score - a.score;
      if (Math.abs(scoreDiff) > 0.0001) return scoreDiff;
      const likeDiff = b.likeScore - a.likeScore;
      if (likeDiff !== 0) return likeDiff;
      return String(a.list.title || "").localeCompare(String(b.list.title || ""));
    })
    .slice(0, Math.max(0, limit))
    .map((entry) => entry.list);
}

function getFeedInterestContext() {
  const favoriteSports = new Set(getFavoriteSports());
  const favoriteTeamIds = new Set();
  const favoriteAthleteIds = new Set();

  Object.entries(storedTeamFavorites).forEach(([teamId, isFavorite]) => {
    if (!isFavorite) return;
    favoriteTeamIds.add(teamId);
    const team = getTeamById(teamId);
    if (team?.sport) {
      favoriteSports.add(team.sport);
    }
  });

  Object.entries(storedAthleteFavorites).forEach(([athleteId, isFavorite]) => {
    if (!isFavorite) return;
    favoriteAthleteIds.add(athleteId);
    const athlete = getAthleteById(athleteId);
    getAthleteSports(athlete).forEach((sport) => {
      if (sport) favoriteSports.add(sport);
    });
  });

  return {
    favoriteSports,
    favoriteTeamIds,
    favoriteAthleteIds,
  };
}

function getEventInterestAffinity(event, context) {
  if (!event || !context) return 0;
  let score = 0;
  if (context.favoriteSports.has(event.sport)) {
    score += 1;
  }
  const teamsForEvent = getTeamsForEvent(event.id);
  if (teamsForEvent.some((team) => context.favoriteTeamIds.has(team.id))) {
    score += 1.2;
  }
  const participants = getEventParticipants(event.id);
  if (participants.some((athlete) => context.favoriteAthleteIds.has(athlete.id))) {
    score += 1.2;
  }
  if (isInWatchlist(event.id)) {
    score += 0.4;
  }
  return score;
}

function getEventCommentLikeTotal(event) {
  if (!event) return 0;
  return getCommentsForEvent(event.id)
    .reduce((total, comment) => total + getCommentTotalLikes(comment), 0);
}

function getMostAwaitedEventsNextMonth(limit = 8) {
  const now = new Date();
  const from = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const to = new Date(now.getFullYear(), now.getMonth() + 2, 1);
  const context = getFeedInterestContext();
  return events
    .filter((event) => {
      const date = parseEventDateTime(event);
      if (!date) return false;
      if (!isUpcoming(event, now)) return false;
      return date >= from && date < to;
    })
    .map((event) => {
      const interest = getEventInterestAffinity(event, context);
      const score = getWatchlistCount(event) + ((event.communityScore || 0) * 120) + (interest * 950);
      return { event, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.max(0, limit))
    .map((entry) => entry.event);
}

function getMostAwaitedEventsNext7Days(limit = 8) {
  const now = new Date();
  const to = new Date(now.getTime() + (7 * 24 * 60 * 60 * 1000));
  const context = getFeedInterestContext();
  return events
    .filter((event) => {
      const date = parseEventDateTime(event);
      if (!date) return false;
      if (!isUpcoming(event, now)) return false;
      return date >= now && date <= to;
    })
    .map((event) => {
      const interest = getEventInterestAffinity(event, context);
      const score = getWatchlistCount(event) + ((event.communityScore || 0) * 120) + (interest * 1000);
      return { event, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.max(0, limit))
    .map((entry) => entry.event);
}

function getStandoutPastEvents(limit = 8) {
  const now = new Date();
  const context = getFeedInterestContext();
  return events
    .filter((event) => !isUpcoming(event, now))
    .map((event) => {
      const interest = getEventInterestAffinity(event, context);
      const commentLikes = getEventCommentLikeTotal(event);
      const commentCount = getCommentsForEvent(event.id).length;
      const score = (commentLikes * 3) + (commentCount * 40) + ((event.communityScore || 0) * 130) + (interest * 900);
      return { event, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.max(0, limit))
    .map((entry) => entry.event);
}

function getBestEventsLast7Days(limit = 8) {
  const now = new Date();
  const from = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
  const context = getFeedInterestContext();
  return events
    .filter((event) => {
      const date = parseEventDateTime(event);
      if (!date) return false;
      if (isUpcoming(event, now)) return false;
      return date >= from && date <= now;
    })
    .map((event) => {
      const interest = getEventInterestAffinity(event, context);
      const commentLikes = getEventCommentLikeTotal(event);
      const score = ((event.communityScore || 0) * 160) + (commentLikes * 2) + (interest * 1000);
      return { event, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.max(0, limit))
    .map((entry) => entry.event);
}

function getTopFollowSuggestions(limit = 8) {
  const followedIds = new Set(getFollowedUserIds());
  const sessionUserId = users[0]?.id || "";
  return users
    .filter((user) => user.id !== sessionUserId && !followedIds.has(user.id))
    .slice()
    .sort((a, b) => {
      const followersDiff = getFollowersCount(b.id) - getFollowersCount(a.id);
      if (followersDiff !== 0) return followersDiff;
      return String(a.name || "").localeCompare(String(b.name || ""));
    })
    .slice(0, Math.max(0, limit));
}

function normalizeLegacyFeedModeToken(mode) {
  const raw = String(mode || "").trim().toLowerCase();
  if (!raw) return "";
  if (raw === "tailored") return FEED_MODE_FOR_YOU;
  if (raw === "chrono") return FEED_MODE_RECENT;
  return raw;
}

function normalizeFeedMode(mode) {
  const safeMode = normalizeLegacyFeedModeToken(mode);
  const allowed = new Set([
    FEED_MODE_FOR_YOU,
    FEED_MODE_RECENT,
    FEED_MODE_FAVORITES,
    FEED_MODE_ACTIVITY_RECENT,
    FEED_MODE_ACTIVITY_POPULAR,
    FEED_MODE_POPULAR,
  ]);
  return allowed.has(safeMode) ? safeMode : FEED_MODE_FOR_YOU;
}

function normalizeMyFeedMode(mode) {
  const safeMode = normalizeLegacyFeedModeToken(mode);
  return FEED_ALLOWED_MY_MODES.has(safeMode) ? safeMode : FEED_MODE_FOR_YOU;
}

function normalizeObjectFeedMode(mode) {
  const safeMode = normalizeLegacyFeedModeToken(mode);
  return FEED_ALLOWED_OBJECT_MODES.has(safeMode) ? safeMode : FEED_MODE_RECENT;
}

function buildOptionalFeedTabId(targetType, targetId) {
  return `object:${String(targetType || "").trim().toLowerCase()}:${String(targetId || "").trim()}`;
}

function doesFeedTargetExist(targetType, targetId) {
  const safeType = String(targetType || "").trim().toLowerCase();
  const safeTargetId = String(targetId || "").trim();
  if (!safeTargetId || !FEED_ALLOWED_TARGET_TYPES.has(safeType)) return false;
  if (safeType === FEED_TARGET_EVENT) return events.some((item) => item.id === safeTargetId);
  if (safeType === FEED_TARGET_USER) return Boolean(getUserById(safeTargetId));
  if (safeType === FEED_TARGET_LEAGUE) return Boolean(getLeagueRootById(safeTargetId));
  if (safeType === FEED_TARGET_LEAGUE_SEASON) return Boolean(getLeagueSeasonById(safeTargetId));
  if (safeType === FEED_TARGET_ATHLETE) return Boolean(getAthleteById(safeTargetId));
  if (safeType === FEED_TARGET_TEAM) return Boolean(getTeamById(safeTargetId));
  return false;
}

function getOptionalFeedTabDefaultLabel(targetType, targetId) {
  const meta = getObjectTargetMeta(targetType, targetId);
  const subtitle = String(meta?.subtitle || "").trim();
  if (subtitle) return subtitle;
  const fallbackByType = {
    [FEED_TARGET_EVENT]: "Événement",
    [FEED_TARGET_USER]: "Profil",
    [FEED_TARGET_LEAGUE]: "Compétition",
    [FEED_TARGET_LEAGUE_SEASON]: "Saison",
    [FEED_TARGET_ATHLETE]: "Sportif",
    [FEED_TARGET_TEAM]: "Équipe",
  };
  return fallbackByType[targetType] || "Feed";
}

function normalizeOptionalFeedTabEntry(raw) {
  if (!raw || typeof raw !== "object") return null;
  const targetTypeRaw = String(raw.targetType || "").trim().toLowerCase();
  const targetType = targetTypeRaw === "player" ? FEED_TARGET_ATHLETE : targetTypeRaw;
  const targetId = String(raw.targetId || "").trim();
  if (!FEED_ALLOWED_TARGET_TYPES.has(targetType) || !targetId) return null;
  if (!doesFeedTargetExist(targetType, targetId)) return null;
  const tabId = buildOptionalFeedTabId(targetType, targetId);
  const normalizedMode = normalizeObjectFeedMode(raw.mode || FEED_MODE_RECENT);
  const normalizedLabel = String(raw.label || "").trim() || getOptionalFeedTabDefaultLabel(targetType, targetId);
  const createdAt = Number(raw.createdAt || 0);
  return {
    id: tabId,
    targetType,
    targetId,
    label: normalizedLabel.slice(0, 80),
    mode: normalizedMode,
    createdAt: createdAt > 0 ? Math.round(createdAt) : Date.now(),
  };
}

function normalizeOptionalFeedTabs(list) {
  const input = Array.isArray(list) ? list : [];
  const byId = new Map();
  input.forEach((entry) => {
    const normalized = normalizeOptionalFeedTabEntry(entry);
    if (!normalized) return;
    const previous = byId.get(normalized.id);
    if (!previous || Number(normalized.createdAt || 0) >= Number(previous.createdAt || 0)) {
      byId.set(normalized.id, normalized);
    }
  });
  const normalizedList = Array.from(byId.values())
    .sort((a, b) => {
      const timeDiff = Number(a.createdAt || 0) - Number(b.createdAt || 0);
      if (timeDiff !== 0) return timeDiff;
      return String(a.id || "").localeCompare(String(b.id || ""));
    });
  const maxTabs = 12;
  return normalizedList.length > maxTabs
    ? normalizedList.slice(normalizedList.length - maxTabs)
    : normalizedList;
}

function loadOptionalFeedTabs() {
  const parsed = parseStorageArray(FEED_OPTIONAL_TABS_STORAGE_KEY, []);
  return normalizeOptionalFeedTabs(parsed);
}

function saveOptionalFeedTabs(list) {
  const normalized = normalizeOptionalFeedTabs(list);
  storedOptionalFeedTabs = normalized;
  safeStorageSetItem(FEED_OPTIONAL_TABS_STORAGE_KEY, JSON.stringify(normalized));
  return normalized;
}

function upsertOptionalFeedTab(request, labelOverride = "") {
  const normalizedRequest = normalizeFeedRequest(request);
  if (normalizedRequest.scope !== FEED_SCOPE_OBJECT) return storedOptionalFeedTabs.slice();
  const tabId = buildOptionalFeedTabId(normalizedRequest.targetType, normalizedRequest.targetId);
  const existingIndex = storedOptionalFeedTabs.findIndex((tab) => tab.id === tabId);
  const fallbackLabel = getOptionalFeedTabDefaultLabel(normalizedRequest.targetType, normalizedRequest.targetId);
  const finalLabel = String(labelOverride || "").trim() || fallbackLabel;
  const nextMode = normalizeObjectFeedMode(normalizedRequest.mode);
  const nextList = storedOptionalFeedTabs.slice();
  if (existingIndex >= 0) {
    const current = nextList[existingIndex];
    nextList[existingIndex] = {
      ...current,
      label: finalLabel,
      mode: nextMode,
      targetType: normalizedRequest.targetType,
      targetId: normalizedRequest.targetId,
    };
  } else {
    nextList.push({
      id: tabId,
      targetType: normalizedRequest.targetType,
      targetId: normalizedRequest.targetId,
      label: finalLabel,
      mode: nextMode,
      createdAt: Date.now(),
    });
  }
  return saveOptionalFeedTabs(nextList);
}

function removeOptionalFeedTab(tabId) {
  const safeId = String(tabId || "").trim();
  if (!safeId) return storedOptionalFeedTabs.slice();
  const next = storedOptionalFeedTabs.filter((tab) => tab.id !== safeId);
  return saveOptionalFeedTabs(next);
}

function isOptionalFeedRequest(request) {
  const normalized = normalizeFeedRequest(request);
  if (normalized.scope !== FEED_SCOPE_OBJECT) return false;
  const tabId = buildOptionalFeedTabId(normalized.targetType, normalized.targetId);
  return storedOptionalFeedTabs.some((tab) => tab.id === tabId);
}

function getOptionalFeedTabForRequest(request) {
  const normalized = normalizeFeedRequest(request);
  if (normalized.scope !== FEED_SCOPE_OBJECT) return null;
  const tabId = buildOptionalFeedTabId(normalized.targetType, normalized.targetId);
  return storedOptionalFeedTabs.find((tab) => tab.id === tabId) || null;
}

function setOptionalFeedTabMode(tabId, mode) {
  const safeId = String(tabId || "").trim();
  if (!safeId) return storedOptionalFeedTabs.slice();
  const safeMode = normalizeObjectFeedMode(mode);
  const next = storedOptionalFeedTabs.map((tab) => (
    tab.id === safeId ? { ...tab, mode: safeMode } : tab
  ));
  return saveOptionalFeedTabs(next);
}

function buildObjectFeedAddButton(request) {
  const normalized = normalizeFeedRequest(request);
  if (normalized.scope !== FEED_SCOPE_OBJECT) return "";
  const label = getOptionalFeedTabDefaultLabel(normalized.targetType, normalized.targetId);
  const labelAttr = escapeHtml(label);
  const targetTypeAttr = escapeHtml(normalized.targetType);
  const targetIdAttr = escapeHtml(normalized.targetId);
  const targetModeAttr = escapeHtml(normalizeObjectFeedMode(normalized.mode));
  if (isOptionalFeedRequest(normalized)) {
    return `
      <button class="ghost small feed-optional-add-btn is-added" type="button" disabled aria-label="Feed déjà ajouté à Mon Feed" title="Feed déjà ajouté à Mon Feed">
        Ajouté
      </button>
    `;
  }
  return `
    <button
      class="ghost small feed-optional-add-btn"
      type="button"
      data-feed-optional-add
      data-target-type="${targetTypeAttr}"
      data-target-id="${targetIdAttr}"
      data-target-mode="${targetModeAttr}"
      data-target-label="${labelAttr}"
      aria-label="Ajouter ce feed à Mon Feed"
      title="Ajouter ce feed à Mon Feed"
    >+</button>
  `;
}

function renderObjectFeedAddButton(request) {
  if (!objectFeedAddActionEl) return;
  objectFeedAddActionEl.innerHTML = buildObjectFeedAddButton(request);
}

function isFeedFavoritesRoute(pathname = window.location.pathname) {
  const safePath = String(pathname || "").toLowerCase();
  return safePath.endsWith("/feed-favorites.html") || safePath.endsWith("feed-favorites.html");
}

function loadFeedMode() {
  const stored = safeStorageGetItem(FEED_MODE_STORAGE_KEY, FEED_MODE_FOR_YOU);
  const safe = normalizeMyFeedMode(stored);
  return safe || FEED_MODE_FOR_YOU;
}

function saveFeedMode(mode) {
  const safeMode = normalizeMyFeedMode(mode);
  const storable = FEED_ALLOWED_MY_MODES.has(safeMode) ? safeMode : FEED_MODE_FOR_YOU;
  safeStorageSetItem(FEED_MODE_STORAGE_KEY, storable);
}

function parseFeedRequestFromLocation(searchParams) {
  const params = searchParams instanceof URLSearchParams ? searchParams : new URLSearchParams(window.location.search);
  const modeToken = params.get("mode") || params.get("feedMode") || "";
  const scope = String(params.get("scope") || "").trim();
  const mode = normalizeLegacyFeedModeToken(modeToken);
  const rawTargetType = String(params.get("targetType") || "").trim().toLowerCase();
  const targetType = rawTargetType === "player" ? FEED_TARGET_ATHLETE : rawTargetType;
  const targetId = String(params.get("targetId") || "").trim();
  return normalizeFeedRequest({
    scope,
    mode,
    targetType,
    targetId,
  });
}

function normalizeFeedRequest(request = {}) {
  const safeScope = String(request.scope || "").trim().toLowerCase();
  const safeMode = normalizeLegacyFeedModeToken(request.mode || "");
  const safeTargetTypeRaw = String(request.targetType || "").trim().toLowerCase();
  const safeTargetType = safeTargetTypeRaw === "player" ? FEED_TARGET_ATHLETE : safeTargetTypeRaw;
  const safeTargetId = String(request.targetId || "").trim();

  if (safeScope === FEED_SCOPE_OBJECT) {
    if (!FEED_ALLOWED_TARGET_TYPES.has(safeTargetType) || !safeTargetId) {
      return {
        scope: FEED_SCOPE_MY,
        mode: FEED_MODE_FOR_YOU,
      };
    }
    return {
      scope: FEED_SCOPE_OBJECT,
      mode: FEED_ALLOWED_OBJECT_MODES.has(safeMode) ? safeMode : FEED_MODE_RECENT,
      targetType: safeTargetType,
      targetId: safeTargetId,
    };
  }

  return {
    scope: FEED_SCOPE_MY,
    mode: FEED_ALLOWED_MY_MODES.has(safeMode) ? safeMode : FEED_MODE_FOR_YOU,
  };
}

function getObjectFeedModeFromLocation(defaultMode = FEED_MODE_RECENT) {
  const params = new URLSearchParams(window.location.search);
  const modeToken = params.get("mode") || params.get("feedMode") || "";
  const mode = normalizeLegacyFeedModeToken(modeToken);
  return FEED_ALLOWED_OBJECT_MODES.has(mode) ? mode : defaultMode;
}

function buildFeedQueryString(request = {}) {
  const normalized = normalizeFeedRequest(request);
  const params = new URLSearchParams();
  params.set("scope", normalized.scope);
  params.set("mode", normalized.mode);
  if (normalized.scope === FEED_SCOPE_OBJECT) {
    params.set("targetType", normalized.targetType);
    params.set("targetId", normalized.targetId);
  }
  return params.toString();
}

function updateLocationWithFeedRequest(request = {}, options = {}) {
  const { keepExistingParams = false } = options;
  const normalized = normalizeFeedRequest(request);
  const current = new URL(window.location.href);
  const nextParams = keepExistingParams ? new URLSearchParams(current.search) : new URLSearchParams();
  nextParams.set("scope", normalized.scope);
  nextParams.set("mode", normalized.mode);
  if (normalized.scope === FEED_SCOPE_OBJECT) {
    nextParams.set("targetType", normalized.targetType);
    nextParams.set("targetId", normalized.targetId);
  } else {
    nextParams.delete("targetType");
    nextParams.delete("targetId");
  }
  if (nextParams.get("feedMode")) {
    nextParams.delete("feedMode");
  }
  const nextUrl = `${current.pathname}?${nextParams.toString()}${current.hash || ""}`;
  window.history.replaceState({}, "", nextUrl);
}

function updateLocationWithObjectFeedMode(mode) {
  const current = new URL(window.location.href);
  const params = new URLSearchParams(current.search);
  params.set("mode", normalizeObjectFeedMode(mode));
  params.delete("feedMode");
  const nextUrl = `${current.pathname}?${params.toString()}${current.hash || ""}`;
  window.history.replaceState({}, "", nextUrl);
}

function buildFeedModeSwitch(request = { scope: FEED_SCOPE_MY, mode: FEED_MODE_FOR_YOU }, options = {}) {
  const normalized = normalizeFeedRequest(request);
  const {
    isMainFeedSurface = false,
    optionalTabs = storedOptionalFeedTabs,
  } = options;
  const resolvedOptionalTabs = normalizeOptionalFeedTabs(optionalTabs);
  const isObjectScope = normalized.scope === FEED_SCOPE_OBJECT;
  if (isObjectScope && !isMainFeedSurface) {
    return `
      <div class="calendar-mode-switch feed-mode-switch" data-feed-scope="${FEED_SCOPE_OBJECT}" role="group" aria-label="Mode du feed objet">
        <button class="calendar-mode-btn feed-mode-btn ${normalized.mode === FEED_MODE_RECENT ? "is-active" : ""}" type="button" data-feed-mode="${FEED_MODE_RECENT}">Chrono</button>
        <button class="calendar-mode-btn feed-mode-btn ${normalized.mode === FEED_MODE_POPULAR ? "is-active" : ""}" type="button" data-feed-mode="${FEED_MODE_POPULAR}">Populaires</button>
      </div>
    `;
  }
  const optionalTabsMarkup = isMainFeedSurface && resolvedOptionalTabs.length
    ? `
      <span class="feed-mode-optional-separator" aria-hidden="true"></span>
      <span class="feed-mode-optional-label">Complémentaires</span>
      ${resolvedOptionalTabs.map((tab) => {
    const isActive = isObjectScope
      && normalized.targetType === tab.targetType
      && normalized.targetId === tab.targetId;
    const safeLabel = escapeHtml(tab.label || getOptionalFeedTabDefaultLabel(tab.targetType, tab.targetId));
    const safeTargetType = escapeHtml(tab.targetType);
    const safeTargetId = escapeHtml(tab.targetId);
    const safeMode = escapeHtml(normalizeObjectFeedMode(tab.mode || FEED_MODE_RECENT));
    const safeTabId = escapeHtml(tab.id);
    return `
        <span class="feed-mode-optional-tab ${isActive ? "is-active" : ""}">
          <button
            class="calendar-mode-btn feed-mode-btn feed-mode-btn-optional ${isActive ? "is-active" : ""}"
            type="button"
            data-feed-optional-open
            data-target-type="${safeTargetType}"
            data-target-id="${safeTargetId}"
            data-target-mode="${safeMode}"
            title="${safeLabel}"
          >${safeLabel}</button>
          <button
            class="feed-mode-optional-remove-btn"
            type="button"
            data-feed-optional-remove
            data-tab-id="${safeTabId}"
            aria-label="Supprimer ce feed complémentaire"
            title="Supprimer ce feed complémentaire"
          >×</button>
        </span>
      `;
  }).join("")}
    `
    : "";
  const isActivityMode = normalized.mode === FEED_MODE_ACTIVITY_RECENT || normalized.mode === FEED_MODE_ACTIVITY_POPULAR;
  const showObjectSubSwitch = isMainFeedSurface && isObjectScope;
  return `
    <div class="feed-mode-switch-stack">
      <div class="calendar-mode-switch feed-mode-switch" data-feed-scope="${FEED_SCOPE_MY}" role="group" aria-label="Mode du feed">
        <button class="calendar-mode-btn feed-mode-btn ${!isObjectScope && normalized.mode === FEED_MODE_FOR_YOU ? "is-active" : ""}" type="button" data-feed-mode="${FEED_MODE_FOR_YOU}">Pour toi</button>
        <button class="calendar-mode-btn feed-mode-btn ${!isObjectScope && normalized.mode === FEED_MODE_RECENT ? "is-active" : ""}" type="button" data-feed-mode="${FEED_MODE_RECENT}">Récent</button>
        <button class="calendar-mode-btn feed-mode-btn ${!isObjectScope && normalized.mode === FEED_MODE_FAVORITES ? "is-active" : ""}" type="button" data-feed-mode="${FEED_MODE_FAVORITES}">Mes favoris</button>
        <button class="calendar-mode-btn feed-mode-btn ${!isObjectScope && isActivityMode ? "is-active" : ""}" type="button" data-feed-mode="${FEED_MODE_ACTIVITY_RECENT}">Mes activités</button>
        ${optionalTabsMarkup}
      </div>
      ${showObjectSubSwitch ? `
        <div class="calendar-mode-switch feed-mode-switch-sub" data-feed-scope="${FEED_SCOPE_OBJECT}" role="group" aria-label="Mode feed complémentaire">
          <button class="calendar-mode-btn feed-mode-btn ${normalized.mode === FEED_MODE_RECENT ? "is-active" : ""}" type="button" data-feed-mode="${FEED_MODE_RECENT}">Chrono</button>
          <button class="calendar-mode-btn feed-mode-btn ${normalized.mode === FEED_MODE_POPULAR ? "is-active" : ""}" type="button" data-feed-mode="${FEED_MODE_POPULAR}">Populaires</button>
        </div>
      ` : isActivityMode ? `
        <div class="calendar-mode-switch feed-mode-switch-sub" data-feed-scope="${FEED_SCOPE_MY}" role="group" aria-label="Mode activités">
          <button class="calendar-mode-btn feed-mode-btn ${normalized.mode === FEED_MODE_ACTIVITY_RECENT ? "is-active" : ""}" type="button" data-feed-mode="${FEED_MODE_ACTIVITY_RECENT}">Chrono</button>
          <button class="calendar-mode-btn feed-mode-btn ${normalized.mode === FEED_MODE_ACTIVITY_POPULAR ? "is-active" : ""}" type="button" data-feed-mode="${FEED_MODE_ACTIVITY_POPULAR}">Populaires</button>
        </div>
      ` : ""}
    </div>
  `;
}

function renderFeedModeSwitch(request = { scope: FEED_SCOPE_MY, mode: FEED_MODE_FOR_YOU }, mount = feedModeSwitchEl, options = {}) {
  if (!mount) return;
  mount.innerHTML = buildFeedModeSwitch(request, options);
}

function sortFeedCommentsByRecent(list) {
  return (Array.isArray(list) ? list.slice() : [])
    .sort((a, b) => {
      const timeDiff = getFeedCommentTimestamp(b) - getFeedCommentTimestamp(a);
      if (timeDiff !== 0) return timeDiff;
      const likesDiff = getCommentTotalLikes(b) - getCommentTotalLikes(a);
      if (likesDiff !== 0) return likesDiff;
      return String(a.id || "").localeCompare(String(b.id || ""));
    });
}

function sortFeedCommentSignalsByRecent(list) {
  return (Array.isArray(list) ? list.slice() : [])
    .sort((a, b) => {
      const timeDiff = getFeedCommentTimestamp(b?.comment) - getFeedCommentTimestamp(a?.comment);
      if (timeDiff !== 0) return timeDiff;
      const likesDiff = getCommentTotalLikes(b?.comment) - getCommentTotalLikes(a?.comment);
      if (likesDiff !== 0) return likesDiff;
      return String(a?.comment?.id || "").localeCompare(String(b?.comment?.id || ""));
    });
}

function getFeedEventTimestamp(event) {
  const parsed = parseEventDateTime(event);
  return parsed ? parsed.getTime() : 0;
}

function getListFreshnessTimestamp(list) {
  if (!list) return 0;
  const timestamps = [];
  getListItems(list).forEach((item) => {
    if (item.event) {
      const eventTimestamp = getFeedEventTimestamp(item.event);
      if (eventTimestamp > 0) timestamps.push(eventTimestamp);
    } else if (item.athlete) {
      getAthleteEvents(item.athlete.id).forEach((event) => {
        const eventTimestamp = getFeedEventTimestamp(event);
        if (eventTimestamp > 0) timestamps.push(eventTimestamp);
      });
    }
  });
  return timestamps.length ? Math.max(...timestamps) : 0;
}

function getRecentAdaptedListAffinity(list, favoriteSports = [], followedIds = new Set()) {
  const sportAffinity = getListSportAffinity(list, favoriteSports);
  const followAffinity = followedIds.has(list?.ownerId) ? 1 : 0;
  return (0.7 * sportAffinity) + (0.3 * followAffinity);
}

function sortRankingsByFreshness(list, options = {}) {
  const {
    includeAffinity = false,
  } = options;
  const favoriteSports = includeAffinity ? getFavoriteSports() : [];
  const followedIds = includeAffinity ? new Set(getFollowedUserIds()) : new Set();

  return (Array.isArray(list) ? list.slice() : [])
    .sort((a, b) => {
      const freshnessDiff = getListFreshnessTimestamp(b) - getListFreshnessTimestamp(a);
      if (freshnessDiff !== 0) return freshnessDiff;
      if (includeAffinity) {
        const affinityDiff = getRecentAdaptedListAffinity(b, favoriteSports, followedIds) - getRecentAdaptedListAffinity(a, favoriteSports, followedIds);
        if (Math.abs(affinityDiff) > 0.0001) return affinityDiff;
      }
      const likeDiff = getListLikeScore(b) - getListLikeScore(a);
      if (likeDiff !== 0) return likeDiff;
      return String(a.title || "").localeCompare(String(b.title || ""));
    });
}

function sortUpcomingFeedEventsByTime(list) {
  const context = getFeedInterestContext();
  return (Array.isArray(list) ? list.slice() : [])
    .sort((a, b) => {
      const timeDiff = getFeedEventTimestamp(a) - getFeedEventTimestamp(b);
      if (timeDiff !== 0) return timeDiff;
      const interestDiff = getEventInterestAffinity(b, context) - getEventInterestAffinity(a, context);
      if (interestDiff !== 0) return interestDiff;
      const watchlistDiff = getWatchlistCount(b) - getWatchlistCount(a);
      if (watchlistDiff !== 0) return watchlistDiff;
      const scoreDiff = (b.communityScore || 0) - (a.communityScore || 0);
      if (scoreDiff !== 0) return scoreDiff;
      return String(a.title || "").localeCompare(String(b.title || ""));
    });
}

function sortPastFeedEventsByTime(list) {
  const context = getFeedInterestContext();
  return (Array.isArray(list) ? list.slice() : [])
    .sort((a, b) => {
      const timeDiff = getFeedEventTimestamp(b) - getFeedEventTimestamp(a);
      if (timeDiff !== 0) return timeDiff;
      const interestDiff = getEventInterestAffinity(b, context) - getEventInterestAffinity(a, context);
      if (interestDiff !== 0) return interestDiff;
      const commentsDiff = getEventCommentLikeTotal(b) - getEventCommentLikeTotal(a);
      if (commentsDiff !== 0) return commentsDiff;
      const scoreDiff = (b.communityScore || 0) - (a.communityScore || 0);
      if (scoreDiff !== 0) return scoreDiff;
      return String(a.title || "").localeCompare(String(b.title || ""));
    });
}

function getUserLatestCommentTimestamp(userId) {
  return genericCommentSamples.reduce((max, comment) => {
    if (comment.userId !== userId) return max;
    return Math.max(max, getFeedCommentTimestamp(comment));
  }, 0);
}

function sortUsersByRecentActivity(list) {
  return (Array.isArray(list) ? list.slice() : [])
    .sort((a, b) => {
      const activityDiff = getUserLatestCommentTimestamp(b.id) - getUserLatestCommentTimestamp(a.id);
      if (activityDiff !== 0) return activityDiff;
      const followersDiff = getFollowersCount(b.id) - getFollowersCount(a.id);
      if (followersDiff !== 0) return followersDiff;
      return String(a.name || "").localeCompare(String(b.name || ""));
    });
}

function buildFeedDataForYou() {
  return {
    topLikedComments: getTopLikedComments(24),
    followingComments: getCommentsFromFollowedUsers(16),
    followedLikedSignals: getSimulatedFollowedLikedCommentSignals(16),
    followedRepostSignals: getSimulatedFollowedRepostCommentSignals(12),
    topLikedRankings: getTopLikedRankings(8),
    adaptedRankings: getAdaptedRankings(8),
    mostAwaitedNextMonthEvents: getMostAwaitedEventsNextMonth(8),
    mostAwaitedNext7DaysEvents: getMostAwaitedEventsNext7Days(8),
    standoutPastEvents: getStandoutPastEvents(8),
    bestLast7DaysEvents: getBestEventsLast7Days(8),
    topFollowSuggestions: getTopFollowSuggestions(8),
  };
}

function buildFeedDataRecent() {
  const now = new Date();
  const nowTs = now.getTime();
  const next7DaysTs = nowTs + (7 * 24 * 60 * 60 * 1000);
  const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1).getTime();
  const nextMonthEnd = new Date(now.getFullYear(), now.getMonth() + 2, 1).getTime();

  const upcomingEventsByTime = events
    .filter((event) => {
      const ts = getFeedEventTimestamp(event);
      return ts > 0 && isUpcoming(event, now);
    })
    .slice()
    .sort((a, b) => {
      const timeDiff = getFeedEventTimestamp(a) - getFeedEventTimestamp(b);
      if (timeDiff !== 0) return timeDiff;
      return String(a.title || "").localeCompare(String(b.title || ""));
    });

  const pastEventsByTime = events
    .filter((event) => {
      const ts = getFeedEventTimestamp(event);
      return ts > 0 && !isUpcoming(event, now);
    })
    .slice()
    .sort((a, b) => {
      const timeDiff = getFeedEventTimestamp(b) - getFeedEventTimestamp(a);
      if (timeDiff !== 0) return timeDiff;
      return String(a.title || "").localeCompare(String(b.title || ""));
    });

  const mostAwaitedNextMonthEvents = upcomingEventsByTime
    .filter((event) => {
      const ts = getFeedEventTimestamp(event);
      return ts >= nextMonthStart && ts < nextMonthEnd;
    })
    .slice(0, 8);

  const mostAwaitedNext7DaysEvents = upcomingEventsByTime
    .filter((event) => {
      const ts = getFeedEventTimestamp(event);
      return ts >= nowTs && ts <= next7DaysTs;
    })
    .slice(0, 8);

  const bestLast7DaysEvents = pastEventsByTime
    .filter((event) => {
      const ts = getFeedEventTimestamp(event);
      return ts >= (nowTs - (7 * 24 * 60 * 60 * 1000));
    })
    .slice(0, 8);

  const globalRecentComments = sortFeedCommentsByRecent(genericCommentSamples).slice(0, 36);
  return {
    topLikedComments: globalRecentComments,
    followingComments: [],
    followedLikedSignals: [],
    followedRepostSignals: [],
    topLikedRankings: sortRankingsByFreshness(curatedLists).slice(0, 8),
    adaptedRankings: [],
    mostAwaitedNextMonthEvents,
    mostAwaitedNext7DaysEvents,
    standoutPastEvents: pastEventsByTime.slice(0, 8),
    bestLast7DaysEvents: bestLast7DaysEvents.length ? bestLast7DaysEvents : pastEventsByTime.slice(0, 8),
    topFollowSuggestions: sortUsersByRecentActivity(users).slice(0, 8),
  };
}

function buildFeedData(mode = FEED_MODE_FOR_YOU) {
  const safeMode = normalizeFeedMode(mode);
  return safeMode === FEED_MODE_RECENT ? buildFeedDataRecent() : buildFeedDataForYou();
}

function buildFeedIntroCardMarkup(mode = FEED_MODE_FOR_YOU) {
  const safeMode = normalizeFeedMode(mode);
  const subtitle = safeMode === FEED_MODE_RECENT
    ? "Mode Récent: flux chronologique générique (sans personnalisation)."
    : "Mode Pour toi: personnalisation sociale + popularité + affinité intérêts.";
  const strategyLines = safeMode === FEED_MODE_RECENT
    ? `
      <li>Le temps est prioritaire: les commentaires les plus récents remontent d'abord.</li>
      <li>Aucun boost personnalisé: ordre chrono avant tout.</li>
      <li>Les cards sont triées par fraîcheur globale des contenus.</li>
    `
    : `
      <li>Les commentaires sont prioritaires: tendance, comptes suivis, likes et reposts des personnes suivies.</li>
      <li>Chaque item affiche son origine en tête pour expliquer pourquoi il remonte dans votre feed.</li>
      <li>Les cards events sont calibrées par vos intérêts (sports, équipes, joueurs favoris) sur des fenêtrès temporelles claires.</li>
    `;
  const contentCard = buildFrameElement(`
    <h2>Comment ce feed est calibré</h2>
    <p>${subtitle}</p>
    <ul class="feed-intro-list">
      ${strategyLines}
    </ul>
    <p class="feed-intro-calibration">Calibration ajustable: mix social / popularité / affinité selon vos usages futurs.</p>
  `, {
    className: "feed-intro-card",
    hoverable: false,
    shadowAtRest: true,
    shadowValue: "var(--gum-shadow-hard)",
  });
  return `
    <details class="feed-intro-help">
      <summary class="feed-intro-help-summary" aria-label="Afficher comment ce feed est calibré">
        <span class="feed-intro-help-icon" aria-hidden="true">?</span>
      </summary>
      <div class="feed-intro-help-content">
        ${contentCard}
      </div>
    </details>
  `;
}

function buildFeedCommentCardMarkup(comment, options = {}) {
  const {
    compact = false,
    className = "",
    showFollowButton = true,
  } = options;
  const hasEventPage = Boolean(events.find((event) => event.id === comment?.eventId));
  const safeComment = {
    ...comment,
    replies: Array.isArray(comment?.replies) ? comment.replies.slice(0, 2) : [],
  };
  return buildUnifiedCommentCard(safeComment, {
    mode: getCommentType(comment) === "critique" ? "review" : "comment",
    eventId: comment?.eventId,
    eventName: hasEventPage ? "Y" : "N",
    showFollowButton,
    showReplyAction: false,
    showReplyComposer: false,
    showReplies: false,
    compact,
    className,
  });
}

function buildFeedReplyFavoriteCardMarkup(reply, eventId, options = {}) {
  const {
    className = "feed-editorial-comment",
  } = options;
  const safeReply = {
    ...reply,
    replies: [],
  };
  return buildUnifiedCommentCard(safeReply, {
    mode: "comment",
    eventId,
    eventName: "Y",
    showFollowButton: true,
    showReplyAction: false,
    showReplyComposer: false,
    showReplies: false,
    className,
  });
}

function buildFavoritesFeedEntries(mode = FEED_MODE_FOR_YOU) {
  normalizeFeedMode(mode);
  const entryMap = new Map();
  const upsert = (entry) => {
    if (!entry || !entry.key) return;
    const existing = entryMap.get(entry.key);
    if (!existing || Number(entry.timestamp || 0) > Number(existing.timestamp || 0)) {
      entryMap.set(entry.key, entry);
    }
  };

  Object.entries(storedReviewLikes).forEach(([reviewId, liked]) => {
    if (!liked) return;
    const review = getCommentObject(reviewId);
    if (!review || !review.eventId) return;
    const timestamp = getFavoriteActionTimestamp("review", reviewId) || getFallbackFavoriteTimestamp("review", reviewId);
    upsert({
      type: "comment",
      key: `favorite-review-${reviewId}`,
      timestamp,
      origin: { type: "favorite-review-like" },
      comment: review,
      markup: buildFeedCommentCardMarkup(review, {
        compact: false,
        className: "feed-editorial-comment",
        showFollowButton: true,
      }),
    });
  });

  Object.entries(storedCommentLikes).forEach(([commentId, liked]) => {
    if (!liked) return;
    const comment = getCommentObject(commentId);
    if (!comment) return;
    const isReply = !comment.eventId && Boolean(comment.parentCommentId);
    if (isReply) {
      const parent = comment.parentCommentId ? getCommentObject(comment.parentCommentId) : null;
      const eventId = parent?.eventId || "";
      if (!eventId) return;
      const timestamp = getFavoriteActionTimestamp("reply", commentId) || getFallbackFavoriteTimestamp("reply", commentId);
      upsert({
        type: "comment",
        key: `favorite-reply-${commentId}`,
        timestamp,
        origin: { type: "favorite-reply-like" },
        comment,
        markup: buildFeedReplyFavoriteCardMarkup(comment, eventId, { className: "feed-editorial-comment" }),
      });
      return;
    }
    if (!comment.eventId) return;
    const timestamp = getFavoriteActionTimestamp("comment", commentId) || getFallbackFavoriteTimestamp("comment", commentId);
    upsert({
      type: "comment",
      key: `favorite-comment-${commentId}`,
      timestamp,
      origin: { type: "favorite-comment-like" },
      comment,
      markup: buildFeedCommentCardMarkup(comment, {
        compact: false,
        className: "feed-editorial-comment",
        showFollowButton: true,
      }),
    });
  });

  Object.entries(storedReplyLikes).forEach(([replyId, liked]) => {
    if (!liked) return;
    const reply = getCommentObject(replyId);
    if (!reply) return;
    const parent = reply.parentCommentId ? getCommentObject(reply.parentCommentId) : null;
    const eventId = parent?.eventId || "";
    if (!eventId) return;
    const timestamp = getFavoriteActionTimestamp("reply", replyId) || getFallbackFavoriteTimestamp("reply", replyId);
    upsert({
      type: "comment",
      key: `favorite-reply-${replyId}`,
      timestamp,
      origin: { type: "favorite-reply-like" },
      comment: reply,
      markup: buildFeedReplyFavoriteCardMarkup(reply, eventId, { className: "feed-editorial-comment" }),
    });
  });

  watchlist.forEach((eventId) => {
    const event = events.find((item) => item.id === eventId);
    if (!event) return;
    const timestamp = getFavoriteActionTimestamp("event", eventId) || getFallbackFavoriteTimestamp("event", eventId);
    upsert({
      type: "card",
      key: `favorite-event-${eventId}`,
      timestamp,
      origin: { type: "favorite-event" },
      event,
      markup: buildEventCard(event, { size: "compact" }),
    });
  });

  Object.entries(storedListLikes).forEach(([listId, liked]) => {
    if (!liked) return;
    const list = curatedLists.find((item) => item.id === listId);
    if (!list) return;
    const timestamp = getFavoriteActionTimestamp("list", listId) || getFallbackFavoriteTimestamp("list", listId);
    upsert({
      type: "card",
      key: `favorite-list-${listId}`,
      timestamp,
      origin: { type: "favorite-ranking" },
      list,
      markup: buildRankingCard(list, { showOwner: true, showFollowButton: false }),
    });
  });

  Object.entries(storedAthleteFavorites).forEach(([athleteId, liked]) => {
    if (!liked) return;
    const athlete = getAthleteById(athleteId);
    if (!athlete) return;
    const timestamp = getFavoriteActionTimestamp("athlete", athleteId) || getFallbackFavoriteTimestamp("athlete", athleteId);
    upsert({
      type: "card",
      key: `favorite-athlete-${athleteId}`,
      timestamp,
      origin: { type: "favorite-athlete" },
      athlete,
      markup: buildPlayerCard(athlete),
    });
  });

  Object.entries(storedTeamFavorites).forEach(([teamId, liked]) => {
    if (!liked) return;
    const team = getTeamById(teamId);
    if (!team) return;
    const timestamp = getFavoriteActionTimestamp("team", teamId) || getFallbackFavoriteTimestamp("team", teamId);
    upsert({
      type: "card",
      key: `favorite-team-${teamId}`,
      timestamp,
      origin: { type: "favorite-team" },
      team,
      markup: buildTeamCard(team),
    });
  });

  Object.entries(storedLeagueFollows).forEach(([leagueId, followed]) => {
    if (!followed) return;
    const league = getLeagueRootById(leagueId);
    if (!league) return;
    const timestamp = getFavoriteActionTimestamp("league", leagueId) || getFallbackFavoriteTimestamp("league", leagueId);
    upsert({
      type: "card",
      key: `favorite-league-${leagueId}`,
      timestamp,
      origin: { type: "favorite-league" },
      league,
      markup: buildLeagueCard(league, { variant: "generic" }),
    });
  });

  Object.entries(storedLeagueSeasonFollows).forEach(([seasonId, followed]) => {
    if (!followed) return;
    const season = getLeagueSeasonById(seasonId);
    if (!season) return;
    const timestamp = getFavoriteActionTimestamp("league-season", seasonId) || getFallbackFavoriteTimestamp("league-season", seasonId);
    upsert({
      type: "card",
      key: `favorite-league-season-${seasonId}`,
      timestamp,
      origin: { type: "favorite-league-season" },
      leagueSeason: season,
      markup: buildLeagueCard(season, { variant: "season" }),
    });
  });

  const entries = Array.from(entryMap.values());
  return entries.sort((a, b) => {
    const timeDiff = Number(b.timestamp || 0) - Number(a.timestamp || 0);
    if (timeDiff !== 0) return timeDiff;
    return String(a.key || "").localeCompare(String(b.key || ""));
  });
}

function buildFavoritesFeedIntroCardMarkup(mode = FEED_MODE_FOR_YOU) {
  normalizeFeedMode(mode);
  const subtitle = "Flux chronologique de vos likes et favoris.";
  const contentCard = buildFrameElement(`
    <h2>Mes favoris</h2>
    <p>${subtitle}</p>
    <ul class="feed-intro-list">
      <li>Commentaires aimés (reviews, commentaires, réponses).</li>
      <li>Événements ajoutés en watchlist.</li>
      <li>Classements, athlètes, équipes, compétitions et saisons suivis/aimés.</li>
    </ul>
    <p class="feed-intro-calibration">Le flux se met à jour automatiquement après chaque action de like/favori.</p>
  `, {
    className: "feed-intro-card",
    hoverable: false,
    shadowAtRest: true,
    shadowValue: "var(--gum-shadow-hard)",
  });
  return `
    <details class="feed-intro-help">
      <summary class="feed-intro-help-summary" aria-label="Afficher les infos de la page Mes favoris">
        <span class="feed-intro-help-icon" aria-hidden="true">?</span>
      </summary>
      <div class="feed-intro-help-content">
        ${contentCard}
      </div>
    </details>
  `;
}

function buildActivityFeedIntroCardMarkup(mode = FEED_MODE_ACTIVITY_RECENT) {
  const safeMode = normalizeFeedMode(mode);
  const subtitle = safeMode === FEED_MODE_ACTIVITY_POPULAR
    ? "Actions personnelles triées par impact social."
    : "Actions personnelles triées chronologiquement.";
  const contentCard = buildFrameElement(`
    <h2>Mes activités</h2>
    <p>${subtitle}</p>
    <ul class="feed-intro-list">
      <li>Likes et favoris (commentaires, événements, classements, équipes, sportifs, compétitions, saisons).</li>
      <li>Suivis utilisateurs.</li>
      <li>Le mode Populaires met en avant les actions avec le plus d'engagement.</li>
    </ul>
    <p class="feed-intro-calibration">Les activités sans timestamp explicite sont classées avec une approximation basée sur la fraîcheur du contenu.</p>
  `, {
    className: "feed-intro-card",
    hoverable: false,
    shadowAtRest: true,
    shadowValue: "var(--gum-shadow-hard)",
  });
  return `
    <details class="feed-intro-help">
      <summary class="feed-intro-help-summary" aria-label="Afficher les infos de la page Mes activités">
        <span class="feed-intro-help-icon" aria-hidden="true">?</span>
      </summary>
      <div class="feed-intro-help-content">
        ${contentCard}
      </div>
    </details>
  `;
}

function buildObjectFeedIntroCardMarkup(payload) {
  const safeTitle = escapeHtml(payload?.title || "Feed objet");
  const safeSubtitle = escapeHtml(payload?.subtitle || "Flux contextualisé.");
  const contentCard = buildFrameElement(`
    <h2>${safeTitle}</h2>
    <p>${safeSubtitle}</p>
    <ul class="feed-intro-list">
      <li>Le feed combine commentaires et cards liées à l'objet courant.</li>
      <li>Mode Chrono: tri par fraîcheur.</li>
      <li>Mode Populaires: tri par engagement (likes, réponses, score communautaire).</li>
    </ul>
    <p class="feed-intro-calibration">Le rendu reprend le même format editorial que le feed principal.</p>
  `, {
    className: "feed-intro-card",
    hoverable: false,
    shadowAtRest: true,
    shadowValue: "var(--gum-shadow-hard)",
  });
  return `
    <details class="feed-intro-help">
      <summary class="feed-intro-help-summary" aria-label="Afficher les infos du feed objet">
        <span class="feed-intro-help-icon" aria-hidden="true">?</span>
      </summary>
      <div class="feed-intro-help-content">
        ${contentCard}
      </div>
    </details>
  `;
}

function buildFeedHelpMarkup(request, payload) {
  normalizeFeedRequest(request);
  void payload;
  return "";
}

function buildEmptyFeedPayload(request, options = {}) {
  const {
    title = "Mon Feed",
    subtitle = "",
  } = options;
  return {
    request: normalizeFeedRequest(request),
    title,
    subtitle,
    topLikedComments: [],
    followingComments: [],
    followedLikedSignals: [],
    followedRepostSignals: [],
    topLikedRankings: [],
    adaptedRankings: [],
    mostAwaitedNextMonthEvents: [],
    mostAwaitedNext7DaysEvents: [],
    standoutPastEvents: [],
    bestLast7DaysEvents: [],
    topFollowSuggestions: [],
    activityItems: [],
  };
}

function buildMyForYouPayload() {
  return {
    ...buildEmptyFeedPayload(
      { scope: FEED_SCOPE_MY, mode: FEED_MODE_FOR_YOU },
      {
        title: "Mon Feed",
        subtitle: "Mode Pour toi · flux personnalisé social + affinité.",
      }
    ),
    ...buildFeedDataForYou(),
  };
}

function buildMyRecentPayload() {
  return {
    ...buildEmptyFeedPayload(
      { scope: FEED_SCOPE_MY, mode: FEED_MODE_RECENT },
      {
        title: "Mon Feed",
        subtitle: "Mode Récent · flux chronologique générique.",
      }
    ),
    ...buildFeedDataRecent(),
  };
}

function buildMyFavoritesEntries() {
  return buildFavoritesFeedEntries(FEED_MODE_FAVORITES);
}

function parseFavoriteTimelineActionKey(key) {
  const safeKey = String(key || "").trim();
  if (!safeKey.includes(":")) return { type: "", id: "" };
  const splitIndex = safeKey.indexOf(":");
  return {
    type: safeKey.slice(0, splitIndex),
    id: safeKey.slice(splitIndex + 1),
  };
}

function getFeedEventPopularityScore(event) {
  if (!event) return 0;
  const score = Number(event.communityScore || 0);
  const watchlistBoost = Number(getWatchlistCount(event) || 0) * 8;
  const commentBoost = Number(getCommentsForEvent(event.id).length || 0) * 12;
  const freshnessBoost = getFeedEventTimestamp(event) / 100000000000;
  return (score * 100) + watchlistBoost + commentBoost + freshnessBoost;
}

function getListPopularityScoreForFeed(list) {
  if (!list) return 0;
  const likes = getListLikeScore(list) * 10;
  const freshness = getListFreshnessTimestamp(list) / 100000000000;
  const items = Number(getListItems(list).length || list.count || 0);
  return likes + freshness + (items * 2);
}

function getCommentPopularityScoreForFeed(comment) {
  if (!comment) return 0;
  const likes = getCommentTotalLikes(comment) * 18;
  const replies = Number((comment.replies || []).length || 0) * 6;
  const freshness = getFeedCommentTimestamp(comment) / 100000000000;
  return likes + replies + freshness;
}

function buildActivityItemFromFavoriteTimeline(type, id, timestamp) {
  if (!type || !id) return null;
  const safeTimestamp = Number(timestamp || 0) || getFallbackFavoriteTimestamp(type, id);
  if (type === "review" || type === "comment") {
    const comment = getCommentObject(id);
    if (!comment) return null;
    return {
      type: "comment",
      key: `activity-${type}-${id}`,
      timestamp: safeTimestamp,
      popularity: getCommentPopularityScoreForFeed(comment),
      origin: { type: type === "review" ? "activity-review-like" : "activity-comment-like" },
      markup: buildFeedCommentCardMarkup(comment, {
        compact: false,
        className: "feed-editorial-comment",
        showFollowButton: true,
      }),
    };
  }
  if (type === "reply") {
    const reply = getCommentObject(id);
    const parent = reply?.parentCommentId ? getCommentObject(reply.parentCommentId) : null;
    const eventId = parent?.eventId || "";
    if (!reply || !eventId) return null;
    return {
      type: "comment",
      key: `activity-reply-${id}`,
      timestamp: safeTimestamp,
      popularity: getCommentPopularityScoreForFeed(reply),
      origin: { type: "activity-reply-like" },
      markup: buildFeedReplyFavoriteCardMarkup(reply, eventId, { className: "feed-editorial-comment" }),
    };
  }
  if (type === "event") {
    const event = events.find((item) => item.id === id);
    if (!event) return null;
    return {
      type: "card",
      key: `activity-event-${id}`,
      timestamp: safeTimestamp,
      popularity: getFeedEventPopularityScore(event),
      origin: { type: "activity-watchlist-event" },
      markup: buildEventCard(event, { size: "compact" }),
    };
  }
  if (type === "list") {
    const list = curatedLists.find((item) => item.id === id);
    if (!list) return null;
    return {
      type: "card",
      key: `activity-list-${id}`,
      timestamp: safeTimestamp,
      popularity: getListPopularityScoreForFeed(list),
      origin: { type: "activity-ranking-like" },
      markup: buildRankingCard(list, { showOwner: true, showFollowButton: false }),
    };
  }
  if (type === "athlete") {
    const athlete = getAthleteById(id);
    if (!athlete) return null;
    return {
      type: "card",
      key: `activity-athlete-${id}`,
      timestamp: safeTimestamp,
      popularity: (getAthleteFollowerCount(athlete) / 20) + (getAthleteEvents(athlete.id).length * 8),
      origin: { type: "activity-athlete-favorite" },
      markup: buildPlayerCard(athlete),
    };
  }
  if (type === "team") {
    const team = getTeamById(id);
    if (!team) return null;
    return {
      type: "card",
      key: `activity-team-${id}`,
      timestamp: safeTimestamp,
      popularity: (getTeamEvents(team.id).length * 14) + (getTeamMembers(team).length * 4),
      origin: { type: "activity-team-favorite" },
      markup: buildTeamCard(team),
    };
  }
  if (type === "league") {
    const league = getLeagueRootById(id);
    if (!league) return null;
    return {
      type: "card",
      key: `activity-league-${id}`,
      timestamp: safeTimestamp,
      popularity: (Number(league.count || 0) * 6) + (Number(league.seasonCount || 0) * 20) + Number(league.communityScore || 0),
      origin: { type: "activity-league-follow" },
      markup: buildLeagueCard(league, { variant: "generic" }),
    };
  }
  if (type === "league-season") {
    const season = getLeagueSeasonById(id);
    if (!season) return null;
    return {
      type: "card",
      key: `activity-league-season-${id}`,
      timestamp: safeTimestamp,
      popularity: (Number(season.count || 0) * 8) + Number(season.communityScore || 0),
      origin: { type: "activity-league-season-follow" },
      markup: buildLeagueCard(season, { variant: "season" }),
    };
  }
  return null;
}

function buildMyActivityItems() {
  const byKey = new Map();
  Object.entries(storedFavoriteTimeline || {}).forEach(([rawKey, rawTimestamp]) => {
    const { type, id } = parseFavoriteTimelineActionKey(rawKey);
    const item = buildActivityItemFromFavoriteTimeline(type, id, Number(rawTimestamp || 0));
    if (!item) return;
    const previous = byKey.get(item.key);
    if (!previous || Number(item.timestamp || 0) > Number(previous.timestamp || 0)) {
      byKey.set(item.key, item);
    }
  });

  Object.entries(storedUserFollows || {}).forEach(([userId, followed]) => {
    if (!followed) return;
    const user = getUserById(userId);
    if (!user?.id) return;
    const fallbackTimestamp = getUserLatestCommentTimestamp(user.id) || getFallbackFavoriteTimestamp("comment", user.id);
    const key = `activity-follow-${user.id}`;
    const candidate = {
      type: "card",
      key,
      timestamp: fallbackTimestamp,
      popularity: getFollowersCount(user.id),
      origin: { type: "activity-follow-user" },
      markup: buildUserCard(user),
    };
    const previous = byKey.get(key);
    if (!previous || Number(candidate.timestamp || 0) > Number(previous.timestamp || 0)) {
      byKey.set(key, candidate);
    }
  });

  return Array.from(byKey.values());
}

function buildMyActivityPayload(order = "recent") {
  const isPopular = order === "popular";
  const items = buildMyActivityItems();
  const sortedItems = items.slice().sort((a, b) => {
    if (isPopular) {
      const popDiff = Number(b.popularity || 0) - Number(a.popularity || 0);
      if (popDiff !== 0) return popDiff;
    }
    const timeDiff = Number(b.timestamp || 0) - Number(a.timestamp || 0);
    if (timeDiff !== 0) return timeDiff;
    return String(a.key || "").localeCompare(String(b.key || ""));
  });
  return {
    ...buildEmptyFeedPayload(
      {
        scope: FEED_SCOPE_MY,
        mode: isPopular ? FEED_MODE_ACTIVITY_POPULAR : FEED_MODE_ACTIVITY_RECENT,
      },
      {
        title: "Mon Feed",
        subtitle: isPopular ? "Mes activités · mode Populaires." : "Mes activités · mode Chrono.",
      }
    ),
    activityItems: sortedItems,
  };
}

function getObjectTargetMeta(targetType, targetId) {
  if (targetType === FEED_TARGET_EVENT) {
    const event = events.find((item) => item.id === targetId);
    return {
      title: "Feed événement",
      subtitle: event?.title || "Événement",
    };
  }
  if (targetType === FEED_TARGET_USER) {
    const user = getUserById(targetId);
    return {
      title: "Feed profil",
      subtitle: user?.name || "Utilisateur",
    };
  }
  if (targetType === FEED_TARGET_LEAGUE) {
    const league = getLeagueRootById(targetId);
    return {
      title: "Feed compétition",
      subtitle: league?.title || "Compétition",
    };
  }
  if (targetType === FEED_TARGET_LEAGUE_SEASON) {
    const season = getLeagueSeasonById(targetId);
    return {
      title: "Feed saison",
      subtitle: season?.title || "Saison",
    };
  }
  if (targetType === FEED_TARGET_ATHLETE) {
    const athlete = getAthleteById(targetId);
    return {
      title: "Feed sportif",
      subtitle: athlete?.name || "Sportif",
    };
  }
  if (targetType === FEED_TARGET_TEAM) {
    const team = getTeamById(targetId);
    return {
      title: "Feed équipe",
      subtitle: team?.nameFull || team?.name || "Équipe",
    };
  }
  return {
    title: "Feed objet",
    subtitle: "Contexte non identifié",
  };
}

function getEventsForObjectTarget(targetType, targetId) {
  if (targetType === FEED_TARGET_EVENT) {
    const event = events.find((item) => item.id === targetId);
    return event ? [event] : [];
  }
  if (targetType === FEED_TARGET_USER) {
    const eventIds = new Set(
      genericCommentSamples
        .filter((comment) => comment.userId === targetId && comment.eventId)
        .map((comment) => comment.eventId)
    );
    return Array.from(eventIds)
      .map((eventId) => events.find((event) => event.id === eventId))
      .filter(Boolean);
  }
  if (targetType === FEED_TARGET_LEAGUE) {
    const league = getLeagueRootById(targetId);
    if (!league) return [];
    return (league.eventIds || [])
      .map((eventId) => events.find((event) => event.id === eventId))
      .filter(Boolean);
  }
  if (targetType === FEED_TARGET_LEAGUE_SEASON) {
    const league = getLeagueSeasonById(targetId);
    if (!league) return [];
    return (league.eventIds || [])
      .map((eventId) => events.find((event) => event.id === eventId))
      .filter(Boolean);
  }
  if (targetType === FEED_TARGET_ATHLETE) {
    return getAthleteEvents(targetId);
  }
  if (targetType === FEED_TARGET_TEAM) {
    return getTeamEvents(targetId);
  }
  return [];
}

function getCommentsForObjectTarget(targetType, targetId, relatedEventIds = new Set()) {
  if (targetType === FEED_TARGET_EVENT) {
    return getCommentsForEvent(targetId);
  }
  if (targetType === FEED_TARGET_USER) {
    return sortCommentsForDisplay(genericCommentSamples.filter((comment) => comment.userId === targetId));
  }
  if (targetType === FEED_TARGET_LEAGUE) {
    return getCommentsForLeagueRoot(targetId);
  }
  if (targetType === FEED_TARGET_LEAGUE_SEASON) {
    return getCommentsForLeague(targetId);
  }
  if (targetType === FEED_TARGET_ATHLETE) {
    const direct = getCommentsForTarget(COMMENT_TARGET_ATHLETE, targetId);
    const onEvents = genericCommentSamples.filter((comment) => relatedEventIds.has(getCommentTargetId(comment)) && getCommentTargetType(comment) === COMMENT_TARGET_EVENT);
    return sortCommentsForDisplay([...direct, ...onEvents]);
  }
  if (targetType === FEED_TARGET_TEAM) {
    const direct = getCommentsForTarget(COMMENT_TARGET_TEAM, targetId);
    const onEvents = genericCommentSamples.filter((comment) => relatedEventIds.has(getCommentTargetId(comment)) && getCommentTargetType(comment) === COMMENT_TARGET_EVENT);
    return sortCommentsForDisplay([...direct, ...onEvents]);
  }
  return [];
}

function getRankingsForObjectTarget(targetType, targetId, relatedEventIds = new Set()) {
  if (targetType === FEED_TARGET_USER) {
    return curatedLists.filter((list) => list.ownerId === targetId);
  }
  return curatedLists.filter((list) => {
    const entries = Array.isArray(list.entries) ? list.entries : [];
    if (targetType === FEED_TARGET_ATHLETE) {
      if (entries.some((entry) => entry.athleteId === targetId)) return true;
    }
    return entries.some((entry) => entry.eventId && relatedEventIds.has(entry.eventId));
  });
}

function sortFeedObjectComments(comments, mode) {
  const list = Array.isArray(comments) ? comments.slice() : [];
  return list.sort((a, b) => {
    if (mode === FEED_MODE_POPULAR) {
      const likesDiff = getCommentTotalLikes(b) - getCommentTotalLikes(a);
      if (likesDiff !== 0) return likesDiff;
    }
    const timeDiff = getFeedCommentTimestamp(b) - getFeedCommentTimestamp(a);
    if (timeDiff !== 0) return timeDiff;
    return String(a.id || "").localeCompare(String(b.id || ""));
  });
}

function sortFeedObjectEvents(eventsList, mode) {
  const list = Array.isArray(eventsList) ? eventsList.slice() : [];
  return list.sort((a, b) => {
    if (mode === FEED_MODE_POPULAR) {
      const scoreDiff = getFeedEventPopularityScore(b) - getFeedEventPopularityScore(a);
      if (scoreDiff !== 0) return scoreDiff;
    }
    const timeDiff = getFeedEventTimestamp(b) - getFeedEventTimestamp(a);
    if (timeDiff !== 0) return timeDiff;
    return String(a.title || "").localeCompare(String(b.title || ""));
  });
}

function sortFeedObjectRankings(lists, mode) {
  const input = Array.isArray(lists) ? lists.slice() : [];
  return input.sort((a, b) => {
    if (mode === FEED_MODE_POPULAR) {
      const likesDiff = getListPopularityScoreForFeed(b) - getListPopularityScoreForFeed(a);
      if (likesDiff !== 0) return likesDiff;
    }
    const freshDiff = getListFreshnessTimestamp(b) - getListFreshnessTimestamp(a);
    if (freshDiff !== 0) return freshDiff;
    return String(a.title || "").localeCompare(String(b.title || ""));
  });
}

function sortFeedObjectUsers(usersList, mode) {
  const list = Array.isArray(usersList) ? usersList.slice() : [];
  return list.sort((a, b) => {
    if (mode === FEED_MODE_POPULAR) {
      const followersDiff = getFollowersCount(b.id) - getFollowersCount(a.id);
      if (followersDiff !== 0) return followersDiff;
    }
    const recentDiff = getUserLatestCommentTimestamp(b.id) - getUserLatestCommentTimestamp(a.id);
    if (recentDiff !== 0) return recentDiff;
    return String(a.name || "").localeCompare(String(b.name || ""));
  });
}

function buildObjectPayload(targetType, targetId, mode = FEED_MODE_RECENT) {
  const safeMode = normalizeObjectFeedMode(mode);
  const meta = getObjectTargetMeta(targetType, targetId);
  const eventsForTarget = getEventsForObjectTarget(targetType, targetId);
  const relatedEventIds = new Set(eventsForTarget.map((event) => event.id));
  const commentsForTarget = getCommentsForObjectTarget(targetType, targetId, relatedEventIds);
  const rankingsForTarget = getRankingsForObjectTarget(targetType, targetId, relatedEventIds);
  const uniqueUsers = Array.from(
    new Set(commentsForTarget.map((comment) => comment.userId).filter(Boolean))
  )
    .map((userId) => getUserById(userId))
    .filter((user) => user?.id);
  const sortedEvents = sortFeedObjectEvents(eventsForTarget, safeMode);
  const sortedComments = sortFeedObjectComments(commentsForTarget, safeMode);
  const sortedRankings = sortFeedObjectRankings(rankingsForTarget, safeMode);
  const sortedUsers = sortFeedObjectUsers(uniqueUsers, safeMode);

  const nowTs = Date.now();
  const next7DaysTs = nowTs + (7 * 24 * 60 * 60 * 1000);
  const nowDate = new Date();
  const nextMonthStart = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 1).getTime();
  const nextMonthEnd = new Date(nowDate.getFullYear(), nowDate.getMonth() + 2, 1).getTime();
  const upcoming = sortedEvents.filter((event) => isUpcoming(event));
  const past = sortedEvents.filter((event) => !isUpcoming(event));
  const mostAwaitedNextMonthEvents = upcoming
    .filter((event) => {
      const ts = getFeedEventTimestamp(event);
      return ts >= nextMonthStart && ts < nextMonthEnd;
    })
    .slice(0, 8);
  const mostAwaitedNext7DaysEvents = upcoming
    .filter((event) => {
      const ts = getFeedEventTimestamp(event);
      return ts >= nowTs && ts <= next7DaysTs;
    })
    .slice(0, 8);
  const bestLast7DaysEvents = past
    .filter((event) => {
      const ts = getFeedEventTimestamp(event);
      return ts >= (nowTs - (7 * 24 * 60 * 60 * 1000));
    })
    .slice(0, 8);

  return {
    ...buildEmptyFeedPayload(
      {
        scope: FEED_SCOPE_OBJECT,
        mode: safeMode,
        targetType,
        targetId,
      },
      {
        title: meta.title,
        subtitle: `${meta.subtitle} · ${safeMode === FEED_MODE_POPULAR ? "mode Populaires" : "mode Chrono"}`,
      }
    ),
    topLikedComments: sortedComments.slice(0, 36),
    topLikedRankings: sortedRankings.slice(0, 8),
    mostAwaitedNextMonthEvents: mostAwaitedNextMonthEvents.length ? mostAwaitedNextMonthEvents : upcoming.slice(0, 8),
    mostAwaitedNext7DaysEvents: mostAwaitedNext7DaysEvents.length ? mostAwaitedNext7DaysEvents : upcoming.slice(0, 8),
    standoutPastEvents: past.slice(0, 8),
    bestLast7DaysEvents: bestLast7DaysEvents.length ? bestLast7DaysEvents : past.slice(0, 8),
    topFollowSuggestions: sortedUsers.slice(0, 6),
  };
}

function buildFeedPayload(request = {}) {
  const normalized = normalizeFeedRequest(request);
  if (normalized.scope === FEED_SCOPE_OBJECT) {
    return buildObjectPayload(normalized.targetType, normalized.targetId, normalized.mode);
  }
  if (normalized.mode === FEED_MODE_RECENT) {
    return buildMyRecentPayload();
  }
  if (normalized.mode === FEED_MODE_FAVORITES) {
    return buildEmptyFeedPayload(normalized, {
      title: "Mon Feed",
      subtitle: "Mode Mes favoris · likes et watchlist.",
    });
  }
  if (normalized.mode === FEED_MODE_ACTIVITY_RECENT) {
    return buildMyActivityPayload("recent");
  }
  if (normalized.mode === FEED_MODE_ACTIVITY_POPULAR) {
    return buildMyActivityPayload("popular");
  }
  return buildMyForYouPayload();
}

function buildFeedEntries(request = {}, payload = null) {
  const normalized = normalizeFeedRequest(request);
  const safePayload = payload || buildFeedPayload(normalized);
  if (normalized.scope === FEED_SCOPE_MY && normalized.mode === FEED_MODE_FAVORITES) {
    return buildMyFavoritesEntries().map((entry) => ({
      ...entry,
      leftLabel: formatFeedFavoriteTimestamp(entry.timestamp),
      leftSubLabel: buildFeedOriginLabel(entry.origin),
    }));
  }
  if (normalized.scope === FEED_SCOPE_MY && (normalized.mode === FEED_MODE_ACTIVITY_RECENT || normalized.mode === FEED_MODE_ACTIVITY_POPULAR)) {
    return (safePayload.activityItems || []).map((item) => ({
      ...item,
      leftLabel: formatFeedFavoriteTimestamp(item.timestamp),
      leftSubLabel: buildFeedOriginLabel(item.origin),
    }));
  }
  return buildFeedUnifiedStreamEntries(safePayload, { mode: normalized.mode }).map((item) => ({
    ...item,
    leftLabel: formatFeedFavoriteTimestamp(getFeedStreamItemTimestamp(item)),
    leftSubLabel: buildFeedOriginLabel(item.origin),
  }));
}

function buildFeedOriginLabel(origin) {
  if (!origin || !origin.type) return "";
  const actorUser = origin.actorUserId ? getUserById(origin.actorUserId) : null;
  const userName = actorUser?.name || "";
  const itemCount = Number(origin.itemCount || 1);
  const isPlural = itemCount > 1;
  if (origin.type === "repost") {
    return isPlural ? "Reposts de comptes suivis" : "Repost d'un compte suivi";
  }
  if (origin.type === "liked-by-following" && userName) {
    return `Like par ${userName}`;
  }
  if (origin.type === "following-author") {
    return userName ? `Publié par ${userName}` : "Publié par un compte suivi";
  }
  if (origin.type === "trending-comment") {
    return "Tendance commentaires";
  }
  if (origin.type === "top-liked-ranking") {
    return isPlural ? "Classements populaires" : "Classement populaire";
  }
  if (origin.type === "adapted-ranking") {
    return isPlural ? "Classements adaptes a vos favoris" : "Classement adapte a vos favoris";
  }
  if (origin.type === "most-awaited-next-month-event") {
    return isPlural ? "Événements les plus attendus le mois prochain" : "Événement le plus attendu le mois prochain";
  }
  if (origin.type === "most-awaited-next-7-days-event") {
    return isPlural ? "Événements les plus attendus dans les 7 prochains jours" : "Événement le plus attendu dans les 7 prochains jours";
  }
  if (origin.type === "standout-past-event") {
    return isPlural ? "Événements passés marquants" : "Événement passé marquant";
  }
  if (origin.type === "best-last-7-days-event") {
    return isPlural ? "Les meilleurs événements des 7 derniers jours" : "Le meilleur événement des 7 derniers jours";
  }
  if (origin.type === "follow-suggestion") {
    return isPlural ? "Suggestions de profils a suivre" : "Suggestion de profil a suivre";
  }
  if (origin.type === "favorite-review-like") {
    return "Review likée";
  }
  if (origin.type === "favorite-comment-like") {
    return "Commentaire liké";
  }
  if (origin.type === "favorite-reply-like") {
    return "Réponse likée";
  }
  if (origin.type === "favorite-event") {
    return "Événement favori (watchlist)";
  }
  if (origin.type === "favorite-ranking") {
    return "Classement liké";
  }
  if (origin.type === "favorite-athlete") {
    return "Sportif suivi";
  }
  if (origin.type === "favorite-team") {
    return "Équipe suivie";
  }
  if (origin.type === "favorite-league") {
    return "Compétition suivie";
  }
  if (origin.type === "favorite-league-season") {
    return "Saison suivie";
  }
  if (origin.type === "activity-review-like") {
    return "Activité: review likée";
  }
  if (origin.type === "activity-comment-like") {
    return "Activité: commentaire liké";
  }
  if (origin.type === "activity-reply-like") {
    return "Activité: réponse likée";
  }
  if (origin.type === "activity-watchlist-event") {
    return "Activité: ajouté à la watchlist";
  }
  if (origin.type === "activity-ranking-like") {
    return "Activité: classement liké";
  }
  if (origin.type === "activity-athlete-favorite") {
    return "Activité: sportif suivi";
  }
  if (origin.type === "activity-team-favorite") {
    return "Activité: équipe suivie";
  }
  if (origin.type === "activity-league-follow") {
    return "Activité: compétition suivie";
  }
  if (origin.type === "activity-league-season-follow") {
    return "Activité: saison suivie";
  }
  if (origin.type === "activity-follow-user") {
    return "Activité: profil suivi";
  }
  return "Recommande pour vous";
}

function pushFeedCommentCandidate(map, comment, originType, priority, actorUserId = "", options = {}) {
  if (!comment?.id) return;
  const existing = map.get(comment.id);
  const mode = normalizeFeedMode(options.mode);
  let score = 0;
  if (mode === FEED_MODE_RECENT) {
    score = getFeedCommentTimestamp(comment);
  } else {
    const likesWeight = getCommentTotalLikes(comment);
    const freshnessWeight = getFeedCommentTimestamp(comment) / 10000000000;
    score = priority + likesWeight + freshnessWeight;
  }
  if (!existing || score > existing.score) {
    map.set(comment.id, {
      type: "comment",
      key: `comment-${comment.id}`,
      score,
      timestamp: Number(options.actionTimestamp || getFeedCommentTimestamp(comment) || 0),
      comment,
      origin: {
        type: originType,
        actorUserId,
      },
    });
  }
}

function buildFeedCommentStreamEntries(feedData, limit = 36, options = {}) {
  const mode = normalizeFeedMode(options.mode);
  const candidateMap = new Map();
  feedData.followedRepostSignals.forEach((signal, index) => {
    pushFeedCommentCandidate(candidateMap, signal.comment, "repost", 1400 - (index * 6), signal.actorUserId, {
      mode,
      index,
      actionTimestamp: signal.timestamp,
    });
  });
  feedData.followedLikedSignals.forEach((signal, index) => {
    pushFeedCommentCandidate(candidateMap, signal.comment, "liked-by-following", 1200 - (index * 6), signal.actorUserId, {
      mode,
      index,
      actionTimestamp: signal.timestamp,
    });
  });
  feedData.followingComments.forEach((comment, index) => {
    pushFeedCommentCandidate(candidateMap, comment, "following-author", 1000 - (index * 5), comment.userId, { mode, index });
  });
  feedData.topLikedComments.forEach((comment, index) => {
    pushFeedCommentCandidate(candidateMap, comment, "trending-comment", 800 - (index * 4), "", { mode, index });
  });

  return Array.from(candidateMap.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.max(0, limit))
    .map((entry) => ({
      ...entry,
      markup: buildFeedCommentCardMarkup(entry.comment, {
        compact: false,
        className: "feed-editorial-comment",
        showFollowButton: true,
      }),
    }));
}

function buildFeedCardStreamEntries(feedData) {
  const entries = [];
  const usedEventIds = new Set();
  const pushEventCategory = (list = [], originType = "", keyPrefix = "") => {
    let added = 0;
    list.forEach((event) => {
      if (!event?.id) return;
      if (added >= 3) return;
      if (usedEventIds.has(event.id)) return;
      usedEventIds.add(event.id);
      entries.push({
        type: "card",
        key: `${keyPrefix}-${event.id}`,
        timestamp: getFeedEventTimestamp(event),
        origin: { type: originType },
        event,
        markup: buildEventCard(event, { size: "compact" }),
      });
      added += 1;
    });
  };
  feedData.topLikedRankings.slice(0, 3).forEach((list) => {
    entries.push({
      type: "card",
      key: `ranking-top-${list.id}`,
      timestamp: getListFreshnessTimestamp(list),
      origin: { type: "top-liked-ranking" },
      list,
      markup: buildRankingCard(list, { showOwner: true, showFollowButton: false }),
    });
  });
  feedData.adaptedRankings.slice(0, 2).forEach((list) => {
    entries.push({
      type: "card",
      key: `ranking-adapted-${list.id}`,
      timestamp: getListFreshnessTimestamp(list),
      origin: { type: "adapted-ranking" },
      list,
      markup: buildRankingCard(list, { showOwner: true, showFollowButton: false }),
    });
  });
  pushEventCategory(feedData.mostAwaitedNextMonthEvents, "most-awaited-next-month-event", "event-next-month");
  pushEventCategory(feedData.mostAwaitedNext7DaysEvents, "most-awaited-next-7-days-event", "event-next-7-days");
  pushEventCategory(feedData.standoutPastEvents, "standout-past-event", "event-standout-past");
  pushEventCategory(feedData.bestLast7DaysEvents, "best-last-7-days-event", "event-best-last-7-days");
  feedData.topFollowSuggestions.slice(0, 3).forEach((user) => {
    entries.push({
      type: "card",
      key: `user-suggestion-${user.id}`,
      timestamp: getUserLatestCommentTimestamp(user.id),
      origin: { type: "follow-suggestion" },
      user,
      markup: buildUserCard(user),
    });
  });
  return entries;
}

function buildFeedCardRowEntries(feedData) {
  const cardEntries = buildFeedCardStreamEntries(feedData);
  const rows = [];
  let index = 0;
  while (index < cardEntries.length) {
    const firstEntry = cardEntries[index];
    const originType = firstEntry?.origin?.type || "generic";
    const chunk = [];
    while (index < cardEntries.length && chunk.length < 3) {
      const candidate = cardEntries[index];
      const candidateOriginType = candidate?.origin?.type || "generic";
      if (candidateOriginType !== originType) {
        break;
      }
      chunk.push(candidate);
      index += 1;
    }
    if (!chunk.length) {
      index += 1;
      continue;
    }
    rows.push({
      type: "card",
      key: `card-row-${originType}-${rows.length}`,
      timestamp: Math.max(...chunk.map((entry) => Number(entry.timestamp || 0)), 0),
      origin: {
        ...(firstEntry.origin || {}),
        itemCount: chunk.length,
      },
      markup: `
        <div class="feed-stream-card-row">
          ${chunk.map((entry) => `<div class="feed-stream-card-cell">${entry.markup}</div>`).join("")}
        </div>
      `,
    });
  }
  return rows;
}

function buildFeedUnifiedStreamEntries(feedData, options = {}) {
  const mode = normalizeFeedMode(options.mode);
  const commentEntries = buildFeedCommentStreamEntries(feedData, 34, { mode });
  const cardRowEntries = buildFeedCardRowEntries(feedData);
  if (!commentEntries.length) return cardRowEntries.slice(0, 8);

  const result = [];
  let cardRowIndex = 0;
  commentEntries.forEach((entry, index) => {
    result.push(entry);
    const shouldInsertCardRow = ((index + 1) % 4 === 0) && cardRowIndex < cardRowEntries.length;
    if (shouldInsertCardRow) {
      result.push(cardRowEntries[cardRowIndex]);
      cardRowIndex += 1;
    }
  });
  while (cardRowIndex < cardRowEntries.length && cardRowIndex < 3) {
    result.push(cardRowEntries[cardRowIndex]);
    cardRowIndex += 1;
  }
  return result;
}

function formatFeedFavoriteTimestamp(timestamp) {
  const numericTs = Number(timestamp || 0);
  if (!numericTs) return "";
  const date = new Date(numericTs);
  if (Number.isNaN(date.getTime())) return "";
  const dateLabel = formatFrenchDateLabel(date, { day: "2-digit", month: "short", year: "numeric" });
  const timeLabel = date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  return [dateLabel, timeLabel].filter(Boolean).join(" · ");
}

function getFeedStreamItemTimestamp(item) {
  if (!item) return 0;
  const direct = Number(item.timestamp || 0);
  if (direct > 0) return direct;
  if (item.comment) return getFeedCommentTimestamp(item.comment);
  if (item.event) return getFeedEventTimestamp(item.event);
  if (item.list) return getListFreshnessTimestamp(item.list);
  if (item.user?.id) return getUserLatestCommentTimestamp(item.user.id);
  return 0;
}

function buildFeedStreamItemMarkup(item) {
  const primaryLabel = String(item?.leftLabel || buildFeedOriginLabel(item.origin) || "").trim();
  const secondaryLabel = String(item?.leftSubLabel || "").trim();
  const primaryClass = item?.leftLabel ? "feed-stream-origin is-timestamp" : "feed-stream-origin is-soft-meta";
  const primaryMarkup = primaryLabel
    ? `<span class="${primaryClass}">${escapeHtml(primaryLabel)}</span>`
    : "";
  const secondaryMarkup = secondaryLabel
    ? `<span class="feed-stream-origin is-soft-meta">${escapeHtml(secondaryLabel)}</span>`
    : "";
  const originMarkup = (primaryMarkup || secondaryMarkup)
    ? `<div class="feed-stream-origin-stack">${primaryMarkup}${secondaryMarkup}</div>`
    : "";
  return `
    <article class="feed-stream-item is-${item.type}">
      <div class="feed-stream-origin-col">
        ${originMarkup}
      </div>
      <div class="feed-stream-main">
        ${item.markup}
      </div>
    </article>
  `;
}

function getFeedEmptyStateText(request) {
  const normalized = normalizeFeedRequest(request);
  if (normalized.scope === FEED_SCOPE_MY && normalized.mode === FEED_MODE_FAVORITES) {
    return "Aucun favori pour le moment.";
  }
  if (normalized.scope === FEED_SCOPE_MY && (normalized.mode === FEED_MODE_ACTIVITY_RECENT || normalized.mode === FEED_MODE_ACTIVITY_POPULAR)) {
    return "Aucune activité pour le moment.";
  }
  if (normalized.scope === FEED_SCOPE_OBJECT) {
    return "Aucun contenu lié à cet objet.";
  }
  return "Aucun contenu a afficher pour le moment.";
}

function renderFeedSurface(options = {}) {
  const {
    request = { scope: FEED_SCOPE_MY, mode: FEED_MODE_FOR_YOU },
    mount = null,
    switchMount = null,
    helpMount = null,
    titleMount = null,
    subtitleMount = null,
  } = options;
  const normalized = normalizeFeedRequest(request);
  const payload = buildFeedPayload(normalized);
  const entries = buildFeedEntries(normalized, payload);

  if (switchMount) {
    const isMainFeedSurface = Boolean(switchMount === feedModeSwitchEl);
    renderFeedModeSwitch(normalized, switchMount, {
      isMainFeedSurface,
      optionalTabs: storedOptionalFeedTabs,
    });
  }

  const introMarkup = buildFeedHelpMarkup(normalized, payload);
  if (helpMount) {
    helpMount.innerHTML = introMarkup;
  }

  if (feedAlgorithmEl && feedAlgorithmEl !== helpMount && mount === feedStreamEl) {
    feedAlgorithmEl.innerHTML = "";
  }

  if (titleMount) {
    titleMount.textContent = payload.title || "Mon Feed";
  }
  if (subtitleMount) {
    subtitleMount.textContent = payload.subtitle || "";
  }

  if (mount) {
    mount.innerHTML = entries.length
      ? entries.map((item) => buildFeedStreamItemMarkup(item)).join("")
      : buildEmptyStateCard(getFeedEmptyStateText(normalized), { className: "review-card empty-card" });
  }

  return {
    request: normalized,
    payload,
    entries,
  };
}

function getObjectFeedContextFromCurrentPage() {
  if (!objectFeedStreamEl) return null;
  const params = new URLSearchParams(window.location.search);
  if (detailEl) {
    const requestedId = params.get("id") || "";
    const target = events.find((item) => item.id === requestedId) || events[0] || null;
    const targetId = target?.id || "";
    if (!targetId) return null;
    return {
      targetType: FEED_TARGET_EVENT,
      targetId,
    };
  }
  if (userDetailEl) {
    const requestedId = params.get("id") || "";
    const target = users.find((item) => item.id === requestedId) || users[0] || null;
    const targetId = target?.id || "";
    if (!targetId) return null;
    return {
      targetType: FEED_TARGET_USER,
      targetId,
    };
  }
  if (leaguePageDetailEl) {
    const requestedId = params.get("id") || "";
    const target = getLeagueRootById(requestedId) || leagues[0] || null;
    const targetId = target?.id || "";
    if (!targetId) return null;
    return {
      targetType: FEED_TARGET_LEAGUE,
      targetId,
    };
  }
  if (leagueDetailEl) {
    const requestedId = params.get("id") || "";
    const target = getLeagueSeasonById(requestedId) || leagueSeasons[0] || null;
    const targetId = target?.id || "";
    if (!targetId) return null;
    return {
      targetType: FEED_TARGET_LEAGUE_SEASON,
      targetId,
    };
  }
  if (athleteDetailEl) {
    const requestedId = params.get("id") || "";
    const target = getAthleteById(requestedId) || athletes[0] || null;
    const targetId = target?.id || "";
    if (!targetId) return null;
    return {
      targetType: FEED_TARGET_ATHLETE,
      targetId,
    };
  }
  if (teamDetailEl) {
    const requestedId = params.get("id") || "";
    const target = getTeamById(requestedId) || teams[0] || null;
    const targetId = target?.id || "";
    if (!targetId) return null;
    return {
      targetType: FEED_TARGET_TEAM,
      targetId,
    };
  }
  return null;
}

function renderObjectFeedForCurrentPage() {
  const context = getObjectFeedContextFromCurrentPage();
  if (!context) return;
  const parsedRequest = parseFeedRequestFromLocation(new URLSearchParams(window.location.search));
  const mode = parsedRequest.scope === FEED_SCOPE_OBJECT
    ? normalizeObjectFeedMode(parsedRequest.mode)
    : getObjectFeedModeFromLocation(FEED_MODE_RECENT);
  const request = normalizeFeedRequest({
    scope: FEED_SCOPE_OBJECT,
    mode,
    targetType: context.targetType,
    targetId: context.targetId,
  });
  activeObjectFeedRequest = request;
  renderObjectFeedAddButton(request);
  renderFeedSurface({
    request,
    mount: objectFeedStreamEl,
    switchMount: objectFeedModeSwitchEl,
    helpMount: objectFeedHelpToggleEl,
    titleMount: objectFeedTitleEl,
    subtitleMount: objectFeedSubtitleEl,
  });
  if (objectFeedSeeAllLinkEl) {
    objectFeedSeeAllLinkEl.href = `feed.html?${buildFeedQueryString(request)}`;
  }
}

function renderFeedPage() {
  try {
    renderObjectFeedForCurrentPage();

    if (isFeedFavoritesRoute()) {
      const params = new URLSearchParams(window.location.search);
      const modeToken = normalizeLegacyFeedModeToken(params.get("mode") || params.get("feedMode") || FEED_MODE_FAVORITES);
      const mode = FEED_ALLOWED_MY_MODES.has(modeToken) ? modeToken : FEED_MODE_FAVORITES;
      const redirectRequest = normalizeFeedRequest({
        scope: FEED_SCOPE_MY,
        mode,
      });
      const nextUrl = `feed.html?${buildFeedQueryString(redirectRequest)}${window.location.hash || ""}`;
      window.location.replace(nextUrl);
      return;
    }

    const hasFeedRoot = Boolean(
      feedAlgorithmEl
      || feedHelpToggleEl
      || feedStreamEl
      || feedModeSwitchEl
    );
    if (!hasFeedRoot) return;

    const normalizedOptionalTabs = normalizeOptionalFeedTabs(storedOptionalFeedTabs);
    const hasOptionalTabsChanged = normalizedOptionalTabs.length !== storedOptionalFeedTabs.length
      || normalizedOptionalTabs.some((tab, index) => {
        const previous = storedOptionalFeedTabs[index];
        return !previous
          || previous.id !== tab.id
          || previous.mode !== tab.mode
          || previous.label !== tab.label
          || previous.targetType !== tab.targetType
          || previous.targetId !== tab.targetId;
      });
    if (hasOptionalTabsChanged) {
      saveOptionalFeedTabs(normalizedOptionalTabs);
    } else {
      storedOptionalFeedTabs = normalizedOptionalTabs;
    }

    const request = parseFeedRequestFromLocation(new URLSearchParams(window.location.search));

    activeFeedRequest = request;
    activeFeedMode = request.mode;
    if (request.scope === FEED_SCOPE_MY) {
      saveFeedMode(request.mode);
    }

    updateLocationWithFeedRequest(request, { keepExistingParams: false });
    renderFeedSurface({
      request,
      mount: feedStreamEl,
      switchMount: feedModeSwitchEl,
      helpMount: feedHelpToggleEl,
      titleMount: feedTitleEl,
      subtitleMount: feedSubtitleEl,
    });
  } catch (error) {
    console.error("renderFeedPage failed", error);
    if (feedModeSwitchEl && !feedModeSwitchEl.innerHTML.trim()) {
      renderFeedModeSwitch(
        { scope: FEED_SCOPE_MY, mode: FEED_MODE_FOR_YOU },
        feedModeSwitchEl,
        { isMainFeedSurface: true, optionalTabs: storedOptionalFeedTabs }
      );
    }
    if (feedStreamEl) {
      const message = `Erreur de rendu du feed: ${error?.message || "inconnue"}`;
      feedStreamEl.innerHTML = buildEmptyStateCard(message, { className: "review-card empty-card" });
    }
  }
}

function getCalendarRange(view, baseDate) {
  const start = new Date(baseDate);
  const end = new Date(baseDate);

  if (view === "day") {
    return { start, end };
  }

  if (view === "week") {
    const day = (start.getDay() + 6) % 7;
    start.setDate(start.getDate() - day);
    end.setDate(start.getDate() + 6);
    return { start, end };
  }

  if (view === "month") {
    start.setDate(1);
    end.setMonth(end.getMonth() + 1, 0);
    return { start, end };
  }

  if (view === "year") {
    start.setMonth(0, 1);
    end.setMonth(11, 31);
    return { start, end };
  }

  return { start, end };
}

function formatRangeLabel(start, end) {
  const startLabel = formatFrenchDateLabel(start, { day: "numeric", month: "long", year: "numeric" });
  const endLabel = formatFrenchDateLabel(end, { day: "numeric", month: "long", year: "numeric" });
  return startLabel === endLabel ? startLabel : `${startLabel} - ${endLabel}`;
}

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getCalendarMonthKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

function parseCalendarMonthKey(monthKey) {
  if (!monthKey || typeof monthKey !== "string") return null;
  const [yearStr, monthStr] = monthKey.split("-");
  const year = Number(yearStr);
  const month = Number(monthStr);
  if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) {
    return null;
  }
  return new Date(year, month - 1, 1);
}

function getRatedCalendarEvents() {
  return events
    .filter((event) => {
      if (isUpcoming(event)) return false;
      if ((storedRatings[event.id] || 0) <= 0) return false;
      return Boolean(parseEventDate(event.dateISO || event.date));
    })
    .sort((a, b) => {
      const dateA = parseEventDate(a.dateISO || a.date) || new Date(0);
      const dateB = parseEventDate(b.dateISO || b.date) || new Date(0);
      return dateA - dateB;
    });
}

function isCalendarTimelineEvent(event) {
  if (!event) return false;
  if (isUpcoming(event)) {
    return isInWatchlist(event.id);
  }
  return (storedRatings[event.id] || 0) > 0;
}

function getCalendarTimelineEvents() {
  return events
    .filter((event) => {
      if (!isCalendarTimelineEvent(event)) return false;
      return Boolean(parseEventDate(event.dateISO || event.date));
    })
    .sort((a, b) => {
      const dateA = parseEventDate(a.dateISO || a.date) || new Date(0);
      const dateB = parseEventDate(b.dateISO || b.date) || new Date(0);
      return dateA - dateB;
    });
}

function buildCalendarEventChip(event, options = {}) {
  if (!event) return "";
  const spotlightIds = options.spotlightIds instanceof Set ? options.spotlightIds : null;
  const isSpotlight = Boolean(spotlightIds && spotlightIds.has(event.id));
  const rating = storedRatings[event.id] || 0;
  const userScore = clampSofaScore(rating);
  const inWatchlist = isInWatchlist(event.id);
  const statusClass = getStatusClass(event);
  const isFuture = isUpcoming(event);
  const hasUserScore = !isFuture && rating > 0;
  const timeLabel = getEventTimeLabel(event);
  const rightSide = isFuture
    ? buildAddWatchlistFabButton({
      eventId: event.id,
      isSaved: inWatchlist,
      watchlistCount: getWatchlistCount(event),
      className: "calendar-chip-watchlist-control",
    })
    : hasUserScore
      ? buildEventUserScoreChip(userScore, { className: "calendar-chip-score-chip" })
      : "";
  return `
    <div class="calendar-chip ${statusClass} ${inWatchlist ? "is-watchlist" : ""} ${rating ? "is-rated" : ""} ${isSpotlight ? "is-spotlight" : ""}" data-href="${eventUrlFor(event)}">
      <span class="calendar-chip-title">${event.title}${timeLabel ? ` · ${timeLabel}` : ""}</span>
      <span class="calendar-chip-right">
        ${buildEventSportChip(event.sport, { className: "calendar-chip-sport-chip" })}
        ${rightSide}
      </span>
    </div>
  `;
}

function getCalendarSpotlightEventIds(list = []) {
  const eventsList = Array.isArray(list) ? list.filter(Boolean) : [];
  if (!eventsList.length) return new Set();

  const upcoming = eventsList.filter((event) => isUpcoming(event));
  const past = eventsList.filter((event) => !isUpcoming(event));
  const spotlightIds = new Set();

  const pickTop = (items, scoreFn, ratio = 0.35) => {
    if (!items.length) return [];
    const count = Math.min(items.length, Math.max(1, Math.ceil(items.length * ratio)));
    return items
      .slice()
      .sort((a, b) => scoreFn(b) - scoreFn(a))
      .slice(0, count);
  };

  const upcomingTop = pickTop(
    upcoming,
    (event) => getWatchlistCount(event) + ((event.communityScore || 0) * 110),
    0.4
  );
  const pastTop = pickTop(
    past,
    (event) => ((storedRatings[event.id] || 0) * 3) + ((event.communityScore || 0) * 100),
    0.35
  );

  [...upcomingTop, ...pastTop].forEach((event) => {
    if (event?.id) spotlightIds.add(event.id);
  });
  return spotlightIds;
}

function getCalendarBaseDate() {
  if (!calendarDateEl) return new Date();
  if (!calendarDateEl.value) {
    const now = new Date();
    calendarDateEl.value = formatDateKey(new Date(now.getFullYear(), now.getMonth(), 1));
  }
  const parsed = parseEventDate(calendarDateEl.value);
  if (!parsed || Number.isNaN(parsed.getTime())) {
    const now = new Date();
    const fallback = new Date(now.getFullYear(), now.getMonth(), 1);
    calendarDateEl.value = formatDateKey(fallback);
    return fallback;
  }
  return new Date(parsed.getFullYear(), parsed.getMonth(), 1);
}

function setCalendarBaseDate(dateInput) {
  if (!calendarDateEl) return new Date();
  const parsed = dateInput instanceof Date ? new Date(dateInput.getTime()) : parseEventDate(dateInput);
  const source = parsed && !Number.isNaN(parsed.getTime()) ? parsed : new Date();
  const normalized = new Date(source.getFullYear(), source.getMonth(), 1);
  calendarDateEl.value = formatDateKey(normalized);
  return normalized;
}

function updateCalendarPeriodControls(baseDate) {
  if (!baseDate || Number.isNaN(baseDate.getTime())) return;
  if (calendarMonthLabelEl) {
    calendarMonthLabelEl.textContent = formatFrenchDateLabel(baseDate, { day: false, month: "long", year: false });
  }
  if (calendarYearLabelEl) {
    calendarYearLabelEl.textContent = String(baseDate.getFullYear());
  }
}

function buildCalendarMonthGrid(list, baseDate, options = {}) {
  const monthStart = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
  const monthEnd = new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 0);
  const gridStart = new Date(monthStart);
  const startOffset = (gridStart.getDay() + 6) % 7;
  gridStart.setDate(gridStart.getDate() - startOffset);
  const gridEnd = new Date(monthEnd);
  const endOffset = 6 - ((gridEnd.getDay() + 6) % 7);
  gridEnd.setDate(gridEnd.getDate() + endOffset);

  const eventsByDay = new Map();
  list.forEach((event) => {
    const date = parseEventDate(event.dateISO || event.date);
    if (!date) return;
    const key = formatDateKey(date);
    if (!eventsByDay.has(key)) {
      eventsByDay.set(key, []);
    }
    eventsByDay.get(key).push(event);
  });
  eventsByDay.forEach((items) => {
    items.sort((a, b) => (b.communityScore || 0) - (a.communityScore || 0));
  });

  const todayKey = formatDateKey(new Date());
  const dayNames = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
  let html = `<div class="calendar-month-grid">`;
  html += `
    <div class="calendar-week calendar-week-head">
      ${dayNames.map((label) => `<span>${label}</span>`).join("")}
    </div>
  `;

  let cursor = new Date(gridStart);
  while (cursor <= gridEnd) {
    html += `<div class="calendar-week">`;
    for (let i = 0; i < 7; i += 1) {
      const day = new Date(cursor);
      const key = formatDateKey(day);
      const items = eventsByDay.get(key) || [];
      const isCurrentMonth = day.getMonth() === baseDate.getMonth();
      const isToday = key === todayKey;
      const chips = items.slice(0, 3).map((event) => buildCalendarEventChip(event, options)).join("");
      const more = items.length > 3 ? `<div class="calendar-chip-more">+${items.length - 3}</div>` : "";

      html += `
        <div class="calendar-day ${isCurrentMonth ? "" : "is-dim"} ${isToday ? "is-today" : ""}">
          <div class="calendar-day-head">
            <span class="calendar-day-number">${day.getDate()}</span>
            ${items.length ? `<span class="calendar-day-count">${items.length}</span>` : ""}
          </div>
          <div class="calendar-day-events">
            ${chips}
            ${more}
          </div>
        </div>
      `;
      cursor.setDate(cursor.getDate() + 1);
    }
    html += `</div>`;
  }
  html += `</div>`;
  return html;
}

function renderCalendar() {
  if (!calendarListEl || !calendarDateEl) return;
  const baseDate = getCalendarBaseDate();
  updateCalendarPeriodControls(baseDate);
  const monthStart = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
  const monthEndExclusive = new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 1);

  if (calendarModeListEl && calendarModeWatchlistEl) {
    calendarModeListEl.classList.toggle("is-active", !calendarState.watchlistMonthMode);
    calendarModeWatchlistEl.classList.toggle("is-active", calendarState.watchlistMonthMode);
  }

  if (calendarFocusSpotlightEl) {
    calendarFocusSpotlightEl.classList.toggle("is-active", calendarState.spotlightOnly);
  }

  const monthEvents = filterEventsByActiveSports(events).filter((event) => {
    const date = parseEventDate(event.dateISO || event.date);
    if (!date) return false;
    if (date < monthStart || date >= monthEndExclusive) return false;
    return true;
  });

  let list = monthEvents.filter((event) => {
    return isCalendarTimelineEvent(event);
  });

  const baseUserEventIds = new Set(list.map((event) => event.id));

  list = list.sort((a, b) => {
    const dateA = parseEventDate(a.dateISO || a.date) || new Date(0);
    const dateB = parseEventDate(b.dateISO || b.date) || new Date(0);
    return dateA - dateB;
  });

  const spotlightIds = getCalendarSpotlightEventIds(monthEvents);
  const addedSpotlightIds = new Set();
  if (calendarState.spotlightOnly) {
    const merged = [...list];
    const knownIds = new Set(list.map((event) => event.id));
    monthEvents.forEach((event) => {
      if (!spotlightIds.has(event.id)) return;
      if (knownIds.has(event.id)) return;
      merged.push(event);
      knownIds.add(event.id);
      if (!baseUserEventIds.has(event.id)) {
        addedSpotlightIds.add(event.id);
      }
    });
    list = merged.sort((a, b) => {
      const dateA = parseEventDate(a.dateISO || a.date) || new Date(0);
      const dateB = parseEventDate(b.dateISO || b.date) || new Date(0);
      return dateA - dateB;
    });
  }

  if (calendarSummaryEl) {
    const eventWord = list.length > 1 ? "événements" : "événement";
    const spotlightPrefix = calendarState.spotlightOnly
      ? "Base utilisateur + attendus/mieux notés · "
      : "";
    calendarSummaryEl.textContent = `${spotlightPrefix}${list.length} ${eventWord}`;
  }

  const activeSpotlightIds = calendarState.spotlightOnly ? addedSpotlightIds : new Set();

  if (calendarState.watchlistMonthMode) {
    calendarListEl.classList.add("is-month-grid");
    calendarListEl.innerHTML = buildCalendarMonthGrid(list, baseDate, { spotlightIds: activeSpotlightIds });
    return;
  }

  calendarListEl.classList.remove("is-month-grid");

  if (!list.length) {
    const emptyText = calendarState.spotlightOnly
      ? "Aucun événement attendu ou très bien noté sur ce mois."
      : "Aucun événement noté/watchlist sur ce mois.";
    calendarListEl.innerHTML = buildEmptyStateCard(emptyText);
    return;
  }

  const groupMap = new Map();
  list.forEach((event) => {
    const key = event.leagueTitle || event.league || "Competitions";
    if (!groupMap.has(key)) {
      groupMap.set(key, []);
    }
    groupMap.get(key).push(event);
  });

  const groups = Array.from(groupMap.entries()).map(([title, items]) => {
    const sorted = items.slice().sort((a, b) => {
      const dateA = parseEventDate(a.dateISO || a.date) || new Date(0);
      const dateB = parseEventDate(b.dateISO || b.date) || new Date(0);
      return dateA - dateB;
    });
    return { title, items: sorted };
  }).sort((a, b) => {
    const aDate = parseEventDate(a.items[0]?.dateISO || a.items[0]?.date) || new Date(0);
    const bDate = parseEventDate(b.items[0]?.dateISO || b.items[0]?.date) || new Date(0);
    return aDate - bDate;
  });

  calendarListEl.innerHTML = groups
    .map((group) => {
      const leagueSport = group.items[0]?.sport || "";
      return `
        <details class="calendar-league" open>
          <summary>
            <div class="calendar-league-title">
              <span class="tag rank-tag">Ligue</span>
              <strong>${group.title}</strong>
              <span class="muted">${group.items.length} matchs</span>
            </div>
            <span class="calendar-league-sport">${leagueSport}</span>
          </summary>
          <div class="calendar-items">
            ${group.items.map((event) => {
              const statusClass = getStatusClass(event);
              const isSpotlight = activeSpotlightIds.has(event.id);
              const rating = storedRatings[event.id] || 0;
              const showRating = !isUpcoming(event) && rating > 0;
              const noteLabel = clampSofaScore(rating);
              return `
                <div class="calendar-item ${statusClass} ${isSpotlight ? "is-spotlight" : ""}" data-href="${eventUrlFor(event)}">
                  <img class="calendar-thumb" src="${getEventImage(event)}" alt="${event.title}">
                  <div class="calendar-info">
                    <div class="calendar-title">
                      <strong>${event.title}</strong>
                      ${buildEventStatusTag(event)}
                    </div>
                    <div class="calendar-meta">
                      <span>${getEventDateTimeLabel(event)}</span>
                      <span class="muted">${event.location}</span>
                    </div>
                  </div>
                  <div class="calendar-badges">
                    ${showRating ? buildScoreBadge(noteLabel, "tiny") : ""}
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </details>
      `;
    })
    .join("");
}

function buildEventCard(event, options = {}) {
  const {
    size = "default",
    note = "",
    rank = null,
    linkMode = "page",
  } = options;
  const isCompact = size === "compact";
  const sizeClass = isCompact ? "compact" : "";
  const statusClass = getStatusClass(event);
  const isFuture = isUpcoming(event);
  const link = eventUrlFor(event);
  const userRating = storedRatings[event.id] || 0;
  const userScore = clampSofaScore(userRating);
  const hasUserScore = !isFuture && userScore > 0;
  const communityScore = toSofaScore(event.communityScore || 0);
  const watchlistCount = getWatchlistCount(event);
  const isSavedInWatchlist = isInWatchlist(event.id);
  const watchlistButton = buildAddWatchlistFabButton({
    eventId: event.id,
    isSaved: isSavedInWatchlist,
    watchlistCount,
  });
  const participantStrip = buildEventPlayerMiniaturesElement(event.id, { maxPlayers: 6 });
  const descriptionBlock = buildEventDescriptionBlock(event);
  const tagsWidget = buildObjectTagsWidget("event", event.id, {
    className: "object-tags-inline",
    compact: isCompact,
  });
  const rankClass = Number.isFinite(rank) && rank > 0 ? `rank-${Math.min(rank, 3)}` : "";
  const rankBadge = Number.isFinite(rank) && rank > 0 ? `<span class="rank-badge ${rankClass}">#${rank}</span>` : "";
  const leadingTopChip = isFuture
    ? buildEventUpcomingCountdownText(event)
    : !isFuture
    ? (hasUserScore
      ? buildEventUserScoreToggleButton(userScore, { eventId: event.id })
      : buildEventRateChipButton({ eventId: event.id, href: link }))
    : "";
  const showGauge = !isFuture && expandedEventCardGaugeIds.has(event.id);
  const cornerAria = isFuture
    ? `Sport ${event.sport}, ${formatNumber(watchlistCount)} en watchlist`
    : hasUserScore
      ? `Mon score ${userScore}, sport ${event.sport}, score communauté ${communityScore}%`
      : `Noter l'événement, sport ${event.sport}, score communauté ${communityScore}%`;
  const cornerMeta = buildEventCornerMeta({
    sport: event.sport,
    isFuture,
    communityScore,
    leadingChipHtml: leadingTopChip,
    watchlistButtonHtml: watchlistButton,
    ariaLabel: cornerAria,
  });
  const commentType = isFuture ? "teaser" : "critique";
  const commentCompact = true;
  const topComment = getCommentsForEvent(event.id, commentType)
    .slice()
    .sort((a, b) => getCommentTotalLikes(b) - getCommentTotalLikes(a))[0];
  const safeContextNote = note ? escapeHtml(note) : "";
  const commentBlock = topComment
    ? buildUnifiedCommentCard(
      topComment,
      {
        mode: isFuture ? "comment" : "review",
        likeButtonType: "comment",
        eventId: event.id,
        eventName: false,
        showFollowButton: false,
        showReplies: false,
        compact: commentCompact,
        className: "event-card-comment-card",
      }
    )
    : `<div class="comment-preview ${commentCompact ? "compact" : ""}">
        ${safeContextNote ? `<div class="comment-preview-context">${safeContextNote}</div>` : ""}
        <div class="comment-preview-empty">Aucun commentaire pour le moment.</div>
      </div>`;
  return buildFrameElement(`
    ${cornerMeta}
    <div class="event-card-body ${showGauge ? "has-gauge" : ""}">
      ${showGauge ? `
        <div class="event-secondary">
          ${buildSofaScoreGauge(event, userRating, isCompact ? "compact" : "default")}
        </div>
      ` : ""}
      <div class="event-main">
        <div class="event-media">
          <img src="${getEventImage(event)}" alt="${event.title}">
          <div class="event-media-overlay ${isCompact ? "compact" : ""}">
            <div class="overlay-top">
              ${rankBadge}
              ${buildEventStatusTag(event)}
            </div>
            ${participantStrip ? `
              <div class="overlay-participants">
                ${participantStrip}
              </div>
            ` : ""}
            ${descriptionBlock ? `<div class="overlay-description">${descriptionBlock}</div>` : ""}
          </div>
        </div>
        <div class="event-card-comment ${isCompact ? "compact" : ""}">
          ${safeContextNote && topComment ? `<div class="comment-preview-context">${safeContextNote}</div>` : ""}
          ${commentBlock}
        </div>
      </div>
    </div>
    ${tagsWidget}
  `, {
    tag: "article",
    className: `event-card ${sizeClass} ${statusClass}`,
    attributes: `data-event-id="${event.id}"${linkMode === "overlay" ? "" : ` data-href="${link}"`}`,
  });
}

function getTeamEvents(teamId) {
  return eventTeams
    .filter((entry) => entry.teamIds.includes(teamId))
    .map((entry) => events.find((event) => event.id === entry.eventId))
    .filter(Boolean);
}

function getActiveSports() {
  return new Set(sports.filter((sport) => sport !== "Tous"));
}

function filterEventsByActiveSports(list) {
  const active = getActiveSports();
  return list.filter((event) => active.has(event.sport));
}

function getSportIconLabel(sport) {
  const map = {
    Football: "FB",
    Basketball: "BB",
    Tennis: "TN",
    "Sport auto": "F1",
    Rugby: "RG",
    Cyclisme: "CY",
    MMA: "MMA",
    "Multi-sport": "MS",
    Athlétisme: "AT",
    Cricket: "CR",
    Golf: "GL",
    Baseball: "BS",
    Boxe: "BX",
    Natation: "NT",
    Ski: "SK",
    "Patinage artistique": "PA",
    Gymnastique: "GY",
  };
  return map[sport] || sport.slice(0, 2).toUpperCase();
}

function startHeroAutoScroll() {
  if (!heroFeaturedEl || heroState.list.length === 0) return;
  if (heroAutoTimer) clearInterval(heroAutoTimer);
  heroAutoTimer = setInterval(() => {
    heroState.index = (heroState.index + 1) % heroState.list.length;
    renderHeroFeatured();
  }, 5000);
}

function renderFilters() {
  if (!filtersEl) return;
  filtersEl.innerHTML = "";
  const active = getActiveSports();
  if (state.filter !== "Tous" && !active.has(state.filter)) {
    state.filter = "Tous";
  }
  const list = ["Tous", ...Array.from(active)];
  list.forEach((sport) => {
    const button = document.createElement("button");
    button.className = `filter-btn ${state.filter === sport ? "is-active" : ""}`;
    button.textContent = sport;
    button.dataset.sport = sport;
    filtersEl.appendChild(button);
  });
}

function createCard(event) {
  return buildEventCard(event);
}

function createPreviewCard(event) {
  return buildEventCard(event, { size: "compact" });
}

function renderEventCardCollections() {
  renderEvents();
  renderAnticipated();
  renderBestMonth();
  renderWatchlist();
  renderWatchlistPage();
  renderAthleteProfile();
  renderTeamProfile();
  renderFeedPage();
  syncAllSofaScoreThumbPositions();
}

function clearEventCardGaugeHideTimer(eventId) {
  if (!eventId) return;
  const timeoutId = eventCardGaugeHideTimers.get(eventId);
  if (timeoutId) {
    clearTimeout(timeoutId);
    eventCardGaugeHideTimers.delete(eventId);
  }
}

function openEventCardGauge(eventId, options = {}) {
  if (!eventId) return;
  const targetEvent = events.find((item) => item.id === eventId);
  if (!targetEvent || isUpcoming(targetEvent)) return;
  clearEventCardGaugeHideTimer(eventId);
  expandedEventCardGaugeIds.add(eventId);
  renderEventCardCollections();
  if (options.focus) {
    requestAnimationFrame(() => {
      const targetSlider = document.querySelector(`.event-card[data-event-id="${eventId}"] .sofa-score-input`);
      if (targetSlider) targetSlider.focus();
    });
  }
}

function scheduleEventCardGaugeHide(eventId, delayMs = 2000) {
  if (!eventId) return;
  clearEventCardGaugeHideTimer(eventId);
  const timeoutId = window.setTimeout(() => {
    expandedEventCardGaugeIds.delete(eventId);
    eventCardGaugeHideTimers.delete(eventId);
    renderEventCardCollections();
  }, delayMs);
  eventCardGaugeHideTimers.set(eventId, timeoutId);
}

function groupEvents(list) {
  const grouped = {};
  list.forEach((event) => {
    if (!grouped[event.sport]) {
      grouped[event.sport] = [];
    }
    grouped[event.sport].push(event);
  });
  return grouped;
}

function renderAnticipated() {
  if (!anticipatedListEl) return;
  const favorites = getFavoriteSports();
  let list = filterEventsByActiveSports(events).filter((event) => isUpcoming(event));
  if (favorites.length) {
    list = list.filter((event) => favorites.includes(event.sport));
  }
  list = list.sort((a, b) => b.communityScore - a.communityScore).slice(0, 4);
  if (list.length === 0) {
    list = filterEventsByActiveSports(events).slice(0, 4);
  }
  anticipatedListEl.innerHTML = list.map((event) => createPreviewCard(event)).join("");
}

function renderBestOf() {
  if (!bestOfListEl) return;
  const days = Number(bestOfRangeEl ? bestOfRangeEl.value : 7) || 7;
  const sportFilter = bestOfSportEl ? bestOfSportEl.value : "Tous";
  const now = new Date();
  const from = new Date(now);
  from.setDate(now.getDate() - days);

  let list = filterEventsByActiveSports(events).filter((event) => {
    const date = parseEventDate(event.dateISO || event.date);
    if (!date) return false;
    return date <= now && date >= from;
  });

  if (sportFilter !== "Tous") {
    list = list.filter((event) => event.sport === sportFilter);
  }

  list = list
    .sort((a, b) => b.communityScore - a.communityScore)
    .slice(0, 10);

  if (list.length === 0) {
    bestOfListEl.innerHTML = buildEmptyStateCard("Aucun événement noté sur cette période.");
    return;
  }

  bestOfListEl.innerHTML = list.map((event) => createPreviewCard(event)).join("");
}

function renderBestMonth() {
  if (!bestMonthListEl) return;
  const now = new Date();
  const list = filterEventsByActiveSports(events)
    .filter((event) => {
      const date = parseEventDate(event.dateISO || event.date);
      if (!date) return false;
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    })
    .sort((a, b) => b.communityScore - a.communityScore)
    .slice(0, 4);

  const fallback = filterEventsByActiveSports(events)
    .slice()
    .sort((a, b) => b.communityScore - a.communityScore)
    .slice(0, 4);

  const finalList = list.length ? list : fallback;
  bestMonthListEl.innerHTML = finalList.map((event) => createPreviewCard(event)).join("");
}

function setHoverStars(container, value) {
  const buttons = Array.from(container.querySelectorAll("button"));
  buttons.forEach((button) => {
    const starValue = Number(button.dataset.value || 0);
    button.classList.toggle("is-hover", starValue <= value);
  });
}

function renderCuratedLists() {
  if (!curatedListEl) return;
  const active = getActiveSports();
  curatedListEl.innerHTML = curatedLists
    .filter((list) => {
      if (list.sport === "Multi-sport") {
        const items = getListItems(list);
        return items.some((item) => {
          if (item.event) return active.has(item.event.sport);
          if (item.athlete) return active.has(item.athlete.sport);
          return false;
        });
      }
      return active.has(list.sport);
    })
    .map(
      (list) => {
        const owner = getUserById(list.ownerId);
        return buildRankingCard(list, {
          owner,
          showOwner: true,
          showFollowButton: true,
        });
      }
    )
    .join("");
}

function renderEvents() {
  if (!eventsListEl || !eventsSummaryEl) return;
  const filtered = filterEventsByActiveSports(events).filter((event) => {
    const matchesSport = state.filter === "Tous" || event.sport === state.filter;
    const matchesQuery =
      state.query === "" ||
      `${event.title} ${event.league} ${event.location}`
        .toLowerCase()
        .includes(state.query.toLowerCase());
    return matchesSport && matchesQuery;
  });

  eventsSummaryEl.textContent = `${filtered.length} événements affichés`;

  if (filtered.length === 0) {
    eventsListEl.innerHTML = buildEmptyStateCard("Aucun événement ne correspond a votre recherche.", {
      className: "event-card",
    });
    return;
  }

  if (state.filter === "Tous") {
    const grouped = groupEvents(filtered);
    eventsListEl.innerHTML = Object.keys(grouped)
      .map((sport) => {
        const cards = grouped[sport].map(createCard).join("");
        return `
          <div class="sport-group">
            <div class="sport-heading">${sport} <span>${grouped[sport].length} événements</span></div>
            <div class="card-grid">${cards}</div>
          </div>
        `;
      })
      .join("");
  } else {
    eventsListEl.innerHTML = `<div class="card-grid">${filtered.map(createCard).join("")}</div>`;
  }
  syncAllSofaScoreThumbPositions();
}

function renderReviews(eventId) {
  if (!reviewListEl) return;
  const event = events.find((item) => item.id === eventId);
  const isFuture = event && isUpcoming(event);
  if (isFuture) {
    const comments = getCommentsForEvent(eventId, "teaser");
    const fallback = {
      id: `fallback-com-${eventId}`,
      eventId,
      userId: "usr_KHHE5RBM3W4HKHHE7RBM3W5CKH",
      author: "Équipe Sofa Critics",
      commentType: "teaser",
      note: "Lancez la discussion avant le coup d'envoi.",
      likes: 0,
      replies: [],
    };
    const list = comments.length ? comments : [fallback];
    reviewListEl.innerHTML = list
      .map((comment) => buildUnifiedCommentCard(comment, {
        mode: "comment",
        eventId,
      }))
      .join("");
    return;
  }

  const reviews = getCommentsForEvent(eventId, "critique");
  const fallback = {
    id: `fallback-${eventId}`,
    eventId,
    userId: "usr_KHHE5RBM3W4HKHHE7RBM3W5CKH",
    author: "Équipe Sofa Critics",
    commentType: "critique",
    rating: 8,
    note: "Soyez la première personne à laisser un avis complet pour ce match.",
    likes: 0,
  };
  const list = reviews.length ? reviews : [fallback];
  reviewListEl.innerHTML = list
    .map((review) => buildUnifiedCommentCard(review, {
      mode: "review",
      eventId,
    }))
    .join("");
}

function renderLeagueReviews(leagueId) {
  if (!leagueReviewListEl) return;
  const fallbackLeague = leagueEvents[0] || null;
  const league = getLeagueById(leagueId) || fallbackLeague;
  if (!league) {
    leagueReviewListEl.innerHTML = buildEmptyStateCard("Aucune ligue disponible.");
    return;
  }

  const comments = getCommentsForLeague(league.id);
  if (!comments.length) {
    const fallback = {
      id: `fallback-league-${league.id}`,
      eventId: league.id,
      userId: "usr_KHHE5RBM3W4HKHHE7RBM3W5CKH",
      author: "Équipe Sofa Critics",
      commentType: "teaser",
      note: "Soyez la première personne à commenter cette compétition.",
      likes: 0,
      replies: [],
    };
    leagueReviewListEl.innerHTML = buildUnifiedCommentCard(fallback, {
      mode: "comment",
      eventId: league.id,
      eventName: "N",
    });
    return;
  }

  leagueReviewListEl.innerHTML = comments
    .map((comment) => {
      const mode = getCommentType(comment) === "critique" ? "review" : "comment";
      const commentEventId = comment.eventId || league.id;
      const isMatchComment = commentEventId !== league.id;
      return buildUnifiedCommentCard(comment, {
        mode,
        eventId: commentEventId,
        eventName: isMatchComment ? "Y" : "N",
      });
    })
    .join("");
}

function renderAthleteReviews(athleteId) {
  if (!athleteReviewListEl) return;
  const athlete = getAthleteById(athleteId) || athletes[0] || null;
  if (!athlete) {
    athleteReviewListEl.innerHTML = buildEmptyStateCard("Aucun sportif disponible.");
    return;
  }
  const comments = getCommentsForTarget(COMMENT_TARGET_ATHLETE, athlete.id);
  renderTargetReviewList(COMMENT_TARGET_ATHLETE, athlete.id, athleteReviewListEl, {
    comments,
    fallbackMessage: "Soyez la première personne à commenter ce sportif.",
  });
}

function renderTeamReviews(teamId) {
  if (!teamReviewListEl) return;
  const team = getTeamById(teamId) || teams[0] || null;
  if (!team) {
    teamReviewListEl.innerHTML = buildEmptyStateCard("Aucune équipe disponible.");
    return;
  }
  const comments = getCommentsForTarget(COMMENT_TARGET_TEAM, team.id);
  renderTargetReviewList(COMMENT_TARGET_TEAM, team.id, teamReviewListEl, {
    comments,
    fallbackMessage: "Soyez la première personne à commenter cette équipe.",
  });
}

function renderListReviews(listId) {
  if (!listReviewListEl) return;
  const list = curatedLists.find((item) => item.id === listId) || curatedLists[0] || null;
  if (!list) {
    listReviewListEl.innerHTML = buildEmptyStateCard("Aucun classement disponible.");
    return;
  }
  const comments = getCommentsForTarget(COMMENT_TARGET_LIST, list.id);
  renderTargetReviewList(COMMENT_TARGET_LIST, list.id, listReviewListEl, {
    comments,
    fallbackMessage: "Soyez la première personne à commenter ce classement.",
  });
}

function renderLeagueDetail() {
  if (!leagueDetailEl) return;
  const params = new URLSearchParams(window.location.search);
  const fallbackLeague = leagueSeasons[0] || null;
  const leagueId = params.get("id") || fallbackLeague?.id || "";
  const league = getLeagueSeasonById(leagueId) || fallbackLeague;
  if (!league) {
    activeLeagueId = null;
    leagueDetailEl.innerHTML = buildEmptyStateCard("Aucune ligue disponible.", {
      className: "event-card empty-card",
    });
    if (leagueCommentComposerEl) {
      leagueCommentComposerEl.innerHTML = "";
    }
    if (leagueReviewListEl) {
      leagueReviewListEl.innerHTML = buildEmptyStateCard("Aucun avis disponible.");
    }
    return;
  }

  const leagueRoot = getLeagueRootById(league.leagueId);
  if (leagueSeasonBackLinkEl) {
    if (leagueRoot) {
      leagueSeasonBackLinkEl.href = leagueUrlFor(leagueRoot);
      leagueSeasonBackLinkEl.textContent = `Retour à ${leagueRoot.title}`;
    } else {
      leagueSeasonBackLinkEl.href = "index.html#events";
      leagueSeasonBackLinkEl.textContent = "Retour aux événements";
    }
  }

  activeLeagueId = league.id;
  const matches = getLeagueMatches(league.id, { sort: "asc" });
  const dateWindow = getLeagueDateWindow(league.id);
  const safeDateRange = escapeHtml(getLeagueDateRangeLabel(league));
  const totalMatches = matches.length;
  const upcomingMatches = matches.filter((event) => isUpcoming(event));
  const pastMatches = matches.filter((event) => !isUpcoming(event));
  const leagueScore = clampSofaScore(toSofaScore(getLeagueCommunityScore(league.id) || 0));
  const leagueReviews = getLeagueReviewCount(league.id);
  const statusLabel = isUpcoming(league)
    ? (getUpcomingCountdownLabel(league) || "Compétition en cours")
    : "Compétition terminée";
  const safeStatus = escapeHtml(statusLabel);
  const nextWindowText = dateWindow.start && dateWindow.end
    ? `${formatFrenchDateLabel(dateWindow.start, { day: "2-digit", month: "long", year: "numeric" })} - ${formatFrenchDateLabel(dateWindow.end, { day: "2-digit", month: "long", year: "numeric" })}`
    : "Période non renseignée";
  const safeWindowText = escapeHtml(nextWindowText);
  const followingLeagueSeason = isFollowTargetFollowed("league-season", league.id);
  const featuredMatches = (upcomingMatches.length ? upcomingMatches : pastMatches.slice(-5).reverse()).slice(0, 6);
  const featuredMatchesMarkup = featuredMatches.length
    ? featuredMatches
      .map((event) => `<a class="participant-pill" href="${eventUrlFor(event)}">${escapeHtml(event.title || "Match")}</a>`)
      .join("")
    : '<span class="muted">Aucun match disponible.</span>';
  const primaryLeagueCardMarkup = buildLeagueCard(league, {
    maxRows: 8,
    className: "league-detail-card",
    variant: "season",
  });

  leagueDetailEl.innerHTML = `
    <div class="event-detail-top">
      <div class="event-detail-primary">
        ${primaryLeagueCardMarkup}
      </div>
      <aside class="event-detail-complementary">
        <div class="event-detail-header">
          <span class="tag">${escapeHtml(league.sport || "Sport")}</span>
          <h1>${escapeHtml(league.title || "Compétition")}</h1>
          ${leagueRoot ? `<p class="muted">Compétition: <a class="user-link" href="${leagueUrlFor(leagueRoot)}">${escapeHtml(leagueRoot.title)}</a></p>` : ""}
          <p class="muted">${safeDateRange}</p>
          <p class="muted">${safeWindowText}</p>
          <p>${totalMatches > 1 ? `${formatNumber(totalMatches)} matchs sur la période.` : `${formatNumber(totalMatches)} match sur la période.`}</p>
        </div>
        <div class="event-detail-grid">
          ${buildDetailStatCard("Statut", safeStatus, { rawValue: true })}
          ${buildDetailStatCard("Communauté", `${leagueScore}%`)}
          ${buildDetailStatCard("Matchs", formatNumber(totalMatches))}
          ${buildDetailStatCard("Avis", formatNumber(leagueReviews))}
        </div>
        <div class="event-participants">
          <span class="muted">${upcomingMatches.length ? "Matchs à venir" : "Matchs marquants"}</span>
          <div class="participant-list">
            ${featuredMatchesMarkup}
          </div>
        </div>
        ${buildRatingDistributionChart(league, {
          scope: "league",
          className: "event-detail-rating-chart",
        })}
        <div class="event-actions">
          <div class="event-action-meta">
            ${buildFollowButton({
              targetType: "league-season",
              targetId: league.id,
              isFollowing: followingLeagueSeason,
              className: "league-season-follow-btn",
            })}
          </div>
        </div>
      </aside>
    </div>
  `;

  mountObjectCommentComposer(leagueCommentComposerEl, COMMENT_TARGET_LEAGUE_SEASON, league.id, {
    defaultMode: "teaser",
    placeholder: "Ajouter un commentaire sur cette saison...",
    submitLabel: "Publier",
  });
  renderLeagueReviews(league.id);
}

function renderLeaguePage() {
  if (!leaguePageDetailEl) return;
  const params = new URLSearchParams(window.location.search);
  const fallbackLeague = leagues[0] || null;
  const leagueId = params.get("id") || fallbackLeague?.id || "";
  const league = getLeagueRootById(leagueId) || fallbackLeague;

  if (!league) {
    activeLeagueRootId = null;
    leaguePageDetailEl.innerHTML = buildEmptyStateCard("Aucune compétition disponible.", {
      className: "event-card empty-card",
    });
    if (leagueSeasonListEl) {
      leagueSeasonListEl.innerHTML = buildEmptyStateCard("Aucune saison disponible.");
    }
    if (leaguePageReviewListEl) {
      leaguePageReviewListEl.innerHTML = buildEmptyStateCard("Aucun avis disponible.");
    }
    if (leaguePageCommentComposerEl) {
      leaguePageCommentComposerEl.innerHTML = "";
    }
    return;
  }

  activeLeagueRootId = league.id;
  const seasons = getLeagueSeasonsByLeagueId(league.id, { sort: "desc" });
  const totalMatches = Number(league.count || 0);
  const averageScore = clampSofaScore(toSofaScore(league.communityScore || 0));
  const leagueReviews = getCommentsForLeagueRoot(league.id).length;
  const followingLeague = isFollowTargetFollowed("league", league.id);
  const dateWindow = getLeagueRootDateWindow(league.id);
  const dateWindowText = dateWindow.start && dateWindow.end
    ? `${formatFrenchDateLabel(dateWindow.start, { day: "2-digit", month: "short", year: "numeric" })} - ${formatFrenchDateLabel(dateWindow.end, { day: "2-digit", month: "short", year: "numeric" })}`
    : "Période non renseignée";
  const safeDateWindow = escapeHtml(dateWindowText);
  const primaryLeagueCardMarkup = buildLeagueCard(league, {
    maxRows: 8,
    className: "league-detail-card",
    variant: "generic",
  });
  const nameHistory = Array.isArray(league.nameHistory) ? league.nameHistory : [];
  const nameHistoryMarkup = nameHistory.length
    ? `<ul class="league-name-history-list">
        ${nameHistory
          .map((entry) => `<li><strong>${escapeHtml(entry.name)}</strong><span class="muted">${escapeHtml(entry.period || "Date inconnue")}</span></li>`)
          .join("")}
      </ul>`
    : '<p class="muted">Aucun historique de nom disponible.</p>';

  leaguePageDetailEl.innerHTML = `
    <div class="event-detail-top">
      <div class="event-detail-primary">
        ${primaryLeagueCardMarkup}
      </div>
      <aside class="event-detail-complementary">
        <div class="event-detail-header">
          <span class="tag">${escapeHtml(league.sport || "Sport")}</span>
          <h1>${escapeHtml(league.title || "Compétition")}</h1>
          <p class="muted">${safeDateWindow}</p>
          <p>${league.seasonCount > 1 ? `${formatNumber(league.seasonCount)} saisons référencées.` : `${formatNumber(league.seasonCount)} saison référencée.`}</p>
        </div>
        <div class="event-detail-grid">
          ${buildDetailStatCard("Saisons", formatNumber(league.seasonCount || seasons.length))}
          ${buildDetailStatCard("Matchs", formatNumber(totalMatches))}
          ${buildDetailStatCard("Communauté", `${averageScore}%`)}
          ${buildDetailStatCard("Avis", formatNumber(leagueReviews))}
        </div>
        <div class="event-participants">
          <span class="muted">Historique des noms</span>
          ${nameHistoryMarkup}
        </div>
        <div class="event-actions">
          <div class="event-action-meta">
            ${buildFollowButton({
              targetType: "league",
              targetId: league.id,
              isFollowing: followingLeague,
              className: "league-follow-btn",
            })}
          </div>
        </div>
      </aside>
    </div>
  `;

  mountObjectCommentComposer(leaguePageCommentComposerEl, COMMENT_TARGET_LEAGUE, league.id, {
    defaultMode: "teaser",
    placeholder: "Ajouter un commentaire sur cette compétition...",
    submitLabel: "Publier",
  });

  if (leagueSeasonListEl) {
    if (!seasons.length) {
      leagueSeasonListEl.innerHTML = buildEmptyStateCard("Aucune saison disponible.");
    } else {
      leagueSeasonListEl.innerHTML = seasons
        .map((season) => buildLeagueCard(season, { maxRows: 6, variant: "season" }))
        .join("");
    }
  }

  if (leaguePageReviewListEl) {
    const comments = getCommentsForLeagueRoot(league.id);
    if (!comments.length) {
      leaguePageReviewListEl.innerHTML = buildEmptyStateCard("Aucun avis pour cette compétition.");
    } else {
      leaguePageReviewListEl.innerHTML = comments
        .map((comment) => {
          const mode = getCommentType(comment) === "critique" ? "review" : "comment";
          const isMatchComment = Boolean(events.find((event) => event.id === comment.eventId));
          return buildUnifiedCommentCard(comment, {
            mode,
            eventId: comment.eventId,
            eventName: isMatchComment ? "Y" : "N",
          });
        })
        .join("");
    }
  }
}

function renderWatchlist() {
  if (!watchlistListEl) return;
  const list = filterEventsByActiveSports(events).filter((event) => watchlist.has(event.id));
  if (list.length === 0) {
    watchlistListEl.innerHTML = buildEmptyStateCard(
      "Votre liste de suivi est vide. Ajoutez des matchs futurs pour les retrouver ici."
    );
    return;
  }
  watchlistListEl.innerHTML = list.map((event) => createPreviewCard(event)).join("");
}

function renderWatchlistFilters() {
  if (!watchlistFilterEl) return;
  watchlistFilterEl.innerHTML = "";
  const active = getActiveSports();
  if (watchlistState.filter !== "Tous" && !active.has(watchlistState.filter)) {
    watchlistState.filter = "Tous";
  }
  const list = ["Tous", ...Array.from(active)];
  list.forEach((sport) => {
    const button = document.createElement("button");
    button.className = `filter-btn ${watchlistState.filter === sport ? "is-active" : ""}`;
    button.textContent = sport;
    button.dataset.sport = sport;
    watchlistFilterEl.appendChild(button);
  });
}

function getWatchlistItems() {
  let list = filterEventsByActiveSports(events).filter((event) => watchlist.has(event.id));

  if (watchlistState.filter !== "Tous") {
    list = list.filter((event) => event.sport === watchlistState.filter);
  }

  if (watchlistState.query) {
    const q = watchlistState.query.toLowerCase();
    list = list.filter((event) => {
      const haystack = `${event.title} ${event.league} ${event.location} ${event.sport}`.toLowerCase();
      return haystack.includes(q);
    });
  }

  if (watchlistState.sort === "score") {
    list = list.slice().sort((a, b) => b.communityScore - a.communityScore);
  } else if (watchlistState.sort === "rating") {
    list = list.slice().sort((a, b) => {
      const ratingA = storedRatings[a.id] || 0;
      const ratingB = storedRatings[b.id] || 0;
      return ratingB - ratingA;
    });
  } else {
    list = list.slice().sort((a, b) => {
      const dateA = parseEventDate(a.dateISO || a.date) || new Date(0);
      const dateB = parseEventDate(b.dateISO || b.date) || new Date(0);
      return dateA - dateB;
    });
  }

  return list;
}

function renderWatchlistPage() {
  if (!watchlistItemsEl || !watchlistSummaryEl) return;
  renderWatchlistFilters();
  const list = getWatchlistItems();
  watchlistSummaryEl.textContent = `${list.length} événements affichés`;
  if (list.length === 0) {
    watchlistItemsEl.innerHTML = buildEmptyStateCard("Aucun événement dans votre liste pour ce filtre.");
    return;
  }
  const grouped = new Map();
  list.forEach((event) => {
    const date = parseEventDate(event.dateISO || event.date) || new Date();
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    if (!grouped.has(key)) {
      grouped.set(key, { date, items: [] });
    }
    grouped.get(key).items.push({ event, date });
  });

  const diaryHead = `
    <div class="watchlist-diary-head">
      <span class="diary-label">Journal</span>
      <span class="diary-count">${list.length}</span>
    </div>
  `;

  const groupsHtml = Array.from(grouped.values())
    .map((group) => {
      const monthLabel = formatFrenchDateLabel(group.date, {
        day: false,
        month: "long",
        year: false,
        uppercase: true,
      });
      const yearLabel = group.date.getFullYear();
      const entries = group.items
        .map(({ event }) => {
          return buildCalendarEventChip(event);
        })
        .join("");

      return `
        <div class="watchlist-month-group">
          <div class="calendar-pill">
            <div class="calendar-rings">
              <span></span>
              <span></span>
            </div>
            <div class="calendar-month">${monthLabel}</div>
            <div class="calendar-year">${yearLabel}</div>
          </div>
          <div class="watchlist-month-entries calendar-mini-grid">
            ${entries}
          </div>
        </div>
      `;
    })
    .join("");

  watchlistItemsEl.innerHTML = diaryHead + groupsHtml;
}

function renderListDetail() {
  if (!listDetailEl) return;
  const params = new URLSearchParams(window.location.search);
  const listId = params.get("id") || curatedLists[0].id;
  const list = curatedLists.find((item) => item.id === listId) || curatedLists[0];
  const owner = getUserById(list.ownerId);
  const liked = Boolean(storedListLikes[list.id]);
  const totalLikes = (list.likes || 0) + (liked ? 1 : 0);
  const following = Boolean(storedUserFollows[owner.id]);
  const followers = getFollowersCount(owner.id);
  activeListId = list.id;
  const listItems = getListItems(list);
  const totalItems = listItems.length || list.count;
  const itemLabel = getListItemLabel(list);
  const heroItem = listItems[0];
  const heroImage = heroItem ? getListItemImage(heroItem) : "images/events/samplegeneric.jpeg";
  const heroLabel = heroItem?.event?.title || heroItem?.athlete?.name || list.title;
  const listPrimaryRankingCardMarkup = buildRankingCard(list, {
    showOwner: false,
    className: "list-hero-ranking-card",
  });
  const listScore = listItems.length
    ? Math.round(
        (listItems.reduce((sum, item) => {
          const scoreValue = item.event
            ? item.event.communityScore
            : typeof item.entry.score === "number"
              ? item.entry.score
              : 0;
          return sum + (Number.isFinite(scoreValue) ? scoreValue : 0);
        }, 0) /
          listItems.length) *
          10
      )
    : null;
  const listScoreLabel = listScore == null ? "" : buildScoreBadge(listScore, "small");
  const previewImages = getListPreviewImages(list, 6);

  listDetailEl.innerHTML = `
    <div class="list-hero-grid">
      <div class="list-hero-media">
        <div class="list-hero-event-card">
          ${listPrimaryRankingCardMarkup}
        </div>
        <div class="list-hero-poster">
          <img src="${heroImage}" alt="${heroLabel}">
          <div class="list-hero-metrics">
            <span>❤ ${formatNumber(totalLikes)}</span>
            ${listScoreLabel ? `<span>${listScoreLabel}</span>` : "<span>-</span>"}
          </div>
        </div>
        <div class="list-hero-collage">
          ${previewImages.slice(1, 5).map((src, index) => `
            <div class="list-collage-tile">
              <img src="${src}" alt="Aperçu ${index + 2}">
            </div>
          `).join("")}
        </div>
      </div>
      <div class="list-hero-content">
        <div class="list-tags">
          <span class="tag rank-tag">Classement</span>
          <span class="tag">${list.sport}</span>
        </div>
        <h1>${list.title}</h1>
        <p class="list-hero-desc">${list.description}</p>
        <div class="list-hero-author">
          <a class="user-link" href="profile.html?id=${owner.id}">${owner.name}</a>
          <span class="muted">${owner.handle}</span>
        </div>
        <div class="list-hero-meta">
          <div>
          <span class="muted">${itemLabel}</span>
          <strong>${totalItems}</strong>
          </div>
          <div>
            <span class="muted">Likes</span>
            <strong>${formatNumber(totalLikes)}</strong>
          </div>
          <div>
            <span class="muted">Score moyen</span>
            <strong>${listScoreLabel || "-"}</strong>
          </div>
        </div>
        <div class="list-hero-actions">
          ${buildCommentLikeButton({
            type: "list",
            targetType: "list",
            targetId: list.id,
            liked,
            totalLikes,
            listId: list.id,
            className: "list-like-button",
            label: liked ? "Classement aime" : "J'aime le classement",
          })}
          <button class="follow-button ${following ? "is-following" : ""}" data-user-id="${owner.id}">
            ${following ? "Suivi" : "Suivre"} · ${followers}
          </button>
        </div>
        <div class="list-hero-story">
          <p>Un classement construit autour de l'intensite sportive, de l'ambiance et de l'impact sur la saison.</p>
          <p class="muted">Ajoutez vos notes pour faire remonter vos matchs préférés dans les tendances.</p>
        </div>
      </div>
    </div>
  `;

  mountObjectCommentComposer(listCommentComposerEl, COMMENT_TARGET_LIST, list.id, {
    defaultMode: "teaser",
    placeholder: "Ajouter un commentaire sur ce classement...",
    submitLabel: "Publier",
  });
  renderListReviews(list.id);

  if (!listEventsEl) return;
  if (listItems.length === 0) {
    listEventsEl.innerHTML = buildEmptyStateCard(`Aucun ${itemLabel} disponible dans ce classement.`);
    return;
  }
  listEventsEl.innerHTML = listItems
    .map((item) => {
      if (item.event) {
        const note = item.note || "Sélection du créateur.";
        return `
          <article class="list-ranking-entry">
            <div class="list-ranking-position" aria-label="Position ${item.order}">#${item.order}</div>
            <div class="list-ranking-main">
              <div class="list-ranking-event-row">
                <div class="list-ranking-event-card">
                  ${buildEventCard(item.event, {
                    size: "compact",
                  })}
                </div>
                <div class="list-ranking-description">
                  <h3 class="list-ranking-description-title">Pourquoi ce choix</h3>
                  <p class="muted">${escapeHtml(note)}</p>
                </div>
              </div>
            </div>
          </article>
        `;
      }
      if (item.athlete) {
        const note = item.note || "Sélection du créateur.";
        return `
          <article class="list-ranking-entry">
            <div class="list-ranking-position" aria-label="Position ${item.order}">#${item.order}</div>
            <div class="list-ranking-main">
              <div class="list-ranking-athlete-meta">
                ${buildTagTextboxElement(note, {
                  asInput: false,
                  secondary: true,
                  className: "list-ranking-athlete-note",
                })}
              </div>
              ${buildPlayerCard(item.athlete, {
                className: "list-ranking-athlete-card",
              })}
            </div>
          </article>
        `;
      }
      return "";
    })
    .join("");

  if (listSidebarEl) {
    listSidebarEl.innerHTML = "";
  }
}

function renderUserProfile() {
  if (!userDetailEl) return;
  const params = new URLSearchParams(window.location.search);
  const userId = params.get("id") || users[0].id;
  const user = users.find((item) => item.id === userId) || users[0];
  const following = Boolean(storedUserFollows[user.id]);
  const followers = getFollowersCount(user.id);
  const lists = curatedLists.filter((list) => list.ownerId === user.id);
  const critiques = reviewSamples.filter((review) => review.userId === user.id);
  const likesReceived = critiques.reduce((total, comment) => {
    return total + getCommentTotalLikes(comment);
  }, 0);
  const baseFollowing = user.following || 0;
  const followingCount = baseFollowing || Math.max(1, Math.round(followers * 0.45) + (user.id.charCodeAt(0) % 7));
  const safeName = escapeHtml(user.name || "Utilisateur");
  const safeHandle = escapeHtml(user.handle || "@profil");
  const safeBadge = user.badge ? escapeHtml(user.badge) : "";
  const safeBio = escapeHtml(user.bio || "Passionne de sport et de belles histoires.");
  const favoriteSports = (user.favoriteSports || []).map((sport) => escapeHtml(String(sport || "").trim())).filter(Boolean);
  const profilePrimaryUserCardMarkup = buildUserCard(user, {
    className: "profile-primary-user-card",
    stats: {
      followers,
      following: followingCount,
      critiques: critiques.length,
      likesReceived,
    },
  });
  activeUserId = user.id;

  userDetailEl.innerHTML = `
    <div class="event-detail-top profile-detail-top">
      <div class="event-detail-primary">
        ${profilePrimaryUserCardMarkup}
      </div>
      <aside class="event-detail-complementary">
        <div class="event-detail-header">
          <span class="tag">Profil</span>
          <h1>${safeName}</h1>
          <p class="muted">${safeHandle}</p>
          ${safeBadge ? `<span class="profile-badge">${safeBadge}</span>` : ""}
          <p class="muted">${safeBio}</p>
        </div>
        <div class="event-detail-grid">
          ${buildDetailStatCard("Abonnes", formatNumber(followers))}
          ${buildDetailStatCard("Suivis", formatNumber(followingCount))}
          ${buildDetailStatCard("Critiques", formatNumber(critiques.length))}
          ${buildDetailStatCard("Likes reçus", formatNumber(likesReceived))}
        </div>
        <div class="event-participants">
          <span class="muted">Sports préférés</span>
          <div class="participant-list">
            ${favoriteSports.length ? favoriteSports.map((sport) => `<span class="participant-pill">${sport}</span>`).join("") : '<span class="muted">Multi-sport</span>'}
          </div>
        </div>
        <div class="profile-actions">
          <label class="profile-photo-upload-btn" for="profile-photo-input-${user.id}">Charger une photo</label>
          <input
            id="profile-photo-input-${user.id}"
            class="profile-photo-input"
            type="file"
            accept="image/*"
            data-user-id="${user.id}"
          >
        </div>
      </aside>
    </div>
  `;

  if (userAboutEl) {
    const sportsTags = favoriteSports.map((sport) => `<span class="tag">${sport}</span>`).join("");
    userAboutEl.innerHTML = `
      <div class="about-grid">
        <div>
          <h3>Bio</h3>
          <p class="muted">${safeBio}</p>
        </div>
        <div>
          <h3>Localisation</h3>
          <p class="muted">${escapeHtml(user.location || "Monde")}</p>
        </div>
        <div>
          <h3>Sports préférés</h3>
          <div class="tag-row">${sportsTags || '<span class="tag">Multi-sport</span>'}</div>
        </div>
        <div>
          <h3>Badge</h3>
          <p class="muted">${safeBadge || "Membre actif"}</p>
        </div>
      </div>
    `;
  }

  if (userActivityEl) {
    const activities = activitySamples.filter((activity) => activity.userId === user.id);
    if (activities.length === 0) {
      userActivityEl.innerHTML = buildEmptyStateCard("Aucune activite recente.");
    } else {
      userActivityEl.innerHTML = activities
        .map(
          (activity) => `
            <div class="activity-item">
              <div>
                <p class="activity-label">${activity.label}</p>
                <span class="muted">${activity.date}</span>
              </div>
              <span class="tag">${activity.type === "list" ? "Classement" : "Avis"}</span>
            </div>
          `
        )
        .join("");
    }
  }

  if (userListsEl) {
    if (lists.length === 0) {
      userListsEl.innerHTML = buildEmptyStateCard("Aucun classement publie pour le moment.", {
        className: "list-card",
      });
    } else {
      userListsEl.innerHTML = lists
        .map((list) => buildRankingCard(list, { showOwner: false, showFollowButton: false }))
        .join("");
    }
  }

  if (userReviewsEl) {
    if (critiques.length === 0) {
      userReviewsEl.innerHTML = buildEmptyStateCard("Aucun avis pour le moment.", {
        className: "review-card",
      });
    } else {
      userReviewsEl.innerHTML = critiques
        .map((review) => {
          return buildUnifiedCommentCard(review, {
            mode: "review",
            eventId: review.eventId,
            showFollowButton: false,
            showReplyAction: false,
            showReplyComposer: false,
            showReplies: false,
          });
        })
        .join("");
    }
  }

  if (userLikedCommentsEl) {
    const likedComments = getLikedProfileComments();
    if (likedComments.length === 0) {
      userLikedCommentsEl.innerHTML = buildEmptyStateCard("Aucun commentaire like pour le moment.", {
        className: "review-card",
      });
    } else {
      userLikedCommentsEl.innerHTML = likedComments
        .map(({ item, eventId, mode, isReply }) => buildUnifiedCommentCard(item, {
          mode,
          eventId,
          showFollowButton: false,
          showReplyAction: false,
          showReplyComposer: false,
          showReplies: false,
          showScore: !isReply,
        }))
        .join("");
    }
  }

  if (userSportCollectionEl) {
    const counts = critiques.reduce((acc, review) => {
      const event = events.find((item) => item.id === review.eventId);
      const sport = event ? event.sport : "Autre";
      acc[sport] = (acc[sport] || 0) + 1;
      return acc;
    }, {});
    const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    userSportCollectionEl.innerHTML = entries.length
      ? entries
        .map(([sport, count]) => `
          <div class="sport-collection-item">
            <span class="tag">${sport}</span>
            <span class="sport-collection-count">${count} critiques</span>
          </div>
        `)
        .join("")
      : buildEmptyStateCard("Aucune critique pour le moment.");
  }

  if (userBestReviewsEl) {
    const best = critiques
      .slice()
      .sort((a, b) => getCommentTotalLikes(b) - getCommentTotalLikes(a))
      .slice(0, 3);
    userBestReviewsEl.innerHTML = best.length
      ? best.map((review) => {
        const event = events.find((item) => item.id === review.eventId);
        const scoreLabel = buildScoreBadge(toSofaScore(review.rating || 0), "small");
        const totalLikes = getCommentTotalLikes(review);
        return buildFrameElement(`
          <div class="review-stars">${scoreLabel}</div>
          <p>${review.note}</p>
          <div class="review-meta">
            <span class="muted">${event ? event.title : "Match"}</span>
            <span class="mini-pill is-watchlist">❤ ${formatNumber(totalLikes)}</span>
          </div>
        `, {
          tag: "article",
          className: "review-card highlight-review",
        });
      }).join("")
      : buildEmptyStateCard("Aucune critique marquee.", {
        className: "review-card",
      });
  }

  if (userRatingChartEl) {
    userRatingChartEl.innerHTML = buildRatingDistributionChart(user, {
      scope: "user",
    });
  }
}

function renderAthleteProfile() {
  if (!athleteDetailEl) return;
  const params = new URLSearchParams(window.location.search);
  const athleteId = params.get("id") || athletes[0].id;
  const athlete = getAthleteById(athleteId) || athletes[0];
  const followingAthlete = isFollowTargetFollowed("athlete", athlete.id);
  const athleteEvents = getAthleteEvents(athlete.id);
  const upcomingCount = athleteEvents.filter((event) => isUpcoming(event)).length;
  const completedCount = Math.max(0, athleteEvents.length - upcomingCount);
  const timeline = athleteEvents.reduce((acc, event) => {
    const ts = getFeedEventTimestamp(event);
    if (!ts) return acc;
    if (!acc.start || ts < acc.start) acc.start = ts;
    if (!acc.end || ts > acc.end) acc.end = ts;
    return acc;
  }, { start: 0, end: 0 });
  const timelineLabel = timeline.start && timeline.end
    ? `${formatFrenchDateLabel(new Date(timeline.start), { day: "2-digit", month: "short", year: "numeric" })} - ${formatFrenchDateLabel(new Date(timeline.end), { day: "2-digit", month: "short", year: "numeric" })}`
    : "Période non renseignée";
  const safeSport = escapeHtml(getAthleteSportLabel(athlete) || "Sport");
  const safeName = escapeHtml(athlete.name || "Sportif");
  const safeBio = escapeHtml(athlete.bio || "Profil sportif en cours de completion.");
  const safeCountry = escapeHtml(athlete.country || "Non renseigné");
  const safeTeamName = escapeHtml(getAthleteTeamName(athlete) || "Non renseigné");
  const safeRole = escapeHtml(athlete.role || "Non renseigné");
  const safeTimeline = escapeHtml(timelineLabel);
  const primaryAthleteCardMarkup = buildPlayerCard(athlete, {
    className: "athlete-detail-card",
  });

  athleteDetailEl.innerHTML = `
    <div class="event-detail-top">
      <div class="event-detail-primary">
        ${primaryAthleteCardMarkup}
      </div>
      <aside class="event-detail-complementary">
        <div class="event-detail-header">
          <span class="tag">${safeSport}</span>
          <h1>${safeName}</h1>
          <p class="muted">${safeBio}</p>
          <p class="muted">${safeTimeline}</p>
        </div>
        <div class="event-detail-grid">
          ${buildDetailStatCard("Pays", safeCountry, { rawValue: true })}
          ${buildDetailStatCard("Équipe", safeTeamName, { rawValue: true })}
          ${buildDetailStatCard("Rôle", safeRole, { rawValue: true })}
          ${buildDetailStatCard("Événements", formatNumber(athleteEvents.length))}
          ${buildDetailStatCard("À venir", formatNumber(upcomingCount))}
          ${buildDetailStatCard("Terminés", formatNumber(completedCount))}
        </div>
        <div class="event-actions">
          <div class="event-action-meta">
            ${buildFollowButton({
              targetType: "athlete",
              targetId: athlete.id,
              isFollowing: followingAthlete,
              className: "athlete-follow-btn",
            })}
          </div>
        </div>
      </aside>
    </div>
  `;

  mountObjectCommentComposer(athleteCommentComposerEl, COMMENT_TARGET_ATHLETE, athlete.id, {
    defaultMode: "teaser",
    placeholder: "Ajouter un commentaire sur ce sportif...",
    submitLabel: "Publier",
  });
  renderAthleteReviews(athlete.id);

  if (!athleteEventsEl) return;
  if (!athleteEvents.length) {
    athleteEventsEl.innerHTML = buildEmptyStateCard("Aucun événement associé pour le moment.");
    return;
  }

  athleteEventsEl.innerHTML = athleteEvents
    .map((event) => {
      return buildEventCard(event, { size: "compact" });
    })
    .join("");
}

function renderTeamProfile() {
  if (!teamDetailEl) return;
  const params = new URLSearchParams(window.location.search);
  const teamId = params.get("id") || teams[0].id;
  const team = getTeamById(teamId) || teams[0];
  const followingTeam = isFollowTargetFollowed("team", team.id);
  const teamEvents = getTeamEvents(team.id);
  const members = getTeamMembers(team);
  const upcomingCount = teamEvents.filter((event) => isUpcoming(event)).length;
  const completedCount = Math.max(0, teamEvents.length - upcomingCount);
  const averageCommunityScore = teamEvents.length
    ? teamEvents.reduce((sum, event) => sum + (Number(event.communityScore) || 0), 0) / teamEvents.length
    : 0;
  const teamScore = clampSofaScore(toSofaScore(averageCommunityScore));
  const timeline = teamEvents.reduce((acc, event) => {
    const ts = getFeedEventTimestamp(event);
    if (!ts) return acc;
    if (!acc.start || ts < acc.start) acc.start = ts;
    if (!acc.end || ts > acc.end) acc.end = ts;
    return acc;
  }, { start: 0, end: 0 });
  const timelineLabel = timeline.start && timeline.end
    ? `${formatFrenchDateLabel(new Date(timeline.start), { day: "2-digit", month: "short", year: "numeric" })} - ${formatFrenchDateLabel(new Date(timeline.end), { day: "2-digit", month: "short", year: "numeric" })}`
    : "Période non renseignée";
  const membersMarkup = members.length
    ? members
      .slice(0, 12)
      .map((athlete) => `<a class="participant-pill" href="${athleteUrlFor(athlete)}">${escapeHtml(athlete.name || "Sportif")}</a>`)
      .join("")
    : '<span class="muted">Aucun sportif associé.</span>';
  const primaryTeamCardMarkup = buildTeamCard(team, {
    className: "team-detail-card",
  });

  teamDetailEl.innerHTML = `
    <div class="event-detail-top">
      <div class="event-detail-primary">
        ${primaryTeamCardMarkup}
      </div>
      <aside class="event-detail-complementary">
        <div class="event-detail-header">
          <span class="tag">${escapeHtml(team.sport || "Sport")}</span>
          <h1>${escapeHtml(team.nameFull || team.name || "Équipe")}</h1>
          <p class="muted">${team.city ? `Basée à ${escapeHtml(team.city)}.` : "Équipe de haut niveau."}</p>
          <p class="muted">${escapeHtml(timelineLabel)}</p>
        </div>
        <div class="event-detail-grid">
          ${buildDetailStatCard("Ville", escapeHtml(team.city || "Non renseigné"), { rawValue: true })}
          ${buildDetailStatCard("Effectif", formatNumber(members.length))}
          ${buildDetailStatCard("Événements", formatNumber(teamEvents.length))}
          ${buildDetailStatCard("Communauté", `${teamScore}%`)}
          ${buildDetailStatCard("À venir", formatNumber(upcomingCount))}
          ${buildDetailStatCard("Terminés", formatNumber(completedCount))}
        </div>
        <div class="event-participants">
          <span class="muted">Sportifs de l'équipe</span>
          <div class="participant-list">
            ${membersMarkup}
          </div>
        </div>
        <div class="event-actions">
          <div class="event-action-meta">
            ${buildFollowButton({
              targetType: "team",
              targetId: team.id,
              isFollowing: followingTeam,
              className: "team-follow-btn",
            })}
          </div>
        </div>
      </aside>
    </div>
  `;

  mountObjectCommentComposer(teamCommentComposerEl, COMMENT_TARGET_TEAM, team.id, {
    defaultMode: "teaser",
    placeholder: "Ajouter un commentaire sur cette équipe...",
    submitLabel: "Publier",
  });
  renderTeamReviews(team.id);

  if (teamEventsEl) {
    if (!teamEvents.length) {
      teamEventsEl.innerHTML = buildEmptyStateCard("Aucun événement associé pour le moment.");
    } else {
      teamEventsEl.innerHTML = teamEvents
        .map((event) => {
          return buildEventCard(event, { size: "compact" });
        })
        .join("");
    }
  }

  if (teamAthletesEl) {
    if (!members.length) {
      teamAthletesEl.innerHTML = buildEmptyStateCard("Aucun sportif associé pour le moment.");
    } else {
      teamAthletesEl.innerHTML = members
        .map((athlete) => buildFrameElement(`
          <div class="event-media">
            ${athlete.image ? `<img src="${athlete.image}" alt="${athlete.name}">` : `<div class="participant-fallback">${getInitials(athlete.name)}</div>`}
            <div class="event-media-overlay compact">
              <div class="overlay-top">
                <span class="tag">${getAthleteSportLabel(athlete)}</span>
              </div>
              <h3>${athlete.name}</h3>
              <div class="overlay-meta">
                <span>${athlete.role || "Sportif"}</span>
              </div>
            </div>
          </div>
          <a class="event-link" href="${athleteUrlFor(athlete)}">Voir le profil</a>
        `, {
          tag: "article",
          className: "event-card",
        }))
        .join("");
    }
  }
}

function renderEventDetail() {
  if (!detailEl) return;
  const params = new URLSearchParams(window.location.search);
  const eventId = params.get("id") || events[0].id;
  const event = events.find((item) => item.id === eventId) || events[0];
  const insight = eventInsights[event.id] || eventInsights[events[0].id];
  const userRating = storedRatings[event.id] || 0;
  const communityScore = toSofaScore(event.communityScore || 0);
  const participants = getEventParticipants(event.id);
  const teamsForEvent = getTeamsForEvent(event.id);
  activeEventId = event.id;

  detailEl.innerHTML = `
    <div class="event-detail-top">
      <div class="event-detail-primary">
        ${buildEventCard(event, { linkMode: "overlay" })}
      </div>
      <aside class="event-detail-complementary">
        <div class="event-detail-header">
          <span class="tag">${event.sport}</span>
          <h1>${event.title}</h1>
          <p class="muted">${event.league} - ${getEventDateLabel(event)} - ${event.location}</p>
          <p class="muted">Type: ${event.nature || "Match"}${event.nature === "Match" && event.leagueTitle ? ` · Ligue: ${event.leagueTitle}` : ""}</p>
          <p>${insight.headline}</p>
        </div>
        <div class="event-detail-grid">
          ${buildDetailStatCard("Statut", getEventStatusLabel(event) || "Futur")}
          ${buildDetailStatCard("Communauté", `${communityScore}%`)}
          ${buildDetailStatCard("Avis", event.reviews.toLocaleString())}
          ${buildDetailStatCard("Moments forts", insight.highlights.join(" | "))}
        </div>
        ${teamsForEvent.length ? `
          <div class="event-participants">
            <span class="muted">Équipes</span>
            <div class="participant-list">
              ${teamsForEvent.map((team) => `<span class="participant-pill">${team.name}</span>`).join("")}
            </div>
          </div>
        ` : ""}
        ${participants.length ? `
          <div class="event-participants">
            <span class="muted">Sportifs participants</span>
            <div class="participant-list">
              ${participants.map((athlete) => `<span class="participant-pill">${athlete.name}</span>`).join("")}
            </div>
          </div>
        ` : ""}
        ${buildRatingDistributionChart(event, { className: "event-detail-rating-chart" })}
        <div class="event-actions">
          ${isUpcoming(event) ? `
            <div class="event-action-meta">
              <span class="mini-pill">Commentaires ouverts</span>
              <span class="muted">La note sera disponible après l'événement.</span>
            </div>
          ` : buildSofaScoreControl(event, userRating)}
          <div class="event-action-meta">
            <button class="watchlist-btn ${isInWatchlist(event.id) ? "is-saved" : ""}" data-event-id="${event.id}">
              ${isInWatchlist(event.id) ? "✓ Watchlist" : "+ Watchlist"}
            </button>
          </div>
        </div>
      </aside>
    </div>
  `;

  mountObjectCommentComposer(eventCommentComposerEl, COMMENT_TARGET_EVENT, event.id, {
    defaultMode: isUpcoming(event) ? "teaser" : "critique",
    placeholder: isUpcoming(event)
      ? "Lancez la discussion avant le coup d'envoi..."
      : "Partagez votre avis sur ce match...",
    submitLabel: "Publier",
  });
  renderReviews(event.id);
  syncAllSofaScoreThumbPositions();
}

function renderGlobalSearch() {
  if (!globalSearchResults) return;
  const query = (globalSearchInput?.value || "").trim().toLowerCase();
  if (!query) {
    globalSearchResults.innerHTML = "";
    return;
  }

  const eventMatches = filterEventsByActiveSports(events).filter((event) => {
    const haystack = `${event.title} ${event.league} ${event.location} ${event.sport}`.toLowerCase();
    return haystack.includes(query);
  }).slice(0, 4);

  const listMatches = curatedLists.filter((list) => {
    const haystack = `${list.title} ${list.description} ${list.sport}`.toLowerCase();
    return haystack.includes(query);
  }).slice(0, 4);

  const athleteMatches = athletes.filter((athlete) => {
    const sportsLabel = getAthleteSports(athlete).join(" ");
    const haystack = `${athlete.name} ${sportsLabel}`.toLowerCase();
    return haystack.includes(query);
  }).slice(0, 4);

  const userMatches = users.filter((user) => {
    const haystack = `${user.name} ${user.handle}`.toLowerCase();
    return haystack.includes(query);
  }).slice(0, 4);

  const buildResultLinkCard = (href, title, subtitle) => buildFrameElement(`
    <strong>${escapeHtml(title)}</strong>
    <span class="muted">${escapeHtml(subtitle)}</span>
  `, {
    tag: "a",
    className: "result-card",
    attributes: `href="${escapeHtml(href)}"`,
  });

  const eventResults = eventMatches.length
    ? eventMatches.map((event) => buildResultLinkCard(
      eventUrlFor(event),
      event.title,
      `${event.league} - ${getEventDateLabel(event)}`
    )).join("")
    : `<p class="muted">Aucun événement trouvé.</p>`;

  const listResults = listMatches.length
    ? listMatches.map((list) => {
      const totalEvents = list.entries ? list.entries.length : list.count;
      return buildResultLinkCard(
        `list.html?id=${list.id}`,
        list.title,
        `${totalEvents} événements · ${list.sport}`
      );
    }).join("")
    : `<p class="muted">Aucun classement trouvé.</p>`;

  const athleteResults = athleteMatches.length
    ? athleteMatches.map((athlete) => buildResultLinkCard(
      athleteUrlFor(athlete),
      athlete.name,
      getAthleteSportLabel(athlete)
    )).join("")
    : `<p class="muted">Aucun sportif trouvé.</p>`;

  const userResults = userMatches.length
    ? userMatches.map((user) => {
      const following = Boolean(storedUserFollows[user.id]);
      const followers = getFollowersCount(user.id);
      return buildFrameElement(`
        <a class="user-link" href="profile.html?id=${user.id}">
          <strong>${escapeHtml(user.name)}</strong>
          <span class="muted">${escapeHtml(user.handle)}</span>
        </a>
        <button class="follow-button ${following ? "is-following" : ""}" data-user-id="${user.id}">
          ${following ? "Suivi" : "Suivre"} · ${followers}
        </button>
      `, {
        className: "result-card user-card",
      });
    }).join("")
    : `<p class="muted">Aucun utilisateur trouvé.</p>`;

  globalSearchResults.innerHTML = `
    <div class="result-column">
      <h3>Événements</h3>
      ${eventResults}
    </div>
    <div class="result-column">
      <h3>Classements</h3>
      ${listResults}
    </div>
    <div class="result-column">
      <h3>Sportifs</h3>
      ${athleteResults}
    </div>
    <div class="result-column">
      <h3>Utilisateurs</h3>
      ${userResults}
    </div>
  `;
}

if (filtersEl) {
  filtersEl.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    state.filter = button.dataset.sport;
    renderFilters();
    renderEvents();
  });
}

if (searchInput) {
  searchInput.addEventListener("input", (event) => {
    state.query = event.target.value.trim();
    renderEvents();
  });
}

if (watchlistFilterEl) {
  watchlistFilterEl.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    watchlistState.filter = button.dataset.sport;
    renderWatchlistPage();
  });
}

if (watchlistSearchInput) {
  watchlistSearchInput.addEventListener("input", (event) => {
    watchlistState.query = event.target.value.trim();
    renderWatchlistPage();
  });
}

if (watchlistSortSelect) {
  watchlistSortSelect.addEventListener("change", (event) => {
    watchlistState.sort = event.target.value;
    renderWatchlistPage();
  });
}

if (globalSearchInput) {
  globalSearchInput.addEventListener("input", () => {
    renderGlobalSearch();
  });
}

if (bestOfRangeEl) {
  bestOfRangeEl.addEventListener("change", () => {
    renderBestOf();
  });
}

if (bestOfSportEl) {
  const options = ["Tous", ...new Set(events.map((event) => event.sport))];
  bestOfSportEl.innerHTML = options.map((sport) => `<option value="${sport}">${sport}</option>`).join("");
  bestOfSportEl.addEventListener("change", () => {
    renderBestOf();
  });
}

if (calendarDateEl) {
  calendarDateEl.addEventListener("change", renderCalendar);
}

if (calendarModeListEl) {
  calendarModeListEl.addEventListener("click", () => {
    calendarState.watchlistMonthMode = false;
    renderCalendar();
  });
}

if (calendarModeWatchlistEl) {
  calendarModeWatchlistEl.addEventListener("click", () => {
    calendarState.watchlistMonthMode = true;
    renderCalendar();
  });
}

if (calendarFocusSpotlightEl) {
  calendarFocusSpotlightEl.addEventListener("click", () => {
    calendarState.spotlightOnly = !calendarState.spotlightOnly;
    renderCalendar();
  });
}

if (calendarPeriodControlsEl && calendarDateEl) {
  calendarPeriodControlsEl.addEventListener("click", (event) => {
    const monthActionButton = event.target.closest("[data-calendar-month-action]");
    if (monthActionButton) {
      const offset = Number(monthActionButton.dataset.calendarMonthAction || "0");
      if (offset) {
        const nextDate = getCalendarBaseDate();
        nextDate.setMonth(nextDate.getMonth() + offset);
        setCalendarBaseDate(nextDate);
        renderCalendar();
      }
      return;
    }

    const yearActionButton = event.target.closest("[data-calendar-year-action]");
    if (!yearActionButton) return;
    const offset = Number(yearActionButton.dataset.calendarYearAction || "0");
    if (!offset) return;
    const nextDate = getCalendarBaseDate();
    nextDate.setFullYear(nextDate.getFullYear() + offset);
    setCalendarBaseDate(nextDate);
    renderCalendar();
  });
}

if (heroPrevButton && heroNextButton) {
  heroPrevButton.addEventListener("click", () => {
    heroState.index = (heroState.index - 1 + heroState.list.length) % heroState.list.length;
    renderHeroFeatured();
    startHeroAutoScroll();
  });
  heroNextButton.addEventListener("click", () => {
    heroState.index = (heroState.index + 1) % heroState.list.length;
    renderHeroFeatured();
    startHeroAutoScroll();
  });
}

document.addEventListener("click", (event) => {
  const clickedTagWidget = event.target.closest("[data-object-tags-widget]");
  if (!clickedTagWidget) {
    closeObjectTagPopovers();
  }

  const overlayCloseTrigger = event.target.closest("[data-card-overlay-close], [data-event-overlay-close]");
  if (overlayCloseTrigger) {
    closeEventCardOverlay();
    return;
  }

  const uiSportFilterButton = event.target.closest('[data-ui-sport-filter] .filter-btn');
  if (uiSportFilterButton) {
    const filterGroup = uiSportFilterButton.closest("[data-ui-sport-filter]");
    if (filterGroup) {
      const selectedSport = uiSportFilterButton.dataset.sport || uiSportFilterButton.textContent.trim();
      filterGroup.dataset.activeSport = selectedSport;
      filterGroup.querySelectorAll(".filter-btn").forEach((button) => {
        button.classList.toggle("is-active", button === uiSportFilterButton);
      });
    }
    return;
  }

  const tierlistSportButton = event.target.closest("#tierlist-sport-filters .filter-btn");
  if (tierlistSportButton) {
    tierlistState.sport = tierlistSportButton.dataset.sport || tierlistSportButton.textContent.trim() || "Tous";
    renderTierlistPage();
    return;
  }

  const tierlistPeriodActionButton = event.target.closest("[data-tierlist-period-action]");
  if (tierlistPeriodActionButton && tierlistPeriodActionButton.closest("[data-tierlist-period-filter]")) {
    const bound = tierlistPeriodActionButton.dataset.tierlistPeriodBound;
    const unit = tierlistPeriodActionButton.dataset.tierlistPeriodUnit;
    const delta = Number(tierlistPeriodActionButton.dataset.tierlistPeriodAction || "0");
    if ((bound === "from" || bound === "to") && (unit === "month" || unit === "year") && delta) {
      shiftTierlistMonthRange(bound, unit, delta);
      renderTierlistPage();
    }
    return;
  }

  const objectTagPopoverToggle = event.target.closest("[data-object-tag-popover-toggle]");
  if (objectTagPopoverToggle) {
    const widget = objectTagPopoverToggle.closest("[data-object-tags-widget]");
    if (!widget) return;
    const shouldOpen = !widget.classList.contains("is-open");
    closeObjectTagPopovers(shouldOpen ? widget : null);
    widget.classList.toggle("is-open", shouldOpen);
    return;
  }

  const objectTagVoteButton = event.target.closest("[data-tag-vote-action]");
  if (objectTagVoteButton) {
    const objectType = String(objectTagVoteButton.dataset.objectType || "").trim();
    const objectId = String(objectTagVoteButton.dataset.objectId || "").trim();
    const tagId = String(objectTagVoteButton.dataset.tagId || "").trim();
    const vote = Number(objectTagVoteButton.dataset.tagVoteAction || "0");
    if (!objectType || !objectId || !tagId || (vote !== 1 && vote !== -1)) return;
    ensureObjectTagLink(objectType, objectId, tagId);
    setObjectTagVote(objectType, objectId, tagId, vote);
    saveObjectTags();
    saveObjectTagVotes();
    rerenderTagSurfaces();
    return;
  }

  const objectTagAddButton = event.target.closest("[data-object-tag-add]");
  if (objectTagAddButton) {
    const objectType = String(objectTagAddButton.dataset.objectType || "").trim();
    const objectId = String(objectTagAddButton.dataset.objectId || "").trim();
    const widget = objectTagAddButton.closest("[data-object-tags-widget]");
    const input = widget ? widget.querySelector("[data-object-tag-input]") : null;
    const rawValue = input ? input.value : "";
    const addedTagId = addUserTagToObject(objectType, objectId, rawValue);
    if (!addedTagId) {
      if (input) input.focus();
      return;
    }
    if (input) {
      input.value = "";
    }
    saveTagCatalog();
    saveObjectTags();
    saveObjectTagVotes();
    rerenderTagSurfaces();
    return;
  }

  const optionalFeedAddButton = event.target.closest("[data-feed-optional-add]");
  if (optionalFeedAddButton) {
    const targetTypeRaw = String(optionalFeedAddButton.dataset.targetType || "").trim().toLowerCase();
    const targetType = targetTypeRaw === "player" ? FEED_TARGET_ATHLETE : targetTypeRaw;
    const targetId = String(optionalFeedAddButton.dataset.targetId || "").trim();
    const mode = normalizeObjectFeedMode(optionalFeedAddButton.dataset.targetMode || FEED_MODE_RECENT);
    const label = String(optionalFeedAddButton.dataset.targetLabel || "").trim();
    if (!FEED_ALLOWED_TARGET_TYPES.has(targetType) || !targetId) return;
    const tabId = buildOptionalFeedTabId(targetType, targetId);
    const alreadyExists = storedOptionalFeedTabs.some((tab) => tab.id === tabId);
    if (!alreadyExists && storedOptionalFeedTabs.length >= 12) {
      window.alert("Maximum 12 feeds complémentaires. Supprimez-en un pour en ajouter un nouveau.");
      return;
    }
    upsertOptionalFeedTab(
      {
        scope: FEED_SCOPE_OBJECT,
        mode,
        targetType,
        targetId,
      },
      label
    );
    renderObjectFeedAddButton({
      scope: FEED_SCOPE_OBJECT,
      mode,
      targetType,
      targetId,
    });
    renderFeedPage();
    return;
  }

  const optionalFeedOpenButton = event.target.closest("[data-feed-optional-open]");
  if (optionalFeedOpenButton) {
    const targetTypeRaw = String(optionalFeedOpenButton.dataset.targetType || "").trim().toLowerCase();
    const targetType = targetTypeRaw === "player" ? FEED_TARGET_ATHLETE : targetTypeRaw;
    const targetId = String(optionalFeedOpenButton.dataset.targetId || "").trim();
    const mode = normalizeObjectFeedMode(optionalFeedOpenButton.dataset.targetMode || FEED_MODE_RECENT);
    if (!FEED_ALLOWED_TARGET_TYPES.has(targetType) || !targetId) return;
    const nextRequest = normalizeFeedRequest({
      scope: FEED_SCOPE_OBJECT,
      mode,
      targetType,
      targetId,
    });
    activeFeedRequest = nextRequest;
    activeFeedMode = nextRequest.mode;
    updateLocationWithFeedRequest(nextRequest, { keepExistingParams: false });
    renderFeedPage();
    return;
  }

  const optionalFeedRemoveButton = event.target.closest("[data-feed-optional-remove]");
  if (optionalFeedRemoveButton) {
    const tabId = String(optionalFeedRemoveButton.dataset.tabId || "").trim();
    if (!tabId) return;
    removeOptionalFeedTab(tabId);
    const currentRequest = parseFeedRequestFromLocation(new URLSearchParams(window.location.search));
    const isRemovingCurrentObjectFeed = currentRequest.scope === FEED_SCOPE_OBJECT
      && buildOptionalFeedTabId(currentRequest.targetType, currentRequest.targetId) === tabId;
    if (isRemovingCurrentObjectFeed) {
      const fallbackRequest = normalizeFeedRequest({
        scope: FEED_SCOPE_MY,
        mode: FEED_MODE_FOR_YOU,
      });
      activeFeedRequest = fallbackRequest;
      activeFeedMode = fallbackRequest.mode;
      saveFeedMode(fallbackRequest.mode);
      updateLocationWithFeedRequest(fallbackRequest, { keepExistingParams: false });
    }
    renderFeedPage();
    return;
  }

  const feedModeButton = event.target.closest("[data-feed-mode]");
  if (feedModeButton) {
    const scopeRoot = feedModeButton.closest("[data-feed-scope]");
    const scope = scopeRoot?.dataset.feedScope === FEED_SCOPE_OBJECT ? FEED_SCOPE_OBJECT : FEED_SCOPE_MY;
    const modeToken = normalizeLegacyFeedModeToken(feedModeButton.dataset.feedMode || "");

    if (scope === FEED_SCOPE_OBJECT) {
      const inMainFeedSurface = Boolean(feedModeSwitchEl && feedStreamEl && feedModeSwitchEl.contains(feedModeButton));
      if (inMainFeedSurface) {
        const currentRequest = parseFeedRequestFromLocation(new URLSearchParams(window.location.search));
        const baseRequest = currentRequest.scope === FEED_SCOPE_OBJECT
          ? currentRequest
          : activeFeedRequest;
        if (baseRequest?.scope !== FEED_SCOPE_OBJECT) return;
        const nextRequest = normalizeFeedRequest({
          ...baseRequest,
          mode: normalizeObjectFeedMode(modeToken),
        });
        const optionalTab = getOptionalFeedTabForRequest(nextRequest);
        if (optionalTab) {
          setOptionalFeedTabMode(optionalTab.id, nextRequest.mode);
        }
        activeFeedRequest = nextRequest;
        activeFeedMode = nextRequest.mode;
        updateLocationWithFeedRequest(nextRequest, { keepExistingParams: false });
        renderFeedPage();
        return;
      }

      const context = getObjectFeedContextFromCurrentPage();
      const baseRequest = activeObjectFeedRequest || (context
        ? normalizeFeedRequest({
          scope: FEED_SCOPE_OBJECT,
          mode: FEED_MODE_RECENT,
          targetType: context.targetType,
          targetId: context.targetId,
        })
        : null);
      if (!baseRequest || baseRequest.scope !== FEED_SCOPE_OBJECT) return;
      const nextRequest = normalizeFeedRequest({
        ...baseRequest,
        mode: normalizeObjectFeedMode(modeToken),
      });
      activeObjectFeedRequest = nextRequest;
      updateLocationWithObjectFeedMode(nextRequest.mode);
      renderObjectFeedForCurrentPage();
      return;
    }

    const nextMode = normalizeMyFeedMode(modeToken);
    const nextRequest = normalizeFeedRequest({
      scope: FEED_SCOPE_MY,
      mode: nextMode,
    });
    if (nextRequest.mode !== activeFeedMode || !activeFeedRequest || activeFeedRequest.scope !== FEED_SCOPE_MY) {
      activeFeedRequest = nextRequest;
      activeFeedMode = nextRequest.mode;
      saveFeedMode(activeFeedMode);
      if (feedStreamEl) {
        updateLocationWithFeedRequest(nextRequest, { keepExistingParams: false });
      }
      renderFeedPage();
    }
    return;
  }

  const overlayEventId = getEventIdForOverlayFromTarget(event.target);
  if (overlayEventId) {
    event.preventDefault();
    openEventCardOverlay(overlayEventId);
    return;
  }

  const cardLink = event.target.closest("[data-href]");
  if (cardLink) {
    const isInteractive = event.target.closest("a, button, input, textarea, select, label, .sofa-score, .sofa-score-track, .sofa-score-level-dot");
    if (!isInteractive && cardLink.dataset.href) {
      window.location.href = cardLink.dataset.href;
      return;
    }
  }

  const rateChipButton = event.target.closest(".event-rate-btn");
  if (rateChipButton) {
    const eventId = rateChipButton.dataset.eventId;
    if (eventId) {
      openEventCardGauge(eventId, { focus: true });
    }
    return;
  }

  const userScoreToggleButton = event.target.closest(".event-user-score-toggle-btn");
  if (userScoreToggleButton) {
    const eventId = userScoreToggleButton.dataset.eventId;
    if (eventId) {
      openEventCardGauge(eventId, { focus: true });
    }
    return;
  }

  const watchlistButton = event.target.closest(".watchlist-btn");
  if (watchlistButton) {
    const eventId = watchlistButton.dataset.eventId;
    if (!eventId) return;
    if (watchlist.has(eventId)) {
      watchlist.delete(eventId);
      removeFavoriteActionTimestamp("event", eventId);
    } else {
      watchlist.add(eventId);
      setFavoriteActionTimestamp("event", eventId);
    }
    saveWatchlist();
    renderEvents();
    renderAnticipated();
    renderBestMonth();
    renderWatchlist();
    renderWatchlistPage();
    renderCalendar();
    if (detailEl) {
      renderEventDetail();
    }
    renderFeedPage();
    return;
  }

  const listLikeButton = event.target.closest(".list-like-button");
  if (listLikeButton) {
    const listId = listLikeButton.dataset.listId;
    if (!listId) return;
    if (storedListLikes[listId]) {
      delete storedListLikes[listId];
      removeFavoriteActionTimestamp("list", listId);
    } else {
      storedListLikes[listId] = true;
      setFavoriteActionTimestamp("list", listId);
    }
    saveListLikes();
    renderCuratedLists();
    renderListDetail();
    renderUserProfile();
    renderGlobalSearch();
    renderFeedPage();
    return;
  }

  const followButton = event.target.closest(".follow-button");
  if (followButton) {
    const targetType = normalizeFollowTargetType(
      followButton.dataset.followTargetType
      || (followButton.dataset.userId ? "user" : "")
    );
    const targetId = String(followButton.dataset.followTargetId || followButton.dataset.userId || "").trim();
    if (!targetType || !targetId) return;
    toggleFollowTarget(targetType, targetId);
    renderCuratedLists();
    renderReviews(activeEventId || events[0].id);
    renderListDetail();
    renderUserProfile();
    renderAthleteProfile();
    renderTeamProfile();
    renderLeagueDetail();
    renderLeaguePage();
    renderEvents();
    renderAnticipated();
    renderBestMonth();
    renderWatchlist();
    renderWatchlistPage();
    renderCalendar();
    renderGlobalSearch();
    renderFeedPage();
    renderUISamples();
    return;
  }

  const replyTrigger = event.target.closest("[data-comment-reply-trigger]");
  if (replyTrigger) {
    const commentId = replyTrigger.dataset.commentId;
    const parentReplyId = replyTrigger.dataset.parentReplyId || "";
    if (!commentId) return;
    const scope = replyTrigger.closest(".comment-preview-item, .review-card");
    const composer = scope
      ? scope.querySelector(`[data-comment-reply-composer][data-comment-id="${commentId}"][data-parent-reply-id="${parentReplyId}"]`)
      : null;
    if (!composer) return;
    const shouldOpen = !composer.classList.contains("is-open");
    closeReplyComposers(scope || document);
    composer.classList.toggle("is-open", shouldOpen);
    if (shouldOpen) {
      const input = composer.querySelector(".comment-reply-input");
      if (input) input.focus();
    }
    return;
  }

  const answersToggle = event.target.closest("[data-comment-answers-toggle]");
  if (answersToggle) {
    const commentId = answersToggle.dataset.commentId;
    if (!commentId) return;
    const scope = answersToggle.closest(".unified-comment-card, .review-card");
    const thread = scope
      ? scope.querySelector(`[data-comment-thread][data-comment-id="${commentId}"]`)
      : null;
    if (!thread) return;
    const shouldExpand = thread.classList.contains("is-collapsed");
    thread.classList.toggle("is-collapsed", !shouldExpand);
    answersToggle.classList.toggle("is-expanded", shouldExpand);
    answersToggle.setAttribute("aria-expanded", shouldExpand ? "true" : "false");
    const expandedLabel = answersToggle.dataset.labelExpanded || "Masquer les réponses";
    const collapsedLabel = answersToggle.dataset.labelCollapsed || "Afficher les réponses";
    answersToggle.setAttribute("aria-label", shouldExpand ? expandedLabel : collapsedLabel);
    return;
  }

  const replyCancelButton = event.target.closest("[data-comment-reply-cancel]");
  if (replyCancelButton) {
    const composer = replyCancelButton.closest("[data-comment-reply-composer]");
    if (!composer) return;
    composer.classList.remove("is-open");
    return;
  }

  const replySubmitButton = event.target.closest("[data-comment-reply-submit]");
  if (replySubmitButton) {
    const composer = replySubmitButton.closest("[data-comment-reply-composer]");
    if (!composer) return;
    const commentId = composer.dataset.commentId;
    const eventId = composer.dataset.eventId || activeEventId || "";
    const parentReplyId = composer.dataset.parentReplyId || "";
    const input = composer.querySelector(".comment-reply-input");
    const text = input ? input.value.trim() : "";
    if (!commentId || !text) {
      if (input) input.focus();
      return;
    }
    const created = appendReplyToComment(commentId, text, parentReplyId);
    if (!created) return;
    if (input) {
      input.value = "";
    }
    composer.classList.remove("is-open");
    refreshCommentSurfaces(eventId);
    if (detailEl) {
      renderEventDetail();
    }
    return;
  }

  const objectCommentSubmitButton = event.target.closest("[data-object-comment-submit]");
  if (objectCommentSubmitButton) {
    const composer = objectCommentSubmitButton.closest("[data-object-comment-composer]");
    const targetType = normalizeCommentTargetType(
      objectCommentSubmitButton.dataset.targetType
      || composer?.dataset.targetType
      || ""
    );
    const targetId = String(
      objectCommentSubmitButton.dataset.targetId
      || composer?.dataset.targetId
      || ""
    ).trim();
    const input = composer ? composer.querySelector("[data-object-comment-input]") : null;
    const modeSelect = composer ? composer.querySelector("[data-object-comment-mode]") : null;
    const ratingInput = composer ? composer.querySelector("[data-object-comment-rating]") : null;
    const text = input ? input.value.trim() : "";
    const mode = modeSelect && modeSelect.value === "critique" ? "critique" : "teaser";
    const rating = ratingInput ? Number(ratingInput.value) : 0;
    if (!targetType || !targetId || !text) {
      if (input) input.focus();
      return;
    }
    const created = createRootCommentForTarget(targetType, targetId, text, {
      mode,
      rating,
    });
    if (!created) {
      if (input) input.focus();
      return;
    }
    if (input) {
      input.value = "";
    }
    const eventIdToRefresh = targetType === COMMENT_TARGET_EVENT ? targetId : "";
    refreshCommentSurfaces(eventIdToRefresh);
    return;
  }

  const likeButton = event.target.closest(".like-button");
  if (likeButton) {
    const commentId = likeButton.dataset.reviewId;
    if (!commentId) {
      // Not a review-like interaction, let other click handlers run.
    } else {
    const likedNow = toggleCommentLike(commentId);
    const comment = getCommentObject(commentId);
    const totalLikes = getCommentTotalLikes(comment);
    updateInlineLikeButton(likeButton, likedNow, totalLikes);
    const eventId = likeButton.dataset.eventId || activeEventId;
    if (eventId) {
      renderReviews(eventId);
    }
    renderUserProfile();
    renderFeedPage();
    return;
    }
  }

  const commentLikeButton = event.target.closest(".comment-like-btn");
  if (commentLikeButton) {
    if (commentLikeButton.dataset.athleteId || commentLikeButton.dataset.teamId) {
      // Favorite actions are handled in dedicated branches below.
    } else {
    const commentId = commentLikeButton.dataset.commentId;
    if (!commentId) {
      // Not a comment-like interaction, let other click handlers run.
    } else {
    const likedNow = toggleCommentLike(commentId);
    const comment = getCommentObject(commentId);
    const totalLikes = getCommentTotalLikes(comment);
    updateInlineLikeButton(commentLikeButton, likedNow, totalLikes);
    if (activeEventId) {
      renderReviews(activeEventId);
    }
    renderUserProfile();
    renderFeedPage();
    return;
    }
    }
  }

  const commentPreviewToggle = event.target.closest(".comment-preview-toggle");
  if (commentPreviewToggle) {
    const preview = commentPreviewToggle.closest(".comment-preview");
    if (!preview) return;
    const expanded = preview.classList.toggle("is-expanded");
    commentPreviewToggle.textContent = expanded ? "Reduire" : "Agrandir";
    return;
  }

  const replyLikeButton = event.target.closest(".reply-like-btn");
  if (replyLikeButton) {
    const replyId = replyLikeButton.dataset.replyId;
    if (!replyId) {
      // Not a reply-like interaction, let other click handlers run.
    } else {
    if (storedReplyLikes[replyId]) {
      delete storedReplyLikes[replyId];
      removeFavoriteActionTimestamp("reply", replyId);
    } else {
      storedReplyLikes[replyId] = true;
      setFavoriteActionTimestamp("reply", replyId);
    }
    saveReplyLikes();
    if (activeEventId) {
      renderReviews(activeEventId);
    }
    renderUserProfile();
    renderFeedPage();
    return;
    }
  }

  const heroDot = event.target.closest(".hero-dot");
  if (heroDot) {
    const index = Number(heroDot.dataset.heroIndex);
    if (!Number.isNaN(index)) {
      heroState.index = index;
      renderHeroFeatured();
      startHeroAutoScroll();
    }
    return;
  }

  const favoriteAthleteButton = event.target.closest(".favorite-athlete-btn");
  if (favoriteAthleteButton) {
    const athleteId = favoriteAthleteButton.dataset.athleteId;
    if (!athleteId) return;
    if (storedAthleteFavorites[athleteId]) {
      delete storedAthleteFavorites[athleteId];
      removeFavoriteActionTimestamp("athlete", athleteId);
    } else {
      storedAthleteFavorites[athleteId] = true;
      setFavoriteActionTimestamp("athlete", athleteId);
    }
    saveAthleteFavorites();
    renderAthleteProfile();
    renderFeedPage();
    return;
  }

  const favoriteTeamButton = event.target.closest(".favorite-team-btn");
  if (favoriteTeamButton) {
    const teamId = favoriteTeamButton.dataset.teamId;
    if (!teamId) return;
    if (storedTeamFavorites[teamId]) {
      delete storedTeamFavorites[teamId];
      removeFavoriteActionTimestamp("team", teamId);
    } else {
      storedTeamFavorites[teamId] = true;
      setFavoriteActionTimestamp("team", teamId);
    }
    saveTeamFavorites();
    renderTeamProfile();
    renderFeedPage();
    return;
  }

});

document.addEventListener("keydown", (event) => {
  const tagInput = event.target.closest(".object-tags-input");
  if (tagInput) {
    if (event.key === "Escape") {
      const widget = tagInput.closest("[data-object-tags-widget]");
      if (widget) widget.classList.remove("is-open");
      tagInput.blur();
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const widget = tagInput.closest("[data-object-tags-widget]");
      const addButton = widget ? widget.querySelector("[data-object-tag-add]") : null;
      if (addButton) addButton.click();
      return;
    }
  }

  const objectCommentInput = event.target.closest("[data-object-comment-input]");
  if (objectCommentInput) {
    if (event.key !== "Enter" || event.shiftKey) return;
    event.preventDefault();
    const composer = objectCommentInput.closest("[data-object-comment-composer]");
    const submitButton = composer ? composer.querySelector("[data-object-comment-submit]") : null;
    if (submitButton) {
      submitButton.click();
    }
    return;
  }

  const composerInput = event.target.closest(".comment-reply-input");
  if (!composerInput) return;
  if (event.key !== "Enter" || event.shiftKey) return;
  event.preventDefault();
  const composer = composerInput.closest("[data-comment-reply-composer]");
  if (!composer) return;
  const submitButton = composer.querySelector("[data-comment-reply-submit]");
  if (submitButton) {
    submitButton.click();
  }
});

function syncSofaScoreUI(wrapper, value) {
  if (!wrapper) return;
  const safeValue = clampSofaScore(value);
  const isVertical = wrapper.classList.contains("is-vertical");
  wrapper.style.setProperty("--score", safeValue);
  wrapper.style.setProperty("--score-color", isVertical ? "var(--gum-pink)" : getScoreColor(safeValue));
  wrapper.style.setProperty("--score-text-color", isVertical ? "#111111" : getScoreTextColor(safeValue));
  const tooltip = wrapper.querySelector(".sofa-score-tooltip");
  if (tooltip) {
    tooltip.textContent = `${safeValue}`;
    tooltip.style.setProperty("--tooltip", safeValue);
  }
  const input = wrapper.querySelector(".sofa-score-input");
  if (input && Number(input.value) !== safeValue) {
    input.value = safeValue;
  }
  syncSofaScoreThumbPosition(wrapper);
  const container = wrapper.closest(".event-secondary") || wrapper.closest(".event-actions");
  const userValueEl = container ? container.querySelector(".score-user-value") : null;
  if (userValueEl) {
    userValueEl.textContent = safeValue;
  }
}

function syncEventCardUserScoreChips(eventId, value) {
  const safeEventId = String(eventId || "").trim();
  if (!safeEventId) return;
  const safeValue = clampSofaScore(value);
  const selectorEventId = safeEventId.replaceAll("\"", "\\\"");
  const chips = document.querySelectorAll(`.event-card[data-event-id="${selectorEventId}"] .event-corner-chip-user`);
  chips.forEach((chip) => {
    const isInteractiveChip = chip.tagName === "BUTTON";
    if (!isInteractiveChip) return;
    if (safeValue > 0) {
      chip.textContent = String(safeValue);
      chip.classList.remove("event-rate-btn");
      chip.classList.add("event-user-score-toggle-btn");
      chip.setAttribute("aria-label", "Afficher la jauge");
      chip.setAttribute("title", "Afficher la jauge");
      return;
    }
    chip.textContent = "Noter";
    chip.classList.remove("event-user-score-toggle-btn");
    chip.classList.add("event-rate-btn");
    chip.setAttribute("aria-label", "Noter");
    chip.setAttribute("title", "Noter");
  });
}

function syncSofaScoreThumbPosition(wrapper) {
  if (!wrapper) return;
  const input = wrapper.querySelector(".sofa-score-input");
  if (!input) return;
  const isVertical = wrapper.classList.contains("is-vertical");
  const min = Number(input.min) || 0;
  const max = Number(input.max) || 100;
  const value = clampSofaScore(input.value);
  const range = Math.max(1, max - min);
  const progress = (value - min) / range;
  wrapper.style.setProperty("--score-progress", `${progress}`);
  const rawThumbSize = getComputedStyle(wrapper).getPropertyValue("--thumb-size");
  const thumbSize = Number.parseFloat(rawThumbSize) || 20;
  if (isVertical) {
    const track = wrapper.querySelector(".sofa-score-track");
    const verticalLength = track ? track.clientHeight : input.clientHeight;
    const travel = Math.max(0, verticalLength - thumbSize);
    const thumbCenterY = (1 - progress) * travel + thumbSize / 2;
    wrapper.style.setProperty("--thumb-y", `${thumbCenterY}px`);
    return;
  }
  const travel = Math.max(0, input.clientWidth - thumbSize);
  const thumbCenterX = progress * travel + thumbSize / 2;
  wrapper.style.setProperty("--thumb-x", `${thumbCenterX}px`);
}

function getVerticalSofaScoreValueFromPointer(wrapper, clientY) {
  if (!wrapper) return null;
  const track = wrapper.querySelector(".sofa-score-track--vertical");
  if (!track) return null;
  const rect = track.getBoundingClientRect();
  if (!rect.height) return null;
  const clampedY = Math.min(rect.bottom, Math.max(rect.top, Number(clientY)));
  const progressFromTop = (clampedY - rect.top) / rect.height;
  return clampSofaScore(Math.round((1 - progressFromTop) * 100));
}

function applyVerticalSofaScoreFromPointer(wrapper, clientY, options = {}) {
  const { commit = false } = options;
  if (!wrapper || !wrapper.classList.contains("is-vertical")) return;
  const input = wrapper.querySelector(".sofa-score-input");
  if (!input) return;
  const nextValue = getVerticalSofaScoreValueFromPointer(wrapper, clientY);
  if (nextValue == null) return;
  const currentValue = clampSofaScore(input.value);
  if (currentValue !== nextValue) {
    input.value = nextValue;
    input.dispatchEvent(new Event("input", { bubbles: true }));
  }
  if (commit) {
    input.dispatchEvent(new Event("change", { bubbles: true }));
  }
}

function syncAllSofaScoreThumbPositions() {
  document.querySelectorAll(".sofa-score").forEach((wrapper) => {
    syncSofaScoreThumbPosition(wrapper);
  });
}

document.addEventListener("pointerdown", (event) => {
  const track = event.target.closest(".sofa-score-track--vertical");
  if (!track) return;
  const wrapper = track.closest(".sofa-score.is-vertical");
  if (!wrapper) return;
  event.preventDefault();
  activeSofaScorePointerState = {
    pointerId: event.pointerId,
    track,
    wrapper,
  };
  if (typeof track.setPointerCapture === "function") {
    try {
      track.setPointerCapture(event.pointerId);
    } catch (error) {
      // No-op: pointer capture is not always available.
    }
  }
  applyVerticalSofaScoreFromPointer(wrapper, event.clientY);
});

document.addEventListener("pointermove", (event) => {
  if (!activeSofaScorePointerState) return;
  if (activeSofaScorePointerState.pointerId !== event.pointerId) return;
  applyVerticalSofaScoreFromPointer(activeSofaScorePointerState.wrapper, event.clientY);
});

function endVerticalSofaScorePointerInteraction(event) {
  if (!activeSofaScorePointerState) return;
  if (activeSofaScorePointerState.pointerId !== event.pointerId) return;
  applyVerticalSofaScoreFromPointer(activeSofaScorePointerState.wrapper, event.clientY, { commit: true });
  if (typeof activeSofaScorePointerState.track?.releasePointerCapture === "function") {
    try {
      activeSofaScorePointerState.track.releasePointerCapture(event.pointerId);
    } catch (error) {
      // No-op: release can fail if capture was not established.
    }
  }
  activeSofaScorePointerState = null;
}

document.addEventListener("pointerup", endVerticalSofaScorePointerInteraction);
document.addEventListener("pointercancel", endVerticalSofaScorePointerInteraction);

document.addEventListener("input", (event) => {
  const slider = event.target.closest(".sofa-score-input");
  if (!slider) return;
  const eventId = slider.dataset.eventId;
  if (!eventId) return;
  const targetEvent = events.find((item) => item.id === eventId);
  if (!targetEvent || isUpcoming(targetEvent)) {
    delete storedRatings[eventId];
    const wrapper = slider.closest(".sofa-score");
    syncSofaScoreUI(wrapper, 0);
    syncEventCardUserScoreChips(eventId, 0);
    return;
  }
  const value = clampSofaScore(slider.value);
  storedRatings[eventId] = value;
  const wrapper = slider.closest(".sofa-score");
  syncSofaScoreUI(wrapper, value);
  syncEventCardUserScoreChips(eventId, value);
});

document.addEventListener("change", (event) => {
  const objectCommentModeSelect = event.target.closest("[data-object-comment-mode]");
  if (objectCommentModeSelect) {
    const composer = objectCommentModeSelect.closest("[data-object-comment-composer]");
    syncObjectCommentComposerMode(composer);
    return;
  }

  const profilePhotoInput = event.target.closest(".profile-photo-input");
  if (profilePhotoInput) {
    const userId = profilePhotoInput.dataset.userId;
    const file = profilePhotoInput.files && profilePhotoInput.files[0];
    if (!userId || !file) return;
    if (!file.type.startsWith("image/")) {
      window.alert("Veuillez sélectionner un fichier image.");
      profilePhotoInput.value = "";
      return;
    }
    const maxFileSize = 3 * 1024 * 1024;
    if (file.size > maxFileSize) {
      window.alert("Image trop lourde (max 3 MB).");
      profilePhotoInput.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const imageData = typeof reader.result === "string" ? reader.result : "";
      if (!imageData) return;
      storedUserProfileImages[userId] = imageData;
      const targetUser = usersById[userId];
      if (targetUser) {
        targetUser.image = imageData;
      }
      saveUserProfileImages();
      renderUserProfile();
    };
    reader.readAsDataURL(file);
    return;
  }

  const slider = event.target.closest(".sofa-score-input");
  if (!slider) return;
  const eventId = slider.dataset.eventId;
  if (!eventId) return;
  const targetEvent = events.find((item) => item.id === eventId);
  if (!targetEvent || isUpcoming(targetEvent)) {
    delete storedRatings[eventId];
    expandedEventCardGaugeIds.delete(eventId);
    clearEventCardGaugeHideTimer(eventId);
    saveRatings();
    const wrapper = slider.closest(".sofa-score");
    syncSofaScoreUI(wrapper, 0);
    renderEventCardCollections();
    if (detailEl) {
      renderEventDetail();
    }
    renderHeroFeatured();
    renderCalendar();
    renderTierlistPage();
    return;
  }
  const value = clampSofaScore(slider.value);
  storedRatings[eventId] = value;
  expandedEventCardGaugeIds.add(eventId);
  scheduleEventCardGaugeHide(eventId, 2000);
  saveRatings();
  const wrapper = slider.closest(".sofa-score");
  syncSofaScoreUI(wrapper, value);
  renderEventCardCollections();
  if (detailEl) {
    renderEventDetail();
  }
  renderHeroFeatured();
  renderCalendar();
  renderTierlistPage();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCardOverlay();
  }
});

window.addEventListener("resize", () => {
  syncAllSofaScoreThumbPositions();
});

function runInitialRenderTask(name, task) {
  try {
    task();
  } catch (error) {
    console.error(`initial render failed: ${name}`, error);
  }
}

runInitialRenderTask("renderFilters", () => renderFilters());
runInitialRenderTask("renderEvents", () => renderEvents());
runInitialRenderTask("statEvents", () => {
  if (statEvents) {
    statEvents.textContent = events.length;
  }
});
runInitialRenderTask("statSports", () => {
  if (statSports) {
    statSports.textContent = sports.length - 1;
  }
});
runInitialRenderTask("renderHeroFeatured", () => renderHeroFeatured());
runInitialRenderTask("renderAnticipated", () => renderAnticipated());
runInitialRenderTask("renderBestOf", () => renderBestOf());
runInitialRenderTask("renderBestMonth", () => renderBestMonth());
runInitialRenderTask("renderCuratedLists", () => renderCuratedLists());
runInitialRenderTask("renderHomeHighlights", () => renderHomeHighlights());
runInitialRenderTask("renderFeedPage", () => renderFeedPage());
runInitialRenderTask("renderGlobalSearch", () => renderGlobalSearch());
runInitialRenderTask("renderWatchlist", () => renderWatchlist());
runInitialRenderTask("renderListDetail", () => renderListDetail());
runInitialRenderTask("renderUserProfile", () => renderUserProfile());
runInitialRenderTask("renderEventDetail", () => renderEventDetail());
runInitialRenderTask("renderLeagueDetail", () => renderLeagueDetail());
runInitialRenderTask("renderLeaguePage", () => renderLeaguePage());
runInitialRenderTask("renderAthleteProfile", () => renderAthleteProfile());
runInitialRenderTask("renderTeamProfile", () => renderTeamProfile());
runInitialRenderTask("renderCalendar", () => renderCalendar());
runInitialRenderTask("renderTierlistPage", () => renderTierlistPage());
runInitialRenderTask("renderDataShowcase", () => renderDataShowcase());
runInitialRenderTask("renderUISamples", () => renderUISamples());
runInitialRenderTask("syncAllSofaScoreThumbPositions", () => syncAllSofaScoreThumbPositions());
runInitialRenderTask("startHeroAutoScroll", () => startHeroAutoScroll());
