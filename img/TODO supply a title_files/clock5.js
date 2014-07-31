/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var degrees_slider;
$(function() {
    rotate_pie([45]);
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
            rotate_pie([roundDeg]);
        }
    }

    function rotate_pie(degrees)
    {
        $(function() {
            degrees_slider = degrees;
            $('#pie').html('');
            var paper = Raphael("pie");
            var degreeleft = 0;
            var even = 1;
            degrees.forEach(function(degree) {
                if (even == 1)
                {
                    sector(160, 160, 160, degreeleft, degreeleft + degree, paper, {"fill": "grey"});
                    even = 0;
                }
                else
                {
                    sector(160, 160, 160, degreeleft, degreeleft + degree, paper, {"fill": "black"});
                    even = 1;
                }
                console.log(degreeleft + ' - ' + (degreeleft + degree));
                degreeleft += degree;
            });

            if (even == 1)
            {
                sector(160, 160, 160, degreeleft, degreeleft + 360 - degreeleft, paper, {"fill": "grey"});
                even = 0;
            }
            else
            {
                sector(160, 160, 160, degreeleft, degreeleft + 360 - degreeleft, paper, {"fill": "black"});
                even = 1;
            }
        });
    }


    var rad = Math.PI / 180;
    function sector(cx, cy, r, startAngle, endAngle, paper, params) {
        startAngle = startAngle + 90;
        endAngle = endAngle + 90;
        var x1 = cx + r * Math.cos(-startAngle * rad),
                x2 = cx + r * Math.cos(-endAngle * rad),
                y1 = cy + r * Math.sin(-startAngle * rad),
                y2 = cy + r * Math.sin(-endAngle * rad);
        return paper.path(["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params);
    }


    $("#add_slider").click(function() {
        var maxdistance = 0;
        var prev_degree = 0;
        var new_degree = 0;
        degrees_slider.forEach(function(degree) {
            if (maxdistance < (degree - prev_degree))
            {
                maxdistance = prev_degree;
                new_degree = prev_degree + maxdistance / 2;
            }
            prev_degree = degree;
        });
        degrees_slider.push(new_degree);
        degrees_slider.sort();
        rotate_pie(degrees_slider);
    });
});