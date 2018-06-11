<?php

require_once "database_connection.php";

/*$titel = mysqli_real_escape_string($mysqli, $_POST['titel']);
$bezeichnung = mysqli_real_escape_string($mysqli, $_POST['bezeichnung']);
$datum = mysqli_real_escape_string($mysqli, $_POST['datum']);*/

//$seitenID = 1;
if (count($_POST) > 0) {
    //$query = "insert into Aktuelles(titel, bezeichnung, datum) values ('$titel', '$bezeichnung', '$datum')";
    if ($stmt = $mysqli->prepare("insert into Aktuelles(titel, bezeichnung, datum) values (?,?,?)"));

    $titel = mysqli_real_escape_string($mysqli, $_POST['titel']);
    $bezeichnung = mysqli_real_escape_string($mysqli, $_POST['bezeichnung']);
    $datum = mysqli_real_escape_string($mysqli, $_POST['datum']);
    $stmt->bind_param('sss',$titel,$bezeichnung, $datum);
    $stmt->execute();
    $stmt->close();
}