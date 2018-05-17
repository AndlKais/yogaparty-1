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
            $backgroundColor = $row['bgcolor'] ? $row['bgcolor'] : "#fffaef";
            $color = $row['color'] ? $row['color'] : "#000000";
            $query2 = "";

            if ($row['blockart'] === "BBT") {
                $query2 = "SELECT * FROM B_Bild_Text where BBText_ID = " . $row['Block_ID'];
                $result2 = mysqli_query($mysqli, $query2);

                if (mysqli_num_rows($result) > 0) {
                    $row2 = mysqli_fetch_array($result2);
                    //echo json_encode($row2);
                    /*array_push($output, array(
                        "text" => $row2['text'],
                        "bild" => $row2['bPfad'].$row2['bName'],
                        "blockart" => "bild-text-right"));*/
                    if($row2['bildR']) {
                        array_push($output, "<bild-text-right style='color:" . $color . ";background-color:" . $backgroundColor . ";' loesche-block='\$ctrl.loescheBlock(id)' id='" . $row2['BBText_ID'] . "' titel='" . $row2['titel'] . "' text='" . $row2['text'] . "' bild='" . $row2['bPfad'] . $row2['bName'] . "'></bild-text-right>");
                    }else{
                        array_push($output, "<bild-text-left style='color:" . $color . ";background-color:" . $backgroundColor . ";' loesche-block='\$ctrl.loescheBlock(id)' id='" . $row2['BBText_ID'] . "' titel='" . $row2['titel'] . "' text='" . $row2['text'] . "' bild='" . $row2['bPfad'] . $row2['bName'] . "'></bild-text-left>");
                    }
                }
            }elseif ($row['blockart'] === "BBCT"){
                $query2 = "SELECT * FROM B_Bild_C_Text where BBCText_ID = " . $row['Block_ID'];
                $result2 = mysqli_query($mysqli, $query2);

                if (mysqli_num_rows($result) > 0) {
                    $row2 = mysqli_fetch_array($result2);
                    array_push($output, "<bild-center-text style='color:" . $color . ";background-color:" . $backgroundColor . ";' loesche-block='\$ctrl.loescheBlock(id)' id='" . $row2['BBCText_ID'] . "' titel='" . $row2['titel'] . "' text='". $row2['text'] . "' bild='" . $row2['bPfad'] . $row2['bName'] . "'></bild-center-text>");
                }
            }else{
                $query2 = "SELECT * FROM B_Titel_C_Text where BTCText_ID = " . $row['Block_ID'];
                $result2 = mysqli_query($mysqli, $query2);

                if (mysqli_num_rows($result) > 0) {
                    $row2 = mysqli_fetch_array($result2);
                    array_push($output, "<titel-center-text style='color:" . $color . ";background-color:" . $backgroundColor . ";' loesche-block='\$ctrl.loescheBlock(id)' id='" . $row2['BTCText_ID'] . "' titel='" . $row2['titel'] . "' text='". $row2['text'] . "'></titel-center-text>");
                }
            }
        }

           echo json_encode($output);
        }
    }