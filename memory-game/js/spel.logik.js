/*jslint browser:true */
/*global $: false, spel: false, alert: false, confirm: false, console: false, Debug: false, opera: false, prompt: false, WSH: false */
spel.logik = {};
var hittat = 0,
    timer = 0, // tidräknare
    idTimer = 0,
    idBilden = "",
    oppnaBilden = "",
    klickat = 0,
    audio;
spel.logik.audioFel = function () {
    "use strict";
    audio = document.querySelector("#fel");
    audio.load();
    audio.play();
};
spel.logik.audioKorrekt = function () {
    "use strict";
    audio = document.querySelector("#korrekt");
    audio.load();
    audio.play();
};
spel.logik.timerCount = function () {
    "use strict";
    timer = timer + 1;
    $("#timer").html(" " + timer);
    if (hittat < 10) { // håller räknaren aktiv
        idTimer = setTimeout('spel.logik.timerCount()', 1000); // lagrar den aktuella tiden, efter en sekund
    }
};
spel.logik.random = function (av, till) {
    "use strict";
    return Math.floor(Math.random() * (till - av + 1) + av); // random bilder
};
spel.logik.mix = function () {
    "use strict";
    var bilder = $(".squaresContainer").children(),
        bild = $(".squaresContainer > div:first-child"),
        i,
        j,
        randomIndex,
        bilderArray = new Array();
    for (i = 0; i < bilder.length; i = i + 1) {
        bilderArray[i] = $("#" + bild.attr("id") + " img").attr("src");
        bild = bild.next();
    } //mete fotos en array
    bild = $(".squaresContainer > div:first-child");
    for (j = 0; j < bilder.length; j = j + 1) {
        randomIndex = spel.logik.random(0, bilderArray.length - 1); // lagrar bilden efter anropa random funktionen
        $("#" + bild.attr("id") + " img").attr("src", bilderArray[randomIndex]); // bilden är placerade på html
        bilderArray.splice(randomIndex, 1); // splice: metoden som ändrar innehållet i en array. Det tar bort gamla element och lägger nya element istället.
    }
};
spel.logik.startSpel = function () { // återställa
    "use strict";
    klickat = 0;
    $("img").hide();
    $("img").removeClass("opacity");
    $("#msgT").remove();
    $("#msgC").remove();
    $("#counter").html(" " + klickat);
    $("#timer").html("0");
    idBilden = "";
    oppnaBilden = "";
    hittat = 0;
    timer = 0;
    clearTimeout(idTimer);
    spel.logik.mix();
    spel.logik.timerCount();
    $(".squaresContainer > div").click(spel.logik.utvardering);
    return false;
};
spel.logik.utvardering = function () {
    "use strict";
    var id,
        aktuellaBilden;
    id = $(this).attr("id");
    if ($("#" + id + " img").is(":hidden")) {
        $(".squaresContainer > div").unbind("click", spel.logik.utvardering);
        $("#" + id + " img").slideDown('fast');
        if (oppnaBilden === "") {
            idBilden = id;
            oppnaBilden = $("#" + id + " img").attr("src"); // Det tar attributet av källan (src: source)
            setTimeout(function () {
                $(".squaresContainer > div").bind("click", spel.logik.utvardering);
            }, 400); // väntar 0,4 sekunder
        } else {
            aktuellaBilden = $("#" + id + " img").attr("src");
            if (oppnaBilden !== aktuellaBilden) {
                // stänger aktuella rutor
                spel.logik.audioFel(); // fel ljud
                setTimeout(function () {
                    $("#" + id + " img").slideUp('fast');
                    $("#" + idBilden + " img").slideUp('fast');
                    idBilden = ""; // tömmer variabel
                    oppnaBilden = ""; // tömmer variabel
                }, 400); // väntar 0,4 sekunder
            } else {
                // bilderna stämmer
                spel.logik.audioKorrekt(); // korrekt ljud
                $("#" + id + " img").addClass("opacity"); // tillägger opaciteten
                $("#" + idBilden + " img").addClass("opacity"); // tillägger opaciteten
                hittat = hittat + 1; // räknar hur många bild kombinationer har hittats
                idBilden = ""; // tömmer variabel
                oppnaBilden = ""; // tömmer variabel
            }
            setTimeout(function () {
                $(".squaresContainer > div").bind("click", spel.logik.utvardering);
            }, 400); // väntar 0,4 sekunder
        }
        klickat = klickat + 1; // räknar hur många klicks har gjorts
        $("#counter").html(" " + klickat); // skriver ut dem i skärmen
        if (hittat === 10) { // När alla bilderna har hittats
            spel.ui.resultat();
        }
    }
};
//PROGRAM LOGIK