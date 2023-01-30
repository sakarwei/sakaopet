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
