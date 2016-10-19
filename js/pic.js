var html = document.getElementsByTagName('html');
var remNum = document.documentElement.clientWidth/3;//rem的数值
html[0].style.fontSize = remNum+'px';
createPic();
function createPic(){
	var picData = '';
	for(var i=0;i<16;i++){
		picData += '<li style="background-image:url(img/'+(i+1)+'.jpg);"></li>';
	}
	//console.log(picData);
	document.getElementsByTagName('ul')[0].innerHTML = picData;	
}
window.onload = function(){
	var flag = false;
	var numArr = [];
	var oPage = document.getElementById("page");
	var aBtn = oPage.getElementsByTagName('header')[0].getElementsByTagName('a');
	var oUl = oPage.getElementsByTagName('ul')[0];
	var aLi = oUl.getElementsByTagName('li');
	var aFooter = document.getElementsByTagName('footer')[0].getElementsByTagName('a');
	var aRecycle = document.getElementsByTagName('footer')[0].getElementsByTagName('img');
	aBtn[1].addEventListener('touchend',fnClick,false);
	
	function fnIndex(){
		for(var i=0;i<aLi.length;i++){
			aLi[i].index = i;
		}
		//console.log(aLi.length+"###");
	}
	
	function fnClick(){
		//console.log(this.innerHTML);
		if(flag==false){//进入删除页面
			this.innerHTML = '取消';
			aBtn[0].style.display = 'block';
			for(var i=0;i<aRecycle.length;i++){
				aRecycle[i].style.top = 'calc(100% - 0.45rem)';//垃圾桶出现
			}		
		}else{//离开删除页面
			for(var i=0;i<aLi.length;i++){
				aLi[i].className = '';
			}
			numArr.length = 0;
			this.innerHTML = '选择';
			aBtn[0].style.display = 'none';
			for(var i=0;i<aRecycle.length;i++){
				aRecycle[i].style.top = 0.55+'rem';//垃圾桶隐藏
			}	
			//按取消后恢复原状，删除之前创建的div节点
			for(var i=0;i<aLi.length;i++){
				var oPic = aLi[i].getElementsByClassName('picList')[0];
				if(oPic){
					close3d(oPic);
					//aLi[i].style.backgroundImage = oPic.style.backgroundImage;
					delayDel(i,oPic,300);
				}
			}
			
		}
		flag = !flag;
	}
	
	function delayDel(i,obj,t){//封装一个delay函数规避function中i不能直接获取,我在想或者使用ES2015中箭头函数也是一个好的选择，绑定this值不变
		setTimeout(function(){
			aLi[i].style.backgroundImage = obj.style.backgroundImage;
			aLi[i].removeChild(obj);
		},t);	
	}
	
	function reLocate(){
		
	}
	
	function fnSelect(){
		if(flag == true){
			this.className = 'active';
			numArr.push(this.index);
			//console.log(this.index);
			//这边要做一个判断，点击一次产生，点击多次不应该产生多个picList
			var divStr = '<div><div><div><div><div><div><div><div><div><div></div></div></div></div></div></div></div></div></div></div>';
			var oPic = document.createElement('div');
			var isPic = this.getElementsByClassName('picList');
			oPic.style.backgroundImage = this.style.backgroundImage;
			this.style.backgroundImage = 'none';
			//this.style.backgroundPosition = '-1000px 0';
			//透明度会出问题，不会立即体现
			//this.style.opacity = 0.3;
			if(isPic.length === 0){
				oPic.className = 'picList';
				oPic.innerHTML = divStr;
				this.appendChild(oPic);
				var aDiv = oPic.getElementsByTagName('div');
				for(var i=0;i<aDiv.length;i++){
					aDiv[i].style.backgroundPosition = -0.1*i+'rem 0';
				}
		
				setTimeout(function(){
					open3d(oPic);
				},30);						
			}
		}
	}
	
	function fnRemove(){
		numArr.sort(function(a,b){
			return a-b;
		});	
		
		for(var i=0;i<numArr.length;i++){
			//console.log(numArr[i]+'%%%%'+getXy(aLi[numArr[i]].getElementsByClassName('picList')[0]));
			fnMove(aLi[numArr[i]].getElementsByClassName('picList')[0].firstChild);//删除一次后会出现undefined	
			//fnMove(aLi[numArr[i]].getElementsByClassName('picList')[0]);
		}
	
		setTimeout(function(){
			//aRecycle[0].style.webkitAnimation = aRecycle[1].style.webkitAnimation = '0.5s 0.5s show';
			aRecycle[0].style.top = aRecycle[1].style.top = 'calc(100% - 0.45rem)';
			while(numArr.length != 0){
				oUl.removeChild(aLi[numArr.pop()]);
			}	
			fnIndex();//要放到定时器里面，否则立即执行下一次选择会报错，因为还没来得及删除li，leng始终保持在16
		},1000);	
		aRecycle[0].style.top = aRecycle[1].style.top = 'calc(100% - 0.6rem)';
		//console.log(numArr+'****');
				
	}
	
	function fnMove(obj){//根据原先所在的位置移动到中间位置
		var xY = getXy(obj);
		var l = parseInt(xY.l/remNum);
		console.log(l);
		//var t = xY.t;
//		if(l<0.5*remNum){
//			obj.style.left = 0.75+'rem';		
//		}else if(l>1.5*remNum && l<2.5*remNum){
//			obj.style.left = -0.75+'rem';
//		}
		if(l===0){
			obj.style.left = 0.75+'rem';		
		}else if(l===2){
			obj.style.left = -0.75+'rem';
		}
		
		obj.style.top = 4.55+'rem';
		//obj.style.top = 'calc(100%)';
	}
	
	function getXy(obj){
		var l=0,t=0;
		while(obj){
			l += obj.offsetLeft;
			t += obj.offsetTop;
			obj = obj.offsetParent;		
		}
		return {
			'l':l,
			't':t
		};
	}
	
	function open3d(obj){
		var aDiv = obj.getElementsByTagName('div');
		for(var i=0;i<aDiv.length;i++){
			aDiv[i].className = 'show';
		}
	}
	function close3d(obj){
		var aDiv = obj.getElementsByTagName('div');
		for(var i=0;i<aDiv.length;i++){
			aDiv[i].className = '';
		}				
	}
	
	fnIndex();
	for(var i=0;i<aLi.length;i++){
		aLi[i].addEventListener('touchend',fnSelect,false);
	}
	
	aBtn[0].addEventListener('touchend',fnRemove,false);
	
	for(var i=0;i<aFooter.length;i++){
		aFooter[i].addEventListener('touchend',function(){
			for(var i=0;i<aFooter.length;i++){
				aFooter[i].className = '';
			}
			this.className = 'active';
		},false);
	}
	
	
	
	
}
