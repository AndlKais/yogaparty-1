<?php

require_once "database_connection.php";

/*$titel = mysqli_real_escape_string($mysqli, $_POST['titel']);
$bezeichnung = mysqli_real_escape_string($mysqli, $_POST['bezeichnung']);
$datum = mysqli_real_escape_string($mysqli, $_POST['datum']);*/

//$seitenID = 1;
if (count($_POST) > 0) {
    $query = "insert into Aktuelles(titel, beschreibung) values (?,?)";
    echo $query.' | '.$_POST['titel'].' | '.$_POST['beschreibung'];
    if ($stmt = $mysqli->prepare($query)) {
        $titel = mysqli_real_escape_string($mysqli, $_POST['titel']);
        $beschreibung = mysqli_real_escape_string($mysqli, $_POST['beschreibung']);
        //$datum = mysqli_real_escape_string($mysqli, $_POST['datum']);
        echo $titel . ' hallo ' . $beschreibung;
        $stmt->bind_param('ss', $titel, $beschreibung);
        $stmt->execute();
        $stmt->close();
    }
}