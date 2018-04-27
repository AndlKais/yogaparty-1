"use strict";

app.component("sliderProfile", {
    templateUrl: "components/sliderprofile.html",
    controller: "sliderprofileController",
    bindings: {

    }

});

app.controller("sliderprofileController", function () {
    $('.carousel').carousel({
        interval: 4000
    })
});