"use strict";

app.component("testgelaende", {
    templateUrl: "components/testgelaende.html",
    controller: "testgelaendeController"

});

app.controller("testgelaendeController", function ($http, $log) {
    let $ctrl = this;

    this.$onInit = function(){
        $ctrl.ausgabe = "";
        $http.post("profil_GET_bloecke.php", {
            "profil": 1
        }).then(function(data){
            $ctrl.ausgabe = data.data;

            for(let i = 0; i < $ctrl.ausgabe.length; i++){
                let node = document.createElement($ctrl.ausgabe[i].blockart);
                let att1 = document.createAttribute("text");
                att1.value = $ctrl.ausgabe[i].text;
                //document.getElementById('test').appendChild(node);
                $log.debug($ctrl.ausgabe[i]);
            }
        });
    }
});