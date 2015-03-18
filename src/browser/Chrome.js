/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/17 - 17:32
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

  Browser.Chrome = ( function (){
    var
      CriOS = Browser.CriOS,
      Android = Browser.Android,
      numbers = [ -1, -1, -1, -1 ],
      crios,
      chrome, version, major, build;

    /**
     * Chrome 判定
     * @class Chrome
     * @constructor
     */
    function Chrome () {
      throw new Error( "Chrome can't create instance." );
    }

    var p = Chrome.prototype;

    p.constructor = Chrome;

    /**
     * @method init
     * @static
     */
    Chrome.init = function () {

      if ( typeof chrome === "undefined" ) {
        // need initialize
        crios = CriOS.is();
        chrome = false;

        if ( crios ) {
          // iOS Chrome
          chrome = true;

        } else if ( !Android.standard() ) {
          // check userAgent
          chrome = !!Browser.ua().match(/chrome/i);

        }

      }

    };

    /**
     * @method calculate
     * @static
     */
    Chrome.calculate = function () {
      var
        versions = [],
        nums, int, float, i, limit;

      //Chrome.init();

      if ( typeof version === "undefined" ) {
        // version undefined
        build = "";
        version = -1;
        major = -1;

        if ( Chrome.is() ) {
          // Chrome

          if ( !crios ) {
            // not CriOS
            nums = Browser.app().match(/Chrome\/(\d+)\.(\d+)\.(\d+)\.?(\d+)?/);

            if ( Array.isArray( nums ) ) {
              // 結果が配列
              int = wakegi.int;
              float = wakegi.float;

              for ( i = 1, limit = nums.length; i < limit; i++ ) {

                versions.push( int( nums[ i ], 10 ) );

              }

              build = versions.join( "." );
              major = versions[ 0 ];
              numbers = versions;
              version = float( versions[ 0 ] + "." + versions[ 1 ] + versions[ 2 ] + versions[ 3 ] );

            }// Array

          } else {
            // CriOS からコピー
            build = CriOS.build();
            major = CriOS.major();
            numbers = CriOS.numbers();
            version = CriOS.version();

          }

        }// chrome

      }// undefined

    };

    /**
     * @method is
     * @static
     * @return {boolean}
     */
    Chrome.is = function () {

      Chrome.init();
      return chrome;

    };

    /**
     *
     * @method version
     * @static
     * @return {float} N.NNN で返します
     */
    Chrome.version = function () {

      Chrome.calculate();
      return version;

    };

    /**
     *
     * @method build
     * @static
     * @return {string} NN.NN.NN.NN 型（文字）で返します
     */
    Chrome.build = function () {

      Chrome.calculate();
      return build;

    };

    /**
     * @method major
     * @static
     * @return {int}
     */
    Chrome.major = function () {

      Chrome.calculate();
      return major;

    };

    /**
     * @method numbers
     * @static
     * @return {*[]} [major: int, minor: int, build: int] 形式で返します
     */
    Chrome.numbers = function () {

      Chrome.calculate();
      return numbers;

    };

    return Chrome;
  }() );
}( window ) );