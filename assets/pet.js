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
function yulu(){
  window.open("dictlist.html");
}
function petload(target){ // 加载宠物形象
  $("#pet").src=target;
}
/*==【行为】==*/
function popup(content){ // 讲话气泡开启（content为内容）
  petmenu_close();psiquery_close();
  try{clearTimeout(timer)}catch{};
  $("#pop").style.display="block";
  $("#pop").innerText=pet.name+"："+content;
  timer=setTimeout("popup_close()",conf.popup_delay);
}
function popup_close(){ // 讲话气泡关闭
  $("#pop").style.display="none";
  $("#pop").innerText=` `;
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
      $('#toolbar').appendChild(item);
    }
  }
  catch(e){alert('按钮配置出错：\n'+e);}
}
function zoomIn(){window.eAPI.zoomIn();}
function zoomOut(){window.eAPI.zoomOut();}
function zoomReset(){window.eAPI.zoomReset();}

/*==【PSI】==*/
function loadpsi(){ // 宠物属性加载（ 人体生物节律 拿来玩的 ）
  try{
    if(pet.birthday){ // 获取宠物生日信息（ conf.js 中调整）
      var birth=new Date(pet.birthday); 
      var today=new Date(); 
      var delta1=today.getTime()-birth.getTime(); 
      var delta2=delta1/(1000*3600*24);
      var toshow=delta2.toFixed(0);
      var pi=3.14159265;
      var P=(Math.sin(toshow*(2*pi)/23)*50)+50;
      var S=(Math.sin(toshow*(2*pi)/28)*50)+50;
      var I=(Math.sin(toshow*(2*pi)/33)*50)+50;
      $('#PSI_P').value=P;$('#PSI_T_P').innerText=parseInt(P);
      $('#PSI_S').value=S;$('#PSI_T_S').innerText=parseInt(S);
      $('#PSI_I').value=I;$('#PSI_T_I').innerText=parseInt(I);
      return true;
    }else{
      return false;
    }
  }catch{
    return false;
  }
}
function psiquery(){ // 玩家查宠物属性的入口
  if(loadpsi()){
    if($("#psi").style.display=="block"){
      psiquery_close();
    }
    else{
      popup_close();
      petmenu_close();
      $("#psi").style.display="block";
    }
  }else{
    alert("依赖属性未设定！");
    psiquery_close();
  }
}
function psiquery_close(){
  $("#psi").style.display="none";
}
