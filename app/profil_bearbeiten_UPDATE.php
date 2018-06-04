<?php

require_once "database_connection.php";

$data = json_decode(file_get_contents("php://input"));
//echo json_encode($data -> $vname);
/*$query = "insert into YogaLehrer (vorname, nachname, email, telefonnummer, passwort, adresse, adresszusatz, plz, ort, land) values (?,?,?,?,?,?,?,?,?,?)";
echo json_encode($data);
if($stmt = $mysqli->prepare($query)){
    $vname = mysqli_real_escape_string($mysqli,$data->vorname);
    $nname = mysqli_real_escape_string($mysqli,$data->nachname);
    $email = mysqli_real_escape_string($mysqli,$data->email);
    $telefonnummer = mysqli_real_escape_string($mysqli, $data->telefonnummer);
    $passwort = mysqli_real_escape_string($mysqli,$data->passwort);
    //$passwortWH = mysqli_real_escape_string($mysqli,$data->passwortWH);
    $adresse = mysqli_real_escape_string($mysqli,$data->adresse);
    $adresszusatz = mysqli_real_escape_string($mysqli,$data->adresszusatz);
    $plz = mysqli_real_escape_string($mysqli,$data->plz);
    $ort = mysqli_real_escape_string($mysqli,$data->ort);
    $land = mysqli_real_escape_string($mysqli,$data->land);
    //$kurzbeschreibung = mysqli_real_escape_string($mysqli,$data->kurzbeschreibung);
    $stmt->bind_param('sssisssiss',$vname, $nname, $email, $telefonnummer, $passwort, $adresse, $adresszusatz, $plz, $ort, $land);
    $stmt->execute();
    $stmt->close();
}else {
    //$mysqli -> error();
    /*while ($row = $temp->fetch_assoc()) {
        if(){

        }
    */
/*}*/

if (count($data) > 0) {
    $query = "update YogaLehrer set vorname=?, nachname=?, email=?, telefonnummer=?, passwort=?, adresse=?, adresszusatz=?, plz=?, ort=?, land=?";
    if($stmt = $mysqli->prepare($query)){
        $vname = mysqli_real_escape_string($mysqli,$data->vorname);
        $nname = mysqli_real_escape_string($mysqli,$data->nachname);
        $email = mysqli_real_escape_string($mysqli,$data->email);
        $telefonnummer = mysqli_real_escape_string($mysqli, $data->telefonnummer);
        $passwort = mysqli_real_escape_string($mysqli,$data->passwort);
        //$passwortWH = mysqli_real_escape_string($mysqli,$data->passwortWH);
        $adresse = mysqli_real_escape_string($mysqli,$data->adresse);
        $adresszusatz = mysqli_real_escape_string($mysqli,$data->adresszusatz);
        $plz = mysqli_real_escape_string($mysqli,$data->plz);
        $ort = mysqli_real_escape_string($mysqli,$data->ort);
        $land = mysqli_real_escape_string($mysqli,$data->land);
        //$kurzbeschreibung = mysqli_real_escape_string($mysqli,$data->kurzbeschreibung);
        $stmt->bind_param('sssisssiss',$vname, $nname, $email, $telefonnummer, $passwort, $adresse, $adresszusatz, $plz, $ort, $land);
        $stmt->execute();
        $stmt->close();
    }


    $query2 = "update Profilseite set profB_name=?, profB_pfad=?, pb_versteckt=?";
    if($stmt2 = $mysqli->prepare($query2)){
        $pbname = mysqli_real_escape_string($mysqli,$data->profilbildbname);
        $pbpfad = mysqli_real_escape_string($mysqli,$data->profilbildpfad);
        $pbversteckt = mysqli_real_escape_string($mysqli,$data->profilbildversteckt);
        $stmt->bind_param('ssb',$pbname, $pbpfad, intval($pbversteckt));
        $stmt->execute();
        $stmt->close();

        $target_dir = "../uploads/";
        $imageFileType = strtolower(pathinfo($target_dir . basename($_FILES["file"]["name"]),PATHINFO_EXTENSION));
        $target_file =  $target_dir.$pbname." . $imageFileType;
    }else{
        
    }
}

