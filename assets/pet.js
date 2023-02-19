/*==【基础】==*/
function $(t){return document.querySelector(t);}
function 随机数(小,大){
  return parseInt(Math.random()*(大-小+1)+小,10);
}
function about(){
  window.open("about.html");
}
function help(){
  window.open("help.html");
}
function info(){
  window.open('info.html');
}
function petload(target){ // 加载宠物形象
  $("#pet").src=target;
}
/*==【行为】==*/
function popup(content,close_button="关闭"){ // 讲话气泡开启（content为内容）
  petmenu_close();psiquery_close();
  try{clearTimeout(timer)}catch{};
  $("#pop").style.display="block";
  $("#pop_content").innerText=content;
  $("#pop_close").innerText=close_button;
  timer=setTimeout("popup_close()",conf.popup_delay);
}
function popup_close(){ // 讲话气泡关闭
  $("#pop").style.display="none";
  $("#pop_content").innerText=` `;
}
var resize_stat=false; // 显示窗口边界框
function rs(){ // 改变大小
  if(!resize_stat){
    $("html").style.border="2px dashed #f00";
    $("html").style.background="#f003";
    $("#rs").style.display="block";
    resize_stat=true;
    window.eAPI.resize(true);
  }
  else{
    $("html").style.border="none";
    $("html").style.background="transparent";
    $("#rs").style.display="none";
    resize_stat=false;
    window.eAPI.resize(false);
  }
}
/*==【菜单】==*/
function petmenu(){ // 宠物菜单
  if($("#menu").style.display=="block"){
    $("#menu").style.display="none";
  }
  else{
    popup_close();
    psiquery_close();
    $("#menu").style.display="block";
  }
}
function petmenu_close(){ // 宠物菜单关闭
  $("#menu").style.display="none";
}
function petmenu_load(cfg){ // 加载宠物菜单
  $('#menu').innerHTML="";
  try{
    for(var a=0;a<cfg.length;a++){
      var item=document.createElement("button");
      item.onclick=new Function(cfg[a].exec);
      item.innerText=cfg[a].label;
      $('#menu').appendChild(item);
    }
  }
  catch(e){alert('菜单配置出错：\n'+e);}
}
/*=【按钮】=*/
function petbtn_load(cfg){
  $('#toolbar').innerHTML="";
  try{
    for(var a=0;a<cfg.length;a++){
      var item=document.createElement("img");
      if(cfg[a].img){item.src=cfg[a].img;}
      if(cfg[a].label){item.title=cfg[a].label;}
      if(cfg[a].id){item.id=cfg[a].id;}
      if(cfg[a].exec){item.onclick=new Function(cfg[a].exec);}
      if(cfg[a].dblexec){item.ondblclick=new Function(cfg[a].dblexec);}
      if(cfg[a].rexec){item.oncontextmenu=new Function(cfg[a].rexec);}
      $('#toolbar').appendChild(item);
    }
  }
  catch(e){alert('按钮配置出错：\n'+e);}
}
function zoomIn(){window.eAPI.zoomIn();}
function zoomOut(){window.eAPI.zoomOut();}
function zoomReset(){window.eAPI.zoomReset();}

/*==【加载插件】==*/
function loadjs(src){
  var x=document.createElement('script');
  x.src="plugins/"+src;
  $("#_loadjs").appendChild(x);
}