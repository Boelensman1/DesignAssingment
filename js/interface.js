/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var is_locked, open_program, page, programs, recenttouch;
is_locked = false;
open_program = null;
page = 0;
programs = ["Heart", "Map", "Develop"];
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
    var swiperNested = new Swiper('.swiper-nested', {
        moveStartThreshold: 0,
        pagination: '.pagination'
    });
    init_programs(programs, swiperParent, swiperNested);

    setTimeout(stopload, 1000);
});