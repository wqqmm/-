$(function () {
    banner();
    productBoxBackground();
    mouseenterShow();
    scrollBottom();
    cityTab();
    clickClose();
    schedule();
    slideSelect();
    $(document).click(function(){
        $(".cityWrapper").hide();
        $("#schedule-box").hide();
    });
});
//轮播图
var banner =function(){
    var count = 0;
    $(".arrow-right").click(function () {
        count++;
        if(count == $(".banner a").length){
            count = 0;
        }
        $(".banner a").eq(count).css("display","block").siblings("a").css("display","none");
    });
    $(".arrow-left").click(function () {
        count--;
        if(count == -1){
            count = $(".banner a").length - 1;
        }
        console.log(count);
        $(".banner a").eq(count).css("display","block").siblings("a").css("display","none");
    })
    //clearInterval(timer);
    timer = setInterval(function () {
        $(".arrow-right").trigger("click");
    }, 10000);
}
 //设置zzk_product_box2的背景
var productBoxBackground = function(){
    var productBox2 = $(".zzk_product_box2 li");
    var productBox4 = $(".zzk_product_box4 li");
    for(i=0;i<productBox2.length;i++){
        $(productBox2[i]).css("background-image","url(images/good"+(i+1)+".jpg)");
    }
    for(i=0;i<productBox4.length;i++){
        $(productBox4[i]).css("background-image","url(images/hot"+(i+1)+".jpg)");
    }
}
/**
 * 进入一个元素，另一个元素显示，离开隐藏
 @param {String} {String}
 @static
 @return
 */
var showHide = function(enterClass,target){
    var enterClass = $(enterClass);
    var target = $(target);
    enterClass.mouseenter(function(){
        target.show();
    })
    enterClass.mouseleave(function(){
        target.hide();
    });
};
var mouseenterShow = function(){
    showHide(".place",".nation");
    showHide(".phone",".download");
    showHide(".language",".language-content")
    showHide(".wechat",".wechat>img")
    showHide(".contact",".contact>div")
 };
//页面滚动一定距离显示固定定位内容
var scrollBottom = function(){
    $(window).scroll(function(){
        if($(window).scrollTop() >400 ){
            $(".fixed").show(500);
        }else {
            $(".fixed").hide(500);
        }
    })
}
/**
 * 点击子元素关闭父元素
 @param {String} {String}
 @static
 @return
 */
var closeElement = function(closeClass,target){
    $(closeClass).on("click", function(){
        $(target).hide();
    });
};
var clickClose = function(){
    closeElement(".message .close",".message");
    closeElement(".city-wrapper .close",".city-wrapper");
}
//城市选择栏实现
var cityTab = function(){
    var txtCity = $(".txtCity");
    var cityWrapper = $(".city-wrapper");
    $(".city-tab-item").mouseenter(function () {
        var idx = $(this).index();
        $(".main").eq(idx).addClass("selected").siblings().removeClass("selected");
    });
    $(".city-products span").click(function () {
        txtCity.attr("value",$(this).text());
        cityWrapper.hide();
        event.stopPropagation();
     });
    txtCity.click(function(){
        event.stopPropagation();
        cityWrapper.show();
    });

}
//日历隐藏
var schedule = function(){
    $(".checkin").click(function () {
        event.stopPropagation();
        $("#schedule-box").show();
    });
}
//产品区块滑动函数
var slideSelect = function(){
    var slideRight = $(".slide-right");
    var slidetLeft = $(".slidet-left");
    //var slide =  $(".zzk_product_slide ul");
    var contentList = [];
    var listbox = $(".listbox");
    for(i=0;i<listbox.length;i++){
        contentList[i] = {
            index : i,
            num : $(listbox[i]).children().length,
            left : slidetLeft[i],
            right : slideRight[i],
            listbox : listbox[i],
            distance : parseInt($(listbox[i]).children().css("margin-right"))+$(listbox[i]).children().width()
        }
        //console.log(contentList[i]);
    }
    var slideAnimate = function(obj,distance,count){
        $(obj).animate({left:(-(distance)*count)+"px"});
    }
    for(j=0;j<contentList.length;j++){
        for(var key in contentList[j]){
            var left = contentList[j]["left"];
            var right = contentList[j]["right"];
            var distance = contentList[j]["distance"];
            var num = contentList[j]["num"];
            var listbox = contentList[j]["listbox"];
        }
        var a = slideClick();
        a(left,right,distance,num,listbox);
        //console.log(count);
    }
    function slideClick (){
        var count = 0;
       return function (left,rigth,distance,num,listbox){
           $(rigth).click(function(){
               count++;
               if(count>0){
                   $(left).show();
                   if((distance*count)<(distance*num-1152)){
                       slideAnimate(listbox,distance,count);
                   }else{
                       slideAnimate(listbox,distance,count);
                       $(rigth).hide();
                   }
           }});
           $(left).click(function(){
               count--;
               if(count<10){
                   $(rigth).show();
                   if(count<=0){
                       slideAnimate(listbox,distance,count);
                       $(left).hide();

                   }else{
                       slideAnimate(listbox,distance,count);
                   }
               }});
           }
       }
    }























