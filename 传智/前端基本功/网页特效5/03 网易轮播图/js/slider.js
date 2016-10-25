window.onload = function() {
	
	function $(id) {
		return document.getElementById(id);
	}

	var js_slider = $("js_slider");//获取最大的盒子
	var slider_main_block = $("slider_main_block");//图片的父亲
	var imgs = slider_main_block.children;//获取图片组
	var slider_ctrl = $("slider_ctrl");//获得控制的父盒子

	//生成span
	for (var i = 0; i < imgs.length; i++) {
		var span = document.createElement("span");
		span.className = "slider-ctrl-con";
		span.innerHTML = imgs.length - i;
		slider_ctrl.insertBefore(span,slider_ctrl.children[1]);
	}
	// 下面的第一个小span  是默认的蓝色
	var spans = slider_ctrl.children;
	spans[1].setAttribute("class","slider-ctrl-con current");

	var scrollWidth = js_slider.clientWidth;// 得到大盒子的宽度 也就是  后面动画走的距离  310
	//  刚开始，按道理   第一张图片 留下   其余的人走到 310 的位置上
	for (var i = 1; i < imgs.length; i++) {
		imgs[i].style.left = scrollWidth + "px";
	}

	//遍历三个按钮
	// spans 是8个按钮 他们都是 spans
	var iNow = 0;
	for(var k in spans){
		spans[k].onclick = function() {
			// alert(this.innerHTML)
			if (this.className == "slider-ctrl-prev") {
				// alert("你点击了左侧的按钮");
				animate(imgs[iNow],{left:scrollWidth});
				iNow--;
				if (iNow < 0) {
					iNow = imgs.length-1;
				}
				// console.log(iNow);
				imgs[iNow].style.left = -scrollWidth + "px";
				animate(imgs[iNow],{left:0});
				setSquare();
			}
			else if (this.className == "slider-ctrl-next") {
				// alert("你点击了右侧的按钮");
				autoPlay();
			}
			else{
				// alert("你点击了下面的span按钮");
				var that = this.innerHTML-1;
				if (that > iNow) {
					// 做法等同于 右侧按钮
					animate(imgs[iNow],{left:-scrollWidth});//当前这张 左侧
					imgs[that].style.left = scrollWidth + "px";
				}
				if(that<iNow){
					animate(imgs[iNow],{left:scrollWidth});
					imgs[that].style.left = -scrollWidth + "px";
				}
				iNow = that;//给当前索引号
				animate(imgs[iNow],{left:0});
				// console.log(iNow);
				setSquare();
			}
		}
	}
	//控制span class
	function setSquare() {
		for (var i = 1; i <spans.length-1; i++) {
			spans[i].className = "slider-ctrl-con";
		}
		spans[iNow+1].className = "slider-ctrl-con current";
	}
	//定时器 自动播放
	var timer = null;
	timer = setInterval(autoPlay,2000);
	function autoPlay() {
		animate(imgs[iNow],{left:-scrollWidth});
				iNow++;
				if (iNow > imgs.length-1) {
					iNow = 0;
				}
				// console.log(iNow);
				imgs[iNow].style.left = scrollWidth + "px";
				animate(imgs[iNow],{left:0});
				setSquare();
	}

	// 清除定时器
	js_slider.onmouseover = function() {
		clearInterval(timer);
	}
	js_slider.onmouseout = function() {
		clearInterval(timer);
		timer = setInterval(autoPlay,2000);
	}
}