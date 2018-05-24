<?php

require_once "database_connection.php";
$data = json_decode(file_get_contents("php://input"));

//echo json_encode($data->aenderungen[0]);
//echo json_encode($data->ursprung);
$status = [
    "posPrepare" => true,
    "inhaltPrepare" => true,
    "posExecute" => true,
    "inhaltExecute" => true,
    "everythingOk" => true
    ];
if(count($data) > 0){
    /**
     * MIT LOGIN KOMBINIEREN OB BLÖCKE DER EINGELOGGTEN PERSON GEHÖREN
     */

    if($data->changes->pos) {

        for ($indexPos = 1, $anzahlPos = count($data->pos); $indexPos <= $anzahlPos; $indexPos++) {

            if ($stmt = $mysqli->prepare(
                "UPDATE psblock SET POSITION = ? WHERE Block_ID = ?")) {

                $stmt->bind_param("ii", $indexPos, intval($data->pos[$indexPos-1]));

                if(!$stmt->execute()){
                    $status['posExecute'] = false;
                    $status['everythingOk'] = false;
                }

            }else{
                $status['posPrepare'] = false;
                $status['everythingOk'] = false;
            }
        }
    }

    if($data->changes->inhalt){
        for($indexInhalt = 0, $anzahlInhalt = count($data->ursprung); $indexInhalt < $anzahlInhalt; $indexInhalt++){
            //echo json_encode($data->aenderungen[$indexInhalt]->id);
            //echo $indexInhalt;
            foreach ($data->ursprung[$indexInhalt] as $key => $value) {
                if($data->aenderungen[$indexInhalt]->$key != $value) {
                    $tempBlockArt = $data->aenderungen[$indexInhalt]->blockArt;
                    $aendere = $key === "beschreibung" ? "text" : $key;
                    $neuerInhalt = $data->aenderungen[$indexInhalt]->$key;
                    $derzeitigeBlockId = intval($data->aenderungen[$indexInhalt]->id);
                    $blockArt;
                    $idName;
                    /**
                     * NOT NEEDED RIGHT NOW - ERST WENN DIE BLÖCKE AUSGETAUSCHT WERDEN KÖNNEN
                     */
                    $rightOrLeft;
                    switch ($tempBlockArt) {
                        case "BTCT":
                            $blockArt = "B_Titel_C_Text";
                            $idName = "BTCText_ID";
                            break;
                        case "BBTR":
                            $blockArt = "B_Bild_Text";
                            $idName = "BBText_ID";
                            break;
                        case "BBTL":
                            $blockArt = "B_Bild_Text";
                            $idName = "BBText_ID";
                            break;
                        case "BBCT":
                            $blockArt = "B_Bild_C_Text";
                            $idName = "BBCText_ID";
                            break;
                    }

                    if($key === "color"){
                        $blockArt = "PSBlock";
                        $idName = "Block_ID";
                    }
                    if($key === "backgroundC"){
                        $blockArt = "PSBlock";
                        $idName = "Block_ID";
                        $aendere = "bgcolor";
                    }

                    //echo "UPDATE {$blockArt} SET {$aendere} = ? WHERE Block_ID = ?";

                    if ($stmt = $mysqli->prepare(
                        "UPDATE {$blockArt} SET {$aendere} = ? WHERE {$idName} = ?")) {

                        $stmt->bind_param("si", $neuerInhalt, $derzeitigeBlockId);

                        if(!$stmt->execute()){
                            $status['inhaltExecute'] = false;
                            $status['everythingOk'] = false;
                        }

                    }else{
                        $status['error'] .= "UPDATE {$blockArt} SET {$aendere} = '{$neuerInhalt}' WHERE {$idName} = {$derzeitigeBlockId}";
                        $status['inhaltPrepare'] = false;
                        $status['everythingOk'] = false;
                    }
                }
                //echo $key . " <###> ";
                //echo json_encode($data->aenderungen[0]);
            }
        }
    }
}

echo json_encode($status);
