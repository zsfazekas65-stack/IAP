/* IAP – központi aktuális hét
   Hetente csak az alábbi egy számot kell átírni. */
const IAP_AKTUALIS_HET = 1;

(function () {
  const n = Number(IAP_AKTUALIS_HET);
  if (!Number.isFinite(n) || n < 1 || n > 36) return;

  const badge = document.getElementById("iap-aktualis-het-szam");
  const felirat = document.getElementById("iap-aktualis-het-felirat");
  if (badge) badge.textContent = n + ".";
  if (felirat) felirat.textContent = n + ". tanítási hét";

  let aktualis = null;
  document.querySelectorAll(".het").forEach(function (het) {
    het.classList.remove("aktualis");
    if (het.id === "aktualis-het") het.removeAttribute("id");
    const szamEl = het.querySelector(".het-szam");
    const szam = parseInt(szamEl ? szamEl.textContent : "", 10);
    if (szam === n && !aktualis) {
      het.classList.add("aktualis");
      het.id = "aktualis-het";
      aktualis = het;
    }
  });

  if (!aktualis) return;

  // Tantárgyi oldalon mindig legyen gyors visszaugrás az aktuális héthez.
  let vissza = document.querySelector(".iap-aktualis-vissza");
  if (!vissza) {
    vissza = document.createElement("a");
    vissza.className = "iap-aktualis-vissza";
    vissza.href = "#aktualis-het";
    vissza.setAttribute("aria-label", "Vissza az aktuális héthez");
    vissza.innerHTML = "↩ Aktuális hét";
    document.body.appendChild(vissza);
  }

  // Ha éppen az aktuális hét látszik, a gomb maradjon diszkrétebb.
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        vissza.classList.toggle("iap-kozel", entry.isIntersecting);
      });
    }, {threshold: 0.25});
    obs.observe(aktualis);
  }
})();
