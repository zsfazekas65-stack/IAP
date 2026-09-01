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
  if (ugrik && talalat) {
    const celFajl = ugrik.getAttribute('href').split('#')[0];
    if (!celFajl || location.pathname.endsWith(celFajl)) {
      ugrik.href = '#aktualis-het';
    }
  }

  if (talalat && !document.getElementById('iap-vissza-aktualis-hethez')) {
    const style = document.createElement('style');
    style.textContent = `
      #iap-vissza-aktualis-hethez{
        position:fixed;
        right:22px;
        bottom:22px;
        z-index:9999;
        display:flex;
        align-items:center;
        gap:9px;
        padding:12px 17px;
        border-radius:999px;
        background:linear-gradient(135deg,#0d47a1,#1976d2);
        color:#fff;
        text-decoration:none;
        font-weight:800;
        font-size:.92rem;
        box-shadow:0 8px 24px rgba(13,71,161,.28);
        border:1px solid rgba(255,255,255,.22);
        transition:transform .18s ease, box-shadow .18s ease;
      }
      #iap-vissza-aktualis-hethez:hover{
        transform:translateY(-2px);
        box-shadow:0 11px 28px rgba(13,71,161,.34);
      }
      #iap-vissza-aktualis-hethez .iap-vissza-ikon{
        font-size:1.05rem;
        line-height:1;
      }
      @media(max-width:650px){
        #iap-vissza-aktualis-hethez{
          right:12px;
          bottom:12px;
          padding:11px 14px;
          font-size:.84rem;
        }
      }
    `;
    document.head.appendChild(style);

    const gomb = document.createElement('a');
    gomb.id = 'iap-vissza-aktualis-hethez';
    gomb.href = '#aktualis-het';
    gomb.setAttribute('aria-label', 'Vissza az aktuális héthez');
    gomb.innerHTML = '<span class="iap-vissza-ikon">↥</span><span>Aktuális hét</span>';
    document.body.appendChild(gomb);

    gomb.addEventListener('click', function(e){
      e.preventDefault();
      talalat.scrollIntoView({behavior:'smooth', block:'center'});
      history.replaceState(null, '', '#aktualis-het');
    });
  }
})();
