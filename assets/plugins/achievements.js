/* SakaPet 配套成就系统 */
var pet_achievements=JSON.parse(localStorage.getItem("pet_achievements"));
if(pet_achievements==null){ // 初始化→创建已获得的成就信息记录表
	pet_achievements=[];
	localStorage.setItem("pet_achievements",JSON.stringify(pet_achievements));
}
function getTime(){ // 获取时间
	var date=new Date();
	return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
}
function get_achievement(id,time){ // 赋予成就信息
	if(localStorage.getItem("pet_achievements").match(id)){return;}
	pet_achievements[pet_achievements.length]={"id":id,"t":time};
	localStorage.setItem("pet_achievements",JSON.stringify(pet_achievements));
	// console.log("获得成就："+id);
}
function Aquery_open(){ // 打开成就窗口
	window.open("plugins/achievements/index.html");
}

function check(){ // 成就检查
	var pet_click_count=parseFloat(localStorage.getItem("pet_click_count"));
	if(pet_click_count>=100){
		get_achievement("oisakapet_friendboat",getTime());
	}
	if(pet_click_count>=10000){
		get_achievement("oisakapet_friendship",getTime());
	}

	var date=new Date();
	if(date.getHours()<6&&date.getHours()>=1){ // 当地时间凌晨一点（含）到六点（不含）
		get_achievement("oisakapet_stay_up_late",getTime());
	}
	var master_birthday=new Date(pet.master_birthday) // 主人生日
	if(date.getMonth()==master_birthday.getMonth()&&date.getDate()==master_birthday.getDate()){
		get_achievement("oisakapet_happy_birthday",getTime());
	}

	var spent_w_p=parseFloat(localStorage.getItem("spend_with_pet"));
	if(spent_w_p>=24){
		get_achievement("oisakapet_owner_at_first",getTime());
	}
	if(spent_w_p>=8760){
		get_achievement("oisakapet_life_together",getTime());
	}
}

if($('div#petdiv')){
	try{ 
// 		// 每点击一次就检查一次
		$('img#pet').addEventListener("click",check);
	}catch(e){
		// console.log(e);
	}
}

check()
// 每次打开检查一次。