/* IAP – Villamos szerelések 11 – biztos gombjavítás a 20. és 26. héthez */
(()=>{
'use strict';

const JAVITASOK={
  20:{
    cim:'20. hét – Lépcsőházi automata és impulzusrelé',
    leiras:'58–60. óra: nyomógombos világításvezérlés, lépcsőházi automata, impulzusrelé, vezérlő- és teljesítményáramkör, szerelés és ellenőrzés.',
    hrefek:[
      'https://raw.githubusercontent.com/zsfazekas65-stack/IAP/main/tananyagok/villamosszereles11/20_het.pdf',
      'https://raw.githubusercontent.com/zsfazekas65-stack/IAP/main/ppt/villamosszereles11/20_het.pptx',
      'https://raw.githubusercontent.com/zsfazekas65-stack/IAP/main/feladatok/villamosszereles11/20_het_feladat.pdf',
      'https://raw.githubusercontent.com/zsfazekas65-stack/IAP/main/gyakorlatok/villamosszereles11/20_het_gyakorlat.pdf'
    ]
  },
  26:{
    cim:'26. hét – Szigetelési ellenállás mérése',
    leiras:'76–78. óra: szigetelési ellenállás mérésének elve, biztonságos előkészítés, mérési pontok, eredmények értelmezése, dokumentálás és hibás szakasz behatárolása.',
    hrefek:[
      'https://raw.githubusercontent.com/zsfazekas65-stack/IAP/main/tananyagok/villamosszereles11/26_het.pdf',
      'https://raw.githubusercontent.com/zsfazekas65-stack/IAP/main/ppt/villamosszereles11/26_het.pptx',
      'https://raw.githubusercontent.com/zsfazekas65-stack/IAP/main/feladatok/villamosszereles11/26_het_feladat.pdf',
      'https://raw.githubusercontent.com/zsfazekas65-stack/IAP/main/gyakorlatok/villamosszereles11/26_het_gyakorlat.pdf'
    ]
  }
};

function javitHet(szam,adat){
  const het=[...document.querySelectorAll('.het')].find(h=>parseInt((h.querySelector('.het-szam')?.textContent||'').trim(),10)===szam);
  if(!het)return;
  const g=[...het.querySelectorAll('.gombok a')];
  if(g.length<4)return;
  g.slice(0,4).forEach((a,i)=>{
    a.classList.remove('hamarosan');
    a.href=adat.hrefek[i];
    a.style.pointerEvents='auto';
    a.style.cursor='pointer';
    a.style.opacity='1';
    if(i===1){
      a.removeAttribute('target');
      a.setAttribute('download','');
    }else{
      a.target='_blank';
      a.removeAttribute('download');
    }
  });
  const cim=het.querySelector('h3');
  if(cim)cim.textContent=adat.cim;
  const p=het.querySelector('.het-tartalom p');
  if(p)p.textContent=adat.leiras;
}

function javit(){
  if((location.pathname.split('/').pop()||'').toLowerCase()!=='villamosszereles11.html')return;
  Object.entries(JAVITASOK).forEach(([szam,adat])=>javitHet(Number(szam),adat));
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',javit);else javit();
window.addEventListener('pageshow',()=>setTimeout(javit,50));
setTimeout(javit,300);
})();
