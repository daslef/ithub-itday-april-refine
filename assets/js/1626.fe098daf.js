"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[1626],{24604:(e,t,r)=>{r.d(t,{v:()=>Y});var n=r(67294),u=r(32984),i=r(12351),a=r(9362),o=r(94192),l=r(16723),c=r(23784),s=r(19946),f=r(61363);var d,m=((d=m||{})[d.First=0]="First",d[d.Previous=1]="Previous",d[d.Next=2]="Next",d[d.Last=3]="Last",d[d.Specific=4]="Specific",d[d.Nothing=5]="Nothing",d);function p(e,t){let r=t.resolveItems();if(r.length<=0)return null;let n=t.resolveActiveIndex(),u=null!=n?n:-1,i=(()=>{switch(e.focus){case 0:return r.findIndex((e=>!t.resolveDisabled(e)));case 1:{let e=r.slice().reverse().findIndex(((e,r,n)=>!(-1!==u&&n.length-r-1>=u)&&!t.resolveDisabled(e)));return-1===e?e:r.length-1-e}case 2:return r.findIndex(((e,r)=>!(r<=u)&&!t.resolveDisabled(e)));case 3:{let e=r.slice().reverse().findIndex((e=>!t.resolveDisabled(e)));return-1===e?e:r.length-1-e}case 4:return r.findIndex((r=>t.resolveId(r)===e.id));case 5:return null;default:!function(e){throw new Error("Unexpected object: "+e)}(e)}})();return-1===i?n:i}var v=r(64103),y=r(84575),I=r(39650),R=r(15466);var g=r(16567),h=r(14157),x=r(51074),b=r(73781);function E(e){return[e.screenX,e.screenY]}function M(){let e=(0,n.useRef)([-1,-1]);return{wasMoved(t){let r=E(t);return(e.current[0]!==r[0]||e.current[1]!==r[1])&&(e.current=r,!0)},update(t){e.current=E(t)}}}let P=/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;function S(e){var t,r;let n=null!=(t=e.innerText)?t:"",u=e.cloneNode(!0);if(!(u instanceof HTMLElement))return n;let i=!1;for(let o of u.querySelectorAll('[hidden],[aria-hidden],[role="img"]'))o.remove(),i=!0;let a=i?null!=(r=u.innerText)?r:"":n;return P.test(a)&&(a=a.replace(P,"")),a}function D(e){let t=(0,n.useRef)(""),r=(0,n.useRef)("");return(0,b.z)((()=>{let n=e.current;if(!n)return"";let u=n.innerText;if(t.current===u)return r.current;let i=function(e){let t=e.getAttribute("aria-label");if("string"==typeof t)return t.trim();let r=e.getAttribute("aria-labelledby");if(r){let e=r.split(" ").map((e=>{let t=document.getElementById(e);if(t){let e=t.getAttribute("aria-label");return"string"==typeof e?e.trim():S(t).trim()}return null})).filter(Boolean);if(e.length>0)return e.join(", ")}return S(e).trim()}(n).trim().toLowerCase();return t.current=u,r.current=i,i}))}var F,k=((F=k||{})[F.Open=0]="Open",F[F.Closed=1]="Closed",F),w=(e=>(e[e.Pointer=0]="Pointer",e[e.Other=1]="Other",e))(w||{}),T=(e=>(e[e.OpenMenu=0]="OpenMenu",e[e.CloseMenu=1]="CloseMenu",e[e.GoToItem=2]="GoToItem",e[e.Search=3]="Search",e[e.ClearSearch=4]="ClearSearch",e[e.RegisterItem=5]="RegisterItem",e[e.UnregisterItem=6]="UnregisterItem",e))(T||{});function C(e,t=(e=>e)){let r=null!==e.activeItemIndex?e.items[e.activeItemIndex]:null,n=(0,y.z2)(t(e.items.slice()),(e=>e.dataRef.current.domRef.current)),u=r?n.indexOf(r):null;return-1===u&&(u=null),{items:n,activeItemIndex:u}}let A={1:e=>1===e.menuState?e:{...e,activeItemIndex:null,menuState:1},0:e=>0===e.menuState?e:{...e,__demoMode:!1,menuState:0},2:(e,t)=>{var r;let n=C(e),u=p(t,{resolveItems:()=>n.items,resolveActiveIndex:()=>n.activeItemIndex,resolveId:e=>e.id,resolveDisabled:e=>e.dataRef.current.disabled});return{...e,...n,searchQuery:"",activeItemIndex:u,activationTrigger:null!=(r=t.trigger)?r:1}},3:(e,t)=>{let r=""!==e.searchQuery?0:1,n=e.searchQuery+t.value.toLowerCase(),u=(null!==e.activeItemIndex?e.items.slice(e.activeItemIndex+r).concat(e.items.slice(0,e.activeItemIndex+r)):e.items).find((e=>{var t;return(null==(t=e.dataRef.current.textValue)?void 0:t.startsWith(n))&&!e.dataRef.current.disabled})),i=u?e.items.indexOf(u):-1;return-1===i||i===e.activeItemIndex?{...e,searchQuery:n}:{...e,searchQuery:n,activeItemIndex:i,activationTrigger:1}},4:e=>""===e.searchQuery?e:{...e,searchQuery:"",searchActiveItemIndex:null},5:(e,t)=>{let r=C(e,(e=>[...e,{id:t.id,dataRef:t.dataRef}]));return{...e,...r}},6:(e,t)=>{let r=C(e,(e=>{let r=e.findIndex((e=>e.id===t.id));return-1!==r&&e.splice(r,1),e}));return{...e,...r,activationTrigger:1}}},O=(0,n.createContext)(null);function L(e){let t=(0,n.useContext)(O);if(null===t){let t=new Error(`<${e} /> is missing a parent <Menu /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(t,L),t}return t}function N(e,t){return(0,u.E)(t.type,A,e,t)}O.displayName="MenuContext";let z=n.Fragment;let _=i.AN.RenderStrategy|i.AN.Static;let Q=n.Fragment;let B=(0,i.yV)((function(e,t){let{__demoMode:r=!1,...a}=e,o=(0,n.useReducer)(N,{__demoMode:r,menuState:r?0:1,buttonRef:(0,n.createRef)(),itemsRef:(0,n.createRef)(),items:[],searchQuery:"",activeItemIndex:null,activationTrigger:1}),[{menuState:l,itemsRef:s,buttonRef:f},d]=o,m=(0,c.T)(t);(0,I.O)([f,s],((e,t)=>{var r;d({type:1}),(0,y.sP)(t,y.tJ.Loose)||(e.preventDefault(),null==(r=f.current)||r.focus())}),0===l);let p=(0,b.z)((()=>{d({type:1})})),v=(0,n.useMemo)((()=>({open:0===l,close:p})),[l,p]),R={ref:m};return n.createElement(O.Provider,{value:o},n.createElement(g.up,{value:(0,u.E)(l,{0:g.ZM.Open,1:g.ZM.Closed})},(0,i.sY)({ourProps:R,theirProps:a,slot:v,defaultTag:z,name:"Menu"})))})),U=(0,i.yV)((function(e,t){var r;let u=(0,s.M)(),{id:a=`headlessui-menu-button-${u}`,...l}=e,[d,p]=L("Menu.Button"),y=(0,c.T)(d.buttonRef,t),I=(0,o.G)(),R=(0,b.z)((e=>{switch(e.key){case f.R.Space:case f.R.Enter:case f.R.ArrowDown:e.preventDefault(),e.stopPropagation(),p({type:0}),I.nextFrame((()=>p({type:2,focus:m.First})));break;case f.R.ArrowUp:e.preventDefault(),e.stopPropagation(),p({type:0}),I.nextFrame((()=>p({type:2,focus:m.Last})))}})),g=(0,b.z)((e=>{if(e.key===f.R.Space)e.preventDefault()})),x=(0,b.z)((t=>{if((0,v.P)(t.currentTarget))return t.preventDefault();e.disabled||(0===d.menuState?(p({type:1}),I.nextFrame((()=>{var e;return null==(e=d.buttonRef.current)?void 0:e.focus({preventScroll:!0})}))):(t.preventDefault(),p({type:0})))})),E=(0,n.useMemo)((()=>({open:0===d.menuState})),[d]),M={ref:y,id:a,type:(0,h.f)(e,d.buttonRef),"aria-haspopup":"menu","aria-controls":null==(r=d.itemsRef.current)?void 0:r.id,"aria-expanded":e.disabled?void 0:0===d.menuState,onKeyDown:R,onKeyUp:g,onClick:x};return(0,i.sY)({ourProps:M,theirProps:l,slot:E,defaultTag:"button",name:"Menu.Button"})})),V=(0,i.yV)((function(e,t){var r,u;let d=(0,s.M)(),{id:p=`headlessui-menu-items-${d}`,...v}=e,[I,h]=L("Menu.Items"),E=(0,c.T)(I.itemsRef,t),M=(0,x.i)(I.itemsRef),P=(0,o.G)(),S=(0,g.oJ)(),D=null!==S?(S&g.ZM.Open)===g.ZM.Open:0===I.menuState;(0,n.useEffect)((()=>{let e=I.itemsRef.current;e&&0===I.menuState&&e!==(null==M?void 0:M.activeElement)&&e.focus({preventScroll:!0})}),[I.menuState,I.itemsRef,M]),function({container:e,accept:t,walk:r,enabled:u=!0}){let i=(0,n.useRef)(t),a=(0,n.useRef)(r);(0,n.useEffect)((()=>{i.current=t,a.current=r}),[t,r]),(0,l.e)((()=>{if(!e||!u)return;let t=(0,R.r)(e);if(!t)return;let r=i.current,n=a.current,o=Object.assign((e=>r(e)),{acceptNode:r}),l=t.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,o,!1);for(;l.nextNode();)n(l.currentNode)}),[e,u,i,a])}({container:I.itemsRef.current,enabled:0===I.menuState,accept:e=>"menuitem"===e.getAttribute("role")?NodeFilter.FILTER_REJECT:e.hasAttribute("role")?NodeFilter.FILTER_SKIP:NodeFilter.FILTER_ACCEPT,walk(e){e.setAttribute("role","none")}});let F=(0,b.z)((e=>{var t,r;switch(P.dispose(),e.key){case f.R.Space:if(""!==I.searchQuery)return e.preventDefault(),e.stopPropagation(),h({type:3,value:e.key});case f.R.Enter:if(e.preventDefault(),e.stopPropagation(),h({type:1}),null!==I.activeItemIndex){let{dataRef:e}=I.items[I.activeItemIndex];null==(r=null==(t=e.current)?void 0:t.domRef.current)||r.click()}(0,y.wI)(I.buttonRef.current);break;case f.R.ArrowDown:return e.preventDefault(),e.stopPropagation(),h({type:2,focus:m.Next});case f.R.ArrowUp:return e.preventDefault(),e.stopPropagation(),h({type:2,focus:m.Previous});case f.R.Home:case f.R.PageUp:return e.preventDefault(),e.stopPropagation(),h({type:2,focus:m.First});case f.R.End:case f.R.PageDown:return e.preventDefault(),e.stopPropagation(),h({type:2,focus:m.Last});case f.R.Escape:e.preventDefault(),e.stopPropagation(),h({type:1}),(0,a.k)().nextFrame((()=>{var e;return null==(e=I.buttonRef.current)?void 0:e.focus({preventScroll:!0})}));break;case f.R.Tab:e.preventDefault(),e.stopPropagation(),h({type:1}),(0,a.k)().nextFrame((()=>{(0,y.EO)(I.buttonRef.current,e.shiftKey?y.TO.Previous:y.TO.Next)}));break;default:1===e.key.length&&(h({type:3,value:e.key}),P.setTimeout((()=>h({type:4})),350))}})),k=(0,b.z)((e=>{if(e.key===f.R.Space)e.preventDefault()})),w=(0,n.useMemo)((()=>({open:0===I.menuState})),[I]),T={"aria-activedescendant":null===I.activeItemIndex||null==(r=I.items[I.activeItemIndex])?void 0:r.id,"aria-labelledby":null==(u=I.buttonRef.current)?void 0:u.id,id:p,onKeyDown:F,onKeyUp:k,role:"menu",tabIndex:0,ref:E};return(0,i.sY)({ourProps:T,theirProps:v,slot:w,defaultTag:"div",features:_,visible:D,name:"Menu.Items"})})),K=(0,i.yV)((function(e,t){let r=(0,s.M)(),{id:u=`headlessui-menu-item-${r}`,disabled:o=!1,...f}=e,[d,p]=L("Menu.Item"),v=null!==d.activeItemIndex&&d.items[d.activeItemIndex].id===u,I=(0,n.useRef)(null),R=(0,c.T)(t,I);(0,l.e)((()=>{if(d.__demoMode||0!==d.menuState||!v||0===d.activationTrigger)return;let e=(0,a.k)();return e.requestAnimationFrame((()=>{var e,t;null==(t=null==(e=I.current)?void 0:e.scrollIntoView)||t.call(e,{block:"nearest"})})),e.dispose}),[d.__demoMode,I,v,d.menuState,d.activationTrigger,d.activeItemIndex]);let g=D(I),h=(0,n.useRef)({disabled:o,domRef:I,get textValue(){return g()}});(0,l.e)((()=>{h.current.disabled=o}),[h,o]),(0,l.e)((()=>(p({type:5,id:u,dataRef:h}),()=>p({type:6,id:u}))),[h,u]);let x=(0,b.z)((()=>{p({type:1})})),E=(0,b.z)((e=>{if(o)return e.preventDefault();p({type:1}),(0,y.wI)(d.buttonRef.current)})),P=(0,b.z)((()=>{if(o)return p({type:2,focus:m.Nothing});p({type:2,focus:m.Specific,id:u})})),S=M(),F=(0,b.z)((e=>S.update(e))),k=(0,b.z)((e=>{S.wasMoved(e)&&(o||v||p({type:2,focus:m.Specific,id:u,trigger:0}))})),w=(0,b.z)((e=>{S.wasMoved(e)&&(o||v&&p({type:2,focus:m.Nothing}))})),T=(0,n.useMemo)((()=>({active:v,disabled:o,close:x})),[v,o,x]);return(0,i.sY)({ourProps:{id:u,ref:R,role:"menuitem",tabIndex:!0===o?void 0:-1,"aria-disabled":!0===o||void 0,disabled:void 0,onClick:E,onFocus:P,onPointerEnter:F,onMouseEnter:F,onPointerMove:k,onMouseMove:k,onPointerLeave:w,onMouseLeave:w},theirProps:f,slot:T,defaultTag:Q,name:"Menu.Item"})})),Y=Object.assign(B,{Button:U,Items:V,Item:K})},21190:(e,t,r)=>{r.d(t,{M:()=>I});var n=r(70655),u=r(67294),i=r(49304),a=r(54735),o=r(58868);function l(){var e=(0,u.useRef)(!1);return(0,o.L)((function(){return e.current=!0,function(){e.current=!1}}),[]),e}var c=r(240),s=r(96681),f=r(76316),d=function(e){var t=e.children,r=e.initial,i=e.isPresent,a=e.onExitComplete,o=e.custom,l=e.presenceAffectsLayout,d=(0,s.h)(m),p=(0,f.M)(),v=(0,u.useMemo)((function(){return{id:p,initial:r,isPresent:i,custom:o,onExitComplete:function(e){var t,r;d.set(e,!0);try{for(var u=(0,n.XA)(d.values()),i=u.next();!i.done;i=u.next()){if(!i.value)return}}catch(o){t={error:o}}finally{try{i&&!i.done&&(r=u.return)&&r.call(u)}finally{if(t)throw t.error}}null==a||a()},register:function(e){return d.set(e,!1),function(){return d.delete(e)}}}}),l?void 0:[i]);return(0,u.useMemo)((function(){d.forEach((function(e,t){return d.set(t,!1)}))}),[i]),u.useEffect((function(){!i&&!d.size&&(null==a||a())}),[i]),u.createElement(c.O.Provider,{value:v},t)};function m(){return new Map}var p=r(25364),v=r(65411),y=function(e){return e.key||""};var I=function(e){var t=e.children,r=e.custom,c=e.initial,s=void 0===c||c,f=e.onExitComplete,m=e.exitBeforeEnter,I=e.presenceAffectsLayout,R=void 0===I||I,g=(0,n.CR)(function(){var e=l(),t=(0,n.CR)((0,u.useState)(0),2),r=t[0],i=t[1],o=(0,u.useCallback)((function(){e.current&&i(r+1)}),[r]);return[(0,u.useCallback)((function(){return a.ZP.postRender(o)}),[o]),r]}(),1),h=g[0],x=(0,u.useContext)(p.p).forceRender;x&&(h=x);var b=l(),E=function(e){var t=[];return u.Children.forEach(e,(function(e){(0,u.isValidElement)(e)&&t.push(e)})),t}(t),M=E,P=new Set,S=(0,u.useRef)(M),D=(0,u.useRef)(new Map).current,F=(0,u.useRef)(!0);if((0,o.L)((function(){F.current=!1,function(e,t){e.forEach((function(e){var r=y(e);t.set(r,e)}))}(E,D),S.current=M})),(0,v.z)((function(){F.current=!0,D.clear(),P.clear()})),F.current)return u.createElement(u.Fragment,null,M.map((function(e){return u.createElement(d,{key:y(e),isPresent:!0,initial:!!s&&void 0,presenceAffectsLayout:R},e)})));M=(0,n.ev)([],(0,n.CR)(M),!1);for(var k=S.current.map(y),w=E.map(y),T=k.length,C=0;C<T;C++){var A=k[C];-1===w.indexOf(A)&&P.add(A)}return m&&P.size&&(M=[]),P.forEach((function(e){if(-1===w.indexOf(e)){var t=D.get(e);if(t){var n=k.indexOf(e);M.splice(n,0,u.createElement(d,{key:y(t),isPresent:!1,onExitComplete:function(){D.delete(e),P.delete(e);var t=S.current.findIndex((function(t){return t.key===e}));if(S.current.splice(t,1),!P.size){if(S.current=E,!1===b.current)return;h(),f&&f()}},custom:r,presenceAffectsLayout:R},t))}}})),M=M.map((function(e){var t=e.key;return P.has(t)?e:u.createElement(d,{key:y(e),isPresent:!0,presenceAffectsLayout:R},e)})),"production"!==i.O&&m&&M.length>1&&console.warn("You're attempting to animate multiple children within AnimatePresence, but its exitBeforeEnter prop is set to true. This will lead to odd visual behaviour."),u.createElement(u.Fragment,null,P.size?M:M.map((function(e){return(0,u.cloneElement)(e)})))}}}]);