/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/17 - 19:34
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * iOS バージョンチェック他を行います
 *
 * @module Browser
 * @submodule iOS
 */
/*jslint -W016*/
( function ( window ){
  "use strict";
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser;

  Browser.iOS = ( function (){
    var
      numbers = [ -1, -1, -1 ],
      ios,
      iphone,
      ipod,
      ipad,
      webＶiew,
      version, major, build;

    /**
     * iOS detection
     * @class iOS
     * @constructor
     */
    function iOS () {
      throw new Error( 'iOS can\'t create instance.' );
    }

    var p = iOS.prototype;

    p.constructor = iOS;

    /**
     * @method init
     * @static
     */
    iOS.init = function () {

      var ua;

      if ( typeof ios === 'undefined' ) {

        // need initialize
        ua = Browser.ua();

        ipad = !!ua.match(/ipad/i);
        ipod = !!ua.match(/ipod/i);
        iphone = !!ua.match(/iphone/i) && !ipad && !ipod;

        ios = ipad || ipod || iphone;

        // アプリ内コンテンツ
        webＶiew = ios && !iOS.standalone() && !Browser.matchSafari();

      }

    };

    /**
     * @method calculate
     * @static
     */
    iOS.calculate = function () {

      var
        versions = [],
        nums, int, float, i, limit, num;

      if ( typeof version === 'undefined' ) {
        // version undefined
        build = "";
        version = -1;
        major = -1;

        if ( iOS.is() ) {

          nums = Browser.app().match(/OS (\d+)_(\d+)_?(\d+)?/);

          if ( Array.isArray( nums ) ) {
            // 結果が配列
            int = wakegi.int;
            float = wakegi.float;

            for ( i = 1, limit = nums.length; i < limit; i = (i+1)|0 ) {

              num = nums[ i ];

              if ( typeof num !== 'undefined' ) {
                  // num defined
                versions.push( int( num, 10 ) );

              } else {

                versions.push( 0 );

              }

            }

            build = versions.join( '.' );
            major = versions[ 0 ];
            numbers = versions;
            version = float( versions[ 0 ] + '.' + versions[ 1 ] + versions[ 2 ] );

          }// Array

        }//iOS

      }//undefined

    };

    /**
     * @method is
     * @static
     * @return {boolean}
     */
    iOS.is = function () {

      iOS.init();
      return ios;

    };
    /**
     * @method iPhone
     * @static
     * @return {boolean}
     */
    iOS.iPhone = function () {

      iOS.init();
      return iphone;

    };
    /**
     * @method iPad
     * @static
     * @return {boolean}
     */
    iOS.iPad = function () {

      iOS.init();
      return ipad;

    };
    /**
     * @method iPod
     * @static
     * @return {boolean}
     */
    iOS.iPod = function () {

      iOS.init();
      return ipod;

    };
    /**
     * @method standalone
     * @static
     * @return {Function|boolean}
     */
    iOS.standalone = function () {

      var navigator = Browser.navigator();
      return !!navigator.standalone ? navigator.standalone : false;

    };

    /**
     * @method fullScreen
     * @deprecated instead of iOS.standalone
     * @static
     * @return {Function|boolean}
     */
    iOS.fullScreen = function () {

      return iOS.standalone();

    };

    /**
     *
     * @method version
     * @static
     * @return {float} N.NN で返します
     */
    iOS.version = function () {

      iOS.calculate();
      return version;

    };

    /**
     *
     * @method build
     * @static
     * @return {string} NN.NN.NN 型（文字）で返します
     */
    iOS.build = function () {

      iOS.calculate();
      return build;

    };

    /**
     * @method major
     * @static
     * @return {int}
     */
    iOS.major = function () {

      iOS.calculate();
      return major;

    };
    /**
     * @method numbers
     * @static
     * @return {*[]} [major: int, minor: int, build: int] 形式で返します
     */
    iOS.numbers = function () {

      iOS.calculate();
      return numbers;

    };

    /**
     * @method number
     * @deprecated instead of Safari.numbers
     * @static
     * @return {*[]} [major: int, minor: int, build: int] 形式で返します
     */
    iOS.number = function () {

      // 互換のために残します
      return iOS.numbers();

    };
    /**
     * アプリ内ブラウザかどうかを返します
     * @method webView
     * @static
     * @return {boolean}
     */
    iOS.webView = function () {

      iOS.init();
      return webＶiew;

    };

    return iOS;
  }() );
}( window ) );