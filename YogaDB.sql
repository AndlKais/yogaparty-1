drop database if exists YogaDB;
create database YogaDB;

use YogaDB;

create table if not exists YogaLehrer (
Lehrer_ID integer primary key auto_increment,
vorname varchar(30),
nachname varchar(30),
email varchar(30),
telefonnummer integer,
passwort varchar(30),
adresse varchar(30),
adresszusatz varchar(30),
plz integer,
ort varchar(30),
land varchar(30),
ist_freigegeben boolean
);

insert into YogaLehrer (Lehrer_ID, vorname, nachname, email, telefonnummer, passwort, adresse, adresszusatz, plz, ort, land, ist_freigegeben) values (1, 'Jens', 'Oberberger', 'jens.oberberger@gmail.com', 0664653721, 'asdf', 'Rennweg', '89b', 1030, 'Wien', 'AT',true);

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

insert into Profilseite (profB_name, profB_pfad, pb_versteckt, FK_Lehrer_ID) values ('yoga.png','../app/resources/pictures/', false, 1);
/*update Profilseite set profB_name='ProfilBild_1', profB_pfad='../uploads/' WHERE Seiten_ID=1;
*/
select * from Profilseite;

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
bgcolor varchar(30),
Foreign Key (FK_Seiten_ID) references Profilseite(Seiten_ID)
);

insert into PSBlock (blockart, position, FK_seiten_ID) values 
('BTCT', 1, 1),
('BBCT', 2, 1),
('BBT', 3, 1),
('BBCT', 4, 1),
('BBT', 5, 1);

create table if not exists B_Titel_C_Text (
BTCText_ID integer primary key,
titel varchar(30),
text varchar(500),
Foreign Key (BTCText_ID) references PSBlock(Block_ID) ON DELETE CASCADE
);

insert into B_Titel_C_Text (BTCText_ID, titel, text) values (1, 'Lorem Ipsum', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.');

create table if not exists B_Bild_C_Text (
BBCText_ID integer primary key,
bName varchar(200),
bPfad varchar(30),
titel varchar(30),
text varchar(500),
bZahl integer,
Foreign Key (BBCText_ID) references PSBlock(Block_ID) ON DELETE CASCADE
);

insert into B_Bild_C_Text (BBCText_ID, bName, bPfad, titel, text, bZahl) values 
(2, 'https://milltowngalway.com/wp-content/uploads/2018/01/yog.jpg', '','Lorem Ipsum','Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', 1), 
(4, 'https://image.brigitte.de/10208872/uncropped-0-0/b7b47e9612a86776bfb168a64774ca91/yJ/yoga-frau-natur-t.jpg','','Lorem Ipsum', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', 2);

create table if not exists B_Bild_Text (
BBText_ID integer primary key,
bildR boolean,
bName varchar(200),
bPfad varchar(30),
titel varchar(30),
text varchar(500),
bZahl integer,
Foreign Key (BBText_ID) references PSBlock(Block_ID) ON DELETE CASCADE
);

insert into B_Bild_Text (BBText_ID, bildR, bName, bPfad, titel, text, bZahl) values (3, true, 'https://bbluntdaily.com/wp-content/uploads/2018/04/pexels-photo-588561.jpg', '', 'Lorem Ispum', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',1);
insert into B_Bild_Text (BBText_ID, bildR, bName, bPfad, titel, text, bZahl) values (5, false, 'https://bbluntdaily.com/wp-content/uploads/2018/04/pexels-photo-588561.jpg', '', 'Lorem Ispum', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',2);


create table if not exists Aktuelles (
aktuell_ID integer primary key auto_increment,
titel varchar(200),
bezeichnung varchar(200),
datum date,
FK_Lehrer integer,
Foreign Key(FK_Lehrer) references YogaLehrer(Lehrer_ID) ON DELETE CASCADE
);

insert into Aktuelles(titel, bezeichnung, datum, FK_Lehrer) values ('Das neue Yogastudio neben der HTL Rennweg hat heute eröffnet', 'Dies ist ein Test. Wird gleich wieder entfernt', '2018-06-10',1);
SELECT titel, bezeichnung, datum, vorname, nachname from Aktuelles join YogaLehrer on YogaLehrer.Lehrer_ID = Aktuelles.FK_Lehrer where YogaLehrer.Lehrer_ID = 1;
/*create table if not exists news (

);*/

select * from YogaLehrer;
select * from Profilseite;

SELECT vorname, nachname, email, telefonnummer, passwort, adresse, adresszusatz, plz, ort, land from YogaLehrer where Lehrer_ID=1;

insert into YogaLehrer (vorname, nachname, email, telefonnummer, passwort, adresse, adresszusatz, plz, ort, land) values ('Jens', 'Oberberger', 'Jens.Wappler@trashmail.com', 0664653721, 'Blaumeisenmaschine', 'Baumgasse', 27, 1030, 'Wupperntal', 'Österreich');
/*insert into YogaLehrer (vorname, nachname, email, telefonnummer, passwort, adresse, adresszusatz, plz, ort, land, ist_freigegeben) values ('Jens', 'Oberberger', 'Jens.Wappler@trashmail.com', 0664653721, 'Blaumeisenmaschine', 'Baumgasse', 27, 1030, 'Wupperntal', 'Österreich',true);
*/
select * from psblock;

select * from (select Block_ID, position, titel, text, null as bPfad, null as bName, null as bildR from B_Titel_C_Text
	join PSBlock on (BTCText_ID = Block_ID) where FK_Seiten_ID = 1
union 
select Block_ID, position, titel, text, bPfad, bName, null  from B_Bild_C_Text
	join PSBlock on (BBCText_ID = Block_ID) where FK_Seiten_ID = 1
union
select Block_ID, position, titel, text, bPfad, bName, bildR from B_Bild_Text
	join PSBlock on (BBText_ID = Block_ID) where FK_Seiten_ID = 1) a order by position;