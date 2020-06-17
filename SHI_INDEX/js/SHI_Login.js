//密码中必须包含字母（区分大小写）、数字，至少8个字符，最多30个字符；
    var pwdRegex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}');
	
//$(document).ready(function(){ 
$(function() {
	//是否有记住账号密码
	var cookieuser=$.cookie('shi_users');
	if(cookieuser!=null){
		var indexs=cookieuser.indexOf('&s00');
		document.getElementById("UserEmail").value=cookieuser.substring(0,indexs);
		document.getElementById("UserPwd").value=cookieuser.substring(indexs+4);
		document.getElementById("mycheck").checked=true;
	}
	// 取消form表单默认提交数据的事件
	$('form').submit(function () {
		return false;
	});
	
}); 

	//登录按钮点击事件
    $("#mylogin").click(function(){
		var upwd=$('#UserPwd').val();
		if(upwd==""){
			document.getElementById('msgs').innerHTML="请输入密码！";
			$('#window').removeAttr('hidden');
			return;}
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
				  if(data!="-1")
				  {
					  //是否选中记住密码
					  var checks=$('#mycheck').is(':checked');
					  if(checks==true){
						  var strsecs = getsec("h10");
						  var exps = new Date();
						  exps.setTime(exps.getTime() + strsecs*1);
						  var usercheck=users.UserEmail+"&s00"+upwd;
						  $.cookie("shi_users", usercheck, { expires: exps, path: '/' });
					  }
					  //保存cookie到浏览器,设置过期时间
					  var strsec = getsec("h5");
					  var exp = new Date();
					  exp.setTime(exp.getTime() + strsec*1);
					  $.cookie("shi_token", data, { expires: exp, path: '/' });
					  //跳转主页面
					   window.location.href='SHI_NodeShow.html';
				  }
				  else{
					  document.getElementById('msgs').innerHTML="登录失败，请重新输入！";
					  $('#window').removeAttr('hidden');
					  //alert("没有此用户信息，请注册！");
				  }
			  },
			  error: function(data){
				  console.info(data);
			  }
		  });
	});

    //注册按钮点击事件
	$('#mylogin_up').click(function(){
		var pwd1=$('#UserPwd_up').val();
		var email=$('#UserEmail_up').val();
		var username=$('#UserName_up').val();
		if(username==""){
			document.getElementById('msgs').innerHTML="昵称不能为空！";
			$('#window').removeAttr('hidden');
			return;
		}
		//比对密码是否输入相同/昵称是否输入
		if(pwd1!=$('#turePwd_up').val()){
			document.getElementById('msgs').innerHTML="请确认密码是否输入一致！";
			$('#window').removeAttr('hidden');
			return;
		}
		//密码复杂度
		if(!pwdRegex.test(pwd1)){
			document.getElementById('msgs').innerHTML="密码中必须包含字母（区分大小写）、数字，至少8个字符!";
			$('#window').removeAttr('hidden');
			return;
		}
		//是否邮箱或昵称是否相同
		var exist_users={
			'UserEmail':email,
			'UserName':username,
		};
		$.ajax({
			url:'http://localhost:5782/api/Users/existemailandname',
			type:'Post',
			//dataType: 'json',
			contentType: "application/json",
			data: JSON.stringify(exist_users),
			success: function(data){
				if(data!="0"){
					document.getElementById('msgs').innerHTML=data;
					$('#window').removeAttr('hidden');
					return;
				}
				else{
					exist_users.UserPwd=md5(pwd1) ,//md5加密密码
					$.ajax({
						url:'http://localhost:5782/api/Users/UserSignUp',
						type:'Post',
						//dataType: 'json',
						contentType: "application/json",
						data: JSON.stringify(exist_users),
						success: function(data){
							if(data!="-1"){
								//保存cookie到浏览器,设置过期时间
								var strsec = getsec("h5");
								var exp = new Date();
								exp.setTime(exp.getTime() + strsec*1);
								$.cookie("shi_token", data, { expires: exp, path: '/' });
								//进入主页面
								 window.location.href='SHI_NodeShow.html';
							}
							else{
								document.getElementById('msgs').innerHTML="由于服务器延迟，注册失败，请重新注册！谢谢";
								$('#window').removeAttr('hidden');
							}
						}
					})
				}
			},
			error:function(data){
				
			}
		})
	})
	
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

    $('#btn_ok').click(function(){
		$('#window').attr('hidden','hidden');
		//一些操作
	})
	//取消
	$('#btn_cancel').click(function(){
		$('#window').attr('hidden','hidden');
	})
    //这是有设定过期时间的使用示例：
    //s20是代表20秒
    //h是指小时，如12小时则是：h12
    //d是天数，30天则：d30
    function getsec(str){
        //alert(str);
        var str1=str.substring(1,str.length)*1; 
        var str2=str.substring(0,1); 
        if (str2=="s"){
        return str1*1000;
        }else if (str2=="h"){
        return str1*60*60*1000;
        }else if (str2=="d"){
        return str1*24*60*60*1000;
        }
    }
