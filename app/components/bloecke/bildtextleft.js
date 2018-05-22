"use strict";

app.component("bildTextLeft", {
    templateUrl: "components/bloecke/bildtextleft.html",
    controller: "bildtextleftController",
    bindings: {
        titel: "@",
        text: "@",
        bild: "@?",
        id: "@?",
        loescheBlock: "&?",
        bearbeiteBlock: "&?"
    }
});

app.controller("bildtextleftController", function ($element) {

    this.$onInit = function () {
        let that = this;
        if(this.bearbeiteBlock) {
            $element.on("click", function () {
                that.bearbeiteBlock({ "id": that.id});
            });
        }
    };

    this.removeBlock = function () {
        this.loescheBlock({"id": this.id});
    };
});