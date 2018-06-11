<?php

require_once "database_connection.php";

$seitenID = 1;
if (count($_POST) > 0) {
    $query = "update YogaLehrer set vorname=?, nachname=?, email=?, telefonnummer=?, passwort=?, adresse=?, adresszusatz=?, plz=?, ort=?, land=? where Lehrer_ID=?";
    if($stmt = $mysqli->prepare($query)){
        $vname = mysqli_real_escape_string($mysqli,$_POST['vorname']);
        $nname = mysqli_real_escape_string($mysqli,$_POST['nachname']);
        $email = mysqli_real_escape_string($mysqli,$_POST['email']);
        $telefonnummer = mysqli_real_escape_string($mysqli, $_POST['telefonnummer']);
        $passwort = mysqli_real_escape_string($mysqli,$_POST['passwort']);
        //$passwortWH = mysqli_real_escape_string($mysqli,$_POST['passwortWH);
        $adresse = mysqli_real_escape_string($mysqli,$_POST['adresse']);
        $adresszusatz = mysqli_real_escape_string($mysqli,$_POST['adresszusatz']);
        $plz = mysqli_real_escape_string($mysqli,$_POST['plz']);
        $ort = mysqli_real_escape_string($mysqli,$_POST['ort']);
        $land = mysqli_real_escape_string($mysqli,$_POST['land']);
        //$kurzbeschreibung = mysqli_real_escape_string($mysqli,$_POST['kurzbeschreibung);
        $stmt->bind_param('sssisssissi',$vname, $nname, $email, $telefonnummer, $passwort, $adresse, $adresszusatz, $plz, $ort, $land, $seitenID);
        $stmt->execute();
        $stmt->close();
    }


    if (count($_FILES) > 0) {
    $query2 = "update Profilseite set profB_name=?, profB_pfad=?/*, pb_versteckt=?*/ WHERE Seiten_ID=?";
    if($stmt2 = $mysqli->prepare($query2)) {
        $imageFileType = strtolower(pathinfo("../uploads/" . basename($_FILES["file"]["name"]), PATHINFO_EXTENSION));
        $pbname = ('ProfilBild_' . $seitenID . '.' . $imageFileType);
        //echo $pbname;
        $pbpfad = "../uploads/";
        //$pbversteckt = mysqli_real_escape_string($mysqli,$_POST['profilbildversteckt']);
        $stmt2->bind_param('ssi', $pbname, $pbpfad, $seitenID/*, intval($pbversteckt)*/);
        $stmt2->execute();
        $stmt2->close();

        $target_dir = "../uploads/";
        //$imageFileType = strtolower(pathinfo($target_dir . basename($_FILES["file"]["name"]),PATHINFO_EXTENSION));
        $target_file = "ProfilBild_1." . $imageFileType;
        move_uploaded_file($_FILES["file"]["tmp_name"], $target_dir . $target_file);
    }
    }
}


