"use strict";

app.component("blockkomponente", {
    templateUrl: "components/accountseite/blockkomponente.html",
    controller: "blockKomponenteController",
    bindings: {}
});


app.controller("blockKomponenteController", function ($log, $mdDialog, $http) {
    this.formInvalid = true;

    this.backgroundC = "#fffaef";
    this.color = "#000000";

    this.$onInit = function () {
        let that = this;
        $http.get("profil_GET_lastColorInserted.php")
            .then(function (response) {
                $log.debug("RESPONSE - profil_GET_lastColorInserted.php");
                $log.debug(response);

                that.backgroundC = response.data.hasMoreThanZeroBlocks && response.data.resBColor != null ? response.data.resBColor : "#fffaef";
                that.color = response.data.hasMoreThanZeroBlocks && response.data.resColor != null ? response.data.resColor : "#000000";
            });
    };

    this.updateValidity = function () {
        if (this.showFileChooser) {
            this.formInvalid = !this.file || !this.formular.$valid;
        } else {
            this.formInvalid = this.formular.$invalid;
        }

        this.backgroundC = this.backgroundC ? this.backgroundC : "#fffaef";
        this.color = this.color ? this.color : "#000000";
        let tempTitel = this.titel ? this.titel : "Titel";
        let tempBeschreibung = this.beschreibung ? this.beschreibung : "Beschreibung";

        if(this.ausgewaehlt === "BTCT"){

            $log.debug(document.getElementsByClassName("preview-image"));
            if(document.getElementsByClassName("preview-image")[0]) {
                document.getElementsByClassName("preview-image")[0].src = "resources/pictures/no_preview.jpg";
                this.file = null;
            }
            this.tempBlock = "<titel-center-text style='color:" + this.color + ";background-color:" + this.backgroundC + ";' titel='" + tempTitel + "' text='" + tempBeschreibung + "'></titel-center-text>";
        }else if(this.ausgewaehlt === "BBCT"){
            if(this.file) {
                let reader = new FileReader();
                reader.readAsDataURL(this.file[0]);
                reader.addEventListener("load", function () {
                    if(document.getElementsByClassName("preview-image")) {
                        document.getElementsByClassName("preview-image")[0].src = reader.result;
                    }
                });
            }
            this.tempBlock = "<bild-center-text style='color:" + this.color + ";background-color:" + this.backgroundC + ";' titel='" + tempTitel + "' text='" + tempBeschreibung + "' bild=''></bild-center-text>";
        }else if(this.ausgewaehlt === "BBTR"){
            if(this.file) {
                let reader = new FileReader();
                reader.readAsDataURL(this.file[0]);
                //$log.debug(reader);
                reader.addEventListener("load", function () {
                    //$log.debug(reader);
                    if(document.getElementsByClassName("preview-image")) {
                        document.getElementsByClassName("preview-image")[0].src = reader.result;
                    }
                });
            }
            this.tempBlock = "<bild-text-right style='color:" + this.color + ";background-color:" + this.backgroundC + ";' titel='" + tempTitel + "' text='" + tempBeschreibung + "' bild=''></bild-text-right>";
        }else if(this.ausgewaehlt === "BBTL"){
            if(this.file) {
                let reader = new FileReader();
                reader.readAsDataURL(this.file[0]);
                reader.addEventListener("load", function () {
                    if(document.getElementsByClassName("preview-image")) {
                        document.getElementsByClassName("preview-image")[0].src = reader.result;
                    }
                });
            }
            this.tempBlock = "<bild-text-left style='color:" + this.color + ";background-color:" + this.backgroundC + ";' titel='" + tempTitel + "' text='" + tempBeschreibung + "' bild=''></bild-text-left>";
        }

    };

    this.checkFormular = function () {
        if(this.formInvalid && this.showFileChooser){
            $mdDialog.show(
                $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .textContent('Füllen Sie alle Felder aus - Vergessen Sie nicht auf das Bild')
                    .ariaLabel('OffscreenAlert')
                    .ok('Okay')
                    .openFrom({
                        top: -50,
                        width: 30,
                        height: 80
                    })
                    .closeTo({
                        left: 1500
                    })
            );
        }else if(this.formInvalid){
            $mdDialog.show(
                $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .textContent('Füllen Sie alle Felder aus')
                    .ariaLabel('OffscreenAlert')
                    .ok('Okay')
                    .openFrom({
                        top: -50,
                        width: 30,
                        height: 80
                    })
                    .closeTo({
                        left: 1500
                    })
            );
        }else{
            let that = this;
            this.backgroundC = this.backgroundC ? this.backgroundC : "#fffaef";
            this.color = this.color ? this.color : "#000000";
            that.fd = new FormData();
            if(that.file){
                that.fd.append("file", that.file[0]);
            }else{
                that.fd.append("file", null);
            }
            that.fd.append("titel", that.titel);
            that.fd.append("beschreibung", that.beschreibung);
            that.fd.append("ausgewaehlt", that.ausgewaehlt);
            that.fd.append("backgroundC", that.backgroundC);
            that.fd.append("color", that.color);
            $http({
                method: 'post',
                url: 'profil_INSERT_block.php',
                data: that.fd,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).then(response => {
                $log.debug("response");
                $log.debug(response.data);
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Status')
                        .textContent(response.data.everythingOk ?
                            "Ihr Eingaben wurden erfolgreich hochgeladen - schauen Sie sich die Änderungen gleich auf Ihrer Profilseite an." :
                            "Es ist ein Fehler aufgetreten - überprüfen Sie, ob Ihr die Große von 5 MB nicht überschreitet und aktualisieren Sie die Seite."
                        )
                        .ariaLabel('OffscreenAlert')
                        .ok('Okay')
                        .openFrom({
                            top: -50,
                            width: 30,
                            height: 80
                        })
                        .closeTo({
                            left: 1500
                        })
                ).then(result => {
                    window.location.href = "accountseite.php";
                });
            });
        }
    };

    this.getFile = function (file) {
        this.file = file;
        this.updateValidity();
    };

    this.getBlock = function (ausgewaehlt) {
        this.ausgewaehlt = ausgewaehlt;
        this.showFileChooser = this.ausgewaehlt !== "BTCT";
        this.updateValidity();
    };

});

