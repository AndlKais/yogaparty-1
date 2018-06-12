"use strict";

app.component("aktuellText", {
    templateUrl: "components/profilseite/aktuell-text.html",
    controller: "AktuellTextController",
    bindings: {
        titel: "@",
        beschreibung: "@",
        vorname: "@",
        nachname: "@"
    }
});


app.controller("AktuellTextController", function ($http,$log) {

    let $ctrl = this;

    $ctrl.$onInit = function(){
        this.geklickt=true;
        this.addgeklickt=false;
        this.editgeklickt = false;
        $http.post("aktuell_bearbeiten_GET.php",{}).then(function (data) {
            $log.debug(data.data);
            $ctrl.getRequest = data.data;
        });


    }



    $ctrl.edit = function () {
        this.editgeklickt = true;
    }

    $ctrl.update = function(){
        let that = this;
        that.fd = new FormData();
        that.fd.append("titel", $ctrl.getRequest.titel);
        that.fd.append("beschreibung", $ctrl.getRequest.beschreibung);
        that.fd.append("datum", $ctrl.getRequest.datum);
        $http({
            method: 'post',
            url: 'aktuell_bearbeiten_UPDATE.php',
            data: that.fd,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).then(function (response) {
            console.log("aktuell_bearbeiten")
            $log.debug(response);
        });
    }

    $ctrl.test = function () {
        this.addgeklickt = true;
    }

    $ctrl.add = function () {
        let that = this;
        that.fd = new FormData();
        that.fd.append("titel", $ctrl.titel);
        that.fd.append("beschreibung", $ctrl.beschreibung);
        //that.fd.append("datum", that.datum);
        $http({
            method: 'post',
            url: 'aktuell_bearbeiten_INSERT.php',
            data: that.fd,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).then(response => {
            $log.debug("response");
            $log.debug(response.data);
        });
        //this.addgeklickt = true;
    }

    $ctrl.delete = function () {
        let that = this;
        $http.post("aktuell_bearbeiten_DELETE.php",{
                "titel": $ctrl.titel,
                "beschreibung": $ctrl.beschreibung
            }
        ).then(function (result) {
            $log.debug(result);
        });
    }
});

