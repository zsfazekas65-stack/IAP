/* IAP – Villamos szerelések 11 – 20. hét biztos gombjavítás */
(()=>{
'use strict';
function javit(){
  if((location.pathname.split('/').pop()||'').toLowerCase()!=='villamosszereles11.html')return;
  const het=[...document.querySelectorAll('.het')].find(h=>parseInt((h.querySelector('.het-szam')?.textContent||'').trim(),10)===20);
  if(!het)return;
  const g=het.querySelectorAll('.gombok a');
  if(g.length<4)return;
  const hrefek=[
    'https://zsfazekas65-stack.github.io/IAP/tananyagok/villamosszereles11/20_het.html',
    'https://raw.githubusercontent.com/zsfazekas65-stack/IAP/main/ppt/villamosszereles11/20_het.pptx',
    'https://raw.githubusercontent.com/zsfazekas65-stack/IAP/main/feladatok/villamosszereles11/20_het_feladat.pdf',
    'https://raw.githubusercontent.com/zsfazekas65-stack/IAP/main/gyakorlatok/villamosszereles11/20_het_gyakorlat.pdf'
  ];
  g.forEach((a,i)=>{
    a.classList.remove('hamarosan');
    a.href=hrefek[i];
    a.style.pointerEvents='auto';
    a.style.cursor='pointer';
    a.style.opacity='1';
    if(i===1){a.removeAttribute('target');a.setAttribute('download','');}
    else{a.target='_blank';a.removeAttribute('download');}
  });
  const cim=het.querySelector('h3');
  if(cim)cim.textContent='20. hét – Lépcsőházi automata és impulzusrelé';
  const p=het.querySelector('.het-tartalom p');
  if(p)p.textContent='58–60. óra: nyomógombos világításvezérlés, lépcsőházi automata, impulzusrelé, vezérlő- és teljesítményáramkör, szerelés és ellenőrzés.';
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',javit);else javit();
window.addEventListener('pageshow',()=>setTimeout(javit,50));
setTimeout(javit,300);
})();
