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
        kurznachname: "@",
        profilbildpfad: "@",
        profilbildname: "@"
    }
});


app.controller("InfoBearbeitenController", function ($http, $log, $mdToast) {

    let $ctrl = this;
    $ctrl.file;
    $ctrl.ueberpruefen = function () {
        if ($ctrl.getRequest.passwort !== $ctrl.getRequest.passwortWH) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Passwort stimmt nicht überein')
                    .position('bottom')
                    .hideDelay(3000)
            );
        }else {
            /*
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
                    "land": $ctrl.getRequest.land,
                    "profilbildname": $ctrl.getRequest.profilbildname,
                    "profilbildpfad": $ctrl.getRequest.profilbildpfad
                    //"kurznachname": $ctrl.kurznachname
                }
            ).then(function (response) {
                    $log.debug(response);
                    window.location.reload(true);
                }
            );
            */
            let that = this;
            that.fd = new FormData();
            if($ctrl.file){
                that.fd.append("file", $ctrl.file[0]);
            }else{
                that.fd.append("file", null);
            }
            that.fd.append("vorname", $ctrl.getRequest.vorname);
            that.fd.append("nachname", $ctrl.getRequest.nachname);
            that.fd.append("email", $ctrl.getRequest.email);
            that.fd.append("telefonnummer", $ctrl.getRequest.telefonnummer);
            that.fd.append("passwort", $ctrl.getRequest.passwort);
            that.fd.append("passwortWH", $ctrl.getRequest.passwortWH);
            that.fd.append("adresse", $ctrl.getRequest.adresse);
            that.fd.append("adresszusatz", $ctrl.getRequest.adresszusatz);
            that.fd.append("plz", $ctrl.getRequest.plz);
            that.fd.append("ort", $ctrl.getRequest.ort);
            that.fd.append("land", $ctrl.getRequest.land);
            that.fd.append("profilbildname", $ctrl.getRequest.profilbildname);
            that.fd.append("profilbildpfad", $ctrl.getRequest.profilbildpfad);
            //console.log("typisch andy");
            //console.log(that.fd);
            $http({
                method: 'post',
                url: 'profil_bearbeiten_UPDATE.php',
                data: that.fd,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).then(function (response) {
                    $log.debug(response);
                    window.location.reload(true);
                }
            );
        }
    }
    /*
    this.$onInit = function(){
        $http.post("profil_bearbeiten_GET.php", {
        }).then(function (data) {
                $log.debug(data.data);
                $ctrl.getRequest = data.data;
                console.log($ctrl.getRequest);
            }
        );
    }
    */

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
                    //$ctrl.file = reader.readAsDataURL($ctrl.file[0]);
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
