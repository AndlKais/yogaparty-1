<?php

require_once "database_connection.php";

$titel = htmlspecialchars($_POST['titel']);
$beschreibung = htmlspecialchars($_POST['beschreibung']);
$ausgewaehlt = htmlspecialchars($_POST['ausgewaehlt']);
$backgroundC = htmlspecialchars($_POST['backgroundC']);
$response['everythingOk'] = true;

if(strlen($backgroundC) < 4 || strlen($backgroundC) > 30){
    $backgroundC = "#ffffff";
}

/*
 * ############################## SEITENID ERSETZEN ##############################
 * ############################## SEITENID ERSETZEN ##############################
 * ############################## SEITENID ERSETZEN ##############################
 */
$seitenID = 1;

if($getPos = $mysqli->prepare("select max(position) from psblock where FK_Seiten_ID=?")) {
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

// Überprüfe, ob sie Datei zu groß ist
    if ($_FILES["file"]["size"] > 5000000 || $_FILES["file"]["size"] == 0) {
        $response['fileSize'] = false;
        $response['everythingOk'] = false;
    }
}

if($response['everythingOk'] && ($ausgewaehlt == "BTCT" || $ausgewaehlt == "BBCT" || $ausgewaehlt == "BBTR" || $ausgewaehlt == "BBTL")) {
    if ($ausgewaehlt == "BBTR" || $ausgewaehlt == "BBTL") {
        $query = "INSERT INTO psblock (`blockart`, `position`, `FK_Seiten_ID`) VALUES ('" . substr($ausgewaehlt, 0, -1) . "', $position, $seitenID)";
    } else {
        $query = "INSERT INTO psblock (`blockart`, `position`, `FK_Seiten_ID`) VALUES ('$ausgewaehlt', $position, $seitenID)";
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
        $target_file = "Block_pic_" . $psBlockID . "." . $imageFileType;

        // if everything is ok, try to upload file
        if($response['everythingOk']){
            if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_dir . $target_file)) {
                $response['fileUpload'] = true;
                if($ausgewaehlt == "BBCT"){
                    $query = "INSERT INTO B_Bild_C_Text (`BBCText_ID`, `bName`, `bPfad`, `titel`, `text`) VALUES ($psBlockID, '$target_file', '$target_dir', '$titel', '$beschreibung')";
                    $insertSpecificBlock = mysqli_query($mysqli, $query);
                }elseif ($ausgewaehlt == "BBTR"){
                    $query = "INSERT INTO B_Bild_Text (`BBText_ID`, `bildR`, `bName`, `bPfad`, `titel`, `text`) VALUES ($psBlockID, true, '$target_file', '$target_dir', '$titel', '$beschreibung')";
                    $insertSpecificBlock = mysqli_query($mysqli, $query);
                }elseif ($ausgewaehlt == "BBTL"){
                    $query = "INSERT INTO B_Bild_Text (`BBText_ID`, `bildR`, `bName`, `bPfad`, `titel`, `text`) VALUES ($psBlockID, false, '$target_file', '$target_dir', '$titel', '$beschreibung')";
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

/*
if($result2 = $mysqli->prepare("select user_id from user where nickname=? and email=?")) {
    $result2->bind_param('ss', $nickname, $email);
    $result2->execute();
    $result2->store_result();
    $result2->bind_result($userID);
    $result2->fetch();
}


$target_dir = "../uploads/";
$target_file = $target_dir . basename($_FILES["file"]["name"]);
$uploadOk = 1;

//echo json_encode($_FILES['file']);

//$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

// Check if image file is a actual image or fake image
$check = getimagesize($_FILES["file"]["tmp_name"]);
if($check !== false) {
    $response['isImage'] = true;
    $uploadOk = 1;
} else {
    //echo "File is not an image.";
    $response['isImage'] = false;
    $uploadOk = 0;
}

// Check if file already exists
if (file_exists($target_file)) {
    //echo "Sorry, file already exists.";

    $uploadOk = 0;
}

// Check file size
if ($_FILES["file"]["size"] > 5000000 || $_FILES["file"]["size"] == 0) {
    $uploadOk = 0;
}

/*
// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
    && $imageFileType != "gif" ) {
    //echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
}
*/
/*
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
// echo $target_file . " " . $_FILES["file"]["tmp_name"];
} else {
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
        echo "The file ". basename( $_FILES["file"]["name"]). " has been uploaded.";
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}