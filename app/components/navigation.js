"use strict";

app.component("navigation", {
    templateUrl: "components/navigation.html",
    controller: "navController"

});

app.controller("navController", function () {
    let $ctrl = this;

    this.$onInit = function () {
        let $temp = window.location.pathname;
        if ($temp === "/yogaparty/app/profilseite.php") {
            var element = document.getElementById("profli");
            element.classList.add("active");
        }else if($temp === "/yogaparty/app/info-bearbeitungsbereich.php"){
            var element = document.getElementById("bearbli");
            element.classList.add("active");
        }else if($temp === "/yogaparty/app/accountseite.php"){
            var element = document.getElementById("accountli");
            element.classList.add("active");
        }else if($temp === "/yogaparty/app/impressum.php"){
            var element = document.getElementById("impli");
            element.classList.add("active");
        }
    };

    $(document).ready(function () {
        $("#sidebar").mCustomScrollbar({
            theme: "minimal"
        });

        $('#dismiss, .overlay').on('click', function () {
            $('#sidebar').removeClass('active');
            $('.overlay').fadeOut();
        });

        $('#sidebarCollapse').on('click', function () {
            $('#sidebar').addClass('active');
            $('.overlay').fadeIn();
            $('.collapse.in').toggleClass('in');
            $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        });
    });

});


