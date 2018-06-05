"use strict";

app.component("map", {
    templateUrl: "components/profilseite/map.html",
    controller: "mapController"

});

app.controller("mapController", function ($http, $log) {
    let $ctrl = this;


    this.$onInit = function () {
        $http.post("profil_bearbeiten_GET.php", {}).then(function (data) {
            $log.debug(data.data);
            $ctrl.getRequest = data.data;
            //console.log($ctrl.getRequest);

        })
    }

});