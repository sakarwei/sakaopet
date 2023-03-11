function GetQueryString(require){var reg=new RegExp("(^|&)"+require+"=([^&]*)(&|$)","i");var r=window.location.search.substr(1).match(reg);if (r!=null){return (r[2]);}return null;}
function $(t){return document.querySelector(t)}
target=GetQueryString("target");
if(target){
  $('iframe').src=target+".html";
}else{
  if(config_win_default){
    $('iframe').src=config_win_default;
  }
}
if(config_win_tabs){
  try{
    for(var a=0;a<config_win_tabs.length;a++){
      var btn=document.createElement('button');
      btn.id=config_win_tabs[a].id;
      btn.innerText=config_win_tabs[a].label;
      // btn.onclick=new Function('$("text#title").innerText="'+config_win_tabs[a].label+'";'+config_win_tabs[a].exec);
      btn.onclick=new Function(`$("text#title").innerText="${config_win_tabs[a].label}";`+config_win_tabs[a].exec);
      $('div#tabs').appendChild(btn);
    }
  }catch{}
}