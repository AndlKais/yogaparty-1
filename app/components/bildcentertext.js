"use strict";

app.component("bildCenterText", {
    templateUrl: "components/bildcentertext.html",
    controller: "bildcentertextController",
    bindings: {
        titel: "@",
        text: "@",
        bild: "@"
    }

});

app.controller("bildcentertextController", function () {

});