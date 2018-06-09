<?php

require_once "database_connection.php";

$id = 1;

$output;



if ($stmt = $mysqli->prepare('SELECT title, bezeichnung, datum, vorname, nachname from Aktuelles join YogaLehrer on YogaLehrer.Lehrer_ID = .FK_Lehrer where YogaLehrer.Lehrer_ID = ?')) {
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $stmt->bind_result($vname, $nname, $email, $telefonnummer, $passwort, $adresse, $adresszusatz, $plz, $ort, $land, $pbname, $pbpfad, $pbversteckt);
    while ($stmt->fetch()) {
        $output['vorname'] = $vname;
        $output['nachname'] = $nname;
        $output['email'] = $email;
        $output['telefonnummer'] = $telefonnummer;
        $output['passwort'] = $passwort;
        $output['adresse'] = $adresse;
        $output['adresszusatz'] = $adresszusatz;
        $output['plz'] = $plz;
        $output['ort'] = $ort;
        $output['land'] = $land;
        $output['profilbildname'] = $pbname;
        $output['profilbildpfad'] = $pbpfad;
        $output['profilbildversteckt'] = $pbversteckt;
    }
    $stmt->close();

    echo json_encode($output);
}