$(function () {
// 1.游戏规则按钮点击事件处理
$('.rules').click(function () {
    $('.rule').stop().fadeIn(1000);
});
//2.游戏规则按钮关闭事件
$('.close').click(function () {
    $('.rule').stop().fadeOut(1000);
});
//3.开始游戏按钮事件
$('.start').click(function () {
    $(this).stop().fadeOut(1000);
    //进度条开始计时
    progressHandler();
     //灰太狼动画的方法
    startWolfAnimate();

});
//4.重新开始游戏按钮点击
$('.restart').click(function () {
    $('.mask').stop().fadeOut(100);
    //重新开始进度条
    progressHandler();
    //重新开始灰太狼动画
    startWolfAnimate();
});

    function progressHandler() {
        $('.progress').css({
            width:180
        });
        let timer=setInterval(function () {
            let $progressWidth=$('.progress').width();
            $progressWidth-=1;
            $('.progress').css({width:$progressWidth});
            if ($progressWidth<=0){
                clearInterval(timer);
                $('.mask').stop().fadeIn(100);
                stopAnimation();
            }
        },50);
    }


    let wolfTimer;
    function startWolfAnimate() {
        let wolf_1=['./image/h0.png','./image/h1.png','./image/h2.png','./image/h3.png','./image/h4.png','./image/h5.png','./image/h6.png','./image/h7.png','./image/h8.png','./image/h9.png'];
        let wolf_2=['./image/x0.png','./image/x1.png','./image/x2.png','./image/x3.png','./image/x4.png','./image/x5.png','./image/x6.png','./image/x7.png','./image/x8.png','./image/x9.png'];
        // 定义一个数组保存所有可能出现的位置
        let arrPos = [
            {left:"100px",top:"115px"},
            {left:"20px",top:"160px"},
            {left:"190px",top:"142px"},
            {left:"105px",top:"193px"},
            {left:"19px",top:"221px"},
            {left:"202px",top:"212px"},
            {left:"120px",top:"275px"},
            {left:"30px",top:"295px"},
            {left:"209px",top:"297px"}
        ];

        let $wolfImg=$('<img src="" class="wolfImage">');
        let posIndex=Math.round(Math.random()*8);
        let wolfType=Math.round(Math.random())==5?wolf_1:wolf_2;
        $wolfImg.css({
            position:'absolute',
            left:arrPos[posIndex].left,
            top:arrPos[posIndex].top
        });
        window.wolfIndex = 0;
        window.wolfEnd = 5;


         wolfTimer=setInterval(function () {
            if (wolfIndex>wolfEnd){
                $wolfImg.remove();
                clearInterval(wolfTimer);
                startWolfAnimate();
            }
            $wolfImg.attr('src',wolfType[wolfIndex]);
            wolfIndex++;
        },300);

        $('.container').append($wolfImg);
        gameRules($wolfImg);

    }

    function gameRules($wolfImg) {
        $wolfImg.one('click',function () {
           let $src=$(this).attr('src') ;
           let flag=$src.indexOf('h')>=0;
            window.wolfIndex=5;
            window.wolfEnd=9;
           if (flag){
               $('.score').text(parseInt($('.score').text())+10);
           }else{
               $('.score').text(parseInt($('.score').text())-10);
           }
        });
    }


    function stopAnimation() {
      $('.wolfImage').remove();
      clearInterval(wolfTimer);
    }
    
});
