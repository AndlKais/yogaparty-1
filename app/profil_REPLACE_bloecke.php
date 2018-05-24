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
//echo json_encode($_FILES);



/**
 *
 *
 *
 *
 * MIT LOGIN KOMBINIEREN OB BLÖCKE DER EINGELOGGTEN PERSON GEHÖREN
 * (z.B.: Blöcke in array packen und schauen ob die angefragten Blöcke in diesem sind)
 *
 *
 *
 *
 */





if($_POST['fileToId']) {
    $fileToId = json_decode($_POST['fileToId']);
}
$data = $_POST;

if(count($_POST['fileToId']) > 0){
    for($indexFiles = 0, $anzahlFiles = count($_POST['fileToId']); $indexFiles < $anzahlFiles; $indexFiles++){
        $fileBlockArt;
        $fileIdName;
        switch($fileToId[$indexFiles]->blockArt){
            case "BBTR":
                $fileBlockArt = "B_Bild_Text";
                $fileIdName = "BBText_ID";
                break;
            case "BBTL":
                $fileBlockArt = "B_Bild_Text";
                $fileIdName = "BBText_ID";
                break;
            case "BBCT":
                $fileBlockArt = "B_Bild_C_Text";
                $fileIdName = "BBCText_ID";
                break;
        }
        if ($stmt = $mysqli->prepare(
            "SELECT CONCAT(bPfad,bName) AS 'datei' FROM {$fileBlockArt} WHERE {$fileIdName} = ?")) {

            $stmt->bind_param("i", intval($fileToId[$indexFiles]->id));

            if(!$stmt->execute()){
                $status['fileExecute'] = false;
                $status['everythingOk'] = false;
            }

            $stmt->bind_result($result);
            $stmt->close();

            if(file_exists($result)){
                if(!unlink($result)){
                    $status['deleteFile'] = false;
                }
            }

            $check = getimagesize($_FILES["file" . $indexFiles]["tmp_name"]);
            //echo json_encode($_FILES['file' . $indexFiles]['tmp_name']);
            if($check == false) {
                //echo "File is not an image.";
                $status['allFilesImages'] = false;
                $status['everythingOk'] = false;
            }

            if (filesize($_FILES["file" . $indexFiles]["tmp_name"]) > 5000000 || filesize($_FILES["file" . $indexFiles]["tmp_name"]) == 0) {
                //echo "SIZE: " . filesize($_FILES["file" . $indexFiles]["tmp_name"]);
                $status['fileSizes'] = false;
                $status['everythingOk'] = false;
            }

            $target_dir = "../uploads/";
            $imageFileType = strtolower(pathinfo($target_dir . basename($_FILES["file" . $indexFiles]["name"]),PATHINFO_EXTENSION));
            $target_file = "Block_pic_" . intval($fileToId[$indexFiles]->id) . "." . $imageFileType;

            if (move_uploaded_file($_FILES["file" . $indexFiles]["tmp_name"], $target_dir . $target_file)) {
                $status['fileUpload'] = true;

                /**
                 *
                 * UNNÖTIG
                 *
                 */
                echo "UPDATE {$fileBlockArt} SET bPfad = '" . $target_dir . "', bName = '" . $target_file . "'  WHERE {$fileIdName} = " . intval($fileToId[$indexFiles]->id);
                if ($stmt = $mysqli->prepare(
                    "UPDATE {$fileBlockArt} SET bPfad = ?, bName = ?  WHERE {$fileIdName} = ?")) {

                    $stmt->bind_param("ssi", $target_dir,$target_file, intval($fileToId[$indexFiles]->id));

                    if(!$stmt->execute()){
                        $status['fileUpdate'] = false;
                        $status['everythingOk'] = false;
                    }
                    $stmt->close();

                }
            }else{
                $status['fileUpload'] = false;
                $status['everythingOk'] = false;
            }

        }else{
            $status['filePrepare'] = false;
            $status['everythingOk'] = false;
        }

    }
}

if(count($data) > 0){

    $ursprung = json_decode($data['ursprung']);
    $aenderungen = json_decode($data['aenderungen']);
    $pos = json_decode($data['pos']);
    $changes = json_decode($data['changes']);


    if($changes->pos) {

        for ($indexPos = 1, $anzahlPos = count($pos); $indexPos <= $anzahlPos; $indexPos++) {

            if ($stmt = $mysqli->prepare(
                "UPDATE psblock SET POSITION = ? WHERE Block_ID = ?")) {

                $stmt->bind_param("ii", $indexPos, intval($pos[$indexPos-1]));

                if(!$stmt->execute()){
                    $status['posExecute'] = false;
                    $status['everythingOk'] = false;
                }
                $stmt->close();

            }else{
                $status['posPrepare'] = false;
                $status['everythingOk'] = false;
            }
        }
    }

    if($changes->inhalt){
        for($indexInhalt = 0, $anzahlInhalt = count($ursprung); $indexInhalt < $anzahlInhalt; $indexInhalt++){
            //echo json_encode($data->aenderungen[$indexInhalt]->id);
            //echo $indexInhalt;
            foreach ($ursprung[$indexInhalt] as $key => $value) {
                if($aenderungen[$indexInhalt]->$key != $value) {
                    $tempBlockArt = $aenderungen[$indexInhalt]->blockArt;
                    $aendere = $key === "beschreibung" ? "text" : $key;
                    $neuerInhalt = $aenderungen[$indexInhalt]->$key;
                    $derzeitigeBlockId = intval($aenderungen[$indexInhalt]->id);
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

                        $stmt->close();

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

//echo json_encode($status);
