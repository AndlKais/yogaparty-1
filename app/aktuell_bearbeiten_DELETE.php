<?php

require_once "database_connection.php";

$id = 1;
if (count($_POST) > 0) {
    $query = "delete from Aktuelles where titel = ? and beschreibung = ? and FK_Lehrer=?";
    echo $query;
    if ($stmt = $mysqli->prepare($query)) {
        $titel = mysqli_real_escape_string($mysqli, $_POST['titel']);
        $beschreibung = mysqli_real_escape_string($mysqli, $_POST['beschreibung']);
        $stmt->bind_param('ssi', $titel, $beschreibung, $id);
        $stmt->execute();
        $stmt->close();
    }
}