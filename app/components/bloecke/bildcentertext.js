"use strict";

app.component("bildCenterText", {
    templateUrl: "components/bloecke/bildcentertext.html",
    controller: "bildcentertextController",
    bindings: {
        titel: "@",
        text: "@",
        bild: "@?",
        id: "@?",
        loescheBlock: "&?",
        bearbeiteBlock: "&?"
    }

});

app.controller("bildcentertextController", function ($element) {

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