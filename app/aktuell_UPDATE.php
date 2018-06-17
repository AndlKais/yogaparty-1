<?php

require_once "database_connection.php";

$seitenID = 1;
if (count($_POST) > 0) {

    echo json_encode($_POST);
    $query = "update Aktuelles set titel=?, beschreibung=?, datum=? where aktuell_ID=?";
    if ($stmt = $mysqli->prepare($query)) {
        $titel = mysqli_real_escape_string($mysqli, $_POST['titel']);
        $beschreibung = mysqli_real_escape_string($mysqli, $_POST['beschreibung']);
        $datum = date("Y-m-d");
        $id = mysqli_real_escape_string($mysqli, $_POST['aktuell_ID']);

        $stmt->bind_param('sssi', $titel, $beschreibung, $datum, $id);
        $stmt->execute();
        $stmt->close();
    }
}


