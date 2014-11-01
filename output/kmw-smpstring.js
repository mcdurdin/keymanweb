/*
 (C) 2012 Tavultesoft Pty Ltd

  Adds functions to treat supplementary plane characters in the same 
  way as basic multilingual plane characters in JavaScript.

  Version 0.1

  License

  The contents of this file are subject to the Mozilla Public License
  Version 1.1 (the "License"); you may not use this file except in
  compliance with the License. You may obtain a copy of the License at
  http://www.mozilla.org/MPL/

  Software distributed under the License is distributed on an "AS IS"
  basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
  License for the specific language governing rights and limitations
  under the License.

  The Original Code is (C) 2012 Tavultesoft Pty Ltd.

  The Initial Developer of the Original Code is Tavultesoft.
*/
String.kmwFromCharCode=function(a){var b=[],c;for(c=0;c<arguments.length;c++){var d=Number(arguments[c]);if(!isFinite(d)||0>d||1114111<d||Math.floor(d)!==d)throw new RangeError("Invalid code point "+d);65536>d?b.push(d):(d-=65536,b.push((d>>10)+55296),b.push(d%1024+56320))}return String.fromCharCode.apply(void 0,b)};
String.prototype.kmwCharCodeAt=function(a){var b=""+this,c=0;if(0>a||a>=b.length)return NaN;for(var d=0;d<a;d++)if(c=b.kmwNextChar(c),null===c)return NaN;a=b.charCodeAt(c);return 55296<=a&&(56319>=a&&b.length>c+1)&&(b=b.charCodeAt(c+1),56320<=b&&57343>=b)?(a-55296<<10)+(b-56320)+65536:a};String.prototype.kmwIndexOf=function(a,b){var c=""+this,d=c.indexOf(a,b);if(0>d)return d;for(var e=0,f=0;null!==f&&f<d;f=c.kmwNextChar(f))e++;return e};
String.prototype.kmwLastIndexOf=function(a,b){var c=""+this,d=c.lastIndexOf(a,b);if(0>d)return d;for(var e=0,f=0;null!==f&&f<d;f=c.kmwNextChar(f))e++;return e};String.prototype.kmwLength=function(){var a=""+this;if(0==a.length)return 0;for(var b=0,c=0;null!==c;b++)c=a.kmwNextChar(c);return b};String.prototype.kmwSlice=function(a,b){var c=""+this,d=c.kmwCodePointToCodeUnit(a),e=c.kmwCodePointToCodeUnit(b);return null===d||null===e?"":c.slice(d,e)};
String.prototype.kmwSubstr=function(a,b){var c=""+this;0>a&&(a=c.kmwLength()+a);0>a&&(a=0);var d=c.kmwCodePointToCodeUnit(a),e=d;if(null===d)return"";if(2>arguments.length)e=c.length;else for(var f=0;f<b;f++)e=c.kmwNextChar(e);return null===e?c.substring(d):c.substring(d,e)};
String.prototype.kmwSubstring=function(a,b){var c=""+this,d,e;"undefined"==typeof b?(d=c.kmwCodePointToCodeUnit(a),e=c.length):(a>b&&(d=a,a=b,b=d),d=c.kmwCodePointToCodeUnit(a),e=c.kmwCodePointToCodeUnit(b));if(isNaN(d)||null===d)d=0;if(isNaN(e)||null===e)e=c.length;return c.substring(d,e)};
String.prototype.kmwNextChar=function(a){var b=""+this;if(null===a||0>a||a>=b.length-1)return null;var c=b.charCodeAt(a);return 55296<=c&&(56319>=c&&b.length>a+1)&&(c=b.charCodeAt(a+1),56320<=c&&57343>=c)?a==b.length-2?null:a+2:a+1};String.prototype.kmwPrevChar=function(a){var b=""+this;if(null==a||0>=a||a>b.length)return null;var c=b.charCodeAt(a-1);return 56320<=c&&(57343>=c&&1<a)&&(b=b.charCodeAt(a-2),55296<=b&&56319>=b)?a-2:a-1};
String.prototype.kmwCodePointToCodeUnit=function(a){if(null===a)return null;var b=""+this,c=0;if(0>a){for(var c=b.length,d=0;d>a;d--)c=b.kmwPrevChar(c);return c}if(a==b.kmwLength())return b.length;for(d=0;d<a;d++)c=b.kmwNextChar(c);return c};String.prototype.kmwCodeUnitToCodePoint=function(a){var b=""+this;return null===a?null:0==a?0:0>a?b.substr(a).kmwLength():b.substr(0,a).kmwLength()};String.prototype.kmwCharAt=function(a){return 0<=a?(""+this).kmwSubstr(a,1):""};
String.prototype.kmwBMPNextChar=function(a){return 0>a||a>=(""+this).length-1?null:a+1};String.prototype.kmwBMPPrevChar=function(a){return 0>=a||a>(""+this).length?null:a-1};String.prototype.kmwBMPCodePointToCodeUnit=function(a){return a};String.prototype.kmwBMPCodeUnitToCodePoint=function(a){return a};String.prototype.kmwBMPLength=function(){return(""+this).length};String.prototype.kmwBMPSubstr=function(a,b){var c=""+this;return-1<a?c.substr(a,b):c.substr(c.length+a,-a)};
String.kmwEnableSupplementaryPlane=function(a){var b=String.prototype;String._kmwFromCharCode=a?String.kmwFromCharCode:String.fromCharCode;b._kmwCharAt=a?b.kmwCharAt:b.charAt;b._kmwCharCodeAt=a?b.kmwCharCodeAt:b.charCodeAt;b._kmwIndexOf=a?b.kmwIndexOf:b.indexOf;b._kmwLastIndexOf=a?b.kmwLastIndexOf:b.lastIndexOf;b._kmwSlice=a?b.kmwSlice:b.slice;b._kmwSubstring=a?b.kmwSubstring:b.substring;b._kmwSubstr=a?b.kmwSubstr:b.kmwBMPSubstr;b._kmwLength=a?b.kmwLength:b.kmwBMPLength;b._kmwNextChar=a?b.kmwNextChar:
b.kmwBMPNextChar;b._kmwPrevChar=a?b.kmwPrevChar:b.kmwBMPPrevChar;b._kmwCodePointToCodeUnit=a?b.kmwCodePointToCodeUnit:b.kmwBMPCodePointToCodeUnit;b._kmwCodeUnitToCodePoint=a?b.kmwCodeUnitToCodePoint:b.kmwBMPCodeUnitToCodePoint};