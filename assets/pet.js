/*==【基础】==*/
facelocked=false;
dragged_id=null;
function $(t){return document.querySelector(t);}
function 随机数(小,大){
	return parseInt(Math.random()*(大-小+1)+小,10);
}
function about(){
	window.open("winframe.html?target=about");
}
function help(){
	window.open("winframe.html?target=help");
}
function info(){
	window.open("winframe.html?target=info");
}
function petload(target){ // 加载宠物形象
	if(facelocked){return;}
	$("#pet").src=target;
}
/*==【行为】==*/
function popup(content){ // 讲话气泡开启（content为内容）
	petmenu_close();
	try{clearTimeout(timer)}catch{};
	$("#pop").style.display="block";
	if(typeof(content)=="object"){
		if(content.content){$("#pop_content").innerText=content.content;}
		if(content.button){$("#pop_close").innerText=content.button;}else{$("#pop_close").innerText="关闭";}
		if(content.img){petload(content.img);facelocked=true;setTimeout("facelocked=false;petload(pet.imgs.default);",conf.特殊形象固定时长);}
	}
	else{
		$("#pop_content").innerText=content;
		$("#pop_close").innerText="关闭";
	}
	timer=setTimeout("popup_close()",conf.popup_delay);
}
function popup_close(){ // 讲话气泡关闭
	$("#pop").style.display="none";
	$("#pop_content").innerText=` `;
}
var resize_stat=false; // 显示窗口边界框
function rs(){ // 改变大小
	if(!resize_stat){
		$("html").style.border="2px dashed #f00";
		$("html").style.background="#f003";
		$("#rs").style.display="block";
		resize_stat=true;
		window.eAPI.resize(true);
	}
	else{
		$("html").style.border="none";
		$("html").style.background="transparent";
		$("#rs").style.display="none";
		resize_stat=false;
		window.eAPI.resize(false);
	}
}
/*==【菜单】==*/
function petmenu(){ // 宠物菜单
	if($("#menu").style.display=="block"){
		$("#menu").style.display="none";
	}
	else{
		popup_close();
		$("#menu").style.display="block";
	}
}
function petmenu_close(){ // 宠物菜单关闭
	$("#menu").style.display="none";
}
function petmenu_load(cfg){ // 加载宠物菜单
	$('#menu').innerHTML="";
	try{
		for(var a=0;a<cfg.length;a++){
			var item=document.createElement("button");
			item.onclick=new Function(cfg[a].exec);
			item.innerText=cfg[a].label;
			$('#menu').appendChild(item);
		}
	}
	catch(e){alert('菜单配置出错：\n'+e);}
}
function petitems_load(cfg){ // 加载宠物物品菜单
	$('#items').innerHTML="";
	try{
		for(var a=0;a<cfg.length;a++){
			var item=document.createElement("img");
			item.draggable=true;
			item.src=cfg[a].src;
			item.alt=cfg[a].label;
			item.onclick=cfg[a].exec;
			item.setAttribute("drag_id",a);
			$('#items').appendChild(item);
			item.ondragstart=function(e){setDrag(e.target.attributes["drag_id"].value);}
			console.log(item)
		}
	}
	catch(e){alert('物品菜单配置出错：\n'+e);}
}
function setDrag(id){
	if(id){dragged_id=id;}
	else{dragged_id=null;}
	console.log(dragged_id)
}
/*=【按钮】=*/
function petbtn_load(cfg){
	$('#toolbar').innerHTML="";
	try{
		for(var a=0;a<cfg.length;a++){
			var item=document.createElement("img");
			if(cfg[a].img){item.src=cfg[a].img;}
			if(cfg[a].label){item.title=cfg[a].label;}
			if(cfg[a].id){item.id=cfg[a].id;}
			if(cfg[a].exec){item.onclick=new Function(cfg[a].exec);}
			if(cfg[a].dblexec){item.ondblclick=new Function(cfg[a].dblexec);}
			if(cfg[a].rexec){item.oncontextmenu=new Function(cfg[a].rexec);}
			$('#toolbar').appendChild(item);
		}
	}
	catch(e){alert('按钮配置出错：\n'+e);}
}
function zoomIn(){window.eAPI.zoomIn();}
function zoomOut(){window.eAPI.zoomOut();}
function zoomReset(){window.eAPI.zoomReset();}

/*==【加载插件】==*/
function loadjs(src){
	var x=document.createElement('script');
	x.src="plugins/"+src;
	$("#_loadjs").appendChild(x);
}
function final(){ // 接受拖拽物品
	$("#pet").ondragenter=function(e){e.preventDefault();if(pet.imgs.curious){petload(pet.imgs.curious);}}
	$("#pet").ondragleave=function(e){e.preventDefault();if(pet.imgs.confused){petload(pet.imgs.confused);}}
	$("#pet").ondragover=function(e){if(config_petitems[dragged_id]){e.preventDefault();}}
	$("#pet").ondrop=function(){config_petitems[dragged_id].exec();dragged_id=null;}
}