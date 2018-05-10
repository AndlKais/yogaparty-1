"use strict";

app.component("bildTextRight", {
    templateUrl: "components/bloecke/bildtextright.html",
    controller: "bildtextrightController",
    bindings: {
        titel: "@",
        text: "@",
        bild: "@?"
    }

});

app.controller("bildtextrightController", function () {

});