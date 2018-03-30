"use strict";

app.component("bildtextleft", {
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