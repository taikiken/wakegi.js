/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/17 - 22:24
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

  Browser.Css3 = ( function (){
    var
      transition,
      transform;

    /**
     * CSS3 detection
     * @class Css3
     * @constructor
     */
    function Css3 () {
      throw new Error( "Css3 can't create instance." );
    }

    var p = Css3.prototype;

    p.constructor = Css3;

    //Css3.init = function () {
    //};
    /**
     * CSS3 transition detection
     * @method transition
     * @static
     * @return {boolean}
     */
    Css3.transition = function () {
      var p;

      if ( typeof transition === "undefined" ) {
        // transition undefined
        p = document.createElement( "p" );
        transition = "transition" in p ||
          "WebkitTransition" in p ||
          "MozTransition" in p ||
          "msTransition" in p ||
          "OTransition" in p;
      }

      return transition;
    };
    /**
     * CSS3 transform detection
     * @method transform
     * @static
     * @return {boolean}
     */
    Css3.transform = function () {
      var p;

      if ( typeof transform === "undefined" ) {
        // transform undefined
        p = document.createElement( "p" );
        transform = "transform" in p ||
          "WebkitTransform" in p ||
          "MozTransform" in p ||
          "OTransform" in p ||
          "msTransform" in p;
      }

      return transform;
    };

    return Css3;
  }() );

}( window ) );