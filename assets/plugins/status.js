stat={
  饥饿:{
    wait:1800000,// 30 分钟
    preset:1000,
    current:parseFloat(localStorage.getItem("status_饥饿值")),
  },
  清洁:{
    wait:1200000,// 20 分钟
    preset:1000,
    current:parseFloat(localStorage.getItem("status_清洁值")),
  },
  心情:{
    wait:600000,// 10 分钟
    preset:1000,
    current:parseFloat(localStorage.getItem("status_心情值")),
  }
}

// 饥饿值
if(stat.饥饿.current==null||isNaN(stat.饥饿.current)){stat.饥饿.current=stat.饥饿.preset;localStorage.setItem("status_饥饿值",stat.饥饿.preset);}
stat.饥饿.min=new Function(`
  stat.饥饿.current=stat.饥饿.current-3;
  localStorage.setItem("status_饥饿值",stat.饥饿.current);
  setTimeout("stat.饥饿.min();",stat.饥饿.wait);
`);
if(!stat.饥饿.current){
  stat.饥饿.current=1000;
}
stat.饥饿.add=new Function(`
  stat.饥饿.current=stat.饥饿.current+100;
  if(stat.饥饿.current>1000){
    stat.饥饿.current=1000;
  }
  localStorage.setItem("status_饥饿值",stat.饥饿.current);
  petmenu_close();
`);

// 清洁值
stat.清洁.current=parseFloat(localStorage.getItem("status_清洁值"));
if(stat.清洁.current==null||isNaN(stat.清洁.current)){stat.清洁.current=stat.清洁.preset;localStorage.setItem("status_清洁值",stat.清洁.preset);}
stat.清洁.min=new Function(`
  stat.清洁.current=stat.清洁.current-3;
  localStorage.setItem("status_清洁值",stat.清洁.current);
  setTimeout("stat.清洁.min();",stat.清洁.wait);
`);
if(!stat.清洁.current){
  stat.清洁.current=1000;
}
stat.清洁.add=new Function(`
  stat.清洁.current=stat.清洁.current+100;
  if(stat.清洁.current>1000){
    stat.清洁.current=1000;
  }
  localStorage.setItem("status_清洁值",stat.清洁.current);
  petmenu_close();
`);

// 心情值
stat.心情.current=parseFloat(localStorage.getItem("status_心情值"));
if(stat.心情.current==null||isNaN(stat.心情.current)){stat.心情.current=stat.心情.preset;localStorage.setItem("status_心情值",stat.心情.preset);}
stat.心情.min=new Function(`
  stat.心情.current=stat.心情.current-3;
  localStorage.setItem("status_心情值",stat.心情.current);
  setTimeout("stat.心情.min();",stat.心情.wait);
`);
if(!stat.心情.current){
  stat.心情.current=1000;
}
stat.心情.add=new Function(`
  stat.心情.current=stat.心情.current+50;
  if(stat.心情.current>1000){
    stat.心情.current=1000;
  }
  localStorage.setItem("status_心情值",stat.心情.current);
`);

function status_preload(){
  if($("#petdiv")){ // 在宠物窗口
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

    $("img#pet").addEventListener("click",()=>{stat.心情.add();});
    return;

  }else if($(".main")){ // 在信息窗口
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