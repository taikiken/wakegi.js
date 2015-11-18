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
 *
 */

/**
 * Windows OS チェックを行います
 *
 * @module Browser
 * @submodule Windows
 */
( function ( window ){
  'use strict';
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser;

  Browser.Windows = ( function (){
    var
      phone,
      windows;

    /**
     * windows OS detection
     *
     * @class Windows
     * @static
     * @constructor
     */
    function Windows () {
      throw new Error( 'Windows can\'t create instance.' );
    }

    var p = Windows.prototype;
    p.constructor = Windows;

    /**
     * @method init
     * @static
     */
    Windows.init = function () {

      var ua;

      if ( typeof windows === 'undefined' ) {

        // windows undefined
        ua = Browser.ua();
        windows = !!ua.match(/windows/i);

        if ( windows ) {

          phone = !!ua.match(/windows phone/i);
          if ( phone ) {

            windows = false;

          }

        } else {

          phone = false;

        }

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
    /**
     * @method phone
     * @static
     * @return {boolean}
     */
    Windows.phone = function () {

      Windows.init();
      return phone;

    };

    return Windows;

  }() );

}( window ) );