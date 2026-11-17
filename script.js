'use strict';
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];

/* ---------- Theme, nav, back to top ---------- */
const root=document.documentElement,themeBtn=$('#theme');
function setTheme(t){root.dataset.theme=t;themeBtn.textContent=t==='dark'?'☀️':'🌙';try{localStorage.setItem('theme',t)}catch(e){}if(window.charts)draw()}
let saved=null;try{saved=localStorage.getItem('theme')}catch(e){}
setTheme(saved||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'));
themeBtn.onclick=()=>setTheme(root.dataset.theme==='dark'?'light':'dark');
const menu=$('#menu'),burger=$('#burger');
burger.onclick=()=>{const o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)};
$$('#menu a').forEach(a=>a.onclick=()=>{menu.classList.remove('open');burger.setAttribute('aria-expanded',false)});
const top_=$('#top');top_.onclick=()=>scrollTo({top:0,behavior:'smooth'});
const links=$$('#menu a'),secs=links.map(a=>$(a.getAttribute('href')));
addEventListener('scroll',()=>{top_.hidden=scrollY<500;const y=scrollY+120;
 secs.forEach((s,i)=>links[i].classList.toggle('on',s.offsetTop<=y&&s.offsetTop+s.offsetHeight>y))},{passive:true});
$('#yr').textContent=new Date().getFullYear();

/* ---------- Typed text ---------- */
const words=['actionable insights','Power BI dashboards','SQL-driven reports','clear business decisions'];
let wi=0,ci=0,del=false;const typed=$('#typed');
(function tick(){const w=words[wi];ci+=del?-1:1;typed.textContent=w.slice(0,ci);let d=del?35:75;
 if(!del&&ci===w.length){del=true;d=1400}else if(del&&ci===0){del=false;wi=(wi+1)%words.length;d=300}setTimeout(tick,d)})();

/* ---------- Counters ---------- */
function count(el){const t=+el.dataset.count,s=el.dataset.suffix||'',st=performance.now();
 (function f(n){const p=Math.min((n-st)/1200,1);el.textContent=Math.round(t*(1-Math.pow(1-p,3)))+s;if(p<1)requestAnimationFrame(f)})(st)}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){
 if(e.target.dataset.count)count(e.target);
 if(e.target.dataset.lv)e.target.style.width=e.target.dataset.lv+'%';io.unobserve(e.target)}}),{threshold:.4});
$$('[data-count]').forEach(el=>io.observe(el));

/* ---------- Tool icons (inline SVG, no external files) ---------- */
const sv=b=>`<svg viewBox="0 0 32 32" aria-hidden="true">${b}</svg>`;
const ICON={
 Excel:sv('<rect width="32" height="32" rx="7" fill="#1d6f42"/><path d="M10 9l12 14M22 9L10 23" stroke="#fff" stroke-width="3.2" stroke-linecap="round"/>'),
 SQL:sv('<ellipse cx="16" cy="8" rx="10" ry="4" fill="#6d8cff"/><path d="M6 8v16c0 2.2 4.5 4 10 4s10-1.8 10-4V8c0 2.2-4.5 4-10 4S6 10.2 6 8z" fill="#3b5bdb"/><path d="M6 16c0 2.2 4.5 4 10 4s10-1.8 10-4" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="1.5"/>'),
 'Power BI':sv('<rect x="5" y="15" width="6" height="12" rx="2" fill="#f2c811"/><rect x="13" y="9" width="6" height="18" rx="2" fill="#e8a800"/><rect x="21" y="3" width="6" height="24" rx="2" fill="#c98a00"/>'),
 Python:sv('<path d="M16 3c-5 0-6 2-6 4v3h7v1H8c-3 0-5 2-5 6s2 6 5 6h2v-4c0-2 2-4 4-4h6c2 0 3-1 3-3V7c0-2-2-4-7-4z" fill="#3776ab"/><path d="M16 29c5 0 6-2 6-4v-3h-7v-1h9c3 0 5-2 5-6s-2-6-5-6h-2v4c0 2-2 4-4 4h-6c-2 0-3 1-3 3v5c0 2 2 4 7 4z" fill="#ffd43b"/><circle cx="13" cy="7" r="1.2" fill="#fff"/><circle cx="19" cy="25" r="1.2" fill="#3776ab"/>'),
 Tableau:sv('<g fill="#1f3a6e"><rect x="14.5" y="3" width="3" height="26" rx="1"/><rect x="3" y="14.5" width="26" height="3" rx="1"/></g><g fill="#e97627"><rect x="6.7" y="7" width="2" height="9" rx=".8"/><rect x="3.2" y="10.5" width="9" height="2" rx=".8"/></g><g fill="#5ab0c9"><rect x="22.7" y="16" width="2" height="9" rx=".8"/><rect x="19.2" y="19.5" width="9" height="2" rx=".8"/></g>')};
const chip=t=>`<span class="tool">${ICON[t]?`<i class="ti">${ICON[t]}</i>`:''}${t}</span>`;

/* ---------- Skills ---------- */
const skills=[
 ['Excel','Microsoft Excel','Pivot tables, formulas and trend analysis; built Excel dashboards for the bank and credit/debit projects.',80],
 ['SQL','SQL (MySQL)','Multi-table joins, aggregations and window functions on 40K+ row datasets.',85],
 ['Power BI','Power BI','KPIs, calculated measures, slicers and drill-down dashboards.',80],
 ['Python','Python','Data cleaning and exploratory analysis in Jupyter Notebook.',65],
 ['Tableau','Tableau','Interactive KPIs and multi-page supply chain and credit/debit dashboards.',75]];
$('#skillGrid').innerHTML=skills.map(s=>`<div class="card skill"><div class="ic">${ICON[s[0]]}</div><h3>${s[1]}</h3><p>${s[2]}</p><div class="bar"><i data-lv="${s[3]}"></i></div><small>${s[3]}%</small></div>`).join('');
$$('[data-lv]').forEach(el=>io.observe(el));
$('#heroChips').innerHTML=['SQL','Power BI','Tableau','Excel','Python'].map(chip).join('');

/* ---------- Projects ---------- */
const spark=(c)=>`<svg viewBox="0 0 300 150" preserveAspectRatio="none"><g fill="rgba(255,255,255,.28)">${[40,70,55,95,80,115,100].map((h,i)=>`<rect x="${20+i*38}" y="${140-h}" width="24" height="${h}" rx="5"/>`).join('')}</g><polyline fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" points="${c}"/></svg>`;
const projects=[
 {t:'Bank Analytics',d:'Power BI and Excel dashboards monitoring loan performance, default risk and customer acquisition.',tags:['Power BI','MySQL','Excel'],pv:'20,110 58,95 96,100 134,70 172,76 210,45 250,38',period:'April 2025 – July 2025',
  stats:[['869.6M','Total amount'],['65.5K','Loan count'],['155.3M','Total interest'],['1,020','Default loans'],['11%','Delinquent loan rate']],
  pts:['Built interactive KPIs and calculated measures in Power BI for loan default rate and customer acquisition trends.','Used Excel pivot tables and trend analysis to detect a rise in credit card transactions among high-value customers, supporting marketing campaigns.','Wrote SQL with multiple joins, aggregations and window functions on 40K+ rows for customer segmentation, loan repayment patterns and branch performance.','Designed drill-down dashboards with slicers for branch, product type and time period so managers can spot underperforming regions quickly.'],slide:11},
 {t:'Credit & Debit Analysis',d:'Transaction analysis across Excel, Tableau and Power BI covering volumes, payment methods, branches and flagged activity.',tags:['Power BI','Tableau','Excel','SQL'],pv:'20,100 58,70 96,82 134,52 172,60 210,36 250,44',period:'2025',
  stats:[['127.6M','Total credit'],['127.3M','Total debit'],['254.9M','Transaction value'],['~1 lakh','Transactions'],['10.43K','Flagged']],
  pts:['Credit and debit amounts are almost equal, showing stable inflow and outflow, with a net positive of 0.3M.','Debit cards (34%) are slightly ahead of bank transfers (33%) and credit cards (33%).','City Center and Main branches contribute the highest amounts; North Branch has the lowest growth (~16.35%).','Axis Bank and Kotak Mahindra Bank show the highest suspicious activity; monthly transactions dipped from 9,196 in July to 8,947 in September.'],slide:5},
 {t:'Supply Chain Management',d:'Tableau dashboards on inventory, suppliers and sales data with filters and drill-downs for operations teams.',tags:['Tableau','MySQL','Excel'],pv:'20,90 58,98 96,60 134,74 172,40 210,52 250,30',period:'August 2025 – October 2025',
  stats:[['30K+','Rows joined'],['10+','Tableau KPIs'],['3','Drill-down dimensions']],
  pts:['Queried and joined supply chain, inventory and sales tables (30,000+ rows) with optimized MySQL joins to create analysis-ready datasets.','Built 10+ interactive KPIs in Tableau for inventory turnover, supplier lead times and order fulfillment rates.','Designed multi-page dashboards with filters and drill-downs by supplier, product category and region.','Validated data to support accurate supply chain reporting and identify operational trends.'],slide:null}];
$('#projectGrid').innerHTML=projects.map((p,i)=>`<article class="card proj"><div class="pv">${spark(p.pv)}</div><div class="pb"><h3>${p.t}</h3><p>${p.d}</p><div class="chips">${p.tags.map(chip).join('')}</div><button class="btn primary sm" data-p="${i}">View project</button></div></article>`).join('');
const modal=$('#modal');
$$('[data-p]').forEach(b=>b.onclick=()=>{const p=projects[+b.dataset.p];
 $('#modalBody').innerHTML=`<h3>${p.t}</h3><p class="muted">${p.period}</p><div class="stats">${p.stats.map(s=>`<div><b>${s[0]}</b><small>${s[1]}</small></div>`).join('')}</div><h4>What I did</h4><ul>${p.pts.map(x=>`<li>${x}</li>`).join('')}</ul><div class="chips" style="justify-content:flex-start;margin:14px 0">${p.tags.map(chip).join('')}</div>${p.slide?`<a class="btn primary sm" href="#presentation" data-go="${p.slide}">See it in the presentation</a>`:''}`;
 modal.showModal();const g=$('[data-go]',modal);if(g)g.onclick=()=>{modal.close();show(+g.dataset.go-1)}});
$('#close').onclick=()=>modal.close();modal.onclick=e=>{if(e.target===modal)modal.close()};

/* ---------- Sample dataset (seeded, reproducible) ---------- */
const REG=['North','South','East','West'],CAT=['Technology','Furniture','Office Supplies','Apparel'],SEG=['Consumer','Corporate','Home Office'];
const MON=[];for(let y=2024;y<=2025;y++)for(let m=1;m<=12;m++)MON.push(`${y}-${String(m).padStart(2,'0')}`);
let seed=7;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
const rF={North:.9,South:1.1,East:.95,West:1.25},cF={Technology:1.4,Furniture:1,'Office Supplies':.7,Apparel:.85},cM={Technology:.17,Furniture:.09,'Office Supplies':.24,Apparel:.2},sF={Consumer:.5,Corporate:.32,'Home Office':.18};
const rows=[];
MON.forEach((mo,i)=>{const season=1+.25*Math.sin((i%12-8)/12*2*Math.PI)+(i%12>=9?.2:0),growth=1+i*.018;
 REG.forEach(r=>CAT.forEach(c=>SEG.forEach(s=>{const rev=Math.round(9000*rF[r]*cF[c]*sF[s]*season*growth*(.85+rnd()*.3));
  const aov=60+rnd()*60+(c==='Technology'?120:0);rows.push({mo,r,c,s,rev,profit:Math.round(rev*(cM[c]+(rnd()-.5)*.06)),ord:Math.max(1,Math.round(rev/aov))})})))});
const fR=$('#fRegion'),fC=$('#fCat'),fF=$('#fFrom'),fT=$('#fTo');
fR.innerHTML='<option value="">All regions</option>'+REG.map(x=>`<option>${x}</option>`).join('');
fC.innerHTML='<option value="">All categories</option>'+CAT.map(x=>`<option>${x}</option>`).join('');

/* ---------- Dashboard ---------- */
const sum=(a,k)=>a.reduce((t,x)=>t+x[k],0),group=(a,k)=>a.reduce((m,x)=>(m[x[k]]=m[x[k]]||{rev:0,profit:0,ord:0},m[x[k]].rev+=x.rev,m[x[k]].profit+=x.profit,m[x[k]].ord+=x.ord,m),{});
const inr=n=>'₹'+(n>=1e7?(n/1e7).toFixed(2)+' Cr':n>=1e5?(n/1e5).toFixed(2)+' L':Math.round(n).toLocaleString('en-IN'));
const PAL=['#4f7cff','#8b5cf6','#22c55e','#f59e0b','#ec4899'];window.charts={};
function filtered(){let a=fF.value,b=fT.value;if(a&&b&&a>b){[a,b]=[b,a]}
 return rows.filter(x=>(!fR.value||x.r===fR.value)&&(!fC.value||x.c===fC.value)&&(!a||x.mo>=a)&&(!b||x.mo<=b))}
function mk(id,cfg){const tc=getComputedStyle(root).getPropertyValue('--mu').trim(),gc=getComputedStyle(root).getPropertyValue('--bd').trim();
 Chart.defaults.color=tc;Chart.defaults.font.family='Manrope';
 if(charts[id])charts[id].destroy();
 cfg.options=Object.assign({responsive:true,maintainAspectRatio:false},cfg.options);
 if(cfg.options.scales)Object.values(cfg.options.scales).forEach(s=>s.grid=Object.assign({color:gc},s.grid));
 charts[id]=new Chart($('#'+id),cfg)}
function draw(){const d=filtered(),none=!d.length;$('#empty').hidden=!none;
 const rev=sum(d,'rev'),pr=sum(d,'profit'),o=sum(d,'ord');
 $('#kpis').innerHTML=[['Total revenue',inr(rev)],['Total profit',inr(pr)],['Total orders',o.toLocaleString('en-IN')],['Average order value','₹'+(o?Math.round(rev/o).toLocaleString('en-IN'):0)],['Profit margin',(rev?pr/rev*100:0).toFixed(1)+'%']].map(k=>`<div class="card kpi"><small>${k[0]}</small><b>${k[1]}</b></div>`).join('');
 let a=fF.value,b=fT.value;if(a&&b&&a>b)[a,b]=[b,a];
 const months=MON.filter(m=>(!a||m>=a)&&(!b||m<=b)),gm=group(d,'mo'),gc=group(d,'c'),gr=group(d,'r'),gs=group(d,'s');
 const lab=m=>new Date(m+'-01').toLocaleDateString('en',{month:'short',year:'2-digit'});
 const ticks={callback:v=>inr(v)};
 mk('chTrend',{type:'line',data:{labels:months.map(lab),datasets:[{label:'Revenue',data:months.map(m=>gm[m]?.rev||0),borderColor:'#4f7cff',backgroundColor:'rgba(79,124,255,.15)',fill:true,tension:.35},{label:'Profit',data:months.map(m=>gm[m]?.profit||0),borderColor:'#22c55e',tension:.35}]},options:{interaction:{mode:'index',intersect:false},scales:{y:{ticks}},plugins:{tooltip:{callbacks:{label:c=>`${c.dataset.label}: ${inr(c.parsed.y)}`}}}}});
 const cats=CAT.filter(c=>gc[c]);
 mk('chCat',{type:'doughnut',data:{labels:cats,datasets:[{data:cats.map(c=>gc[c].rev),backgroundColor:PAL,borderWidth:0}]},options:{cutout:'62%',plugins:{legend:{position:'bottom'},tooltip:{callbacks:{label:c=>`${c.label}: ${inr(c.parsed)}`}}}}});
 const regs=REG.filter(r=>gr[r]);
 mk('chReg',{type:'bar',data:{labels:regs,datasets:[{label:'Revenue',data:regs.map(r=>gr[r].rev),backgroundColor:'#8b5cf6',borderRadius:8}]},options:{plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>inr(c.parsed.y)}}},scales:{y:{ticks}}}});
 mk('chProfit',{data:{labels:cats,datasets:[{type:'bar',label:'Profit',data:cats.map(c=>gc[c].profit),backgroundColor:'#22c55e',borderRadius:8,yAxisID:'y'},{type:'line',label:'Margin %',data:cats.map(c=>+(gc[c].profit/gc[c].rev*100).toFixed(1)),borderColor:'#f59e0b',yAxisID:'y1'}]},options:{scales:{y:{ticks},y1:{position:'right',grid:{drawOnChartArea:false},ticks:{callback:v=>v+'%'}}}}});
 const segs=SEG.filter(s=>gs[s]);
 mk('chSeg',{type:'pie',data:{labels:segs,datasets:[{data:segs.map(s=>gs[s].rev),backgroundColor:PAL.slice(0,3),borderWidth:0}]},options:{plugins:{legend:{position:'bottom'},tooltip:{callbacks:{label:c=>`${c.label}: ${inr(c.parsed)}`}}}}})}
[fR,fC,fF,fT].forEach(el=>el.addEventListener('change',draw));
$('#fReset').onclick=()=>{fR.value=fC.value='';fF.value='2024-01';fT.value='2025-12';draw()};
draw();

/* ---------- Presentation viewer ---------- */
const N=18,src=i=>`assets/slides/s-${String(i+1).padStart(2,'0')}.jpg`;let cur=0;
$('#thumbs').innerHTML=Array.from({length:N},(_,i)=>`<img src="${src(i)}" alt="Slide ${i+1}" loading="lazy" data-i="${i}">`).join('');
function show(i){cur=(i+N)%N;$('#slide').src=src(cur);$('#slide').alt='Slide '+(cur+1)+' of '+N;$('#count').textContent=`Slide ${cur+1} of ${N}`;
 $$('#thumbs img').forEach((t,j)=>t.classList.toggle('on',j===cur));$('#thumbs .on')?.scrollIntoView({block:'nearest',inline:'center'})}
$('#prev').onclick=()=>show(cur-1);$('#next').onclick=()=>show(cur+1);
$('#thumbs').onclick=e=>{if(e.target.dataset.i)show(+e.target.dataset.i)};
$('#full').onclick=()=>$('.stage').requestFullscreen?.();
document.addEventListener('keydown',e=>{const r=$('#presentation').getBoundingClientRect();if(r.top<innerHeight&&r.bottom>0&&!/INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)){if(e.key==='ArrowRight')show(cur+1);if(e.key==='ArrowLeft')show(cur-1)}});
show(0);

/* ---------- Contact form (opens the visitor's email app) ---------- */
$('#form').addEventListener('submit',e=>{e.preventDefault();const f=e.target,m=$('#formMsg'),v=n=>f.elements[n].value.trim();
 if(!v('name')||!/^\S+@\S+\.\S+$/.test(v('email'))||!v('message')){m.textContent='Enter your name, a valid email and a message.';return}
 location.href=`mailto:pavandsp974@gmail.com?subject=${encodeURIComponent('Portfolio enquiry from '+v('name'))}&body=${encodeURIComponent(v('message')+'\n\nFrom: '+v('name')+' ('+v('email')+')')}`;
 m.textContent='Opening your email app to send the message.';f.reset()});
