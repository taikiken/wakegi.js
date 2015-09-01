/**
 * @license inazumatv.com
 * @author (at)taikiken / http://inazumatv.com
 * @date 2015/03/17 - 12:37
 *
 * Copyright (c) 2011-@@year inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * @build @@buildTime
 * @version @@version
 *
 */

/**
 * # Browser 機能を調べる
 * # HTMLElement の CSS class 操作
 *
 * @module wakegi
 * @type {{}|wakegi}
 */

var wakegi = wakegi || {};

wakegi.int = parseInt;
wakegi.float = parseFloat;

( function (){
  'use strict';

  // Array.isArray
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
  if ( !Array.isArray ) {

    Array.isArray = function( arg ) {

      return Object.prototype.toString.call( arg ) === '[object Array]';

    };
  }

}() );
