"use strict";

app.component("bildTextRight", {
    templateUrl: "components/bloecke/bildtextright.html",
    controller: "bildtextrightController",
    bindings: {
        titel: "@",
        text: "@",
        bild: "@?",
        id: "@?",
        loescheBlock: "&?"
    }

});

app.controller("bildtextrightController", function () {
    this.removeBlock = function () {
        this.loescheBlock({"id": this.id});
    };

    this.istLoeschenbereich = true;
});