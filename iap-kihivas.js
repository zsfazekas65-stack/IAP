(()=>{
const KIHIVASOK={
  '01':{
    tipus:'Szakmai döntés',
    kerdes:'Belépsz a tanműhelybe, és egy ismeretlen kapcsolás már feszültség alatt van. Mi legyen az első lépésed?',
    valaszok:[
      'Azonnal megérintem a vezetékeket, hogy érezzem, van-e feszültség.',
      'Először tájékozódom, ellenőrzöm a munkaterületet és csak engedéllyel kezdek munkát.',
      'Bekapcsolom az összes kapcsolót, hogy kiderüljön, mi történik.',
      'Szétszerelem a kapcsolást, mert így biztosan nem működik.'
    ],
    helyes:1,
    magyarazat:'A szakember első döntése mindig a biztonság. Ismeretlen állapotú berendezésnél előbb tájékozódunk, felmérjük a veszélyeket és csak szabályos, engedélyezett módon dolgozunk.'
  },
  '02':{
    tipus:'Biztonsági helyzet',
    kerdes:'Egy sérült szigetelésű hosszabbítót találsz a tanműhelyben. Mi a helyes teendő?',
    valaszok:[
      'Használom, ha csak rövid ideig kell.',
      'Szigetelőszalaggal gyorsan körbetekerem és folytatom a munkát.',
      'Kivonom a használatból és jelzem az oktatónak vagy felelős személynek.',
      'Csak gumikesztyűben használom.'
    ],
    helyes:2,
    magyarazat:'A sérült villamos eszközt nem szabad tovább használni. A helyes szakmai magatartás a használat megszüntetése és a hiba jelzése.'
  },
  '03':{
    tipus:'Energia útja',
    kerdes:'Melyik sorrend írja le helyesen a villamos energia tipikus útját a termeléstől a fogyasztóig?',
    valaszok:[
      'Fogyasztó → erőmű → transzformátor → hálózat',
      'Erőmű → átviteli hálózat → elosztóhálózat → fogyasztó',
      'Elosztóhálózat → erőmű → fogyasztó → transzformátor',
      'Erőmű → fogyasztó → átviteli hálózat → elosztóhálózat'
    ],
    helyes:1,
    magyarazat:'A villamos energiát erőművek termelik, nagyfeszültségű átviteli hálózat szállítja, majd az elosztóhálózat juttatja el a fogyasztókhoz.'
  },
  '04':{
    tipus:'Fogalomfelismerés',
    kerdes:'Melyik állítás helyes a három alapvető villamos mennyiségről?',
    valaszok:[
      'A feszültség mértékegysége amper, az áramerősségé volt.',
      'Az ellenállás azt fejezi ki, mennyire akadályozza egy elem az áram folyását.',
      'Az áramerősség azt mutatja meg, mekkora a vezető ellenállása.',
      'A feszültség és az ellenállás ugyanazt a fizikai mennyiséget jelenti.'
    ],
    helyes:1,
    magyarazat:'Az ellenállás az áram folyásával szembeni akadályozó hatást jellemzi. Mértékegysége az ohm (Ω).'
  },
  '05':{tipus:"Számolj!",kerdes:"Egy fogyasztón 12 V feszültség mellett 3 A áram folyik. Mekkora az ellenállása?",valaszok:["4 Ω", "9 Ω", "15 Ω", "36 Ω"],helyes:0,magyarazat:"Ohm törvénye szerint R = U / I = 12 / 3 = 4 Ω."},
  '06':{tipus:"Mérés",kerdes:"A számított érték 100 Ω, a műszer 99,8 Ω-ot mutat. Mi a legjobb következtetés?",valaszok:["A mérés biztosan hibás.", "A mért és számított érték jól egyezik.", "Az ellenállás zárlatos.", "A műszer csak feszültséget mér."],helyes:1,magyarazat:"A kis eltérés természetes lehet a tűrés és a mérési bizonytalanság miatt."},
  '07':{tipus:"Számolj!",kerdes:"Egy 24 V-os áramkörben 120 Ω az ellenállás. Mekkora az áram?",valaszok:["0,2 A", "2 A", "5 A", "2880 A"],helyes:0,magyarazat:"I = U / R = 24 / 120 = 0,2 A."},
  '08':{tipus:"IAP döntés",kerdes:"Egy mérés eredménye meglepő. Mit tesz a jó szakember először?",valaszok:["Átírja az eredményt.", "Ellenőrzi a kapcsolást, a méréshatárt és megismétli a mérést.", "Kicserél minden alkatrészt.", "Figyelmen kívül hagyja."],helyes:1,magyarazat:"A megbízható szakmai döntés ellenőrizhető mérésre épül."},
  '09':{tipus:"Hibakereső",kerdes:"A tápegység jó, de a fogyasztó nem működik. Mi az első logikus vizsgálat?",valaszok:["Az áramút folytonossága és a kapcsoló állapota.", "A műhely világítása.", "A fogyasztó színe.", "A hálózati frekvencia átírása."],helyes:0,magyarazat:"Működéshez zárt áramút szükséges; először az áramút megszakadását érdemes keresni."},
  '10':{tipus:"Kapcsolási rajz",kerdes:"Miért használunk szabványos villamos rajzjeleket?",valaszok:["Hogy a rajz szebb legyen.", "Hogy a kapcsolást más szakember is egyértelműen értelmezhesse.", "Hogy ne kelljen vezetéket használni.", "Csak a vizsgán van rá szükség."],helyes:1,magyarazat:"A szabványos jelképek a szakma közös nyelvét adják."},
  '11':{tipus:"Soros kapcsolás",kerdes:"Két soros fogyasztó közül az egyik megszakad. Mi történik?",valaszok:["Csak a hibás fogyasztó áll le.", "Az egész áramút megszakad.", "Az áram megduplázódik.", "A tápegység feszültsége eltűnik."],helyes:1,magyarazat:"Soros kapcsolásban egyetlen áramút van, ezért egy szakadás az egész kört megszakítja."},
  '12':{tipus:"Párhuzamos kapcsolás",kerdes:"Két párhuzamos ág közül az egyik megszakad. Mi történik a másik ép ággal?",valaszok:["Az is biztosan leáll.", "Tovább működhet, mert önálló áramútja van.", "Zárlatos lesz.", "Megfordul benne az áram."],helyes:1,magyarazat:"A párhuzamos ágak külön áramutak, ezért egy ág hibája nem feltétlenül állítja le a másikat."},
  '13':{tipus:"Szakmai döntés",kerdes:"Két lámpát úgy szeretnél bekötni, hogy az egyik hibája esetén a másik tovább működjön. Melyik kapcsolást választod?",valaszok:["Soros", "Párhuzamos", "Rövidzár", "Nyitott áramkör"],helyes:1,magyarazat:"A párhuzamos kapcsolás önálló áramutat biztosít a fogyasztóknak."},
  '14':{tipus:"Számolj!",kerdes:"Egy 24 V-os fogyasztón 2 A folyik. Mekkora a teljesítménye?",valaszok:["12 W", "22 W", "48 W", "240 W"],helyes:2,magyarazat:"P = U · I = 24 · 2 = 48 W."},
  '15':{tipus:"Mérés",kerdes:"Hogyan kapcsoljuk az ampermérőt az áramkörbe?",valaszok:["Párhuzamosan a fogyasztóval.", "Sorosan az áramútba.", "A tápegység mellé, bekötés nélkül.", "Mindig rövidzárként."],helyes:1,magyarazat:"Az áramerősség méréséhez a mérőműszeren át kell folynia a mérendő áramnak, ezért sorosan kötjük be."},
  '16':{tipus:"IAP mérföldkő",kerdes:"Egy működő áramkör dokumentálásakor mi a legfontosabb?",valaszok:["Csak az, hogy emlékezzünk rá.", "A rajz, mért értékek és következtetések egyértelmű rögzítése.", "Csak egy fénykép.", "A vezetékek színének felsorolása."],helyes:1,magyarazat:"A szakmai dokumentáció akkor jó, ha más is reprodukálni és ellenőrizni tudja a munkát."},
  '17':{tipus:"Mágnesesség",kerdes:"Mi jön létre áramjárta vezető körül?",valaszok:["Csak hő.", "Mágneses tér.", "Vákuum.", "Mechanikai rövidzár."],helyes:1,magyarazat:"Az elektromos áram mágneses teret hoz létre a vezető környezetében."},
  '18':{tipus:"Elektromágnes",kerdes:"Mivel növelhető egy tekercs elektromágneses hatása?",valaszok:["Az áram megszüntetésével.", "Megfelelő vasmag alkalmazásával és a gerjesztés növelésével.", "A vezeték elvágásával.", "A tekercs rövidre zárásával."],helyes:1,magyarazat:"A vasmag és a megfelelő gerjesztés erősíti az elektromágnes mágneses hatását."},
  '19':{tipus:"Indukció",kerdes:"Mikor indukálódhat feszültség egy vezetőben?",valaszok:["Ha változik a vezetőt érő mágneses fluxus.", "Csak ha a vezető műanyag.", "Ha nincs mágneses tér.", "Kizárólag egyenáramú ellenálláson."],helyes:0,magyarazat:"Az elektromágneses indukció alapja a mágneses fluxus változása."},
  '20':{tipus:"Összefoglaló",kerdes:"Melyik jelenség kapcsolja össze közvetlenül a villamosságot és a mágnesességet?",valaszok:["Elektromágneses indukció.", "Hőtágulás.", "Párolgás.", "Súrlódás."],helyes:0,magyarazat:"Az elektromágneses indukció a villamos és mágneses jelenségek egyik alapvető kapcsolata."},
  '21':{tipus:"Relé",kerdes:"Mi a relé egyik alapvető előnye?",valaszok:["Kis vezérlőjellel másik áramkört tud kapcsolni.", "Mindig növeli a hálózati feszültséget.", "Csak mechanikai szerkezetekhez használható.", "Nem tartalmaz érintkezőket."],helyes:0,magyarazat:"A relé vezérlő- és kapcsolt áramköre lehet egymástól elkülönített, és kis vezérlőteljesítménnyel kapcsolhat terhelést."},
  '22':{tipus:"Kapcsolástechnika",kerdes:"Egy relé NO érintkezője mikor zár?",valaszok:["Alaphelyzetben mindig.", "A relé megfelelő meghúzásakor.", "Csak áramszünetkor.", "Soha."],helyes:1,magyarazat:"Az NO, vagyis alaphelyzetben nyitott érintkező a relé működtetésekor zár."},
  '23':{tipus:"Villamos gép",kerdes:"Mi a villamos motor alapvető energiaátalakítása?",valaszok:["Mechanikai → villamos.", "Villamos → mechanikai.", "Hő → vegyi.", "Fény → mechanikai."],helyes:1,magyarazat:"A villamos motor villamos energiából mechanikai energiát állít elő."},
  '24':{tipus:"Generátor",kerdes:"Mi a generátor alapvető energiaátalakítása?",valaszok:["Mechanikai → villamos.", "Villamos → mechanikai.", "Villamos → kizárólag hő.", "Vegyi → fény."],helyes:0,magyarazat:"A generátor mechanikai energiát alakít villamos energiává."},
  '25':{tipus:"Biztonság",kerdes:"Mi a védővezető (PE) elsődleges szerepe?",valaszok:["Normál üzemi áram vezetése.", "Érintésvédelmi biztonság növelése hiba esetén.", "A fogyasztó teljesítményének növelése.", "A frekvencia beállítása."],helyes:1,magyarazat:"A PE vezető a hibavédelem fontos része; hiba esetén segíti a veszélyes érintési feszültség elleni védelmet."},
  '26':{tipus:"Védelem",kerdes:"Mi a túláramvédelem feladata?",valaszok:["A túl nagy áram káros hatásainak korlátozása.", "A feszültség állandó növelése.", "A védővezető kikapcsolása.", "A fogyasztó gyorsítása."],helyes:0,magyarazat:"A túláramvédelem túlterhelés vagy zárlat esetén védi a vezetéket és a berendezést."},
  '27':{tipus:"Zárlat",kerdes:"Mi jellemző egy zárlatra?",valaszok:["A szokásosnál nagyon nagy áram alakulhat ki.", "Az áram mindig nulla.", "A biztosító feladata megszűnik.", "A vezeték biztosan hidegebb lesz."],helyes:0,magyarazat:"Kis impedanciájú hibás áramút esetén nagy zárlati áram folyhat, ezért gyors védelem szükséges."},
  '28':{tipus:"Védelmi döntés",kerdes:"Miért nem helyettesíti egymást minden esetben a túláramvédelem és az áram-védőkapcsoló?",valaszok:["Mert eltérő hibajelenségekre és védelmi feladatokra szolgálnak.", "Mert ugyanaz az eszköz két neve.", "Mert egyik sem kapcsol le.", "Csak a készülék színe különbözik."],helyes:0,magyarazat:"A túláramvédelem és az áram-védőkapcsoló eltérő veszélyek érzékelésére szolgál, ezért egymást kiegészíthetik."},
  '29':{tipus:"Érintésvédelem",kerdes:"Egy fémházas készülék burkolata hiba miatt feszültség alá kerül. Mi a cél?",valaszok:["A veszélyes állapot gyors megszüntetése.", "A burkolat feszültségének növelése.", "A védővezető eltávolítása.", "A hiba figyelmen kívül hagyása."],helyes:0,magyarazat:"A hibavédelem célja, hogy veszélyes érintési helyzetben a védelem megfelelően és gyorsan működjön."},
  '30':{tipus:"Áram-védőkapcsoló",kerdes:"Mit figyel egy áram-védőkapcsoló működésének alapelve szerint?",valaszok:["A be- és kifolyó áramok különbségét.", "Csak a hálózati feszültség színét.", "A motor fordulatszámát.", "A vezeték hosszát."],helyes:0,magyarazat:"Az RCD a vezetők áramainak egyensúlyát figyeli; hibaáram esetén különbség jelenhet meg."},
  '31':{tipus:"Biztonsági döntés",kerdes:"Feszültségmentesnek gondolt áramkörön dolgoznál. Mi kell a munka előtt?",valaszok:["A feszültségmentes állapot megfelelő ellenőrzése.", "Elég, ha a lámpa nem világít.", "Elég a kapcsoló OFF állása.", "Csak egy fénykép a kapcsolóról."],helyes:0,magyarazat:"A feszültségmentességet nem feltételezzük, hanem megfelelő eljárással ellenőrizzük."},
  '32':{tipus:"Hibakereső",kerdes:"Egy 24 V-os jelzőlámpa nem világít. A tápegységen 24 V mérhető. Mi legyen a következő logikus lépés?",valaszok:["A teljes rendszert kicserélni.", "A táp és a lámpa közötti áramút mérési pontjait vizsgálni.", "A mérőműszert félretenni.", "A feszültséget találomra növelni."],helyes:1,magyarazat:"A hibakeresés logikus szűkítés: ismert jó ponttól haladunk a hiba felé mérésekkel."},
  '33':{tipus:"Méréses hibakeresés",kerdes:"P1-en és P2-n 24 V, P3-tól 0 V mérhető. Hol keresnéd a hibát?",valaszok:["P2 és P3 között.", "A tápegység előtt.", "Biztosan a lámpában.", "Sehol, ez normális."],helyes:0,magyarazat:"A mérési eredmény ott változik meg, ahol a hibás szakasz valószínűsíthető: P2 és P3 között."},
  '34':{tipus:"Tervezés",kerdes:"Mi legyen egy egyszerű villamos rendszer tervezésének első lépése?",valaszok:["A vezetékek találomra bekötése.", "A feladat és a követelmények pontos meghatározása.", "Azonnali feszültség alá helyezés.", "A rajz kihagyása."],helyes:1,magyarazat:"A jó tervezés a feladat és követelmények tisztázásával kezdődik, csak ezután jön a rajz és az eszközválasztás."},
  '35':{tipus:"IAP szakmai kihívás",kerdes:"S1 működteti a lámpát, S2 nem. A két NO nyomógomb párhuzamos. Mi a legjobb első következtetés?",valaszok:["A tápegység biztosan rossz.", "A H1 lámpa biztosan rossz.", "Az S2 ágában kell keresni a hibát.", "Mindkét nyomógomb hibás."],helyes:2,magyarazat:"Mivel S1-ről a lámpa működik, a közös táplálás és H1 valószínűleg jó; a hibát az S2 ágára lehet szűkíteni."},
  '36':{tipus:"Év végi mestervizsga",kerdes:"Egy ismeretlen hibás áramkörhöz érkezel. Melyik gondolkodási sorrend a legszakmaibb?",valaszok:["Találgatás → alkatrészcsere → mérés.", "Megfigyelés → biztonság → rajzértelmezés → mérés → következtetés → ellenőrzés.", "Feszültségnövelés → próba → találgatás.", "Mindent egyszerre kicserélni."],helyes:1,magyarazat:"A tudatos szakmai hibakeresés biztonságos, mérésen alapuló és ellenőrizhető folyamat."}
};

const CSS=`
.iap-kihivas{margin-top:14px;border:1px solid #b7dcf4;border-radius:14px;background:linear-gradient(135deg,#f7fbff,#eef8ff);overflow:hidden;box-shadow:0 7px 20px rgba(13,71,161,.08)}
.iap-kihivas-fej{display:flex;align-items:center;gap:10px;padding:12px 14px;background:linear-gradient(135deg,#0d47a1,#1976d2);color:#fff}
.iap-kihivas-fej b{font-size:14px;letter-spacing:.04em}.iap-kihivas-fej span{margin-left:auto;font-size:12px;opacity:.9}
.iap-kihivas-belso{padding:14px}.iap-kihivas-kerdes{font-weight:800;line-height:1.45;color:#12304e;margin-bottom:11px}
.iap-kihivas-valaszok{display:grid;gap:8px}.iap-kihivas-valasz{border:1px solid #cbddeb;background:#fff;border-radius:10px;padding:10px 12px;text-align:left;cursor:pointer;color:#183a59;font-weight:600;transition:.15s}
.iap-kihivas-valasz:hover{border-color:#1976d2;transform:translateY(-1px)}
.iap-kihivas-valasz.helyes{background:#e8f7ee;border-color:#2e9b58;color:#176b36}.iap-kihivas-valasz.hibas{background:#fff0ef;border-color:#cf5a50;color:#8e2d27}
.iap-kihivas-vissza{display:none;margin-top:11px;padding:11px 12px;border-radius:10px;line-height:1.45;font-size:14px}.iap-kihivas-vissza.show{display:block}.iap-kihivas-vissza.ok{background:#e8f7ee;color:#176b36}.iap-kihivas-vissza.bad{background:#fff5e8;color:#8a5a00}
.iap-kihivas-pont{margin-top:9px;font-size:12px;color:#5d7186;font-weight:700}
`;

function addStyle(){if(document.getElementById('iap-kihivas-style'))return;const s=document.createElement('style');s.id='iap-kihivas-style';s.textContent=CSS;document.head.appendChild(s)}
function normWeek(t){const m=String(t||'').match(/\d+/);return m?String(parseInt(m[0],10)).padStart(2,'0'):null}
function keyFor(w){return `iap-kihivas-villamos9-${w}`}
function render(card,w,k){
  const wrap=document.createElement('div');wrap.className='iap-kihivas';
  wrap.innerHTML=`<div class="iap-kihivas-fej"><b>⚡ IAP HETI KIHÍVÁS</b><span>${k.tipus}</span></div><div class="iap-kihivas-belso"><div class="iap-kihivas-kerdes">${k.kerdes}</div><div class="iap-kihivas-valaszok"></div><div class="iap-kihivas-vissza"></div><div class="iap-kihivas-pont"></div></div>`;
  const box=wrap.querySelector('.iap-kihivas-valaszok'),fb=wrap.querySelector('.iap-kihivas-vissza'),pt=wrap.querySelector('.iap-kihivas-pont');
  const saved=localStorage.getItem(keyFor(w));
  k.valaszok.forEach((txt,i)=>{const b=document.createElement('button');b.type='button';b.className='iap-kihivas-valasz';b.textContent=String.fromCharCode(65+i)+') '+txt;b.addEventListener('click',()=>answer(i));box.appendChild(b)});
  function answer(i){
    [...box.children].forEach(x=>x.disabled=true);
    const ok=i===k.helyes;box.children[k.helyes].classList.add('helyes');if(!ok)box.children[i].classList.add('hibas');
    fb.className='iap-kihivas-vissza show '+(ok?'ok':'bad');fb.innerHTML=(ok?'✅ <strong>Helyes.</strong> ':'💡 <strong>Még nem.</strong> ')+k.magyarazat;
    localStorage.setItem(keyFor(w),ok?'1':'0');pt.textContent=ok?'Teljesítve ✓':'Próbáld újra később – a gondolkodás a lényeg.';
  }
  if(saved==='1'){answer(k.helyes)}
  card.querySelector('.het-tartalom')?.appendChild(wrap);
}
function init(){
  if(!/villamos9\.html(?:$|[?#])/i.test(location.pathname+location.search+location.hash) && !document.title.includes('9. évfolyam'))return;
  addStyle();
  document.querySelectorAll('.het').forEach(card=>{const w=normWeek(card.querySelector('.het-szam')?.textContent);if(w&&KIHIVASOK[w])render(card,w,KIHIVASOK[w])});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
