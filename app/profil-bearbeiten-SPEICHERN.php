<?php

require_once "database_connection.php";

$data = json_decode(file_get_contents("php://input"));

$query = "insert into YogaLehrer () values ('vname', 'nname', 'email', 'telefonnummer', 'passwort', 'passwortWH', 'adresse','plz','ort','land','kurzbeschreibung')";
if($stmt = $mysqli->prepare($query)){
    $vname = mysqli_real_escape_string($mysqli,$_POST['vname']);
    $nname = mysqli_real_escape_string($mysqli,$_POST['nname']);
    $email = mysqli_real_escape_string($mysqli,$_POST['email']);
    $telefonnummer = mysqli_real_escape_string($mysqli,$_POST['telefonnummer']);
    $passwort = mysqli_real_escape_string($mysqli,$_POST['passwort']);
    $passwortWH = mysqli_real_escape_string($mysqli,$_POST['passwortWH']);
    $adresse = mysqli_real_escape_string($mysqli,$_POST['adresse']);
    $adresszusatz = mysqli_real_escape_string($mysqli,$_POST['adresszusatz']);
    $plz = mysqli_real_escape_string($mysqli,$_POST['plz']);
    $ort = mysqli_real_escape_string($mysqli,$_POST['ort']);
    $land = mysqli_real_escape_string($mysqli,$_POST['ort']);
    $kurzbeschreibung = mysqli_real_escape_string($mysqli,$_POST['kurzbeschreibung']);
    $stmt->bind_param('sssisssisss',$vname, $nname, $email, $telefonnummer, $passwort, $passwortWH, $adresse, $adresszusatz, $plz, $ort, $land, $kurzbeschreibung);
    $dbstatus = $stmt->execute();
    $stmt->close();
}else {
    $mysqli -> error();
    /*while ($row = $temp->fetch_assoc()) {
        if(){

        }
    */
}
