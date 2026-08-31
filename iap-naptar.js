/* IAP – Integrált Automatika Program
   Központi tanév-naptár, 2026/2027.
   A heti sorszám a tanítási heteket számolja; a teljes szüneti heteket kihagyja.
   Forrás: 1/2026. (VII. 31.) OGYM rendelet, szakképzés.
*/
(function () {
  'use strict';

  const IAP_NAPTAR = {
    tanev: '2026/2027',
    elsoTanitasNap: '2026-09-01',
    utolsoTanitasNap: '2027-06-15',
    szunetek: [
      { nev: 'Őszi szünet', tol: '2026-10-23', ig: '2026-11-01' },
      { nev: 'Téli szünet', tol: '2026-12-19', ig: '2027-01-03' },
      { nev: 'Tavaszi szünet', tol: '2027-03-25', ig: '2027-04-04' }
    ],
    maxHet: 36
  };

  function datum(s) {
    const [y, m, d] = s.split('-').map(Number);
    return new Date(y, m - 1, d, 12, 0, 0);
  }

  function napKezdete(d) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12, 0, 0);
  }

  function hetfo(d) {
    const x = napKezdete(d);
    const nap = x.getDay();
    x.setDate(x.getDate() - (nap === 0 ? 6 : nap - 1));
    return x;
  }

  function szunetben(d) {
    return IAP_NAPTAR.szunetek.some(s => d >= datum(s.tol) && d <= datum(s.ig));
  }

  function tanitasiHetVan(hetKezdet) {
    const elso = datum(IAP_NAPTAR.elsoTanitasNap);
    const utolso = datum(IAP_NAPTAR.utolsoTanitasNap);
    for (let i = 0; i < 5; i++) {
      const d = new Date(hetKezdet);
      d.setDate(d.getDate() + i);
      if (d >= elso && d <= utolso && !szunetben(d)) return true;
    }
    return false;
  }

  function aktualisIAPHet(ma = new Date()) {
    const elso = datum(IAP_NAPTAR.elsoTanitasNap);
    const utolso = datum(IAP_NAPTAR.utolsoTanitasNap);
    const most = napKezdete(ma);
    if (most < elso || most > utolso) return null;

    const celHet = hetfo(most);
    let h = hetfo(elso);
    let sorszam = 0;

    while (h <= celHet) {
      if (tanitasiHetVan(h)) sorszam++;
      if (h.getTime() === celHet.getTime()) {
        if (!tanitasiHetVan(h)) return null;
        return Math.min(sorszam, IAP_NAPTAR.maxHet);
      }
      h.setDate(h.getDate() + 7);
    }
    return null;
  }

  function stilusBetoltese() {
    if (document.getElementById('iap-aktualis-het-stilus')) return;
    const style = document.createElement('style');
    style.id = 'iap-aktualis-het-stilus';
    style.textContent = `
      .het{position:relative}
      .het.aktualis-het,.het.aktualis{
        margin:12px 0;
        padding:42px 18px 18px;
        background:linear-gradient(135deg,#e8f3ff,#f8fbff);
        border:2px solid #1976d2;
        border-radius:14px;
        box-shadow:0 10px 28px #1976d22b;
      }
      .het.aktualis-het::before,.het.aktualis::before{
        content:'●  AKTUÁLIS HÉT';
        position:absolute;
        top:10px;
        left:88px;
        padding:5px 12px;
        border-radius:999px;
        background:#1976d2;
        color:#fff;
        font-size:.78rem;
        font-weight:800;
        letter-spacing:.04em;
        z-index:1;
      }
      .het.aktualis-het .het-szam,.het.aktualis .het-szam{
        background:linear-gradient(135deg,#0d47a1,#2196f3)!important;
        box-shadow:0 5px 14px #1976d244;
      }
      @media(max-width:650px){
        .het.aktualis-het,.het.aktualis{padding-top:48px}
        .het.aktualis-het::before,.het.aktualis::before{left:14px}
      }
    `;
    document.head.appendChild(style);
  }

  function kiemelAktualisHet() {
    stilusBetoltese();
    const aktualisHet = aktualisIAPHet();
    document.querySelectorAll('.het').forEach(het => het.classList.remove('aktualis-het','aktualis'));
    if (!aktualisHet) return;

    document.querySelectorAll('.het').forEach(het => {
      const szamElem = het.querySelector('.het-szam');
      if (!szamElem) return;
      const szam = parseInt(szamElem.textContent.trim(), 10);
      if (szam === aktualisHet) het.classList.add('aktualis-het');
    });
  }

  function tantargyiKiegeszitok() {
    if (/villamos10\.html$/i.test(location.pathname) && !document.querySelector('script[src="iap-kihivas-villamos10.js"]')) {
      const s = document.createElement('script');
      s.src = 'iap-kihivas-villamos10.js';
      s.defer = true;
      document.head.appendChild(s);
    }
  }

  window.IAP_NAPTAR = IAP_NAPTAR;
  window.aktualisIAPHet = aktualisIAPHet;
  window.kiemelAktualisHet = kiemelAktualisHet;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { kiemelAktualisHet(); tantargyiKiegeszitok(); });
  } else {
    kiemelAktualisHet();
    tantargyiKiegeszitok();
  }
})();