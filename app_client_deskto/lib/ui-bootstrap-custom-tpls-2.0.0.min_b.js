/*
 * angular-ui-bootstrap
 * http://angular-ui.github.io/bootstrap/

 * Version: 2.0.0 - 2016-07-19
 * License: MIT
 */angular.module("ui.bootstrap",["ui.bootstrap.tpls","ui.bootstrap.modal","ui.bootstrap.stackedMap","ui.bootstrap.position"]),angular.module("ui.bootstrap.tpls",["uib/template/modal/window.html"]),angular.module("ui.bootstrap.modal",["ui.bootstrap.stackedMap","ui.bootstrap.position"]).factory("$$multiMap",function(){return{createNew:function(){var t={};return{entries:function(){return Object.keys(t).map(function(e){return{key:e,value:t[e]}})},get:function(e){return t[e]},hasKey:function(e){return!!t[e]},keys:function(){return Object.keys(t)},put:function(e,o){t[e]||(t[e]=[]),t[e].push(o)},remove:function(e,o){var n=t[e];if(n){var i=n.indexOf(o);-1!==i&&n.splice(i,1),n.length||delete t[e]}}}}}}).provider("$uibResolve",function(){var t=this;this.resolver=null,this.setResolver=function(t){this.resolver=t},this.$get=["$injector","$q",function(e,o){var n=t.resolver?e.get(t.resolver):null;return{resolve:function(t,i,r,a){if(n)return n.resolve(t,i,r,a);var l=[];return angular.forEach(t,function(t){l.push(angular.isFunction(t)||angular.isArray(t)?o.resolve(e.invoke(t)):angular.isString(t)?o.resolve(e.get(t)):o.resolve(t))}),o.all(l).then(function(e){var o={},n=0;return angular.forEach(t,function(t,i){o[i]=e[n++]}),o})}}}]}).directive("uibModalBackdrop",["$animate","$injector","$uibModalStack",function(t,e,o){function n(e,n,i){i.modalInClass&&(t.addClass(n,i.modalInClass),e.$on(o.NOW_CLOSING_EVENT,function(o,r){var a=r();e.modalOptions.animation?t.removeClass(n,i.modalInClass).then(a):a()}))}return{restrict:"A",compile:function(t,e){return t.addClass(e.backdropClass),n}}}]).directive("uibModalWindow",["$uibModalStack","$q","$animateCss","$document",function(t,e,o,n){return{scope:{index:"@"},restrict:"A",transclude:!0,templateUrl:function(t,e){return e.templateUrl||"uib/template/modal/window.html"},link:function(i,r,a){r.addClass(a.windowTopClass||""),i.size=a.size,i.close=function(e){var o=t.getTop();o&&o.value.backdrop&&"static"!==o.value.backdrop&&e.target===e.currentTarget&&(e.preventDefault(),e.stopPropagation(),t.dismiss(o.key,"backdrop click"))},r.on("click",i.close),i.$isRendered=!0;var l=e.defer();i.$$postDigest(function(){l.resolve()}),l.promise.then(function(){var l=null;a.modalInClass&&(l=o(r,{addClass:a.modalInClass}).start(),i.$on(t.NOW_CLOSING_EVENT,function(t,e){var n=e();o(r,{removeClass:a.modalInClass}).start().then(n)})),e.when(l).then(function(){var e=t.getTop();if(e&&t.modalRendered(e.key),!n[0].activeElement||!r[0].contains(n[0].activeElement)){var o=r[0].querySelector("[autofocus]");o?o.focus():r[0].focus()}})})}}}]).directive("uibModalAnimationClass",function(){return{compile:function(t,e){e.modalAnimation&&t.addClass(e.uibModalAnimationClass)}}}).directive("uibModalTransclude",["$animate",function(t){return{link:function(e,o,n,i,r){r(e.$parent,function(e){o.empty(),t.enter(e,o)})}}}]).factory("$uibModalStack",["$animate","$animateCss","$document","$compile","$rootScope","$q","$$multiMap","$$stackedMap","$uibPosition",function(t,e,o,n,i,r,a,l,s){function d(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function u(){for(var t=-1,e=y.keys(),o=0;o<e.length;o++)y.get(e[o]).value.backdrop&&(t=o);return t>-1&&S>t&&(t=S),t}function c(t,e){var o=y.get(t).value,n=o.appendTo;y.remove(t),E=y.top(),E&&(S=parseInt(E.value.modalDomEl.attr("index"),10)),h(o.modalDomEl,o.modalScope,function(){var e=o.openedClass||$;k.remove(e,t);var i=k.hasKey(e);n.toggleClass(e,i),!i&&w&&w.heightOverflow&&w.scrollbarWidth&&(n.css(w.originalRight?{paddingRight:w.originalRight+"px"}:{paddingRight:""}),w=null),p(!0)},o.closedDeferred),f(),e&&e.focus?e.focus():n.focus&&n.focus()}function p(t){var e;y.length()>0&&(e=y.top().value,e.modalDomEl.toggleClass(e.windowTopClass||"",t))}function f(){if(v&&-1===u()){var t=b;h(v,b,function(){t=null}),v=void 0,b=void 0}}function h(e,o,n,i){function a(){a.done||(a.done=!0,t.leave(e).then(function(){n&&n(),e.remove(),i&&i.resolve()}),o.$destroy())}var l,s=null,d=function(){return l||(l=r.defer(),s=l.promise),function(){l.resolve()}};return o.$broadcast(C.NOW_CLOSING_EVENT,d),r.when(s).then(a)}function m(t){if(t.isDefaultPrevented())return t;var e=y.top();if(e)switch(t.which){case 27:e.value.keyboard&&(t.preventDefault(),i.$apply(function(){C.dismiss(e.key,"escape key press")}));break;case 9:var o=C.loadFocusElementList(e),n=!1;t.shiftKey?(C.isFocusInFirstItem(t,o)||C.isModalFocused(t,e))&&(n=C.focusLastFocusableElement(o)):C.isFocusInLastItem(t,o)&&(n=C.focusFirstFocusableElement(o)),n&&(t.preventDefault(),t.stopPropagation())}}function g(t,e,o){return!t.value.modalScope.$broadcast("modal.closing",e,o).defaultPrevented}var v,b,w,$="modal-open",y=l.createNew(),k=a.createNew(),C={NOW_CLOSING_EVENT:"modal.stack.now-closing"},S=0,E=null,M="a[href], area[href], input:not([disabled]):not([tabindex='-1']), button:not([disabled]):not([tabindex='-1']),select:not([disabled]):not([tabindex='-1']), textarea:not([disabled]):not([tabindex='-1']), iframe, object, embed, *[tabindex]:not([tabindex='-1']), *[contenteditable=true]";return i.$watch(u,function(t){b&&(b.index=t)}),o.on("keydown",m),i.$on("$destroy",function(){o.off("keydown",m)}),C.open=function(e,r){var a=o[0].activeElement,l=r.openedClass||$;p(!1),E=y.top(),y.add(e,{deferred:r.deferred,renderDeferred:r.renderDeferred,closedDeferred:r.closedDeferred,modalScope:r.scope,backdrop:r.backdrop,keyboard:r.keyboard,openedClass:r.openedClass,windowTopClass:r.windowTopClass,animation:r.animation,appendTo:r.appendTo}),k.put(l,e);var d=r.appendTo,c=u();if(!d.length)throw new Error("appendTo element not found. Make sure that the element passed is in DOM.");c>=0&&!v&&(b=i.$new(!0),b.modalOptions=r,b.index=c,v=angular.element('<div uib-modal-backdrop="modal-backdrop"></div>'),v.attr({"class":"modal-backdrop","ng-style":"{'z-index': 1040 + (index && 1 || 0) + index*10}","uib-modal-animation-class":"fade","modal-in-class":"in"}),r.backdropClass&&v.addClass(r.backdropClass),r.animation&&v.attr("modal-animation","true"),n(v)(b),t.enter(v,d),s.isScrollable(d)&&(w=s.scrollbarPadding(d),w.heightOverflow&&w.scrollbarWidth&&d.css({paddingRight:w.right+"px"}))),S=E?parseInt(E.value.modalDomEl.attr("index"),10)+1:0;var f=angular.element('<div uib-modal-window="modal-window"></div>');f.attr({"class":"modal","template-url":r.windowTemplateUrl,"window-top-class":r.windowTopClass,role:"dialog",size:r.size,index:S,animate:"animate","ng-style":"{'z-index': 1050 + index*10, display: 'block'}",tabindex:-1,"uib-modal-animation-class":"fade","modal-in-class":"in"}).html(r.content),r.windowClass&&f.addClass(r.windowClass),r.animation&&f.attr("modal-animation","true"),d.addClass(l),t.enter(n(f)(r.scope),d),y.top().value.modalDomEl=f,y.top().value.modalOpener=a},C.close=function(t,e){var o=y.get(t);return o&&g(o,e,!0)?(o.value.modalScope.$$uibDestructionScheduled=!0,o.value.deferred.resolve(e),c(t,o.value.modalOpener),!0):!o},C.dismiss=function(t,e){var o=y.get(t);return o&&g(o,e,!1)?(o.value.modalScope.$$uibDestructionScheduled=!0,o.value.deferred.reject(e),c(t,o.value.modalOpener),!0):!o},C.dismissAll=function(t){for(var e=this.getTop();e&&this.dismiss(e.key,t);)e=this.getTop()},C.getTop=function(){return y.top()},C.modalRendered=function(t){var e=y.get(t);e&&e.value.renderDeferred.resolve()},C.focusFirstFocusableElement=function(t){return t.length>0?(t[0].focus(),!0):!1},C.focusLastFocusableElement=function(t){return t.length>0?(t[t.length-1].focus(),!0):!1},C.isModalFocused=function(t,e){if(t&&e){var o=e.value.modalDomEl;if(o&&o.length)return(t.target||t.srcElement)===o[0]}return!1},C.isFocusInFirstItem=function(t,e){return e.length>0?(t.target||t.srcElement)===e[0]:!1},C.isFocusInLastItem=function(t,e){return e.length>0?(t.target||t.srcElement)===e[e.length-1]:!1},C.loadFocusElementList=function(t){if(t){var e=t.value.modalDomEl;if(e&&e.length){var o=e[0].querySelectorAll(M);return o?Array.prototype.filter.call(o,function(t){return d(t)}):o}}},C}]).provider("$uibModal",function(){var t={options:{animation:!0,backdrop:!0,keyboard:!0},$get:["$rootScope","$q","$document","$templateRequest","$controller","$uibResolve","$uibModalStack",function(e,o,n,i,r,a,l){function s(t){return t.template?o.when(t.template):i(angular.isFunction(t.templateUrl)?t.templateUrl():t.templateUrl)}var d={},u=null;return d.getPromiseChain=function(){return u},d.open=function(i){function d(){return v}var c=o.defer(),p=o.defer(),f=o.defer(),h=o.defer(),m={result:c.promise,opened:p.promise,closed:f.promise,rendered:h.promise,close:function(t){return l.close(m,t)},dismiss:function(t){return l.dismiss(m,t)}};if(i=angular.extend({},t.options,i),i.resolve=i.resolve||{},i.appendTo=i.appendTo||n.find("body").eq(0),!i.template&&!i.templateUrl)throw new Error("One of template or templateUrl options is required.");var g,v=o.all([s(i),a.resolve(i.resolve,{},null,null)]);return g=u=o.all([u]).then(d,d).then(function(t){var o=i.scope||e,n=o.$new();n.$close=m.close,n.$dismiss=m.dismiss,n.$on("$destroy",function(){n.$$uibDestructionScheduled||n.$dismiss("$uibUnscheduledDestruction")});var a,s,d={};i.controller&&(d.$scope=n,d.$scope.$resolve={},d.$uibModalInstance=m,angular.forEach(t[1],function(t,e){d[e]=t,d.$scope.$resolve[e]=t}),s=r(i.controller,d,!0,i.controllerAs),i.controllerAs&&i.bindToController&&(a=s.instance,a.$close=n.$close,a.$dismiss=n.$dismiss,angular.extend(a,{$resolve:d.$scope.$resolve},o)),a=s(),angular.isFunction(a.$onInit)&&a.$onInit()),l.open(m,{scope:n,deferred:c,renderDeferred:h,closedDeferred:f,content:t[0],animation:i.animation,backdrop:i.backdrop,keyboard:i.keyboard,backdropClass:i.backdropClass,windowTopClass:i.windowTopClass,windowClass:i.windowClass,windowTemplateUrl:i.windowTemplateUrl,size:i.size,openedClass:i.openedClass,appendTo:i.appendTo}),p.resolve(!0)},function(t){p.reject(t),c.reject(t)})["finally"](function(){u===g&&(u=null)}),m},d}]};return t}),angular.module("ui.bootstrap.stackedMap",[]).factory("$$stackedMap",function(){return{createNew:function(){var t=[];return{add:function(e,o){t.push({key:e,value:o})},get:function(e){for(var o=0;o<t.length;o++)if(e===t[o].key)return t[o]},keys:function(){for(var e=[],o=0;o<t.length;o++)e.push(t[o].key);return e},top:function(){return t[t.length-1]},remove:function(e){for(var o=-1,n=0;n<t.length;n++)if(e===t[n].key){o=n;break}return t.splice(o,1)[0]},removeTop:function(){return t.pop()},length:function(){return t.length}}}}}),angular.module("ui.bootstrap.position",[]).factory("$uibPosition",["$document","$window",function(t,e){var o,n,i={normal:/(auto|scroll)/,hidden:/(auto|scroll|hidden)/},r={auto:/\s?auto?\s?/i,primary:/^(top|bottom|left|right)$/,secondary:/^(top|bottom|left|right|center)$/,vertical:/^(top|bottom)$/},a=/(HTML|BODY)/;return{getRawNode:function(t){return t.nodeName?t:t[0]||t},parseStyle:function(t){return t=parseFloat(t),isFinite(t)?t:0},offsetParent:function(o){function n(t){return"static"===(e.getComputedStyle(t).position||"static")}o=this.getRawNode(o);for(var i=o.offsetParent||t[0].documentElement;i&&i!==t[0].documentElement&&n(i);)i=i.offsetParent;return i||t[0].documentElement},scrollbarWidth:function(i){if(i){if(angular.isUndefined(n)){var r=t.find("body");r.addClass("uib-position-body-scrollbar-measure"),n=e.innerWidth-r[0].clientWidth,n=isFinite(n)?n:0,r.removeClass("uib-position-body-scrollbar-measure")}return n}if(angular.isUndefined(o)){var a=angular.element('<div class="uib-position-scrollbar-measure"></div>');t.find("body").append(a),o=a[0].offsetWidth-a[0].clientWidth,o=isFinite(o)?o:0,a.remove()}return o},scrollbarPadding:function(t){t=this.getRawNode(t);var o=e.getComputedStyle(t),n=this.parseStyle(o.paddingRight),i=this.parseStyle(o.paddingBottom),r=this.scrollParent(t,!1,!0),l=this.scrollbarWidth(r,a.test(r.tagName));return{scrollbarWidth:l,widthOverflow:r.scrollWidth>r.clientWidth,right:n+l,originalRight:n,heightOverflow:r.scrollHeight>r.clientHeight,bottom:i+l,originalBottom:i}},isScrollable:function(t,o){t=this.getRawNode(t);var n=o?i.hidden:i.normal,r=e.getComputedStyle(t);return n.test(r.overflow+r.overflowY+r.overflowX)},scrollParent:function(o,n,r){o=this.getRawNode(o);var a=n?i.hidden:i.normal,l=t[0].documentElement,s=e.getComputedStyle(o);if(r&&a.test(s.overflow+s.overflowY+s.overflowX))return o;var d="absolute"===s.position,u=o.parentElement||l;if(u===l||"fixed"===s.position)return l;for(;u.parentElement&&u!==l;){var c=e.getComputedStyle(u);if(d&&"static"!==c.position&&(d=!1),!d&&a.test(c.overflow+c.overflowY+c.overflowX))break;u=u.parentElement}return u},position:function(o,n){o=this.getRawNode(o);var i=this.offset(o);if(n){var r=e.getComputedStyle(o);i.top-=this.parseStyle(r.marginTop),i.left-=this.parseStyle(r.marginLeft)}var a=this.offsetParent(o),l={top:0,left:0};return a!==t[0].documentElement&&(l=this.offset(a),l.top+=a.clientTop-a.scrollTop,l.left+=a.clientLeft-a.scrollLeft),{width:Math.round(angular.isNumber(i.width)?i.width:o.offsetWidth),height:Math.round(angular.isNumber(i.height)?i.height:o.offsetHeight),top:Math.round(i.top-l.top),left:Math.round(i.left-l.left)}},offset:function(o){o=this.getRawNode(o);var n=o.getBoundingClientRect();return{width:Math.round(angular.isNumber(n.width)?n.width:o.offsetWidth),height:Math.round(angular.isNumber(n.height)?n.height:o.offsetHeight),top:Math.round(n.top+(e.pageYOffset||t[0].documentElement.scrollTop)),left:Math.round(n.left+(e.pageXOffset||t[0].documentElement.scrollLeft))}},viewportOffset:function(o,n,i){o=this.getRawNode(o),i=i!==!1?!0:!1;var r=o.getBoundingClientRect(),a={top:0,left:0,bottom:0,right:0},l=n?t[0].documentElement:this.scrollParent(o),s=l.getBoundingClientRect();if(a.top=s.top+l.clientTop,a.left=s.left+l.clientLeft,l===t[0].documentElement&&(a.top+=e.pageYOffset,a.left+=e.pageXOffset),a.bottom=a.top+l.clientHeight,a.right=a.left+l.clientWidth,i){var d=e.getComputedStyle(l);a.top+=this.parseStyle(d.paddingTop),a.bottom-=this.parseStyle(d.paddingBottom),a.left+=this.parseStyle(d.paddingLeft),a.right-=this.parseStyle(d.paddingRight)}return{top:Math.round(r.top-a.top),bottom:Math.round(a.bottom-r.bottom),left:Math.round(r.left-a.left),right:Math.round(a.right-r.right)}},parsePlacement:function(t){var e=r.auto.test(t);return e&&(t=t.replace(r.auto,"")),t=t.split("-"),t[0]=t[0]||"top",r.primary.test(t[0])||(t[0]="top"),t[1]=t[1]||"center",r.secondary.test(t[1])||(t[1]="center"),t[2]=e?!0:!1,t},positionElements:function(t,o,n,i){t=this.getRawNode(t),o=this.getRawNode(o);var a=angular.isDefined(o.offsetWidth)?o.offsetWidth:o.prop("offsetWidth"),l=angular.isDefined(o.offsetHeight)?o.offsetHeight:o.prop("offsetHeight");n=this.parsePlacement(n);var s=i?this.offset(t):this.position(t),d={top:0,left:0,placement:""};if(n[2]){var u=this.viewportOffset(t,i),c=e.getComputedStyle(o),p={width:a+Math.round(Math.abs(this.parseStyle(c.marginLeft)+this.parseStyle(c.marginRight))),height:l+Math.round(Math.abs(this.parseStyle(c.marginTop)+this.parseStyle(c.marginBottom)))};if(n[0]="top"===n[0]&&p.height>u.top&&p.height<=u.bottom?"bottom":"bottom"===n[0]&&p.height>u.bottom&&p.height<=u.top?"top":"left"===n[0]&&p.width>u.left&&p.width<=u.right?"right":"right"===n[0]&&p.width>u.right&&p.width<=u.left?"left":n[0],n[1]="top"===n[1]&&p.height-s.height>u.bottom&&p.height-s.height<=u.top?"bottom":"bottom"===n[1]&&p.height-s.height>u.top&&p.height-s.height<=u.bottom?"top":"left"===n[1]&&p.width-s.width>u.right&&p.width-s.width<=u.left?"right":"right"===n[1]&&p.width-s.width>u.left&&p.width-s.width<=u.right?"left":n[1],"center"===n[1])if(r.vertical.test(n[0])){var f=s.width/2-a/2;u.left+f<0&&p.width-s.width<=u.right?n[1]="left":u.right+f<0&&p.width-s.width<=u.left&&(n[1]="right")}else{var h=s.height/2-p.height/2;u.top+h<0&&p.height-s.height<=u.bottom?n[1]="top":u.bottom+h<0&&p.height-s.height<=u.top&&(n[1]="bottom")}}switch(n[0]){case"top":d.top=s.top-l;break;case"bottom":d.top=s.top+s.height;break;case"left":d.left=s.left-a;break;case"right":d.left=s.left+s.width}switch(n[1]){case"top":d.top=s.top;break;case"bottom":d.top=s.top+s.height-l;break;case"left":d.left=s.left;break;case"right":d.left=s.left+s.width-a;break;case"center":r.vertical.test(n[0])?d.left=s.left+s.width/2-a/2:d.top=s.top+s.height/2-l/2}return d.top=Math.round(d.top),d.left=Math.round(d.left),d.placement="center"===n[1]?n[0]:n[0]+"-"+n[1],d},adjustTop:function(t,e,o,n){return-1!==t.indexOf("top")&&o!==n?{top:e.top-n+"px"}:void 0},positionArrow:function(t,o){t=this.getRawNode(t);var n=t.querySelector(".tooltip-inner, .popover-inner");if(n){var i=angular.element(n).hasClass("tooltip-inner"),a=t.querySelector(i?".tooltip-arrow":".arrow");if(a){var l={top:"",bottom:"",left:"",right:""};if(o=this.parsePlacement(o),"center"===o[1])return void angular.element(a).css(l);var s="border-"+o[0]+"-width",d=e.getComputedStyle(a)[s],u="border-";u+=r.vertical.test(o[0])?o[0]+"-"+o[1]:o[1]+"-"+o[0],u+="-radius";var c=e.getComputedStyle(i?n:t)[u];switch(o[0]){case"top":l.bottom=i?"0":"-"+d;break;case"bottom":l.top=i?"0":"-"+d;break;case"left":l.right=i?"0":"-"+d;break;case"right":l.left=i?"0":"-"+d}l[o[1]]=c,angular.element(a).css(l)}}}}}]),angular.module("uib/template/modal/window.html",[]).run(["$templateCache",function(t){t.put("uib/template/modal/window.html","<div class=\"modal-dialog {{size ? 'modal-' + size : ''}}\"><div class=\"modal-content\" uib-modal-transclude></div></div>\n")}]),angular.module("ui.bootstrap.position").run(function(){!angular.$$csp().noInlineStyle&&!angular.$$uibPositionCss&&angular.element(document).find("head").prepend('<style type="text/css">.uib-position-measure{display:block !important;visibility:hidden !important;position:absolute !important;top:-9999px !important;left:-9999px !important;}.uib-position-scrollbar-measure{position:absolute !important;top:-9999px !important;width:50px !important;height:50px !important;overflow:scroll !important;}.uib-position-body-scrollbar-measure{overflow:scroll !important;}</style>'),angular.$$uibPositionCss=!0});