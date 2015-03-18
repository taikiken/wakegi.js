/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/18 - 13:09
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
    document = window.document,
    wakegi = window.wakegi,
    Browser = wakegi.Browser;

  Browser.Element = ( function (){
    var
      touch,
      querySelector;

    /**
     * HTMLElement detection
     * @class Element
     * @constructor
     */
    function Element () {
      throw new Error( "Element can't create instance." );
    }

    var p = Element.prototype;

    p.constructor = Element;

    /**
     * @method touch
     * @static
     * @return {boolean}
     */
    Element.touch = function () {

      if ( typeof touch === "undefined" ) {
        // touch undefined
        // http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
        // http://stackoverflow.com/questions/2915833/how-to-check-browser-for-touchstart-support-using-js-jquery#answer-2915912
        touch = 'ontouchstart' in document.documentElement;
      }

      return touch;
    };

    /**
     * @method querySelector
     * @static
     * @return {boolean}
     */
    Element.querySelector = function () {

      if ( typeof querySelector === "undefined" ) {
        // querySelector undefined

        querySelector = typeof document.querySelector !== "undefined";
      }

      return querySelector;
    };

    return Element;
  }() );

}( window ) );