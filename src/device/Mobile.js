/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/17 - 23:29
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

  Browser.Mobile = ( function (){
    var
      iOS = Browser.iOS,
      Android = Browser.Android;

    /**
     * Mobile detection, iOS or Android
     * @class Mobile
     * @constructor
     */
    function Mobile () {
      throw new Error( "Mobile can't create instance." );
    }

    var p = Mobile.prototype;

    p.constructor = Mobile;

    /**
     * @method is
     * @static
     * @return {boolean}
     */
    Mobile.is = function () {

      return iOS.is() || Android.is();

    };
    /**
     * @method phone
     * @static
     * @return {boolean}
     */
    Mobile.phone = function () {
      return iOS.iPhone() || iOS.iPod() || Android.phone();
    };
    /**
     * @method tablet
     * @static
     * @return {boolean}
     */
    Mobile.tablet = function () {
      return iOS.iPad() || Android.tablet();
    };
    /**
     * window.onload 後に実行して下さい
     * @method hideBar
     * @static
     */
    Mobile.hideBar = function () {
      setTimeout( function (){ scrollBy( 0, 1 ); }, 0 );
    };
    /**
     * @method hideURLBar
     * @deprecated instead of Mobile.hideBar
     * @static
     */
    Mobile.hideURLBar = function () {
      Mobile.hideBar();
    };

      return Mobile;
  }() );
}( window ) );