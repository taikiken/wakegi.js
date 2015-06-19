/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/17 - 23:00
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * @module Browser
 * @submodule Mac
 */
( function ( window ){
  "use strict";
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser;

  Browser.Mac = ( function (){
    var
      iOS = Browser.iOS,
      mac;

    /**
     * Mac detection
     * @class Mac
     * @constructor
     */
    function Mac () {
      throw new Error( "Mac can't create instance." );
    }

    var p = Mac.prototype;

    p.constructor = Mac;

    /**
     * @method init
     * @static
     */
    Mac.init = function () {

      if ( typeof mac === "undefined" ) {
        // mac undefined
        mac = !iOS.is() && !!Browser.ua().match(/mac os x/i);
      }

    };

    /**
     * @method is
     * @static
     * @return {boolean}
     */
    Mac.is = function () {

      Mac.init();
      return mac;

    };

    return Mac;
  }() );

}( window ) );