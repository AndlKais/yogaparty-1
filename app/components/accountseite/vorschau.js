"use strict";

app.component("vorschau", {
    templateUrl: "components/accountseite/vorschau.html",
    controller: "VorschauController",
    bindings: {
        vorschau: "<"
    }
});


app.controller("VorschauController", ['$log', '$compile', '$scope', function ($log, $compile, $scope) {

    this.$onChanges = function () {
        let node = $compile(this.vorschau)($scope);
        if(angular.element(document.getElementById("vorschau"))[0].childNodes.length > 0) {
            angular.element(document.getElementById("vorschau"))[0].childNodes[0].remove();
        }
        angular.element(document.getElementById("vorschau")).append(node);
    };

}]);
