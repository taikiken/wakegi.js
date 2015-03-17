/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/17 - 23:16
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * @submodule Browser
 */
( function ( window ){
  "use strict";
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser;

  Browser.Touch = ( function (){

    /**
     * @class Touch
     * @deprecated instead of Browser
     * @constructor
     */
    function Touch () {
      throw new Error( "Touch can't create instance." );
    }

    var p = Touch.prototype;

    p.constructor = Touch;

    ///**
    // * @method init
    // * @static
    // */
    //Touch.init = function () {
    //
    //  if ( typeof touch === "undefined" ) {
    //    // touch undefined
    //    // http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
    //    // http://stackoverflow.com/questions/2915833/how-to-check-browser-for-touchstart-support-using-js-jquery#answer-2915912
    //    touch = 'ontouchstart' in document.documentElement;
    //  }
    //
    //};

    /**
     * @method is
     * @deprecated instead of Browser.touch
     * @static
     * @return {boolean}
     */
    Touch.is = function () {

      return Browser.touch();

    };

    return Touch;
  }() );

}( window ) );