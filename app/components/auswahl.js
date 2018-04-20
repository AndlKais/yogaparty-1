"use strict";

app.component("auswahl", {
    templateUrl: "components/auswahl.html",
    controller: "auswahlController",
    bindings: {
        ausgewaehlt: "&"
    }

});

app.controller("auswahlController", function ($log) {
    this.blockAuswahl = function(arg){
        this.ausgewaehlt({
            "ausgewaehlt": arg
        });
    }
});
