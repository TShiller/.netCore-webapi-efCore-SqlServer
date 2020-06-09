
//$(document).ready(function(){ 
$(function() {
	// 取消form表单默认提交数据的事件
	$('form').submit(function () {
		return false;
	});
	//密码中必须包含大小写 字母、数字、特称字符，至少8个字符，最多30个字符；
	var pwdRegex = new RegExp('(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{6,20}');
	//登录按钮点击事件
    $("#mylogin").click(function(){
		var upwd=$('#UserPwd').val();
		  //获取登录信息
		  var users = {
					   "UserEmail": $('#UserEmail').val(),
					   "UserPwd":md5(upwd) ,//md5加密
					   };
		  $.ajax({
			  url: 'http://localhost:5782/api/Users/UserLogin',
			  type: 'POST',
			  //dataType: 'json',
			  contentType: "application/json",
			  data: JSON.stringify(users),
			  success: function(data){
				  console.info(data);
			  },
			  error: function(data){
				  console.info(data);
				  alert(data.toString());
			  }
		  });
	});

    //去注册按钮：切换为注册界面
	$("#up_show").click(function(){
		$(".login_in").toggle();
		$(".login_up").toggle();
	})
	
	//去登录按钮：切换为登录界面
	$("#in_show").click(function(){
		$(".login_in").toggle();
		$(".login_up").toggle();
	})
}); 
