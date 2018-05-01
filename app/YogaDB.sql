drop database if exists YogaDB;
create database YogaDB;

use YogaDB;

create table if not exists YogaLehrer (
	Lehrer_ID integer primary key auto_increment,
	vorname varchar(30),
	nachname varchar(30),
	straße varchar(30),
	ort varchar(30),
	land varchar(30),
	plz varchar(10),
	ist_freigegeben boolean,
	email varchar(30),
	passwort varchar(30)
);

insert into YogaLehrer (vorname, nachname, straße, ort, land, plz, ist_freigegeben, email, passwort) values ('Jens', 'Oberberger', 'Baumgasse 27', 'Wupperntal', 'Österreich','1030',true,'Jens.Wappler@trashmail.com', 'Blaumeisenmaschine');

create table if not exists Zertifikat (
	Zert_ID integer primary key auto_increment,
	bezeichnung varchar(30),
	pfad varchar(30),
	FK_Lehrer_ID integer,
	Foreign Key (FK_Lehrer_ID) references YogaLehrer(Lehrer_ID)
);

insert into Zertifikat (bezeichnung, pfad, FK_Lehrer_ID) values ('Des Diplom','diploms/OberbergerAbschluss.pdf',1);

create table if not exists Termin (
	Termin_ID integer primary key auto_increment,
	datum date,
	beschreibung varchar(30),
	aktuelle_Teilnehmer integer,
	max_Teilnehmer integer,
	FK_Lehrer_ID integer,
	Foreign Key (FK_Lehrer_ID) references YogaLehrer(Lehrer_ID)
);

insert into Termin (datum, beschreibung, aktuelle_Teilnehmer, max_Teilnehmer, FK_Lehrer_ID) values (2018-05-25, 'servaaaaaaaas', 3, 7, 1);

create table if not exists Profilseite (
	Seiten_ID integer primary key auto_increment,
	profB_name varchar(30),
	profB_pfad varchar(30),
	pb_versteckt boolean,
	FK_Lehrer_ID integer,
	Foreign Key (FK_Lehrer_ID) references YogaLehrer(Lehrer_ID)
);

insert into Profilseite (profB_name, profB_pfad, pb_versteckt, FK_Lehrer_ID) values ('istegal.jpg','profilBs/', false, 1);

create table if not exists HeaderBilder (
	HB_ID integer primary key auto_increment,
	bName varchar(30),
	bPfad varchar(30),
	position integer,
	FK_Seiten_ID integer,
	Foreign Key (FK_Seiten_ID) references Profilseite(Seiten_ID)
);

insert into HeaderBilder (bName, bPfad, position, FK_Seiten_ID) values ('headerbild.jpg', 'headers/', 1,1);

create table if not exists PSBlock (
	Block_ID integer primary key auto_increment,
	blockart varchar(30),
	position integer,
	FK_Seiten_ID integer,
	color varchar(30),
	Foreign Key (FK_Seiten_ID) references Profilseite(Seiten_ID)
);

insert into PSBlock (blockart, position, FK_seiten_ID) values
	('BTCT', 1, 1),
	('BBCT', 2, 1),
	('BBT', 3, 1),
	('BBCT', 4, 1);

create table if not exists B_Titel_C_Text (
	BTCText_ID integer primary key,
	titel varchar(30),
	text varchar(30),
	Foreign Key (BTCText_ID) references PSBlock(Block_ID)
);

insert into B_Titel_C_Text (BTCText_ID, titel, text) values (1, 'Hello', 'Testosteroni');

create table if not exists B_Bild_C_Text (
	BBCText_ID integer primary key,
	bName varchar(30),
	bPfad varchar(30),
	titel varchar(30),
	text varchar(30),
	Foreign Key (BBCText_ID) references PSBlock(Block_ID)
);

insert into B_Bild_C_Text (BBCText_ID, bName, bPfad, titel, text) values
	(2, 'ui.jpg', 'blockbild/','maybe','Tost'),
	(4, 'uff.jpg','blockbild/','I dont know', 'Tust');

create table if not exists B_Bild_Text (
	BBText_ID integer primary key,
	bildR boolean,
	bName varchar(30),
	bPfad varchar(30),
	titel varchar(30),
	text_color varchar(6),
	text varchar(30),
	Foreign Key (BBText_ID) references PSBlock(Block_ID)
);

insert into B_Bild_Text (BBText_ID, bildR, bName, bPfad, titel, text) values (3, true,'uuuuuffffff.jpg', 'blockbild/', 'Can you repeat the question', 'Testeroni');