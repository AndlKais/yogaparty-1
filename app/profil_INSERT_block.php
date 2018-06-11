<?php

require_once "database_connection.php";

$titel = mysqli_real_escape_string($mysqli, $_POST['titel']);
$beschreibung = mysqli_real_escape_string($mysqli, $_POST['beschreibung']);
$ausgewaehlt = mysqli_real_escape_string($mysqli, $_POST['ausgewaehlt']);
$backgroundC = mysqli_real_escape_string($mysqli, $_POST['backgroundC']);
$color = mysqli_real_escape_string($mysqli, $_POST['color']);
$response['everythingOk'] = true;

/*
$beschreibung = str_replace("\"", "\\\"", $beschreibung);
$beschreibung = str_replace("'", "\\'", $beschreibung);

$titel = str_replace("\"", "\\\"", $titel);
$titel = str_replace("'", "\\'", $titel);
*/
if(strlen($backgroundC) < 4 || strlen($backgroundC) > 30 || strpos($backgroundC, "\"") > -1 || strpos($backgroundC, "'") > -1){
    $backgroundC = "#fffaef";
}

if(strlen($color) < 4 || strlen($color) > 30 || strpos($color, "\"") > -1 || strpos($color, "'") > -1){
    $color = "#000000";
}

/*
 * ############################## SEITENID ERSETZEN ##############################
 * ############################## SEITENID ERSETZEN ##############################
 * ############################## SEITENID ERSETZEN ##############################
 */
$seitenID = 1;

if($getPos = $mysqli->prepare("select max(position) from PSBlock where FK_Seiten_ID=?")) {
    $getPos->bind_param('i', $seitenID);
    $getPos->execute();
    $getPos->store_result();
    $getPos->bind_result($position);
    $getPos->fetch();
}

$position = $position ? $position+1 : 1;
$uploadOk = 1;

if($ausgewaehlt == "BBCT" || $ausgewaehlt == "BBTR" || $ausgewaehlt == "BBTL"){

// Check if image file is a actual image or fake image
    $check = getimagesize($_FILES["file"]["tmp_name"]);
    if($check == false) {
        //echo "File is not an image.";
        $response['isImage'] = false;
        $response['everythingOk'] = false;
    }

// Überprüfe, ob die Datei zu groß ist
    if ($_FILES["file"]["size"] > 5000000 || $_FILES["file"]["size"] == 0) {
        $response['fileSize'] = false;
        $response['everythingOk'] = false;
    }
}

if($response['everythingOk'] && ($ausgewaehlt == "BTCT" || $ausgewaehlt == "BBCT" || $ausgewaehlt == "BBTR" || $ausgewaehlt == "BBTL")) {
    if ($ausgewaehlt == "BBTR" || $ausgewaehlt == "BBTL") {
        $query = "INSERT INTO PSBlock (`blockart`, `position`, `FK_Seiten_ID`, `bgcolor`, `color`) VALUES ('" . substr($ausgewaehlt, 0, -1) . "', $position, $seitenID, '$backgroundC', '$color')";
    } else {
        $query = "INSERT INTO PSBlock (`blockart`, `position`, `FK_Seiten_ID`, `bgcolor`, `color`) VALUES ('$ausgewaehlt', $position, $seitenID, '$backgroundC', '$color')";
    }

    $insertPDBlock = mysqli_query($mysqli, $query);
    $psBlockID = mysqli_insert_id($mysqli);

    if($ausgewaehlt == "BTCT"){
        $query = "INSERT INTO B_Titel_C_Text (`BTCText_ID`, `titel`, `text`) VALUES ($psBlockID, '$titel', '$beschreibung')";
        $insertSpecificBlock = mysqli_query($mysqli, $query);

        /*
         * FÜR Blöcke mit Bildern soll der Upload stattfinden
         */

    }elseif ($ausgewaehlt == "BBCT" || $ausgewaehlt == "BBTR" || $ausgewaehlt == "BBTL"){
        $target_dir = "../uploads/";
        $imageFileType = strtolower(pathinfo($target_dir . basename($_FILES["file"]["name"]),PATHINFO_EXTENSION));
        $target_file = "-Block_pic_" . $psBlockID . "." . $imageFileType;

        // if everything is ok, try to upload file
        if($response['everythingOk']){
            if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_dir . 1 . $target_file)) {
                $response['fileUpload'] = true;
                if($ausgewaehlt == "BBCT"){
                    $query = "INSERT INTO B_Bild_C_Text (`BBCText_ID`, `bName`, `bPfad`, `bZahl`, `titel`, `text`) VALUES ($psBlockID, '$target_file', '$target_dir', 1, '$titel', '$beschreibung')";
                    $insertSpecificBlock = mysqli_query($mysqli, $query);
                }elseif ($ausgewaehlt == "BBTR"){
                    $query = "INSERT INTO B_Bild_Text (`BBText_ID`, `bildR`, `bName`, `bPfad`, `bZahl`, `titel`, `text`) VALUES ($psBlockID, true, '$target_file', '$target_dir', 1, '$titel', '$beschreibung')";
                    $insertSpecificBlock = mysqli_query($mysqli, $query);
                }elseif ($ausgewaehlt == "BBTL"){
                    $query = "INSERT INTO B_Bild_Text (`BBText_ID`, `bildR`, `bName`, `bPfad`, `bZahl`, `titel`, `text`) VALUES ($psBlockID, false, '$target_file', '$target_dir', 1, '$titel', '$beschreibung')";
                    $insertSpecificBlock = mysqli_query($mysqli, $query);
                }
            } else {
                $response['fileUpload'] = false;
                $response['everythingOk'] = false;
            }
        }
    }
}else{
    $response['ausgewaehlt'] = false;
    $response['everythingOk'] = false;
}

echo json_encode($response);
