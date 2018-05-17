"use strict";

app.component("loeschenbereich", {
    templateUrl: "components/accountseite/loeschen-bereich.html",
    controller: "LoeschenBereichController",
    bindings: {

    }
});


app.controller("LoeschenBereichController", function ($log, $http, $mdDialog) {

    this.loescheBloecke = [];

    this.loescheBlock = function (id) {
        this.loescheBloecke.push(id);
    };

    this.loeschenBestaetigen = function () {
        if (this.loescheBloecke.length) {
            $mdDialog.show(
                $mdDialog.confirm()
                    .clickOutsideToClose(true)
                    .title('Löschen bestätigen?')
                    .htmlContent("<h3>Möchten Sie die entfernten Blöcke für immer löschen?</h3> <br> <h4>Sie können bei \"Hinzufügen\" gleich einen neuen Block erstellen oder bei \"Bearbeiten\" einen vorhandenen Block ändern - probieren Sie es gleich aus! :)</h4>")
                    .ariaLabel('OffscreenAlert')
                    .ok('Ja für immmmmmer')
                    .openFrom({
                        top: -50,
                        width: 30,
                        height: 80
                    })
                    .closeTo({
                        left: 1500
                    })
                    .cancel('Nein, bitte nicht')
            ).then(() => {
                let that = this;
                $http.post("profil_DELETE_bloecke.php",{
                        "ids": that.loescheBloecke
                    }
                ).then(function (result) {
                    $log.debug(result);
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title(result.data.everythingOk ? 'Erfolg!' : 'Oh, nein')
                            .htmlContent(result.data.everythingOk ? "<h4>Blöcke wurden erfolgreich gelöscht!</h4>" : "<h4>Uups, es ist ein Fehler aufgetreten. Aktualisieren Sie die Seite oder versuchen Sie es in ein paar Minuten noch einmal.<br> Wenn es dann immer noch nicht geht, schreiben Sie uns eine Mail!</h4>")
                            .ariaLabel('OffscreenAlert')
                            .ok('Okay')
                            .openFrom({
                                top: -50,
                                width: 30,
                                height: 80
                            })
                            .closeTo({
                                left: 1500
                            })
                    ).then(function () {
                        window.location.href = "accountseite.php";
                    });
                });
            });
        }else{
            $mdDialog.show(
                $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Löschen bestätigen?')
                    .htmlContent("<h3>Sie müssen auf zumindest ein X eines Blocks, den Sie löschen wollen, klicken.</h3> <br> <h4>Keine Sorge - nichts wird gelöscht, bis Sie auf Speichern drücken.</h4>")
                    .ariaLabel('OffscreenAlert')
                    .ok('Geht klar')
                    .openFrom({
                        top: -50,
                        width: 30,
                        height: 80
                    })
                    .closeTo({
                        left: 1500
                    })
            );
        }
    };


});
