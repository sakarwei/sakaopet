function GetQueryString(require){var reg=new RegExp("(^|&)"+require+"=([^&]*)(&|$)","i");var r=window.location.search.substr(1).match(reg);if (r!=null){return (r[2]);}return null;}
function $(t){
  return document.querySelector(t)
}
function loadjs(src,type="plugins"){
	var x=document.createElement('script');
	if(type=="pet"){x.src="pet/"+src;}
	else{x.src="plugins/"+src;}
	$("#_loadjs").appendChild(x);
}
function 随机数(小,大){
	return parseInt(Math.random()*(大-小+1)+小,10);
}