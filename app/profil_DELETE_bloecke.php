<?php

require_once "database_connection.php";

$data = json_decode(file_get_contents("php://input"));
$response['everythingOk'] = true;

/**
 * Es Wird überprüft, ob man ohne Daten auf die Seite kommt
 */
if(count($data) > 0){

    /**---------------------------------
     *             ERSETZEN
     * ---------------------------------
     */
    $seitenID = 1;

    /**
     * jeder Block, dessen ID in dem gelieferten Array steht, wird gelöscht
     */
    foreach($data->ids as $id){
        if ($stmt = $mysqli->prepare(
            "delete from PSBlock 
                        where Block_ID = ? 
                        and FK_Seiten_ID = ?;"
        )) {
            /*(
            "delete from psblock
                        where Block_ID = ?
                        and FK_Seiten_ID =
                            (select profils.Seiten_ID from Profilseite profils
                                join YogaLehrer yl on (yl.Lehrer_ID = profils.FK_Lehrer_ID)
                                where yl.Lehrer_ID = ?);*/

            $idInt = intval($id);
            $stmt->bind_param("ii", $idInt, $seitenID);

            $stmt->execute();

            $stmt->close();
        }else{
            $response['fetch with ' + $id] = false;
            $response['everythingOk'] = false;
        }
    }

    /**
     * Falls die Löschung erfolgreich war, müssen die Positionen wieder angepasst werden
     * Wenn bei den IDs 1,2,3,4,5 die Positionen 1-1, 2-2, 3-3, 4-4, 5-5 sind und
     * der Block mit der ID 3 gelöscht wird, werden die Positionen den anderen Blöcke
     * angepasst: 1-1, 2-2, 4-3, 5-4
     */
    if($response['everythingOk']){
        if ($stmt = $mysqli->prepare(
            "SELECT Block_ID FROM PSBlock WHERE FK_Seiten_ID = ? ORDER BY POSITION")) {

            $stmt->bind_param("i", $seitenID);

            $stmt->execute();

            $result = array();
            $temp = $stmt->get_result();
            $pos = 1;
            while ($row = $temp->fetch_assoc()) {
                //echo json_encode($row);
                foreach ($row as $key => $value) {
                    if ($stmt = $mysqli->prepare(
                        "UPDATE PSBlock SET POSITION = ? WHERE Block_ID = ?")) {

                        $stmt->bind_param("ii", $pos, $value);

                        $stmt->execute();
                        $pos++;
                    }else{
                        $response['update with ' + $value] = false;
                        $response['everythingOk'] = false;
                    }
                }
            }
        }

        $stmt->close();
        //echo json_encode($result);
    }else{
        $response['fetch with ' + $id] = false;
        $response['everythingOk'] = false;
    }
}else{
    $response['everythingOk'] = false;
}

echo json_encode($response);