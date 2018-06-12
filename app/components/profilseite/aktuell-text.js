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
            $log.debug('onInit response');
            $log.debug(data.data);
            $ctrl.newseintraege = data.data;
            $ctrl.temp = data.data;
            for(let i = 0; i < $ctrl.newseintraege.length; i++){
                $ctrl.newseintraege[i].id = i;
                $ctrl.temp[i].id = i;
            }


        });


    }



    $ctrl.edit = function () {
        this.editgeklickt = true;
    }

    $ctrl.update = function(id){
        let that = this;
        that.fd = new FormData();
        that.fd.append("titel", $ctrl.temp[id].titel);
        that.fd.append("beschreibung", $ctrl.temp[id].beschreibung);
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
        console.log("-----update aktuell--------");
        console.log(that.fd.titel);
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
            that.getRequest.titel = response.data;
        });
        this.geklickt = false;
    }

    $ctrl.delete = function (id) {
        let that = this;
        that.fd = new FormData();
        that.fd.append("titel", $ctrl.temp[id].titel);
        that.fd.append("beschreibung", $ctrl.temp[id].beschreibung);
        $http({
            method: 'post',
            url: 'aktuell_bearbeiten_DELETE.php',
            data: that.fd,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
            }

        ).then(function (result) {
            $log.debug(result);

        });
    }
});

