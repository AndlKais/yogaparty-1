"use strict";

app.component("infoContentBearbeiten", {
    templateUrl: "components/infoseite/info-content-bearbeiten.html",
    controller: "InfoContentBearbeitenController",
    bindings:{

    }
});


app.controller("InfoContentBearbeitenController", function ($mdToast, $http, $log) {

let $ctrl = this;
$ctrl.ueberpruefen = function () {
    if ($ctrl.getRequest.passwort !== $ctrl.getRequest.passwortWH) {
        $mdToast.show(
            $mdToast.simple()
                .textContent('Passwort stimmt nicht überein')
                .position('bottom')
                .hideDelay(3000)
        );
    }else {
        let that = this;
        $http.post("profil_bearbeiten_UPDATE.php", {
                "vorname": $ctrl.getRequest.vorname,
                "nachname": $ctrl.getRequest.nachname,
                "email": $ctrl.getRequest.email,
                "telefonnummer": $ctrl.getRequest.telefonnummer,
                "passwort": $ctrl.getRequest.passwort,
                "passwortWH": $ctrl.getRequest.passwortWH,
                "adresse": $ctrl.getRequest.adresse,
                "adresszusatz": $ctrl.getRequest.adresszusatz,
                "plz": $ctrl.getRequest.plz,
                "ort": $ctrl.getRequest.ort,
                "land": $ctrl.getRequest.land
                //"kurzbeschreibung": $ctrl.kurzbeschreibung
            }
        ).then(function (response) {
                $log.debug(response);
                window.location.reload(true);
            }
        );
    }
    $ctrl.fd.append("neuesBild", that.beschreibung);
}
    this.$onInit = function(){
        $http.post("profil_bearbeiten_GET.php", {
        }).then(function (data) {
                $log.debug(data.data);
                $ctrl.getRequest = data.data;
            }
        );
    }
    
    $ctrl.edit = function () {

    }




});
