$(function(){
	
	$.ajax({
		type:"get",
		url:"js/json/page.json",
		async:true,
		dataType:"json",
		success:function(page){
			
			pageFun();
			adFun();
			
			//楼层方法
			function pageFun(){
				//$(".page").each(function(pNUm){
					
					//楼层循环
					for(var k=0; k<11; k++){
						
						var thisPage="";
						//每一楼right_list循环
						for (var j=0; j<page[k].detial.length; j++){
						
							thisPage += '<div class="right_list">';
								//每一选项卡中内容个数
								for (var i=0; i<page[k].detial[0].title.length; i++){ 
									thisPage += '<div class="show">'+
									'<a href="javascript:;">'+
										'<div class="pic"><img src="images/page/'+page[k].detial[j].pic_src[i]+'"></div>';
										//判断是否有标题
										if( (page[k].detial[j].title[i] != "") && (page[k].detial[j].content[i] != "") ){
											thisPage += '<div class="font">'+
												'<h4>'+page[k].detial[j].title[i]+'</h4>'+
												'<span>'+page[k].detial[j].content[i]+'</span>'+
												"</div>";
										}
									//标签补充	
									thisPage +=	'</a></div>';
									
								}
							//标签补充
							thisPage += '</div>';
						
						}
						
						//删除对应楼层的right_temp
						$(".p_content").eq(k).children(".right_temp").remove(); 
						//插入至对应楼层中
						$(".p_content").eq(k).append(thisPage); 
						
						//遍历每一楼中的每一个right_list
						$(".p_content").eq(k).children(".right_list").each(function(){
							
							for(var i=0; i<page[k].detial[0].classAdd.length; i++){
								//给每一个卡片添加对应的类
								$(this).find(".show").eq(i).addClass(page[k].detial[0].classAdd[i]);
							}
						
						});
						
					}
				
				//});
				
			}
			
			
			//插入底部广告
			function adFun(){
				var index=0; //索引
				//楼层循环
				for (var j=0; j<11; j++){
					var ads=""; //初始化
					ads += '<ul class="p_logos clearfix">';
					//广告数量循环
					for(var i=0; i<10 ;i++){
						ads += '<li><a href="javascript:;"><img src="images/page/'+page[j].ads[i]+'"></a></li>';
						
					}
					ads += '</ul>';
					$(".p_content").eq(index).after(ads); //将底部广告插入对应的楼层中
					index++; //索引加1
					
				}
				//去除每一个p_logos列表最后一个右边框
				$(".p_logos").each(function(){
					$(this).find("li").last().addClass("spec"); 
				});
			}
			
			
			//选项卡相关事件
			$(".page").each(function(i){
				var _this = $(this);
				$(this).find(".right_list").hide(); //全部隐藏
				$(this).find(".right_list").eq(0).show(); //默认显示第一个
				
				$(this).find(".nav li").mouseover(function(){
					//console.log($(this));
					var index = $(this).index();
					$(this).addClass("ac").siblings().removeClass("ac");
					_this.find(".right_list").hide(); //全部隐藏
					_this.find(".right_list").eq(index).show();
				});
			});
			
			
		}
		
		
	});
	
	
	
	
//	$(".p_title .nav li").click(function(){
//		var index = $(this).index();
//		$(this).addClass("ac").siblings().removeClass("ac");
//		$(this).parent().children(".right_list").hide();
//		$(this).parent().children(".right_list").eq(index).show();
//		
//	});
	
	
	
	
});



