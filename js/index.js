$(function(){
	
	//12格图标相关方法
	(function(){
		var show = true;
		var iconSize = $(".focus_icon li").size(); //获取图标个数
		//设置图标位置
		$(".focus_icon li").each(function(num){
			$(this).find("i").css({"background-position-y":-25*num}); //每一个图标相应值递减25
		});
		$(".focus_icon li").eq(2).find("i").css({"background-position-y":-51}); //修正特殊
		
		//上面四格图标鼠标悬停事件
		$(".service_frame").hover(function(){
			if(show){
			
				var index = $(this).index();
				var timer = setTimeout(function(){
					$('.icon_service').addClass('service_expand'); //二级菜单弹出
				},500);
				
				$(this).addClass('service_frame_on').siblings().removeClass('service_frame_on');
				$('.service_detial').eq(index).show().siblings("div").hide(); //同级div隐藏
				
			}
		},function(){
			show = true;
		});
		
		//关闭按钮事件
		$('.closeBtn').click(function(){
			$('.icon_service').removeClass('service_expand');
			$('.focus_icon li').removeClass('service_frame_on');
			$('.focus_icon li:last').addClass('service_frame_on');
			show = false;
		});
		
		
	})();
	
	//侧边导航事件
	(function(){
		var timer;
		
		//设置page距离页面左侧距离
		function setFloorList(){
			var toPageLeft = $(".page").offset().left; 
			$(".locationFloorList").css({"left":toPageLeft-60});
		}
		setFloorList();
		//窗口大小调整时
		$(window).resize(setFloorList); 
		
		//窗口滚动事件
		function windowRun(){
			var screenHeight = $(window).height(); //浏览器窗口高度
			var scrollTop = $(window).scrollTop(); //滚动条高度
			
			//第一楼超过屏幕一半时取消对应按钮激活
			if($(".page").eq(0).offset().top > scrollTop+screenHeight/2 ){
				//$(".locationFloorList li").eq(0).removeClass("ac"); //第一格取消激活
				$(".locationFloorList").fadeOut(); //侧边导航栏淡出
			}else{
				$(".locationFloorList").fadeIn(); //侧边导航栏淡入
			}
			
	        // 楼层滚动对应的导航按钮跟着滚动
	        $(".page").each(function(i) {
	        	var eachToDocTop = $(this).offset().top; //当前楼层到文档顶部的距离
	          	var dis = eachToDocTop-scrollTop; //当前楼层距离浏览器顶部的距离
	            
	            //内容区上方在窗口上一半时激活对应按钮
	            if( dis>0 && dis<screenHeight/2 ){
	                $(".locationFloorList li").eq(i).addClass("ac").siblings().removeClass("ac");
	            }
	        });
		}
		
		//窗口滚动事件绑定
		$(window).on("scroll",windowRun);
	
	    // 点击li到达对应楼层
	    $(".locationFloorList li").click(function(){
	    	
	    	$(window).off("scroll",windowRun); //停止窗口滚动事件
	    	var index = $(this).index(); //获取当前按钮索引值
	        $(this).addClass("ac").siblings().removeClass("ac"); //激活对应按钮
	        $("html,body").stop().animate({"scrollTop":$('.page').eq(index).offset().top-20},1000);
	        //重启窗口滚动事件
	        timer = setTimeout(function(){
	        	$(window).on("scroll",windowRun);
	        	clearTimeout(timer);
	        },1000);
	        
	    });
	    
	
	})();
	
	
	//右侧导航栏事件
	(function(){
		
		$(".jdm_wrap").css({"height":$(window).height()});
		
		
		$(".jdm_list li").hover(function(){
			$(this).addClass("active");
			$(this).find("span").animate({"left":-67},500);
			$(this).find("span").css({"background":"#C81623"});
			
		},function(){
			$(this).removeClass("active");
			$(this).find("span").animate({"left": 0},500);
			$(this).find("span").css({"background":"#7a6e6e"});
		})
		
		//返回顶部按钮点击事件
		$("#toTop").click(function(){
			$("html,body").animate({"scrollTop":0}, 1500);
		});
		
		
	})();
	
	//轮播图&作者列表相关
	(function(){
		
		//轮播图插件
		$(".banner").imgTab({"time":2000});
		
		//滚动作者列表
		$(".author_list li").clone().appendTo(".author_list"); //复制li
		var oUl = $(".author_list")[0];
		var timer; //设置定时器
		var start = parseInt( getComputedStyle(oUl, null).top ); //获取初始top值
		//var start = 0; //获取初始top值
		//console.log($(".author_list li").length/2);
		var i=0;
		
		function autoRun(){
			timer = setInterval(function(){
				oUl.style.top = (start - i*106)+"px";
				i++;
				
				if(i > $(".author_list li").length/2){
					oUl.style.top = 0;
					i=0;
				}
				
			},1200);
			
		}
		autoRun();
		
		$(".author_list li").hover(function(){
			clearInterval(timer);
		},function(){
			autoRun();
		});
		
		
	})();
	
	
	
});