stat={
	饥饿:{
		wait:conf.stat.饥饿值减少延迟,
		preset:conf.stat.饥饿值预设值,
		current:parseFloat(localStorage.getItem("status_饥饿值")),
		减少值:conf.stat.饥饿值减少值,
		增加值:conf.stat.饥饿值增加值,
	},
	清洁:{
		wait:conf.stat.清洁值减少延迟,
		preset:conf.stat.清洁值预设值,
		current:parseFloat(localStorage.getItem("status_清洁值")),
		减少值:conf.stat.清洁值减少值,
		增加值:conf.stat.清洁值增加值,
	},
	心情:{
		wait:conf.stat.心情值减少延迟,
		preset:conf.stat.心情值预设值,
		current:parseFloat(localStorage.getItem("status_心情值")),
		减少值:conf.stat.心情值减少值,
		增加值:conf.stat.心情值增加值,
	},
	更新延时:conf.stat.更新延时
}
stat.refresh=new Function(`stat.心情.refresh();stat.饥饿.refresh();stat.清洁.refresh();setTimeout('stat.refresh();',stat.更新延时);`)

// 饥饿值
if (stat.饥饿.current == null || isNaN(stat.饥饿.current)) { stat.饥饿.current=stat.饥饿.preset;localStorage.setItem("status_饥饿值",stat.饥饿.preset);}
stat.饥饿.min=new Function(`
	stat.饥饿.current=stat.饥饿.current-stat.饥饿.减少值;
	localStorage.setItem("status_饥饿值",stat.饥饿.current);
	setTimeout("stat.饥饿.min();",stat.饥饿.wait);
`);
if (!stat.饥饿.current) {
	stat.饥饿.current=stat.饥饿.preset;
}
stat.饥饿.add=new Function(`
	stat.饥饿.current=stat.饥饿.current+stat.饥饿.增加值;
	if(stat.饥饿.current>stat.饥饿.preset){stat.饥饿.current=stat.饥饿.preset;}
	localStorage.setItem("status_饥饿值",stat.饥饿.current);
	if(pet.imgs.eating){petload(pet.imgs.eating);}
	if(dict_eating&&typeof(dict_eating)=="object"){popup(dict_eating[随机数(0,dict_eating.length-1)]);}
	facelocked=true;
	setTimeout('facelocked=false',5000);
	setTimeout('petload(pet.imgs.default)',30000);
	petmenu_close();
`);
stat.饥饿.refresh=new Function(`if(stat.饥饿.current<(stat.饥饿.preset/4)&&pet.imgs.hungry){petload(pet.imgs.hungry);return;}`)

// 清洁值
stat.清洁.current=parseFloat(localStorage.getItem("status_清洁值"));
if (stat.清洁.current == null || isNaN(stat.清洁.current)) { stat.清洁.current=stat.清洁.preset;localStorage.setItem("status_清洁值",stat.清洁.preset);}
stat.清洁.min=new Function(`
	stat.清洁.current=stat.清洁.current-stat.清洁.减少值;
	localStorage.setItem("status_清洁值",stat.清洁.current);
	setTimeout("stat.清洁.min();",stat.清洁.wait);
	if(pet.imgs.shower){petload(pet.imgs.shower);}
`);
if (!stat.清洁.current) {
	stat.清洁.current=stat.心情.preset;
}
stat.清洁.add=new Function(`
	stat.清洁.current=stat.清洁.current+stat.清洁.增加值;
	if(stat.清洁.current>stat.清洁.preset){stat.清洁.current=stat.清洁.preset;}
	localStorage.setItem("status_清洁值",stat.清洁.current);
	if(dict_shower&&typeof(dict_shower)=="object"){popup(dict_shower[随机数(0,dict_shower.length-1)]);}
	facelocked=true;
	setTimeout('facelocked=false',5000);
	setTimeout('petload(pet.imgs.default)',30000);
	petmenu_close();
`);
stat.清洁.refresh=new Function(`if(stat.清洁.current<(stat.清洁.preset/4)&&pet.imgs.dirty){petload(pet.imgs.dirty);return;}`)

// 心情值
stat.心情.current=parseFloat(localStorage.getItem("status_心情值"));
if (stat.心情.current == null || isNaN(stat.心情.current)) { stat.心情.current=stat.心情.preset;localStorage.setItem("status_心情值",stat.心情.preset);}
stat.心情.min=new Function(`
	stat.心情.current=stat.心情.current-stat.心情.减少值;
	localStorage.setItem("status_心情值",stat.心情.current);
	setTimeout("stat.心情.min();",stat.心情.wait);
`);
if (!stat.心情.current) {
	stat.心情.current=stat.心情.preset;
}
stat.心情.add=new Function(`
	stat.心情.current=stat.心情.current+stat.心情.增加值;
	if(stat.心情.current>stat.心情.preset){stat.心情.current=stat.心情.preset;}
	localStorage.setItem("status_心情值",stat.心情.current);
`);
stat.心情.refresh=new Function(`
	if(stat.心情.current<(stat.心情.preset/4)&&pet.imgs.sad){petload(pet.imgs.sad);return;}
	if(stat.心情.current<(stat.心情.preset/2)&&pet.imgs.sad){petload(pet.imgs.sad);return;}
`)

function status_preload() {
	if ($("#petdiv")) { // 在宠物窗口
		// 菜单添加项
		var item=document.createElement("button");
		item.onclick=new Function("stat.饥饿.add()");
		item.innerText="喂食";
		$('#menu').appendChild(item);
		// 菜单添加项
		var item=document.createElement("button");
		item.onclick=new Function("stat.清洁.add()");
		item.innerText="洗澡";
		$('#menu').appendChild(item);

		setTimeout("stat.饥饿.min();",stat.饥饿.wait);
		setTimeout("stat.清洁.min();",stat.清洁.wait);
		setTimeout("stat.心情.min();",stat.心情.wait);

		$("img#pet").addEventListener("click",()=>{ stat.心情.add();});
		setTimeout('stat.refresh();',stat.更新延时);
		return;

	}
	else if ($(".main")) { // 在信息窗口
		var statdiv=document.createElement("div");
		var now=new Date();
		var time=now.getFullYear()+'/'+(now.getMonth()+1)+'/'+now.getDate()+' '+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
		statdiv.id="status";
		statdiv.innerHTML=`
		<h2>宠物状态信息</h2>
		更新时间：${time}<br/>
		<table>
			<tr><td>饥饿</td><td><span id="STAT_T_饥饿">${stat.饥饿.current}</span></td><td><progress id="STAT_P_饥饿" max="${stat.饥饿.preset}" value="${stat.饥饿.current}"></progress></td></tr>
			<tr><td>清洁</td><td><span id="STAT_T_清洁">${stat.清洁.current}</span></td><td><progress id="STAT_P_清洁" max="${stat.清洁.preset}" value="${stat.清洁.current}"></progress></td></tr>
			<tr><td>心情</td><td><span id="STAT_T_心情">${stat.心情.current}</span></td><td><progress id="STAT_P_心情" max="${stat.心情.preset}" value="${stat.心情.current}"></progress></td></tr>
		</table>
		`
		$(".main").appendChild(statdiv);
		return;
	}
}
status_preload();