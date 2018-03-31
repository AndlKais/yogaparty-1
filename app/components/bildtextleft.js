"use strict";

app.component("bildTextLeft", {
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