$(function(){
	//1、读取cookie：
    var cookies=$.cookie('shi_token');
	if(cookies==null){
		//window.history.back(-1);//返回上一页
		//window.location.href='SHI_Login.html';
	}
	var screenHeight=$(window).height();//获取屏幕高度
	var heights=screenHeight-56;//减去导航的高度
	$('#zuodaohang').height(heights);
	$('#zuoliebiao').height(heights);
	$('#edits').height(heights);
	$('#erji').width($('#geren').width());
	$('#erji li').width($('#geren').width());
	
	//初始化编辑器
	tinymce.init({
			selector: 'textarea',
			height: this.height,
			width:this.width,
		  })
})

//收缩左导航
$('#shousuo').click(function(){
	$('#shou_in').toggle();
	$('#shou_up').toggle();
	if($('#zuodaohang').width()<50){
		$('#zuodaohang').width('17%');
		$('#shousuo').width('17%');
		$('#edits').width('62%');
	}
	else{
		$('#zuodaohang').width(40);
		$('#shousuo').width(40);
		$('#edits').width('75%');
	}
})

//新建笔记点击事件
$('#addword').click(function(){
	layer.open({
	  content: '请选择创建类型：'
	  ,btnAlign: 'l'
	  ,anim: 3
	  ,time:3000
	  ,btn: ['新建笔记', '新建文件夹', '模板笔记']
	  ,yes: function(index, layero){
	    //按钮【按钮一】的回调
		layer.close(index);
	  }
	  ,btn2: function(index, layero){
	    //按钮【按钮二】的回调
	    
	    //return false 开启该代码可禁止点击该按钮关闭
	  }
	  ,btn3: function(index, layero){
	    //按钮【按钮三】的回调
	    //layer.alert('新建模板笔记暂未对普通会员开放！', {icon: 1});
	  }
	  ,cancel: function(){ 
	    //右上角关闭回调
	    //return false 开启该代码可禁止点击该按钮关闭
	  }
	});
})

//常用文档点击事件
$('#changyong').click(function(){
	returnxuanxiancolor();
	//设置点击的选项卡的颜色
	$("#changyong").css("backgroundColor","#83a5ee");
	$("#changyong ul li i").css("color","white");
	$("#changyong").css("color","white");
	// layer.alert('酷毙了', {icon: 1});
})

//云密码管理点击事件
$('#pwdmange').click(function(){
	returnxuanxiancolor();
	//设置点击的选项卡的颜色
	$("#pwdmange").css("backgroundColor","#83a5ee");
	$("#pwdmange ul li i").css("color","white");
	$("#pwdmange").css("color","white");
})

//收藏文档点击事件
$('#shoucang').click(function(){
	returnxuanxiancolor();
	//设置点击的选项卡的颜色
	$("#shoucang").css("backgroundColor","#83a5ee");
	$("#shoucang ul li i").css("color","white");
	$("#shoucang").css("color","white");
})

//我的文件夹点击事件
$('#Myflie').click(function(){
	returnxuanxiancolor();
	//设置点击的选项卡的颜色
	$("#Myflie").css("backgroundColor","#83a5ee");
	$("#Myflie ul li i").css("color","white");
	$("#Myflie").css("color","white");
	//菜单显示：左导航没有收缩时
	if($('#zuodaohang').width()>50){
		$('#testtree').toggle();
		$('#fileicon_in1').toggle();
		$('#fileicon_in2').toggle();
	}
	
})

//回收站点击事件
$('#recyclebin').click(function(){
	returnxuanxiancolor();
	//设置点击的选项卡的颜色
	$("#recyclebin").css("backgroundColor","#83a5ee");
	$("#recyclebin ul li i").css("color","white");
	$("#recyclebin").css("color","white");
})

//分享文件点击事件
$('#shareflie').click(function(){
	returnxuanxiancolor();
	//设置点击的选项卡的颜色
	$("#shareflie").css("backgroundColor","#83a5ee");
	$("#shareflie ul li i").css("color","white");
	$("#shareflie").css("color","white");
})

//其他选项卡的图标颜色、字体颜色、背景颜色变回原来
function returnxuanxiancolor(){
	$(".xuanxian").css("backgroundColor","#f5f5f5");
	$(".xuanxian").css("color","#000000");
	$(".xuanxian ul li i").css("color","#95999C");
}
	

// 加载树形菜单
layui.use('tree', function(){
    var tree = layui.tree;
   
    //渲染
    var inst1 = tree.render({
      elem: '#testtree'  //绑定元素
	  ,edit: ['update'] //操作节点的图标
      ,data: [{
        title: '江西' //一级菜单
        ,children: [{
          title: '南昌' //二级菜单
          ,children: [{
            title: '高新区' //三级菜单
            //…… //以此类推，可无限层级
          }]
        }]
      },{
        title: '陕西' //一级菜单
        ,children: [{
          title: '西安' //二级菜单
        }]
      }]
    });
  });
