// 暂时的宠物状态信息方案：人体生物节律
/*==【PSI】==*/
function loadpsi_preload(){
	var psidiv=document.createElement("div")
	psidiv.id="psi";
	if($("#petdiv")){ // 在宠物窗口
		psidiv.innerHTML=`
		智力指数：<span id="PSI_T_I">-</span><progress id="PSI_I" max="100" value="0"></progress><br/>
		心情指数：<span id="PSI_T_S">-</span><progress id="PSI_S" max="100" value="0"></progress><br/>
		体力指数：<span id="PSI_T_P">-</span><progress id="PSI_P" max="100" value="0"></progress><br/>
		`
		$("#petdiv").appendChild(psidiv);
		return;
	}else if($(".main")){ // 在信息窗口
		psidiv.innerHTML=`
		<h2>宠物状态信息</h2>
		<table>
			<tr><td>智力指数</td><td><span id="PSI_T_I">-</span></td><td><progress id="PSI_I" max="100" value="0"></progress></td></tr>
			<tr><td>心情指数</td><td><span id="PSI_T_S">-</span></td><td><progress id="PSI_S" max="100" value="0"></progress></td></tr>
			<tr><td>体力指数</td><td><span id="PSI_T_P">-</span></td><td><progress id="PSI_P" max="100" value="0"></progress></td></tr>
		</table>
		`
		$(".main").appendChild(psidiv);
		loadpsi();
		return;
	}
}
function loadpsi(){ // 宠物属性加载（ 人体生物节律 拿来玩的 ）
	try{
		if(pet.birthday){ // 获取宠物生日信息（ conf.js 中调整）
			var birth=new Date(pet.birthday); 
			var today=new Date(); 
			var delta1=today.getTime()-birth.getTime(); 
			var delta2=delta1/(1000*3600*24);
			var toshow=delta2.toFixed(0);
			var pi=3.14159265;
			var P=(Math.sin(toshow*(2*pi)/23)*50)+50;
			var S=(Math.sin(toshow*(2*pi)/28)*50)+50;
			var I=(Math.sin(toshow*(2*pi)/33)*50)+50;
			$('#PSI_P').value=P;$('#PSI_T_P').innerText=parseInt(P);
			$('#PSI_S').value=S;$('#PSI_T_S').innerText=parseInt(S);
			$('#PSI_I').value=I;$('#PSI_T_I').innerText=parseInt(I);
			return true;
		}else{
			return false;
		}
	}catch{
		return false;
	}
}
function psiquery(){ // 玩家查宠物状态信息的入口
	if(loadpsi()){
		if($("#psi").style.display=="block"){
			psiquery_close();
		}
		else{
			popup_close();
			petmenu_close();
			$("#psi").style.display="block";
		}
	}else{
		alert("依赖属性未设定！");
		psiquery_close();
	}
}
function psiquery_close(){
	$("#psi").style.display="none";
}
loadpsi_preload();