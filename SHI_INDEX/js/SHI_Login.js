
$(document).ready(function(){ 
    $("#mylogin").click(function(){
	  //获取登录信息
	  var email=$('#inputEmail').val();
	  var pwd=$('#inputPassword').val();
	  $.ajax({
	  	url:'http://localhost:5782/Users/UserLogin',
	  	type:"POST",
	  	async:false,
		dataType:"json",
		contenttype:"application/json",
	  	data:{"name":email,"pwd":pwd},
	  	success:function(req){
	  		console.info(req);
	  	        //请求成功时处理
	  	},
	  	error:function(){
	  	        //请求出错处理
	  	    }
	  })
	});
}); 
