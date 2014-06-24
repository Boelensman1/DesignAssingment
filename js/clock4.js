$(function() {

    rotate_pie(45);

    var $container = $('#rotationSliderContainer');
    var $slider = $('.rotationSlider');
    var $degrees = $('#rotationSliderDegrees');
    document.ontouchstart = function(e) {
        e.preventDefault();
    }

    $('body').on({'touchmove': touchmove_func});
    $('.rotationSlider').on({'touchstart': touchstart_func});
    $('.rotationSlider').on({'touchend': touchend_func});
    $('body').on({'mousemove': touchmove_func});
    $('.rotationSlider').on({'mousedown': touchend_func});
    $('.rotationSlider').on({'mouseup': touchstart_func});
    var move = false
    var movid = 0;
    var sliderWidth = $slider.width();
    var sliderHeight = $slider.height();
    var radius = $container.width() / 2;
    var deg = 0;
    X = Math.round(radius * Math.sin(deg * Math.PI / 180));
    Y = Math.round(radius * -Math.cos(deg * Math.PI / 180));
    $('#rotationSlider_1').css({left: X + radius - sliderWidth / 2, top: Y + radius - sliderHeight / 2});
    var deg = 45;
    X = Math.round(radius * Math.sin(deg * Math.PI / 180));
    Y = Math.round(radius * -Math.cos(deg * Math.PI / 180));
    $('#rotationSlider_2').css({left: X + radius - sliderWidth / 2, top: Y + radius - sliderHeight / 2});
    function touchstart_func(e)
    {
        if (move == true)
        {
            move = false;
            $(this).css({background: '#A64B00'});
        }
        else
        {
            move = true;
            moveid = this;
            $(this).css({background: '#FFFFFF'});
        }
    }
    function touchend_func(e) {
//move = false;
//$(this).css({background: '#A64B00'});
    }
    function touchmove_func(e)
    {
        if (move == true)
        {
            if (typeof e.pageX === "undefined" || typeof e.pageY === "undefined") {
                var mPos = {x: e.originalEvent.touches[0].pageX, y: e.originalEvent.touches[0].pageY};
            }
            else
            {
                var mPos = {x: e.pageX, y: e.pageY};
            }
            /*
             if ($(e.target).is('#rotationSliderContainer'))
             var mPos = {x: e.offsetX, y: e.offsetY};
             else
             var mPos = {x: e.target.offsetLeft + e.offsetX, y: e.target.offsetTop + e.offsetY};*/
            var atan = Math.atan2(mPos.x - radius, mPos.y - radius);
            deg = -atan / (Math.PI / 180) + 180; // final (0-360 positive) degrees from mouse position 


            // for attraction to multiple of 90 degrees
            var distance = Math.abs(deg - (Math.round(deg / 90) * 90));
            if (distance <= 5)
                deg = Math.round(deg / 90) * 90;
            if (deg == 360)
                deg = 0;
            X = Math.round(radius * Math.sin(deg * Math.PI / 180));
            Y = Math.round(radius * -Math.cos(deg * Math.PI / 180));
            $(moveid).css({left: X + radius - sliderWidth / 2, top: Y + radius - sliderHeight / 2});
            var roundDeg = Math.round(deg);
            $degrees.html(roundDeg + '&deg;');
            $('#imageRotateDegrees').val(roundDeg);

            rotate_pie(roundDeg);

        }
    }

    function rotate_pie(deg)
    {
        $('#pie').html('');
        var r = Raphael("pie");
        if (deg <= 180)
        {
            r.piechart(160, 160, 160, [360 - deg, deg], {colors: ['#F00', '#0F0']});
            $('#pie').css({'transform': 'rotate(' + (180 + deg / 2) + 'deg)'});
        }
        else
        {
            r.piechart(160, 160, 160, [360 - deg, deg], {colors: ['#0F0', '#F00']});
            $('#pie').css({'transform': 'rotate(' + (deg / 2) + 'deg)'});
        }
    }

});