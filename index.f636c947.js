function t(t){return t&&t.__esModule?t.default:t}var e,n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o=/^\s+|\s+$/g,i=/^[-+]0x[0-9a-f]+$/i,r=/^0b[01]+$/i,u=/^0o[0-7]+$/i,f=parseInt,c="object"==typeof n&&n&&n.Object===Object&&n,a="object"==typeof self&&self&&self.Object===Object&&self,l=c||a||Function("return this")(),s=Object.prototype.toString,d=Math.max,p=Math.min,v=function(){return l.Date.now()};function m(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function y(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return!!t&&"object"==typeof t}(t)&&"[object Symbol]"==s.call(t)}(t))return NaN;if(m(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=m(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(o,"");var n=r.test(t);return n||u.test(t)?f(t.slice(2),n?2:8):i.test(t)?NaN:+t}e=function(t,e,n){var o,i,r,u,f,c,a=0,l=!1,s=!1,g=!0;if("function"!=typeof t)throw new TypeError("Expected a function");function b(e){var n=o,r=i;return o=i=void 0,a=e,u=t.apply(r,n)}function h(t){return a=t,f=setTimeout(w,e),l?b(t):u}function j(t){var n=t-c;return void 0===c||n>=e||n<0||s&&t-a>=r}function w(){var t=v();if(j(t))return T(t);f=setTimeout(w,function(t){var n=e-(t-c);return s?p(n,r-(t-a)):n}(t))}function T(t){return f=void 0,g&&o?b(t):(o=i=void 0,u)}function $(){var t=v(),n=j(t);if(o=arguments,i=this,c=t,n){if(void 0===f)return h(c);if(s)return f=setTimeout(w,e),b(c)}return void 0===f&&(f=setTimeout(w,e)),u}return e=y(e)||0,m(n)&&(l=!!n.leading,r=(s="maxWait"in n)?d(y(n.maxWait)||0,e):r,g="trailing"in n?!!n.trailing:g),$.cancel=function(){void 0!==f&&clearTimeout(f),a=0,o=c=i=f=void 0},$.flush=function(){return void 0===f?u:T(v())},$};let g;const b=document.querySelector("#search-box"),h=document.querySelector(".country-list");document.querySelector(".country-info");b.addEventListener("input",t(e)((function(t){t.preventDefault();let e=t.target.value.trim();if(""===e)return console.log("i",e),void(h.innerHTML="");console.log(e),(n=e,fetch(`https://restcountries.com/v3.1/name//${n}?fields=name,capital,population,flags,languages`).then((t=>{if(!t.ok)throw new Error(t.status);return t.json()}))).then((t=>function(t){g=t.map((t=>`<li>\n  <img src="${t.flags.svg}" alt="${t.name.official}" width="60px" >\n  <p>${t.name.official}</p>\n</li>`)).join(""),h.innerHTML=g}(t))).catch((t=>console.log(t)));var n}),300));
//# sourceMappingURL=index.f636c947.js.map