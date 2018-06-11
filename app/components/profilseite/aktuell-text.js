"use strict";

app.component("aktuellText", {
    templateUrl: "components/profilseite/aktuell-text.html",
    controller: "AktuellTextController",
    bindings: {
        /*$vname: "@",
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
        $kurzbeschreibung: "@"*/
    }
});


app.controller("AktuellTextController", function () {

    let $ctrl = this;

    $ctrl.$onInit = function(){
        this.geklickt=true;
        this.addgeklickt=false;
    }

    $ctrl.edit = function () {
        this.geklickt = false;
    }

    $ctrl.add = function () {
        this.addgeklickt = true;
    }
});

