"use strict";

app.component("edit", {
    templateUrl: "components/edit.html",
    controller: "EditController",
    bindings: {}
});


app.controller("EditController", function ($log) {
    this.getFile = function (file) {
        $log.debug(file);
    };

    this.getBlock = function (ausgewaehlt) {
        this.ausgewaehlt = ausgewaehlt;
        this.showFileChooser = this.ausgewaehlt !== "BTCT";
    };
});
