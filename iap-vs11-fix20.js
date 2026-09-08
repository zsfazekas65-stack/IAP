/* IAP – Villamos szerelések 11 – biztos gombjavítás a 20., 26. és 27. héthez – v27 */
(()=>{
'use strict';

const BASE='https://zsfazekas65-stack.github.io/IAP/';
const JAVITASOK={
  20:{cim:'20. hét – Lépcsőházi automata és impulzusrelé',leiras:'58–60. óra: nyomógombos világításvezérlés, lépcsőházi automata, impulzusrelé, vezérlő- és teljesítményáramkör, szerelés és ellenőrzés.',fajl:'20'},
  26:{cim:'26. hét – Szigetelési ellenállás mérése',leiras:'76–78. óra: szigetelési ellenállás mérésének elve, biztonságos előkészítés, mérési pontok, eredmények értelmezése, dokumentálás és hibás szakasz behatárolása.',fajl:'26'},
  27:{cim:'27. hét – Hurokimpedancia mérése és a védelem ellenőrzése',leiras:'79–81. óra: hibahurok és hurokimpedancia fogalma, várható hibaáram, védelmi készülékek működési feltételei, mérési pontok, dokumentálás és hibakeresés.',fajl:'27'}
};

function hrefek(nn){
  return [
    BASE+`tananyagok/villamosszereles11/${nn}_het.pdf`,
    BASE+`ppt/villamosszereles11/${nn}_het.pptx`,
    BASE+`feladatok/villamosszereles11/${nn}_het_feladat.pdf`,
    BASE+`gyakorlatok/villamosszereles11/${nn}_het_gyakorlat.pdf`
  ];
}
function hetElem(szam){
  return [...document.querySelectorAll('.het')].find(h=>parseInt((h.querySelector('.het-szam')?.textContent||'').trim(),10)===szam);
}
function javitHet(szam,adat){
  const het=hetElem(szam); if(!het)return;
  const g=[...het.querySelectorAll('.gombok a')]; if(g.length<4)return;
  hrefek(adat.fajl).forEach((href,i)=>{
    const a=g[i];
    a.classList.remove('hamarosan');
    a.href=href;
    a.style.pointerEvents='auto';
    a.style.cursor='pointer';
    a.style.opacity='1';
    a.removeAttribute('aria-disabled');
    if(i===1){
      a.removeAttribute('target');
      a.setAttribute('download','');
    }else{
      a.removeAttribute('download');
      a.setAttribute('target','_blank');
      a.setAttribute('rel','noopener');
    }
  });
  const cim=het.querySelector('h3'); if(cim)cim.textContent=adat.cim;
  const p=het.querySelector('.het-tartalom p'); if(p)p.textContent=adat.leiras;
}

const KIHIVASOK={
  26:{kerdes:'Szigetelési ellenállás mérése előtt mi a helyes első lépés?',jo:'A vizsgált áramkört feszültségmentesítem, leválasztom az érzékeny készülékeket, majd ellenőrzöm a feszültségmentes állapotot.',rossz:['Bekapcsolt állapotban azonnal 500 V mérőfeszültséget kapcsolok rá.','A PE vezetőt megszakítom, hogy ne befolyásolja a mérést.','Csak a kismegszakítót kapcsolom le, további ellenőrzés nélkül.'],ok:'Helyes. A szigetelési ellenállás mérése csak biztonságosan előkészített, feszültségmentes áramkörön végezhető.',bad:'Nem ez a helyes sorrend. Először feszültségmentesítés, leválasztás és ellenőrzés szükséges.'},
  27:{kerdes:'Egy dugaszolóaljzat működik, de a hurokimpedancia-mérés gyanúsan nagy értéket ad. Elfogadható-e csak azért, mert a fogyasztó működik?',jo:'Nem. A működés nem bizonyítja a hibavédelem megfelelőségét; a PE-utat, a kötéseket és a védelmi készülék feltételeit ellenőrizni kell.',rossz:['Igen, mert ami működik, az villamosan biztosan rendben van.','Igen, ha a kismegszakító nincs leoldva.','Igen, ha a burkolat sértetlen és nem látszik hiba.'],ok:'Helyes. A működő fogyasztó nem igazolja automatikusan a hibavédelmet.',bad:'Nem jó döntés. A hurokimpedancia a hiba esetén várható lekapcsolási feltétel megítéléséhez fontos.'}
};
function kihivas(szam,adat){
  const het=hetElem(szam); if(!het)return;
  const tart=het.querySelector('.het-tartalom'); if(!tart)return;
  if(tart.querySelector(`.iap-kihivas[data-fix="${szam}"]`))return;
  const motoros=[...tart.querySelectorAll('.iap-kihivas')].find(x=>x.querySelector('.iap-kihivas-valaszok'));
  if(motoros)return;
  const vals=[adat.jo,...adat.rossz];
  const box=document.createElement('div');
  box.className='iap-kihivas'; box.dataset.fix=String(szam);
  box.innerHTML=`<div class="iap-kihivas-fej"><b>⚡ IAP heti kihívás</b><span>${szam}. hét</span></div><div class="iap-kihivas-belso"><p class="iap-kihivas-kerdes">${adat.kerdes}</p><div class="iap-kihivas-valaszok">${vals.map((v,i)=>`<button class="iap-kihivas-valasz" ${i===0?'data-ok="1"':''}>${v}</button>`).join('')}</div><p class="iap-kihivas-vissza"></p><div class="iap-kihivas-pont">Válassz egy választ!</div></div>`;
  tart.appendChild(box);
  box.querySelectorAll('.iap-kihivas-valasz').forEach(btn=>btn.addEventListener('click',()=>{
    const ok=btn.dataset.ok==='1';
    box.querySelectorAll('.iap-kihivas-valasz').forEach(b=>{b.disabled=true;if(b.dataset.ok==='1')b.classList.add('helyes');});
    if(!ok)btn.classList.add('hibas');
    const v=box.querySelector('.iap-kihivas-vissza');
    v.className='iap-kihivas-vissza show '+(ok?'ok':'bad');
    v.textContent=ok?adat.ok:adat.bad;
    box.querySelector('.iap-kihivas-pont').textContent=ok?'✓ Helyes válasz':'✗ Próbáld meg a következő kihívásnál!';
  }));
}
function javit(){
  if((location.pathname.split('/').pop()||'').toLowerCase()!=='villamosszereles11.html')return;
  Object.entries(JAVITASOK).forEach(([szam,adat])=>javitHet(Number(szam),adat));
  Object.entries(KIHIVASOK).forEach(([szam,adat])=>kihivas(Number(szam),adat));
}
function erosites(){
  javit();
  [100,300,700,1500,3000,5000,8000].forEach(ms=>setTimeout(javit,ms));
  const main=document.querySelector('main');
  if(main){
    const obs=new MutationObserver(()=>javit());
    obs.observe(main,{subtree:true,childList:true,attributes:true,attributeFilter:['class','href','style']});
    setTimeout(()=>obs.disconnect(),12000);
  }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',erosites);else erosites();
window.addEventListener('pageshow',()=>setTimeout(javit,50));
})();
