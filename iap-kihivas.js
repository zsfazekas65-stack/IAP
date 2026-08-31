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
  }
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
