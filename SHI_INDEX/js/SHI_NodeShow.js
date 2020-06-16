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