/*!
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2015/03/17 - 12:37
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * build 2015-11-20 22:14:24
 * version 0.9.80
 * github: https://github.com/taikiken/wakegi.js
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

/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/17 - 12:39
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
 * Browser 機能を調べます
 *
 * 互換のために Browser を基点にした Class が存在します
 *
 * @module wakegi
 * @submodule Browser
 */
( function ( window ){
  'use strict';
  var
    wakegi = window.wakegi;

  wakegi.Browser = ( function (){
    var
      navigator = window.navigator,
      ua,
      app;

    /**
     * Browser 基本機能
     *
     * 主要Classの親になります
     *
     * @class Browser
     * @static
     * @constructor
     */
    function Browser () {
      throw new Error( 'Browser can\'t create instance.' );
    }

    var p = Browser.prototype;

    p.constructor = Browser;
    /**
     * @method init
     * @static
     */
    Browser.init = function () {

      if ( typeof ua === 'undefined' || typeof app === 'undefined' ) {
          // ua undefined
        ua = navigator.userAgent;
        app = navigator.appVersion;

      }

    };
    /**
     * @method navigator
     * @static
     * @return {Navigator} window.navigator オブジェクトを返します
     */
    Browser.navigator = function () {
      return navigator;
    };
    /**
     * @method ua
     * @static
     * @return {*|string} navigator.userAgent を返します
     */
    Browser.ua = function () {

      Browser.init();
      return ua;

    };
    /**
     * @method app
     * @static
     * @return {*|string} navigator.appVersion を返します
     */
    Browser.app = function () {

      Browser.init();
      return app;

    };
    /**
     * userAgent regular expression of Safari
     * @method matchSafari
     * @static
     * @return {boolean}
     */
    Browser.matchSafari = function () {

      Browser.init();
      return !!ua.match(/safari/i);

    };


    return Browser;
  }() );
}( window ) );
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
( function ( window ) {

  'use strict';

  var
    Math = window.Math;

  window.wakegi.Iro = ( function () {

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
     * @return {object} {h: number, s: number, l: number}
     */
    Iro.rgb2hsl = function ( r, g, b ){

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
     * @return {object} {r: number, g: number, b: number}
     */
    Iro.hsl2rgb = function ( h, s, l ) {

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
     * @return {object} {h: number, s: number, v: number}
     */
    Iro.rgb2hsv = function ( r, g, b ) {

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
     * @return {object} {r: number, g: number, b: number}
     */
    Iro.hsv2rgb = function ( h, s, v ) {

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
     * @method hex2rgb
     * @static
     * @param {string} hex CSS 色設定文字 #ff0000
     * @return {object} {r: number, g: number, b: number}
     */
    Iro.hex2rgb = function ( hex ) {

      if ( typeof hex !== 'string' ) {

        // order string
        return null;

      }

      // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
      var
        shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        result;

      hex = hex.replace( shorthandRegex, function( m, r, g, b ) {
        return r + r + g + g + b + b;
      } );

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
     * @return {string}
     */
    Iro.rgb2hex = function ( r, g, b ) {

      function componentToHex( c ) {

        var hex = c.toString( 16 );
        return hex.length === 1 ? '0' + hex : hex;

      }

      return '#' + componentToHex( r ) + componentToHex( g ) + componentToHex( b );

    };

    /**
     * @method int2hex
     * @static
     * @param {number} num
     * @return {string}
     */
    Iro.int2hex = function ( num ) {

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

    return Iro;

  }() );

}( window ) );

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
 *
 */

/**
 * CSS3 機能（一部のみ）が使用可能かを調べます
 *
 * @module Browser
 * @submodule Css3
 */
( function ( window ){

  'use strict';

  var
    document = window.document,
    wakegi = window.wakegi,
    Browser = wakegi.Browser;

  Browser.Css3 = ( function (){
    var
      transition,
      transform,
      matchMedia,
      onorientationchange,
      orientation,
      backgroundSize;

    /**
     * CSS3 detection
     * @class Css3
     * @static
     * @constructor
     */
    function Css3 () {
      throw new Error( 'Css3 can\'t create instance.' );
    }

    var p = Css3.prototype;
    p.constructor = Css3;

    //Css3.init = function () {
    //};
    /**
     * CSS3 transition detection
     *
     * @method transition
     * @static
     * @return {boolean}
     */
    Css3.transition = function () {

      var p;

      if ( typeof transition === 'undefined' ) {

        // transition undefined
        p = document.createElement( 'p' ).style;

        transition = 'transition' in p ||
          'WebkitTransition' in p ||
          'MozTransition' in p ||
          'msTransition' in p ||
          'OTransition' in p;

      }

      return transition;

    };
    /**
     * CSS3 transform detection
     *
     * @method transform
     * @static
     * @return {boolean}
     */
    Css3.transform = function () {

      var p;

      if ( typeof transform === 'undefined' ) {

        // transform undefined
        p = document.createElement( 'p' ).style;

        transform = 'transform' in p ||
          'WebkitTransform' in p ||
          'MozTransform' in p ||
          'OTransform' in p ||
          'msTransform' in p;
      }

      return transform;

    };

    /**
     * matchMedia が使用可能かを調べます
     *
     * @method matchMedia
     * @static
     * @return {boolean}
     */
    Css3.matchMedia = function () {

      if ( typeof matchMedia === 'undefined' ) {

        // matchMedia undefined
        matchMedia = typeof window.matchMedia === 'function';

      }

      return matchMedia;
    };
    /**
     * onorientationchange が使用可能かを調べます
     *
     * @method orientationChange
     * @static
     * @return {boolean}
     */
    Css3.orientationChange = function () {

      if ( typeof onorientationchange === 'undefined' ) {

        // onorientationchange undefined
        onorientationchange = 'onorientationchange' in window;

      }

      return onorientationchange;

    };
    /**
     * orientation が使用可能かを調べます
     *
     * @method orientation
     * @static
     * @return {boolean}
     */
    Css3.orientation = function () {

      if ( typeof orientation === 'undefined' ) {

        // orientation undefined
        orientation = 'orientation' in window;

      }

      return orientation;
    };
    /**
     * backgroundSize が使用可能かを調べます
     *
     * @method backgroundSize
     * @static
     * @return {boolean}
     */
    Css3.backgroundSize = function () {

      if ( typeof backgroundSize === 'undefined' ) {

        // backgroundSize undefined
        backgroundSize = 'backgroundSize' in document.documentElement.style;

      }

      return backgroundSize;

    };

    return Css3;
  }() );

}( window ) );
/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/17 - 22:54
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
 * @submodule Transition
 */
( function ( window ){
  'use strict';
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser;

  Browser.Transition = ( function (){
    var
      Css3 = Browser.Css3;

    /**
     * @deprecated instead of Css3
     * @class Transition
     * @static
     * @constructor
     */
    function Transition () {
      throw new Error( 'Transition can\'t create instance.' );
    }

    var p = Transition.prototype;

    p.constructor = Transition;
    /**
     * @method is
     * @deprecated instead of Css3.transition
     * @static
     * @return {boolean}
     */
    Transition.is = function () {

      return Css3.transition();

    };

    return Transition;
  }() );

}( window ) );
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

  'use strict';

  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser;

  Browser.Transform = ( function (){
    var
      Css3 = Browser.Css3;

    /**
     * @deprecated instead of Css3
     * @class Transform
     * @static
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
/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/18 - 13:09
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
 * Browser 毎の Element 機能を調べます
 *
 * @module Browser
 * @submodule Element
 * */
( function ( window ){
  'use strict';
  var
    document = window.document,
    wakegi = window.wakegi,
    Browser = wakegi.Browser;

  Browser.Element = ( function (){
    var
      touch,
      querySelector,
      canvas,
      webgl;

    /**
     * HTMLElement detection
     * @class Element
     * @static
     * @constructor
     */
    function Element () {
      throw new Error( 'Element can\'t create instance.' );
    }

    var p = Element.prototype;

    p.constructor = Element;

    /**
     * touch event が使用可能かを調べます
     *
     * @method touch
     * @static
     * @return {boolean}
     */
    Element.touch = function () {

      if ( typeof touch === 'undefined' ) {
        // touch undefined
        // http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
        // http://stackoverflow.com/questions/2915833/how-to-check-browser-for-touchstart-support-using-js-jquery#answer-2915912
        touch = 'ontouchstart' in document.documentElement;

      }

      return touch;

    };

    /**
     * document.querySelector が使用可能かを調べます
     *
     * @method querySelector
     * @static
     * @return {boolean}
     */
    Element.querySelector = function () {

      if ( typeof querySelector === 'undefined' ) {

        // querySelector undefined
        querySelector = typeof document.querySelector !== 'undefined';

      }

      return querySelector;

    };

    /**
     * canvas 2D が使用可能かを調べます
     *
     * @method canvas
     * @static
     * @return {boolean}
     */
    Element.canvas = function () {

      if ( typeof canvas === 'undefined' ) {

        // querySelector undefined
        canvas = !!window.CanvasRenderingContext2D;

      }

      return canvas;

    };

    /**
     * canvas WebGL が使用可能かを調べます
     *
     * @method webgl
     * @static
     * @return {boolean}
     */
    Element.webgl = function () {

      if ( typeof webgl === 'undefined' ) {

        // webgl undefined
        webgl = Element.canvas();

        if ( webgl ) {

          try {

            webgl = !!window.WebGLRenderingContext && !!document.createElement( 'canvas' ).getContext( 'experimental-webgl' );

          } catch( e ) {

            webgl = false;

          }

        }

      }

      return webgl;

    };

    /**
     * querySelector が使えるブラウザだけ使用可能
     *
     * @method find
     * @param {string} searchKey
     * @return {*} HTMLElement を返します
     */
    Element.find = function ( searchKey ) {

      var result;

      if ( Element.querySelector() ) {

        result = document.querySelector( searchKey );

      }

      return result;

    };

    return Element;
  }() );

}( window ) );
/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/04/02 - 20:40
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
 * HTMLElement へ class を追加・削除・存在確認を行います
 *
 * @module wakegi
 * @submodule Dom
 *
 * */
( function ( window ){
  'use strict';

  var
    //document = window.document,
    wakegi = window.wakegi;

  wakegi.Dom = ( function (){

    var
      Patterns = wakegi.Patterns;

    /**
     * @class Dom
     * @static
     * @constructor
     * @param {HTMLElement} element
     */
    function Dom ( element ) {

      /**
       * @property _element
       * @type {HTMLElement}
       * @private
       */
      this._element = element;

    }

    var p = Dom.prototype;
    p.constructor = Dom;

    /**
     * 使用 Element を返します
     * @method element
     * @return {HTMLElement}
     */
    p.element = function () {

      return this._element;

    };

    /**
     * @method hasClass
     * @param {string} className
     * @return {boolean}
     */
    p.hasClass = function ( className ) {

      return Dom.hasClass( this._element, className );

    };
    /**
     * @method addClass
     * @param {string} className
     * @return {Dom}
     */
    p.addClass = function ( className ) {

      Dom.addClass( this._element, className );
      return this;

    };
    /**
     * @method removeClass
     * @param {string} className
     * @return {Dom}
     */
    p.removeClass = function ( className ) {

      Dom.removeClass( this._element, className );
      return this;

    };
    /**
     * @method style
     * @param {string} [styleProp]
     * @return {*}
     */
    p.style = function ( styleProp ) {

      return Dom.getStyle( this._element, styleProp );

    };
    /**
     * @method hasClass
     * @static
     * @param {HTMLElement} element
     * @param {string} className
     * @return {boolean}
     */
    Dom.hasClass = function ( element, className ) {

      return !!element.className.match( new RegExp( className, 'i' ) );

    };
    /**
     * @method addClass
     * @static
     * @param {HTMLElement} element
     * @param {string} className
     * @return {Dom}
     */
    Dom.addClass = function ( element, className ) {

      var
        names = '',
        space;

      if ( !Dom.hasClass( element, className ) ) {
        // 追加 className が not found
        space = '';
        names = element.className;

        if ( names !== '' ) {
          // 既に class 設定されているので 1 space を付与する
          space = ' ';
        }

        names += space + className;
        names = names.split( '  ' ).join( ' ' );
        element.className = names;

      }

      return Dom;

    };
    /**
     * @method removeClass
     * @static
     * @param {HTMLElement} element
     * @param {string} className
     * @return {Dom}
     */
    Dom.removeClass = function ( element, className ) {

      var
        names = '';

      //console.log( "Element.removeClass ", className, Element.hasClass( element, className ) );

      if ( Dom.hasClass( element, className ) ) {

        // found class name
        names = element.className;
        // class を削除して 2 spaces を 1 space へ
        names = names.replace( className, '' ).split( '  ' ).join( ' ' );

        // 先頭の半角space削除
        if ( names.substr( 0, 1 ) === ' ' ) {

          names = names.substr( 1 );

        }

        if ( names === ' ' ) {
          // space のみになったら空へ
          names = '';

        }

        element.className = names;

      }

      return Dom;

    };
    /**
     * getComputedStyle を使い HTMLElement style value を取得します
     * @method styleCompute
     * @static
     * @param {Object} defaultView
     * @param {HTMLElement} el
     * @param {string} [styleProp]
     * @return {CSSStyleDeclaration|*|String}
     *    styleProp が null or undefined or "" の時は CSSStyleDeclaration Object<br>
     *    指定されている時は CSS 設定値(string)を返します
     */
    Dom.styleCompute = function ( defaultView, el, styleProp ) {

      var
        style = defaultView.getComputedStyle( el, null );

      if ( !!styleProp ) {

        styleProp = styleProp.replace( /([A-Z])/g, "-$1" ).toLowerCase();
        return style.getPropertyValue( styleProp );

      }

      return style;

    };
    /**
     * currentStyle を使い HTMLElement style value を取得します
     * @method styleCurrent
     * @static
     * @param {HTMLElement} el
     * @param {string} [styleProp]
     * @return {*}
     */
    Dom.styleCurrent = function ( el, styleProp ) {

      var
        style = el.currentStyle,
        value;

      if ( !!styleProp ) {
        // IE
        // sanitize property name to camelCase
        styleProp = styleProp.replace(/\-(\w)/g, function( str, letter ) {

          return letter.toUpperCase();

        });

        value = style[ styleProp ];

        // convert other units to pixels on IE
        if ( /^\d+(em|pt|%|ex)?$/i.test( value ) ) {

          return ( function( value ) {

            var
              oldLeft = el.style.left,
              oldRsLeft = el.runtimeStyle.left;

            el.runtimeStyle.left = el.currentStyle.left;
            el.style.left = value || 0;
            value = el.style.pixelLeft + 'px';
            el.style.left = oldLeft;
            el.runtimeStyle.left = oldRsLeft;

            return value;

          } )( value );

        }

        return value;

      }

      return style;

    };

    /**
     * @method shortHand
     * @static
     * @param {Object} defaultView
     * @param {HTMLElement} el
     * @param {Array} patterns [string, ...]
     * @return {string}
     */
    Dom.shortHand = function ( defaultView, el, patterns ) {

      var
        top = Dom.styleCompute( defaultView, el, patterns[ 0 ] ),
        right = Dom.styleCompute( defaultView, el, patterns[ 1 ] ),
        bottom = Dom.styleCompute( defaultView, el, patterns[ 2 ] ),
        left = Dom.styleCompute( defaultView, el, patterns[ 3 ] ),
        result = '';

      if ( top === bottom ) {

        if ( right === left ) {

         if ( top === right ) {

           result = top;

         } else {

           result = top + ' ' + right;

         }

        } else {

          result = top + ' ' + right + ' ' + bottom + ' ' + left;

        }

      } else {

        if ( right === left ) {

          result = top + ' ' + right + ' ' + bottom;

        } else {

          result = top + ' ' + right + ' ' + bottom + ' ' + left;

        }

      }

      return result;

    };

    /**
     * HTMLElement の css style を返します
     * @method getStyle
     * @static
     * @param {HTMLElement} el
     * @param {string} [styleProp]
     * @return {*}
     */
    Dom.getStyle = function ( el, styleProp ) {
      // https://gist.github.com/cms/369133

      //var value, defaultView = el.ownerDocument.defaultView;
      //// W3C standard way:
      //if (defaultView && defaultView.getComputedStyle) {
      //  // sanitize property name to css notation (hyphen separated words eg. font-Size)
      //
      //  styleProp = styleProp.replace( /([A-Z])/g, "-$1" ).toLowerCase();
      //  return defaultView.getComputedStyle( el, null ).getPropertyValue( styleProp );
      //
      //} else if ( el.currentStyle ) {
      //  // IE
      //  // sanitize property name to camelCase
      //  styleProp = styleProp.replace(/\-(\w)/g, function( str, letter ) {
      //    return letter.toUpperCase();
      //  });
      //
      //  value = el.currentStyle[ styleProp ];
      //
      //  // convert other units to pixels on IE
      //  if ( /^\d+(em|pt|%|ex)?$/i.test( value ) ) {
      //
      //    return ( function( value ) {
      //      var oldLeft = el.style.left, oldRsLeft = el.runtimeStyle.left;
      //
      //      el.runtimeStyle.left = el.currentStyle.left;
      //      el.style.left = value || 0;
      //      value = el.style.pixelLeft + "px";
      //      el.style.left = oldLeft;
      //      el.runtimeStyle.left = oldRsLeft;
      //
      //      return value;
      //    } )( value );
      //  }
      //
      //  return value;
      //}

      var
        ownerDocument = el.ownerDocument,
        defaultView,
        result;

      if ( !!ownerDocument ) {

        defaultView = ownerDocument.defaultView;

      }

      if ( !!defaultView && !!defaultView.getComputedStyle ) {

        result = Dom.styleCompute( defaultView, el, styleProp );

        // Firefox, shorthand css property が常に空になる
        // 再計算を行う
        if ( result === '' && !!styleProp && Patterns.has( styleProp ) ) {

          result = Dom.shortHand( defaultView, el, Patterns.get( styleProp ) );

        }

      } else if ( !!el.currentStyle ) {

        result = Dom.styleCurrent( el, styleProp );

      }

      //if ( typeof document.defaultView === 'undefined' || typeof document.defaultView.getComputedStyle === 'undefined' ) {
      //
      //  // document.defaultView undefined
      //  result = Dom.styleCurrent( el, styleProp );
      //
      //} else {
      //
      //  result = Dom.styleCompute( document.defaultView, el, styleProp );
      //
      //}

      return result;

    };

    return Dom;
  }() );

}( window ) );

/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 15/08/20 - 20:26
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * for wakegi.js
 */

/**
 * 文字列操作に使用します
 *
 * @module wakegi
 * @submodule Util
 */
( function ( window ) {

  'use strict';

  //var
  //  document = window.document;

  window.wakegi.Util = ( function () {

    /**
     * @class Util
     * @static
     * @constructor
     */
    function Util () {

    }

    var p = Util.prototype;
    p.constructor = Util;

    /**
     * abc-def を abcDef にします
     *
     * @method camelize
     * @static
     * @param {string} str
     * @return {string} dash(-)連結 word を camel case へ変換し返します。
     */
    Util.camelize = function ( str ) {

      return str.toLowerCase().replace(/-(.)/g, function( match, group1 ) {

        return group1.toUpperCase();

      });

    };

    /**
     * abcDef を abc-def にします
     *
     * @method dash
     * @static
     * @param {string} str
     * @return {string}
     */
    Util.dash = function ( str ) {

      return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

    };

    return Util;

  }() );

}( window ) );
/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 15/08/20 - 19:42
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * for wakegi.js
 */
/**
 * data-xxx を key, value に分解します
 *
 * @module wakegi
 * @submodule Dataset
 */
/* jslint -W089 */
( function ( window ) {

  'use strict';

  var
    wakegi = window.wakegi;

  wakegi.Dataset = ( function () {

    var Util = wakegi.Util;

    /**
     * tag の data属性を key: value 形式に分解します
     * @class Dataset
     * @static
     * @constructor
     */
    function Dataset () {}

    var p = Dataset.prototype;
    p.constructor = Dataset;

    /**
     * 引数 element(HTMLElement) の data属性を object にして返す
     * @method parse
     * @static
     * @param {Element} element
     * @return {{}}
     */
    Dataset.parse = function ( element ) {

      if ( typeof element.dataset !== 'undefined' ) {

        return Dataset.modern( element );

      } else {

        return Dataset.legacy( element );

      }

    };

    /**
     * @method modern
     * @static
     * @param {Element} element
     * @return {{}}
     */
    Dataset.modern = function ( element ) {

      var
        data = element.dataset,
        found = false,
        results = {},
        key, value,
        keyName;

      for( key in data ) {

        keyName = '';
        value = '';

        // Android 2.3 under, dataset object の hasOwnProperty が String型, バカでしょー
        // hasOwnProperty が使えない, function check
        if ( typeof data.hasOwnProperty === 'function' ) {

          if ( data.hasOwnProperty( key ) ) {

            value = data[ key ];
            keyName = key;

          }

        } else {

          value = data[ key ];
          keyName = key;

        }// if

        if ( !!keyName ) {

          found = true;
          results[ keyName ] = value;

        }

      }

      return found ? results : null;

    };

    /**
     * @method legacy
     * @static
     * @param {Element} element
     * @return {{}}
     */
    Dataset.legacy = function ( element ) {

      var
        data = element.attributes,
        found = false,
        results = {},
        i, limit, attribute, nodeName, dataKey;

      for ( i = 0, limit = data.length; i < limit; i = i + 1 ) {

        attribute = data[ i ];
        nodeName = attribute.nodeName.toLowerCase();

        if ( nodeName.indexOf( 'data-' ) !== -1 ) {

          dataKey = nodeName.replace( 'data-', '' );
          dataKey = Util.camelize( dataKey );
          found = true;
          results[ dataKey ] = attribute.nodeValue.toLowerCase();

        }

      }// for

      return found ? results : null;

    };

    return Dataset;

  }() );

}( window ) );
/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/17 - 23:05
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
 * Windows OS チェックを行います
 *
 * @module Browser
 * @submodule Windows
 */
( function ( window ){
  'use strict';
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser;

  Browser.Windows = ( function (){
    var
      phone,
      windows;

    /**
     * windows OS detection
     *
     * @class Windows
     * @static
     * @constructor
     */
    function Windows () {
      throw new Error( 'Windows can\'t create instance.' );
    }

    var p = Windows.prototype;
    p.constructor = Windows;

    /**
     * @method init
     * @static
     */
    Windows.init = function () {

      var ua;

      if ( typeof windows === 'undefined' ) {

        // windows undefined
        ua = Browser.ua();
        windows = !!ua.match(/windows/i);

        if ( windows ) {

          phone = !!ua.match(/windows phone/i);
          if ( phone ) {

            windows = false;

          }

        } else {

          phone = false;

        }

      }

    };

    /**
     * @method is
     * @static
     * @return {boolean}
     */
    Windows.is = function () {

      Windows.init();
      return windows;

    };
    /**
     * @method phone
     * @static
     * @return {boolean}
     */
    Windows.phone = function () {

      Windows.init();
      return phone;

    };

    return Windows;

  }() );

}( window ) );
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
  'use strict';
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
     * @static
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
        build = '';
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
 */

/**
 * Mac OS チェックを行います
 *
 * @module Browser
 * @submodule Mac
 */
( function ( window ){
  'use strict';
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser;

  Browser.Mac = ( function (){

    var
      iOS = Browser.iOS,
      mac;

    /**
     * Mac OS detection
     * @class Mac
     * @static
     * @constructor
     */
    function Mac () {
      throw new Error( 'Mac can\'t create instance.' );
    }

    var p = Mac.prototype;

    p.constructor = Mac;

    /**
     * @method init
     * @static
     */
    Mac.init = function () {

      if ( typeof mac === 'undefined' ) {

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
 */

/**
 * Android のバージョンチェック他を行います
 *
 * @module Browser
 * @submodule Android
 */
/*jslint -W016*/
( function ( window ){
  'use strict';
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser;

  Browser.Android = ( function (){

    var
      Windows = Browser.Windows,
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
     * @static
     * @class Android
     * @constructor
     */
    function Android () {
      throw new Error( 'Android can\'t create instance.' );
    }

    var p = Android.prototype;

    p.constructor = Android;

    /**
     * @method init
     * @static
     */
    Android.init = function () {
      var ua, max;

      if ( typeof android === 'undefined' ) {
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

          // 2015-10 windows phone detect added
          // https://msdn.microsoft.com/ja-jp/library/hh869301(v=vs.85).aspx
          // Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; DEVICE INFO) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Mobile Safari/537.36 Edge/12.<OS build number>
          phone = !!ua.match(/mobile/i) || Windows.phone();

          if ( !phone ) {

            tablet = true;

          }//phone

          // Android 標準ブラウザ
          standard = Browser.matchSafari() && ( !!ua.match(/version/i) || !!ua.match(/samsungbrowser/i) );

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

      if ( typeof version === 'undefined' ) {
        // version undefined
        build = '';
        version = -1;
        major = -1;

        if ( Android.is() ) {

          nums = Browser.app().match(/Android (\d+)\.(\d+)\.?(\d+)?/);

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
/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/17 - 23:16
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
 * touch event が利用可能かを調べます
 *
 * @module Browser
 * @submodule Touch
 */
( function ( window ){
  'use strict';
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser;

  Browser.Touch = ( function (){

    /**
     * @class Touch
     * @static
     * @deprecated instead of Element
     * @constructor
     */
    function Touch () {
      throw new Error( 'Touch can\'t create instance.' );
    }

    var p = Touch.prototype;
    p.constructor = Touch;

    /**
     * @method is
     * @deprecated instead of Element.touch
     * @static
     * @return {boolean}
     */
    Touch.is = function () {

      return Element.touch();

    };

    return Touch;

  }() );

}( window ) );
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
 *
 */

/**
 * mobile (phone, tablet) チェックを行います
 *
 * @module Browser
 * @submodule Mobile
 */
( function ( window ){
  'use strict';
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser;

  Browser.Mobile = ( function (){
    var
      iOS = Browser.iOS,
      Android = Browser.Android,
      Windows = Browser.Windows;

    /**
     * Mobile detection, iOS or Android
     * @class Mobile
     * @static
     * @constructor
     */
    function Mobile () {
      throw new Error( 'Mobile can\'t create instance.' );
    }

    var p = Mobile.prototype;
    p.constructor = Mobile;

    /**
     * @method is
     * @static
     * @return {boolean}
     */
    Mobile.is = function () {

      return iOS.is() || Android.is() || Windows.phone();

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
/**
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 * author (at)taikiken / http://inazumatv.com
 * date 2015/11/18 - 14:38
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
/* jslint -W016 */
/**
 * iOS Firefox チェックを行います
 *
 * @module Browser
 * @submodule FxiOS
 */
( function ( window ) {

  'use strict';

  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser;

  Browser.FxiOS = ( function () {

    var
      numbers = [ -1, -1 ],
      fxi, version, major, build;

    /**
     * @class FxiOS
     * @static
     * @constructor
     */
    function FxiOS () {
      throw new Error( 'FxiOS can\'t create instance.' );
    }
    
    var p = FxiOS.prototype;
    p.constructor = FxiOS;

    /**
     * @method init
     * @static
     */
    FxiOS.init = function () {

      if ( typeof fxi === 'undefined' ) {
        // need initialize

        // check userAgent
        fxi = !!Browser.ua().match(/fxios/i);

      }

    };

    /**
     * @method calculate
     * @static
     */
    FxiOS.calculate = function () {

      var
        versions = [],
        nums, int, float, i, limit;

      if ( typeof version === 'undefined' ) {

        // version undefined
        build = '';
        version = -1;
        major = -1;

        if ( FxiOS.is() ) {

          // firefox os
          nums = Browser.ua().match( /FxiOS\/(\d+)\.?(\d+)?/ );

          if ( Array.isArray( nums ) ) {

            // 結果が配列
            int = wakegi.int;
            float = wakegi.float;

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
    FxiOS.is = function () {

      FxiOS.init();
      return fxi;

    };


    /**
     *
     * @method version
     * @static
     * @return {float} N.NN で返します
     */
    FxiOS.version = function () {

      FxiOS.calculate();
      return version;

    };

    /**
     * @method major
     * @static
     * @return {int}
     */
    FxiOS.major = function () {

      FxiOS.calculate();
      return major;

    };

    /**
     *
     * @method build
     * @static
     * @return {string} NN.NN.NN.NN 型（文字）で返します
     */
    FxiOS.build = function () {

      FxiOS.calculate();
      return build;

    };

    /**
     * @method numbers
     * @static
     * @return {*[]} [major: int, minor: int, build: int] 形式で返します
     */
    FxiOS.numbers = function () {

      FxiOS.calculate();
      return numbers;

    };
    
    return FxiOS;
  
  }() );

}( window ) );
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
/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/17 - 14:16
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
 * IE チェックを行います
 *
 * @module Browser
 * @submodule IE
 */
( function ( window ){
  'use strict';
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser;

  Browser.IE = ( function (){
    var
      ie6, ie7, ie8, ie9, ie10, ie11, ie, version;

    /**
     * IE detection
     * @class IE
     * @static
     * @constructor
     */
    function IE () {
      throw new Error( 'IE can\'t create instance.' );
    }

    var p = IE.prototype;

    p.constructor = IE;

    /**
     * @method init
     * @static
     */
    IE.init = function () {
      var ua;

      if (
        typeof ie === 'undefined' ||
        typeof ie6 === 'undefined' ||
        typeof ie7 === 'undefined' ||
        typeof ie8 === 'undefined' ||
        typeof ie9 === 'undefined' ||
        typeof ie10 === 'undefined' ||
        typeof ie11 === 'undefined'

      ) {

        // need initialize
        ua = Browser.ua();

        ie6 = false;
        ie7 = false;
        ie8 = false;
        ie9 = false;
        ie10 = false;
        ie11 = false;

        ie = !!ua.match(/msie/i);

        if ( ie ) {

          ie10 = !!ua.match(/msie [10]/i);

          if ( !ie10 ) {

            ie9 = !!ua.match(/msie [9]/i);

            if ( !ie9 ) {

              ie8 = !!ua.match(/msie [8]/i);

              if ( !ie8 ) {

                ie7 = !!ua.match(/msie [7]/i);

                if ( !ie7 ) {

                  ie6 = !!ua.match(/msie [6]/i);

                }// ie7

              }// ie8

            }// ie9

          }// ie10

        } else {

          // not /msie/
          ie11 = !!ua.match(/trident\/[7]/i) && !!ua.match(/rv:[11]/i);
          ie = ie11;

        }

      }
    };

    /**
     * @method calculate
     * @static
     */
    IE.calculate = function () {

      IE.init();

      if ( typeof version === 'undefined' ) {

        // version undefined
        version = -1;

        if ( IE.is() ) {
          // IE
          if ( ie11 ) {

            version = 11;

          } else if ( ie10 ) {

            version = 10;

          } else if ( ie9 ) {

            version = 9;

          } else if ( ie8 ) {

            version = 8;

          } else if ( ie7 ) {

            version = 7;

          } else if ( ie6 ) {

            version = 6;

          }

        }// IE

      }// undefined

    };

    /**
     * @method is
     * @static
     * @return {boolean}
     */
    IE.is = function () {

      IE.init();
      return ie;

    };

    /**
     * @method is6
     * @static
     * @return {boolean}
     */
    IE.is6 = function () {

      IE.init();
      return ie6;

    };

    /**
     * @method is7
     * @static
     * @return {boolean}
     */
    IE.is7 = function () {

      IE.init();
      return ie7;

    };

    /**
     * @method is8
     * @static
     * @return {boolean}
     */
    IE.is8 = function () {

      IE.init();
      return ie8;

    };

    /**
     * @method is9
     * @static
     * @return {boolean}
     */
    IE.is9 = function () {

      IE.init();
      return ie9;

    };

    /**
     * @method is10
     * @static
     * @return {boolean}
     */
    IE.is10 = function () {

      IE.init();
      return ie10;

    };

    /**
     * @method is11
     * @static
     * @return {boolean}
     */
    IE.is11 = function () {

      IE.init();
      return ie11;

    };

    /**
     * version float型
     * @method version
     * @static
     * @return {int}
     */
    IE.version = function () {

      IE.calculate();
      return version;

    };

    /**
     * version 正数
     * @method major
     * @static
     * @return {int}
     */
    IE.major = function () {

      return IE.version();

    };

    /**
     * IE 8 or 7 or 6 判定
     * @method legacy
     * @static
     * @return {boolean}
     */
    IE.legacy = function () {

      IE.init();
      return ie6 || ie7 || ie8;

    };

    return IE;
  }() );
}( window ) );
/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/17 - 14:43
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * iOS Chrome
 *
 *
 */

/**
 * iOS Chrome チェックを行います
 *
 * @module Browser
 * @submodule CriOS
 */
/*jslint -W016*/
( function ( window ){
  'use strict';

  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser;

  Browser.CriOS = ( function () {

    var
      numbers = [ -1, -1, -1, -1 ],
      crios, version, major, build;

    /**
     * iOS Chrome 判定
     *
     * @class CriOS
     * @static
     * @constructor
     */
    function CriOS () {
      throw new Error( 'CriOS can\'t create instance.' );
    }

    var p = CriOS.prototype;

    p.constructor = CriOS;

    /**
     * @method init
     * @static
     */
    CriOS.init = function () {

      if ( typeof crios === 'undefined' ) {

        crios = !!Browser.ua().match(/crios/i);

      }

    };

    /**
     * @method calculate
     * @static
     */
    CriOS.calculate = function () {
      var
        versions = [],
        nums, int, float, i, limit;

      //CriOS.init();

      if ( typeof version === 'undefined' ) {
        // version undefined
        build = '';
        version = -1;
        major = -1;

        if ( CriOS.is() ) {

          nums = Browser.app().match(/CriOS\/(\d+)\.(\d+)\.(\d+)\.?(\d+)?/);

          if ( Array.isArray( nums ) ) {
            // 結果が配列
            int = wakegi.int;
            float = wakegi.float;

            for ( i = 1, limit = nums.length; i < limit; i = (i+1)|0 ) {

              versions.push( int( nums[ i ], 10 ) );

            }

            build = versions.join( '.' );
            major = versions[ 0 ];
            numbers = versions;
            version = float( versions[ 0 ] + '.' + versions[ 1 ] + versions[ 2 ] + versions[ 3 ] );

          }

        }// crios

      }// undefined

    };

    /**
     * @method is
     * @static
     * @return {boolean}
     */
    CriOS.is = function () {

      CriOS.init();
      return crios;

    };

    /**
     *
     * @method version
     * @static
     * @return {float} N.NNN で返します
     */
    CriOS.version = function () {

      CriOS.calculate();
      return version;

    };


    /**
     *
     * @method build
     * @static
     * @return {string} NN.NN.NN.NN 型（文字）で返します
     */
    CriOS.build = function () {

      CriOS.calculate();
      return build;

    };

    /**
     * @method major
     * @static
     * @return {int}
     */
    CriOS.major = function () {

      CriOS.calculate();
      return major;

    };

    /**
     * @method numbers
     * @static
     * @return {*[]} [major: int, minor: int, build: int] 形式で返します
     */
    CriOS.numbers = function () {

      CriOS.calculate();
      return numbers;

    };

    return CriOS;
  }() );
}( window ) );
/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/17 - 17:32
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
 * Chrome チェックを行います
 *
 * @module Browser
 * @submodule Chrome
 */
/*jslint -W016*/
( function ( window ){
  'use strict';
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser;

  Browser.Chrome = ( function (){

    var
      CriOS = Browser.CriOS,
      Android = Browser.Android,
      Edge = Browser.Edge,
      numbers = [ -1, -1, -1, -1 ],
      crios,
      edge,
      chrome, version, major, build;

    /**
     * Chrome 判定
     *
     * iOS Chrome も含まれます
     *
     * @class Chrome
     * @static
     * @constructor
     */
    function Chrome () {
      throw new Error( 'Chrome can\'t create instance.' );
    }

    var p = Chrome.prototype;

    p.constructor = Chrome;

    /**
     * @method init
     * @static
     */
    Chrome.init = function () {

      if ( typeof chrome === 'undefined' ) {

        // need initialize
        crios = CriOS.is();
        edge = Edge.is();
        chrome = false;

        if ( !edge ) {

          if ( crios ) {
            // iOS Chrome
            chrome = true;

          } else if ( !Android.standard() ) {

            // check userAgent
            chrome = !!Browser.ua().match(/chrome/i);

          }

        }

      }

    };

    /**
     * @method calculate
     * @static
     */
    Chrome.calculate = function () {

      var
        versions = [],
        nums, int, float, i, limit;

      //Chrome.init();

      if ( typeof version === 'undefined' ) {
        // version undefined
        build = '';
        version = -1;
        major = -1;

        if ( Chrome.is() ) {
          // Chrome

          if ( !crios ) {
            // not CriOS
            nums = Browser.app().match(/Chrome\/(\d+)\.(\d+)\.(\d+)\.?(\d+)?/);

            if ( Array.isArray( nums ) ) {
              // 結果が配列
              int = wakegi.int;
              float = wakegi.float;

              for ( i = 1, limit = nums.length; i < limit; i = (i+1)|0 ) {

                versions.push( int( nums[ i ], 10 ) );

              }

              build = versions.join( '.' );
              major = versions[ 0 ];
              numbers = versions;
              version = float( versions[ 0 ] + '.' + versions[ 1 ] + versions[ 2 ] + versions[ 3 ] );

            }// Array

          } else {
            // CriOS からコピー
            build = CriOS.build();
            major = CriOS.major();
            numbers = CriOS.numbers();
            version = CriOS.version();

          }

        }// chrome

      }// undefined

    };

    /**
     * @method is
     * @static
     * @return {boolean}
     */
    Chrome.is = function () {

      Chrome.init();
      return chrome;

    };

    /**
     *
     * @method version
     * @static
     * @return {float} N.NNN で返します
     */
    Chrome.version = function () {

      Chrome.calculate();
      return version;

    };

    /**
     *
     * @method build
     * @static
     * @return {string} NN.NN.NN.NN 型（文字）で返します
     */
    Chrome.build = function () {

      Chrome.calculate();
      return build;

    };

    /**
     * @method major
     * @static
     * @return {int}
     */
    Chrome.major = function () {

      Chrome.calculate();
      return major;

    };

    /**
     * @method numbers
     * @static
     * @return {*[]} [major: int, minor: int, build: int] 形式で返します
     */
    Chrome.numbers = function () {

      Chrome.calculate();
      return numbers;

    };

    return Chrome;
  }() );
}( window ) );
/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/17 - 18:29
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
 * Firefox チェックを行います
 *
 * @module Browser
 * @submodule Firefox
 */
/*jslint -W016*/
( function ( window ){
  'use strict';
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser;

  Browser.Firefox = ( function (){
    var
      numbers = [ -1, -1 ],
      firefox, version, major, build;

    /**
     * Firefox detection
     * @class Firefox
     * @static
     * @constructor
     */
    function Firefox () {
      throw new Error( 'Firefox can\'t create instance.' );
    }

    var p = Firefox.prototype;

    p.constructor = Firefox;

    /**
     * @method init
     * @static
     */
    Firefox.init = function () {

      if ( typeof firefox === 'undefined' ) {
        // need initialize

        // check userAgent
        firefox = !!Browser.ua().match(/firefox/i);

      }

    };

    /**
     * @method calculate
     * @static
     */
    Firefox.calculate = function () {

      var
        versions = [],
        nums, int, float, i, limit;

      if ( typeof version === 'undefined' ) {

        // version undefined
        build = '';
        version = -1;
        major = -1;

        if ( Firefox.is() ) {
          // firefox

          nums = Browser.ua().match( /Firefox\/(\d+)\.?(\d+)?/ );

          if ( Array.isArray( nums ) ) {

            // 結果が配列
            int = wakegi.int;
            float = wakegi.float;

            for ( i = 1, limit = nums.length; i < limit; i = (i+1)|0 ) {

              versions.push( int( nums[ i ], 10 ) );

            }

            build = versions.join( '.' );
            major = versions[ 0 ];
            version = float( versions[ 0 ] + '.' + versions[ 1 ] );
            numbers = versions;

          }

        }// firefox

      }// undefined

    };

    /**
     * @method is
     * @static
     * @return {boolean}
     */
    Firefox.is = function () {

      Firefox.init();
      return firefox;

    };

    /**
     *
     * @method version
     * @static
     * @return {float} N.NN で返します
     */
    Firefox.version = function () {

      Firefox.calculate();
      return version;

    };

    /**
     * @method major
     * @static
     * @return {int}
     */
    Firefox.major = function () {

      Firefox.calculate();
      return major;

    };

    /**
     *
     * @method build
     * @static
     * @return {string} NN.NN.NN.NN 型（文字）で返します
     */
    Firefox.build = function () {

      Firefox.calculate();
      return build;

    };

    /**
     * @method numbers
     * @static
     * @return {*[]} [major: int, minor: int, build: int] 形式で返します
     */
    Firefox.numbers = function () {

      Firefox.calculate();
      return numbers;

    };

    return Firefox;
  }() );

}( window ) );
/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/17 - 18:06
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
 * Safari チェックを行います
 *
 * @module Browser
 * @submodule Safari
 */
/*jslint -W016*/
( function ( window ){
  'use strict';
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser;

  Browser.Safari = ( function (){
    var
      CriOS = Browser.CriOS,
      Chrome = Browser.Chrome,
      Android = Browser.Android,
      FxiOS = Browser.FxiOS,
      Edge = Browser.Edge,
      numbers = [ -1, -1, -1 ],
      crios, chrome, edge, fxios,
      safari, version, major, build;

    /**
     * Safari detection
     * @class Safari
     * @static
     * @constructor
     */
    function Safari () {
      throw new Error( 'Safari can\'t create instance.' );
    }

    var p = Safari.prototype;

    p.constructor = Safari;

    /**
     * @method init
     * @static
     */
    Safari.init = function () {

      if ( typeof safari === 'undefined' ) {

        // need initialize
        crios = CriOS.is();
        chrome = Chrome.is();
        edge = Edge.is();
        fxios = FxiOS.is();

        if ( crios || chrome || edge || Android.standard() || fxios ) {
          // Chrome(iOS, Android), Android standard
          safari = false;

        } else {
          // check userAgent
          safari = Browser.matchSafari();

        }

      }

    };

    /**
     * @method calculate
     * @static
     */
    Safari.calculate = function () {

      var
        versions = [],
        nums, int, float, i, limit, num;

      if ( typeof version === 'undefined' ) {

        // version undefined
        build = '';
        version = -1;
        major = -1;

        if ( Safari.is() ) {

          // Safari
          nums = Browser.app().match(/Version\/(\d+)\.(\d+)\.?(\d+)?/);

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
            version = float( versions[ 0 ] + '.' + versions[ 1 ] + versions[ 2 ] );
            major = versions[ 0 ];
            numbers = versions;

          }// Array

        }// safari

      }// undefined

    };

    /**
     * @method is
     * @static
     * @return {boolean}
     */
    Safari.is = function () {

      Safari.init();
      return safari;

    };

    /**
     * @method set
     * @static
     * @param {boolean} bool
     */
    Safari.set = function ( bool ) {

      Safari.init();
      safari = bool;
    };

    /**
     *
     * @method version
     * @static
     * @return {float} N.NN で返します
     */
    Safari.version = function () {

      Safari.calculate();
      return version;

    };

    /**
     * @method major
     * @static
     * @return {int}
     */
    Safari.major = function () {

      Safari.calculate();
      return major;

    };

    /**
     *
     * @method build
     * @static
     * @return {string} NN.NN.NN.NN 型（文字）で返します
     */
    Safari.build = function () {

      Safari.calculate();
      return build;

    };

    /**
     * @method numbers
     * @static
     * @return {*[]} [major: int, minor: int, build: int] 形式で返します
     */
    Safari.numbers = function () {

      Safari.calculate();
      return numbers;

    };

    /**
     * @method number
     * @deprecated instead of Safari.numbers
     * @static
     * @return {*[]} [major: int, minor: int, build: int] 形式で返します
     */
    Safari.number = function () {

      // 互換のために残します
      return Safari.numbers();

    };

    return Safari;
  }() );
}( window ) );