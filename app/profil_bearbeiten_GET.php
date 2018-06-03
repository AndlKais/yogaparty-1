<?php

require_once "database_connection.php";

$id = 1;

$output;



if ($stmt = $mysqli->prepare('SELECT vorname, nachname, email, telefonnummer, passwort, adresse, adresszusatz, plz, ort, land from YogaLehrer where Lehrer_ID=?')) {
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $stmt->bind_result($vname, $nname, $email, $telefonnummer, $passwort, $adresse, $adresszusatz, $plz, $ort, $land);
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
    }
    $stmt->close();

    echo json_encode($output);
}

