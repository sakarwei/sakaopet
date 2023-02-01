pet={ // 宠物配置
  name:"OPet", // 宠物名称
  birthday:"2020/3/1", // 宠物生日，显示宠物属性需要。
  imgs:{
    default:"pet/normal.svg", // 默认形象（不管他、不逗他、不放鼠标他身上的时候）
    hover:"pet/smile.svg", // 鼠标放在宠物显示界面时的形象
    // 可以依据此格式继续添加自定义形象，触发方式要改下面。
  }
};
conf={ // 程序配置
  popup_delay:3000, // 对话框延时
};
dict=[ // 点击宠物会讲的话
  "HI！",
  "你好！"
];

function preload(){ // 预加载
  petload(pet.imgs.default);
  // ↓ 添加鼠标动作响应，小心修改
  $("#pet").addEventListener("click",new Function(`pet_click();`));
  $("#pet").addEventListener("pointerenter",new Function(`pet_hover();`));
  $("#pet").addEventListener("pointerleave",new Function(`pet_leave();`));
  $("#pet").addEventListener("contextmenu",new Function(`e`,`pet_Rclick(e);`));
  $("#pet").addEventListener("dblclick",new Function(`pet_dblclick();`));
}
function pet_click(){ // 点击
  var target=随机数(0,(dict.length-1));
  popup(dict[target]);
}
function pet_hover(){ // 鼠标进入宠物界面
  petload(pet.imgs.hover);
}
function pet_leave(){ // 鼠标离开宠物界面
  petload(pet.imgs.default);
}
function pet_dblclick(){ // 鼠标双击宠物界面
  // 没事做，要加自己加
}
function pet_Rclick(e){ // 鼠标右键宠物界面
  e.preventDefault(); // 谨慎删除
  petmenu();
}

/*==【通用函数功能区】==*/
function weather(){ // 天气，有技术没来源。
  // window.open("weather.html");
}