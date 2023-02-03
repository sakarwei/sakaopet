pet={ // 宠物配置
  name:"OPet", // 宠物名称
  birthday:"2020/3/1", // 宠物生日，显示宠物属性需要。
  master:"OPet Example", // 宠物对主人的称呼
  master_birthday:"2023/2/4", // 主人生日
  imgs:{
    default:"pet/normal.svg", // 默认形象（不管他、不逗他、不放鼠标他身上的时候）
    hover:"pet/smile.svg", // 鼠标放在宠物显示界面时的形象
    sleeping:"pet/sleeping.svg"
    // 可以依据此格式继续添加自定义形象，触发方式要改下面。
  }
};
config_petmenu=[ // 宠物菜单配置
  {label:"语录",exec:`yulu();petmenu_close();`},
  {label:"帮助",exec:`help();petmenu_close();`},
  {label:"睡觉/叫醒宠物",exec:`sleep();petmenu_close();`},
  {label:"宠物信息",exec:`pet_info();petmenu_close();`},
  {label:"关于此软件",exec:`about();petmenu_close();`},
  {label:"关闭菜单",exec:`petmenu_close();`},
]
// {label:"【须要显示的文本】",exec:"【点击后执行的 JS 代码】"},
// petmenu_close(); --> 关闭宠物菜单
conf={ // 程序配置
  popup_delay:3000, // 对话框延时
};
dict=[ // 点击宠物会讲的话
  "HI！",
  "你好！"
];
/*==【初始化】==*/
var isSleeping=false;
/*==【鼠标行为】==*/
function pet_click(){ // 点击
  if(isSleeping){return;} // 如果宠物在睡觉，不响应
  var target=随机数(0,(dict.length-1));
  popup(dict[target]);
  pet_click_count++;
  localStorage.setItem("pet_click_count",pet_click_count);
}
function pet_hover(){ // 鼠标进入宠物界面
  if(isSleeping){return;} // 如果宠物在睡觉，不响应
  petload(pet.imgs.hover);
}
function pet_leave(){ // 鼠标离开宠物界面
  if(isSleeping){return;} // 如果宠物在睡觉，不响应
  petload(pet.imgs.default);
}
function pet_dblclick(){ // 鼠标双击宠物界面
  // 点击次数不统计双击↓
   pet_click_count=pet_click_count-2;
   localStorage.setItem("pet_click_count",pet_click_count);
   if(isSleeping){sleep();} // 如果宠物在睡觉，叫醒宠物
}
function pet_Rclick(e){ // 鼠标右键宠物界面
  e.preventDefault(); // 谨慎删除
  petmenu(); // 默认是弹出宠物菜单
}
/*==【通用函数功能区】==*/
function sleep(){ // 睡觉
  if(isSleeping){petload(pet.imgs.default);isSleeping=false;}
  else{petload(pet.imgs.sleeping);isSleeping=true;}
}
function weather(){ // 天气，有技术没来源。
  // window.open("weather.html");
}
function pet_info(){
  window.open("info.html");
}
function isbirthday(){ // 判断今天是不是主人的生日。如果是的话，显示给主人的祝福消息。
  try{
    var birthday=new Date(pet.master_birthday);
    var today=new Date();
    var birthday_str=(birthday.getMonth()+1)+'/'+birthday.getDate();
    var today_str=(today.getMonth()+1)+'/'+today.getDate();
    if(birthday_str==today_str){
      if(!pet.master){pet.master="你"}
      popup("今天是"+birthday_str.replace('/','月')+'日'+"，"+"你的生日！祝你生日快乐，"+pet.master+"！");
    }
  }catch{}
}
/*==【预加载】==*/
var pet_click_count=localStorage.getItem("pet_click_count");
if(pet_click_count==null||isNaN(pet_click_count)){
  pet_click_count=0;
  localStorage.setItem("pet_click_count",0);
}
function preload(){ // 预加载
  petmenu_load(config_petmenu); // 加载宠物菜单
  petload(pet.imgs.default); // 加载宠物
  isbirthday();
  // ↓ 添加鼠标动作响应，小心修改
  $("#pet").addEventListener("click",new Function(`pet_click();`));
  $("#pet").addEventListener("pointerenter",new Function(`pet_hover();`));
  $("#pet").addEventListener("pointerleave",new Function(`pet_leave();`));
  $("#pet").addEventListener("contextmenu",new Function(`e`,`pet_Rclick(e);`));
  $("#pet").addEventListener("dblclick",new Function(`pet_dblclick();`));
}