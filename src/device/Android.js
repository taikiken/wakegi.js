/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/17 - 21:16
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

  Browser.Android = ( function (){
    var
      _max = Math.max,
      numbers = [ -1, -1, -1 ],
      standard,
      android,
      phone,
      tablet,
      hd,
      version, major, build;

    /**
     * Android detection
     * @class Android
     * @constructor
     */
    function Android () {
      throw new Error( "Android can't create instance." );
    }

    var p = Android.prototype;

    p.constructor = Android;

    /**
     * @method init
     * @static
     */
    Android.init = function () {
      var ua, max;

      if ( typeof android === "undefined" ) {
        // need initialize
        ua = Browser.ua();

        android = !!ua.match(/android/i);
        phone = false;
        tablet = false;
        standard = false;
        hd = false;

        if ( android ) {

          max = _max( window.innerWidth,  window.innerHeight );
          hd = max >= 1024;
          // http://googlewebmastercentral.blogspot.jp/2011/03/mo-better-to-also-detect-mobile-user.html
          phone = !!ua.match(/mobile/i);

          if ( !phone ) {

            tablet = true;

          }//phone

          // Android 標準ブラウザ
          standard = Browser.matchSafari() && !!ua.match(/version/i);

        }//android

      }//undefined

    };

    /**
     * @method calculate
     * @static
     */
    Android.calculate = function () {
      var
        versions = [],
        nums, int, float, i, limit, num;

      if ( typeof version === "undefined" ) {
        // version undefined
        build = "";
        version = -1;
        major = -1;

        if ( Android.is() ) {

          nums = Browser.app().match(/Android (\d+)\.(\d+)\.?(\d+)?/);

          if ( Array.isArray( nums ) ) {
            // 結果が配列
            int = wakegi.int;
            float = wakegi.float;

            for ( i = 1, limit = nums.length; i < limit; i++ ) {

              num = nums[ i ];

              if ( typeof num !== "undefined" ) {
                // num defined
                versions.push( int( num, 10 ) );

              } else {

                versions.push( 0 );

              }

            }

            build = versions.join( "." );
            major = versions[ 0 ];
            numbers = versions;
            version = float( versions[ 0 ] + "." + versions[ 1 ] + versions[ 2 ] );

          }// Array

        }// Android
      }// undefined
    };

    /**
     * @method is
     * @static
     * @return {boolean}
     */
    Android.is = function () {

      Android.init();
      return android;

    };

    /**
     * Android 標準ブラウザ
     * @method standard
     * @static
     * @return {boolean}
     */
    Android.standard = function () {

      Android.init();
      return standard;

    };

    /**
     * Android Phone
     * @method phone
     * @static
     * @return {boolean}
     */
    Android.phone = function () {

      Android.init();
      return phone;

    };

    /**
     * Android Tablet
     * @method tablet
     * @static
     * @return {boolean}
     */
    Android.tablet = function () {

      Android.init();
      return tablet;

    };

    /**
     * Android HD 端末
     * @method hd
     * @static
     * @return {boolean}
     */
    Android.hd = function () {

      Android.init();
      return hd;

    };

    /**
     *
     * @method version
     * @static
     * @return {float} N.NN で返します
     */
    Android.version = function () {

      Android.calculate();
      return version;

    };

    /**
     *
     * @method build
     * @static
     * @return {string} NN.NN.NN 型（文字）で返します
     */
    Android.build = function () {

      Android.calculate();
      return build;

    };

    /**
     * @method major
     * @static
     * @return {int}
     */
    Android.major = function () {

      Android.calculate();
      return major;

    };
    /**
     * @method numbers
     * @static
     * @return {*[]} [major: int, minor: int, build: int] 形式で返します
     */
    Android.numbers = function () {

      Android.calculate();
      return numbers;

    };

    /**
     * @method number
     * @deprecated instead of Android.numbers
     * @static
     * @return {*[]} [major: int, minor: int, build: int] 形式で返します
     */
    Android.number = function () {
      // 互換のために残します
      return Android.numbers();

    };

    return Android;
  }() );
}( window ) );