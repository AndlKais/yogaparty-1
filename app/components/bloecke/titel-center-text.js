"use strict";

app.component("titelCenterText", {
    templateUrl: "components/bloecke/titel-center-text.html",
    controller: "titelCenterTextController",
    bindings: {
        titel: "@",
        text: "@",
        id: "@?",
        loescheBlock: "&?",
        bearbeiteBlock: "&?"
    }

});

app.controller("titelCenterTextController", function ($element) {

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