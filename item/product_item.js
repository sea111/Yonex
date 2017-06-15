$(function(){
	wpCommon.viewShow();
	var productIdArr=[];//存放产品id的数组
	var productNameArr=[];//存放产品名的数组
	//参数对比的数据  	
	var paraObj=JSON.parse(localStorage.getItem("paraObj"));//从pk获取		
	var productId=paraObj.productId;
	var productName=paraObj.productName;	
	var orgId=paraObj.orgId;
	//判断是从pk获取还是添加产品获取
   	if(localStorage.getItem("productId")){
   		//从添加产品获取
   		var productIds=JSON.parse(localStorage.getItem("productId"))	  
   		productId=productId.concat(productIds);
   		var productNames=JSON.parse(localStorage.getItem("productName"))
   		productName=productName.concat(productNames)
   	}
//	var productName=['aaaa','bbbb']
	//获取产品名
	for(var i=0;i<productName.length;i++){
		var html='';
		html+='<li class="product-item">'
		html+='<i class=""></i>'
		html+='<a href="javascript:;">'
		html+='<span class="cont">'+productName[i]+'</span>'
		html+='<span class="delete-btn">删除</span>'
		html+='</a>'
		html+='</li>'
		$(".cont-list").append(html)
	}
	//侧滑显示删除按钮
	var expansion = null; //是否存在展开的list
	var container = document.querySelectorAll('.list li');
	for(var i = 0; i < container.length; i++) {
		var x, y, X, Y, swipeX, swipeY;
		container[i].addEventListener('touchstart', function(event) {
			x = event.changedTouches[0].pageX;
			y = event.changedTouches[0].pageY;
			swipeX = true;
			swipeY = true;
//			if(expansion) { //判断是否展开，如果展开则收起   不写的话删除时就不会回退
//				expansion.className = "product-item";
//			}
		});
		//移动端兼容 加上后可以左滑
		$('body').on('touchmove',function(){
//			alert($(event.target).html());
		})
		container[i].addEventListener('touchmove', function(event) {
			X = event.changedTouches[0].pageX;
			Y = event.changedTouches[0].pageY;
			// 左右滑动
			if(swipeX && Math.abs(X - x) - Math.abs(Y - y) > 0) {
				// 阻止事件冒泡	
				event.stopPropagation();
				if(X - x > 10) { //右滑		
					event.preventDefault();
					this.className = "product-item"; //右滑收起
				}
				if(x - X > 10) { //左滑
					event.preventDefault();
					this.className = "swipeleft"; //左滑展开
					expansion = this;
				}
				swipeY = false;
			}
			// 上下滑动
			if(swipeY && Math.abs(X - x) - Math.abs(Y - y) < 0) {
				swipeX = false;
			}
		});
//		container[i].addEventListener('touchend',function(){
//			$(container[i]).off('touchmove');
//			$(container[i]).off('touchend');
//		})
	}
	//返回上一页
	$("#back").click(function(){
		WPBridge.callMethod('JsInvokeNative','wpH5Back',{},'');
	})
	//点击勾选,判断勾选的长度
	$(".product-item").click(function(){
		$(this).find('i').toggleClass('selected');
		var len=$('.product-item .selected').length;
		if(len>=0 && len<2){
			$(".compare").css("background","#ccc")
		}else if(len>=2 && len<3){
			$(".compare").css("background","#cb9418")
		}else if(len>3){
//			alert("对不起，最多只支持3款产品对比");
			$(this).find('i').toggleClass('selected');
			WPBridge.callMethod("JsInvokeNative", "wpShowToast", {
                    message: "对不起，最多只支持3款产品对比"
                },
            function() {})
		}
	})
	//删除
	$(".list").on("click",".delete-btn",function(){
		$(this).parents("li").remove();
		localStorage.removeItem("productName");
		localStorage.removeItem("productId");
	/*	localStorage.removeItem(paraObj.productName);
		localStorage.removeItem(paraObj.productId)*/
	})
	//点击开始对比
	$("#begin-compare").click(function(){
		//判断是否有勾选，没有不跳转
		if($(".selected").length){
			//有没有选中勾选
			for(var i=0;i<$(".selected").length;i++){
				productIdArr.push($('.product-item').eq(i).attr('id'));
				productNameArr.push($('.product-item').eq(i).find('.cont').html());
			}
			//存储产品id和产品名字
			localStorage.setItem("productIdArr",JSON.stringify(productIdArr));
			localStorage.setItem("productIdNameArr",JSON.stringify(productNameArr));
			window.location.href="parameter.html"
		}
	})
	//点击增加
	$("#add").click(function(){					
		window.location.href="add_product.html"
	})
	
})