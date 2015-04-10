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
 */
( function ( window ){
  "use strict";

  var
    document = window.document,
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
      return !!element.className.match( new RegExp( className, "i" ) );
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
        names = "",
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
        names = "";

      //console.log( "Element.removeClass ", className, Element.hasClass( element, className ) );

      if ( Dom.hasClass( element, className ) ) {
        // found class name
        names = element.className;
        // class を削除して 2 spaces を 1 space へ
        names = names.replace( className, "" ).split( "  " ).join( " " );

        if ( names.substr( 0, 1 ) === " " ) {

          names = names.substr( 1 );

        }

        if ( names === " " ) {
          // space のみになったら空へ
          names = "";

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
            var oldLeft = el.style.left, oldRsLeft = el.runtimeStyle.left;

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