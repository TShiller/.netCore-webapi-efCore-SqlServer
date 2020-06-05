$(function() {
$('#myCarousel').carousel({
    interval: 2500
})
function selectImg(){
                    var screenWidth=$(window).width();//获取屏幕宽度
					var screenHeight=$(window).height();//获取屏幕宽度
					console.info(screenWidth);
                    $('#myCarousel .carousel-inner .item img').each(function(index,item){
                        var $item = $(item);//因为传递的item是dom对象，要把dom对象改为jQuery对象
						if(screenWidth<660){
							$item.height(screenHeight/2);
						}
						else	{
							$item.height(screenHeight);
						}
                    });
                }
				
$(window).on('resize',selectImg).trigger('resize');//触发的是resize事件，不是事件处理程序selectImg
});
