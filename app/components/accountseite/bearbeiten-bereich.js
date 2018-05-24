"use strict";

app.component("bearbeitenbereich", {
    templateUrl: "components/accountseite/bearbeiten-bereich.html",
    controller: "BearbeitenBereichController",
    bindings: {}
});


app.controller("BearbeitenBereichController", function ($log, $scope, $mdToast, $mdDialog, $http) {

    $scope.htmlVerbindungen = {};

    let ursprung = [];
    
    $scope.getBloecke = function() {
        $log.debug("WIRD AUSGEFÜHRT");
        let elemente = angular.element(document.querySelector("testgelaende[reihenfolge='1'] > div"))[0];
        $scope.files = [];
        $scope.anfangspos = [];
        $scope.posAenderungen = [];
        $scope.aenderungen = [];
        $scope.temp = { "file": true};
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

            $scope.aenderungen.push({
                id: elemente.childNodes[i].getAttribute("id"),
                titel: elemente.childNodes[i].getAttribute("titel"),
                beschreibung: elemente.childNodes[i].getAttribute("text"),
                color: elemente.childNodes[i].style.color,
                backgroundC: elemente.childNodes[i].style.backgroundColor,
                blockArt: blockArt
            });
            ursprung.push({
                id: elemente.childNodes[i].getAttribute("id"),
                titel: elemente.childNodes[i].getAttribute("titel"),
                beschreibung: elemente.childNodes[i].getAttribute("text"),
                color: elemente.childNodes[i].style.color,
                backgroundC: elemente.childNodes[i].style.backgroundColor,
                blockArt: blockArt
            });
            $scope.posAenderungen.push(elemente.childNodes[i].getAttribute("id"));
            $scope.anfangspos.push(elemente.childNodes[i].getAttribute("id"));
        }
        //$scope.aenderungen = ursprung;
        //$scope.anfangspos = $scope.posAenderungen;
    };


    $scope.updateBlock = function (id, blockArt, inhalt) {
        $scope.temp.file = !$scope.temp.file;
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



    $scope.moveUp = function (){
        if(!$scope.htmlVerbindungen.id) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Wählen Sie den Block aus, den Sie verschieben möchten')
                    .position('bottom')
                    .hideDelay(3000)
            );
        }else if($scope.htmlVerbindungen.id != $scope.posAenderungen[0]){
            let elemente = angular.element(document.querySelector("testgelaende[reihenfolge='1'] > div"))[0];
            $scope.posAenderungen = [];
            let alreadyMoved = false;
            for(let i = 0; i < elemente.childNodes.length; i++) {
                if (!alreadyMoved) {
                    if (elemente.childNodes[i].getAttribute("id") == $scope.htmlVerbindungen.id) {
                        elemente.insertBefore(elemente.childNodes[i], elemente.childNodes[i - 1]);
                        alreadyMoved = true;
                    }
                }
            }
            for(let i = 0; i < elemente.childNodes.length; i++) {
                $scope.posAenderungen.push(elemente.childNodes[i].getAttribute("id"));
            }
        }
    };




    $scope.moveDown = function (){
        if(!$scope.htmlVerbindungen.id) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Wählen Sie den Block aus, den Sie verschieben möchten')
                    .position('bottom')
                    .hideDelay(3000)
            );
        }else if($scope.htmlVerbindungen.id != $scope.posAenderungen[$scope.posAenderungen.length-1]){
            let elemente = angular.element(document.querySelector("testgelaende[reihenfolge='1'] > div"))[0];
            $scope.posAenderungen = [];
            let alreadyMoved = false;
            for(let i = 0; i < elemente.childNodes.length; i++) {
                if (!alreadyMoved) {
                    if (elemente.childNodes[i].getAttribute("id") == $scope.htmlVerbindungen.id) {
                        elemente.insertBefore(elemente.childNodes[i + 1], elemente.childNodes[i]);
                        alreadyMoved = true;
                    }
                }
            }
            for(let i = 0; i < elemente.childNodes.length; i++) {
                $scope.posAenderungen.push(elemente.childNodes[i].getAttribute("id"));
            }
        }
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

        }else if(reference === "beschreibung") {

            if($scope.htmlVerbindungen.blockArt === "BBCT") {
                angular.element(document.querySelector("*[id='" + $scope.htmlVerbindungen.id + "'] > md-card > div > :not(.x) > div > div > div > div > p"))[0].innerHTML = $scope.htmlVerbindungen.beschreibung;
            }else {
                angular.element(document.querySelector("*[id='" + $scope.htmlVerbindungen.id + "'] > md-card > div > :not(.x) > div > div > div > div > p"))[0].innerHTML = $scope.htmlVerbindungen.beschreibung;
            }
            angular.element(document.querySelector("*[id='" + $scope.htmlVerbindungen.id + "']"))[0].setAttribute("text", $scope.htmlVerbindungen.beschreibung);
            $scope.aenderungen[$scope.aenderungen.findIndex(function(element){
                return element.id === $scope.htmlVerbindungen.id;
            })].beschreibung = $scope.htmlVerbindungen.beschreibung;

        }else if(reference === "color"){

            angular.element(document.querySelector("*[id='" + $scope.htmlVerbindungen.id + "']"))[0].style.color = $scope.htmlVerbindungen.color;
            $scope.aenderungen[$scope.aenderungen.findIndex(function(element){
                return element.id === $scope.htmlVerbindungen.id;
            })].color = $scope.htmlVerbindungen.color;

        }else if(reference === "backgroundC"){

            angular.element(document.querySelector("*[id='" + $scope.htmlVerbindungen.id + "']"))[0].style.backgroundColor = $scope.htmlVerbindungen.backgroundC;
            $scope.aenderungen[$scope.aenderungen.findIndex(function(element){
                return element.id === $scope.htmlVerbindungen.id;
            })].backgroundC = $scope.htmlVerbindungen.backgroundC;

        }

    };

    $scope.getFile = function (file) {
        let alreadyInFiles = false;
        let pos = 0;
        for(let i = 0; i < $scope.files.length; i++){
            if($scope.files[i].id === $scope.htmlVerbindungen.id){
                $log.debug("ID = ID");
                $scope.files[i].file = file;
                alreadyInFiles = true;
                pos = i;
            }
        }

        if(!alreadyInFiles){
            $scope.files.push({ "id": $scope.htmlVerbindungen.id, "file": file });
            pos = $scope.files.length - 1;
        }

        let element;

        if($scope.htmlVerbindungen.blockArt !== "BTCT" && $scope.htmlVerbindungen.blockArt !== "BBCT"){
            element = angular.element(document.querySelector("*[id='" + $scope.htmlVerbindungen.id + "'] > md-card > div > :not(.x) > div > div > div > div > div > img"))[0];
        }else{
            element = angular.element(document.querySelector("*[id='" + $scope.htmlVerbindungen.id + "'] > md-card > div > :not(.x) > div > div > div > div > img"))[0];
        }


        let reader = new FileReader();
        $scope.temp.file = !$scope.temp.file;
        reader.readAsDataURL($scope.files[pos].file[0]);

        reader.addEventListener("load", function () {
            if(element) {
                element.src = reader.result;
            }
        });
    };

    $scope.changesMade = function (){
        let changesMade = false;
        $scope.changes = {"inhalt": false, "pos": false, "files": false};
        for(let i = 0; i < ursprung.length; i++){
            let curUrsprung = ursprung[i];
            let curAenderungen = $scope.aenderungen[i];

            if(curUrsprung.titel !== curAenderungen.titel ||
               curUrsprung.beschreibung !== curAenderungen.beschreibung ||
               curUrsprung.color !== curAenderungen.color ||
               curUrsprung.backgroundC !== curAenderungen.backgroundC){
                //$log.debug("CHANGE INHALT OHNE BILD");
                changesMade = true;
                $scope.changes.inhalt = true;
            }
        }

        for(let i = 1; i <= $scope.posAenderungen.length; i++){
            if(i !== parseInt($scope.posAenderungen[i-1])){
                //$log.debug("CHANGE POSAENDERUNGEN");
                changesMade = true;
                $scope.changes.pos = true;
                break;
            }
        }

        if($scope.files.length !== 0){
            //$log.debug("CHANGE FILES");
            changesMade = true;
            $scope.changes.files = true;
        }

        return changesMade;
    };

    $scope.saveAllChanges = function () {
        /*$log.debug(ursprung);
        $log.debug($scope.aenderungen);
        $log.debug($scope.posAenderungen);
        $log.debug($scope.files);
        $log.debug("-----------------");
        $log.debug($scope.changesMade());*/
        if(!$scope.changesMade()) {
            $mdDialog.show(
                $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Problem')
                    .htmlContent('<h4>Führen Sie zumindest eine Änderung durch, um zu speichern. <br> Für mehr Infos klicken Sie auf das Info Feld.</h4>')
                    .ariaLabel('Keine Änderung BearbeitenBereich')
                    .ok('Okay!')
            );
        }else{
            /*$scope.fd = new FormData();
            if($scope.files){
                $scope.fd.append("files", $scope.files);
            }else{
                $scope.fd.append("files", null);
            }
            $scope.fd.append("aenderungen", $scope.aenderungen);
            $scope.fd.append("ursprung", $scope.ursprung);
            $scope.fd.append("pos", $scope.posAenderungen);
            $scope.fd.append("changes", $scope.changes);
            $http({
                method: 'post',
                url: 'profil_INSERT_block.php',
                data: $scope.fd,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            })*/
            $http.post("profil_REPLACE_bloecke.php", {
                "aenderungen": $scope.aenderungen,
                "ursprung": ursprung,
                "pos": $scope.posAenderungen,
                "files": $scope.files,
                "changes": $scope.changes
            }).then(function (response) {
                $log.debug(response);
            });
        }

    };

});
