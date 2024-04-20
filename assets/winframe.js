target=GetQueryString("target");
if(target){
	$('iframe').src=target+".html";
}else{
	if(config_win_default){$('iframe').src=config_win_default;}
	else{$('iframe').src="about.html";}
}
if(config_win_tabs){
	try{for(var a=0;a<config_win_tabs.length;a++){wintabs_add(config_win_tabs[a])}}
	catch(e){console.log(e)}
}