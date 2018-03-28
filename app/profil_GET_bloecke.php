<?php

require_once "database_connection.php";

$data = json_decode(file_get_contents("php://input"));

if(count($data) > 0){

    $profil = intval(htmlspecialchars($data->profil));
    $query = "SELECT * FROM PSBlock WHERE FK_Seiten_ID = " . $profil . " order by position";
    $result = mysqli_query($mysqli, $query);

    if(mysqli_num_rows($result) > 0){
        $output = array();

        while($row = mysqli_fetch_array($result)) {
            $query2 = "";

            if ($row['blockart'] === "BBT") {
                $query2 = "SELECT * FROM B_Bild_Text where BBText_ID = " . $row['Block_ID'];
                $result2 = mysqli_query($mysqli, $query2);

                if (mysqli_num_rows($result) > 0) {
                    $row2 = mysqli_fetch_array($result2);
                    //echo json_encode($row2);
                    array_push($output, array(
                        "text" => $row2['text'],
                        "bild" => $row2['bPfad'].$row2['bName'],
                        "blockart" => "bild-text-right"));
                }
            }
        }

           echo json_encode($output);
        }
    }