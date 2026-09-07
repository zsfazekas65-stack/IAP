/* IAP – központi heti kihívás betöltő */
(()=>{
'use strict';
const oldal=(location.pathname.split('/').pop()||'').toLowerCase();
const felnott=/_felnott(?:_|\.)/.test(oldal)||oldal.includes('felnott');
const villamos9=oldal==='villamos9.html';
function indit(){
  if(villamos9&&document.querySelector('.iap-kihivas'))return;
  const run=()=>{
    if(!window.IAPKihivas)return;
    if(felnott){
      const data=window.IAPKihivas.fallbackData?.()||{};
      window.IAPKihivas.render?.('felnott-'+oldal.replace('.html',''),data);
    }else{
      window.IAPKihivas.autoInit?.();
    }
  };
  if(window.IAPKihivas){run();return;}
  if(document.querySelector('script[src*="iap-kihivas-motor.js"]')){setTimeout(run,120);return;}
  const s=document.createElement('script');
  s.src='iap-kihivas-motor.js?v=6';
  s.async=false;
  s.onload=run;
  document.body.appendChild(s);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',indit);else indit();
window.addEventListener('pageshow',()=>setTimeout(indit,80));
})();