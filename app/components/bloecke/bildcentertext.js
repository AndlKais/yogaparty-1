"use strict";

app.component("bildCenterText", {
    templateUrl: "components/bloecke/bildcentertext.html",
    controller: "bildcentertextController",
    bindings: {
        titel: "@",
        text: "@",
        bild: "@?"
    }

});

app.controller("bildcentertextController", function () {

});