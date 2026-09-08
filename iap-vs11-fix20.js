/* IAP – Villamos szerelések 11 – biztos gombjavítás a 20. és 26. héthez */
(()=>{
'use strict';

const JAVITASOK={
  20:{
    cim:'20. hét – Lépcsőházi automata és impulzusrelé',
    leiras:'58–60. óra: nyomógombos világításvezérlés, lépcsőházi automata, impulzusrelé, vezérlő- és teljesítményáramkör, szerelés és ellenőrzés.',
    hrefek:[
      'https://zsfazekas65-stack.github.io/IAP/tananyagok/villamosszereles11/20_het.pdf',
      'https://zsfazekas65-stack.github.io/IAP/ppt/villamosszereles11/20_het.pptx',
      'https://zsfazekas65-stack.github.io/IAP/feladatok/villamosszereles11/20_het_feladat.pdf',
      'https://zsfazekas65-stack.github.io/IAP/gyakorlatok/villamosszereles11/20_het_gyakorlat.pdf'
    ]
  },
  26:{
    cim:'26. hét – Szigetelési ellenállás mérése',
    leiras:'76–78. óra: szigetelési ellenállás mérésének elve, biztonságos előkészítés, mérési pontok, eredmények értelmezése, dokumentálás és hibás szakasz behatárolása.',
    hrefek:[
      'https://zsfazekas65-stack.github.io/IAP/tananyagok/villamosszereles11/26_het.pdf',
      'https://zsfazekas65-stack.github.io/IAP/ppt/villamosszereles11/26_het.pptx',
      'https://zsfazekas65-stack.github.io/IAP/feladatok/villamosszereles11/26_het_feladat.pdf',
      'https://zsfazekas65-stack.github.io/IAP/gyakorlatok/villamosszereles11/26_het_gyakorlat.pdf'
    ]
  }
};

function hetElem(szam){
  return [...document.querySelectorAll('.het')].find(h=>parseInt((h.querySelector('.het-szam')?.textContent||'').trim(),10)===szam);
}

function javitHet(szam,adat){
  const het=hetElem(szam); if(!het)return;
  const g=[...het.querySelectorAll('.gombok a')]; if(g.length<4)return;
  g.slice(0,4).forEach((a,i)=>{
    a.classList.remove('hamarosan');
    a.href=adat.hrefek[i];
    a.style.pointerEvents='auto'; a.style.cursor='pointer'; a.style.opacity='1';
    if(i===1){ a.removeAttribute('target'); a.setAttribute('download',''); }
    else {
      a.removeAttribute('download');
      a.setAttribute('target','_blank');
      a.setAttribute('rel','noopener');
    }
  });
  const cim=het.querySelector('h3'); if(cim)cim.textContent=adat.cim;
  const p=het.querySelector('.het-tartalom p'); if(p)p.textContent=adat.leiras;
}

function kihivas26(){
  const het=hetElem(26); if(!het)return;
  const tart=het.querySelector('.het-tartalom'); if(!tart)return;
  const regi=tart.querySelector('.iap-kihivas[data-fix26="1"]'); if(regi)return;
  /* Ha a központi motor már létrehozott valódi interaktív kihívást, nem duplázunk. */
  const motoros=[...tart.querySelectorAll('.iap-kihivas')].find(x=>x.querySelector('.iap-kihivas-valaszok'));
  if(motoros)return;
  const box=document.createElement('div');
  box.className='iap-kihivas'; box.dataset.fix26='1';
  box.innerHTML='<div class="iap-kihivas-fej"><b>⚡ IAP heti kihívás</b><span>26. hét</span></div><div class="iap-kihivas-belso"><p class="iap-kihivas-kerdes">Szigetelési ellenállás mérése előtt mi a helyes első lépés?</p><div class="iap-kihivas-valaszok"><button class="iap-kihivas-valasz" data-ok="1">A vizsgált áramkört feszültségmentesítem, leválasztom az érzékeny készülékeket, majd ellenőrzöm a feszültségmentes állapotot.</button><button class="iap-kihivas-valasz">Bekapcsolt állapotban azonnal 500 V mérőfeszültséget kapcsolok rá.</button><button class="iap-kihivas-valasz">A PE vezetőt megszakítom, hogy ne befolyásolja a mérést.</button><button class="iap-kihivas-valasz">Csak a kismegszakítót kapcsolom le, további ellenőrzés nélkül.</button></div><p class="iap-kihivas-vissza"></p><div class="iap-kihivas-pont">Válassz egy választ!</div></div>';
  tart.appendChild(box);
  box.querySelectorAll('.iap-kihivas-valasz').forEach(btn=>btn.addEventListener('click',()=>{
    const ok=btn.dataset.ok==='1';
    box.querySelectorAll('.iap-kihivas-valasz').forEach(b=>{b.disabled=true;if(b.dataset.ok==='1')b.classList.add('helyes');});
    if(!ok)btn.classList.add('hibas');
    const v=box.querySelector('.iap-kihivas-vissza');
    v.className='iap-kihivas-vissza show '+(ok?'ok':'bad');
    v.textContent=ok?'Helyes. A szigetelési ellenállás mérése csak biztonságosan előkészített, feszültségmentes áramkörön végezhető.':'Nem ez a helyes sorrend. Először feszültségmentesítés, leválasztás és ellenőrzés szükséges.';
    box.querySelector('.iap-kihivas-pont').textContent=ok?'✓ Helyes válasz':'✗ Próbáld meg a következő kihívásnál!';
  }));
}

function javit(){
  if((location.pathname.split('/').pop()||'').toLowerCase()!=='villamosszereles11.html')return;
  Object.entries(JAVITASOK).forEach(([szam,adat])=>javitHet(Number(szam),adat));
  kihivas26();
}

function erosites(){
  javit();
  [100,300,700,1500,3000].forEach(ms=>setTimeout(javit,ms));
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',erosites);else erosites();
window.addEventListener('pageshow',()=>setTimeout(javit,50));
})();
