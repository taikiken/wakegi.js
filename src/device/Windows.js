/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/17 - 23:05
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

  Browser.Windows = ( function (){
    var
      windows;

    /**
     * windows detection
     * @class Windows
     * @constructor
     */
    function Windows () {
      throw new Error( "Windows can't create instance." );
    }

    var p = Windows.prototype;

    p.constructor = Windows;

    /**
     * @method init
     * @static
     */
    Windows.init = function () {

      if ( typeof windows === "undefined" ) {
        // windows undefined
        windows = !!wakegi.ua().match(/windows/i);
      }

    };

    /**
     * @method is
     * @static
     * @return {boolean}
     */
    Windows.is = function () {

      Windows.init();
      return windows;

    };

    return Windows;
  }() );

}( window ) );