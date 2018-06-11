<?php

require_once "database_connection.php";

$seitenID = 1;
if (count($_POST) > 0) {
    $query = "update Aktuelles set titel=?, bezeichnung=?, datum=? where aktuell_ID=?";
    if ($stmt = $mysqli->prepare($query)) {
        $titel = mysqli_real_escape_string($mysqli, $_POST['titel']);
        $bezeichnung = mysqli_real_escape_string($mysqli, $_POST['bezeichnung']);
        $datum = mysqli_real_escape_string($mysqli, $_POST['datum']);
        $datum = date("Y-m-d");

        $stmt->bind_param('sss', $titel, $bezeichnung, $datum);
        $stmt->execute();
        $stmt->close();
    }
}


