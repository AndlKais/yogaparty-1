"use strict";

app.component("bildTextRight", {
    templateUrl: "components/bildtextright.html",
    controller: "bildtextrightController",
    bindings: {
        text: "@",
        bild: "@"
    }

});

app.controller("bildtextrightController", function () {

});