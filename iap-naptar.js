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
      { nev: 'Őszi szünet',  tol: '2026-10-23', ig: '2026-11-01' },
      { nev: 'Téli szünet',  tol: '2026-12-19', ig: '2027-01-03' },
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

  function kiemelAktualisHet() {
    const aktualisHet = aktualisIAPHet();
    if (!aktualisHet) return;

    document.querySelectorAll('.het').forEach(het => {
      const szamElem = het.querySelector('.het-szam');
      if (!szamElem) return;
      const szam = parseInt(szamElem.textContent.trim(), 10);
      if (szam !== aktualisHet) return;

      het.classList.add('aktualis-het');
      const tartalom = het.querySelector('.het-tartalom');
      if (tartalom && !tartalom.querySelector('.aktualis-jelzes')) {
        const badge = document.createElement('div');
        badge.className = 'aktualis-jelzes';
        badge.textContent = 'AKTUÁLIS HÉT';
        tartalom.prepend(badge);
      }
    });
  }

  window.IAP_NAPTAR = IAP_NAPTAR;
  window.aktualisIAPHet = aktualisIAPHet;
  window.kiemelAktualisHet = kiemelAktualisHet;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', kiemelAktualisHet);
  } else {
    kiemelAktualisHet();
  }
})();