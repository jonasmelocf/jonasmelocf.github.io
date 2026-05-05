import{_ as m}from"./Label.vue_vue_type_script_setup_true_lang.CrGQfw54.js";import{m as t}from"./theme.CW9uM7Zm.js";import{d as n,o,c as r,n as d,k as i,J as c,w as p,a as f,t as b,r as x,ap as g,am as _,an as w,aq as V}from"./framework.C6Di05Hi.js";const B=n({__name:"Field",props:{label:{},inline:{type:Boolean,default:!1}},setup(e){return(a,l)=>(o(),r("div",{class:d(i(t)({"flex items-center gap-2":e.inline,"grid gap-3":!e.inline}))},[c(m,null,{default:p(()=>[f(b(e.label),1)]),_:1}),x(a.$slots,"default")],2))}}),C=n({__name:"Input",props:V({class:{}},{modelValue:{},modelModifiers:{}}),emits:["update:modelValue"],setup(e){const a=e,l=g(e,"modelValue");return(h,s)=>_((o(),r("input",{"onUpdate:modelValue":s[0]||(s[0]=u=>l.value=u),class:d(i(t)(`
    w-full h-7 p-2
    text-neutral-200
    bg-neutral-900
    border border-neutral-800 rounded
    inset-shadow-xs inset-shadow-black
    text-base
    disabled:bg-neutral-800
    disabled:text-neutral-500
  `,a.class))},null,2)),[[w,l.value]])}});export{B as _,C as a};
