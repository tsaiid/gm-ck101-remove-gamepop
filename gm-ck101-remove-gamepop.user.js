// ==UserScript==
// @name            Ck101 - Remove GamePop
// @namespace       http://tsai.it/project/gmscripts/ck101-remove-gamepop/
// @version         0.1.1
// @description     A pop window will show every 5 minutes if no keyboard/mouse action happens. The script will remove this feature.
// @include         http://ck101.com/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @grant           none
// @copyright       2014+, I-Ta Tsai (http://tsai.it/)
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

$('.gamePop').remove();
$('#popupGameAd').remove();
