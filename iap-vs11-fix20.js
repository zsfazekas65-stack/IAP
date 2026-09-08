(()=>{
'use strict';
if((location.pathname.split('/').pop()||'').toLowerCase()!=='villamosszereles11.html')return;
const B='https://zsfazekas65-stack.github.io/IAP/';
const H={20:'Lépcsőházi automata és impulzusrelé',26:'Szigetelési ellenállás mérése',27:'Hurokimpedancia mérése és a védelem ellenőrzése',28:'Áram-védőkapcsoló vizsgálata'};
function fut(){
  for(const [n,cim] of Object.entries(H)){
    const het=[...document.querySelectorAll('.het')].find(h=>parseInt((h.querySelector('.het-szam')?.textContent||'').trim(),10)===Number(n));
    if(!het)continue;
    const g=[...het.querySelectorAll('.gombok a')];
    if(g.length<4)continue;
    const nn=String(n).padStart(2,'0');
    const u=[B+`tananyagok/villamosszereles11/${nn}_het.pdf`,B+`ppt/villamosszereles11/${nn}_het.pptx`,B+`feladatok/villamosszereles11/${nn}_het_feladat.pdf`,B+`gyakorlatok/villamosszereles11/${nn}_het_gyakorlat.pdf`];
    g.forEach((a,i)=>{a.classList.remove('hamarosan');a.href=u[i];a.style.pointerEvents='auto';a.style.cursor='pointer';a.style.opacity='1';if(i===1){a.removeAttribute('target');a.setAttribute('download','')}else{a.removeAttribute('download');a.target='_blank'}});
    const h3=het.querySelector('h3');if(h3)h3.textContent=`${n}. hét – ${cim}`;
  }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fut,{once:true});else fut();
})();
