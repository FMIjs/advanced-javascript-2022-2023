/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";class t extends HTMLAnchorElement{constructor(){super()}clickHandler(t){t.preventDefault(),this.dispatchEvent(new CustomEvent("app-render",{detail:this.href.replace(window.location.origin,""),bubbles:!0}))}connectedCallback(){this.addEventListener("click",this.clickHandler)}disconnectedCallback(){this.removeEventListener("click",this.clickHandler)}}function e(t){return t.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function i(t){return t&&t.sensitive?"":"i"}function s(t,s,n){return function(t,s,n){void 0===n&&(n={});for(var o=n.strict,r=void 0!==o&&o,l=n.start,a=void 0===l||l,h=n.end,c=void 0===h||h,d=n.encode,u=void 0===d?function(t){return t}:d,p=n.delimiter,v=void 0===p?"/#?":p,f=n.endsWith,$="[".concat(e(void 0===f?"":f),"]|$"),_="[".concat(e(v),"]"),A=a?"^":"",m=0,g=t;m<g.length;m++){var E=g[m];if("string"==typeof E)A+=e(u(E));else{var y=e(u(E.prefix)),w=e(u(E.suffix));if(E.pattern)if(s&&s.push(E),y||w)if("+"===E.modifier||"*"===E.modifier){var S="*"===E.modifier?"?":"";A+="(?:".concat(y,"((?:").concat(E.pattern,")(?:").concat(w).concat(y,"(?:").concat(E.pattern,"))*)").concat(w,")").concat(S)}else A+="(?:".concat(y,"(").concat(E.pattern,")").concat(w,")").concat(E.modifier);else"+"===E.modifier||"*"===E.modifier?A+="((?:".concat(E.pattern,")").concat(E.modifier,")"):A+="(".concat(E.pattern,")").concat(E.modifier);else A+="(?:".concat(y).concat(w,")").concat(E.modifier)}}if(c)r||(A+="".concat(_,"?")),A+=n.endsWith?"(?=".concat($,")"):"$";else{var b=t[t.length-1],C="string"==typeof b?_.indexOf(b[b.length-1])>-1:void 0===b;r||(A+="(?:".concat(_,"(?=").concat($,"))?")),C||(A+="(?=".concat(_,"|").concat($,")"))}return new RegExp(A,i(n))}(function(t,i){void 0===i&&(i={});for(var s=function(t){for(var e=[],i=0;i<t.length;){var s=t[i];if("*"!==s&&"+"!==s&&"?"!==s)if("\\"!==s)if("{"!==s)if("}"!==s)if(":"!==s)if("("!==s)e.push({type:"CHAR",index:i,value:t[i++]});else{var n=1,o="";if("?"===t[l=i+1])throw new TypeError('Pattern cannot start with "?" at '.concat(l));for(;l<t.length;)if("\\"!==t[l]){if(")"===t[l]){if(0==--n){l++;break}}else if("("===t[l]&&(n++,"?"!==t[l+1]))throw new TypeError("Capturing groups are not allowed at ".concat(l));o+=t[l++]}else o+=t[l++]+t[l++];if(n)throw new TypeError("Unbalanced pattern at ".concat(i));if(!o)throw new TypeError("Missing pattern at ".concat(i));e.push({type:"PATTERN",index:i,value:o}),i=l}else{for(var r="",l=i+1;l<t.length;){var a=t.charCodeAt(l);if(!(a>=48&&a<=57||a>=65&&a<=90||a>=97&&a<=122||95===a))break;r+=t[l++]}if(!r)throw new TypeError("Missing parameter name at ".concat(i));e.push({type:"NAME",index:i,value:r}),i=l}else e.push({type:"CLOSE",index:i,value:t[i++]});else e.push({type:"OPEN",index:i,value:t[i++]});else e.push({type:"ESCAPED_CHAR",index:i++,value:t[i++]});else e.push({type:"MODIFIER",index:i,value:t[i++]})}return e.push({type:"END",index:i,value:""}),e}(t),n=i.prefixes,o=void 0===n?"./":n,r="[^".concat(e(i.delimiter||"/#?"),"]+?"),l=[],a=0,h=0,c="",d=function(t){if(h<s.length&&s[h].type===t)return s[h++].value},u=function(t){var e=d(t);if(void 0!==e)return e;var i=s[h],n=i.type,o=i.index;throw new TypeError("Unexpected ".concat(n," at ").concat(o,", expected ").concat(t))},p=function(){for(var t,e="";t=d("CHAR")||d("ESCAPED_CHAR");)e+=t;return e};h<s.length;){var v=d("CHAR"),f=d("NAME"),$=d("PATTERN");if(f||$){var _=v||"";-1===o.indexOf(_)&&(c+=_,_=""),c&&(l.push(c),c=""),l.push({name:f||a++,prefix:_,suffix:"",pattern:$||r,modifier:d("MODIFIER")||""})}else{var A=v||d("ESCAPED_CHAR");if(A)c+=A;else if(c&&(l.push(c),c=""),d("OPEN")){_=p();var m=d("NAME")||"",g=d("PATTERN")||"",E=p();u("CLOSE"),l.push({name:m||(g?a++:""),pattern:m&&!g?r:g,prefix:_,suffix:E,modifier:d("MODIFIER")||""})}else u("END")}}return l}(t,n),s,n)}function n(t,e,o){return t instanceof RegExp?function(t,e){if(!e)return t;for(var i=/\((?:\?<(.*?)>)?(?!\?)/g,s=0,n=i.exec(t.source);n;)e.push({name:n[1]||s++,prefix:"",suffix:"",modifier:"",pattern:""}),n=i.exec(t.source);return t}(t,e):Array.isArray(t)?function(t,e,s){var o=t.map((function(t){return n(t,e,s).source}));return new RegExp("(?:".concat(o.join("|"),")"),i(s))}(t,e,o):s(t,e,o)}customElements.define("app-anchor",t,{extends:"a"});const o=window,r=o.ShadowRoot&&(void 0===o.ShadyCSS||o.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,l=Symbol(),a=new WeakMap;class h{constructor(t,e,i){if(this._$cssResult$=!0,i!==l)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(r&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=a.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(e,t))}return t}toString(){return this.cssText}}const c=r?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new h("string"==typeof t?t:t+"",void 0,l))(e)})(t):t;var d;const u=window,p=u.trustedTypes,v=p?p.emptyScript:"",f=u.reactiveElementPolyfillSupport,$={toAttribute(t,e){switch(e){case Boolean:t=t?v:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},_=(t,e)=>e!==t&&(e==e||t==t),A={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:_};class m extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))})),t}static createProperty(t,e=A){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const n=this[t];this[e]=s,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||A}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(c(t))}else void 0!==t&&e.push(c(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{r?t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((e=>{const i=document.createElement("style"),s=o.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=e.cssText,t.appendChild(i)}))})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=A){var s;const n=this.constructor._$Ep(t,i);if(void 0!==n&&!0===i.reflect){const o=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:$).toAttribute(e,i.type);this._$El=t,null==o?this.removeAttribute(n):this.setAttribute(n,o),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,n=s._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=s.getPropertyOptions(n),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:$;this._$El=n,this[n]=o.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||_)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}var g;m.finalized=!0,m.elementProperties=new Map,m.elementStyles=[],m.shadowRootOptions={mode:"open"},null==f||f({ReactiveElement:m}),(null!==(d=u.reactiveElementVersions)&&void 0!==d?d:u.reactiveElementVersions=[]).push("1.5.0");const E=window,y=E.trustedTypes,w=y?y.createPolicy("lit-html",{createHTML:t=>t}):void 0,S=`lit$${(Math.random()+"").slice(9)}$`,b="?"+S,C=`<${b}>`,x=document,R=(t="")=>x.createComment(t),H=t=>null===t||"object"!=typeof t&&"function"!=typeof t,P=Array.isArray,T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,O=/>/g,N=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),L=/'/g,M=/"/g,k=/^(?:script|style|textarea|title)$/i,D=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),j=D(1),I=(D(2),Symbol.for("lit-noChange")),z=Symbol.for("lit-nothing"),B=new WeakMap,W=x.createTreeWalker(x,129,null,!1),V=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":"",r=T;for(let e=0;e<i;e++){const i=t[e];let l,a,h=-1,c=0;for(;c<i.length&&(r.lastIndex=c,a=r.exec(i),null!==a);)c=r.lastIndex,r===T?"!--"===a[1]?r=U:void 0!==a[1]?r=O:void 0!==a[2]?(k.test(a[2])&&(n=RegExp("</"+a[2],"g")),r=N):void 0!==a[3]&&(r=N):r===N?">"===a[0]?(r=null!=n?n:T,h=-1):void 0===a[1]?h=-2:(h=r.lastIndex-a[2].length,l=a[1],r=void 0===a[3]?N:'"'===a[3]?M:L):r===M||r===L?r=N:r===U||r===O?r=T:(r=N,n=void 0);const d=r===N&&t[e+1].startsWith("/>")?" ":"";o+=r===T?i+C:h>=0?(s.push(l),i.slice(0,h)+"$lit$"+i.slice(h)+S+d):i+S+(-2===h?(s.push(void 0),e):d)}const l=o+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==w?w.createHTML(l):l,s]};class q{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const r=t.length-1,l=this.parts,[a,h]=V(t,e);if(this.el=q.createElement(a,i),W.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=W.nextNode())&&l.length<r;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(S)){const i=h[o++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split(S),e=/([.?@])?(.*)/.exec(i);l.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?G:"?"===e[1]?X:"@"===e[1]?Y:Z})}else l.push({type:6,index:n})}for(const e of t)s.removeAttribute(e)}if(k.test(s.tagName)){const t=s.textContent.split(S),e=t.length-1;if(e>0){s.textContent=y?y.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],R()),W.nextNode(),l.push({type:2,index:++n});s.append(t[e],R())}}}else if(8===s.nodeType)if(s.data===b)l.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(S,t+1));)l.push({type:7,index:n}),t+=S.length-1}n++}}static createElement(t,e){const i=x.createElement("template");return i.innerHTML=t,i}}function F(t,e,i=t,s){var n,o,r,l;if(e===I)return e;let a=void 0!==s?null===(n=i._$Co)||void 0===n?void 0:n[s]:i._$Cl;const h=H(e)?void 0:e._$litDirective$;return(null==a?void 0:a.constructor)!==h&&(null===(o=null==a?void 0:a._$AO)||void 0===o||o.call(a,!1),void 0===h?a=void 0:(a=new h(t),a._$AT(t,i,s)),void 0!==s?(null!==(r=(l=i)._$Co)&&void 0!==r?r:l._$Co=[])[s]=a:i._$Cl=a),void 0!==a&&(e=F(t,a._$AS(t,e.values),a,s)),e}class J{constructor(t,e){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var e;const{el:{content:i},parts:s}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:x).importNode(i,!0);W.currentNode=n;let o=W.nextNode(),r=0,l=0,a=s[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new K(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new tt(o,this,t)),this.u.push(e),a=s[++l]}r!==(null==a?void 0:a.index)&&(o=W.nextNode(),r++)}return n}p(t){let e=0;for(const i of this.u)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class K{constructor(t,e,i,s){var n;this.type=2,this._$AH=z,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cm=null===(n=null==s?void 0:s.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=F(this,t,e),H(t)?t===z||null==t||""===t?(this._$AH!==z&&this._$AR(),this._$AH=z):t!==this._$AH&&t!==I&&this.g(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>P(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.k(t):this.g(t)}O(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}g(t){this._$AH!==z&&H(this._$AH)?this._$AA.nextSibling.data=t:this.T(x.createTextNode(t)),this._$AH=t}$(t){var e;const{values:i,_$litType$:s}=t,n="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=q.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.p(i);else{const t=new J(n,this),e=t.v(this.options);t.p(i),this.T(e),this._$AH=t}}_$AC(t){let e=B.get(t.strings);return void 0===e&&B.set(t.strings,e=new q(t)),e}k(t){P(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new K(this.O(R()),this.O(R()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cm=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class Z{constructor(t,e,i,s,n){this.type=1,this._$AH=z,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=z}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=F(this,t,e,0),o=!H(t)||t!==this._$AH&&t!==I,o&&(this._$AH=t);else{const s=t;let r,l;for(t=n[0],r=0;r<n.length-1;r++)l=F(this,s[i+r],e,r),l===I&&(l=this._$AH[r]),o||(o=!H(l)||l!==this._$AH[r]),l===z?t=z:t!==z&&(t+=(null!=l?l:"")+n[r+1]),this._$AH[r]=l}o&&!s&&this.j(t)}j(t){t===z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class G extends Z{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===z?void 0:t}}const Q=y?y.emptyScript:"";class X extends Z{constructor(){super(...arguments),this.type=4}j(t){t&&t!==z?this.element.setAttribute(this.name,Q):this.element.removeAttribute(this.name)}}class Y extends Z{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=F(this,t,e,0))&&void 0!==i?i:z)===I)return;const s=this._$AH,n=t===z&&s!==z||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==z&&(s===z||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class tt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){F(this,t)}}const et=E.litHtmlPolyfillSupport;null==et||et(q,K),(null!==(g=E.litHtmlVersions)&&void 0!==g?g:E.litHtmlVersions=[]).push("2.5.0");const it=(t,e,i)=>{var s,n;const o=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let r=o._$litPart$;if(void 0===r){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;o._$litPart$=r=new K(e.insertBefore(R(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r};var st,nt;class ot extends m{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=it(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return I}}ot.finalized=!0,ot._$litElement$=!0,null===(st=globalThis.litElementHydrateSupport)||void 0===st||st.call(globalThis,{LitElement:ot});const rt=globalThis.litElementPolyfillSupport;null==rt||rt({LitElement:ot}),(null!==(nt=globalThis.litElementVersions)&&void 0!==nt?nt:globalThis.litElementVersions=[]).push("3.2.2");class lt extends HTMLElement{#t=null;set isLoading(t){this._isLoading=t,this.render()}get isLoading(){return this._isLoading}set users(t){this._users=t,this.render()}get users(){return this._users}constructor(){super(),this.#t=this.attachShadow({mode:"closed"}),this.isRenderScheduled=!1,this.isLoading=!1,this.users=[]}render(){this.isRenderScheduled||(this.isRenderScheduled=!0,Promise.resolve().then((()=>{const t=j`
  <style>
    #loading:not(.visible) {
      display: none;
    }
  </style>
  <div id="content">
    ${this.isLoading?j`<div id="loading" class="visible">Loading...</div>`:""}
    ${this.isLoading?"":j`<ul id="user-list">${this?.users?.map((t=>j`<li>${t}</li>`))}</ul>`}
   </div>
`;it(t,this.#t),this.isRenderScheduled=!1})))}loadUsers(){this.isLoading=!0,fetch("http://localhost:8081/users").then((t=>t.ok?t.json():Promise.reject(new Error("Error loading users")))).then((t=>this.users=t)).catch((t=>console.error(t))).finally((()=>this.isLoading=!1))}connectedCallback(){this.loadUsers()}}customElements.define("app-user-list",lt);class at extends HTMLElement{#t=null;constructor(){super(),this.#t=this.attachShadow({mode:"closed"})}}customElements.define("app-edit-user",at);class ht extends HTMLElement{#t=null;#e=null;config={"/edit/:id":at,"/":lt};constructor(){super(),this.#t=this.attachShadow({mode:"closed"})}render(t,e=!1){let i=null;for(const[e,s]of Object.entries(this.config))if(n(e).test(t)){i=s;break}if(i||console.error("Route not found!"),this.#e===t)return;this.#e=t;const s=new i;this.#t.children[0]&&this.#t.removeChild(this.#t.children[0]),this.#t.appendChild(s),e||history.pushState("","",t)}popstateHandler=t=>{t.preventDefault(),this.render(location.pathname,!0)};connectedCallback(){this.render(location.pathname),window.addEventListener("popstate",this.popstateHandler)}disconnectedCallback(){window.removeEventListener("popstate",this.popstateHandler)}}customElements.define("app-router",ht);const ct=function(){const t=document.createElement("template");return t.innerHTML='\n    <nav id="nav">\n      <a href="/" is="app-anchor">User List</a>\n      <a href="/edit/1" is="app-anchor">Edit User 1</a>\n    </nav>\n    <app-slot>AAAAAAAAAAAAAAA</app-slot>\n    ',t}();class dt extends HTMLElement{#t=null;constructor(){super(),this.#t=this.attachShadow({mode:"closed"});const t=new ht;this.#t.appendChild(ct.content.cloneNode(!0)),this.#t.appendChild(t),this.#t.querySelector("#nav").addEventListener("app-render",(e=>{t.render(e.detail)}))}}customElements.define("app-root",dt);const ut=function(){const t=document.createElement("template");return t.innerHTML="\n    <slot></slot>\n    ",t}();class pt extends HTMLElement{#t=null;constructor(){super(),this.#t=this.attachShadow({mode:"closed"}),this.#t.appendChild(ut.content.cloneNode(!0))}}customElements.define("app-slot",pt);const vt=new dt;document.body.appendChild(vt)})();