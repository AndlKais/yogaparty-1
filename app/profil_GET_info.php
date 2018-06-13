<?php

require_once "database_connection.php";

$id = 1;

$output;



if ($stmt = $mysqli->prepare('SELECT vorname, nachname, email, telefonnummer, adresse, adresszusatz, plz, ort, land, kurzbeschreibung, profB_name, profB_pfad,  pb_versteckt from YogaLehrer join Profilseite on YogaLehrer.Lehrer_ID = Profilseite.FK_Lehrer_ID where YogaLehrer.Lehrer_ID = ?')) {
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $stmt->bind_result($vname, $nname, $email, $telefonnummer, $adresse, $adresszusatz, $plz, $ort, $land, $kurzbeschreibung, $pbname, $pbpfad, $pbversteckt);
    while ($stmt->fetch()) {
        $output['vorname'] = $vname;
        $output['nachname'] = $nname;
        $output['email'] = $email;
        $output['telefonnummer'] = $telefonnummer;
        $output['adresse'] = $adresse;
        $output['adresszusatz'] = $adresszusatz;
        $output['plz'] = $plz;
        $output['ort'] = $ort;
        $output['land'] = $land;
        $output['kurzbeschreibung'] = $kurzbeschreibung;
        $output['profilbildname'] = $pbname;
        $output['profilbildpfad'] = $pbpfad;
        $output['profilbildversteckt'] = $pbversteckt;
    }
    $stmt->close();

    echo json_encode($output);
}

