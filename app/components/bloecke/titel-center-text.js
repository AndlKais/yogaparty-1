"use strict";

app.component("titelCenterText", {
    templateUrl: "components/bloecke/titel-center-text.html",
    controller: "titelCenterTextController",
    bindings: {
        titel: "@",
        text: "@"
    }

});

app.controller("titelCenterTextController", function () {

});