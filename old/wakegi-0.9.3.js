/**
 * @license inazumatv.com
 * @author (at)taikiken / http://inazumatv.com
 * @date 2015/03/17 - 12:37
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * @build 2015-07-30 19:29:29
 * @version 0.9.3
 *
 * @module wakegi
 */
var wakegi = wakegi || {};

wakegi.int = parseInt;
wakegi.float = parseFloat;

( function (){
  "use strict";

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
 * @module wakegi
 * @submodule Browser
 */
( function ( window ){
  "use strict";
  var
    wakegi = window.wakegi;

  wakegi.Browser = ( function (){
    var
      navigator = window.navigator,
      ua,
      app;

    /**
     * Browser 基本機能
     * @class Browser
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
 * @module Browser
 * @submodule Css3
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
      transform,
      matchMedia,
      onorientationchange,
      orientation,
      backgroundSize;

    /**
     * CSS3 detection
     * @class Css3
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
     * @method transition
     * @static
     * @return {boolean}
     */
    Css3.transition = function () {

      var p;

      if ( typeof transition === 'undefined' ) {

        // transition undefined
        p = document.createElement( "p" ).style;

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

      if ( typeof transform === 'undefined' ) {

        // transform undefined
        p = document.createElement( "p" ).style;

        transform = "transform" in p ||
          "WebkitTransform" in p ||
          "MozTransform" in p ||
          "OTransform" in p ||
          "msTransform" in p;
      }

      return transform;

    };

    /**
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
 * @module Browser
 * @submodule Transition
 */
( function ( window ){
  "use strict";
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser;

  Browser.Transition = ( function (){
    var
      Css3 = Browser.Css3;

    /**
     * @deprecated instead of Css3
     * @class Transition
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
 * @module Browser
 * @submodule Element
 */
( function ( window ){
  "use strict";
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
     * @constructor
     */
    function Element () {
      throw new Error( 'Element can\'t create instance.' );
    }

    var p = Element.prototype;

    p.constructor = Element;

    /**
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
 * @module wakegi
 * @submodule Dom
 */
( function ( window ){
  "use strict";

  var
    //document = window.document,
    wakegi = window.wakegi;

  wakegi.Dom = ( function (){

    /**
     * @class Dom
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
        space = "";
        names = element.className;

        if ( names !== "" ) {
          // 既に class 設定されているので 1 space を付与する
          space = " ";
        }

        names += space + className;
        names = names.split( "  " ).join( " " );
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
            value = el.style.pixelLeft + "px";
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
        defaultView = el.ownerDocument.defaultView,
        result;

      if ( !!defaultView && !!defaultView.getComputedStyle ) {

        result = Dom.styleCompute( defaultView, el, styleProp );

      } else if ( !!el.currentStyle ) {

        result = Dom.styleCurrent( el, styleProp );

      }

      return result;

    };

    return Dom;
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
 * @module Browser
 * @submodule iOS
 */
/*jslint -W016*/
( function ( window ){
  "use strict";
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
        build = "";
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
 * date 2015/03/17 - 21:16
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * @module Browser
 * @submodule Android
 */
/*jslint -W016*/
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
 * @module Browser
 * @submodule Touch
 */
( function ( window ){
  "use strict";
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser;

  Browser.Touch = ( function (){

    /**
     * @class Touch
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
 * @module Browser
 * @submodule Mobile
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
 * date 2015/03/17 - 23:05
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * @module Browser
 * @submodule Windows
 */
( function ( window ){
  "use strict";
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser;

  Browser.Windows = ( function (){
    var
      windows;

    /**
     * windows detection
     * @class Windows
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

      if ( typeof windows === 'undefined' ) {
        // windows undefined
        windows = !!Browser.ua().match(/windows/i);
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

    return Windows;
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
 * @module Browser
 * @submodule Edge
 */
/*jslint -W016*/
( function ( window ) {

  "use strict";

  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser;

  Browser.Edge = ( function () {

    var
      edge,
      numbers = [ -1, -1 ],
      version, major, build;

    function Edge () {
      throw new Error( 'Edge can\'t create instance.' );
    }

    var p = Edge.prototype;
    p.constructor = Edge;

    Edge.init = function () {

      if ( typeof edge === 'undefined' ) {

        edge = !!Browser.ua().match(/edge/i);

      }

    };

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
     * @return {string} NN.NN.NN.NN 型（文字）で返します
     */
    Edge.build = function () {

      Edge.calculate();
      return build;

    };

    /**
     * @method numbers
     * @static
     * @return {*[]} [major: int, minor: int, build: int] 形式で返します
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
 * @module Browser
 * @submodule IE
 */
( function ( window ){
  "use strict";
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser;

  Browser.IE = ( function (){
    var
      ie6, ie7, ie8, ie9, ie10, ie11, ie, version;

    /**
     * IE detection
     * @class IE
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
 * @module Browser
 * @submodule CriOS
 */
/*jslint -W016*/
( function ( window ){
  "use strict";

  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser;

  Browser.CriOS = ( function () {

    var
      numbers = [ -1, -1, -1, -1 ],
      crios, version, major, build;

    /**
     * iOS Chrome 判定
     * @class CriOS
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
        build = "";
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
 * @module Browser
 * @submodule Chrome
 */
/*jslint -W016*/
( function ( window ){
  "use strict";
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
     * @class Chrome
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
        build = "";
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
 * @module Browser
 * @submodule Firefox
 */
/*jslint -W016*/
( function ( window ){
  "use strict";
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
 * @module Browser
 * @submodule Safari
 */
/*jslint -W016*/
( function ( window ){
  "use strict";
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser;

  Browser.Safari = ( function (){
    var
      CriOS = Browser.CriOS,
      Chrome = Browser.Chrome,
      Android = Browser.Android,
      Edge = Browser.Edge,
      numbers = [ -1, -1, -1 ],
      crios, chrome, edge,
      safari, version, major, build;

    /**
     * Safari detection
     * @class Safari
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

        if ( crios || chrome || edge || Android.standard() ) {
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
        build = "";
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