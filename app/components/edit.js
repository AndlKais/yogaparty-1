"use strict";

app.component("edit", {
    templateUrl: "components/edit.html",
    controller: "EditController",
    bindings: {}
});


app.controller("EditController", function ($log, $mdDialog) {
    this.formInvalid = true;

    this.updateValidity = function () {
        $log.debug(" formular.$valid: " + this.formular.$valid + " file: " + this.file);
        if (this.showFileChooser) {
            this.formInvalid = !this.file || !this.formular.$valid;
        } else {
            this.formInvalid = this.formular.$invalid;
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
        }
    };

    this.getFile = function (file) {
        this.file = file;
        this.updateValidity();
    };

    this.getBlock = function (ausgewaehlt) {
        this.ausgewaehlt = ausgewaehlt;
        this.showFileChooser = this.ausgewaehlt !== "BTCT";
        this.file = null;
        this.updateValidity();
    };
});

