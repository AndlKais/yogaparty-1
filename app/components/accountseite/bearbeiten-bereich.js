"use strict";

app.component("bearbeitenbereich", {
    templateUrl: "components/accountseite/bearbeiten-bereich.html",
    controller: "BearbeitenBereichController",
    bindings: {}
});


app.controller("BearbeitenBereichController", function ($log, $scope) {

    $scope.htmlVerbindungen = {};

    $scope.getBloecke = function() {
        let elemente = angular.element(document.querySelector("testgelaende[reihenfolge='1'] > div"))[0];
        $scope.ursprung = [];
        $scope.aenderungen = [];
        for(let i = 0; i < elemente.childNodes.length; i++){
            let blockArt;
            if(elemente.childNodes[i].tagName === "TITEL-CENTER-TEXT"){
                blockArt = "BTCT";
            }else if(elemente.childNodes[i].tagName === "BILD-CENTER-TEXT"){
                blockArt = "BBCT";
            }else if(elemente.childNodes[i].tagName === "BILD-TEXT-RIGHT"){
                blockArt = "BBTR";
            }else{
                blockArt = "BBTL";
            }
            $scope.ursprung.push({
                id: elemente.childNodes[i].getAttribute("id"),
                titel: elemente.childNodes[i].getAttribute("titel"),
                beschreibung: elemente.childNodes[i].getAttribute("text"),
                color: elemente.childNodes[i].style.color,
                backgroundC: elemente.childNodes[i].style.backgroundColor,
                blockArt: blockArt
            });
        }
        $scope.aenderungen = $scope.ursprung;
        $log.debug($scope.ursprung);
    };

    $scope.updateBlock = function (id, blockArt, inhalt) {
        $log.debug(id + " " + blockArt);
        $scope.$apply(function(){
            $scope.htmlVerbindungen = {
                showUpdateWindow: true,
                showFileChooser: blockArt !== "BTCT",
                id: id,
                blockArt: blockArt,
                titel: inhalt.titel,
                beschreibung: inhalt.beschreibung,
                color: inhalt.color,
                backgroundC: inhalt.backgroundC
            };
        });
    };

    $scope.updateChanges = function (reference) {
        if(reference === "titel"){
            if($scope.htmlVerbindungen.blockArt === "BBCT") {
                angular.element(document.querySelector("*[id='" + $scope.htmlVerbindungen.id + "'] > md-card > div > :not(.x) > div > h2"))[0].innerHTML = $scope.htmlVerbindungen.titel;
            }else {
                angular.element(document.querySelector("*[id='" + $scope.htmlVerbindungen.id + "'] > md-card > div > :not(.x) > div > div > div > div > h2"))[0].innerHTML = $scope.htmlVerbindungen.titel;
            }
            angular.element(document.querySelector("*[id='" + $scope.htmlVerbindungen.id + "']"))[0].setAttribute("titel", $scope.htmlVerbindungen.titel);
            $scope.aenderungen[$scope.aenderungen.findIndex(function(element){
                                return element.id === $scope.htmlVerbindungen.id;
                                })].titel = $scope.htmlVerbindungen.titel;
            $log.debug($scope.aenderungen);
        }
    };

    $scope.getFile = function (file) {
        $scope.file = file;
        $scope.updateChanges("file");
    };

});
