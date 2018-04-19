"use strict";

app.component("auswahl", {
    templateUrl: "components/auswahl.html",
    controller: "auswahlController"

});

app.controller("auswahlController", function () {
    this.titel = "Andreas jojojo";
    this.text = "Template Titel-Text Block";
    this.bild = "https://cdn1.medicalnewstoday.com/content/images/articles/318/318774/a-woman-practicing-yoga-on-the-beach.jpg";
    this.bildR = true;
    this.bildL = false;
});
