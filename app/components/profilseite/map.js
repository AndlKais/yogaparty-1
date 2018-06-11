"use strict";

app.component("map", {
    templateUrl: "components/profilseite/map.html",
    controller: "mapController"

});

app.controller("mapController", function ($http, $log) {
    let $ctrl = this;

    this.$onInit = function(){
        $http.post("profil_GET_info.php", {}).then(function (data) {
                console.log("###################################################");
                $log.debug(data.data);
                $ctrl.getRequest = data.data;
                document.getElementById("gmaps").src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAtovX7_XKaGM-WJTSfdZiNE-621itmiEg&q=" + $ctrl.getRequest.ort + ", " + $ctrl.getRequest.adresse + ", " + $ctrl.getRequest.adresszusatz;
                console.log("###################################################");
            }
        );
    }

});