"use strict";

app.component("infoHeaderBearbeiten", {
    templateUrl: "components/infoseite/info-header-bearbeiten.html",
    controller: "InfoHeaderBearbeitenController",
    bindings: {}
});


app.controller("InfoHeaderBearbeitenController", function ($http, $log, inf) {
    let $ctrl = this;
    this.$onInit = function () {
        $http.post("profil_bearbeiten_GET.php", {}).then(function (data) {
            $log.debug(data.data);
            $ctrl.getRequest = data.data;
            //console.log($ctrl.getRequest);
        });

        angular.element(document.getElementsByClassName("form-control"))[0].addEventListener("change", function (e) {
            if (e.target.files.length) {
                if (e.target.files[0].type.match("image/.+")) {
                    $ctrl.file = e.target.files;
                    console.log($ctrl.file);
                    let reader = new FileReader();
                    reader.readAsDataURL($ctrl.file[0]);
                    //$log.debug(reader);
                    reader.addEventListener("load", function () {
                        //$log.debug(reader);
                        if(document.getElementsByClassName("pb-image")) {
                            document.getElementsByClassName("pb-image")[0].src = reader.result;
                        }
                        if(document.getElementsByClassName("card-bkimg")) {
                            document.getElementsByClassName("card-bkimg")[0].src = reader.result;
                        }
                    });
                }
            }


        });

        $ctrl.changepicture = function () {
            angular.element(document.getElementsByClassName("form-control"))[0].click();

        }
    }
});
