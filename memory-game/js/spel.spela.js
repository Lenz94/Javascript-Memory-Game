/*jslint browser:true */
/*global $: false, spel: false, alert: false, confirm: false, console: false, Debug: false, opera: false, prompt: false, WSH: false */
spel.spela = {};
$(document).ready(function () {
    "use strict";
    $("img").hide(); // OBS: tillval
    $("#buttonStart").click(spel.logik.startSpel);
});