"use strict";

app.component("infoBearbeiten", {
    templateUrl: "components/infoseite/info-bearbeiten.html",
    controller: "InfoBearbeitenController",
    bindings: {
        vname: "@",
        nname: "@",
        email: "@",
        telefonnummer: "@?",
        plz: "@",
        ort: "@",
        land: "@",
        passwort: "@",
        passwortWH: "@",
        adresse: "@",
        adresszusatz: "@",
        kurzbeschreibung: "@"
    }
});


app.controller("InfoBearbeitenController", function () {



});
