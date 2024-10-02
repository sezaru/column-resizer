"use strict";var y=Object.defineProperty;var _=Object.getOwnPropertyDescriptor;var F=Object.getOwnPropertyNames;var G=Object.prototype.hasOwnProperty;var P=(n,e)=>{for(var t in e)y(n,t,{get:e[t],enumerable:!0})},U=(n,e,t,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of F(e))!G.call(n,r)&&r!==t&&y(n,r,{get:()=>e[r],enumerable:!(i=_(e,r))||i.enumerable});return n};var $=n=>U(y({},"__esModule",{value:!0}),n);var Y={};P(Y,{BarActionType:()=>M,ColumnResizer:()=>L,ItemType:()=>S,Resizer:()=>h});module.exports=$(Y);var S=(t=>(t.BAR="BAR",t.SECTION="SECTION",t))(S||{}),M=(i=>(i.ACTIVATE="activate",i.MOVE="move",i.DEACTIVATE="deactivate",i))(M||{});function I(){let n=[],e=0,t=0;return{collect(i){n.push(i),i.disableResponsive||(e+=1,t+=i.currentSize)},getResult(){return{sizeInfoArray:n,flexGrowRatio:e/t}}}}function a(n){return Number.isFinite(n)&&n>0}function C(n,e,t){let{collect:i,getResult:r}=I(),s=g(n,e,-1,t),c=g(n,-e,1,t),l=e-s.remainingOffset,o=-e-c.remainingOffset;function m(d,K){d.forEach(i),i(t[n]),K.forEach(i)}if(l===-o)m(s.sizeInfoArray,c.sizeInfoArray);else if(Math.abs(l)<Math.abs(o)){let d=g(n,-l,1,t);m(s.sizeInfoArray,d.sizeInfoArray)}else{let d=g(n,-o,-1,t);m(d.sizeInfoArray,c.sizeInfoArray)}return r()}function g(n,e,t,i){let r=[],s=e;for(let o=n+t;l(o);o+=t)if(s){let{sizeInfo:m,remainingOffset:d}=j(s,i[o]);s=d,c(m)}else c(i[o]);function c(o){t===-1?r.unshift(o):r.push(o)}function l(o){return t===-1?o>=0:o<=i.length-1}return{sizeInfoArray:r,remainingOffset:s}}function j(n,e){if(e.isSolid)return{remainingOffset:n,sizeInfo:e};let{nextSize:t,remainingOffset:i}=J(e.currentSize+n,e);return{sizeInfo:{...e,currentSize:t},remainingOffset:i}}function J(n,{maxSize:e,minSize:t=0}){return n<t?{nextSize:t,remainingOffset:n-t}:a(e)&&n>e?{nextSize:e,remainingOffset:n-e}:{nextSize:n,remainingOffset:0}}var x={x:0,y:0};function w(n,e){return e?{x:n.x-e.x,y:n.y-e.y}:x}var T={barIndex:-1,offset:0,type:"deactivate",originalCoordinate:x,defaultSizeInfoArray:[],sizeInfoArray:[],discard:!0,flexGrowRatio:0};function V(n){let e=T,t=new Set;return{dispatch(i){e=(()=>{let r={barIndex:i.barIndex,type:i.type};switch(i.type){case"activate":let{sizeInfoArray:s,flexGrowRatio:c}=n.getSizeRelatedInfo();return{...T,...r,originalCoordinate:i.coordinate,defaultSizeInfoArray:s,sizeInfoArray:s,flexGrowRatio:c};case"move":let l=n.calculateOffset(i.coordinate,e.originalCoordinate);return{...r,...C(i.barIndex,l,e.defaultSizeInfoArray),offset:l,originalCoordinate:e.originalCoordinate,defaultSizeInfoArray:e.defaultSizeInfoArray,discard:!1};case"deactivate":return T}})(),t.forEach(r=>r(e))},subscribe(i){return t.add(i),()=>t.delete(i)},unsubscribeAll(){t.clear()}}}function u(n,e,t){n?.dispatchEvent(new CustomEvent(e,{detail:t}))}var b=class{disposeFnSet=new Set;watchResizerEvent=(e,t,i)=>{e?.addEventListener(t,i);let r=()=>e?.removeEventListener(t,i);return this.disposeFnSet.add(r),r};reset=()=>{this.disposeFnSet.forEach(e=>e()),this.disposeFnSet.clear()}};var R=class{infoMap=new Map;items=[];update(e){this.infoMap.clear(),this.items.forEach(t=>t.destroy()),this.items=e,e.forEach((t,i)=>{this.infoMap.set(t.elm,{item:t,index:i})})}reset(){this.update([])}getItems(){return this.items}getItem(e){return this.infoMap.get(e)?.item??null}getItemIndex(e){return this.infoMap.get(e)?.index??null}};var v=!0;try{window.addEventListener("test",null,{get passive(){return v={passive:!1},!0}})}catch{}function E({size:n}){return a(n)}function D(n){let{disableResponsive:e}=n;return E(n)&&e===void 0?!0:!!e}function k(n){return!!n&&n in S}function B(n){return e=>({"data-item-type":n,"data-item-config":JSON.stringify(e)})}function H(n){return Array.from(n.childNodes).map(e=>{if(!(e instanceof HTMLElement))return null;let t=e.getAttribute("data-item-type");return k(t)?{type:t,elm:e}:null}).filter(e=>!!e)}function A({elm:n}){try{let e=JSON.parse(n.getAttribute("data-item-config")??"");return e&&typeof e=="object"?e:{}}catch{return{}}}function N(n){return n*2+1}function O(n){return n*2}var h=class{constructor(e){this.resizeResult=e}isDiscarded=!1;resizeSection(e,t){if(this.isDiscarded)return;let i=O(e),r=this.getSize(i);if(r>=0&&t.toSize>=0){let s=t.toSize-r;i===this.resizeResult.sizeInfoArray.length-1||t.preferMoveLeftBar?this.moveBar(e-1,{withOffset:-s}):this.moveBar(e,{withOffset:s})}}moveBar(e,t){this.isDiscarded||(this.resizeResult=C(N(e),t.withOffset,this.resizeResult.sizeInfoArray))}discard(){this.isDiscarded=!0}isSectionResized(e){let t=O(e);return"defaultSizeInfoArray"in this.resizeResult?this.getSize(t)!==this.resizeResult.defaultSizeInfoArray[t].currentSize:!1}isBarActivated(e){return"barIndex"in this.resizeResult?this.resizeResult.barIndex===N(e):!1}getSectionSize(e){return this.getSize(O(e))}getResult(){return{...this.resizeResult,discard:this.isDiscarded}}getTotalSize(){return this.resizeResult.sizeInfoArray.filter((e,t)=>e&&t%2===0).reduce((e,{currentSize:t})=>e+t,0)}getSize(e){let t=this.resizeResult.sizeInfoArray[e];return t?t.currentSize:-1}};var z=class{constructor(e,t,i){this.type=e;this.elm=t;this.getConfig=i;this._config=this.getConfig(),this._observer=new MutationObserver(()=>this._config=this.getConfig()),this._observer.observe(t,{attributes:!0,attributeFilter:["data-item-config"]})}_config;_observer;get config(){return this._config}destroy(){this._observer.disconnect()}};var p=class extends z{constructor(t,i){super("BAR",t.elm,()=>W(t));this.dispatchBarAction=i;let r=[this.attachListener(this.elm,"mousedown","activate"),this.attachListener(document,"mousemove","move"),this.attachListener(document,"mouseup","deactivate"),this.attachListener(this.elm,"touchstart","activate",v),this.attachListener(document,"touchmove","move",v),this.attachListener(document,"touchend","deactivate"),this.attachListener(document,"touchcancel","deactivate")];this.destroy=()=>{super.destroy(),r.forEach(s=>s())}}static getStyle({size:t}){return{flex:`0 0 ${t}px`}}isActive=!1;isValidClick=!0;attachListener(t,i,r,s){let c=l=>{this.disableUserSelectIfResizing(l,r);let{clientX:o,clientY:m}=("touches"in l?l.touches[0]:l)||{clientX:0,clientY:0};this.triggerAction(this.elm,r,{x:o,y:m})};return t.addEventListener(i,c,s),()=>t.removeEventListener(i,c,s)}disableUserSelectIfResizing(t,i){(this.isActive||i==="activate")&&t.preventDefault()}triggerAction(t,i,r){(this.isActive||i==="activate")&&this.dispatchBarAction(t,{type:i,coordinate:r}),this.isActive&&this.isValidClick&&i==="deactivate"&&(this.isValidClick=!1,u(t,"bar:click",null)),this.updateStatusIfNeed(t,i),this.updateClickStatus(i)}updateStatusIfNeed(t,i){let r=s=>{this.isActive!==s&&(this.isActive=s,u(t,"bar:status-change",{isActive:s}))};i==="activate"?r(!0):i==="deactivate"&&r(!1)}updateClickStatus(t){this.isActive&&(t==="activate"?this.isValidClick=!0:t==="move"&&(this.isValidClick=!1))}};function W(n){let{size:e}=A(n);return{size:a(e)?e:10}}var f=class extends z{static getStyle({maxSize:e,minSize:t},i){let r=s=>a(s)?`${s}px`:void 0;return{[i?"maxHeight":"maxWidth"]:r(e),[i?"minHeight":"minWidth"]:r(t)}}sizeInfo=null;flexGrowRatio=0;constructor(e){super("SECTION",e.elm,()=>X(e)),this.updateStyle()}update({sizeInfo:e,flexGrowRatio:t}){this.sizeInfo=e,this.flexGrowRatio=t,this.updateStyle(),u(this.elm,"section:size-change",{size:e.currentSize})}updateStyle(){let{flexGrow:e,flexShrink:t,flexBasis:i}=this.getStyle();this.elm.style.flexGrow=`${e}`,this.elm.style.flexShrink=`${t}`}getStyle(){let e=a(this.config.size)?0:this.config.disableResponsive?1:0;if(this.sizeInfo){let{disableResponsive:t,currentSize:i}=this.sizeInfo;return{flexShrink:e,flexGrow:t?0:this.flexGrowRatio*i,flexBasis:t?i:0}}else{let t=this.config.size||this.config.defaultSize;return a(t)?{flexShrink:e,flexGrow:0,flexBasis:t}:{flexShrink:e,flexGrow:1,flexBasis:0}}}};function X(n){let{size:e,defaultSize:t,maxSize:i,minSize:r,disableResponsive:s}=A(n);return{size:a(e)?e:void 0,defaultSize:a(t)?t:void 0,maxSize:a(i)?i:void 0,minSize:a(r)?r:void 0,disableResponsive:!!s}}var L=class{constructor(e){this.config=e;this.barStore=V({calculateOffset:(t,i)=>w(t,i)[this.axis],getSizeRelatedInfo:()=>this.makeSizeInfos()})}styles={container:e=>({...e,display:"flex"}),section:(e,t)=>({...t,...f.getStyle(e,this.config.vertical)}),bar:(e,t)=>({...t,...p.getStyle(e)})};attributes={bar:B("BAR"),section:B("SECTION")};itemsCache=new R;eventHub=new b;container=null;barStore;get axis(){return this.config.vertical?"y":"x"}get dimension(){return this.config.vertical?"height":"width"}get direction(){return this.config.vertical?"column":"row"}get on(){return this.eventHub.watchResizerEvent}init(e){this.dispose(),this.container=e,e&&(this.itemsCache.update(H(e).map(t=>{switch(t.type){case"BAR":return new p(t,this.dispatchBarAction);case"SECTION":return new f(t)}})),this.initStyles(e,this.itemsCache.getItems()),this.sizeRelatedInfoChange(this.makeSizeInfos()),this.barStore.subscribe(t=>{this.monitorBarStatusChanges(t),this.sizeRelatedInfoChange(t)}))}dispose(){this.container=null,this.itemsCache.reset(),this.barStore.unsubscribeAll(),this.eventHub.reset()}getResizer(){return new h(this.makeSizeInfos())}applyResizer(e){this.sizeRelatedInfoChange(e.getResult())}dispatchBarAction=(e,t)=>{let i=this.itemsCache.getItemIndex(e);i&&this.barStore.dispatch({...t,barIndex:i})};sizeRelatedInfoChange(e){e.discard||(e=(()=>{if(typeof this.config.beforeApplyResizer=="function"){let t=new h(e);return this.config.beforeApplyResizer(t),t.getResult()}else return e})(),!e.discard&&e.sizeInfoArray.forEach(t=>{let i=this.itemsCache.getItem(t.elm);i instanceof f&&i.update({sizeInfo:t,flexGrowRatio:e.flexGrowRatio})}))}monitorBarStatusChanges({type:e}){switch(e){case"activate":return u(this.container,"column:activate",null);case"deactivate":return u(this.container,"column:after-resizing",null);default:return}}makeSizeInfos(){let{collect:e,getResult:t}=I();return this.itemsCache.getItems().forEach(i=>{i instanceof p&&e({elm:i.elm,disableResponsive:!0,isSolid:!0,currentSize:i.elm.getBoundingClientRect()[this.dimension]}),i instanceof f&&e({elm:i.elm,maxSize:i.config.maxSize,minSize:i.config.minSize,disableResponsive:D(i.config),isSolid:E(i.config),currentSize:i.elm.getBoundingClientRect()[this.dimension]})}),t()}initStyles(e,t){Object.assign(e.style,this.styles.container()),t.forEach(i=>{i instanceof p&&Object.assign(i.elm.style,this.styles.bar(i.config)),i instanceof f&&Object.assign(i.elm.style,this.styles.section(i.config))})}};0&&(module.exports={BarActionType,ColumnResizer,ItemType,Resizer});
//# sourceMappingURL=index.cjs.map