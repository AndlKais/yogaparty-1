"use strict";

app.component("bildCenterText", {
    templateUrl: "components/bloecke/bildcentertext.html",
    controller: "bildcentertextController",
    bindings: {
        titel: "@",
        text: "@",
        bild: "@?",
        id: "@?",
        loescheBlock: "&?"
    }

});

app.controller("bildcentertextController", function () {
    this.removeBlock = function () {
        this.loescheBlock({"id": this.id});
    };
});