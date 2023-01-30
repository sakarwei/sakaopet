const app_info=`
关于 OPet V0.0.2 正在开发版本
项目地址：https://gitee.com/Jeun1358/opet
2023年1月30日更新
`
/*==【基础】==*/
function $(t){return document.querySelector(t);}
function 随机数(小,大){
  return parseInt(Math.random()*(大-小+1)+小,10);
}
function about(){
  // alert(app_info);
  window.open("about.html");
}
function help(){
  window.open("help.html");
}
function petload(target){ // 加载宠物形象
  $("#pet").src=target;
}
/*==【行为】==*/
function preload(){ // 预加载
  petload(pet.imgs.default);
}
function petclick(){ // 点击
  var target=随机数(0,(dict.length-1));
  popup(dict[target]);
}
function pointer_enter(){ // 鼠标进入宠物界面
  petload(pet.imgs.hover);
}
function pointer_leave(){ // 鼠标离开宠物界面
  petload(pet.imgs.default);
}
function popup(content){ // 讲话气泡开启（content为内容）
  petmenu_close();psi_close();
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
    window.eAPI.resize(true);
    resize_stat=true;
  }
  else{
    $("html").style.border="none";
    window.eAPI.resize(false);
    resize_stat=false;
  }
}
/*==【菜单】==*/
function petmenu(){ // 宠物菜单
  if($("#menu").style.display=="block"){
    $("#menu").style.display="none";
  }
  else{
    popup_close();
    psi_close();
    $("#menu").style.display="block";
  }
}
function petmenu_close(){ // 宠物菜单关闭
  $("#menu").style.display="none";
}

var menu={ // 宠物菜单操作
  yulu:new Function(`window.open('dictlist.html');petmenu();`),
  help:new Function(`help();petmenu_close();`),
}
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
      psi_close();
    }
    else{
      popup_close();
      petmenu_close();
      $("#psi").style.display="block";
    }
  }else{
    alert("依赖属性未设定！");
    psi_close();
  }
}
function psi_close(){
  $("#psi").style.display="none";
}
