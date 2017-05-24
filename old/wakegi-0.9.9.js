/*!
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2015/03/17 - 12:37
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * build 2017-5-24 19:01:24
 * version 0.9.9
 * github: https://github.com/taikiken/wakegi.js
 */

/**
 * # Browser 機能を調べる
 * # HTMLElement の CSS class 操作
 *
 * @module wakegi
 * @type {{}|wakegi}
 */

/**
 * builtin 関数を拡張するのを許可
 * `==` 判定許可
 */

/* eslint no-extend-native: 1 */
/* eslint eqeqeq: 1 */
var wakegi = window.wakegi || {};

wakegi.int = parseInt;
wakegi.float = parseFloat;

(function() {
  'use strict';

  // Array.isArray
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
  if ( !Array.isArray ) {
    Array.isArray = function( arg ) {
      return Object.prototype.toString.call( arg ) === '[object Array]';
    };
  }

  // Array.indexOf
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
  // Production steps of ECMA-262, Edition 5, 15.4.4.14
  // Reference: http://es5.github.io/#x15.4.4.14
  if (!Array.prototype.indexOf) {
    // eslint-disable-next-line
    Array.prototype.indexOf = function(searchElement, fromIndex) {

      var k;

      // 1. Let o be the result of calling ToObject passing
      //    the this value as the argument.
      // eslint-disable-next-line
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let lenValue be the result of calling the Get
      //    internal method of o with the argument "length".
      // 3. Let len be ToUint32(lenValue).
      var len = o.length >>> 0;

      // 4. If len is 0, return -1.
      if (len === 0) {
        return -1;
      }

      // 5. If argument fromIndex was passed let n be
      //    ToInteger(fromIndex); else let n be 0.
      var n = +fromIndex || 0;

      if (Math.abs(n) === Infinity) {
        n = 0;
      }

      // 6. If n >= len, return -1.
      if (n >= len) {
        return -1;
      }

      // 7. If n >= 0, then Let k be n.
      // 8. Else, n<0, Let k be len - abs(n).
      //    If k is less than 0, then let k be 0.
      k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      // 9. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ToString(k).
        //   This is implicit for LHS operands of the in operator
        // b. Let kPresent be the result of calling the
        //    HasProperty internal method of o with argument Pk.
        //   This step can be combined with c
        // c. If kPresent is true, then
        //    i.  Let elementK be the result of calling the Get
        //        internal method of o with the argument ToString(k).
        //   ii.  Let same be the result of applying the
        //        Strict Equality Comparison Algorithm to
        //        searchElement and elementK.
        //  iii.  If same is true, return k.
        if (k in o && o[k] === searchElement) {
          return k;
        }
        k++;
      }
      return -1;
    };
  }

  // trim
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
  if (!String.prototype.trim) {
    // eslint-disable-next-line
    String.prototype.trim = function() {
      return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
  }
}());

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
(function(window) {
  'use strict';

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
  function Browser() {
    throw new Error('Browser can\'t create instance.');
  }

  var p = Browser.prototype;

  p.constructor = Browser;
  /**
   * @method init
   * @static
   */
  Browser.init = function() {
    if (typeof ua === 'undefined' || typeof app === 'undefined') {
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
  Browser.navigator = function() {
    return navigator;
  };
  /**
   * @method ua
   * @static
   * @return {*|string} navigator.userAgent を返します
   */
  Browser.ua = function() {
    Browser.init();
    return ua;
  };
  /**
   * @method app
   * @static
   * @return {*|string} navigator.appVersion を返します
   */
  Browser.app = function() {
    Browser.init();
    return app;
  };
  /**
   * userAgent regular expression of Safari
   * @method matchSafari
   * @static
   * @return {boolean} true: Safari
   */
  Browser.matchSafari = function() {
    Browser.init();
    return !!ua.match(/safari/i);
  };

  window.wakegi.Browser = Browser;
}(window));

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
 * Color 関連 utilities
 *
 * @module wakegi
 * @submodule Iro
 *
 * */
( function( window ) {
  'use strict';

  var
    wakegi = window.wakegi,
    Math = window.Math,

    mathFloor = Math.floor,
    mathMax = Math.max,
    mathMin = Math.min,
    mathInt = window.parseInt;

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
  function Iro() {
    throw new Error('Iro can\'t create instance');
  }

  var p = Iro.prototype;
  p.constructor = Iro;

  // https://github.com/less/less.js/blob/master/lib/less/functions.js
  // http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
  /**
   * R, G, B to HSL
   * @method rgb2hsl
   * @static
   * @param {int} r red color number
   * @param {int} g green color number
   * @param {int} b blue color number
   * @return {object} {h: number, s: number, l: number}
   */
  Iro.rgb2hsl = function(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    var
      max = mathMax(r, g, b),
      min = mathMin(r, g, b),
      h, s, l, d;

    l = (max + min) / 2;

    if ( max === min ) {
      // achromatic
      h = 0;
      s = 0;
    } else {
      d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch(max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;

        case g:
          h = ((b - r) / d) + 2;
          break;

        case b:
          h = ((r - g) / d) + 4;
          break;

        default:
          h = 0;
          break;
      }
      h /= 6;
    }
    return { h: h, s: s, l: l };
  };

  /**
   * HUE を RGB 変換します
   * @param {number} point 変換変数
   * @param {number} q 変換変数
   * @param {number} t 変換変数
   * @return {number} 色成分数値を返します 0 ~ 255
   */
  Iro.hue2rgb = function(point, q, t) {
    if (t < 0) {
      t += 1;
    }
    if (t > 1) {
      t -= 1;
    }
    if (t < 1 / 6) {
      return point + (q - point) * 6 * t;
    }
    if (t < 1 / 2) {
      return q;
    }
    if (t < 2 / 3) {
      return point + (q - point) * ((2 / 3) - t) * 6;
    }

    return point;
  };

  /**
   * HSL を RGB 変換します
   * @method hsl2rgb
   * @static
   * @param {number} h Hue
   * @param {number} s Saturation
   * @param {number} l luminance
   * @return {object} {r: number, g: number, b: number}
   */
  Iro.hsl2rgb = function(h, s, l) {
    var r, g, b, q, point;

    if(s === 0) {
      // achromatic
      r = g = b = l;
    } else {
      q = l < 0.5 ? l * (1 + s) : l + s - (l * s);
      point = (2 * l) - q;

      r = Iro.hue2rgb(point, q, h + (1 / 3));
      g = Iro.hue2rgb(point, q, h);
      b = Iro.hue2rgb(point, q, h - (1 / 3));
    }

    return {
      r: mathInt(r * 255, 10),
      g: mathInt(g * 255, 10),
      b: mathInt(b * 255, 10)
    };
  };

  /**
   * RGB を HSV 変換します
   * @method rgb2hsv
   * @static
   * @param {int} r red color number
   * @param {int} g green color number
   * @param {int} b blue color number
   * @return {object} {h: number, s: number, v: number}
   */
  Iro.rgb2hsv = function(r, g, b) {
    var red = r / 255;
    var green = g / 255;
    var blue = b / 255;

    var
      max = mathMax(red, green, blue),
      min = mathMin(red, green, blue),
      h, s,
      v = max,
      d = max - min;

    s = max === 0 ? 0 : d / max;

    if (max === min) {
      // achromatic
      h = 0;
    } else {

      switch (max) {
        case red:
          h = (green - blue) / d + (green < blue ? 6 : 0);
          break;

        case green:
          h = (blue - red) / d + 2;
          break;

        case blue:
          h = (red - green) / d + 4;
          break;

        default:
          h = 0;
          break;
      }
      h /= 6;
    }
    return { h: h, s: s, v: v };
  };

  /**
   * HSV を RGB 変換します
   * @method hsv2rgb
   * @static
   * @param {number} h Hue 色相
   * @param {number} s Saturation 彩度
   * @param {number} v Value 明度
   * @return {object} {r: number, g: number, b: number}
   */
  Iro.hsv2rgb = function( h, s, v ) {
    var
      r, g, b,
      i = mathFloor(h * 6),
      f = h * 6 - i,
      point = v * (1 - s),
      q = v * (1 - f * s),
      t = v * (1 - (1 - f) * s);

    switch ( i % 6 ) {
      case 0:
        r = v;
        g = t;
        b = point;
        break;

      case 1:
        r = q;
        g = v;
        b = point;
        break;

      case 2:
        r = point;
        g = v;
        b = t;
        break;

      case 3:
        r = point;
        g = q;
        b = v;
        break;

      case 4:
        r = t;
        g = point;
        b = v;
        break;

      case 5:
        r = v;
        g = point;
        b = q;
        break;

      default:
        r = 0;
        g = 0;
        b = 0;
        break;
    }

    return {
      r: mathInt(r * 255, 10),
      g: mathInt(g * 255, 10),
      b: mathInt(b * 255, 10)
    };
  };

  // http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
  /**
   * hex CSS shorthand to normal (#0ef -> #00eeff)
   * @method hexShort
   * @static
   * @param {string} hex CSS color 形式
   * @return {string|null} CSS short hand color 形式をフル変換します
   * @see http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
   */
  Iro.hexShort = function(hex) {
    if (typeof hex !== 'string') {
      // order string
      return null;
    }

    var
      shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

    return hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
  };
  /**
   * CSS color 形式文字列を RGB 分解し Object 変換します
   * @method hex2rgb
   * @static
   * @param {string} hex CSS 色設定文字 #ff0000
   * @return {object} {r: number, g: number, b: number}
   */
  Iro.hex2rgb = function(hex) {
    var hexString = Iro.hexShort( hex );
    if (typeof hexString !== 'string') {
      // order string
      return null;
    }
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString);
    return result ?
    {
      r: mathInt(result[1], 16),
      g: mathInt(result[2], 16),
      b: mathInt(result[3], 16)
    } : null;
  };

  /**
   * color(red, green, blue) number を 16進数変換し2桁文字列に変換します
   * @method componentToHex
   * @static
   * @param {number} color color(red, green, blue) number
   * @return {string} 2桁を保障し文字列変換し返します
   */
  Iro.componentToHex = function(color) {
    var hex = color.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  /**
   * color(red, green, blue) number を CSS color 形式文字列へ変換します
   * @method rgb2hex
   * @static
   * @param {int} r red color number
   * @param {int} g green color number
   * @param {int} b blue color number
   * @return {string} CSS color 形式文字列を返します
   */
  Iro.rgb2hex = function(r, g, b) {
    var
      red = Iro.componentToHex(r),
      green = Iro.componentToHex(g),
      blue = Iro.componentToHex(b);
    return '#' + red + green + blue;
  };

  /**
   * convert int to hex, 16777215 -> #ffffff
   * @method int2hex
   * @static
   * @param {number} num 変換元 10進数
   * @return {string} CSS color 16進数型文字列を返します
   */
  Iro.int2hex = function(num) {
    var
      numFloor = mathFloor(num),
      hex = numFloor.toString(16),
      sub,
      i;

    if (hex.length < 6) {
      i = hex.length;
      sub = 6 - i;

      while(sub) {
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
   * @param {string} hex `#fff` な 16進・文字列
   * @return {int|null} hex 文字列を10進数変換し返します
   */
  Iro.hex2int = function(hex) {
    var hexString = Iro.hexShort(hex);
    if (typeof hexString !== 'string') {
      // order string
      return null;
    }
    return mathInt(hexString, 16);
  };

  wakegi.Iro = Iro;
}(window));

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
( function(window) {
  'use strict';
  var wakegi = window.wakegi;

  /**
   * ユーティリティ
   * @class Util
   * @static
   * @constructor
   */
  function Util() {}

  var p = Util.prototype;
  p.constructor = Util;

  /**
   * abc-def を abcDef にします
   *
   * @method camelize
   * @static
   * @param {string} str 変換元文字列
   * @return {string} dash(-)連結 word を camel case へ変換し返します。
   */
  Util.camelize = function( str ) {
    return str.toLowerCase().replace(/-(.)/g, function(match, group1) {
      return group1.toUpperCase();
    });
  };

  /**
   * abcDef を abc-def にします
   *
   * @method dash
   * @static
   * @param {string} str 変換元文字列
   * @return {string} dash 変換後文字列を返します
   */
  Util.dash = function(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  };

  wakegi.Util = Util;
}(window));


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
(function(window) {
  'use strict';

  var
    /**
     * @property patterns
     * @static @private
     * @type {{padding: [*], margin: [*], border-color: [*], border-style: [*], border-width: [*]}}
     */
    patterns = {
      padding: ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'],
      margin: ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'],
      'border-color': ['borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor'],
      'border-style': ['borderTopStyle', 'borderRightStyle', 'borderBottomStyle', 'borderLeftStyle'],
      'border-width': ['borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth']
    };

  /**
   * @class Patterns
   * @static
   * @constructor
   */
  function Patterns() {
    throw new Error('Patterns can\'t create instance');
  }

  var p = Patterns.prototype;
  p.constructor = Patterns;

  /**
   * camel を hyphen に変換
   * @method hyphen
   * @static
   * @param {string} key key 名称(CSS property name)
   * @return {string} hyphen 変換後文字列を返します
   */
  Patterns.hyphen = function(key) {
    return key.replace(/([A-Z])/g, '-$1').toLowerCase();
  };
  /**
   * 引数 key 名称が patterns に存在するかを調べます
   * @method has
   * @static
   * @param {string} key 調べる key 名称(CSS property name)
   * @return {boolean} true: 存在する
   */
  Patterns.has = function(key) {
    var keyName = Patterns.hyphen(key);
    return patterns.hasOwnProperty(keyName);
  };
  /**
   * @method get
   * @static
   * @param {string} key key 名称(CSS property name)
   * @return {Array|undefined} CSS short hand 配列を返します
   */
  Patterns.get = function(key) {
    var keyName = Patterns.hyphen(key);
    return patterns[keyName];
  };
  
  window.wakegi.Patterns = Patterns;
}(window));

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
(function(window) {
  'use strict';

  var
    document = window.document,
    wakegi = window.wakegi,
    Browser = wakegi.Browser,

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
  function Css3() {
    throw new Error('Css3 can\'t create instance.');
  }

  var p = Css3.prototype;
  p.constructor = Css3;

  /**
   * CSS3 transition detection
   *
   * @method transition
   * @static
   * @return {boolean} true: CSS3 transition 使用可能
   */
  Css3.transition = function() {
    var tagP;
    if ( typeof transition === 'undefined' ) {
      // transition undefined
      tagP = document.createElement('p').style;
      transition = 'transition' in tagP ||
        'WebkitTransition' in tagP ||
        'MozTransition' in tagP ||
        'msTransition' in tagP ||
        'OTransition' in tagP;
    }
    return transition;
  };
  /**
   * CSS3 transform detection
   *
   * @method transform
   * @static
   * @return {boolean} true: CSS3 transform 使用可能
   */
  Css3.transform = function() {
    var tagP;
    if (typeof transform === 'undefined') {
      // transform undefined
      tagP = document.createElement('p').style;
      transform = 'transform' in tagP ||
        'WebkitTransform' in tagP ||
        'MozTransform' in tagP ||
        'OTransform' in tagP ||
        'msTransform' in tagP;
    }
    return transform;
  };

  /**
   * matchMedia が使用可能かを調べます
   *
   * @method matchMedia
   * @static
   * @return {boolean} true: matchMedia が使用可能
   */
  Css3.matchMedia = function() {
    if (typeof matchMedia === 'undefined') {
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
   * @return {boolean} true: onorientationchange が使用可能
   */
  Css3.orientationChange = function() {
    if (typeof onorientationchange === 'undefined') {
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
   * @return {boolean} true: orientation が使用可能
   */
  Css3.orientation = function() {
    if (typeof orientation === 'undefined') {
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
   * @return {boolean} true: backgroundSize が使用可能
   */
  Css3.backgroundSize = function() {
    if (typeof backgroundSize === 'undefined') {
      // backgroundSize undefined
      backgroundSize = 'backgroundSize' in document.documentElement.style;
    }
    return backgroundSize;
  };
  
  Browser.Css3 = Css3;
}(window));

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
 * CSS3 transition 使用可能かを判定します
 *
 * @module Browser
 * @submodule Transition
 */
(function(window) {
  'use strict';
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser,
    Css3 = Browser.Css3;

  /**
   * @deprecated instead of Css3
   * @class Transition
   * @static
   * @constructor
   */
  function Transition() {
    throw new Error('Transition can\'t create instance.');
  }

  var p = Transition.prototype;

  p.constructor = Transition;
  /**
   * CSS3 transition 使用可能かを判定します
   * @method is
   * @deprecated instead of Css3.transition
   * @static
   * @return {boolean} true: CSS3 transition 使用可能
   */
  Transition.is = function() {
    return Css3.transition();
  };
  Browser.Transition = Transition;
}(window));

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
 * CSS3 transform 使用可能かを判定します
 *
 * @module Browser
 * @submodule Transform
 */
(function(window) {
  'use strict';
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser,
    Css3 = Browser.Css3;
  /**
   * CSS3 transform 使用可能かを判定します
   * @deprecated instead of Css3
   * @class Transform
   * @static
   * @constructor
   */
  function Transform() {
    throw new Error('Transform can\'t create instance.');
  }

  var p = Transform.prototype;

  p.constructor = Transform;
  /**
   * CSS3 transform 使用可能かを判定します
   * @method is
   * @deprecated instead of Css3.transform
   * @static
   * @return {boolean} true: CSS3 transform 使用可能
   */
  Transform.is = function() {
    return Css3.transform();
  };
  Browser.Transform = Transform;
}(window));

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
(function(window) {
  'use strict';
  var
    document = window.document,
    wakegi = window.wakegi,
    Browser = wakegi.Browser,

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
  function Element() {
    throw new Error('Element can\'t create instance.');
  }

  var p = Element.prototype;
  p.constructor = Element;

  /**
   * touch event が使用可能かを調べます
   *
   * @method touch
   * @static
   * @return {boolean} true: touch event が使用可能
   */
  Element.touch = function() {
    if (typeof touch === 'undefined') {
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
   * @return {boolean} true: querySelector が使用可能
   */
  Element.querySelector = function() {
    if (typeof querySelector === 'undefined') {
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
   * @return {boolean} true: canvas 使用可能
   */
  Element.canvas = function() {
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
   * @return {boolean} true: webgl 使用可能
   */
  Element.webgl = function() {
    if (typeof webgl === 'undefined') {
      // webgl undefined
      webgl = Element.canvas();
      // canvas が使用可能時に webgl 機能を調べる
      if (webgl) {
        try {
          webgl = !!window.WebGLRenderingContext && !!document.createElement('canvas').getContext('experimental-webgl');
        } catch(e) {
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
   * @static
   * @param {string} searchKey `querySelector` で使用するセレクター
   * @return {*} HTMLElement を返します
   */
  Element.find = function( searchKey ) {
    var result;
    if (Element.querySelector()) {
      result = document.querySelector(searchKey);
    }
    return result;
  };

  Browser.Element = Element;
}(window));

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

(function(window) {
  'use strict';

  var
    wakegi = window.wakegi,
    Patterns = wakegi.Patterns;

  /**
   * HTML Element style / class を操作します
   * @class Dom
   * @static
   * @constructor
   * @param {HTMLElement} element 操作対象 Element
   */
  function Dom(element) {
    /**
     * @property element
     * @type {HTMLElement}
     * @private
     */
    this.element = element;
  }

  var p = Dom.prototype;
  p.constructor = Dom;

  // /**
  //  * 使用 Element を返します
  //  * @method element
  //  * @return {HTMLElement}
  //  */
  // p.element = function() {
  //   return this.element;
  // };
  /**
   * CSS class が存在するかを調べます
   * @method hasClass
   * @param {string} className 調査する class name
   * @return {boolean} true CSS class が存在する
   */
  p.hasClass = function(className) {
    return Dom.hasClass(this.element, className);
  };
  /**
   * @method addClass
   * @param {string} className 対象 class 名称
   * @return {boolean} true: 追加成功
   */
  p.addClass = function(className) {
    return Dom.addClass(this.element, className);
  };
  /**
   * @method removeClass
   * @param {string} className 対象 class 名称
   * @return {boolean} true: 削除成功
   */
  p.removeClass = function( className ) {
    return Dom.removeClass(this.element, className);
  };
  /**
   * element の 指定 css property 値を取得します
   * @method style
   * @param {string} [styleProp=''] css property name
   * @return {*} CSS 値
   */
  p.style = function(styleProp) {
    return Dom.getStyle(this.element, styleProp);
  };
  /**
   * CSS class が存在するかを調べます
   * @method hasClass
   * @static
   * @param {HTMLElement} element 操作対象 Element
   * @param {string} className 調査する class name
   * @return {boolean} true: 存在する
   */
  Dom.hasClass = function(element, className) {
    // categoryX があって category で検索すると match するのまずい
    // return !!element.className.match( new RegExp( className, 'i' ) );
    // return !!element.className.match( new RegExp( '^' + className + '$', 'g' ) );
    // return !!element.className.match( new RegExp( '\\' + className + '\\w', 'g' ) );
    var
      elementClass = element.className,
      classes = elementClass.split(' ');

    return classes.indexOf(className) !== -1;
  };
  /**
   * css class を追加します
   * @method addClass
   * @static
   * @param {HTMLElement} element 操作対象 Element
   * @param {string} className 追加する class name
   * @return {boolean} true: 追加した
   */
  Dom.addClass = function(element, className) {
    var
      names = '',
      result = false,
      space;

    if (!Dom.hasClass(element, className)) {
      // 追加 className が not found
      space = '';
      names = element.className;

      if (names !== '') {
        // 既に class 設定されているので 1 space を付与する
        space = ' ';
      }

      names += space + className;
      names = names.split('  ').join(' ');
      element.className = names;
      result = true;
    }

    return result;
  };
  /**
   * element から class を削除します
   * @method removeClass
   * @static
   * @param {HTMLElement} element 操作対象 Element
   * @param {string} className 削除対象 class name
   * @return {boolean} true: 削除した
   */
  Dom.removeClass = function( element, className ) {
    var
      result = false,
      names,
      elementClass,
      classes,
      i, limit,
      currentClass;

    if ( !Dom.hasClass( element, className ) ) {
      return result;
    }

    // @type {string}
    elementClass = element.className;
    // @type {array<string>}
    classes = elementClass.split( ' ' );
    for (i = 0, limit = classes.length; i < limit; i = (i + 1) | 0) {
      currentClass = classes[i];
      if (!currentClass) {
        continue;
      }
      if (currentClass === className) {
        result = true;
        classes[i] = 'XXX_XXX_XXX';
      }
    }
    // XXX_XXX_XXX を削除して 2 spaces を 1 space へ
    names = classes.join(' ').replace('XXX_XXX_XXX', '').split('  ').join(' ');
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
    // remove, start / last white space
    names = names.trim();
    element.className = names;
    return result;
  };
  /**
   * getComputedStyle を使い HTMLElement style value を取得します
   * @method styleCompute
   * @static
   * @param {Object} defaultView `defaultView.getComputedStyle` します
   * @param {HTMLElement} el 調査対象 Element
   * @param {string} [styleProp] CSS property name
   * @return {CSSStyleDeclaration|*|String}
   *    styleProp が null or undefined or "" の時は CSSStyleDeclaration Object<br>
   *    指定されている時は CSS 設定値(string)を返します
   */
  Dom.styleCompute = function( defaultView, el, styleProp ) {
    var
      style = defaultView.getComputedStyle( el, null );

    if ( !!styleProp ) {
      styleProp = styleProp.replace( /([A-Z])/g, '-$1' ).toLowerCase();
      return style.getPropertyValue( styleProp );
    }
    return style;
  };
  /**
   * currentStyle を使い HTMLElement style value を取得します
   * @method styleCurrent
   * @static
   * @param {HTMLElement} el 調査対象 Element
   * @param {string} [styleProp] CSS property name
   * @return {*} HTMLElement style value を返します
   */
  Dom.styleCurrent = function( el, styleProp ) {
    var
      style = el.currentStyle,
      value;

    if (!!styleProp) {
      // IE
      // sanitize property name to camelCase
      styleProp = styleProp.replace(/\-(\w)/g, function( str, letter ) {
        return letter.toUpperCase();
      });

      value = style[styleProp];

      // convert other units to pixels on IE
      if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
        // return (function() {
        //   var
        //     oldLeft = el.style.left,
        //     oldRsLeft = el.runtimeStyle.left;
        //
        //   el.runtimeStyle.left = el.currentStyle.left;
        //   el.style.left = value || 0;
        //   value = el.style.pixelLeft + 'px';
        //   el.style.left = oldLeft;
        //   el.runtimeStyle.left = oldRsLeft;
        //
        //   return value;
        // })();
        return Dom.styleValue(el, value);
      }
      return value;
    }
    return style;
  };
  /**
   * HTMLElement style value を取得します
   * @param {HTMLElement} el 調査対象 Element
   * @param {*} value CSS 値
   * @return {string|*} HTMLElement style value を返します
   */
  Dom.styleValue = function(el, value) {
    var
      oldLeft = el.style.left,
      oldRsLeft = el.runtimeStyle.left;

    el.runtimeStyle.left = el.currentStyle.left;
    el.style.left = value || 0;
    value = el.style.pixelLeft + 'px';
    el.style.left = oldLeft;
    el.runtimeStyle.left = oldRsLeft;

    return value;
  };

  /**
   * CSS 値を取得します
   * @method shortHand
   * @static
   * @param {Object} defaultView `defaultView.getComputedStyle` します
   * @param {HTMLElement} el 調査対象 HTML tag
   * @param {Array} patterns [string, ...]
   * @return {string} CSS 値を返します
   */
  Dom.shortHand = function(defaultView, el, patterns) {
    var
      top = Dom.styleCompute(defaultView, el, patterns[0]),
      right = Dom.styleCompute(defaultView, el, patterns[1]),
      bottom = Dom.styleCompute(defaultView, el, patterns[2]),
      left = Dom.styleCompute(defaultView, el, patterns[3]),
      result = '';

    if (top === bottom) {
      if (right === left) {
        if (top === right) {
          result = top;
        } else {
          result = top + ' ' + right;
        }
      } else {
        result = top + ' ' + right + ' ' + bottom + ' ' + left;
      }
    } else {
      if (right === left) {
        result = top + ' ' + right + ' ' + bottom;
      } else {
        result = top + ' ' + right + ' ' + bottom + ' ' + left;
      }
    }
    return result;
  };
  /**
   * HTMLElement の css style を取得します
   *
   * @TODO: background していない時の background-color が rgb(0, 0, 0) になるのを解決する
   * @method getStyle
   * @static
   * @param {HTMLElement} el 調査対象 HTML tag
   * @param {string} [styleProp] CSS property name
   * @return {*} HTMLElement の css style を返します
   */
  Dom.getStyle = function(el, styleProp) {
    var
      ownerDocument = el.ownerDocument,
      defaultView,
      result;

    if (!!ownerDocument) {
      defaultView = ownerDocument.defaultView;
    }

    if (!!defaultView && !!defaultView.getComputedStyle) {
      result = Dom.styleCompute(defaultView, el, styleProp);

      // Firefox, shorthand css property が常に空になる
      // 再計算を行う
      if (result === '' && !!styleProp && Patterns.has(styleProp)) {
        result = Dom.shortHand(defaultView, el, Patterns.get(styleProp));
      }
    } else if (!!el.currentStyle) {
      result = Dom.styleCurrent(el, styleProp);
    }
    return result;
  };
  wakegi.Dom = Dom;
}(window));

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
/* eslint guard-for-in: 1 */
( function( window ) {

  'use strict';

  var
    wakegi = window.wakegi,

    Util = wakegi.Util;

  /**
   * tag の data属性を key: value 形式に分解します
   * @class Dataset
   * @static
   * @constructor
   */
  function Dataset() {}

  var p = Dataset.prototype;
  p.constructor = Dataset;

  /**
   * 引数 element(HTMLElement) の data属性を object にして返す
   * @method parse
   * @static
   * @param {Element} element HTML document
   * @return {{}} dataset を取得し key: value Objectを返します
   */
  Dataset.parse = function( element ) {
    if (typeof element.dataset !== 'undefined') {
      // dataset property が存在するモダンブラウザの処理
      return Dataset.modern( element );
    } else {
      // レガシーブラウザ処理
      return Dataset.legacy( element );
    }
  };

  /**
   * dataset を取得し key: value Object にします: モダンブラウザ
   * @method modern
   * @static
   * @param {Element} element HTML document
   * @return {{}} dataset を取得し key: value Objectを返します
   */
  Dataset.modern = function( element ) {

    var
      data = element.dataset,
      found = false,
      results = {},
      key, value,
      keyName;

    // eslint-disable-next-line
    for (key in data) {
      keyName = '';
      value = '';

      // Android 2.3 under, dataset object の hasOwnProperty が String型, バカでしょー
      // hasOwnProperty が使えない, function check
      if (typeof data.hasOwnProperty === 'function') {
        if (data.hasOwnProperty(key)) {
          value = data[key];
          keyName = key;
        }
      } else {
        value = data[key];
        keyName = key;
      }// if
      if (!!keyName) {
        found = true;
        results[keyName] = value;
      }
    }
    return found ? results : null;
  };

  /**
   * dataset を取得し key: value Object にします: レガシーブラウザ
   * @method legacy
   * @static
   * @param {Element} element HTML document
   * @return {{}} dataset を取得し key: value Objectを返します
   */
  Dataset.legacy = function(element) {
    var
      data = element.attributes,
      found = false,
      results = {},
      i, limit, attribute, nodeName, dataKey;

    for (i = 0, limit = data.length; i < limit; i = (i + 1) | 0) {
      attribute = data[ i ];
      nodeName = attribute.nodeName.toLowerCase();

      if (nodeName.indexOf('data-') !== -1) {
        dataKey = nodeName.replace('data-', '');
        dataKey = Util.camelize( dataKey );
        found = true;
        results[dataKey] = attribute.nodeValue.toLowerCase();
      }
    }// for
    return found ? results : null;
  };
  wakegi.Dataset = Dataset;
}(window));

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
( function(window) {
  'use strict';
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser,

    phone,
    windows;

  /**
   * windows OS detection
   *
   * @class Windows
   * @static
   * @constructor
   */
  function Windows() {
    throw new Error('Windows can\'t create instance.');
  }

  var p = Windows.prototype;
  p.constructor = Windows;

  /**
   * @method init
   * @static
   */
  Windows.init = function() {
    var ua;

    if (typeof windows === 'undefined') {
      // windows undefined
      ua = Browser.ua();
      windows = !!ua.match(/windows/i);

      if (windows) {
        // 2015-10 windows phone detect added
        // https://msdn.microsoft.com/ja-jp/library/hh869301(v=vs.85).aspx
        // Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; DEVICE INFO) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Mobile Safari/537.36 Edge/12.<OS build number>
        phone = !!ua.match(/windows phone/i);
      } else {
        phone = false;
      }
    }
  };
  /**
   * Windows OS 判定を行います
   * @method is
   * @static
   * @return {boolean} true: Windows OS
   */
  Windows.is = function() {
    Windows.init();
    return windows;
  };
  /**
   * Windows phone 判定を行います
   * @method phone
   * @static
   * @return {boolean} true: Windows phone
   */
  Windows.phone = function() {
    Windows.init();
    return phone;
  };
  Browser.Windows = Windows;
}(window));

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

(function(window) {
  'use strict';
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser,

    numbers = [-1, -1, -1],
    ios,
    iphone,
    ipod,
    ipad,
    webView,
    version, major, build;

  /**
   * iOS detection
   * @class iOS
   * @static
   * @constructor
   */
  function iOS() {
    throw new Error('iOS can\'t create instance.');
  }

  var p = iOS.prototype;

  p.constructor = iOS;

  /**
   * iOS 判定を行います
   * @method init
   * @static
   */
  iOS.init = function() {
    var ua;

    if (typeof ios === 'undefined') {

      // need initialize
      ua = Browser.ua();

      ipad = !!ua.match(/ipad/i);
      ipod = !!ua.match(/ipod/i);
      iphone = !!ua.match(/iphone/i) && !ipad && !ipod;

      ios = ipad || ipod || iphone;

      // アプリ内コンテンツ
      webView = ios && !iOS.standalone() && !Browser.matchSafari();
    }
  };

  /**
   * version No. を計算します
   * @method calculate
   * @static
   */
  iOS.calculate = function() {
    var
      versions = [],
      nums, int, float, i, limit, num;

    if (typeof version === 'undefined') {
      // version undefined
      build = '';
      version = -1;
      major = -1;

      if (iOS.is()) {
        nums = Browser.app().match(/OS (\d+)_(\d+)_?(\d+)?/);

        if (Array.isArray(nums)) {
          // 結果が配列
          int = wakegi.int;
          float = wakegi.float;

          for (i = 1, limit = nums.length; i < limit; i = (i + 1) | 0) {
            num = nums[ i ];

            if (typeof num !== 'undefined') {
              // num defined
              versions.push(int(num, 10));
            } else {
              versions.push(0);
            }
          }

          build = versions.join('.');
          major = versions[0];
          numbers = versions;
          version = float(versions[0] + '.' + versions[1] + versions[2]);
        }// Array
      }// iOS
    }// undefined
  };
  /**
   * iOS 判定
   * @method is
   * @static
   * @return {boolean} true: iOS
   */
  iOS.is = function() {
    iOS.init();
    return ios;
  };
  /**
   * iPhone 判定
   * @method iPhone
   * @static
   * @return {boolean} true: iPhone
   */
  iOS.iPhone = function() {
    iOS.init();
    return iphone;
  };
  /**
   * iPad 判定
   * @method iPad
   * @static
   * @return {boolean} true: iPad
   */
  iOS.iPad = function() {
    iOS.init();
    return ipad;
  };
  /**
   * iPod 判定します
   * @method iPod
   * @static
   * @return {boolean} true: iPod
   */
  iOS.iPod = function() {
    iOS.init();
    return ipod;
  };
  /**
   * standalone で表示しているかを判定します
   * @method standalone
   * @static
   * @return {boolean} true: standalone で表示
   */
  iOS.standalone = function() {
    var navigator = Browser.navigator();
    return !!navigator.standalone ? navigator.standalone : false;
  };

  /**
   * standalone で表示しているかを判定します
   * @method fullScreen
   * @deprecated instead of iOS.standalone
   * @static
   * @return {boolean} true: standalone で表示
   */
  iOS.fullScreen = function() {
    return iOS.standalone();
  };
  /**
   * version: float型で取得します
   * @method version
   * @static
   * @return {float} N.NN で返します
   */
  iOS.version = function() {
    iOS.calculate();
    return version;
  };
  /**
   * version: build ナンバーを含み取得します
   * @method build
   * @static
   * @return {string} NN.NN.NN 型（文字）で返します
   */
  iOS.build = function() {
    iOS.calculate();
    return build;
  };

  /**
   * version: major を取得します
   * @method major
   * @static
   * @return {int} version: major を返します
   */
  iOS.major = function() {
    iOS.calculate();
    return major;
  };
  /**
   * version を配列形式で取得します
   * @method numbers
   * @static
   * @return {*[]} [major: int, minor: int, build: int] 形式で返します
   */
  iOS.numbers = function() {
    iOS.calculate();
    return numbers;
  };
  /**
   * version を配列形式で取得します
   * @method number
   * @deprecated instead of Safari.numbers
   * @static
   * @return {*[]} [major: int, minor: int, build: int] 形式で返します
   */
  iOS.number = function() {
    // 互換のために残します
    return iOS.numbers();
  };
  /**
   * アプリ内ブラウザかどうかを返します
   * **注意** アプリ内ブラウザ(webView)は UA 偽装可能
   * @method webView
   * @static
   * @return {boolean} true: アプリ内ブラウザ
   */
  iOS.webView = function() {
    iOS.init();
    return webView;
  };

  Browser.iOS = iOS;
}(window));

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
(function(window) {
  'use strict';
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser,

    iOS = Browser.iOS,
    mac;

  /**
   * Mac OS detection
   * @class Mac
   * @static
   * @constructor
   */
  function Mac() {
    throw new Error('Mac can\'t create instance.');
  }
  var p = Mac.prototype;
  p.constructor = Mac;
  /**
   * @method init
   * @static
   */
  Mac.init = function() {
    if (typeof mac === 'undefined') {
      // mac undefined
      mac = !iOS.is() && !!Browser.ua().match(/mac os x/i);
    }
  };
  /**
   * Mac OS 判定します
   * @method is
   * @static
   * @return {boolean} true Mac OS
   */
  Mac.is = function() {
    Mac.init();
    return mac;
  };
  Browser.Mac = Mac;
}(window));

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

(function(window) {
  'use strict';
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser,

    Windows = Browser.Windows,
    mathMax = Math.max,
    numbers = [-1, -1, -1],
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
  function Android() {
    throw new Error('Android can\'t create instance.');
  }

  var p = Android.prototype;

  p.constructor = Android;

  /**
   * Android 判定を行います
   * @method init
   * @static
   */
  Android.init = function() {
    var ua, max;

    if (typeof android === 'undefined') {
      // need initialize
      ua = Browser.ua();

      android = !!ua.match(/android/i);
      phone = false;
      tablet = false;
      standard = false;
      hd = false;

      if (Windows.phone()) {
        android = false;
      } else if (android) {
        max = mathMax(window.innerWidth, window.innerHeight);
        hd = max >= 1024;
        // http://googlewebmastercentral.blogspot.jp/2011/03/mo-better-to-also-detect-mobile-user.html
        // Mozilla/5.0 (Linux; U; Android 3.0; en-us; Xoom Build/HRI39) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13
        // Mozilla/5.0 (Linux; U; Android 2.2.1; en-us; Nexus One Build/FRG83) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1

        // 2015-10 windows phone detect added
        // https://msdn.microsoft.com/ja-jp/library/hh869301(v=vs.85).aspx
        // Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; DEVICE INFO) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Mobile Safari/537.36 Edge/12.<OS build number>

        // ua に mobile があり windows phone がない時 Android phone
        phone = !!ua.match(/mobile/i);
        if (!phone) {
          tablet = true;
        }// phone
        // Android 標準ブラウザ
        standard = Browser.matchSafari() && ( !!ua.match(/version/i) || !!ua.match(/samsungbrowser/i) );
      }// android
    }// undefined
  };

  /**
   * version No. を計算します
   * @method calculate
   * @static
   */
  Android.calculate = function() {
    var
      versions = [],
      nums, int, float, i, limit, num;

    if (typeof version === 'undefined') {
      // version undefined
      build = '';
      version = -1;
      major = -1;

      if (Android.is()) {
        nums = Browser.app().match(/Android (\d+)\.(\d+)\.?(\d+)?/);

        if ( Array.isArray( nums ) ) {
          // 結果が配列
          int = wakegi.int;
          float = wakegi.float;

          for (i = 1, limit = nums.length; i < limit; i = (i + 1) | 0) {
            num = nums[i];

            if (typeof num !== 'undefined') {
              // num defined
              versions.push(int(num, 10));
            } else {
              versions.push(0);
            }
          }

          build = versions.join('.');
          major = versions[0];
          numbers = versions;
          version = float(versions[0] + '.' + versions[1] + versions[2]);
        }// Array
      }// Android
    }// undefined
  };
  /**
   * Android 判定を行います
   * @method is
   * @static
   * @return {boolean} true: Android
   */
  Android.is = function() {
    Android.init();
    return android;
  };
  /**
   * Android 標準ブラウザ
   * @method standard
   * @static
   * @return {boolean} true: Android 標準ブラウザ
   */
  Android.standard = function() {
    Android.init();
    return standard;
  };
  /**
   * Android Phone
   * @method phone
   * @static
   * @return {boolean} true: Android phone
   */
  Android.phone = function() {
    Android.init();
    return phone;
  };
  /**
   * Android Tablet
   * @method tablet
   * @static
   * @return {boolean} true: Android tablet
   */
  Android.tablet = function() {
    Android.init();
    return tablet;
  };
  /**
   * Android HD 端末
   * @method hd
   * @static
   * @return {boolean} true: Android HD
   */
  Android.hd = function() {
    Android.init();
    return hd;
  };
  /**
   * version: float型で取得します
   * @method version
   * @static
   * @return {float} N.NN で返します
   */
  Android.version = function() {
    Android.calculate();
    return version;
  };
  /**
   * version: build ナンバーを含み取得します
   * @method build
   * @static
   * @return {string} NN.NN.NN 型（文字）で返します
   */
  Android.build = function() {
    Android.calculate();
    return build;
  };
  /**
   * version: major を取得します
   * @method major
   * @static
   * @return {int} version: major を返します
   */
  Android.major = function() {
    Android.calculate();
    return major;
  };
  /**
   * version を配列形式で取得します
   * @method numbers
   * @static
   * @return {*[]} [major: int, minor: int, build: int] 形式で返します
   */
  Android.numbers = function() {
    Android.calculate();
    return numbers;
  };
  /**
   * version を配列形式で取得します
   * @method number
   * @deprecated instead of Android.numbers
   * @static
   * @return {*[]} [major: int, minor: int, build: int] 形式で返します
   */
  Android.number = function() {
    // 互換のために残します
    return Android.numbers();
  };
  /**
   * window width / height を取得します
   * @method rect
   * @static
   * @return {{width: Number, height: Number}} width / height を Object 形式で返します
   */
  Android.rect = function() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  };
  Browser.Android = Android;
}(window));

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
(function(window) {
  'use strict';
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser,
    Element = Browser.Element;
  /**
   * touch event が利用可能かを調べます
   * @class Touch
   * @static
   * @deprecated instead of Element
   * @constructor
   */
  function Touch() {
    throw new Error('Touch can\'t create instance.');
  }

  var p = Touch.prototype;
  p.constructor = Touch;

  /**
   * touch event が利用可能かを調べます
   * @method is
   * @deprecated instead of Element.touch
   * @static
   * @return {boolean} true: touch event が利用可能
   */
  Touch.is = function() {
    return Element.touch();
  };
  Browser.Touch = Touch;
}(window));

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
(function(window) {
  'use strict';
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser,

    iOS = Browser.iOS,
    Android = Browser.Android,
    Windows = Browser.Windows;

  /**
   * Mobile detection, iOS or Android
   * @class Mobile
   * @static
   * @constructor
   */
  function Mobile() {
    throw new Error('Mobile can\'t create instance.');
  }

  var p = Mobile.prototype;
  p.constructor = Mobile;

  /**
   * iOS / Android / Windows phone 判定
   * @method is
   * @static
   * @return {boolean} true: iOS / Android / Windows phone
   */
  Mobile.is = function() {
    return iOS.is() || Android.is() || Windows.phone();
  };
  /**
   * スマホ・iPod touch 判定を行います
   * @method phone
   * @static
   * @return {boolean} true: スマホ・iPod touch
   */
  Mobile.phone = function() {
    return iOS.iPhone() || iOS.iPod() || Android.phone() || Windows.phone();
  };
  /**
   * tablet 判定を行います
   * @method tablet
   * @static
   * @return {boolean} true: tablet
   */
  Mobile.tablet = function() {
    return iOS.iPad() || Android.tablet();
  };
  /**
   * 強制的にスクロールさせ URL bar を非表示（のように）します
   *
   * **注意** window.onload 後に実行して下さい
   *
   * iOS 9 以降では実行しても無駄です
   * @method hideBar
   * @static
   * @return {number} timer id を返します
   */
  Mobile.hideBar = function() {
    return setTimeout(function() {
      scrollBy(0, 1);
    }, 0);
  };
  /**
   * 強制的にスクロールさせ URL bar を非表示（のように）します
   * @deprecated instead of Mobile.hideBar
   * @method hideURLBar
   * @static
   * @return {number} timer id を返します
   */
  Mobile.hideURLBar = function() {
    return Mobile.hideBar();
  };
  Browser.Mobile = Mobile;
}(window));

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
(function(window) {
  'use strict';

  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser,

    numbers = [-1, -1],
    fxi, version, major, build;

  /**
   * @class FxiOS
   * @static
   * @constructor
   */
  function FxiOS() {
    throw new Error('FxiOS can\'t create instance.');
  }

  var p = FxiOS.prototype;
  p.constructor = FxiOS;

  /**
   * iOS Firefox 判定を行います
   * @method init
   * @static
   */
  FxiOS.init = function() {
    if ( typeof fxi === 'undefined' ) {
      // need initialize
      // check userAgent
      fxi = !!Browser.ua().match(/fxios/i);
    }
  };

  /**
   * version No. を計算します
   * @method calculate
   * @static
   */
  FxiOS.calculate = function() {
    var
      versions = [],
      nums, int, float, i, limit;

    if (typeof version === 'undefined') {
      // version undefined
      build = '';
      version = -1;
      major = -1;

      if (FxiOS.is()) {
        // firefox os
        nums = Browser.ua().match(/FxiOS\/(\d+)\.?(\d+)?/);

        if (Array.isArray(nums)) {
          // 結果が配列
          int = wakegi.int;
          float = wakegi.float;

          for (i = 1, limit = nums.length; i < limit; i = (i + 1) | 0) {
            versions.push(int(nums[i], 10));
          }

          build = versions.join('.');
          major = versions[0];
          version = float(versions[0] + '.' + versions[1]);
          numbers = versions;
        }
      }
    }
  };

  /**
   * iOS Firefox 判定を行います
   * @method is
   * @static
   * @return {boolean} true: iOS Firefox
   */
  FxiOS.is = function() {
    FxiOS.init();
    return fxi;
  };

  /**
   * version: float型で取得します
   * @method version
   * @static
   * @return {float} N.NN で返します
   */
  FxiOS.version = function() {
    FxiOS.calculate();
    return version;
  };

  /**
   * version: major を取得します
   * @method major
   * @static
   * @return {int} version: major を返します
   */
  FxiOS.major = function() {
    FxiOS.calculate();
    return major;
  };

  /**
   * version: build ナンバーを含み取得します
   * @method build
   * @static
   * @return {string} NN.NN.NN.NN 型（文字）で返します
   */
  FxiOS.build = function() {
    FxiOS.calculate();
    return build;
  };

  /**
   * version を配列形式で取得します
   * @method numbers
   * @static
   * @return {*[]} [major: int, minor: int, build: int] 形式で返します
   */
  FxiOS.numbers = function() {
    FxiOS.calculate();
    return numbers;
  };

  Browser.FxiOS = FxiOS;
}(window));

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
 * Windows 10 ~ Edge Browser チェックを行います
 *
 * @module Browser
 * @submodule Edge
 */

( function(window) {
  'use strict';

  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser,

    edge,
    numbers = [-1, -1],
    version, major, build;

  /**
   * Windows 10 Edge Browser チェックを行います
   *
   * @class Edge
   * @static
   * @constructor
   */
  function Edge() {
    throw new Error('Edge can\'t create instance.');
  }

  var p = Edge.prototype;
  p.constructor = Edge;

  /**
   * edge 判定を行います
   * @method init
   * @static
   */
  Edge.init = function() {
    if (typeof edge === 'undefined') {
      edge = !!Browser.ua().match(/edge/i);
    }
  };

  /**
   * version No. を計算します
   * @method calculate
   * @static
   */
  Edge.calculate = function() {

    var
      versions = [],
      nums, int, float, i, limit;

    if ( typeof version === 'undefined' ) {

      build = '';
      version = -1;
      major = -1;

      if (Edge.is()) {
        nums = Browser.ua().match(/edge\/(\d+)\.?(\d+)?/i);

        if (Array.isArray(nums)) {
          // 結果が配列
          int = wakegi.int;
          float = wakegi.float;

          // 先頭削除 Edge/12.n
          for (i = 1, limit = nums.length; i < limit; i = (i + 1) | 0) {
            versions.push(int(nums[i], 10));
          }

          build = versions.join('.');
          major = versions[0];
          version = float( versions[0] + '.' + versions[1 ] );
          numbers = versions;
        }
      }
    }
  };

  /**
   * edge 判定を行います
   * @method is
   * @static
   * @return {boolean} true: Edge
   */
  Edge.is = function() {
    Edge.init();
    return edge;
  };
  /**
   * version: float型で取得します
   * @method version
   * @static
   * @return {float} N.NN で返します
   */
  Edge.version = function() {
    Edge.calculate();
    return version;
  };

  /**
   * version: major を取得します
   * @method major
   * @static
   * @return {int} version: major を返します
   */
  Edge.major = function() {
    Edge.calculate();
    return major;
  };
  /**
   * version: build ナンバーを含み取得します
   * @method build
   * @static
   * @return {string} NN.NN 型（文字）で返します
   */
  Edge.build = function() {
    Edge.calculate();
    return build;
  };
  /**
   * version を配列形式で取得します
   * @method numbers
   * @static
   * @return {[]} [major: int, minor: int] 形式で返します
   */
  Edge.numbers = function() {
    Edge.calculate();
    return numbers;
  };

  Browser.Edge = Edge;
}(window));

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
(function(window) {
  'use strict';
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser,

    ie6, ie7, ie8, ie9, ie10, ie11, ie, version;

  /**
   * IE detection
   * @class IE
   * @static
   * @constructor
   */
  function IE() {
    throw new Error('IE can\'t create instance.');
  }

  var p = IE.prototype;

  p.constructor = IE;

  /**
   * IE 判定を行います
   * @method init
   * @static
   */
  IE.init = function() {
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
   * version No. を計算します
   * @method calculate
   * @static
   */
  IE.calculate = function() {
    IE.init();

    if ( typeof version === 'undefined' ) {
      // version undefined
      version = -1;

      if ( IE.is() ) {
        // IE
        if (ie11) {
          version = 11;
        } else if (ie10) {
          version = 10;
        } else if (ie9) {
          version = 9;
        } else if (ie8) {
          version = 8;
        } else if (ie7) {
          version = 7;
        } else if (ie6) {
          version = 6;
        }
      }// IE
    }// undefined
  };
  /**
   * IE 判定
   * @method is
   * @static
   * @return {boolean} true: IE
   */
  IE.is = function() {
    IE.init();
    return ie;
  };
  /**
   * IE 6判定
   * @method is6
   * @static
   * @return {boolean} true: IE 6
   */
  IE.is6 = function() {
    IE.init();
    return ie6;
  };
  /**
   * IE 7判定
   * @method is7
   * @static
   * @return {boolean} true: IE 7
   */
  IE.is7 = function() {
    IE.init();
    return ie7;
  };
  /**
   * IE 8判定
   * @method is8
   * @static
   * @return {boolean} true: IE 8
   */
  IE.is8 = function() {
    IE.init();
    return ie8;
  };
  /**
   * IE 9判定
   * @method is9
   * @static
   * @return {boolean} true: IE 9
   */
  IE.is9 = function() {
    IE.init();
    return ie9;
  };
  /**
   * IE 10判定
   * @method is10
   * @static
   * @return {boolean} true: IE 10
   */
  IE.is10 = function() {
    IE.init();
    return ie10;
  };
  /**
   * IE 11判定
   * @method is11
   * @static
   * @return {boolean} true: IE11
   */
  IE.is11 = function() {
    IE.init();
    return ie11;
  };
  /**
   * version float型
   * @method version
   * @static
   * @return {float} N.NN で返します
   */
  IE.version = function() {
    IE.calculate();
    return version;
  };
  /**
   * version 正数
   * @method major
   * @static
   * @return {int} version: major を返します
   */
  IE.major = function() {
    return parseInt(IE.version(), 10);
  };
  /**
   * IE 8 or 7 or 6 判定
   * @method legacy
   * @static
   * @return {boolean} true: IE 6 | 7 | 8
   */
  IE.legacy = function() {
    IE.init();
    return ie6 || ie7 || ie8;
  };
  Browser.IE = IE;
}(window));

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
(function(window) {
  'use strict';

  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser,

    numbers = [ -1, -1, -1, -1 ],
    crios, version, major, build;

  /**
   * iOS Chrome 判定
   *
   * @class CriOS
   * @static
   * @constructor
   */
  function CriOS() {
    throw new Error('CriOS can\'t create instance.');
  }

  var p = CriOS.prototype;

  p.constructor = CriOS;

  /**
   * @method init
   * @static
   */
  CriOS.init = function() {
    if (typeof crios === 'undefined') {
      crios = !!Browser.ua().match(/crios/i);
    }
  };

  /**
   * @method calculate
   * @static
   */
  CriOS.calculate = function() {
    var
      versions = [],
      nums, int, float, i, limit;

    if (typeof version === 'undefined') {
      // version undefined
      build = '';
      version = -1;
      major = -1;

      if (CriOS.is()) {
        nums = Browser.app().match(/CriOS\/(\d+)\.(\d+)\.(\d+)\.?(\d+)?/);

        if (Array.isArray(nums)) {
          // 結果が配列
          int = wakegi.int;
          float = wakegi.float;

          for (i = 1, limit = nums.length; i < limit; i = (i + 1) | 0) {
            versions.push(int(nums[i], 10));
          }

          build = versions.join('.');
          major = versions[0];
          numbers = versions;
          version = float(versions[0] + '.' + versions[1] + versions[2] + versions[3]);
        }
      }// crios
    }// undefined
  };
  /**
   * iOS Chrome 判定を行います
   * @method is
   * @static
   * @return {boolean} true: iOS Chrome
   */
  CriOS.is = function() {
    CriOS.init();
    return crios;
  };

  /**
   * version float 形式で取得します
   * @method version
   * @static
   * @return {float} N.NNN で返します
   */
  CriOS.version = function() {
    CriOS.calculate();
    return version;
  };
  /**
   * version: build No. を含み取得します
   * @method build
   * @static
   * @return {string} NN.NN.NN.NN 型（文字）で返します
   */
  CriOS.build = function() {
    CriOS.calculate();
    return build;
  };
  /**
   * version: major を取得します
   * @method major
   * @static
   * @return {int} version major を返します
   */
  CriOS.major = function() {
    CriOS.calculate();
    return major;
  };
  /**
   * @method numbers
   * @static
   * @return {*[]} [major: int, minor: int, build: int] 形式で返します
   */
  CriOS.numbers = function() {
    CriOS.calculate();
    return numbers;
  };
  
  Browser.CriOS = CriOS;
}(window));

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

(function(window) {
  'use strict';
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser,
    
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
  function Chrome() {
    throw new Error('Chrome can\'t create instance.');
  }

  var p = Chrome.prototype;

  p.constructor = Chrome;

  /**
   * @method init
   * @static
   */
  Chrome.init = function() {
    if (typeof chrome === 'undefined') {
      // need initialize
      crios = CriOS.is();
      edge = Edge.is();
      chrome = false;

      if (!edge) {
        if (crios) {
          // iOS Chrome
          chrome = true;
        } else if (!Android.standard()) {
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
  Chrome.calculate = function() {
    var
      versions = [],
      nums, int, float, i, limit;

    if (typeof version === 'undefined') {
      // version undefined
      build = '';
      version = -1;
      major = -1;

      if (Chrome.is()) {
        // Chrome

        if (!crios) {
          // not CriOS
          nums = Browser.app().match(/Chrome\/(\d+)\.(\d+)\.(\d+)\.?(\d+)?/);

          if (Array.isArray(nums)) {
            // 結果が配列
            int = wakegi.int;
            float = wakegi.float;

            for (i = 1, limit = nums.length; i < limit; i = ( i + 1 ) | 0 ) {
              versions.push( int(nums[i], 10));
            }

            build = versions.join('.');
            major = versions[0];
            numbers = versions;
            version = float(versions[0] + '.' + versions[1] + versions[2] + versions[3]);
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
   * Chrome 判定を行います
   * @method is
   * @static
   * @return {boolean} true: Chrome
   */
  Chrome.is = function() {
    Chrome.init();
    return chrome;
  };

  /**
   * version N.NNN を取得します
   * @method version
   * @static
   * @return {float} N.NNN で返します
   */
  Chrome.version = function() {
    Chrome.calculate();
    return version;
  };

  /**
   * version: build type を含み取得します
   * @method build
   * @static
   * @return {string} NN.NN.NN.NN 型（文字）で返します
   */
  Chrome.build = function() {
    Chrome.calculate();
    return build;
  };
  /**
   * version NN を取得します
   * @method major
   * @static
   * @return {int} version NN を返します
   */
  Chrome.major = function() {
    Chrome.calculate();
    return major;
  };
  /**
   * @method numbers
   * @static
   * @return {*[]} [major: int, minor: int, build: int] 形式で返します
   */
  Chrome.numbers = function() {
    Chrome.calculate();
    return numbers;
  };

  Browser.Chrome = Chrome;
}(window));

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

(function(window) {
  'use strict';
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser,

    numbers = [-1, -1],
    firefox, version, major, build;

  /**
   * Firefox detection
   * @class Firefox
   * @static
   * @constructor
   */
  function Firefox() {
    throw new Error('Firefox can\'t create instance.');
  }

  var p = Firefox.prototype;

  p.constructor = Firefox;

  /**
   * Firefox 判定を行います
   * @method init
   * @static
   */
  Firefox.init = function() {
    if (typeof firefox === 'undefined') {
      // need initialize
      // check userAgent
      firefox = !!Browser.ua().match(/firefox/i);
    }
  };

  /**
   * version No. を計算します
   * @method calculate
   * @static
   */
  Firefox.calculate = function() {
    var
      versions = [],
      nums, int, float, i, limit;

    if ( typeof version === 'undefined' ) {
      // version undefined
      build = '';
      version = -1;
      major = -1;

      if (Firefox.is()) {
        // firefox
        nums = Browser.ua().match(/Firefox\/(\d+)\.?(\d+)?/);

        if (Array.isArray(nums)) {
          // 結果が配列
          int = wakegi.int;
          float = wakegi.float;

          for (i = 1, limit = nums.length; i < limit; i = (i + 1) | 0) {
            versions.push(int(nums[i], 10));
          }

          build = versions.join('.');
          major = versions[0];
          version = float(versions[0] + '.' + versions[1]);
          numbers = versions;
        }
      }// firefox
    }// undefined
  };

  /**
   * Firefox 判定を行います
   * @method is
   * @static
   * @return {boolean} true: Firefox
   */
  Firefox.is = function() {
    Firefox.init();
    return firefox;
  };

  /**
   * version: float型で取得します
   * @method version
   * @static
   * @return {float} N.NN で返します
   */
  Firefox.version = function() {
    Firefox.calculate();
    return version;
  };

  /**
   * version: major を取得します
   * @method major
   * @static
   * @return {int} version: major を返します
   */
  Firefox.major = function() {
    Firefox.calculate();
    return major;
  };

  /**
   *  version: build ナンバーを含み取得します
   * @method build
   * @static
   * @return {string} NN.NN.NN.NN 型（文字）で返します
   */
  Firefox.build = function() {
    Firefox.calculate();
    return build;
  };

  /**
   * version を配列形式で取得します
   * @method numbers
   * @static
   * @return {*[]} [major: int, minor: int, build: int] 形式で返します
   */
  Firefox.numbers = function() {
    Firefox.calculate();
    return numbers;
  };

  Browser.Firefox = Firefox;
}(window));

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

(function(window) {
  'use strict';
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser,

    CriOS = Browser.CriOS,
    Chrome = Browser.Chrome,
    Android = Browser.Android,
    FxiOS = Browser.FxiOS,
    Edge = Browser.Edge,
    numbers = [-1, -1, -1],
    crios, chrome, edge, fxios,
    safari, version, major, build;

  /**
   * Safari detection
   * @class Safari
   * @static
   * @constructor
   */
  function Safari() {
    throw new Error('Safari can\'t create instance.');
  }

  var p = Safari.prototype;

  p.constructor = Safari;

  /**
   * Safari 判定を行います
   *
   * Chrome, Edge, iOS Chrome, iOS Firefox の UA が近似しているので比較し判定します
   * @method init
   * @static
   */
  Safari.init = function() {
    if (typeof safari === 'undefined') {
      // need initialize
      crios = CriOS.is();
      chrome = Chrome.is();
      edge = Edge.is();
      fxios = FxiOS.is();

      if (crios || chrome || edge || Android.standard() || fxios) {
        // Chrome(iOS, Android), Android standard
        safari = false;
      } else {
        // check userAgent
        safari = Browser.matchSafari();
      }
    }
  };

  /**
   * version No. を計算します
   * @method calculate
   * @static
   */
  Safari.calculate = function() {
    var
      versions = [],
      nums, int, float, i, limit, num;

    if (typeof version === 'undefined') {
      // version undefined
      build = '';
      version = -1;
      major = -1;

      if (Safari.is()) {
        // Safari
        nums = Browser.app().match(/Version\/(\d+)\.(\d+)\.?(\d+)?/);

        if (Array.isArray(nums)) {
          // 結果が配列
          int = wakegi.int;
          float = wakegi.float;

          for (i = 1, limit = nums.length; i < limit; i = (i + 1) | 0) {
            num = nums[ i ];
            if (typeof num !== 'undefined') {
              // num defined
              versions.push(int(num, 10));
            } else {
              versions.push(0);
            }
          }
          build = versions.join('.');
          version = float( versions[0] + '.' + versions[1] + versions[2] );
          major = versions[0];
          numbers = versions;
        }// Array
      }// safari
    }// undefined
  };
  /**
   * Safari 判定を行います
   * @method is
   * @static
   * @return {boolean} true: Safari
   */
  Safari.is = function() {
    Safari.init();
    return safari;
  };
  /**
   * Safari 判定値を設定します
   * @method set
   * @static
   * @param {boolean} bool 判定フラッグ
   * @return {boolean} 設置値を返します
   */
  Safari.set = function(bool) {
    Safari.init();
    safari = bool;
    return bool;
  };
  /**
   * version: float型で取得します
   * @method version
   * @static
   * @return {float} N.NN で返します
   */
  Safari.version = function() {
    Safari.calculate();
    return version;
  };
  /**
   * version: major を取得します
   * @method major
   * @static
   * @return {int} version: major を返します
   */
  Safari.major = function() {
    Safari.calculate();
    return major;
  };
  /**
   * version: build ナンバーを含み取得します
   * @method build
   * @static
   * @return {string} NN.NN.NN.NN 型（文字）で返します
   */
  Safari.build = function() {
    Safari.calculate();
    return build;
  };
  /**
   * version を配列形式で取得します
   * @method numbers
   * @static
   * @return {*[]} [major: int, minor: int, build: int] 形式で返します
   */
  Safari.numbers = function() {
    Safari.calculate();
    return numbers;
  };
  /**
   * version を配列形式で取得します
   * @method number
   * @deprecated instead of Safari.numbers
   * @static
   * @return {*[]} [major: int, minor: int, build: int] 形式で返します
   */
  Safari.number = function() {
    // 互換のために残します
    return Safari.numbers();
  };

  Browser.Safari = Safari;
}(window));
