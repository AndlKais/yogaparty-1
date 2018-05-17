"use strict";

app.component("titelCenterText", {
    templateUrl: "components/bloecke/titel-center-text.html",
    controller: "titelCenterTextController",
    bindings: {
        titel: "@",
        text: "@",
        id: "@",
        loescheBlock: "&?"
    }

});

app.controller("titelCenterTextController", function () {
    this.removeBlock = function () {
        this.loescheBlock({"id": this.id});
    };
});