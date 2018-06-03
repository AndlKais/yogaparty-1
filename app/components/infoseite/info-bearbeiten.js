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


app.controller("InfoBearbeitenController", function ($http, $log, $mdToast) {

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

    this.$onInit = function () {
        $http.post("profil_bearbeiten_GET.php", {}).then(function (data) {
            $log.debug(data.data);
            $ctrl.getRequest = data.data;
            //console.log($ctrl.getRequest);
        });

        angular.element(document.getElementsByClassName("form-control"))[0].addEventListener("change", function (e) {
            if (e.target.files.length) {
                if (e.target.files[0].type.match("image/.+")) {
                    $ctrl.file = e.target.files;
                    console.log($ctrl.file);
                    let reader = new FileReader();
                    reader.readAsDataURL($ctrl.file[0]);
                    //$log.debug(reader);
                    reader.addEventListener("load", function () {
                        //$log.debug(reader);
                        if(document.getElementsByClassName("pb-image")) {
                            document.getElementsByClassName("pb-image")[0].src = reader.result;
                        }
                        if(document.getElementsByClassName("card-bkimg")) {
                            document.getElementsByClassName("card-bkimg")[0].src = reader.result;
                        }
                    });
                }
            }


        });

        $ctrl.changepicture = function () {
            angular.element(document.getElementsByClassName("form-control"))[0].click();

        }
    }



});
