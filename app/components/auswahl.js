"use strict";

app.component("auswahl", {
    templateUrl: "components/auswahl.html",
    controller: "auswahlController",
    bindings: {
        ausgewaehlt: "&"
    }

});

app.controller("auswahlController", function ($log, $element) {

    this.blockAuswahl = function(arg, $event){
        let elements = $element[0].childNodes[2].childNodes;
        elements.forEach(e => {
            if(e !== $event.currentTarget && e.tagName === "DIV"){
                if(e.style) {
                    e.style.boxShadow = "2px 2px 5px 0px rgba(122,122,122,0.55)";
                }
            }
        });

        $event.currentTarget.style.boxShadow = " 0px 0px 20px 4px #2868A6";
        this.ausgewaehlt({
            "ausgewaehlt": arg
        });
    }
});
