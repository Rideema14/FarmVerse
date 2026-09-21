import{r as e}from"./rolldown-runtime-hePW80VL.js";import{An as t,In as n,Jt as r,Pn as i,Y as a,jt as o,kt as s,qt as c}from"./vendor-C7U2VwCD.js";import{f as l,l as u,n as d}from"./vendor-react-CwOYrXWP.js";import{r as f}from"./api-DPxjCZ-3.js";import{U as p,W as m,_ as h,r as g}from"./index-C_2mt7S3.js";import{t as _}from"./GoogleSignInButton-BX_xVug_.js";var v=e(n(),1),y=i();function b(){let[e,n]=(0,v.useState)(``),[i,b]=(0,v.useState)(``),[x,S]=(0,v.useState)(!1),[C,w]=(0,v.useState)(``),[T,E]=(0,v.useState)(!1),D=u(),[O]=l(),{login:k}=p(),{t:A}=m(),j=O.get(`next`)??`/home`;async function M(t){if(t.preventDefault(),!(!e.trim()||!i)){w(``),E(!0);try{await k(e.trim().toLowerCase(),i),D(j)}catch(e){w(f(e,A(`auth.couldNotLogIn`)))}finally{E(!1)}}}return(0,y.jsx)(`main`,{className:`min-h-[calc(100svh-64px)] w-full overflow-hidden px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8`,children:(0,y.jsxs)(`div`,{className:`
        mx-auto
        grid
        h-full
        min-h-[calc(100svh-96px)]
        w-full
        max-w-[1180px]
        overflow-hidden
        rounded-[24px]
        bg-[#EFF1E9]
        shadow-[0_24px_70px_rgba(20,30,14,0.25)]
        lg:grid-cols-2
      `,children:[(0,y.jsx)(`section`,{className:`relative hidden bg-[#2B3621] lg:block`,children:(0,y.jsxs)(`div`,{className:`flex h-full flex-col justify-between px-10 py-9 xl:px-14`,children:[(0,y.jsxs)(d,{to:`/`,className:`flex w-fit items-center gap-2.5`,children:[(0,y.jsx)(`span`,{className:`flex h-9 w-9 items-center justify-center rounded-xl bg-[#45572D] text-[#E3E9D8]`,children:(0,y.jsx)(a,{className:`h-[17px] w-[17px]`,strokeWidth:1.8})}),(0,y.jsx)(`span`,{className:`text-sm font-semibold text-[#F1F3EB]`,children:`FarmVerse`})]}),(0,y.jsxs)(`div`,{className:`max-w-[430px]`,children:[(0,y.jsx)(`p`,{className:`mb-4 text-[9px] font-bold uppercase tracking-[0.2em] text-[#AAB991]`,children:A(`auth.smartAgriTagline`)}),(0,y.jsx)(`h1`,{className:`text-[clamp(42px,5vw,64px)] font-semibold leading-[0.92] tracking-[-0.06em] text-[#F3F5EE]`,children:A(`auth.farmSmarterTitle`)}),(0,y.jsx)(`p`,{className:`mt-6 max-w-[380px] text-[13px] leading-6 text-[#AEB7A1]`,children:A(`auth.farmSmarterDesc`)}),(0,y.jsxs)(`div`,{className:`mt-7 flex flex-wrap gap-2`,children:[(0,y.jsx)(`span`,{className:`rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[9px] text-[#C2CAB6]`,children:A(`auth.tagMarketplace`)}),(0,y.jsx)(`span`,{className:`rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[9px] text-[#C2CAB6]`,children:A(`auth.tagAiInsights`)}),(0,y.jsx)(`span`,{className:`rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[9px] text-[#C2CAB6]`,children:A(`auth.tagMarketData`)})]})]}),(0,y.jsx)(`span`,{className:`text-[9px] text-[#7F8B70]`,children:A(`auth.intelligentToolsFooter`)})]})}),(0,y.jsx)(`section`,{className:`flex items-center justify-center bg-[#EFF1E9]`,children:(0,y.jsxs)(`div`,{className:`w-full max-w-[380px] px-6 py-8 sm:px-10`,children:[(0,y.jsxs)(`div`,{className:`mb-7`,children:[(0,y.jsx)(`p`,{className:`mb-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#657A3E]`,children:`Welcome back`}),(0,y.jsx)(`h2`,{className:`text-[32px] font-semibold leading-none tracking-[-0.05em] text-[#283020]`,children:A(`auth.login`)}),(0,y.jsx)(`p`,{className:`mt-3 text-xs text-[#7D8676]`,children:A(`auth.welcomeBack`)})]}),(0,y.jsxs)(`form`,{onSubmit:M,noValidate:!0,children:[(0,y.jsxs)(`div`,{className:`relative`,children:[(0,y.jsx)(s,{className:`pointer-events-none absolute left-0 top-[31px] h-[15px] w-[15px] text-[#657A45]`}),(0,y.jsx)(g,{id:`email`,label:A(`auth.email`),type:`email`,autoComplete:`email`,placeholder:`you@example.com`,value:e,onChange:e=>n(e.target.value),required:!0,className:`
                  h-10
                  rounded-none
                  border-x-0
                  border-t-0
                  border-b-[#C9D0C0]
                  bg-transparent
                  pl-6
                  text-xs
                  shadow-none
                  focus:border-[#526A30]
                  focus:ring-0
                `})]}),(0,y.jsxs)(`div`,{className:`relative mt-5`,children:[(0,y.jsx)(o,{className:`pointer-events-none absolute left-0 top-[31px] h-[15px] w-[15px] text-[#657A45]`}),(0,y.jsx)(g,{id:`password`,label:A(`auth.password`),type:x?`text`:`password`,autoComplete:`current-password`,value:i,onChange:e=>b(e.target.value),required:!0,className:`
                  h-10
                  rounded-none
                  border-x-0
                  border-t-0
                  border-b-[#C9D0C0]
                  bg-transparent
                  pl-6
                  pr-9
                  text-xs
                  shadow-none
                  focus:border-[#526A30]
                  focus:ring-0
                `}),(0,y.jsx)(`button`,{type:`button`,onClick:()=>S(e=>!e),className:`absolute right-0 top-[27px] flex h-7 w-7 items-center justify-center rounded-md text-[#899285] hover:bg-[#E1E5DC]`,children:x?(0,y.jsx)(r,{className:`h-3.5 w-3.5`}):(0,y.jsx)(c,{className:`h-3.5 w-3.5`})})]}),(0,y.jsx)(`div`,{className:`mt-2.5 flex justify-end`,children:(0,y.jsx)(d,{to:`/forgot-password`,className:`text-[10px] font-semibold text-[#687857] hover:underline`,children:A(`auth.forgotPassword`)})}),C&&(0,y.jsx)(`div`,{className:`mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2`,children:(0,y.jsx)(`p`,{className:`text-[10px] text-red-600`,children:C})}),(0,y.jsxs)(h,{type:`submit`,fullWidth:!0,loading:T,className:`
                mt-5
                h-10
                rounded-[9px]
                bg-[#405329]
                text-xs
                font-semibold
                text-white
                shadow-[0_6px_16px_rgba(64,83,41,0.18)]
                hover:bg-[#34461F]
              `,children:[A(`auth.login`),(0,y.jsx)(t,{className:`ml-1.5 h-3.5 w-3.5`})]})]}),(0,y.jsxs)(`div`,{className:`my-5 flex items-center gap-3`,children:[(0,y.jsx)(`span`,{className:`h-px flex-1 bg-[#D7DCD2]`}),(0,y.jsx)(`span`,{className:`text-[8px] font-bold uppercase tracking-[0.15em] text-[#9BA297]`,children:A(`auth.orDivider`)}),(0,y.jsx)(`span`,{className:`h-px flex-1 bg-[#D7DCD2]`})]}),(0,y.jsx)(_,{onSuccess:()=>D(j),onError:w}),(0,y.jsxs)(`p`,{className:`mt-5 text-center text-[10px] text-[#858D80]`,children:[A(`auth.newToFarmVerse`),` `,(0,y.jsx)(d,{to:`/register`,className:`font-semibold text-[#536A31] hover:underline`,children:A(`auth.register`)})]})]})})]})})}export{b as default};