(()=>{
function schoolWeek(d=new Date()){
  const start=new Date(2026,8,1,12),end=new Date(2027,5,15,12);
  const breaks=[[new Date(2026,9,23,12),new Date(2026,10,1,12)],[new Date(2026,11,19,12),new Date(2027,0,3,12)],[new Date(2027,2,25,12),new Date(2027,3,4,12)]];
  if(d<start)return 1;if(d>end)return 36;
  const norm=x=>new Date(x.getFullYear(),x.getMonth(),x.getDate(),12),mon=x=>{x=norm(x);const n=x.getDay();x.setDate(x.getDate()-(n===0?6:n-1));return x};
  const hasTeaching=m=>{for(let i=0;i<5;i++){const x=new Date(m);x.setDate(x.getDate()+i);if(x>=start&&x<=end&&!breaks.some(([a,b])=>x>=a&&x<=b))return true}return false};
  const target=mon(d);let cur=mon(start),n=0;
  while(cur<=target){if(hasTeaching(cur))n++;if(cur.getTime()===target.getTime())return Math.max(1,Math.min(36,n));cur.setDate(cur.getDate()+7)}
  return 1;
}
function style(){if(document.getElementById('iap-felnott-now-style'))return;const s=document.createElement('style');s.id='iap-felnott-now-style';s.textContent='.het{position:relative}.het.aktualis{margin:12px 0;padding-top:42px!important;background:linear-gradient(135deg,#e8f3ff,#f8fbff)!important;border:2px solid #1976d2!important;border-radius:14px!important;box-shadow:0 10px 28px #1976d22b!important}.het.aktualis::before{content:"●  AKTUÁLIS HÉT";position:absolute;top:10px;left:88px;padding:5px 12px;border-radius:999px;background:#1976d2;color:#fff;font-size:.78rem;font-weight:800;z-index:10}.iap-aktualis-vissza{position:fixed;right:22px;bottom:22px;z-index:9999;padding:12px 16px;border-radius:999px;background:#0d71b9;color:#fff!important;text-decoration:none!important;font-weight:800}';document.head.appendChild(s)}
function init(){style();const w=schoolWeek();document.querySelectorAll('.het').forEach(h=>h.classList.remove('aktualis'));document.querySelectorAll('.iap-aktualis-vissza').forEach(x=>x.remove());const target=document.getElementById('het'+w)||document.getElementById('het-'+w)||[...document.querySelectorAll('.het')].find(h=>parseInt(h.querySelector('.het-szam')?.textContent||'',10)===w);if(target){target.classList.add('aktualis');if(!target.id)target.id='het'+w;const a=document.createElement('a');a.className='iap-aktualis-vissza';a.href='#'+target.id;a.innerHTML='↘ Aktuális hét <strong>'+w+'.</strong>';document.body.appendChild(a)}}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();window.addEventListener('pageshow',init);
})();