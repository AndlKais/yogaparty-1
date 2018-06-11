<?php

require_once "database_connection.php";

$id = 1;

$output;



if ($stmt = $mysqli->prepare('SELECT titel, bezeichnung, datum, vorname, nachname from Aktuelles join YogaLehrer on YogaLehrer.Lehrer_ID = Aktuelles.FK_Lehrer where YogaLehrer.Lehrer_ID = ?')) {
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $stmt->bind_result($titel,$bezeichnung, $datum, $vorname, $nachname);
    while ($stmt->fetch()) {
        $output['titel'] = $titel;
        $output['bezeichnung'] = $bezeichnung;
        $output['datum'] = $datum;
        $output['vorname'] = $vorname;
        $output['nachname'] = $nachname;
    }
    $stmt->close();

    echo json_encode($output);
}