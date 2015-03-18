/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/17 - 12:39
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
( function ( window ){
  "use strict";
  var
    document = window.document,
    wakegi = window.wakegi;

  wakegi.Browser = ( function (){
    var
      navigator = window.navigator,
      ua,
      app,
      matchMedia,
      touch;

    /**
     * Browser 基本機能
     * @class Browser
     * @constructor
     */
    function Browser () {
      throw new Error( "Browser can't create instance." );
    }

    var p = Browser.prototype;

    p.constructor = Browser;
    /**
     * @method init
     * @static
     */
    Browser.init = function () {

      if ( typeof ua === "undefined" || typeof app === "undefined" ) {
          // ua undefined
        ua = navigator.userAgent;
        app = navigator.appVersion;

      }
    };
    /**
     * @method navigator
     * @static
     * @return {Navigator} window.navigator オブジェクトを返します
     */
    Browser.navigator = function () {
      return navigator;
    };
    /**
     * @method ua
     * @static
     * @return {*|string} navigator.userAgent を返します
     */
    Browser.ua = function () {

      Browser.init();
      return ua;

    };
    /**
     * @method app
     * @static
     * @return {*|string} navigator.appVersion を返します
     */
    Browser.app = function () {

      Browser.init();
      return app;

    };
    /**
     * userAgent regular expression of Safari
     * @method matchSafari
     * @static
     * @return {boolean}
     */
    Browser.matchSafari = function () {

      Browser.init();
      return !!ua.match(/safari/i);

    };


    return Browser;
  }() );
}( window ) );