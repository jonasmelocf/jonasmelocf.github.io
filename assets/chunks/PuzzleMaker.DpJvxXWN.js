const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/ClipboardCopyButton.BvQlhRFH.js","assets/chunks/framework.zZweFSJw.js","assets/chunks/PuzzleEditor.vue_vue_type_script_setup_true_lang.CufxKYqw.js","assets/chunks/theme.BgN5xByD.js","assets/chunks/play.DVZ1E63Z.js"])))=>i.map(i=>d[i]);
import{y as x,d as g,am as w,an as C,ao as I,o as p,c as b,n as _,k as n,ap as $,j as i,J as o,w as m,a as c,b as y,t as V,e as N,r as M,u as O,G as P,H as j,aj as J,ak as B}from"./framework.zZweFSJw.js";import{a as f,_ as U}from"./PuzzleEditor.vue_vue_type_script_setup_true_lang.CufxKYqw.js";import{m as z}from"./theme.BgN5xByD.js";import{c as S}from"./play.DVZ1E63Z.js";const A=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]],D=S("send",A);const E=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],L=S("x",E);function R(){const s=x({id:"example-id",code:`const [msg] = input();
console.log(msg);`,tests:[{input:["example"],expects:"example"}]});function r(){s.value.tests.push({input:[],expects:""})}function t(d){s.value.tests.splice(d,1)}return{puzzle:s,addTest:r,removeTest:t}}const h=g({__name:"Input",props:$({class:{}},{modelValue:{},modelModifiers:{}}),emits:["update:modelValue"],setup(s){const r=s,t=w(s,"modelValue");return(d,l)=>C((p(),b("input",{"onUpdate:modelValue":l[0]||(l[0]=u=>t.value=u),class:_(n(z)(`
    w-full h-7 p-2
    bg-neutral-900
    border border-neutral-800 rounded
    inset-shadow-xs inset-shadow-black
    text-base
  `,r.class))},null,2)),[[I,t.value]])}}),F=g({__name:"TextArea",props:$({class:{}},{modelValue:{},modelModifiers:{}}),emits:["update:modelValue"],setup(s){const r=s,t=w(s,"modelValue");return(d,l)=>C((p(),b("textarea",{"onUpdate:modelValue":l[0]||(l[0]=u=>t.value=u),class:_(n(z)(`
  w-full p-2
  bg-neutral-900
  border border-neutral-800 rounded
  inset-shadow-xs inset-shadow-black
  text-base
`,r.class))},null,2)),[[I,t.value]])}}),q={class:"group/main relative grid gap-4 bg-linear-to-br from-neutral-800 to-neutral-900 border border-neutral-800 rounded-xl p-6 text-xs text-white"},G={class:"group grid gap-2.5"},H={class:"group grid gap-2.5"},W=g({__name:"TestAttributes",props:{test:{}},emits:["click:close"],setup(s,{emit:r}){const t=r,d=x(JSON.stringify(s.test.input)),l=x("");function u(){const v=d.value.trim();l.value="";try{const e=JSON.parse(v);if(!Array.isArray(e))throw null;s.test.input=e}catch{l.value="invalid json array"}}return(v,e)=>(p(),b("div",q,[i("button",{onClick:e[0]||(e[0]=a=>t("click:close",a)),class:"absolute top-2 right-2"},[o(n(L),{class:_([`
  group-hover/main:opacity-70
  transition
  opacity-0 group-hover:opacity-100
  hover:opacity-100
  text-neutral-500
  size-4 rounded-full
  p-0.5
  bg-neutral-800/60
`])})]),i("div",G,[o(f,{class:"transition group-hover:text-neutral-400"},{default:m(()=>[...e[3]||(e[3]=[c("Inputs",-1)])]),_:1}),o(h,{modelValue:d.value,"onUpdate:modelValue":e[1]||(e[1]=a=>d.value=a),onChange:u},null,8,["modelValue"]),l.value?(p(),y(f,{key:0,class:"text-red-500"},{default:m(()=>[c(V(l.value),1)]),_:1})):N("",!0)]),i("div",H,[o(f,{class:"transition group-hover:text-neutral-400"},{default:m(()=>[...e[4]||(e[4]=[c("Expects",-1)])]),_:1}),o(F,{modelValue:s.test.expects,"onUpdate:modelValue":e[2]||(e[2]=a=>s.test.expects=a)},null,8,["modelValue"])])]))}}),T=g({__name:"Button",props:{class:{}},setup(s){const r=s;return(t,d)=>(p(),b("button",{type:"button",class:_(n(z)(`
border
border-neutral-700/15
bg-neutral-900
hover:bg-neutral-900/80
active:bg-neutral-950
active:shadow-none
active:inset-shadow-xs
active:inset-shadow-black
active:translate-y-px
rounded-lg
font-medium
text-sm
shadow-md
px-2 py-0.5
`,r.class))},[M(t.$slots,"default")],2))}}),X={class:"flex gap-3"},K=g({__name:"ImportPuzzleForm",emits:["import"],setup(s,{emit:r}){const{lang:t}=O(),d=r,l=x(""),u=x(!1);function v(){u.value=!1;try{const e=JSON.parse(l.value);d("import",e),l.value=""}catch{u.value=!0,setTimeout(()=>{u.value=!1},3e3)}}return(e,a)=>(p(),b("div",null,[o(f,{class:"block mb-3"},{default:m(()=>[c(V(n(t)==="br"?"Importar":"Import"),1)]),_:1}),i("div",X,[o(h,{modelValue:l.value,"onUpdate:modelValue":a[0]||(a[0]=k=>l.value=k),placeholder:'{ "id": "example-id", tests: [{...}]}'},null,8,["modelValue"]),o(T,{onClick:v,class:"h-full p-1"},{default:m(()=>[o(n(D),{strokeWidth:"1",size:20})]),_:1})]),u.value?(p(),y(f,{key:0,class:"text-red-500 mt-2"},{default:m(()=>[...a[1]||(a[1]=[c("Invalid JSON",-1)])]),_:1})):N("",!0)]))}}),Q={class:_([`
  grid gap-3
  mt-12 mb-8 p-8
  bg-linear-to-br from-neutral-900 to-neutral-950
  border border-neutral-700 rounded 
  text-neutral-100
`])},Y={class:"flex gap-6 items-center"},Z={class:"grid grid-cols-2 gap-4 mb-4"},ee={class:"relative whitespace-break-spaces border border-neutral-800 bg-neutral-950 inset-shadow-xs inset-shadow-black p-4 rounded text-sm"},te=g({__name:"PuzzleMaker",setup(s){const r=J(()=>B(()=>import("./ClipboardCopyButton.BvQlhRFH.js"),__vite__mapDeps([0,1,2,3,4]))),{puzzle:t,addTest:d,removeTest:l}=R(),u=v=>{try{return JSON.stringify(v,null,2)}catch{return}};return(v,e)=>(p(),b("div",Q,[o(K,{onImport:e[0]||(e[0]=a=>t.value=a)}),e[5]||(e[5]=i("hr",null,null,-1)),i("div",null,[o(f,{class:"block mb-3"},{default:m(()=>[...e[2]||(e[2]=[c("Puzzle ID",-1)])]),_:1}),o(h,{modelValue:n(t).id,"onUpdate:modelValue":e[1]||(e[1]=a=>n(t).id=a),type:"text"},null,8,["modelValue"])]),e[6]||(e[6]=i("hr",null,null,-1)),i("div",Y,[o(f,null,{default:m(()=>[...e[3]||(e[3]=[c("Test Cases",-1)])]),_:1}),o(T,{class:"w-fit aspect-square text-lg",onClick:n(d)},{default:m(()=>[...e[4]||(e[4]=[c("+",-1)])]),_:1},8,["onClick"])]),i("div",Z,[(p(!0),b(P,null,j(n(t).tests,(a,k)=>(p(),y(W,{test:a,"onClick:close":()=>n(l)(k)},null,8,["test","onClick:close"]))),256))]),o(U,{disableSave:!0,puzzle:n(t)},null,8,["puzzle"]),i("div",ee,[o(n(r),{label:"Copy",class:"absolute top-2 right-2",content:u(n(t))},null,8,["content"]),c(" "+V(u(n(t))??"Invalid JSON"),1)])]))}}),ne=Object.freeze(Object.defineProperty({__proto__:null,default:te},Symbol.toStringTag,{value:"Module"}));export{ne as P,T as _};
