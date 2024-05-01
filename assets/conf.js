conf={
	petconf:"conf.js",
	petroot:"demo",
	popup_delay:10000,
	自动说话延时:30000,
	特殊形象固定时长:8000,
	plugins:[ // 宠物界面插件
		"achievements/achievements",
		"status",
		"count",
	],
	win_plugins:[ // 信息界面的插件
		"achievements/achievements",
	],
	stat:{
		心情值预设值: 1000,
		心情值减少延迟: 1200000, // 20 分钟
		心情值减少值: 100,
		心情值增加值: 100,
		清洁值预设值: 1000,
		清洁值减少延迟: 1200000, // 20 分钟
		清洁值减少值: 100,
		清洁值增加值: 1000,
		饥饿值预设值: 1000,
		饥饿值减少延迟: 1800000, // 30 分钟
		饥饿值减少值: 100,
		饥饿值增加值: 100,
		更新延时: 10000
	}
};
config_pet_button=[ // 宠物按钮配置
	{label:"拖拽移动",id:"move",img:"ui/move.png"}, // 建议保留ID，否则窗口很难移动。
	{label:"调整大小",id:"resize",img:"ui/resize.png",exec:"rs();"},
	{label:"菜单",id:"petmenu",img:"ui/menu.png",exec:"petmenu();"},
	{label:"宠物状态信息",id:"about",img:"ui/about.png",exec:"window.open('winframe.html?target=info');"},
	{label:"重新加载",id:"refresh",img:"ui/reload.png",exec:"location.reload();"},
	{label:"隐藏宠物",id:"minimize",img:"ui/minimize.png",exec:"window.eAPI.minimize();"},
	{label:"退出软件",id:"close",img:"ui/close.png",exec:"window.close();"}
	
	// {label:"【须要显示的文本】",img:"【图标路径】",exec:"【点击后执行的 JS 代码】",dblexec:"【双击后运行的 JS 代码】",Rexec:"【右键点击运行的 JS 代码】"},
]

config_win_default="about.html"
config_win_tabs=[ // 软件窗口左侧显示的标签页
	{label:"宠物信息",id:"pet_info",exec:"$('iframe').src='info.html'"},
]

/*==【鼠标行为】==*/
function pet_click(isauto=false){ // 点击
	var target=随机数(0,(dict.length-1));
	popup(dict[target]);
	if(isauto==false){
		pet_click_count++;
		localStorage.setItem("pet_click_count",pet_click_count);
		if(pet.imgs.click){petload(pet.imgs.click);}
	}
	else{setTimeout("pet_click(true);",conf.自动说话延时);}
}
function pet_hover(){ // 鼠标进入宠物界面
	petload(pet.imgs.hover);
}
function pet_leave(){ // 鼠标离开宠物界面
	petload(pet.imgs.default);
}
function pet_dblclick(){ // 鼠标双击宠物界面
	// 点击次数不统计双击↓
	 pet_click_count=pet_click_count-2;
	 localStorage.setItem("pet_click_count",pet_click_count);
}
function pet_Rclick(e){ // 鼠标右键宠物界面
	e.preventDefault(); // 谨慎删除
	petmenu(); // 默认是弹出宠物菜单
}
/*==【自定义函数区】==*/
function pet_info(){
	window.open("winframe.html?target=info");
}
function isbirthday(){
	try{
		var birthday=new Date(pet.master_birthday);
		var today=new Date();
		var birthday_str=(birthday.getMonth()+1)+'/'+birthday.getDate();
		var today_str=(today.getMonth()+1)+'/'+today.getDate();
		if(birthday_str==today_str){
			if(!pet.master){pet.master="你"}
			popup("今天是"+birthday_str.replace('/','月')+'日'+"，"+"你的生日！祝你生日快乐，"+pet.master+"！","谢谢");
		}
	}catch{}
}
/*==【预加载】==*/
var pet_click_count=parseFloat(localStorage.getItem("pet_click_count"));
if(pet_click_count==null||isNaN(pet_click_count)){
	pet_click_count=0;
	localStorage.setItem("pet_click_count",0);
}
function pet_preload(){ // 预加载
	petmenu_load(config_petmenu); // 加载宠物菜单
	petitems_load(config_petitems); // 加载宠物拖拽物品菜单
	petbtn_load(config_pet_button); // 加载按钮
	petload(pet.imgs.default); // 加载宠物
	isbirthday();
	// ↓ 添加鼠标动作响应，小心修改
	$("#pet").addEventListener("click",new Function(`pet_click();`));
	$("#pet").addEventListener("pointerenter",new Function(`pet_hover();`));
	$("#pet").addEventListener("pointerleave",new Function(`pet_leave();`));
	$("#pet").addEventListener("contextmenu",new Function(`e`,`pet_Rclick(e);`));
	$("#pet").addEventListener("dblclick",new Function(`pet_dblclick();`));
	// ↓ 定时运行部分
	pet_click(true);
	swp=setTimeout("spend_w_p();",1800000);
	pac=setTimeout("pet_click(true);",180000);
}
