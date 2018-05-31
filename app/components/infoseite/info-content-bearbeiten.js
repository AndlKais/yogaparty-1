"use strict";

app.component("infoContentBearbeiten", {
    templateUrl: "components/infoseite/info-content-bearbeiten.html",
    controller: "InfoContentBearbeitenController",
    bindings: {
        vname: "@",
        nname: "@",
        email: "@",
        telefonnummer: "@",
        passwort: "@",
        passwortWH: "@",
        adresse: "@",
        adresszusatz: "@",
        kurzbeschreibung: "@"
    }
});


app.controller("InfoContentBearbeitenController", function ($mdToast) {

let $ctrl = this;

    if(!($ctrl.passwort === $ctrl.passwortWH)){
        $mdToast.show(
            $mdToast.simple()
                .textContent('Passwort stimmt nicht überein')
                .position('bottom')
                .hideDelay(3000)
        );
    };



});
