pet={ // 宠物配置
  name:"OPet", // 宠物名称
  birthday:"2020/3/1", // 宠物生日，显示宠物属性需要。
  imgs:{
    default:"pet/normal.svg", // 默认形象
    hover:"pet/smile.svg", // 鼠标放在宠物显示界面时的形象
    // 可以依据此格式继续添加自定义形象，触发方式要改 pet.js。
  }
};
conf={ // 程序配置
  popup_delay:3000, // 对话框延时
};
dict=[ // 点击宠物会讲的话
  "HI！",
  "你好！"
];

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
function pointer_click(){ // 鼠标点击宠物界面

}
function pointer_dblclick(){ // 鼠标双击宠物界面

}
function pointer_Rclick(){ // 鼠标右键宠物界面

}