/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/17 - 22:57
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
 * deprecated instead of Css3
 *
 * @module Browser
 * @submodule Transform
 */
( function ( window ){
  "use strict";
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser;

  Browser.Transform = ( function (){
    var
      Css3 = Browser.Css3;

    /**
     * @deprecated instead of Css3
     * @class Transform
     * @constructor
     */
    function Transform () {
      throw new Error( 'Transform can\'t create instance.' );
    }

    var p = Transform.prototype;

    p.constructor = Transform;
    /**
     * @method is
     * @deprecated instead of Css3.transform
     * @static
     * @return {boolean}
     */
    Transform.is = function () {

      return Css3.transform();

    };

    return Transform;
  }() );

}( window ) );