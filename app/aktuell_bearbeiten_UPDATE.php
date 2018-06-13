<?php

require_once "database_connection.php";

$seitenID = 1;
if (count($_POST) > 0) {
    echo json_encode($_POST);
    $query = "update Aktuelles set titel=?, beschreibung=?, datum=? where FK_Lehrer=?";
    if ($stmt = $mysqli->prepare($query)) {
        $titel = mysqli_real_escape_string($mysqli, $_POST['titel']);
        $beschreibung = mysqli_real_escape_string($mysqli, $_POST['beschreibung']);
        $datum = date("Y-m-d");

        $stmt->bind_param('sssi', $titel, $beschreibung, $datum, $seitenID);
        $stmt->execute();
        $stmt->close();
    }
}


