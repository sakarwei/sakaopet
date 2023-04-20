/*
OPet 配套成就系统
*/
var pet_achievements=JSON.parse(localStorage.getItem("pet_achievements"));
if(pet_achievements==null){
  pet_achievements=[];
  localStorage.setItem("pet_achievements",JSON.stringify(pet_achievements));
}
function getTime(){ // 获取时间
  var date=new Date();
  return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
}
function get_achievements(name,time){ // 赋予成就信息
  pet_achievements[pet_achievements.length]={"n":name,"t":time};
  localStorage.setItem("pet_achievements",JSON.stringify(pet_achievements));
  console.log(pet_achievements);
}
function Aquery_open(){ // 打开成就窗口
  window.open("winframe.html?target=plugins/achievements/index");
}