"use strict";

app.component("landing", {
    templateUrl: "components/landing.html",
    controller: "landingController"

});

app.controller("landingController", function () {
    let $ctrl = this;

    $ctrl.weiter = function () {
        if ($ctrl.passwd === "test123") {
            window.location.href = "";
        } else {
            window.location.reload(true);
        }
    }
});


