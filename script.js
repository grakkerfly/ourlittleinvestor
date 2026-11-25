'use strict';
const CONTRACT='J9eBkCb4UtquAMQqB6duwBmR99fFSMoTnDcaMB9Wpump';
const scene=document.getElementById('scene'),openButton=document.getElementById('open'),links=document.getElementById('links'),copy=document.getElementById('copy');
let copyTimer;
const revealSound = new Audio('assets/fah.mp3');
revealSound.preload = 'auto';
revealSound.volume = 0.3;
function projection(from,to){const rows=[];from.forEach(([x,y],i)=>{const[u,v]=to[i];rows.push([x,y,1,0,0,0,-u*x,-u*y,u],[0,0,0,x,y,1,-v*x,-v*y,v]);});for(let c=0;c<8;c++){let best=c;for(let r=c+1;r<8;r++)if(Math.abs(rows[r][c])>Math.abs(rows[best][c]))best=r;[rows[c],rows[best]]=[rows[best],rows[c]];const pivot=rows[c][c];for(let j=c;j<9;j++)rows[c][j]/=pivot;for(let r=0;r<8;r++)if(r!==c){const factor=rows[r][c];for(let j=c;j<9;j++)rows[r][j]-=factor*rows[c][j];}}const[a,b,c,d,e,f,g,h]=rows.map(row=>row[8]);return `matrix3d(${a},${d},0,${g},${b},${e},0,${h},0,0,1,0,${c},${f},0,1)`;}
document.getElementById('door').style.transform=projection([[5,220],[935,0],[1725,765],[865,882]],[[-430,-430],[400,-320],[1190,357],[735,442]]);
openButton.addEventListener('click',()=>{if(scene.dataset.state!=='closed')return;revealSound.currentTime=0;revealSound.play().catch(()=>{});scene.dataset.state='opening';openButton.disabled=true;setTimeout(()=>{scene.dataset.state='open';document.getElementById('title').textContent="there's our little investor";links.hidden=false;openButton.setAttribute('aria-expanded','true');if(document.activeElement===openButton)links.querySelector('a').focus({preventScroll:true});},window.matchMedia('(prefers-reduced-motion: reduce)').matches?20:1050);});
copy.addEventListener('click',async()=>{let ok=false;try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(CONTRACT);ok=true;}}catch{}if(!ok){const area=document.createElement('textarea');area.value=CONTRACT;area.style.cssText='position:fixed;left:-9999px';document.body.append(area);area.select();try{ok=document.execCommand('copy');}catch{}area.remove();copy.focus({preventScroll:true});}clearTimeout(copyTimer);copy.textContent=ok?'copied':'ca';document.getElementById('status').textContent=ok?'':CONTRACT;copyTimer=setTimeout(()=>{copy.textContent='ca';},2000);});






