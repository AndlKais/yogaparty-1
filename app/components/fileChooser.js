"use strict";

app.component("fileChooser", {
    templateUrl: "components/fileChooser.html",
    controller: "fileChooserController"

});

app.controller("fileChooserController", function ($element) {

    $element.on("click", function(){
        angular.element("input")[0].click();
    });

    this.$onInit = function () {
        console.log("test");
        angular.element("input")[0].addEventListener("change", function (e) {
            console.log(e.target.files);
        });
    };

    this.showFile = function () {
        
    }

});
