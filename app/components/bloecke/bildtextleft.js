"use strict";

app.component("bildTextLeft", {
    templateUrl: "components/bloecke/bildtextleft.html",
    controller: "bildtextleftController",
    bindings: {
        titel: "@",
        text: "@",
        bild: "@?",
        id: "@?",
        loescheBlock: "&?"
    }
});

app.controller("bildtextleftController", function () {
    this.removeBlock = function () {
        this.loescheBlock({"id": this.id});
    };

    this.istLoeschenbereich = true;
});