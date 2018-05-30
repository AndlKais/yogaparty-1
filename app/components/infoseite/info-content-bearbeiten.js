"use strict";

app.component("infoContentBearbeiten", {
    templateUrl: "components/infoseite/info-content-bearbeiten.html",
    controller: "InfoContentBearbeitenController",
    bindings: {}
});


app.controller("InfoContentBearbeitenController", function ($mdToast) {

let $ctrl = this;

$ctrl.ueberpruefen = function () {




    if(!($ctrl.passwort === $ctrl.passwortWH)){
        $mdToast.show(
            $mdToast.simple()
                .textContent('Passwort stimmt nicht überein')
                .position('bottom')
                .hideDelay(3000)
        );
    };

}

});
