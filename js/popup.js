$(function(){
	
	var html="";
	var timer;
	var flag = true;
	
	$.ajax({
		type:"get",
		url:"js/json/popup.json",
		async:true,
		dataType:"json",
		success:function(popup){
			
			//添加每一个二级菜单
			for(var k=0; k<popup.length; k++){
				
				html += '<div class="popup">'+
					'<div class="section clearfix">'+
						'<div class="left">'+
							'<div class="brand clearfix">';
							//循环添加brand
							for (var i=0; i<popup[k].brand.length; i++){
								html+='<a href="javascript:;">'+popup[k].brand[i]+'<i>></i></a>';
							}
						html+='</div>'+
							'<div class="nav_con">';
							//循环添加nav_con主要内容
							for (var i=0; i<popup[k].nav_con.length; i++ ){
								html += '<dl class="clearfix">'+
									'<dt><a href="javascript:;">'+popup[k].nav_con[i].title+'<i>></i></a></dt>'+
										'<dd>';
										//添加每一行具体内容
										for (var j=0; j<popup[k].nav_con[i].content.length; j++){
											html += '<a href="javascript:;">'+popup[k].nav_con[i].content[j]+'</a>'
											
										}
										html+= '</dd>'+
								'</dl>';
							}
							
						html += '</div></div>' 
								
						//判断是否有图片
						if(popup[k].pic_src){
							html += '<div class="right">'+
								'<div class="pic_top clearfix">';
								
									for(var i=0; i<popup[k].pic_src.small_pic.length; i++){
										html += '<div><a href="javascript:;"><img src="images/popup/'+popup[k].pic_src.small_pic[i]+'"></a></div>';
									}
									
								html += '</div>'+
								'<div class="pic_bot">';
									
									for(var i=0; i<popup[k].pic_src.big_pic.length; i++){
										html += '<div><a href="javascript:;"><img src="images/popup/'+popup[k].pic_src.big_pic[i]+'"></a></div>';
									}
									
							html += '</div></div>';
							
						}
								
					//标签补全
					html += '</div></div>';
			
			}
			
			$(".all_popup").prepend(html);
			$(".popup").hide();
			
			//二级菜单鼠标悬浮事件
			$(".popup").mouseover(function(e){
				var index = $(this).index();
				$(this).show().siblings().hide();
				$(".list li").eq(index).addClass("active");
				e.stopPropagation(); //阻止事件冒泡
				
			});
			//二级菜单鼠标离开事件
			$(".popup").mouseout(function(e){
				var index = $(this).index();
				$(".popup").hide();
				$(".list li").eq(index).removeClass("active");
				e.stopPropagation(); //阻止事件冒泡
			});
			
			
		}
	});
	
	
	//一级菜单鼠标悬浮事件
	$(".list li").mouseover(function(e){
		var index = $(this).index();
		if(flag){
			
			$(this).addClass("active");
			$(".popup").eq(index).show().siblings().hide();	
		}
		e.stopPropagation(); //阻止事件冒泡
		
	});

	//一级菜单鼠标离开事件
	$(".list li").mouseout(function(e){
		$(this).removeClass("active");
		$(".popup").hide();
		e.stopPropagation(); //阻止事件冒泡
	});

	
	
});

