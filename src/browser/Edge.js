/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 15/07/30 - 17:59
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
 * Windows 10 Edge Browser チェックを行います
 *
 * @module Browser
 * @submodule Edge
 */
/*jslint -W016*/
( function ( window ) {

  'use strict';

  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser;

  Browser.Edge = ( function () {

    var
      edge,
      numbers = [ -1, -1 ],
      version, major, build;

    /**
     * Windows 10 Edge Browser チェックを行います
     *
     * @class Edge
     * @static
     * @constructor
     */
    function Edge () {
      throw new Error( 'Edge can\'t create instance.' );
    }

    var p = Edge.prototype;
    p.constructor = Edge;

    /**
     * @method init
     * @static
     */
    Edge.init = function () {

      if ( typeof edge === 'undefined' ) {

        edge = !!Browser.ua().match(/edge/i);

      }

    };

    /**
     * @method calculate
     * @static
     */
    Edge.calculate = function () {

      var
        versions = [],
        nums, int, float, i, limit;

      if ( typeof version === 'undefined' ) {

        build = '';
        version = -1;
        major = -1;

        if ( Edge.is() ) {

          nums = Browser.ua().match(/edge\/(\d+)\.?(\d+)?/i);

          if ( Array.isArray( nums ) ) {

            // 結果が配列
            int = wakegi.int;
            float = wakegi.float;

            // 先頭削除 Edge/12.n
            for ( i = 1, limit = nums.length; i < limit; i = (i+1)|0 ) {

              versions.push( int( nums[ i ], 10 ) );

            }

            build = versions.join( '.' );
            major = versions[ 0 ];
            version = float( versions[ 0 ] + '.' + versions[ 1 ] );
            numbers = versions;

          }

        }

      }

    };

    /**
     * @method is
     * @static
     * @return {boolean}
     */
    Edge.is = function () {

      Edge.init();
      return edge;

    };

    /**
     *
     * @method version
     * @static
     * @return {float} N.NN で返します
     */
    Edge.version = function () {

      Edge.calculate();
      return version;

    };

    /**
     * @method major
     * @static
     * @return {int}
     */
    Edge.major = function () {

      Edge.calculate();
      return major;

    };

    /**
     *
     * @method build
     * @static
     * @return {string} NN.NN 型（文字）で返します
     */
    Edge.build = function () {

      Edge.calculate();
      return build;

    };

    /**
     * @method numbers
     * @static
     * @return {[]} [major: int, minor: int] 形式で返します
     */
    Edge.numbers = function () {

      Edge.calculate();
      return numbers;

    };


    return Edge;

  }() );

}( window ) );