/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var is_locked, open_program, page, programs, recenttouch;
is_locked = false;
open_program = null;
page = 0;
//programs = ["Heart", "Map", "Develop", "Mail", "Refresh", "Poweroff"];
programs = ["Heart", "Map", "Develop", "Mail"];

recenttouch = 0;
$(function() {
    startload();
    updateClock(); // initial call
    lock();
    var swiperParent = $('.swiper-parent').swiper({
        //Your options here:
        mode: 'vertical',
        moveStartThreshold: 100,
        onSlideChangeStart: function(swiper) {
            if (swiperParent.previousIndex == 2)
            {
                $('.pagination').show();
            }
            if (swiperParent.activeIndex == 2)
            {
                $('.pagination').hide();
            }
        },
        onSlideChangeEnd: function(swiper) {
            if (swiperParent.previousIndex == 2)
            {
                //playSound($('.modal'), './audio/recording.mp3')
                swiperParent.removeLastSlide();
                swiperNested2.destroy();
            }
        },
        onTouchMove: function(swiper) {
            recenttouch = 1;
        },
        onTouchEnd: function(swiper) {
            setTimeout(stoprecent, 100);
        }
    });
    $('.mainscreen_settings').click(function() {
        if ($('.program_icon').hasClass('wiggle'))
        {
            $(".mainscreen_settings").attr('src', './img/Setting.png');
            $('.program_icon').removeClass('wiggle');
        }
        else
        {
            alert('At this point you can move the icons around using your finger. This is not implemented in this prototype.');
            $(".mainscreen_settings").attr('src', './img/Check.png');
            $('.program_icon').each(function() {
                var prevthis = this;
                setTimeout(function() {
                    $(prevthis).addClass('wiggle');
                }, Math.round(100 + Math.random() * 100 - Math.random() * 100));
            });
        }
    });

    var swiperNested = new Swiper('.swiper-nested', {
        moveStartThreshold: 0,
        pagination: '.pagination'
    });
    init_programs(programs, swiperParent, swiperNested);

    setTimeout(stopload, 1000);
});