/**
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2015/11/20 - 19:07
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
/**
 * CSS shorthand property pattern
 *
 * @module wakegi
 * @submodule Patterns
 *
 * */
( function ( window ) {

  'use strict';

  //var
  //  document = window.document;

  window.wakegi.Patterns = ( function () {

    var
      /**
       * @property _patterns
       * @static
       * @type {{padding: string[], margin: string[], border-color: string[]}}
       * @private
       */
      _patterns = {
        padding: [ 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft' ],
        margin: [ 'marginTop', 'marginRight', 'marginBottom', 'marginLeft' ],
        'border-color': [ 'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor' ],
        'border-style': [ 'borderTopStyle', 'borderRightStyle', 'borderBottomStyle', 'borderLeftStyle' ],
        'border-width': [ 'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth' ]
      };

    /**
     * @class Patterns
     * @static
     * @constructor
     */
    function Patterns () {
      throw new Error( 'Patterns can\'t create instance' );
    }

    var p = Patterns.prototype;
    p.constructor = Patterns;

    /**
     * camel を hyphen に変換
     * @method hyphen
     * @static
     * @param {string} key
     * @return {string}
     */
    Patterns.hyphen = function ( key ) {

      return key.replace( /([A-Z])/g, '-$1' ).toLowerCase();

    };

    /**
     * @method has
     * @static
     * @param {string} key
     * @return {boolean}
     */
    Patterns.has = function ( key ) {

      key = Patterns.hyphen( key );
      return _patterns.hasOwnProperty( key );

    };
    /**
     * @method get
     * @static
     * @param {string} key
     * @return {Array}
     */
    Patterns.get = function ( key ) {

      key = Patterns.hyphen( key );
      return _patterns[ key ];

    };

    return Patterns;

  }() );

}( window ) );
