"use strict";

app.component("userinfos", {
    templateUrl: "components/profilseite/userinfos.html",
    controller: "userinfosController"

});

app.controller("userinfosController", function ($http, $log) {
    let $ctrl = this;

    this.$onInit = function () {
        $http.post("profil_GET_info.php", {}).then(function (data) {
            $log.debug(data.data);
            $ctrl.getRequest = data.data;
            //console.log($ctrl.getRequest);
        })}





});



