import{r as e}from"./rolldown-runtime-hePW80VL.js";import{$t as t,An as n,Dt as r,Et as i,G as a,H as o,In as s,K as c,L as l,Mt as u,O as d,Pn as f,W as p,Y as m,fn as h,ht as g,kt as _,ot as v,rt as y,un as b}from"./vendor-C7U2VwCD.js";import{n as x}from"./vendor-react-CwOYrXWP.js";import{W as S,v as C}from"./index-C_2mt7S3.js";import{n as w,t as T}from"./vendor-motion-Cgjl6ODA.js";var E=e(s(),1),D=f();w.registerPlugin(T);var O=[{heightRatio:.15,side:-1,lengthRatio:.45,archFactor:1.2,hue:101},{heightRatio:.28,side:1,lengthRatio:.52,archFactor:1.1,hue:105},{heightRatio:.42,side:-1,lengthRatio:.56,archFactor:.95,hue:98},{heightRatio:.58,side:1,lengthRatio:.5,archFactor:.85,hue:103},{heightRatio:.72,side:-1,lengthRatio:.42,archFactor:.75,hue:95}],k=[{id:`grain`,categoryKey:`landing.featureGrainCategory`,titleKey:`landing.featureGrainTitle`,descriptionKey:`landing.featureGrainDesc`,minProgress:.15,position:`left-top`,metricKey:`landing.featureGrainMetric`,icon:o,theme:`green`,patchRadius:`28px 10px 36px 14px`,rotateDeg:`-1.8deg`},{id:`roots`,categoryKey:`landing.featureRootsCategory`,titleKey:`landing.featureRootsTitle`,descriptionKey:`landing.featureRootsDesc`,minProgress:.38,position:`left-bottom`,metricKey:`landing.featureRootsMetric`,icon:m,theme:`yellow`,patchRadius:`12px 32px 14px 28px`,rotateDeg:`1.5deg`},{id:`harvest`,categoryKey:`landing.featureHarvestCategory`,titleKey:`landing.featureHarvestTitle`,descriptionKey:`landing.featureHarvestDesc`,minProgress:.62,position:`right-top`,metricKey:`landing.featureHarvestMetric`,icon:y,theme:`yellow`,patchRadius:`32px 14px 26px 10px`,rotateDeg:`2deg`},{id:`foliage`,categoryKey:`landing.featureFoliageCategory`,titleKey:`landing.featureFoliageTitle`,descriptionKey:`landing.featureFoliageDesc`,minProgress:.82,position:`right-bottom`,metricKey:`landing.featureFoliageMetric`,icon:a,theme:`green`,patchRadius:`14px 28px 10px 34px`,rotateDeg:`-1.4deg`}];function A(e,t=0,n=1){return Math.max(t,Math.min(n,e))}function j(e,t,n){return e+(t-e)*n}function M(e){return 1-(1-A(e))**3}function N(e,t){return Math.sin(e*1.2+t)*.55+Math.sin(e*2.7+t*1.4)*.3+Math.sin(e*4.2+t*2.8)*.15}function P(e,t,n,r,i,a){if(a<=0)return;let o=M(a);e.save(),e.lineCap=`round`;for(let a=0;a<20;a++){let s=(a/19-.5)*1.7,c=i*(.65+Math.abs(Math.sin(a*4.3))*.5)*o,l=r*s*.55*o,u=t+l+Math.sin(a*2.5)*18,d=n+c,f=t+l*.4+Math.cos(a*1.8)*14,p=n+c*.5;e.beginPath(),e.moveTo(t,n),e.quadraticCurveTo(f,p,u,d);let m=e.createLinearGradient(t,n,u,d);m.addColorStop(0,`#d6b841`),m.addColorStop(.5,`#5c744d`),m.addColorStop(1,`rgba(16,39,1,0)`),e.strokeStyle=m,e.lineWidth=Math.max(.6,2.5*(1-a/20*.3)*(1-(d-n)/i)),e.stroke()}e.restore()}function F(e,t,n,r,i,a,o,s,c,l,u){if(o<=0)return;let d=M(o),f=a*d,p=Math.max(4,f*.06),m=t+i*f*.72+s*28,h=n-.35/c*f+(1-d*.3)*30+(1-u)*10,g=t+i*f*.45+s*12,_=n-.6/c*f;e.save(),e.beginPath(),e.moveTo(t-r*.5,n+6),e.quadraticCurveTo(g+i*p,_,m,h),e.quadraticCurveTo(g-p*.3*i,_+8,t+r*.5,n-4),e.closePath();let v=j(l,47,u),y=j(28,48,u),b=j(38,60,u),x=e.createLinearGradient(t,n,m,h);x.addColorStop(0,`hsl(${v-8}, ${b}%, ${y-10}%)`),x.addColorStop(.5,`hsl(${v}, ${b}%, ${y}%)`),x.addColorStop(1,`hsl(${v+12}, ${b+10}%, ${y+12}%)`),e.fillStyle=x,e.fill(),e.beginPath(),e.moveTo(t,n),e.quadraticCurveTo(g,_,m,h),e.strokeStyle=`hsl(${v+15}, 80%, ${y+25}%)`,e.lineWidth=1.2,e.stroke(),e.restore()}function I(e,t,n,r,i,a,o){if(i<=0)return;let s=M(i),c=r*s;e.save(),e.translate(t,n),e.rotate(a*.15);let l=j(98,47,o),u=j(35,62,o),d=j(32,54,o);e.beginPath(),e.moveTo(0,0),e.lineTo(0,-c),e.strokeStyle=`hsl(${l}, ${u}%, ${d-10}%)`,e.lineWidth=3,e.stroke();for(let t=0;t<15;t++){let n=t/15;if(n>s)continue;let r=-c*n,i=t%2==0?1:-1,o=(1-Math.abs(n-.5)*.65)*15*Math.min(1,s*1.2);e.save(),e.translate(i*2.5,r),e.rotate(i*.38+a*.05),e.beginPath(),e.ellipse(o*.45*i,0,o*.52,o*.88,i*-.25,0,Math.PI*2);let f=e.createRadialGradient(o*.2*i,-o*.2,1,0,0,o*.9);f.addColorStop(0,`hsl(${l+14}, ${u+10}%, ${d+22}%)`),f.addColorStop(.6,`hsl(${l}, ${u}%, ${d}%)`),f.addColorStop(1,`hsl(${l-8}, ${u-10}%, ${d-15}%)`),e.fillStyle=f,e.strokeStyle=`hsl(${l-12}, ${u}%, ${d-20}%)`,e.lineWidth=.7,e.fill(),e.stroke();let p=o*2.8*Math.min(1,s*1.5);e.beginPath(),e.moveTo(o*.6*i,-o*.6),e.quadraticCurveTo(o*1.2*i,-o*1.8,o*1.5*i,-o*.6-p),e.strokeStyle=`hsl(${l+12}, ${u+15}%, ${d+20}%)`,e.lineWidth=.95,e.stroke(),e.restore()}if(s>.8)for(let t=-2;t<=2;t++)e.beginPath(),e.moveTo(t*1.8,-c),e.quadraticCurveTo(t*4.5,-c-20,t*8,-c-45),e.strokeStyle=`hsl(${l+12}, ${u+15}%, ${d+22}%)`,e.lineWidth=1,e.stroke();e.restore()}function L(e,t,n,r,i){let a=A(r);e.clearRect(0,0,t,n);let o=t<640,s=o?t*.27:t/2,c=n*.88,l=o?Math.min(n*.54,420):Math.min(n*.46,380),u=o?Math.min(t*.32,150):Math.min(t*.38,320),d=A(a/.3);P(e,s,c,u*.65,l*.25,d);let f=M(A((a-.1)/.65)),p=l*f,m=A((a-.68)/.32);if(f<=0)return;let h=N(i*.7,1.2)*.08*f,g=c-p,_=s+h*15,v=c-p*.4,y=s+h*35,b=c-p*.75,x=s+h*50,S=g;e.save(),e.beginPath(),e.moveTo(s,c),e.bezierCurveTo(_,v,y,b,x,S);let C=j(98,47,m),w=e.createLinearGradient(s,c,x,S);if(w.addColorStop(0,`hsl(${C-10}, 60%, 20%)`),w.addColorStop(.5,`hsl(${C}, 65%, 32%)`),w.addColorStop(1,`hsl(${C+12}, 75%, 45%)`),e.strokeStyle=w,e.lineWidth=Math.max(2.6,7.5*(1-f*.45)),e.lineCap=`round`,e.stroke(),[.25,.5,.72].forEach(t=>{if(f<t)return;let n=t,r=j(s,x,n)+Math.sin(n*Math.PI)*h*20,i=c-p*n;e.beginPath(),e.arc(r,i,Math.max(2.2,5*(1-n*.3)),0,Math.PI*2),e.fillStyle=`hsl(${C-12}, 50%, 22%)`,e.fill()}),O.forEach(t=>{if(f<t.heightRatio)return;let n=A((f-t.heightRatio)/.22),r=t.heightRatio;F(e,j(s,x,r)+Math.sin(r*Math.PI)*h*20,c-p*r,6*(1-r*.4),t.side,u*t.lengthRatio,n,h,t.archFactor,t.hue,m)}),a>.55){let t=A((a-.55)/.4);I(e,x,S,o?Math.min(78,l*.23):Math.min(105,l*.26),t,h,m)}e.restore()}function R(){let e=(0,E.useRef)(null),t=(0,E.useRef)(null),n=(0,E.useRef)(null),r=(0,E.useRef)(null),[i,a]=(0,E.useState)(0),o=(0,E.useRef)(0),s=(0,E.useRef)(0),c=(0,E.useRef)(null),l=(0,E.useCallback)((e,t)=>{let n=e.getBoundingClientRect(),r=Math.min(window.devicePixelRatio||1,2),i=n.width,a=n.height,c=Math.floor(i*r),l=Math.floor(a*r);(e.width!==c||e.height!==l)&&(e.width=c,e.height=l);let u=e.getContext(`2d`);u&&(u.setTransform(r,0,0,r,0,0),s.current=j(s.current,o.current,.075),L(u,i,a,s.current,t))},[]);(0,E.useEffect)(()=>{let i=e.current,s=t.current,u=n.current;if(!i||!s||!u)return;let d=!1,f=performance.now(),p=e=>{if(d)return;let t=(e-f)/1e3;l(u,t),c.current=requestAnimationFrame(p)};c.current=requestAnimationFrame(p);let m=T.create({trigger:i,pin:s,start:`top top`,end:`+=2800`,scrub:.5,invalidateOnRefresh:!0,onUpdate:e=>{let t=A(e.progress);o.current=t,a(t)}});r.current=m;let h=()=>{T.refresh()};window.addEventListener(`resize`,h);let g=()=>{let e=r.current;if(!e)return;let t=e.start+(e.end-e.start)*.86;window.scrollTo({top:t,behavior:`smooth`})};return window.addEventListener(`growth-final`,g),()=>{d=!0,window.removeEventListener(`resize`,h),window.removeEventListener(`growth-final`,g),c.current!==null&&cancelAnimationFrame(c.current),m.kill(),r.current=null}},[l]);let u=e=>{switch(e){case`left-top`:return`
            right-2 top-[18%]
            sm:left-8 sm:right-auto sm:top-[28%]
            md:left-12
          `;case`left-bottom`:return`
            right-2 top-[38%]
            sm:left-8 sm:right-auto sm:bottom-[10%] sm:top-auto
            md:left-12
          `;case`right-top`:return`
            right-2 top-[58%]
            sm:right-8 sm:top-[21%]
            md:right-12
          `;case`right-bottom`:return`
            right-2 top-[78%]
            sm:right-8 sm:bottom-[9%] sm:top-auto
            md:right-12
          `}},{t:d}=S();return(0,D.jsxs)(`section`,{id:`growth`,ref:e,className:`
        relative
        w-full
        overflow-hidden
        bg-[#1c2a13]
        text-[#f8f4e9]
      `,children:[(0,D.jsx)(`div`,{className:`
          pointer-events-none
          absolute
          left-0
          right-0
          top-0
          z-30
          h-28
          bg-gradient-to-b
          from-[#1c2a13]
          to-transparent
        `}),(0,D.jsxs)(`div`,{ref:t,className:`
          relative
          flex
          h-screen
          w-full
          items-center
          justify-center
          overflow-hidden
          bg-[#1c2a13]
        `,children:[(0,D.jsx)(`div`,{className:`pointer-events-none absolute inset-0`}),(0,D.jsx)(`div`,{className:`
            pointer-events-none
            absolute
            inset-x-0
            top-7
            z-30
            flex
            justify-center
            px-3
            sm:top-10
            sm:px-4
          `,children:(0,D.jsxs)(`div`,{className:`
              flex
              items-center
              justify-center
              gap-1
              leading-none
              select-none
              sm:gap-3
              md:gap-5
            `,children:[(0,D.jsx)(`h2`,{className:`
                brand-sticker-green
                text-3xl
                leading-none
                sm:text-6xl
                md:text-7xl
                lg:text-[96px]
              `,children:d(`landing.whyChooseUsTitle1`)}),(0,D.jsx)(`span`,{className:`
                brand-script-yellow
                -ml-2
                -rotate-6
                transform
                text-2xl
                sm:-ml-3
                sm:text-5xl
                md:text-6xl
                lg:text-8xl
              `,children:d(`landing.whyChooseUsTitle2`)}),(0,D.jsx)(`h2`,{className:`
                brand-sticker-green
                text-3xl
                leading-none
                sm:text-6xl
                md:text-7xl
                lg:text-[96px]
              `,children:d(`landing.whyChooseUsTitle3`)})]})}),(0,D.jsx)(`canvas`,{ref:n,className:`
            absolute
            inset-0
            h-full
            w-full
          `}),k.map(e=>{let t=i>=e.minProgress,n=e.icon,r=e.theme===`green`;return(0,D.jsx)(`div`,{className:`
                  absolute
                  z-20

                  /* MOBILE */
                  w-[47vw]
                  max-w-[210px]
                  min-w-0

                  /* DESKTOP */
                  sm:w-[310px]

                  ${u(e.position)}

                  transition-all
                  duration-700
                  ease-out

                  ${t?`pointer-events-auto translate-y-0 scale-100 opacity-100`:`pointer-events-none translate-y-4 scale-95 opacity-0`}
                `,style:{transform:t?`rotate(${e.rotateDeg})`:void 0},children:(0,D.jsxs)(`div`,{className:`
                    relative

                    /* MOBILE */
                    p-2.5

                    /* DESKTOP */
                    sm:p-5

                    border-2

                    shadow-[0_12px_28px_rgba(0,0,0,0.75)]

                    ${r?`
                          border-[#5c744d]
                          bg-[#27351d]
                          text-[#f8f4e9]
                        `:`
                          border-[#d6b841]
                          bg-[#43362b]
                          text-[#f8f4e9]
                        `}
                  `,style:{borderRadius:e.patchRadius},children:[(0,D.jsxs)(`div`,{className:`
                      mb-1.5
                      flex
                      items-center
                      justify-between
                      gap-1
                      sm:mb-3
                      sm:gap-2
                    `,children:[(0,D.jsx)(`span`,{className:`
                        max-w-[48%]
                        truncate
                        rounded-full
                        px-1.5
                        py-1
                        font-mono
                        text-[6px]
                        font-black
                        uppercase
                        tracking-tight
                        sm:px-2.5
                        sm:text-[10px]
                        sm:tracking-wider

                        ${r?`
                              bg-[#394a2d]
                              text-[#aebca2]
                            `:`
                              bg-[#765c46]
                              text-[#e0c64d]
                            `}
                      `,children:d(e.categoryKey)}),(0,D.jsxs)(`span`,{className:`
                        flex
                        max-w-[48%]
                        items-center
                        gap-1
                        truncate
                        rounded-full
                        border
                        px-1.5
                        py-1
                        font-mono
                        text-[6px]
                        font-extrabold
                        sm:gap-1.5
                        sm:px-2.5
                        sm:text-[10px]

                        ${r?`
                              border-[#5c744d]
                              bg-[#394a2d]
                              text-[#d5d9d0]
                            `:`
                              border-[#d6b841]
                              bg-[#765c46]
                              text-[#e5d398]
                            `}
                      `,children:[(0,D.jsx)(n,{className:`
                          h-2
                          w-2
                          shrink-0
                          sm:h-3
                          sm:w-3
                        `}),(0,D.jsx)(`span`,{className:`truncate`,children:d(e.metricKey)})]})]}),(0,D.jsx)(`h3`,{className:`
                      text-[9px]
                      font-black
                      leading-tight
                      tracking-tight
                      text-[#f8f4e9]
                      sm:text-base
                    `,children:d(e.titleKey)}),(0,D.jsx)(`p`,{className:`
                      mt-1
                      text-[7px]
                      font-semibold
                      leading-[1.35]
                      sm:mt-2
                      sm:text-xs
                      sm:leading-relaxed

                      ${r?`text-[#d5d9d0]`:`text-[#e5d398]`}
                    `,children:d(e.descriptionKey)})]})},e.id)})]})]})}var z=[{id:`marketplace`,number:`01`,titleKey:`landing.service1Title`,subtitleKey:`landing.service1Subtitle`,descKey:`landing.service1Desc`,icon:c,badgeKey:`landing.service1Badge`,featureKeys:[`landing.service1Feat1`,`landing.service1Feat2`,`landing.service1Feat3`],image:`https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80`,align:`left`},{id:`ai-advisory`,number:`02`,titleKey:`landing.service2Title`,subtitleKey:`landing.service2Subtitle`,descKey:`landing.service2Desc`,icon:t,badgeKey:`landing.service2Badge`,featureKeys:[`landing.service2Feat1`,`landing.service2Feat2`,`landing.service2Feat3`],image:`https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80`,align:`right`},{id:`mandi-rates`,number:`03`,titleKey:`landing.service3Title`,subtitleKey:`landing.service3Subtitle`,descKey:`landing.service3Desc`,icon:o,badgeKey:`landing.service3Badge`,featureKeys:[`landing.service3Feat1`,`landing.service3Feat2`,`landing.service3Feat3`],image:`https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=1200&q=80`,align:`left`},{id:`machinery-rentals`,number:`04`,titleKey:`landing.service4Title`,subtitleKey:`landing.service4Subtitle`,descKey:`landing.service4Desc`,icon:p,badgeKey:`landing.service4Badge`,featureKeys:[`landing.service4Feat1`,`landing.service4Feat2`,`landing.service4Feat3`],image:`https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80`,align:`right`}];function B(){let{t:e}=S(),t=(0,E.useRef)(null),r=(0,E.useRef)(null),i=(0,E.useRef)([]),[a,o]=(0,E.useState)(0),[s,c]=(0,E.useState)(0);(0,E.useEffect)(()=>{r.current&&c(r.current.getTotalLength())},[]),(0,E.useEffect)(()=>{let e,t=()=>{let e=i.current[0],t=i.current[3];if(!e||!t)return;let n=e.getBoundingClientRect(),r=t.getBoundingClientRect(),a=n.top+n.height/2,s=r.top+r.height/2,c=window.innerHeight*.5,l=s-a;if(l<=0)return;let u=c-a,d=Math.min(Math.max(u/l,0),1);o(d)},n=()=>{e=requestAnimationFrame(t)};return window.addEventListener(`scroll`,n,{passive:!0}),t(),()=>{window.removeEventListener(`scroll`,n),cancelAnimationFrame(e)}},[]);let l=s?s-s*a:0;return(0,D.jsx)(`section`,{ref:t,id:`services`,className:`relative bg-[#1c2a13] py-24 sm:py-32 text-[#f8f4e9] font-['Plus_Jakarta_Sans',sans-serif] overflow-hidden `,children:(0,D.jsxs)(`div`,{className:` -mt-15 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`,children:[(0,D.jsx)(`div`,{className:`text-center max-w-5xl mx-auto mb-20 sm:mb-28 space-y-5`,children:(0,D.jsxs)(`div`,{className:`flex flex-wrap items-center justify-center gap-3 sm:gap-5 leading-none select-none`,children:[(0,D.jsx)(`h2`,{className:`brand-sticker-green text-4xl sm:text-6xl md:text-7xl lg:text-[96px] leading-[1.1] sm:leading-none py-1`,children:e(`landing.servicesTitle1`)}),(0,D.jsx)(`span`,{className:` -ml-4 brand-script-yellow text-3xl sm:text-5xl md:text-6xl lg:text-8xl -rotate-6 transform`,children:e(`landing.servicesTitle2`)}),(0,D.jsx)(`h2`,{className:`brand-sticker-green text-4xl sm:text-6xl md:text-7xl lg:text-[96px] leading-[1.1] sm:leading-none`,children:e(`landing.servicesTitle3`)})]})}),(0,D.jsxs)(`div`,{className:`relative`,children:[(0,D.jsx)(`div`,{className:`hidden lg:block absolute inset-0 pointer-events-none z-0`,children:(0,D.jsxs)(`svg`,{className:`w-full h-full`,viewBox:`0 0 1000 1200`,fill:`none`,preserveAspectRatio:`none`,children:[(0,D.jsx)(`path`,{d:`M 250 150 C 250 300, 750 300, 750 450 C 750 600, 250 600, 250 750 C 250 900, 750 900, 750 1050`,stroke:`#394a2d`,strokeWidth:`4`,strokeDasharray:`8 8`}),(0,D.jsx)(`path`,{ref:r,d:`M 250 150 C 250 300, 750 300, 750 450 C 750 600, 250 600, 250 750 C 250 900, 750 900, 750 1050`,stroke:`#d6b841`,strokeWidth:`5`,strokeDasharray:s||1500,strokeDashoffset:l,strokeLinecap:`round`})]})}),(0,D.jsx)(`div`,{className:`lg:hidden absolute left-6 top-0 bottom-0 w-1 bg-[#27351d] pointer-events-none z-0`,children:(0,D.jsx)(`div`,{className:`w-full bg-[#d6b841]`,style:{height:`${a*100}%`}})}),(0,D.jsx)(`div`,{className:`space-y-16 sm:space-y-24 relative z-10`,children:z.map((t,r)=>{let a=t.icon,o=t.align===`right`;return(0,D.jsxs)(`div`,{ref:e=>{i.current[r]=e},className:`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${o?`lg:flex-row-reverse`:``}`,children:[(0,D.jsx)(`div`,{className:`w-full lg:w-1/2 pl-10 lg:pl-0`,children:(0,D.jsx)(`div`,{className:`relative rounded-2xl overflow-hidden border border-[#394a2d]/80 bg-[#27351d]/80 p-2 shadow-xl`,children:(0,D.jsxs)(`div`,{className:`relative h-60 sm:h-72 w-full rounded-xl overflow-hidden`,children:[(0,D.jsx)(`img`,{src:t.image,alt:e(t.titleKey),className:`h-full w-full object-cover`}),(0,D.jsx)(`div`,{className:`absolute inset-0 bg-gradient-to-t from-[#1c2a13] via-[#1c2a13]/20 to-transparent`}),(0,D.jsxs)(`div`,{className:`absolute top-3 left-3 flex items-center gap-2 rounded-full border border-[#394a2d] bg-[#1c2a13]/90 px-3.5 py-1`,children:[(0,D.jsx)(a,{className:`h-3.5 w-3.5 text-[#d6b841]`}),(0,D.jsx)(`span`,{className:`text-[11px] font-black uppercase tracking-wider text-[#e7eee1]`,children:e(t.badgeKey)})]}),(0,D.jsx)(`div`,{className:`absolute bottom-3 right-4 font-mono text-4xl font-black text-white/20`,children:t.number})]})})}),(0,D.jsxs)(`div`,{className:`w-full lg:w-1/2 space-y-4 pl-10 lg:pl-0`,children:[(0,D.jsxs)(`div`,{className:`inline-flex items-center gap-2`,children:[(0,D.jsx)(`span`,{className:`h-2 w-2 rounded-full bg-[#d6b841]`}),(0,D.jsx)(`span`,{className:`text-xs font-black uppercase tracking-widest text-[#d6b841]`,children:e(t.subtitleKey)})]}),(0,D.jsx)(`h3`,{className:`text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight`,children:e(t.titleKey)}),(0,D.jsx)(`p`,{className:`text-sm font-light text-[#d5d9d0] leading-relaxed max-w-lg`,children:e(t.descKey)}),(0,D.jsx)(`ul`,{className:`space-y-2 pt-2 border-t border-[#394a2d]/80`,children:t.featureKeys.map((t,n)=>(0,D.jsxs)(`li`,{className:`flex items-center gap-2.5 text-xs font-medium text-[#d5d9d0]`,children:[(0,D.jsx)(b,{className:`h-3.5 w-3.5 text-[#d6b841] shrink-0`}),(0,D.jsx)(`span`,{children:e(t)})]},n))}),(0,D.jsx)(`div`,{className:`pt-1`,children:(0,D.jsxs)(x,{to:`/login`,className:`inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#d6b841] hover:text-[#e0c64d] transition-colors`,children:[(0,D.jsx)(`span`,{children:e(`landing.exploreCapability`)}),(0,D.jsx)(n,{className:`h-3.5 w-3.5`})]})})]})]},t.id)})})]}),(0,D.jsx)(`div`,{className:`mt-20 sm:mt-28 rounded-2xl border border-[#394a2d] bg-[#27351d]/90 p-8 sm:p-12 text-center relative overflow-hidden`,children:(0,D.jsxs)(`div`,{className:`relative z-10 max-w-2xl mx-auto space-y-5`,children:[(0,D.jsx)(`h3`,{className:`text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight`,children:e(`landing.readyToElevate`)}),(0,D.jsx)(`p`,{className:`text-xs sm:text-sm text-[#aebca2] leading-relaxed font-light`,children:e(`landing.joinEnterprises`)}),(0,D.jsx)(`div`,{className:`pt-1`,children:(0,D.jsxs)(x,{to:`/register`,className:`inline-flex items-center gap-2.5 rounded-xl bg-[#d6b841] px-8 py-3.5 text-xs font-black uppercase tracking-widest text-[#262c1d] transition-colors hover:bg-[#e0c64d]`,children:[(0,D.jsx)(y,{className:`h-4 w-4`}),(0,D.jsx)(`span`,{children:e(`landing.createFreeAccount`)})]})})]})})]})})}function V(){let e=(0,E.useRef)(null),[t,n]=(0,E.useState)(!1);return(0,E.useEffect)(()=>{let t=e.current;if(!t)return;let r=new IntersectionObserver(([e])=>{e.isIntersecting&&(n(!0),r.disconnect())},{threshold:.2});return r.observe(t),()=>r.disconnect()},[]),{ref:e,visible:t}}var H=[{icon:_,labelKey:`landing.emailUs`,value:`hello@farmverse.in`},{icon:g,labelKey:`landing.callUs`,value:`+91 98765 43210`},{icon:r,labelKey:`landing.visitUs`,value:`Bhopal, Madhya Pradesh, India`}];function U(){let{t:e}=S(),t=V(),n=V(),r=V(),[i,a]=(0,E.useState)(`idle`);function o(e){e.preventDefault(),i===`idle`&&(a(`submitting`),window.setTimeout(()=>a(`sent`),900))}return(0,D.jsxs)(`section`,{id:`contact`,className:`relative overflow-hidden bg-[#161f0f] py-24 text-[#f8f4e9] font-['Plus_Jakarta_Sans',sans-serif] sm:py-32`,children:[(0,D.jsx)(`div`,{className:`pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-[#d6b841]/10 blur-3xl`}),(0,D.jsx)(`div`,{className:`pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#5c744d]/20 blur-3xl`}),(0,D.jsxs)(`div`,{className:`relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8`,children:[(0,D.jsxs)(`div`,{ref:t.ref,className:`mx-auto mb-16 max-w-3xl space-y-4 text-center transition-all duration-700 ease-out sm:mb-20 ${t.visible?`translate-y-0 opacity-100`:`translate-y-8 opacity-0`}`,children:[(0,D.jsxs)(`div`,{className:`flex flex-wrap items-center justify-center gap-3 leading-none select-none sm:gap-5`,children:[(0,D.jsx)(`h2`,{className:`brand-sticker-green py-1 text-4xl leading-[1.1] sm:text-6xl sm:leading-none md:text-7xl lg:text-8xl`,children:e(`landing.contactTitle1`)}),(0,D.jsx)(`span`,{className:`brand-script-yellow -ml-2 -rotate-6 transform text-3xl sm:text-5xl md:text-6xl lg:text-7xl`,children:e(`landing.contactTitle2`)}),(0,D.jsx)(`h2`,{className:`brand-sticker-green text-4xl leading-[1.1] sm:text-6xl sm:leading-none md:text-7xl lg:text-8xl`,children:e(`landing.contactTitle3`)})]}),(0,D.jsx)(`p`,{className:`mx-auto max-w-xl text-sm font-light leading-relaxed text-[#d5d9d0] sm:text-base md:text-lg`,children:e(`landing.contactSubtitle`)})]}),(0,D.jsxs)(`div`,{className:`grid gap-8 lg:grid-cols-5 lg:gap-10`,children:[(0,D.jsx)(`div`,{ref:n.ref,className:`space-y-4 lg:col-span-2 transition-all duration-700 ease-out ${n.visible?`translate-x-0 opacity-100`:`-translate-x-8 opacity-0`}`,children:H.map(({icon:t,labelKey:r,value:i},a)=>(0,D.jsxs)(`div`,{className:`group flex items-start gap-4 rounded-2xl border border-[#394a2d] bg-[#1c2a13]/60 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d6b841]/50 hover:bg-[#1c2a13] hover:shadow-xl hover:shadow-black/30`,style:{transitionDelay:n.visible?`${a*100}ms`:`0ms`},children:[(0,D.jsx)(`span`,{className:`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#27351d] text-[#d6b841] transition-colors duration-300 group-hover:bg-[#d6b841] group-hover:text-[#1c2a13]`,children:(0,D.jsx)(t,{className:`h-5 w-5`})}),(0,D.jsxs)(`div`,{className:`pt-1`,children:[(0,D.jsx)(`p`,{className:`text-[11px] font-bold uppercase tracking-widest text-[#7d806f]`,children:e(r)}),(0,D.jsx)(`p`,{className:`mt-0.5 text-sm font-semibold text-[#f8f4e9] sm:text-base`,children:i})]})]},r))}),(0,D.jsx)(`div`,{ref:r.ref,className:`lg:col-span-3 transition-all duration-700 ease-out ${r.visible?`translate-x-0 opacity-100`:`translate-x-8 opacity-0`}`,children:(0,D.jsxs)(`form`,{onSubmit:o,className:`relative overflow-hidden rounded-3xl border border-[#394a2d] bg-[#1c2a13]/80 p-6 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-8`,children:[(0,D.jsxs)(`div`,{className:`absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-[#1c2a13] transition-all duration-500 ${i===`sent`?`opacity-100`:`pointer-events-none opacity-0`}`,children:[(0,D.jsx)(`span`,{className:`flex h-14 w-14 items-center justify-center rounded-full bg-[#d6b841]/15 transition-transform duration-500 ${i===`sent`?`scale-100`:`scale-50`}`,children:(0,D.jsx)(b,{className:`h-8 w-8 text-[#d6b841]`})}),(0,D.jsx)(`p`,{className:`text-sm font-semibold text-[#f8f4e9]`,children:e(`landing.messageSent`)}),(0,D.jsx)(`button`,{type:`button`,onClick:()=>a(`idle`),className:`text-xs font-bold uppercase tracking-wider text-[#d6b841] underline-offset-4 hover:underline`,children:e(`landing.sendAnother`)})]}),(0,D.jsxs)(`div`,{className:`grid gap-5 sm:grid-cols-2`,children:[(0,D.jsxs)(`label`,{className:`group sm:col-span-1`,children:[(0,D.jsx)(`span`,{className:`mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-[#7d806f] transition-colors group-focus-within:text-[#d6b841]`,children:e(`landing.yourName`)}),(0,D.jsx)(`input`,{required:!0,type:`text`,placeholder:`Ramesh Kumar`,className:`w-full rounded-xl border border-[#394a2d] bg-[#161f0f] px-4 py-3 text-sm text-[#f8f4e9] placeholder:text-[#5c6153] transition-all duration-300 outline-none focus:border-[#d6b841] focus:ring-2 focus:ring-[#d6b841]/20`})]}),(0,D.jsxs)(`label`,{className:`group sm:col-span-1`,children:[(0,D.jsx)(`span`,{className:`mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-[#7d806f] transition-colors group-focus-within:text-[#d6b841]`,children:e(`landing.phoneOrEmail`)}),(0,D.jsx)(`input`,{required:!0,type:`text`,placeholder:`98765 43210`,className:`w-full rounded-xl border border-[#394a2d] bg-[#161f0f] px-4 py-3 text-sm text-[#f8f4e9] placeholder:text-[#5c6153] transition-all duration-300 outline-none focus:border-[#d6b841] focus:ring-2 focus:ring-[#d6b841]/20`})]}),(0,D.jsxs)(`label`,{className:`group sm:col-span-2`,children:[(0,D.jsx)(`span`,{className:`mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-[#7d806f] transition-colors group-focus-within:text-[#d6b841]`,children:e(`landing.message`)}),(0,D.jsx)(`textarea`,{required:!0,rows:4,placeholder:e(`landing.messagePlaceholder`),className:`w-full resize-none rounded-xl border border-[#394a2d] bg-[#161f0f] px-4 py-3 text-sm text-[#f8f4e9] placeholder:text-[#5c6153] transition-all duration-300 outline-none focus:border-[#d6b841] focus:ring-2 focus:ring-[#d6b841]/20`})]})]}),(0,D.jsx)(`button`,{type:`submit`,disabled:i===`submitting`,className:`group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#d6b841] px-6 py-3.5 text-xs font-black uppercase tracking-wider text-[#262c1d] shadow-xl transition-all duration-300 hover:bg-[#e0c64d] active:scale-[0.98] disabled:opacity-70 sm:text-sm`,children:i===`submitting`?(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(u,{className:`h-4 w-4 animate-spin`}),e(`landing.sending`)]}):(0,D.jsxs)(D.Fragment,{children:[e(`landing.sendMessage`),(0,D.jsx)(v,{className:`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1`})]})})]})})]})]})]})}function W(){let{t:e}=S(),[t,r]=(0,E.useState)(!1),[a,o]=(0,E.useState)(!1),[s,c]=(0,E.useState)(!0),[u,f]=(0,E.useState)(0);(0,E.useEffect)(()=>{let e=()=>{let e=window.scrollY;if(o(e>30),t){c(!0);return}e<40?c(!0):e>u&&e>80?c(!1):e<u&&c(!0),f(e)};return window.addEventListener(`scroll`,e,{passive:!0}),()=>{window.removeEventListener(`scroll`,e)}},[u,t]),(0,E.useEffect)(()=>{let e=e=>{e.key===`Escape`&&r(!1)};return window.addEventListener(`keydown`,e),()=>{window.removeEventListener(`keydown`,e)}},[]),(0,E.useEffect)(()=>{let e=()=>{window.innerWidth>=768&&r(!1)};return window.addEventListener(`resize`,e),()=>{window.removeEventListener(`resize`,e)}},[]);let g=()=>{r(!1),window.dispatchEvent(new Event(`growth-final`))},_=`flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-bold uppercase tracking-wider text-[#d5d9d0] transition-all duration-200 hover:bg-[#27351d] hover:text-[#d6b841] active:scale-[0.98]`;return(0,D.jsxs)(`div`,{className:`
        min-h-screen
        overflow-x-hidden
        bg-[#1c2a13]
        font-['Plus_Jakarta_Sans',sans-serif]
        text-[#f8f4e9]
        antialiased
        selection:bg-[#d6b841]
        selection:text-[#262c1d]
      `,children:[(0,D.jsx)(`style`,{children:`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@700&family=Yellowtail&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        :root {
          --sticker-stroke: 6px;
          --script-stroke: 4px;
        }

        @media (min-width: 640px) {
          :root {
            --sticker-stroke: 10px;
            --script-stroke: 7px;
          }
        }

        @media (min-width: 1024px) {
          :root {
            --sticker-stroke: 14px;
            --script-stroke: 10px;
          }
        }

        .brand-sticker-green {
          font-family: 'Fredoka', cursive, sans-serif;
          font-weight: 700;
          color: #27351d;
          -webkit-text-stroke: var(--sticker-stroke) #f8f4e9;
          paint-order: stroke fill;
          stroke-linejoin: round;
          stroke-linecap: round;
          letter-spacing: -0.01em;
          filter: drop-shadow(
            0px 6px 16px rgba(0, 0, 0, 0.45)
          );
        }

        .brand-script-yellow {
          font-family: 'Yellowtail', cursive;
          color: #d6b841;
          -webkit-text-stroke: var(--script-stroke) #f8f4e9;
          paint-order: stroke fill;
          stroke-linejoin: round;
          stroke-linecap: round;
          filter: drop-shadow(
            0px 4px 12px rgba(0, 0, 0, 0.35)
          );
        }
      `}),(0,D.jsxs)(`header`,{className:`
          fixed
          inset-x-0
          top-0
          z-50
          transition-all
          duration-500
          ease-in-out

          ${s?`translate-y-0`:`-translate-y-full`}

          ${a?`bg-[#1c2a13]/90 py-3 shadow-2xl shadow-black/80 backdrop-blur-xl`:`bg-gradient-to-b from-[#1c2a13]/90 via-[#1c2a13]/40 to-transparent py-4`}
        `,children:[(0,D.jsxs)(`div`,{className:`
            mx-auto
            flex
            max-w-7xl
            items-center
            justify-between
            px-4
            sm:px-8
            lg:px-12
          `,children:[(0,D.jsxs)(x,{to:`/`,onClick:()=>r(!1),className:`group flex items-center gap-2.5 sm:gap-3`,children:[(0,D.jsx)(`div`,{className:`
                relative
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-white/30
                bg-[#27351d]
                transition-all
                duration-300
                group-hover:border-[#d6b841]
                group-hover:bg-[#394a2d]
              `,children:(0,D.jsx)(m,{className:`h-5 w-5 text-white`})}),(0,D.jsx)(`span`,{className:`
                text-lg
                font-black
                tracking-tight
                text-white
                transition-colors
                duration-300
                group-hover:text-[#d6b841]
                sm:text-xl
              `,children:`FarmVerse`})]}),(0,D.jsxs)(`nav`,{className:`
              hidden
              items-center
              gap-6
              text-xs
              font-bold
              uppercase
              tracking-[0.16em]
              text-[#e7eee1]
              md:flex
              lg:gap-8
              lg:text-sm
            `,children:[(0,D.jsxs)(`a`,{href:`#hero`,className:`
                group
                relative
                py-1
                transition-colors
                duration-300
                hover:text-white
              `,children:[(0,D.jsx)(`span`,{children:e(`landing.navHome`)}),(0,D.jsx)(`span`,{className:`
                  absolute
                  bottom-0
                  left-0
                  h-[2px]
                  w-0
                  bg-[#d6b841]
                  transition-all
                  duration-300
                  ease-out
                  group-hover:w-full
                `})]}),(0,D.jsxs)(`button`,{type:`button`,onClick:g,className:`
                group
                relative
                cursor-pointer
                py-1
                uppercase
                transition-colors
                duration-300
                hover:text-white
              `,children:[(0,D.jsx)(`span`,{children:e(`landing.navFeatures`)}),(0,D.jsx)(`span`,{className:`
                  absolute
                  bottom-0
                  left-0
                  h-[2px]
                  w-0
                  bg-[#d6b841]
                  transition-all
                  duration-300
                  ease-out
                  group-hover:w-full
                `})]}),(0,D.jsxs)(`a`,{href:`#about`,className:`
                group
                relative
                py-1
                transition-colors
                duration-300
                hover:text-white
              `,children:[(0,D.jsx)(`span`,{children:e(`landing.navServices`)}),(0,D.jsx)(`span`,{className:`
                  absolute
                  bottom-0
                  left-0
                  h-[2px]
                  w-0
                  bg-[#d6b841]
                  transition-all
                  duration-300
                  ease-out
                  group-hover:w-full
                `})]}),(0,D.jsxs)(`a`,{href:`#contact`,className:`
                group
                relative
                py-1
                transition-colors
                duration-300
                hover:text-white
              `,children:[(0,D.jsx)(`span`,{children:e(`landing.navContact`)}),(0,D.jsx)(`span`,{className:`
                  absolute
                  bottom-0
                  left-0
                  h-[2px]
                  w-0
                  bg-[#d6b841]
                  transition-all
                  duration-300
                  ease-out
                  group-hover:w-full
                `})]})]}),(0,D.jsxs)(`div`,{className:`flex items-center gap-2 sm:gap-3`,children:[(0,D.jsx)(`div`,{className:`shrink-0`,children:(0,D.jsx)(C,{className:`
                  [&>button]:border-[#394a2d]
                  [&>button]:bg-[#27351d]/90
                  [&>button]:text-[#e7eee1]

                  hover:[&>button]:border-[#d6b841]/50
                  hover:[&>button]:text-[#e0c64d]

                  [&>div[role=menu]]:bg-[#1c2a13]/95
                  [&>div[role=menu]]:border-[#394a2d]
                  [&>div[role=menu]]:text-[#e7eee1]

                  [&_p]:text-[#7d806f]

                  [&_button[role=menuitemradio]]:text-[#d5d9d0]
                  hover:[&_button[role=menuitemradio]]:bg-[#27351d]
                  hover:[&_button[role=menuitemradio]]:text-white

                  [&_div[aria-disabled]]:text-[#7d806f]
                  [&_div.border-t]:border-[#394a2d]
                `})}),(0,D.jsxs)(x,{to:`/login`,className:`
                group
                hidden
                items-center
                gap-2
                rounded-full
                bg-[#27351d]/80
                px-5
                py-2.5
                text-xs
                font-extrabold
                uppercase
                tracking-wider
                text-[#f8f4e9]
                shadow-md
                backdrop-blur-md
                transition-all
                duration-300
                hover:bg-[#d6b841]
                hover:text-[#262c1d]
                active:scale-95
                sm:text-sm
                md:inline-flex
              `,children:[(0,D.jsx)(l,{className:`
                  h-4
                  w-4
                  transition-transform
                  duration-300
                  group-hover:scale-110
                `}),(0,D.jsx)(`span`,{children:e(`landing.navLoginRegister`)})]}),(0,D.jsx)(`button`,{type:`button`,onClick:()=>r(!t),className:`
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-[#394a2d]
                bg-[#27351d]/90
                text-[#d5d9d0]
                backdrop-blur-md
                transition-all
                duration-300
                hover:border-[#d6b841]/50
                hover:text-white
                active:scale-95
                md:hidden
              `,"aria-label":t?`Close Navigation`:`Open Navigation`,"aria-expanded":t,children:t?(0,D.jsx)(d,{className:`h-5 w-5`}):(0,D.jsx)(i,{className:`h-5 w-5`})})]})]}),(0,D.jsx)(`div`,{className:`
            overflow-hidden
            px-4
            transition-all
            duration-300
            md:hidden
            ${t?`max-h-[500px] pt-3 opacity-100`:`max-h-0 pt-0 opacity-0`}
          `,children:(0,D.jsxs)(`div`,{className:`
              mx-auto
              max-w-7xl
              rounded-2xl
              border
              border-[#394a2d]
              bg-[#1c2a13]/98
              p-3
              shadow-2xl
              shadow-black/70
              backdrop-blur-2xl
            `,children:[(0,D.jsxs)(`a`,{href:`#hero`,onClick:()=>r(!1),className:_,children:[(0,D.jsx)(`span`,{children:e(`landing.navHome`)}),(0,D.jsx)(h,{className:`h-4 w-4 text-[#7d806f]`})]}),(0,D.jsxs)(`button`,{type:`button`,onClick:g,className:`${_} w-full text-left`,children:[(0,D.jsx)(`span`,{children:e(`landing.navFeatures`)}),(0,D.jsx)(h,{className:`h-4 w-4 text-[#7d806f]`})]}),(0,D.jsxs)(`a`,{href:`#about`,onClick:()=>r(!1),className:_,children:[(0,D.jsx)(`span`,{children:e(`landing.navServices`)}),(0,D.jsx)(h,{className:`h-4 w-4 text-[#7d806f]`})]}),(0,D.jsxs)(`a`,{href:`#contact`,onClick:()=>r(!1),className:_,children:[(0,D.jsx)(`span`,{children:e(`landing.navContact`)}),(0,D.jsx)(h,{className:`h-4 w-4 text-[#7d806f]`})]}),(0,D.jsx)(`div`,{className:`my-2 border-t border-[#394a2d]`}),(0,D.jsxs)(x,{to:`/login`,onClick:()=>r(!1),className:`
                flex
                items-center
                justify-between
                rounded-xl
                bg-[#d6b841]
                px-4
                py-3.5
                text-sm
                font-black
                uppercase
                tracking-wider
                text-[#262c1d]
                transition-all
                duration-200
                hover:bg-[#e0c64d]
                active:scale-[0.98]
              `,children:[(0,D.jsxs)(`span`,{className:`flex items-center gap-2.5`,children:[(0,D.jsx)(l,{className:`h-4 w-4`}),e(`landing.navLoginRegister`)]}),(0,D.jsx)(h,{className:`h-4 w-4`})]})]})})]}),(0,D.jsxs)(`section`,{id:`hero`,className:`
          relative
          flex
          min-h-[100dvh]
          items-center
          overflow-hidden
          px-4
          pb-16
          pt-28
          sm:px-8
          md:px-16
          md:pt-32
          lg:pt-32
        `,children:[(0,D.jsxs)(`div`,{className:`absolute inset-0 z-0`,children:[(0,D.jsx)(`img`,{src:`https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=1600&auto=format&fit=crop`,alt:`Tractor working a farm field`,className:`
              h-full
              w-full
              scale-105
              object-cover
              object-center
            `}),(0,D.jsx)(`div`,{className:`
              absolute
              inset-0
              bg-gradient-to-r
              from-[#1c2a13]/95
              via-[#1c2a13]/75
              to-[#1c2a13]/20
              sm:via-[#1c2a13]/70
            `})]}),(0,D.jsxs)(`div`,{className:`
            relative
            z-10
            my-auto
            w-full
            max-w-5xl
            space-y-6
            py-6
            sm:space-y-8
            sm:py-12
          `,children:[(0,D.jsxs)(`div`,{className:`
              flex
              flex-col
              items-start
              leading-none
              select-none
            `,children:[(0,D.jsx)(`h1`,{className:`
                brand-sticker-green
                py-1
                text-5xl
                leading-[1.1]
                sm:text-7xl
                sm:leading-none
                md:text-8xl
                lg:text-[96px]
              `,children:e(`landing.heroTitle1`)}),(0,D.jsxs)(`div`,{className:`
                -mt-1
                flex
                flex-wrap
                items-center
                gap-2
                py-1
                sm:-mt-4
                sm:gap-4
                md:-mt-6
                lg:-mt-8
              `,children:[(0,D.jsx)(`span`,{className:`
                  brand-script-yellow
                  transform
                  -rotate-6
                  pr-1
                  text-4xl
                  sm:text-6xl
                  md:text-7xl
                  lg:text-8xl
                `,children:e(`landing.heroTitle2`)}),(0,D.jsx)(`h2`,{className:`
                  brand-sticker-green
                  text-5xl
                  leading-[1.1]
                  sm:text-7xl
                  sm:leading-none
                  md:text-8xl
                  lg:text-[96px]
                `,children:e(`landing.heroTitle3`)})]})]}),(0,D.jsx)(`p`,{className:`
              max-w-xl
              pt-1
              text-sm
              font-light
              leading-relaxed
              text-[#d5d9d0]
              sm:text-base
              md:text-lg
            `,children:e(`landing.heroSubtitle`)}),(0,D.jsxs)(`div`,{className:`
              flex
              flex-col
              items-stretch
              gap-3
              pt-2
              sm:flex-row
              sm:items-center
              sm:gap-4
            `,children:[(0,D.jsxs)(x,{to:`/login`,className:`
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-[#5c744d]
                bg-[#394a2d]
                px-6
                py-3.5
                text-xs
                font-bold
                uppercase
                tracking-wider
                text-white
                shadow-xl
                transition-all
                hover:bg-[#435c39]
                active:scale-[0.98]
                sm:px-8
                sm:py-4
              `,children:[(0,D.jsx)(p,{className:`h-4 w-4 sm:h-5 sm:w-5`}),e(`landing.browseMachinery`)]}),(0,D.jsxs)(x,{to:`/login`,className:`
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#d6b841]
                px-6
                py-3.5
                text-xs
                font-black
                uppercase
                tracking-wider
                text-[#262c1d]
                shadow-xl
                transition-all
                hover:bg-[#e0c64d]
                active:scale-[0.98]
                sm:px-8
                sm:py-4
              `,children:[e(`landing.getStartedNow`),(0,D.jsx)(n,{className:`h-4 w-4 sm:h-5 sm:w-5`})]})]})]})]}),(0,D.jsx)(R,{}),(0,D.jsx)(B,{}),(0,D.jsx)(U,{})]})}export{W as default};