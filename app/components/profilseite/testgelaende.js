"use strict";

app.component("testgelaende", {
    templateUrl: "components/profilseite/testgelaende.html",
    controller: "testgelaendeController",
    bindings:{
        deleteButton: '@'
    }

});

app.controller("testgelaendeController", ['$http', '$log', '$compile', '$scope', function ($http, $log, $compile, $scope) {
    let $ctrl = this;

    this.$onInit = function(){
        $ctrl.ausgabe = "";
        $http.post("profil_GET_bloecke.php", {
            "profil": 1
        }).then(function(data){
            $ctrl.ausgabe = data.data;
            $log.debug(data.data);

            for(let i = 0; i < $ctrl.ausgabe.length; i++){
                let node = $compile($ctrl.ausgabe[i])($scope);
                $log.debug($ctrl.ausgabe[i]);
                angular.element(document.getElementById("test")).append(node);
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
        });
    }
}]);