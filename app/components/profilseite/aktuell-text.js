"use strict";

app.component("aktuellText", {
    templateUrl: "components/profilseite/aktuell-text.html",
    controller: "AktuellTextController",
    bindings: {
        titel: "@",
        bezeichnung: "@",
        vorname: "@",
        nachname: "@"
    }
});


app.controller("AktuellTextController", function ($http,$log) {

    let $ctrl = this;

    $ctrl.$onInit = function(){
        this.geklickt=true;
        this.addgeklickt=false;
        $http.post("aktuell_bearbeiten_GET.php",{}).then(function (data) {
            $log.debug(data.data);
            $ctrl.getRequest = data.data;
        });


    }



    $ctrl.edit = function () {
        this.geklickt = false;
    }

    $ctrl.save = function(){
        let that = this;
        that.fd = new FormData();
        that.fd.append("titel", $ctrl.getRequest.titel);
        that.fd.append("bezeichnung", $ctrl.getRequest.bezeichnung);
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

    $ctrl.add = function () {
        this.addgeklickt = true;
    }
});

