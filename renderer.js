const max_btn=document.querySelector('.titlebar .max');
const min_btn=document.querySelector('.titlebar .min');
if(max_btn){max_btn.addEventListener('click',()=>{eAPI.maximize()})}
if(min_btn){min_btn.addEventListener('click',()=>{eAPI.minimize()})}