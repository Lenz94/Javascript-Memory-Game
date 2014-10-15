/*jslint browser:true */
/*global $: false, spel: false, alert: false, confirm: false, console: false, Debug: false, opera: false, prompt: false, WSH: false */
spel.ui = {};
var msg;
spel.ui.resultat = function () {
    "use strict";
    msg = '<span id="msgC">Er rekord: </span>';
    $("#msgCounter").prepend(msg);
    msg = '<span id="msgT">Er rekord: </span>';
    $("#msgTimer").prepend(msg);
};
//USER INTERFACE