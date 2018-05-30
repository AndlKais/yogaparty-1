<?php

require_once "database_connection.php";

$data = json_decode(file_get_contents("php://input"));

$vname = htmlspecialchars($_POST['vname']);
$nname = htmlspecialchars($_POST['nname']);
$email = htmlspecialchars($_POST['email']);
$telefonnummer = htmlspecialchars($_POST['telefonnummer']);
$passwort = htmlspecialchars($_POST['passwort']);
$passwortWH = htmlspecialchars($_POST['passwortWH']);
$adresse = htmlspecialchars($_POST['adresse']);
$adresszusatz = htmlspecialchars($_POST['adresszusatz']);
$kurzbeschreibung = htmlspecialchars($_POST['kurzbeschreibung']);


$query = "insert into ";
