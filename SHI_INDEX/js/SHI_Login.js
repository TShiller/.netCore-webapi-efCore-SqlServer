
$(document).ready(function(){ 
    $("#mylogin").click(function(){
	  //获取登录信息
	  var email=$('#inputEmail').val();
	  var pwd=$('#inputPassword').val();
	 //  $.ajax({
	 //  	url:'http://localhost:5782/Users/UserLogin',
	 //  	type:"POST",
	 //  	async:false,
		// dataType:"json",
		// contenttype:"application/json",
	 //  	data:{"name":email,"pwd":pwd},
	 //  	success:function(req){
	 //  		console.info(req);
	 //  	        //请求成功时处理
	 //  	},
	 //  	error:function(){
	 //  	        //请求出错处理
	 //  	    }
	 //  })
	  var setData={name:email,pwd:pwd};
	  $.ajax({
	      type: 'POST',
	      url: 'http://localhost:5782/Users/UserLogin',
	      dataType: 'json',
	      contentType: "application/json",
	      data: JSON.stringify(setData),
	      success: function(data){
	          alert('数据加载成功');
	      },
	      error: function(xhr, type){
	          alert('数据加载失败');
	      }
	  });
	});
}); 
