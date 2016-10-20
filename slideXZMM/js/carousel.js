(function($){
	var Carousel = function(poster) {
		var self = this;
		//保存单个旋转木马对象
		this.poster = poster;
		this.posterItemMain = poster.find('ul.poster-list');
		this.nextBtn = poster.find('div.poster-next-btn');
		this.prevBtn = poster.find('div.poster-prev-btn');
		this.posterItems = poster.find('li.poster-item');
		// if (this.posterItems.size()%2==0){
		// 	this.posterItemMain.append(this.posterItems.eq(0).clone());
		// 	this.posterItems = this.posterItemMain.children();
		// }
		this.posterFirstItem = this.posterItems.first();
		this.posterLasrItem = this.posterItems.last();
		this.rotateFlag = true;
		// console.log(poster.attr("data-setting"));
		this.setting = {
			"width":1000,		//幻灯片的宽度
			"height":270,		//幻灯片的高度
			"posterWidth":640,	//幻灯片第一帧宽度
			"posterHeight":270,	//幻灯片第一帧高度
			"scale":0.9,		//显示比例
			"speed":500,
			"verticalAlign":"middle"
		};
		$.extend(this.setting,this.getSetting());//扩展
		// console.log(this.setting);
		this.setSettingValue();
		this.setPosterPos();

		this.nextBtn.click(function() {
			if(self.rotateFlag){
				self.rotateFlag = false;
				self.carouseRotate("left");
			}
		});
		this.prevBtn.click(function() {
			if(self.rotateFlag){
				self.rotateFlag = false;
				self.carouseRotate("right");
			}	
		});
		//是否自动播放
		if(this.setting.autoPlay){
			this.autoPlay();
			this.poster.hover(function(){
				window.clearInterval(self.timer);
			}, function() {
				self.autoPlay();
			});
		}
	};
	Carousel.prototype = {
		autoPlay:function() {
			var self = this;
			this.timer = window.setInterval(function() {
				self.nextBtn.click();
			},this.setting.delay);
		},
		//旋转
		carouseRotate:function(dir) {
			var _this_ = this;
			var zIndexArr = [];
			if(dir === "left"){
				this.posterItems.each(function() {
					var self = $(this),
					prev = self.prev().get(0)?self.prev():_this_.posterLasrItem,
					width = prev.width(),
					height = prev.height(),
					zIndex = prev.css("zIndex"),
					opacity = prev.css("opacity"),
					left = prev.css("left"),
					top = prev.css("top");
					zIndexArr.push(zIndex);	
					self.animate({
						width:width,
						height:height,
						// zIndex:zIndex,
						opacity:opacity,
						left:left,
						top:top
					},_this_.setting.speed,function(){
						_this_.rotateFlag = true;
					});
				});
				//zIndex需要单独保存再设置，防止循环时候设置再取的时候值永远是最后一个的zindex
				this.posterItems.each(function(i){
					$(this).css("zIndex",zIndexArr[i]);
				});
			} else if(dir === "right"){
				this.posterItems.each(function() {
					var self = $(this),
					next = self.next().get(0)?self.next():_this_.posterFirstItem,
					width = next.width(),
					height = next.height(),
					zIndex = next.css("zIndex"),
					opacity = next.css("opacity"),
					left = next.css("left"),
					top = next.css("top");
					zIndexArr.push(zIndex);	
					self.animate({
						width:width,
						height:height,
						// zIndex:zIndex,
						opacity:opacity,
						left:left,
						top:top
					},_this_.setting.speed,function(){
						_this_.rotateFlag = true;
					});
				});
				//zIndex需要单独保存再设置，防止循环时候设置再取的时候值永远是最后一个的zindex
				this.posterItems.each(function(i){
					$(this).css("zIndex",zIndexArr[i]);
				});
			}
		},
		//设置剩余帧的位置关系
		setPosterPos:function() {
			var self = this;
			var sliceItems = this.posterItems.slice(1),
			sliceSize = sliceItems.size()/2,
			rightSlice = sliceItems.slice(0,sliceSize),
			level     = Math.floor(this.posterItems.size()/2),
			leftSlice = sliceItems.slice(sliceSize);
			// alert(leftSlice.size());
			//设置右边帧的位置关系和高度top
			var rw = this.setting.posterWidth,
				rh = this.setting.posterHeight,
				gap = ((this.setting.width-this.setting.posterWidth)/2)/level;
				// alert(gap);
				var firstLeft = (this.setting.width-this.setting.posterWidth)/2;
				var fixOffsetLeft = firstLeft + rw;
			rightSlice.each(function(i) {
				level--;
				rw = rw*self.setting.scale;
				rh = rh*self.setting.scale;
				var j = i;
				console.log(i);
				if(i === (self.posterItems.size()-1)/2-1){
					console.log(self.posterItems.size());
					$(this).css({
						zIndex:level,
						width:rw,
						height:rh,
						opacity:0,
						left:fixOffsetLeft+(++j)*gap-rw,
						top:self.setVertucalAlign(rh)
					});
				} else {
					$(this).css({
						zIndex:level,
						width:rw,
						height:rh,
						opacity:1/(++i),
						left:fixOffsetLeft+(++j)*gap-rw,
						top:self.setVertucalAlign(rh)
					});
				}
			});
			//设置左边的位置关系和高度top
			var lw = rightSlice.last().width(),
				lh = rightSlice.last().height(),
				oloop = Math.floor(this.posterItems.size()/2);

			leftSlice.each(function(i) {
				if (i===0) {
					$(this).css({
					zIndex:i,
					width:lw,
					height:lh,
					opacity:0,
					left:i*gap,
					top:self.setVertucalAlign(lh)
				});
				} else {
					$(this).css({
					zIndex:i,
					width:lw,
					height:lh,
					opacity:1/oloop,
					left:i*gap,
					top:self.setVertucalAlign(lh)
				});
				}
				
				lw = lw/self.setting.scale;
				lh = lh/self.setting.scale;
				oloop--;

			});
		},
		//设置垂直对齐方式
		setVertucalAlign:function(height){
			var verticalType = this.setting.verticalAlign,
			top = 0;
			if(verticalType === "middle"){
				top = (this.setting.height-height)/2;
			} else if(verticalType === "top"){
				top = 0;
			} else if(verticalType === "bottom"){
				top = this.setting.height-height;
			} else{
				top = (this.setting.height-height)/2;
			}
			return top;
		},
		//设置配置参数值去控制基本的高度
		setSettingValue:function() {
			this.poster.css({
				width:this.setting.width,
				height:this.setting.height
			});
			this.posterItemMain.css({
				width:this.setting.width,
				height:this.setting.height
			});
			//计算切换按钮的宽度
			var w = (this.setting.width-this.setting.posterWidth)/2;
			this.nextBtn.css({
				width:w,
				height:this.setting.height,
				zIndex:Math.ceil(this.posterItems.size()/2)
			});
			this.prevBtn.css({
				width:w,
				height:this.setting.height,
				zIndex:Math.ceil(this.posterItems.size()/2)
			});
			this.posterFirstItem.css({
				width:this.setting.posterWidth,
				height:this.setting.posterHeight,
				left:w,
				zIndex:Math.floor(this.posterItems.size()/2)
			});
		},
		//获取人工配置的参数
		getSetting:function(){
			var setting = this.poster.attr("data-setting");
			if (setting&&setting!="") {
				return $.parseJSON(setting);
			} else {
				return {};
			}
		}
	};

	Carousel.init = function(posters){
		var _this_ = this;
		posters.each(function(){
			new _this_($(this));
		});
	};
	window["Carousel"] = Carousel;

})(jQuery);