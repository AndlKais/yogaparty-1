"use strict";

app.component("aktuellText", {
    templateUrl: "components/profilseite/aktuell-text.html",
    controller: "AktuellTextController",
    bindings: {
        $vname: "@",
        $nname: "@",
        $email: "@",
        $telefonnummer: "@?",
        $passwort: "@",
        $passwortWH: "@",
        $adresse: "@",
        $adresszusatz: "@",
        $plz: "@",
        $ort: "@",
        $land: "@",
        $kurzbeschreibung: "@"
    }
});


app.controller("AktuellTextController", function () {


});
