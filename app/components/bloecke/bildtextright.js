"use strict";

app.component("bildTextRight", {
    templateUrl: "components/bloecke/bildtextright.html",
    controller: "bildtextrightController",
    bindings: {
        titel: "@",
        text: "@",
        bild: "@?",
        id: "@?",
        loescheBlock: "&?",
        bearbeiteBlock: "&?"
    }

});

app.controller("bildtextrightController", function ($element) {

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

    this.istLoeschenbereich = true;
});