"use strict";

app.component("testgelaende", {
    templateUrl: "components/profilseite/testgelaende.html",
    controller: "testgelaendeController",
    bindings:{
        ueberbringeZuLoeschendenBlock: " &?",
        reihenfolge: "@",
        modus: "@?",
        ausgewaehlt: "&?",
        elementsLoaded: "&?"
    }

});

app.controller("testgelaendeController", ['$http', '$log', '$compile', '$scope', function ($http, $log, $compile, $scope) {
    let $ctrl = this;

    this.loescheBlock = function (id) {
        $('*[id="' + id + '"]').empty();
        this.ueberbringeZuLoeschendenBlock({"id": id});
    };

    this.bearbeiteBlock = function (id) {
        let nodes = angular.element(document.querySelector("testgelaende[reihenfolge='" + this.reihenfolge + "'] > div").children);
        for(let i = 0; i < nodes.length; i++) {
            if(nodes[i].getAttribute("id") != id){
                //nodes[i].style.display = "none";
            }else{
                //nodes[i].style.display = "block";
            }
        }

        let element = angular.element(document.querySelector("testgelaende[reihenfolge='" + this.reihenfolge + "'] > div > *[id='" + id + "']"))[0];
        let tagname = element.tagName;
        let blockArt = "";
        let inhalt = {
            titel: element.getAttribute("titel"),
            beschreibung: element.getAttribute("text"),
            backgroundC: element.style.backgroundColor,
            color: element.style.color
        };
        if(tagname === "TITEL-CENTER-TEXT") {
            blockArt = "BTCT";
        }else if(tagname === "BILD-CENTER-TEXT") {
            blockArt = "BBCT";
        }else if(tagname === "BILD-TEXT-RIGHT") {
            blockArt = "BBTR";
        }else {
            blockArt = "BBTL";
        }

        $ctrl.ausgewaehlt({ "id": id, "blockArt": blockArt, "inhalt": inhalt});
    };

    this.$onInit = function(){
        $ctrl.modusDesTestgelaendes = $ctrl.modus ? $ctrl.modus : 1;
        $ctrl.ausgabe = "";
        $http.post("profil_GET_bloecke.php", {
            "profil": 1,
            "modus": $ctrl.modusDesTestgelaendes
        }).then(function(data){
            $ctrl.ausgabe = data.data;
            $log.debug(data.data);

            for(let i = 0; i < $ctrl.ausgabe.length; i++){
                let node = $compile($ctrl.ausgabe[i])($scope);
                $log.debug($ctrl.ausgabe[i]);
                angular.element(document.getElementsByClassName("bloeckeAnzeigen")[$ctrl.reihenfolge ? $ctrl.reihenfolge - 1 : 0]).append(node);

                /*  let node = document.createElement($ctrl.ausgabe[i].blockart);

                  for(let key in $ctrl.ausgabe[i]) {
                      if(key !== "blockart") {
                          let attribut = document.createAttribute(key);
                          attribut.value = $ctrl.ausgabe[i][key];
                          node.setAttributeNode(attribut);
                      }
                      document.getElementById("test").appendChild(node);
                  }
                  //document.getElementById('test').appendChild(node);
                  $log.debug($ctrl.ausgabe[i]);*/
            }
            $ctrl.elementsLoaded();
        });
    }
}]);