$(function(){
	
	//左侧相关
	(function(){
		
		//放大镜插件
		$("#bigItem").imgZoom({"mult":1.8, "size":300}); 
		
		//左箭头事件
		$("#bigArrowL").click(function(){
			$(".product .pic_list").animate({"left": 40}, 600);
		});
		
		//右箭头事件
		$("#bigArrowR").click(function(){
			$(".product .pic_list").animate({"left": -30}, 600);
		});
		
		//图片列表点击事件
		$(".pic_list li").hover(function(){
			var imgSrc = $(this).children("img").attr("src");
			$("#bigItem").children("img").attr("src", imgSrc); //改变大盒子图片路径
			$(this).addClass("active");
			
		},function(){
			$(this).removeClass("active");
		});
		
		
	})();
	
	//地址选择相关
	(function(){
		
		$.ajax({
			type:"get",
			url:"js/json/region.json",
			async:true,
			dataType:"json",
			success:function(data){
				var provinces="";
				
				//console.log(data[3].name);
				//console.log(data[3].cities[0].name);
				//console.log(data[0].cities[0].counties[1].name);
				//console.log(data[8].cities[0].counties[8].circles[0].name);
				
				for (var i=0; i<data.length; i++){
					//判断是否是直辖市
					if(data[i].name == "北京市" || data[i].name == "上海市" || data[i].name == "天津市" || data[i].name == "重庆市"){
						provinces += '<li province_index='+i+' city_index='+0+'><a href="javascript:;">'+data[i].cities[0].name+'</a></li>';
					}else{
						provinces += '<li province_index='+i+'><a href="javascript:;">'+data[i].name+'</a></li>';
					}
				}
				$(".address_list").eq(0).append(provinces); //插入省市
				
				
				//选择地址
				$(".address_list").each(function(i){ //i: address_list列表索引值
					
					//事件委派
					$(this).on("click","li",function(){ //this:当前address_list
						
						
						if(i==0){ //点击第一个address_list; this:当前的li
							
							var province = $(this).find("a").html(); //获取当前省市名
							var province_index = $(this).attr("province_index"); //获取当前省市索引值
							
							//console.log(city_index);
							
							$(".address_tab>li").eq(i).html("<span>"+province+"</span>"); //将当前省市插入对应的address_tab中
							
							//跳转到第二格
							$(".address_tab>li").eq(i+1).addClass("active").siblings().removeClass("active");
							$(".address_list").eq(i+1).show().siblings(".address_list").hide();
							$(".address_list").eq(i+1).empty(); //清空第二个格所有子节点 
							
							var cities = "";
							
							//判断是否是直辖市
							if(province_index==0|| province_index==1 || province_index==8 || province_index==21){
								var city_index = $(this).attr("city_index"); //直辖市索引值
								for (var j=0; j<data[province_index].cities[city_index].counties.length; j++){
									cities += '<li province_index='+province_index+' city_index='+city_index+' country_index='+j+'>'+
										'<a href="javascript:;">'+data[province_index].cities[city_index].counties[j].name+'</a></li>';
								}
								
							}else{
								for (var j=0; j<data[province_index].cities.length; j++){
									cities += '<li province_index='+province_index+' city_index='+j+' >'+
										'<a href="javascript:;">'+data[province_index].cities[j].name+'</a></li>';
								}
							}
							
							$(".address_list").eq(i+1).append(cities); //插入省名
							
							
						}else if(i==1){ //点击第二个address_list
							
							var city = $(this).find("a").html(); //获取当前城市名
							var province_index = $(this).attr("province_index"); //获取当前省市索引值
							var city_index = $(this).attr("city_index"); //获取当前城市索引值
							//console.log(city_index, country_index);
							
							$(".address_tab>li").eq(i).html("<span>"+city+"</span>"); //将当前城市插入对应的address_tab中
							
							//跳转到第三格
							$(".address_tab>li").eq(i+1).show();
							$(".address_tab>li").eq(i+1).addClass("active").siblings().removeClass("active");
							$(".address_list").eq(i+1).show().siblings(".address_list").hide();
							$(".address_list").eq(i+1).empty(); //清空第二个格所有子节点 
							
							var countries = "";
							
							//判断是否是直辖市
							if(province_index==0|| province_index==1 || province_index==8 || province_index==21){
								var country_index = $(this).attr("country_index"); //直辖市区县索引值
								for (var j=0; j<data[province_index].cities[city_index].counties[country_index].circles.length; j++){
									countries += '<li><a href="javascript:;">'+data[province_index].cities[city_index].counties[country_index].circles[j].name+'</a></li>';
								}
								
							}else{
								for (var j=0; j<data[province_index].cities[city_index].counties.length; j++){
									countries += '<li><a href="javascript:;">'+data[province_index].cities[city_index].counties[j].name+'</a></li>';
								}
							}
							
							$(".address_list").eq(i+1).append(countries); //插入地名
							
							
						}else if(i==2){ //点击第三个address_list
							var country = $(this).find("a").html(); //获取当前地名
							$(".address_tab>li").eq(i).html("<span>"+country+"</span>"); //将当前地名插入对应的address_tab中
							
							var arr=[];
							var address="";
							for(var j=0; j<3; j++){
								arr[j] = $(".address_tab>li").eq(j).find("span").html();
								address += arr[j]; //拼接地址
								
							}
							
							$(".address_content").hide();
							$(".address").find("a").html(address);
							
						}
						
						
					});
						
					
				});
				
				
			}
			
		});
		
		//设置默认状态
		$(".address_content").hide();
		$(".address_tab>li").eq(0).addClass("active");
		$(".address_tab>li").eq(2).hide();
		$(".address_list").eq(0).show().siblings(".address_list").hide();
		
		//地址按钮事件
		$(".address").hover(function(){
			$(this).addClass("active");
			$(".address_content").show();
			
		},function(){
			$(this).removeClass("active");
			$(".address_content").hide();
			
		});
		
		//地址详情事件
		$(".address_content").hover(function(){
			$(this).show();
			$(".address").addClass("active");
			
		},function(){
			$(this).hide();
			$(".address").removeClass("active");
			
		});
		
		var flag = true;
		//地址二级按钮
		$("#address_btn").click(function(){
			$(this).toggleClass("close");
			if (flag){
				$(".address_detial").hide();
				flag = !flag;
			}else{
				$(".address_detial").show();
				flag = !flag;
			}
		
		});
		
		//address_tab按钮点击
		$(".address_tab>li").click(function(){
			var index = $(this).index(); //address_tab>li的索引值
			$(this).addClass("active").siblings().removeClass("active");
			$(".address_list").eq(index).show().siblings(".address_list").hide();
			if (index == 0){
				$(".address_tab>li").eq(2).hide();
				$(".address_tab>li").eq(1).html("<span>请选择</span>");
			}else if(index == 1){
				$(".address_tab>li").eq(2).hide();
			}
			
		});
		
		
		$(".zz_service dd").find(".zz_detial").hide();
		//增值保障鼠标悬停事件
		$(".zz_service dd").hover(function(){
			$(this).addClass("active");
			$(this).find(".zz_detial").show();
			
		},function(){
			$(this).removeClass("active");
			$(this).find(".zz_detial").hide();
			
		});
		
	
	})();
	
	
	//购物车相关
	(function(){
		
		var choosed = 0;
		var quanNum = $("#quanNum").text(); //当前购物数量
		//console.log(quanNum);
		$(".choosetype").prop("clicked", false);
		
		//版本选择点击事件
		$(".choosetype>dd").click(function(){
			if($(this).hasClass("ac")){
				$(this).removeClass("ac");
				$(this).parent().prop("clicked", false);
				choosed--;
			}else{
				//判断该选项类是否已有选中项
				if($(this).parent().prop("clicked") == false){
					choosed ++;
				}
				$(this).parent().prop("clicked", true);
				$(this).addClass("ac").siblings().removeClass("ac");
				
			}
			
			//console.log(choosed);
			
		});
		
		//添加购物车按钮事件
		$(".add_btn").click(function(){
			if(choosed==5){
				alert("添加成功！");
				$(".numeral").children("span").html(quanNum); //改变顶部购物车数量
				
			}else{
				alert("请选择合适的商品及服务！");
			}
			
		});
		
		
		//购买数量事件主函数
		(function(){
			
			$("#plusBtn").click(function(){
				quanNum++; //购买数量加1
				if(quanNum>1){
					$("#minusBtn").removeClass("disabled");				
				}
				if(quanNum>3){
					quanNum = 3;
					alert("哥们儿，你太贪心了吧！");
				}
				$("#quanNum").text(quanNum); //修改显示购买数量
				
			});
			
			$("#minusBtn").click(function(){
				if(quanNum>1){ 
					quanNum--; //购买数量减1
					//购物车数量为1，减按钮不可点击
					if (quanNum==1){
						$("#minusBtn").addClass("disabled");	
					}
					$("#quanNum").text(quanNum); //修改显示购买数量
				}
				
			});
			
		})();
		
	
	})();
	
	
	//配件栏相关
	(function(){
		
		var suits_index = 0; //显示的fitting_suits索引值 
		
		//左箭头事件
		$("#fittingArrowL").click(function(){
			$(".fitting_suits").animate({"left": 0}, 800);
		});
		
		//右箭头事件
		$("#fittingArrowR").click(function(){
			var liSize = $(".fitting_suits").eq(suits_index).children("li").size();
			if(liSize > 5){ //如果配件栏数量大于5个
				$(".fitting_suits").animate({"left": -602}, 800);
			}
		});
		
		$(".tab_main li").eq(0).addClass("ac");
		$(".fitting_suits").eq(0).show().siblings("ul").hide(); //默认显示第一个fitting_suits
		
		
		function tabClickFun(){
			var index = $(this).index(); //获得当前按钮索引值
			$(this).addClass("ac").siblings("li").removeClass("ac");
			$(".fitting_suits").eq(index).show().siblings("ul").hide();
			$(".fitting_suits").eq(index).css({"left":0}); //重置fitting_suits位置
			suits_index = index; //改变fitting_suits索引值 
		
		}
		
		//配件导航栏事件
		$(".tab_main li").click(tabClickFun);
		$(".tab_main li").last().off("click", tabClickFun); //取消最后一个li事件绑定
		
		
	})();


});