<?php

require_once "database_connection.php";

$data = json_decode(file_get_contents("php://input"));
$response['everythingOk'] = true;

if(count($data) > 0){

    /**---------------------------------
     *             ERSETZEN
     * ---------------------------------
     */
    $seitenID = 1;

    foreach($data->ids as $id){
        if ($stmt = $mysqli->prepare(
            "delete from psblock 
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
    if($response['everythingOk']){
        if ($stmt = $mysqli->prepare(
            "SELECT BLOCK_ID FROM PSBLOCK WHERE FK_Seiten_ID = ? ORDER BY POSITION")) {

            $stmt->bind_param("i", $seitenID);

            $stmt->execute();

            $result = array();
            $temp = $stmt->get_result();
            $pos = 1;
            while ($row = $temp->fetch_assoc()) {
                //echo json_encode($row);
                foreach ($row as $key => $value) {
                    if ($stmt = $mysqli->prepare(
                        "UPDATE PSBLOCK SET POSITION = ? WHERE BLOCK_ID = ?")) {

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