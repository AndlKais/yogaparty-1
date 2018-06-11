<?php

require_once "database_connection.php";

/**
 *
 * REPLACE
 * REPLACE
 * REPLACE
 * REPLACE
 * REPLACE
 *
 */
$seitenID = 1;

$response = [
    "hasMoreThanZeroBlocks" => false
];

if ($stmt = $mysqli->prepare(
    "SELECT color, bgcolor FROM PSBlock WHERE FK_Seiten_ID = ? AND Block_ID = (SELECT MAX(Block_ID) FROM PSBlock WHERE FK_Seiten_ID = ?)")) {

    $stmt->bind_param("ii", $seitenID, $seitenID);

    $stmt->execute();

    $stmt->bind_result($resultColor, $resultBColor);

    while ($stmt->fetch()) {
        $response['hasMoreThanZeroBlocks'] = true;
        $response['resColor'] = $resultColor;
        $response['resBColor'] = $resultBColor;
    }
}

echo json_encode($response);