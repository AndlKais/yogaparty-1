"use strict";

app.component("bildTextLeft", {
    templateUrl: "components/bloecke/bildtextleft.html",
    controller: "bildtextleftController",
    bindings: {
        titel: "@",
        text: "@",
        bild: "@"
    }
});

app.controller("bildtextleftController", function () {

});