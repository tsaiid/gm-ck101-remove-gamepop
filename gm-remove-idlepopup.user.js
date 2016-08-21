// ==UserScript==
// @name            Remove IdlePopup
// @author          I-Ta Tsai
// @namespace       http://tsai.it/project/gmscripts/ck101-remove-gamepop/
// @homepageURL     https://github.com/tsaiid/gm-remove-idlepopup
// @version         0.2.20160821
// @description     A pop window will show every few minutes if no keyboard/mouse action happens. The script will remove this feature. Currently, supports several sites in Taiwan.
// @include         http://ck101.com/*
// @include         http://www.ettoday.net/*
// @include         http://*.ptt01.cc/*
// @include         http://www.buzzhand.com/*
// @include         http://portable.easylife.tw/*
// @include         http://www.wetalk.tw/*
// @include         http://wetalk.tw/*
// @include         http://www.life.com.tw/*
// @include         http://www.bomb01.com/*
// @include         http://buzzorange.com/*
// @include         http://udn.com/*
// @include         http://www.setn.com/*
// @include         http://www.appledaily.com.tw/*
// @include         http://www.fotobeginner.com/*
// @include         http://www.nownews.com/*
// @include         http://*.pixnet.net/*
// @include         http://www.newmobilelife.com/*
// @include         http://opinion.udn.com/*
// @require         https://code.jquery.com/jquery-2.2.1.min.js
// @require         https://gist.githubusercontent.com/BrockA/2625891/raw/waitForKeyElements.js
// @grant           none
// @copyright       2014+, I-Ta Tsai (http://tsai.it/)
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

window.addEventListener('load', function() { // wait until page loaded

  var url = window.location.href;

  // for ck101
  if (url.match(/ck101\.com/)) {
      $('.gamePop').remove();
      $('#popupGameAd').remove();
  }

  // bomb01 (fancybox)
  function removeBomb01Fb(jNodes) {
      var i = 0;
      jNodes.click();
  }

  if (url.match(/www\.bomb01\.com/)) {
      console.log('bomb01 page');
      waitForKeyElements (
      "a:contains('已經讚了，不用再顯示')", 
          removeBomb01Fb
      );
  }

  // for *.ptt01.cc
  function removeFbGoodPopupPtt01 (jNodes) {
      jNodes.click();
  }

  if (url.match(/\.ptt01\.cc/)) {
      waitForKeyElements (
      "div.fancybox-overlay a:contains('我已經按讚，不要再提醒我!')", 
          removeFbGoodPopupPtt01
      );
  }

  // for buzzhand
  function removeFbGoodPopupBh (jNodes) {
      if (jNodes.contents().find('a:contains("已經讚了")').length) {
         jNodes.contents().find('a:contains("已經讚了")').click();
      }
  }

  if (url.match(/www\.buzzhand\.com/)) {
      waitForKeyElements (
      "div#like-encourager iframe", 
          removeFbGoodPopupBh
      );
  }

  // for easylife, wetalk, nownews
  if (url.match(/portable\.easylife\.tw|wetalk\.tw|nownews\.com/)) {
      $('.idleAd').remove();
  }

  // for life (using fancybox jquery plugin)
  function removeFancyboxPopup (jNodes) {
      console.log(jNodes);
      console.log(jNodes.context);
      console.log(jNodes.selector);
      jNodes[0].click();
  }

  // for ettoday
  if (url.match(/www\.ettoday\.net/)) {
      waitForKeyElements (
      "div#info_box a:contains('已經按過讚了，請關閉！')", 
          removeFancyboxPopup
      );
      $('.idleAd').remove();
  }

  // for appledaily
  if (url.match(/www\.appledaily\.com\.tw/)) {
      waitForKeyElements (
      "div.fancybox-overlay a[title='Close']", 
          removeFancyboxPopup
      );
  }

  if (url.match(/www\.life\.com\.tw/)) {
      console.log("life");
      waitForKeyElements (
      "div.fancybox-overlay a:contains('已經加入了，關閉視窗')", 
          removeFancyboxPopup
      );
  }

  // For techorange (fancybox)
  if (url.match(/buzzorange\.com/)) {
      console.log('techorange');
      waitForKeyElements (
      "a.fancybox-close[title=Close]", 
          removeFancyboxPopup
      );    
  }

  // fotobeginner
  if (url.match(/www\.fotobeginner\.com/)) {
      console.log('fotobeginner');
      waitForKeyElements (
      "a.fancybox-close[title=Close]", 
          removeFancyboxPopup
      );    
  }

  // udn, opinion.udn
  if (url.match(/udn\.com/)) {
      console.log("udn");
      $('#show_box').remove();
  }

  // setn
  if (url.match(/www\.setn\.com/)) {
      console.log("setn");    
      $('div.banner_cover_null').remove();
      $('div.banner_cover_block').remove();
  }

  // pixnet
  if (url.match(/\.pixnet\.net/)) {
      console.log("pixnet");    
      waitForKeyElements (
          "#idle-pop a.modal-close", 
          function (jNodes) {
              console.log(jNodes);
              jNodes[0].click();
              $('#idle-pop').remove();
              console.log('in pixnet, the parent node #idle-pop should be destroyed.');
          }, 
          true // delete the watcher after the parent node being removed.
      );    
  }

  // newmobilelife
  if (url.match(/www\.newmobilelife\.com/)) {
      console.log('newmobilelife');
      waitForKeyElements (
      "a.fancybox-close[title=Close]", 
          removeFancyboxPopup
      );    
  }

}, false);
