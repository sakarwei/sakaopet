pet={
	name:"DEMO",
	birthday:"2024/4/20",
	master: "Admin",
	master_birthday: "2023/2/1",
	imgs:{
		default:"normal.svg",
		hover:"smile.svg",
		click:"smile.svg",
		click:"sleeping.svg",
	}
};
dict_eating=[
	"众所周知，美食可以改善心情。",
	"好吃好吃！"
]
dict_shower=[
	"我爱洗澡皮肤好好～",
	"全身都干净啦！"
]
dict=[
	"你好",
	{content:"很高兴认识你",button:"我也是！"},
];
config_petitems=[]
config_petmenu=[
	{label:"宠物信息",exec:new Function(`pet_info();petmenu_close();`)},
	{label:"关于此软件",exec:new Function(`about();petmenu_close();`)},
]
// 以下内容不建议非专业人员修改。
if($("img#pet")){pet_preload();}else{winframe_preload();}