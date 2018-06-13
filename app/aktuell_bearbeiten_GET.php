<?php

require_once "database_connection.php";

$id = 1;

$output;

if ($stmt = $mysqli->prepare('SELECT aktuell_ID, titel, beschreibung, datum, vorname, nachname from Aktuelles join YogaLehrer on YogaLehrer.Lehrer_ID = Aktuelles.FK_Lehrer where YogaLehrer.Lehrer_ID = ?')) {
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();
    while ($row = $result->fetch_assoc()) {
        $output[] = $row;
    }
    $stmt->close();

    echo json_encode($output);
}

/*if ($stmt = $mysqli->prepare('SELECT titel, beschreibung, datum, vorname, nachname from Aktuelles join YogaLehrer on YogaLehrer.Lehrer_ID = Aktuelles.FK_Lehrer where YogaLehrer.Lehrer_ID = ?')) {
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $stmt->bind_result($titel,$beschreibung, $datum, $vorname, $nachname);
    while ($stmt->fetch()) {
        $output['titel'] = $titel;
        $output['beschreibung'] = $beschreibung;
        $output['datum'] = $datum;
        $output['vorname'] = $vorname;
        $output['nachname'] = $nachname;
    }
    $stmt->close();

    echo json_encode($output);
}*/