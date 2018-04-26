"use strict";

app.component("fileChooser", {
    templateUrl: "components/fileChooser.html",
    controller: "fileChooserController",
    bindings: {
        fileChosen: "&"
    }

});

app.controller("fileChooserController", function ($element) {

    this.$onInit = function () {
        let that = this;

        $element.on("click", function(){
            angular.element(document.querySelector(".form-control"))[0].click();
        });

        angular.element(document.getElementsByClassName("form-control"))[0].addEventListener("change", function (e) {
            if(e.target.files.length) {
                if(e.target.files[0].type.match("image/.+")) {
                    angular.element(document.getElementsByClassName("errorSection"))[0].setAttribute("hidden", "");
                    that.file = e.target.files;
                    document.getElementsByClassName("form-control")[1].value = that.file[0].name;
                    that.fileChosen({
                        "file": that.file
                    });
                }else{
                    angular.element(document.getElementsByClassName("errorSection"))[0].removeAttribute("hidden");
                }
            }
        });
    };
});
