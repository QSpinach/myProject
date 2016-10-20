function animate(obj,json,fn) {
		clearInterval(obj.timer);
		obj.timer = setInterval(function() {
			var flag = true;
			for(var attr in json){
				 var current = 0;
                if(attr == "opacity")
                {
                    current = Math.round(parseInt(getStyle(obj,attr)*100)) || 0;
                    console.log(current);
                }
                else
                {
                    current = parseInt(getStyle(obj,attr)); // 数值
                }
				var step = (json[attr] - current)/10;
				step = step > 0 ? Math.ceil(step) : Math.floor(step);
				 //判断透明度
                if(attr == "opacity")  // 判断用户有没有输入 opacity
                {
                     if("opacity" in obj.style)  // 判断 我们浏览器是否支持opacity
                     {
                         // obj.style.opacity
                         obj.style.opacity = (current + step) /100;
                     }
                    else
                     {  // obj.style.filter = alpha(opacity = 30)
                         obj.style.filter = "alpha(opacity = "+(current + step)* 10+")";

                     }
                }
                else if (attr == "zIndex") {
                	obj.style.zIndex = json[attr];
                }
                else
                {
                    obj.style[attr] = current  + step + "px" ;
                }
				console.log(current);
				if (current != json[attr]) {
					flag = false;
				}
			}
			if (flag) {
				clearInterval(obj.timer);
				if (fn) {
					fn();
				}
			}
		},10);
	}

	function getStyle(obj,attr){
		if (obj.currentStyle) {
			return obj.currentStyle[attr];
		} else {
			return window.getComputedStyle(obj,null)[attr];
		}
	}