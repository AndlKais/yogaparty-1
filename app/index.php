<!DOCTYPE html>
<html lang="de" ng-app="yogaparty">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>yogaparty</title>
    <link rel="icon" href="favicon.ico">

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

    <script src="vendor/angular-material-1.1.7/angular-material.min.js"></script>
    <script src="vendor/angular-ui-router-1.0.8/angular-ui-router.min.js"></script>
    <script src="vendor/js/bootstrap.min.js"></script>

     <script src="https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.5/jquery.mCustomScrollbar.concat.min.js"></script>

     <script src="components/calendar/fullcalendar.js"></script>
     <script src="components/calendar/gcal.js"></script>
     <script src="components/calendar/calendar.js"></script>

    <script src="app.js"></script>
    <script src="main.js"></script>
    <script src="components/main.js"></script>
    <script src="components/bildcentertext.js"></script>
    <script src="components/titel-center-text.js"></script>
    <script src="components/map.js"></script>
    <script src="components/bildtextleft.js"></script>
    <script src="components/bildtextright.js"></script>
    <script src="components/testgelaende.js"></script>
    <script src="components/sliderprofile.js"></script>
    <script src="components/calendarcontact.js"></script>
    <script src="components/aktuell.js"></script>
    <script src="components/auswahl.js"></script>
    <script src="components/edit.js"></script>
    <script src="components/fileChooser.js"></script>
  </head>

  <body layout="column" ng-cloak>
      <main></main>
      <ui-view>
      <slider-profile></slider-profile>
      <div class="container hintergrundbild" style="width: 100%; height: 100%">
          <div layout="row" style="margin-top: 10px">
              <map flex style="width: 50% !important;"></map>
              <aktuell flex></aktuell>
          </div>
          <!--<bildtextleft></bildtextleft>
          <bild-text-right></bild-text-right>
          <bild-center-text></bild-center-text>
          <titel-center-text></titel-center-text>-->
          <!--<calendarcontact></calendarcontact>-->
          <testgelaende></testgelaende>
      </div>
      </ui-view>
          <md-button href="accountseite.php">Zur Accountseite</md-button>
  </body>

</html>