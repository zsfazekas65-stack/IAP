/* IAP – központi aktuális hét jelző, 2026/2027 */
(function(){
'use strict';

function sajatAktualisHet(ma=new Date()){
  const naptar={
    elso:'2026-09-01',
    utolso:'2027-06-15',
    szunetek:[['2026-10-23','2026-11-01'],['2026-12-19','2027-01-03'],['2027-03-25','2027-04-04']],
    maxHet:36
  };
  const datum=s=>{const [y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d,12,0,0)};
  const nap=d=>new Date(d.getFullYear(),d.getMonth(),d.getDate(),12,0,0);
  const hetfo=d=>{const x=nap(d),w=x.getDay();x.setDate(x.getDate()-(w===0?6:w-1));return x};
  const szunetben=d=>naptar.szunetek.some(([a,b])=>d>=datum(a)&&d<=datum(b));
  const tanitasiHet=h=>{
    const e=datum(naptar.elso),u=datum(naptar.utolso);
    for(let i=0;i<5;i++){
      const d=new Date(h);d.setDate(d.getDate()+i);
      if(d>=e&&d<=u&&!szunetben(d))return true;
    }
    return false;
  };
  const e=datum(naptar.elso),u=datum(naptar.utolso),m=nap(ma);
  if(m<e||m>u)return null;
  const cel=hetfo(m);let h=hetfo(e),szam=0;
  while(h<=cel){
    if(tanitasiHet(h))szam++;
    if(h.getTime()===cel.getTime())return tanitasiHet(h)?Math.min(szam,naptar.maxHet):null;
    h.setDate(h.getDate()+7);
  }
  return null;
}

function aktualisHet(){
  try{
    if(typeof window.aktualisIAPHet==='function'){
      const w=window.aktualisIAPHet(new Date());
      if(w)return w;
    }
  }catch(e){}
  return sajatAktualisHet(new Date());
}

function stilus(){
  if(document.getElementById('iap-aktualis-het-fallback-style'))return;
  const s=document.createElement('style');
  s.id='iap-aktualis-het-fallback-style';
  s.textContent=`
.het{position:relative}
.het.aktualis,.het.aktualis-het{margin:12px 0;padding-top:42px!important;background:linear-gradient(135deg,#e8f3ff,#f8fbff)!important;border:2px solid #1976d2!important;border-radius:14px!important;box-shadow:0 10px 28px #1976d22b!important}
.het.aktualis::before,.het.aktualis-het::before{content:'●  AKTUÁLIS HÉT';position:absolute;top:10px;left:88px;padding:5px 12px;border-radius:999px;background:#1976d2;color:#fff;font-size:.78rem;font-weight:800;letter-spacing:.04em;z-index:10}
.het.aktualis .het-szam,.het.aktualis-het .het-szam{background:linear-gradient(135deg,#0d47a1,#2196f3)!important;box-shadow:0 5px 14px #1976d244!important}
.iap-aktualis-vissza{position:fixed;right:22px;bottom:22px;z-index:9999;display:inline-flex;align-items:center;gap:8px;padding:12px 16px;border-radius:999px;background:#0d71b9;color:#fff!important;text-decoration:none!important;font:800 14px/1.2 'Segoe UI',Arial,sans-serif;box-shadow:0 8px 24px #0d47a14d;transition:transform .15s ease,filter .15s ease,opacity .15s ease}
.iap-aktualis-vissza:hover{filter:brightness(1.08);transform:translateY(-1px)}
.iap-aktualis-vissza.iap-kozel{opacity:.32}
@media(max-width:650px){.het.aktualis::before,.het.aktualis-het::before{left:14px}.iap-aktualis-vissza{right:12px;bottom:12px;padding:11px 14px}}
`;
  document.head.appendChild(s);
}

function fut(){
  stilus();
  const w=aktualisHet();
  const hetek=[...document.querySelectorAll('.het')];
  if(!hetek.length||!w)return;

  hetek.forEach(h=>{
    h.classList.remove('aktualis','aktualis-het');
    const m=(h.querySelector('.het-szam')?.textContent||'').match(/\d+/);
    if(m)h.id='het-'+Number(m[0]);
  });

  const target=hetek.find(h=>{
    const m=(h.querySelector('.het-szam')?.textContent||'').match(/\d+/);
    return m&&Number(m[0])===w;
  });
  if(!target)return;

  target.classList.add('aktualis');
  target.id='het-'+w;

  let gomb=document.querySelector('.iap-aktualis-vissza');
  if(!gomb){
    gomb=document.createElement('a');
    gomb.className='iap-aktualis-vissza';
    document.body.appendChild(gomb);
  }
  gomb.href='#het-'+w;
  gomb.innerHTML='↘ Aktuális hét <strong>'+w+'.</strong>';
  gomb.setAttribute('aria-label','Ugrás az aktuális, '+w+'. hétre');
  gomb.onclick=function(e){
    e.preventDefault();
    history.replaceState(null,'','#het-'+w);
    target.scrollIntoView({behavior:'smooth',block:'center'});
  };

  if(!gomb.dataset.iapObserver){
    try{
      const obs=new IntersectionObserver(es=>gomb.classList.toggle('iap-kozel',es.some(x=>x.isIntersecting)),{threshold:.25});
      obs.observe(target);
      gomb.dataset.iapObserver='1';
    }catch(e){}
  }

  const hash=location.hash.match(/^#het-?(\d+)$/);
  if(hash&&Number(hash[1])===w)setTimeout(()=>target.scrollIntoView({behavior:'smooth',block:'center'}),100);
}

function indul(){
  fut();
  setTimeout(fut,50);
  setTimeout(fut,500);
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',indul);else indul();
window.addEventListener('pageshow',()=>setTimeout(fut,50));
document.addEventListener('visibilitychange',()=>{if(!document.hidden)fut()});
})();