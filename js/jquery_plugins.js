;(function($){
	
	//图片放大镜函数
	$.fn.imgZoom = function(opt){
		
		var def = {
			"mult": 3, //默认放大三倍
			"size": 100, //放大镜默认大小100*100
			"bgColor":"#F08080"
		} 
		var new_opt = {};
		new_opt = $.extend(new_opt, def, opt); //创建新的对象
		
		return this.each(function(){
			var imgWidth = $(this).width(); //当前图片盒子宽度
			var imgHeight = $(this).height(); //当前图片盒子高度
			var imgSrc = $(this).children("img").attr("src"); //获取图片路径(相对路径)
			var imgToLeft = $(this).offset().left; //当前盒子距离屏幕左侧距离
			var imgToTop = $(this).offset().top; //当前盒子距离屏幕左侧距离
			//创建放大镜对象
			var zoom = $("<div>"); 
			zoom.addClass("zoom").appendTo($(this)); 
			
			//创建放大后图片对象
			var picZoom = $("<div>"); //图片盒子
			var bigPic = $("<img src='"+imgSrc+"' >"); //picZoom内的图片
			picZoom.addClass("picZoom").html(bigPic); //给picZoom添加图片
			$(this).after(picZoom); //将picZoom插入到当前对象后面
			
			zoom.css({"width":new_opt.size,"height":new_opt.size}); //改变放大镜大小
			picZoom.css({"width":new_opt.mult*new_opt.size, "height":new_opt.mult*new_opt.size}); //改变放大后的图片盒子大小
			picZoom.css({"left":(imgToLeft+imgWidth),"top":imgToTop}); //设置放大后图片盒子位置
			bigPic.css({"width":imgWidth*new_opt.mult, "height":imgHeight*new_opt.mult}); //改变放大后的图片大小
			
			//判断是否改变颜色
			if(new_opt.bgColor != def.bgColor){
				zoom.css({"background-color":new_opt.bgColor});
			}
			
			//鼠标移入事件
			$(this).mousemove(function(ev){ //this:当前对象实例
				zoom.show();
				picZoom.show();
				bigPic.attr("src", $(this).children("img").attr("src")); //重新获取当前图片路径
				
				var pX = ev.pageX - $(this).offset().left - zoom.width()/2;
				var pY = ev.pageY - $(this).offset().top - zoom.height()/2;
				
				//条件判定
				if( pX < 0 ){ //左边
					pX = 0;
				}
				if( pY < 0 ){ //上方
					pY = 0;
				}
				if( pX > $(this).width()-zoom.width() ){ //右边
					pX = $(this).width()-zoom.width();
				}
				if( pY > $(this).height()-zoom.height() ){ //下边
					pY = $(this).height()-zoom.height();
				}
				
				zoom.css({"left":pX,"top":pY}); //移动放大镜；定位，相对与父级
				bigPic.css({"left":-new_opt.mult*pX,"top":-new_opt.mult*pY}); //定位，相对与父级
				
			});
			
			//鼠标离开事件
			$(this).mouseout(function(ev){
				zoom.hide();
				picZoom.hide();
				
			});
		
		
		});
			
	}
	
	//轮播图插件
	$.fn.imgTab = function(opt){ //opt:对象，autoPlay:time
		
		var def={
			"autoplay":true, //autoplay自动播放
			"time": 1000 //time：间隔时间
		};
		var new_opt = $.extend(def, opt);
		
		return this.each(function(){ //this:new出的对象实例(jQuery对象)
			
			var state=0; //轮播图下标状态
			var timer;
			var aUli = $(this).find("ul li"); //当前对象中寻找ul-li
			
			$(this).append("<ol></ol>"); //当前对象中插ol
			//根据ul-li长度添加ol-li
			for (var i=0; i<aUli.size(); i++){
				$(this).find("ol").append("<li>"+(i+1)+"</li>"); //ol中插li
			}
			
			$(this).find("ol li").first().addClass("active"); //默认第一个按钮为active状态
			
			var _this = $(this);
			
			//绑定按钮点击事件
			$(this).find("ol li").click(function(){
				$(this).addClass("active").siblings().removeClass("active"); //当前按钮点亮，其它按钮关闭
				var index = $(this).index(); //获取当前按钮索引
				_this.find("ul li").eq(index).fadeIn("slow").siblings().fadeOut("slow"); //_this:当前对象实例; $(this):当前按钮
				state = index; //改变轮播图下标
				
			});
			
			
			$(this).find(".arrow_right").click(function(){
				state++;
				if(state >= aUli.size()){
					state = 0;
				}
				_this.find("ul li").eq(state).fadeIn("slow").siblings().fadeOut("slow"); //_this:当前对象实例
				_this.find("ol li").eq(state).addClass("active").siblings().removeClass("active"); //当前按钮点亮，其它按钮关闭
				
				
			});
			
			$(this).find(".arrow_left").click(function(){
				state--;
				if(state < 0){
					state = aUli.size()-1;
				}
				_this.find("ul li").eq(state).fadeIn("slow").siblings().fadeOut("slow"); //_this:当前对象实例
				_this.find("ol li").eq(state).addClass("active").siblings().removeClass("active"); //当前按钮点亮，其它按钮关闭
				
				
			});
			
			
			//自动播放
			if(new_opt.autoplay){
				function run(){
					_this.find("ul li").eq(state).fadeIn("slow").siblings().fadeOut("slow"); //_this:当前对象实例
					_this.find("ol li").eq(state).addClass("active").siblings().removeClass("active"); //当前按钮点亮，其它按钮关闭
					
					state>=aUli.size()-1 ? state=0 : state++;
				};
				
				timer = setInterval(run, new_opt.time);
				
				//hover事件
				$(this).find(".arrow").hover(function(){
					$(this).css({"opacity":0.7});
					clearInterval(timer);
				},function(){
					timer = setInterval(run, new_opt.time);
					$(this).css({"opacity":0.4});
					
				})
				
			}
			
		});
		
	}
	
	
})(jQuery);

