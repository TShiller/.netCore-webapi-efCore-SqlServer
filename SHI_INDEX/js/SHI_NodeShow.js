$(function(){
	//1、读取cookie：
    var cookies=$.cookie('shi_token');
	if(cookies==null){
		//window.history.back(-1);//返回上一页
		// window.location.href='SHI_Login.html';
	}
	var screenHeight=$(window).height();//获取屏幕高度
	var heights=screenHeight-56;//减去导航的高度
	$('#zuodaohang').height(heights);
	$('#zuoliebiao').height(heights);
	$('#edits').height(heights);
	$('#erji').width($('#geren').width());
	$('#erji li').width($('#geren').width());
})

//收缩左导航
$('#shousuo').click(function(){
	$('#shou_in').toggle();
	$('#shou_up').toggle();
	if($('#zuodaohang').width()<50){
		$('#zuodaohang').width('17%');
		$('#shousuo').width('17%');
	}
	else{
		$('#zuodaohang').width(40);
		$('#shousuo').width(40);
	}
})

layui.use('tree', function(){
    var tree = layui.tree;
   
    //渲染
    var inst1 = tree.render({
      elem: '#test1'  //绑定元素
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
