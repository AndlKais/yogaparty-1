<?php

require_once "database_connection.php";

if (count($_POST) > 0) {
    $query = "delete from Aktuelles where titel = ? and beschreibung = ? and FK_Lehrer=?";
    if ($stmt = $mysqli->prepare($query)) {
        $titel = mysqli_real_escape_string($mysqli, $_POST['titel']);
        $beschreibung = mysqli_real_escape_string($mysqli, $_POST['beschreibung']);
        $idInt = intval($id);
        $stmt->bind_param('ssi', $titel, $beschreibung, $idInt);
        $stmt->execute();
        $stmt->close();
    }
}