<!DOCTYPE html>
<html lang="de" ng-app="yogaparty">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="keywords" content="yogaparty, yoga">

    <title>yogaparty</title>
    <link rel="icon" href="resources/icons/bdl.ico">

    <link rel="stylesheet" href="vendor/material-icons-2.2.0/material-icons.css">
    <link rel="stylesheet" href="vendor/roboto/roboto.css">

    <link rel="stylesheet" href="vendor/angular-material-1.1.7/angular-material.min.css">

    <link rel="stylesheet" href="app.css">
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.5/jquery.mCustomScrollbar.min.css">
    <link rel="stylesheet" href="vendor/css/bootstrap.min.css">

    <script src="vendor/jquery-3.2.1/jquery.min.js"></script>
    <script src="vendor/moment.js-2.21.0/moment.min.js"></script>
    <script src="vendor/moment.js-2.21.0/locale/de.js" charset="UTF-8"></script>

    <script src="vendor/angularjs-1.6.9/angular.min.js"></script>
    <script src="vendor/angularjs-1.6.9/angular-resource.min.js"></script>
    <script src="vendor/angularjs-1.6.9/angular-messages.min.js"></script>
    <script src="vendor/angularjs-1.6.9/angular-sanitize.min.js"></script>
    <script src="vendor/angularjs-1.6.9/angular-animate.min.js"></script>
    <script src="vendor/angularjs-1.6.9/angular-aria.min.js"></script>
    <script src="vendor/angularjs-1.6.9/i18n/angular-locale_de.js"></script>
    <script src="vendor/tinycolor/tinycolor.js"></script>
    <script src="vendor/mdColorPicker/mdColorPicker.js"></script>

    <script src="vendor/angular-material-1.1.7/angular-material.min.js"></script>
    <script src="vendor/angular-ui-router-1.0.8/angular-ui-router.min.js"></script>
    <script src="vendor/js/bootstrap.min.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.5/jquery.mCustomScrollbar.concat.min.js"></script>

    <script src="components/calendar/fullcalendar.js"></script>
    <script src="components/calendar/gcal.js"></script>
    <script src="components/calendar/calendar.js"></script>

    <script src="app.js"></script>
    <script src="components/main.js"></script>
    <script src="components/navigation.js"></script>
    <script src="components/bloecke/bildcentertext.js"></script>
    <script src="components/bloecke/titel-center-text.js"></script>
    <script src="components/profilseite/map.js"></script>
    <script src="components/bloecke/bildtextleft.js"></script>
    <script src="components/bloecke/bildtextright.js"></script>
    <script src="components/profilseite/testgelaende.js"></script>
    <script src="components/profilseite/sliderprofile.js"></script>
    <script src="components/profilseite/calendarcontact.js"></script>
    <script src="components/profilseite/userinfos.js"></script>
    <script src="components/accountseite/auswahl.js"></script>
    <script src="components/accountseite/blockkomponente.js"></script>
    <script src="components/accountseite/fileChooser.js"></script>
    <script src="components/profilseite/aktuell-text.js"></script>

    <script src="components/impressum.js"></script>

    <script src="components/accountseite/bearbeiten-bereich.js"></script>
    <script src="components/accountseite/loeschen-bereich.js"></script>
    <script src="components/infoseite/info-bearbeiten.js"></script>

</head>

<body layout="column" ng-cloak>
<navigation></navigation>
<ui-view>
    <slider-profile></slider-profile>
    <div class="container hintergrundbild" style="width: 100%; height: auto">
        <div id="aktuelldiv" layout-gt-xs="row" layout-xs="column" style="margin-top: 10px; padding-bottom: 3%">
            <userinfos flex></userinfos>
            <map id="mapdiv" flex flex-xs="95" style="width: 50%"></map>
        </div>
        <div layout-gt-xs="row" layout-xs="column">
            <div style="width: 50%; margin-left: 15px" class="newsdiv">
                <aktuell-text></aktuell-text>
            </div>
            <div style="width: 50%;" layout-align="center center" class="newsdiv">
                <h1 style="width: 100%; margin: auto; text-align: center">Hier könnte Ihre Werbung stehen</h1>
            </div>
        </div>
        <testgelaende></testgelaende>
    </div>
</ui-view>
</body>

</html>