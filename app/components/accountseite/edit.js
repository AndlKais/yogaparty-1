"use strict";

app.component("edit", {
    templateUrl: "components/accountseite/edit.html",
    controller: "EditController",
    bindings: {}
});


app.controller("EditController", function ($log, $mdDialog, $http) {
    this.formInvalid = true;
    this.titel = "dsafsdfasfd";
    this.beschreibung = "dsafsaffd";
    this.backgroundC = "#ffffff";

    this.updateValidity = function () {
        $log.debug(" formular.$valid: " + this.formular.$valid + " file: " + this.file);
        if (this.showFileChooser) {
            this.formInvalid = !this.file || !this.formular.$valid;
        } else {
            this.formInvalid = this.formular.$invalid;
        }
    };

    this.checkFormular = function () {
        $log.debug(this.file);
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
                            "Ihr Eingaben wuden erfolgreich hochgeladen - schauen Sie sich die Änderungen gleich auf Ihrer Profilseite an." :
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

