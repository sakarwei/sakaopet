// 统计时长
spend_with_pet=parseFloat(localStorage.getItem("spend_with_pet"));
if(spend_with_pet==null||isNaN(spend_with_pet)){
	spend_with_pet=0;
	localStorage.setItem("spend_with_pet",0);
}
function spend_w_p(){
	spend_with_pet=spend_with_pet+0.5;
	localStorage.setItem("spend_with_pet",spend_with_pet);
	setTimeout("spend_w_p();",1800000);
}
setTimeout("spend_w_p();",1800000);