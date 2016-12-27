/**
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2015/11/19 - 16:44
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * rgb, hsl, hsv
 *
 * Color 関連 utilties
 *
 * @module wakegi
 * @submodule Iro
 *
 * */
( function( window ) {

  'use strict';

  var
    Math = window.Math;

  window.wakegi.Iro = ( function() {

    var
      //_round = Math.round,
      _floor = Math.floor,
      _max = Math.max,
      _min = Math.min,
      _int = window.parseInt;

    /**
     * 色設定 utility
     *
     * - http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
     * - http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
     * - https://github.com/mbostock/d3/tree/master/src/color
     *
     * `not found`
     * - https://github.com/less/less.js/blob/master/lib/less/functions.js
     *
     * @class Iro
     * @static
     * @constructor
     */
    function Iro () {
      throw new Error( 'Iro can\'t create instance' );
    }

    var p = Iro.prototype;
    p.constructor = Iro;

    // https://github.com/less/less.js/blob/master/lib/less/functions.js
    // http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
    /**
     * R, G, B to HSL
     * @method rgb2hsl
     * @static
     * @param {int} r
     * @param {int} g
     * @param {int} b
     * @returns {object} {h: number, s: number, l: number}
     */
    Iro.rgb2hsl = function( r, g, b ){

      r /= 255;
      g /= 255;
      b /= 255;

      var
        max = _max( r, g, b ),
        min = _min( r, g, b ),
        h, s, l, d;

      l = ( max + min ) / 2;

      if ( max === min ) {

        // achromatic
        h = s = 0;

      } else {

        d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch( max ){
          case r:
            h = ( g - b ) / d + ( g < b ? 6 : 0 );
            break;

          case g:
            h = ( b - r ) / d + 2;
            break;

          case b:
            h = ( r - g ) / d + 4;
            break;
        }

        h /= 6;
      }

      return { h: h, s: s, l: l };

    };

    /**
     * @method hsl2rgb
     * @static
     * @param {number} h
     * @param {number} s
     * @param {number} l
     * @returns {object} {r: number, g: number, b: number}
     */
    Iro.hsl2rgb = function( h, s, l ) {

      var r, g, b, q, p;

      function hue2rgb ( p, q, t ) {

        if ( t < 0 )    { t += 1;}
        if ( t > 1 )    { t -= 1;}
        if ( t < 1/6 )  { return p + ( q - p ) * 6 * t; }
        if ( t < 1/2 )  { return q; }
        if ( t < 2/3 )  { return p + ( q - p ) * ( 2/3 - t ) * 6; }

        return p;

      }

      if( s === 0 ) {

        // achromatic
        r = g = b = l;

      } else {

        q = l < 0.5 ? l * ( 1 + s ) : l + s - l * s;
        p = 2 * l - q;

        r = hue2rgb( p, q, h + 1/3 );
        g = hue2rgb( p, q, h );
        b = hue2rgb( p, q, h - 1/3 );

      }

      return {
        r: _int( r * 255, 10 ),
        g: _int( g * 255, 10 ),
        b: _int( b * 255, 10 )
      };

    };

    /**
     * @method rgb2hsv
     * @static
     * @param {int} r
     * @param {int} g
     * @param {int} b
     * @returns {object} {h: number, s: number, v: number}
     */
    Iro.rgb2hsv = function( r, g, b ) {

      r /= 255;
      g /= 255;
      b /= 255;

      var
        max = _max( r, g, b ),
        min = _min( r, g, b ),
        h, s, v = max,
        d = max - min;

      s = max === 0 ? 0 : d / max;

      if ( max === min ) {

        // achromatic
        h = 0;

      } else {

        switch ( max ) {
          case r:
            h = ( g - b ) / d + ( g < b ? 6 : 0 );
            break;

          case g:
            h = ( b - r ) / d + 2;
            break;

          case b:
            h = ( r - g ) / d + 4;
            break;
        }

        h /= 6;

      }

      return { h: h, s: s, v: v };

    };

    /**
     * @method hsv2rgb
     * @static
     * @param {number} h
     * @param {number} s
     * @param {number} v
     * @returns {object} {r: number, g: number, b: number}
     */
    Iro.hsv2rgb = function( h, s, v ) {

      var
        r, g, b,
        i = _floor( h * 6 ),
        f = h * 6 - i,
        p = v * ( 1 - s ),
        q = v * ( 1 - f * s ),
        t = v * ( 1 - ( 1 - f ) * s );

      switch ( i % 6 ) {
        case 0:
          r = v;
          g = t;
          b = p;
          break;

        case 1:
          r = q;
          g = v;
          b = p;
          break;

        case 2:
          r = p;
          g = v;
          b = t;
          break;

        case 3:
          r = p;
          g = q;
          b = v;
          break;

        case 4:
          r = t;
          g = p;
          b = v;
          break;

        case 5:
          r = v;
          g = p;
          b = q;
          break;
      }

      return {
        r: _int( r * 255, 10 ),
        g: _int( g * 255, 10 ),
        b: _int( b * 255, 10 )
      };

    };

    // http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    /**
     * hex CSS shorthand to normal (#0ef -> #00eeff)
     * @method hexShort
     * @static
     * @param hex
     * @returns {*}
     */
    Iro.hexShort  = function( hex ) {

      if ( typeof hex !== 'string' ) {

        // order string
        return null;

      }

      var
        shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

      return hex.replace( shorthandRegex, function( m, r, g, b ) {
        return r + r + g + g + b + b;
      } );

    };
    /**
     * @method hex2rgb
     * @static
     * @param {string} hex CSS 色設定文字 #ff0000
     * @returns {object} {r: number, g: number, b: number}
     */
    Iro.hex2rgb = function( hex ) {

      hex = Iro.hexShort( hex );

      if ( typeof hex !== 'string' ) {

        // order string
        return null;

      }

      // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
      var
        //shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        result;

      //hex = hex.replace( shorthandRegex, function( m, r, g, b ) {
      //  return r + r + g + g + b + b;
      //} );

      result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex );
      return result ? {
        r: _int( result[ 1 ], 16 ),
        g: _int( result[ 2 ], 16 ),
        b: _int( result[ 3 ], 16 )
      } : null;

    };

    /**
     * @method rgb2hex
     * @static
     * @param {int} r
     * @param {int} g
     * @param {int} b
     * @returns {string}
     */
    Iro.rgb2hex = function( r, g, b ) {

      function componentToHex( c ) {

        var hex = c.toString( 16 );
        return hex.length === 1 ? '0' + hex : hex;

      }

      return '#' + componentToHex( r ) + componentToHex( g ) + componentToHex( b );

    };

    /**
     * convert int to hex, 16777215 -> #ffffff
     * @method int2hex
     * @static
     * @param {number} num
     * @returns {string}
     */
    Iro.int2hex = function( num ) {

      num = _floor( num );

      var
        hex = num.toString( 16 ),
        sub,
        i;

      if ( hex.length < 6 ) {

        i = hex.length;
        sub = 6 - i;

        while( sub ) {

          hex = '0' + hex;
          --sub;

        }

      }

      return '#' + hex;

    };

    /**
     * convert hex to int, #fff -> 16777215
     * @method hex2int
     * @static
     * @param hex
     * @returns {int|null}
     */
    Iro.hex2int = function( hex ) {

      hex = Iro.hexShort( hex );

      if ( typeof hex !== 'string' ) {

        // order string
        return null;

      }

      return _int( hex, 16 );

    };

    return Iro;

  }() );

}( window ) );
