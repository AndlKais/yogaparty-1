"use strict";

app.component("bildTextLeft^1w", {
    templateUrl: "components/bildtextleft.html",
    controller: "bildtextleftController",
    bindings: {
        titel: "@",
        text: "@",
        bild: "@"
    }
});

app.controller("bildtextleftController", function () {

});