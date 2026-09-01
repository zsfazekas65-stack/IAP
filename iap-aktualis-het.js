/* IAP – központi aktuális hét beállítás
   Csak ezt az egy számot kell átírni hetente. */
const IAP_AKTUALIS_HET = 1;

(function(){
  const n = Number(IAP_AKTUALIS_HET);
  const badge = document.getElementById('iap-aktualis-het-szam');
  const felirat = document.getElementById('iap-aktualis-het-felirat');
  if (badge) badge.textContent = n + '.';
  if (felirat) felirat.textContent = n + '. tanítási hét';

  let talalat = null;
  document.querySelectorAll('.het').forEach(function(het){
    const szamEl = het.querySelector('.het-szam');
    const szam = parseInt(szamEl ? szamEl.textContent : '', 10);
    if (szam === n) {
      het.classList.add('aktualis');
      if (!het.id) het.id = 'aktualis-het';
      talalat = het;
    }
  });

  const ugrik = document.querySelector('a[href$="#aktualis-het"]');
  if (ugrik && talalat && location.pathname.endsWith(ugrik.getAttribute('href').split('#')[0])) {
    ugrik.href = '#aktualis-het';
  }
})();
