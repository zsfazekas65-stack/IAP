/* IAP – Integrált Automatika Program
   Központi tanév-naptár, 2026/2027.
*/
(function () {
  'use strict';
  const IAP_NAPTAR={tanev:'2026/2027',elsoTanitasNap:'2026-09-01',utolsoTanitasNap:'2027-06-15',szunetek:[{nev:'Őszi szünet',tol:'2026-10-23',ig:'2026-11-01'},{nev:'Téli szünet',tol:'2026-12-19',ig:'2027-01-03'},{nev:'Tavaszi szünet',tol:'2027-03-25',ig:'2027-04-04'}],maxHet:36};
  const TANTARGY_OLDALAK=['villamos9.html','villamos10.html','gepeszet10.html','analog11.html','elektrotechnika11.html','plc.html','folyamatiranyitas12.html','epuletvillamossag13.html','villamosmuvek13.html'];
  function datum(s){const[y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d,12,0,0)}
  function napKezdete(d){return new Date(d.getFullYear(),d.getMonth(),d.getDate(),12,0,0)}
  function hetfo(d){const x=napKezdete(d),nap=x.getDay();x.setDate(x.getDate()-(nap===0?6:nap-1));return x}
  function szunetben(d){return IAP_NAPTAR.szunetek.some(s=>d>=datum(s.tol)&&d<=datum(s.ig))}
  function tanitasiHetVan(h){const e=datum(IAP_NAPTAR.elsoTanitasNap),u=datum(IAP_NAPTAR.utolsoTanitasNap);for(let i=0;i<5;i++){const d=new Date(h);d.setDate(d.getDate()+i);if(d>=e&&d<=u&&!szunetben(d))return true}return false}
  function aktualisIAPHet(ma=new Date()){const e=datum(IAP_NAPTAR.elsoTanitasNap),u=datum(IAP_NAPTAR.utolsoTanitasNap),m=napKezdete(ma);if(m<e||m>u)return null;const cel=hetfo(m);let h=hetfo(e),n=0;while(h<=cel){if(tanitasiHetVan(h))n++;if(h.getTime()===cel.getTime()){if(!tanitasiHetVan(h))return null;return Math.min(n,IAP_NAPTAR.maxHet)}h.setDate(h.getDate()+7)}return null}
  function stilusBetoltese(){if(document.getElementById('iap-aktualis-het-stilus'))return;const s=document.createElement('style');s.id='iap-aktualis-het-stilus';s.textContent=`.het{position:relative}.het.aktualis-het,.het.aktualis{margin:12px 0;padding:42px 18px 18px;background:linear-gradient(135deg,#e8f3ff,#f8fbff);border:2px solid #1976d2;border-radius:14px;box-shadow:0 10px 28px #1976d22b}.het.aktualis-het::before,.het.aktualis::before{content:'●  AKTUÁLIS HÉT';position:absolute;top:10px;left:88px;padding:5px 12px;border-radius:999px;background:#1976d2;color:#fff;font-size:.78rem;font-weight:800;letter-spacing:.04em;z-index:1}.het.aktualis-het .het-szam,.het.aktualis .het-szam{background:linear-gradient(135deg,#0d47a1,#2196f3)!important;box-shadow:0 5px 14px #1976d244}@media(max-width:650px){.het.aktualis-het,.het.aktualis{padding-top:48px}.het.aktualis-het::before,.het.aktualis::before{left:14px}}`;document.head.appendChild(s)}
  function kiemelAktualisHet(){stilusBetoltese();const a=aktualisIAPHet();document.querySelectorAll('.het').forEach(h=>h.classList.remove('aktualis-het','aktualis'));if(!a)return;document.querySelectorAll('.het').forEach(h=>{const e=h.querySelector('.het-szam');if(e&&parseInt(e.textContent.trim(),10)===a)h.classList.add('aktualis-het')})}
  function kihivasMotorBetoltese(){const oldal=location.pathname.split('/').pop().toLowerCase();if(!TANTARGY_OLDALAK.includes(oldal))return;if(window.IAPKihivas){window.IAPKihivas.autoInit?.();return}if(document.getElementById('iap-kihivas-motor-loader'))return;const s=document.createElement('script');s.id='iap-kihivas-motor-loader';s.src='./iap-kihivas-motor.js?v=3';s.async=false;s.onload=()=>window.IAPKihivas?.autoInit?.();s.onerror=()=>console.error('IAP: a központi kihívásmotor nem tölthető be.');document.body.appendChild(s)}
  window.IAP_NAPTAR=IAP_NAPTAR;window.aktualisIAPHet=aktualisIAPHet;window.kiemelAktualisHet=kiemelAktualisHet;
  function indul(){kiemelAktualisHet();kihivasMotorBetoltese()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',indul);else indul();
})();