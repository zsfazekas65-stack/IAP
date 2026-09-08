/* IAP – Integrált Automatika Program
   Központi tanév-naptár, 2026/2027.
*/
(function () {
  'use strict';
  const IAP_NAPTAR={tanev:'2026/2027',elsoTanitasNap:'2026-09-01',utolsoTanitasNap:'2027-06-15',szunetek:[{nev:'Őszi szünet',tol:'2026-10-23',ig:'2026-11-01'},{nev:'Téli szünet',tol:'2026-12-19',ig:'2027-01-03'},{nev:'Tavaszi szünet',tol:'2027-03-25',ig:'2027-04-04'}],maxHet:36};
  const TANTARGY_OLDALAK=['villamos9.html','villamos10.html','gepeszet10.html','analog11.html','elektrotechnika11.html','villamosszereles11.html','plc.html','folyamatiranyitas12.html','epuletvillamossag13.html','villamosmuvek13.html'];
  const VS11_TEMAK={
    1:{cim:'A villamos veszélyek felismerése és a biztonsági szemlélet',leiras:'Villamos veszélyforrások, az áramütés kialakulása, közvetlen és közvetett érintés, valamint a biztonságos munkakezdés gondolkodási sorrendje.'},
    2:{cim:'Az áramütés veszélyei és teendők villamos baleset esetén',leiras:'4–6. óra: az áramütés élettani hatásai, közvetlen és közvetett érintés, nedves környezet veszélyei és a villamos balesetnél követendő biztonsági sorrend.'},
    3:{cim:'Feszültségmentes munkavégzés és az 5 biztonsági szabály',leiras:'7–9. óra: munkaterület azonosítása, leválasztás, visszakapcsolás elleni biztosítás, feszültségmentes állapot ellenőrzése és biztonságos munkakezdési sorrend.'},
    4:{cim:'Egyéni védőeszközök és biztonságos műhelymunka',leiras:'10–12. óra: a munkafeladathoz megfelelő egyéni védőeszköz kiválasztása, használat előtti ellenőrzése, valamint a rendezett és biztonságos műhelymunka feltételei.'},
    5:{cim:'Kéziszerszámok és szerelési alapműveletek',leiras:'13–15. óra: kéziszerszámok kiválasztása és állapotellenőrzése, mérés, jelölés, vágás, blankolás, hajlítás, érvéghüvelyezés, krimpelés és a kész munka ellenőrzése.'},
    6:{cim:'Vezetékek és kábelek előkészítése, blankolása és csatlakoztatásra való előállítása',leiras:'16–18. óra: vezeték- és kábeltípusok azonosítása, mérés, jelölés, vágás, köpenybontás, sérülésmentes blankolás, érvéghüvelyezés és a csatlakoztatásra kész vezetővég ellenőrzése.'},
    7:{cim:'Sorkapcsok, kötőelemek és csavaros/rugós vezetékkötések',leiras:'19–21. óra: csavaros és rugós sorkapcsok, érvéghüvelyek és saruk felismerése, helyes bekötése, mechanikai stabilitása, húzópróba és minőségellenőrzés.'},
    8:{cim:'Kötődobozok, elágazások és egyszerű vezetékkötések',leiras:'22–24. óra: kötődobozok kiválasztása, vezetékek rendezett elágaztatása, egyszerű vezetékkötések kialakítása és ellenőrzése.'},
    9:{cim:'Kapcsolók és dugaljak szerelési alapjai',leiras:'25–27. óra: szerelvénydobozok, kapcsolók és dugaljak biztonságos bekötése, rögzítése és ellenőrzése.'},
    10:{cim:'Kapcsolók és dugaszolóaljzatok',leiras:'28–30. óra: egypólusú kapcsoló és dugaszolóaljzat bekötése, L–N–PE szerepek, vezető-előkészítés, mechanikai rögzítés és villamos ellenőrzés.'},
    11:{cim:'Egyszerű világítási áramkör',leiras:'31–33. óra: egyszerű egypólusú világítási áramkör összeállítása, a fázisvezető kapcsolása, a lámpatest bekötése, kötésellenőrzés és biztonságos próba.'},
    12:{cim:'IAP Kihívás I. – Villamos biztonságtechnika',leiras:'34–36. óra: komplex biztonságtechnikai tudáspróba veszélyfelismeréssel, döntési sorrenddel, mérési tervvel, szakmai indoklással és dokumentációval.'},
    13:{cim:'Hibavédelem alapjai',leiras:'37–39. óra: a hibavédelem célja, alapfogalmai, védővezető és automatikus lekapcsolás szerepe.'},
    14:{cim:'Áram-védőkapcsolók',leiras:'40–42. óra: az áram-védőkapcsoló működési elve, kiválasztása, bekötése és ellenőrzése.'},
    15:{cim:'Túlfeszültség-védelem',leiras:'43–45. óra: túlfeszültségek eredete, SPD fokozatok és alapvető beépítési szempontok.'},
    16:{cim:'Védővezetők és EPH',leiras:'46–48. óra: PE vezetők, egyenpotenciálra hozás és a védelmi összekötések gyakorlati kialakítása.'},
    17:{cim:'Egyszerű világítási kapcsolás',leiras:'49–51. óra: egypólusú világítási áramkör szerelése, ellenőrzése és biztonságos üzembe helyezése.'},
    18:{cim:'Váltókapcsolás',leiras:'52–54. óra: egy világítási fogyasztó kapcsolása két helyről, két váltókapcsolóval.'},
    19:{cim:'Keresztkapcsolás',leiras:'55–57. óra: egy világítási fogyasztó kapcsolása három vagy több helyről, két váltókapcsoló és keresztkapcsoló alkalmazásával.'},
    20:{cim:'Lépcsőházi automata és impulzusrelé',leiras:'58–60. óra: több kezelési hely nyomógombokkal, időzített világításvezérlés és impulzusrelés állapotváltás.'},
    21:{cim:'Ipari szerelvények és kapcsolókészülékek',leiras:'61–63. óra: ipari kapcsoló-, vezérlő-, védelmi, jelző- és csatlakozókészülékek felismerése, kiválasztása, kapocsazonosítása és DIN-sínes szerelési alapjai.'},
    22:{cim:'Mágneskapcsolók és segédrelék szerelése',leiras:'64–66. óra: mágneskapcsolók és segédrelék felépítése, A1–A2 tekercskapcsok, fő- és segédérintkezők, kapocsjelölések, tekercsfeszültség és DIN-sínes szerelés.'},
    23:{cim:'Nyomógombok, kapcsolók és jelzőlámpák',leiras:'67–69. óra: nyomógombok, választókapcsolók és jelzőlámpák működése, NO/NC érintkezők, kapocsjelölések, panelbe szerelés, feliratozás és START–STOP jelzőkör kialakítása.'}
  };
  function datum(s){const[y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d,12,0,0)}
  function napKezdete(d){return new Date(d.getFullYear(),d.getMonth(),d.getDate(),12,0,0)}
  function hetfo(d){const x=napKezdete(d),nap=x.getDay();x.setDate(x.getDate()-(nap===0?6:nap-1));return x}
  function szunetben(d){return IAP_NAPTAR.szunetek.some(s=>d>=datum(s.tol)&&d<=datum(s.ig))}
  function tanitasiHetVan(h){const e=datum(IAP_NAPTAR.elsoTanitasNap),u=datum(IAP_NAPTAR.utolsoTanitasNap);for(let i=0;i<5;i++){const d=new Date(h);d.setDate(d.getDate()+i);if(d>=e&&d<=u&&!szunetben(d))return true}return false}
  function aktualisIAPHet(ma=new Date()){const e=datum(IAP_NAPTAR.elsoTanitasNap),u=datum(IAP_NAPTAR.utolsoTanitasNap),m=napKezdete(ma);if(m<e||m>u)return null;const cel=hetfo(m);let h=hetfo(e),n=0;while(h<=cel){if(tanitasiHetVan(h))n++;if(h.getTime()===cel.getTime()){if(!tanitasiHetVan(h))return null;return Math.min(n,IAP_NAPTAR.maxHet)}h.setDate(h.getDate()+7)}return null}
  function stilusBetoltese(){if(document.getElementById('iap-aktualis-het-stilus'))return;const s=document.createElement('style');s.id='iap-aktualis-het-stilus';s.textContent=`.het{position:relative}.het.aktualis-het,.het.aktualis{margin:12px 0;padding:42px 18px 18px;background:linear-gradient(135deg,#e8f3ff,#f8fbff);border:2px solid #1976d2;border-radius:14px;box-shadow:0 10px 28px #1976d22b}.het.aktualis-het::before,.het.aktualis::before{content:'●  AKTUÁLIS HÉT';position:absolute;top:10px;left:88px;padding:5px 12px;border-radius:999px;background:#1976d2;color:#fff;font-size:.78rem;font-weight:800;letter-spacing:.04em;z-index:10}.het.aktualis-het .het-szam,.het.aktualis .het-szam{background:linear-gradient(135deg,#0d47a1,#2196f3)!important;box-shadow:0 5px 14px #1976d244}@media(max-width:650px){.het.aktualis-het,.het.aktualis{padding-top:48px}.het.aktualis-het::before,.het.aktualis::before{left:14px}}`;document.head.appendChild(s)}
  function kiemelAktualisHet(){stilusBetoltese();const a=aktualisIAPHet();document.querySelectorAll('.het').forEach(h=>h.classList.remove('aktualis-het','aktualis'));if(!a)return;document.querySelectorAll('.het').forEach(h=>{const e=h.querySelector('.het-szam');if(e&&parseInt(e.textContent.trim(),10)===a)h.classList.add('aktualis-het')})}
  function subjectDesignBetoltese(){const oldal=location.pathname.split('/').pop().toLowerCase();if(!TANTARGY_OLDALAK.includes(oldal)||document.getElementById('iap-subject-design'))return;const l=document.createElement('link');l.id='iap-subject-design';l.rel='stylesheet';l.href='./iap-subject-design.css?v=4';document.head.appendChild(l)}
  function kihivasMotorBetoltese(){const oldal=location.pathname.split('/').pop().toLowerCase();if(!TANTARGY_OLDALAK.includes(oldal)||oldal==='villamos9.html')return;if(window.IAPKihivas){window.IAPKihivas.autoInit?.();return}if(document.getElementById('iap-kihivas-motor-loader')||document.querySelector('script[src*="iap-kihivas-motor.js"]'))return;const s=document.createElement('script');s.id='iap-kihivas-motor-loader';s.src='./iap-kihivas-motor.js?v=5';s.async=false;s.onload=()=>window.IAPKihivas?.autoInit?.();s.onerror=()=>console.error('IAP: a központi kihívásmotor nem tölthető be.');document.body.appendChild(s)}
  function javitasVillamosszereles11(){
    const oldal=location.pathname.split('/').pop().toLowerCase();
    if(oldal!=='villamosszereles11.html')return;
    const base='https://zsfazekas65-stack.github.io/IAP/';
    const keszHet=23;
    document.querySelectorAll('.het').forEach(h=>{
      const n=parseInt((h.querySelector('.het-szam')?.textContent||'').trim(),10);
      if(!n)return;
      const g=h.querySelectorAll('.gombok a');
      if(g.length<4)return;
      const cim=h.querySelector('h3');
      const p=h.querySelector('.het-tartalom p');
      if(n<=keszHet){
        const nn=String(n).padStart(2,'0');
        const hrefek=[base+`tananyagok/villamosszereles11/${nn}_het.pdf`,base+`ppt/villamosszereles11/${nn}_het.pptx`,base+`feladatok/villamosszereles11/${nn}_het_feladat.pdf`,base+`gyakorlatok/villamosszereles11/${nn}_het_gyakorlat.pdf`];
        g.forEach((a,i)=>{a.classList.remove('hamarosan');a.href=hrefek[i];if(i===1){a.removeAttribute('target');a.setAttribute('download','')}else{a.target='_blank';a.removeAttribute('download')}a.style.pointerEvents='auto';a.style.cursor='pointer';a.style.opacity='1'});
        const tema=VS11_TEMAK[n];
        if(tema&&cim)cim.textContent=`${n}. hét – ${tema.cim}`;else if(cim)cim.textContent=cim.textContent.replace(/\s*[–-]\s*hamarosan\s*$/i,'');
        if(tema&&p)p.textContent=tema.leiras;else if(p&&p.textContent.includes('kerül feltöltésre'))p.textContent='A hét IAP tananyaga, bemutatója, feladatlapja és gyakorlata elérhető.';
      }else{
        g.forEach(a=>{a.removeAttribute('href');a.removeAttribute('target');a.removeAttribute('download');a.classList.add('hamarosan');a.style.pointerEvents='none';a.style.cursor='default';a.style.opacity='.45'});
        if(cim&&!/hamarosan/i.test(cim.textContent))cim.textContent+=' – hamarosan';
        if(p)p.textContent='A hét részletes IAP tananyaga a témakör feldolgozásának ütemében kerül feltöltésre.';
      }
    });
  }
  function javitasPLC(){
    const oldal=location.pathname.split('/').pop().toLowerCase();
    if(oldal!=='plc.html')return;
    const kapcsolat=[...document.querySelectorAll('nav a')].find(a=>a.textContent.trim().toLowerCase()==='kapcsolat');
    if(kapcsolat)kapcsolat.href='kapcsolat.html';
    document.querySelectorAll('.het').forEach(h=>{
      const n=parseInt((h.querySelector('.het-szam')?.textContent||'').trim(),10);
      if(!n)return;
      const nn=String(n).padStart(2,'0');
      const g=h.querySelectorAll('.gombok a');
      if(g.length<4)return;
      g[2].href=`feladatok/plc/${nn}_het_feladat.pdf`;
      g[2].target='_blank';
      g[3].href=`gyakorlatok/plc/${nn}_het_gyakorlat.pdf`;
      g[3].target='_blank';
    });
  }
  function haladasKovetese(){const oldal=location.pathname.split('/').pop().toLowerCase();if(!TANTARGY_OLDALAK.includes(oldal))return;const hetek=[...document.querySelectorAll('.het')];if(!hetek.length)return;const tantargy=(document.querySelector('.tantargy-fejlec h2')?.textContent||document.querySelector('header h1')?.textContent||document.title||'IAP tantárgy').trim();function adat(h){const m=(h.querySelector('.het-szam')?.textContent||'').match(/\d+/);if(!m)return null;const het=+m[0];h.id=`het-${het}`;const tema=(h.querySelector('.het-tartalom h3')?.textContent||h.querySelector('h3')?.textContent||`${het}. hét`).trim();return{oldal,tantargy,het,tema,hash:`#het-${het}`,ido:Date.now()}}function ment(h){const a=adat(h);if(!a)return;try{localStorage.setItem('iap_folytatom',JSON.stringify(a))}catch(e){}}hetek.forEach(h=>{adat(h);h.addEventListener('pointerdown',()=>ment(h));h.querySelectorAll('a,button').forEach(x=>x.addEventListener('click',()=>ment(h),true))});const hash=location.hash.match(/het-(\d+)/);if(hash){const h=document.getElementById(`het-${+hash[1]}`);if(h){ment(h);setTimeout(()=>h.scrollIntoView({behavior:'smooth',block:'center'}),120)}}else{const a=aktualisIAPHet();const h=a&&document.getElementById(`het-${a}`);if(h)ment(h)}}
  window.IAP_NAPTAR=IAP_NAPTAR;window.aktualisIAPHet=aktualisIAPHet;window.kiemelAktualisIAPHet=kiemelAktualisHet;window.kiemelAktualisHet=kiemelAktualisHet;
  function indul(){subjectDesignBetoltese();javitasVillamosszereles11();javitasPLC();kiemelAktualisHet();kihivasMotorBetoltese();haladasKovetese();setTimeout(kiemelAktualisHet,50);setTimeout(kiemelAktualisHet,500)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',indul);else indul();
  window.addEventListener('pageshow',()=>kiemelAktualisHet());
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)kiemelAktualisHet()});
})();