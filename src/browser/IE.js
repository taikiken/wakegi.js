/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/17 - 14:16
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
 * IE チェックを行います
 *
 * @module Browser
 * @submodule IE
 */
( function ( window ){
  "use strict";
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser;

  Browser.IE = ( function (){
    var
      ie6, ie7, ie8, ie9, ie10, ie11, ie, version;

    /**
     * IE detection
     * @class IE
     * @static
     * @constructor
     */
    function IE () {
      throw new Error( 'IE can\'t create instance.' );
    }

    var p = IE.prototype;

    p.constructor = IE;

    /**
     * @method init
     * @static
     */
    IE.init = function () {
      var ua;

      if (
        typeof ie === 'undefined' ||
        typeof ie6 === 'undefined' ||
        typeof ie7 === 'undefined' ||
        typeof ie8 === 'undefined' ||
        typeof ie9 === 'undefined' ||
        typeof ie10 === 'undefined' ||
        typeof ie11 === 'undefined'

      ) {

        // need initialize
        ua = Browser.ua();

        ie6 = false;
        ie7 = false;
        ie8 = false;
        ie9 = false;
        ie10 = false;
        ie11 = false;

        ie = !!ua.match(/msie/i);

        if ( ie ) {

          ie10 = !!ua.match(/msie [10]/i);

          if ( !ie10 ) {

            ie9 = !!ua.match(/msie [9]/i);

            if ( !ie9 ) {

              ie8 = !!ua.match(/msie [8]/i);

              if ( !ie8 ) {

                ie7 = !!ua.match(/msie [7]/i);

                if ( !ie7 ) {

                  ie6 = !!ua.match(/msie [6]/i);

                }// ie7

              }// ie8

            }// ie9

          }// ie10

        } else {

          // not /msie/
          ie11 = !!ua.match(/trident\/[7]/i) && !!ua.match(/rv:[11]/i);
          ie = ie11;

        }

      }
    };

    /**
     * @method calculate
     * @static
     */
    IE.calculate = function () {

      IE.init();

      if ( typeof version === 'undefined' ) {

        // version undefined
        version = -1;

        if ( IE.is() ) {
          // IE
          if ( ie11 ) {

            version = 11;

          } else if ( ie10 ) {

            version = 10;

          } else if ( ie9 ) {

            version = 9;

          } else if ( ie8 ) {

            version = 8;

          } else if ( ie7 ) {

            version = 7;

          } else if ( ie6 ) {

            version = 6;

          }

        }// IE

      }// undefined

    };

    /**
     * @method is
     * @static
     * @return {boolean}
     */
    IE.is = function () {

      IE.init();
      return ie;

    };

    /**
     * @method is6
     * @static
     * @return {boolean}
     */
    IE.is6 = function () {

      IE.init();
      return ie6;

    };

    /**
     * @method is7
     * @static
     * @return {boolean}
     */
    IE.is7 = function () {

      IE.init();
      return ie7;

    };

    /**
     * @method is8
     * @static
     * @return {boolean}
     */
    IE.is8 = function () {

      IE.init();
      return ie8;

    };

    /**
     * @method is9
     * @static
     * @return {boolean}
     */
    IE.is9 = function () {

      IE.init();
      return ie9;

    };

    /**
     * @method is10
     * @static
     * @return {boolean}
     */
    IE.is10 = function () {

      IE.init();
      return ie10;

    };

    /**
     * @method is11
     * @static
     * @return {boolean}
     */
    IE.is11 = function () {

      IE.init();
      return ie11;

    };

    /**
     * version float型
     * @method version
     * @static
     * @return {int}
     */
    IE.version = function () {

      IE.calculate();
      return version;

    };

    /**
     * version 正数
     * @method major
     * @static
     * @return {int}
     */
    IE.major = function () {

      return IE.version();

    };

    /**
     * IE 8 or 7 or 6 判定
     * @method legacy
     * @static
     * @return {boolean}
     */
    IE.legacy = function () {

      IE.init();
      return ie6 || ie7 || ie8;

    };

    return IE;
  }() );
}( window ) );