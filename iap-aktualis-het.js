/* IAP – központi aktuális hét
   A naptár jelenléte esetén automatikusan a tényleges tanítási hetet használja. */
const IAP_AKTUALIS_HET = 1;

(function () {
  const oldal = location.pathname.split('/').pop().toLowerCase();
  const tantargyiOldalak = ['villamos9.html','villamos10.html','gepeszet10.html','analog11.html','elektrotechnika11.html','villamosszereles11.html','plc.html','folyamatiranyitas12.html','epuletvillamossag13.html','villamosmuvek13.html'];

  if (tantargyiOldalak.includes(oldal) && !window.IAP_NAPTAR && !document.querySelector('script[src*="iap-naptar.js"]')) {
    const s = document.createElement('script');
    s.src = './iap-naptar.js?v=4';
    s.async = false;
    document.body.appendChild(s);
  }

  if (oldal === 'plc.html') {
    document.querySelectorAll('a[href^="feladatok/plc/"]').forEach(function (a) {
      a.href = a.getAttribute('href').replace(/\/(\d{2})_het\.pdf$/, '/$1_het_feladat.pdf');
    });
    document.querySelectorAll('a[href^="gyakorlatok/plc/"]').forEach(function (a) {
      a.href = a.getAttribute('href').replace(/\/(\d{2})_het\.pdf$/, '/$1_het_gyakorlat.pdf');
    });
    document.querySelectorAll('nav a').forEach(function (a) {
      if (a.textContent.trim() === 'Kapcsolat' && a.getAttribute('href') === '#') a.href = 'kapcsolat.html';
    });
  }

  /* Villamos szerelések 11. – automatikus heti fájlfelismerés.
     FONTOS: a már működő, href-fel rendelkező gombokat soha nem tiltjuk le.
     Csak a "hamarosan" / href nélküli gombokat próbáljuk automatikusan aktiválni. */
  if (oldal === 'villamosszereles11.html') {
    const letezik = async function (url) {
      try {
        let r = await fetch(url, { method: 'HEAD', cache: 'no-store' });
        if (r.ok) return true;
        r = await fetch(url, { method: 'GET', cache: 'no-store', headers: { 'Range': 'bytes=0-0' } });
        return r.ok || r.status === 206;
      } catch (_) {
        return false;
      }
    };

    const aktival = function (a, url, letoltes) {
      if (!a) return;
      a.href = url;
      a.classList.remove('hamarosan');
      a.removeAttribute('aria-disabled');
      a.removeAttribute('tabindex');
      if (letoltes) {
        a.setAttribute('download', '');
        a.removeAttribute('target');
      } else {
        a.setAttribute('target', '_blank');
        a.removeAttribute('download');
      }
    };

    document.querySelectorAll('.het').forEach(async function (het) {
      const szamEl = het.querySelector('.het-szam');
      const n = parseInt(szamEl ? szamEl.textContent : '', 10);
      if (!Number.isFinite(n)) return;
      const w = String(n).padStart(2, '0');
      const gombok = het.querySelectorAll('.gombok a');
      if (!gombok.length) return;

      const jeloltek = [
        [`tananyagok/villamosszereles11/${w}_het.pdf`, false],
        [`ppt/villamosszereles11/${w}_het.pptx`, true],
        [`feladatok/villamosszereles11/${w}_het_feladat.pdf`, false],
        [`gyakorlatok/villamosszereles11/${w}_het_gyakorlat.pdf`, false]
      ];

      for (let i = 0; i < Math.min(gombok.length, 4); i++) {
        const a = gombok[i];
        /* Már beállított link = érintetlenül hagyjuk. */
        if (a.getAttribute('href')) continue;

        let [url, letoltes] = jeloltek[i];
        let ok = await letezik(url);

        /* A bemutatónál PPTX hiányában PDF-et is elfogadunk. */
        if (i === 1 && !ok) {
          const pdfUrl = `ppt/villamosszereles11/${w}_het.pdf`;
          if (await letezik(pdfUrl)) {
            url = pdfUrl;
            letoltes = false;
            ok = true;
          }
        }

        if (ok) aktival(a, url, letoltes);
      }

      if ([...gombok].some(a => a.getAttribute('href'))) {
        const h3 = het.querySelector('.het-tartalom h3');
        if (h3) h3.textContent = h3.textContent.replace(/\s*[–-]\s*hamarosan\s*$/i, '');
      }
    });
  }

  const n = typeof window.aktualisIAPHet === 'function' ? window.aktualisIAPHet() : Number(IAP_AKTUALIS_HET);
  if (n === null || !Number.isFinite(Number(n)) || Number(n) < 1 || Number(n) > 36) return;

  const hetSzam = Number(n);
  const badge = document.getElementById("iap-aktualis-het-szam");
  const felirat = document.getElementById("iap-aktualis-het-felirat");
  if (badge) badge.textContent = hetSzam + ".";
  if (felirat) felirat.textContent = hetSzam + ". tanítási hét";

  let aktualis = null;
  document.querySelectorAll(".het").forEach(function (het) {
    het.classList.remove("aktualis");
    if (het.id === "aktualis-het") het.removeAttribute("id");
    const szamEl = het.querySelector(".het-szam");
    const szam = parseInt(szamEl ? szamEl.textContent : "", 10);
    if (szam === hetSzam && !aktualis) {
      het.classList.add("aktualis");
      het.id = "aktualis-het";
      aktualis = het;
    }
  });

  if (!aktualis) return;

  let vissza = document.querySelector(".iap-aktualis-vissza");
  if (!vissza) {
    vissza = document.createElement("a");
    vissza.className = "iap-aktualis-vissza";
    vissza.href = "#aktualis-het";
    vissza.setAttribute("aria-label", "Vissza az aktuális héthez");
    vissza.innerHTML = "↩ Aktuális hét";
    document.body.appendChild(vissza);
  }

  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        vissza.classList.toggle("iap-kozel", entry.isIntersecting);
      });
    }, {threshold: 0.25});
    obs.observe(aktualis);
  }
})();
