/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var degrees_slider, sliders = 0, degreesbyid = new Object(), prev_degree_sliders, timeout = 0, offsetX, offsetY;
function klok_load(dag)
{
    $('.klok-title').html(dag);
}
function klok_load_loc()
{
    offsetX = $('#rotationSliderContainer').offset().left;
    offsetY = $('#rotationSliderContainer').offset().top;
}
$(function() {

    rotate_pie([45, 360]);
    var $container = $('#rotationSliderContainer');
    var $slider = $('.rotationSlider');
    var $degrees = $('#rotationSliderDegrees');
    offsetX = $('#rotationSliderContainer').offset().left;
    offsetY = $('#rotationSliderContainer').offset().top;
    document.ontouchstart = function(e) {
        e.preventDefault();
    }
    $('#add_slider').click(add_slider_click);
    $('#add_slider').on({'touchend': add_slider_click});

    $('body').on({'touchmove': touchmove_func});
    $('body').on({'mousemove': touchmove_func});
    $('#rotationSliderContainer').click(delete_slider);
    $('#rotationSliderContainer').on({'touchend': delete_slider});
    var move = false
    var moveid = 0;
    var moveobj;
    var newdegree = 0;
    var sliderWidth = 50;
    var sliderHeight = sliderWidth;
    var radius = $container.width() / 2;
    add_slider(360);
    add_slider(45);
    function touchstart_func(e)
    {
        klok_load_loc();
        if (timeout == 0)
        {
            timeout = 1;
            setTimeout(function() {
                timeout = 0;
            }, 1);
            if (move == true)
            {
                move = false;
                $(this).css({background: '#A64B00'});
                degreesbyid[moveid] = newdegree;
                $degrees.html('');
            }
            else
            {
                move = true;
                moveobj = this;
                moveid = $(moveobj).attr('id').substr(15);
                if (moveid !== '1')
                {
                    $(this).css({background: '#FFFFFF'});
                    prev_degree_sliders = new Array();
                    for (i = 1; i < (sliders + 1); i++) {
                        if (i != moveid)
                        {
                            prev_degree_sliders.push(degreesbyid[i]);
                            //console.log(degreesbyid[i]);
                        }
                        else
                        {
                            newdegree = degreesbyid[i];
                        }
                    }
                }
                else
                {
                    move = false;
                }
            }
        }
        else
        {
            //timeout = 0;
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
            var atan = Math.atan2(mPos.x - radius - offsetX, mPos.y - radius - offsetY);
            deg = -atan / (Math.PI / 180) + 180; // final (0-360 positive) degrees from mouse position 


            // for attraction to multiple of 90 degrees
            /*var distance = Math.abs(deg - (Math.round(deg / 90) * 90));
             if (distance <= 5)
             deg = Math.round(deg / 90) * 90;
             if (deg == 360)
             deg = 0;*/
            X = Math.round(radius * Math.sin(deg * Math.PI / 180));
            Y = Math.round(radius * -Math.cos(deg * Math.PI / 180));
            $(moveobj).css({left: X + radius - sliderWidth / 2, top: Y + radius - sliderHeight / 2});
            var roundDeg = Math.round(deg);
            $degrees.html(to_time(roundDeg));
            $('#imageRotateDegrees').val(roundDeg);
            newdegree = roundDeg;
            degrees_temp = prev_degree_sliders.slice(0);
            degrees_temp.push(roundDeg);
            degrees_temp.sort(function(a, b) {
                return a - b
            });
            rotate_pie(degrees_temp);
        }
    }

    function rotate_pie(degrees)
    {
        $(function() {
            degrees_slider = degrees.slice(0);
            //degrees.shift();
            $('#pie').html('');
            var paper = Raphael("pie");
            //var degreeleft = 0;
            var degreeprev = 0;
            var even = 1;
            degrees.forEach(function(degree) {
                if (even == 1)
                {
                    sector(160, 160, 160, degreeprev, degree, paper, {"fill": "grey"});
                    even = 0;
                }
                else
                {
                    sector(160, 160, 160, degreeprev, degree, paper, {"fill": "black"});
                    even = 1;
                }
                //console.log(degreeprev + ' - ' + (degree) + ' : ' + even);
                degreeprev = degree;
            });
            if (even == 1)
            {
                sector(160, 160, 160, degreeprev, 360, paper, {"fill": "grey"});
            }
            else
            {
                sector(160, 160, 160, degreeprev, 360, paper, {"fill": "black"});
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

    function add_slider(degree)
    {
        sliders++;
        for (i = 1; i <= sliders; i++)
        {
            //console.log(i);
            if (!degreesbyid.hasOwnProperty(i))
            {
                var new_sliderid = i;
                break;
            }
        }
        $container.append('<div id="rotationSlider_' + (new_sliderid) + '" class="rotationSlider"></div>');
        var deg = degree;
        X = Math.round(radius * Math.sin(deg * Math.PI / 180));
        Y = Math.round(radius * -Math.cos(deg * Math.PI / 180));
        $('#rotationSlider_' + (sliders)).css({left: X + radius - sliderWidth / 2, top: Y + radius - sliderHeight / 2});
        degreesbyid[new_sliderid] = degree;
        $('.rotationSlider').on({'touchstart': touchstart_func});
        $('.rotationSlider').on({'mouseup': touchstart_func});
        $('.rotationSlider').on({'touchend': touchend_func});
        $('.rotationSlider').on({'mousedown': touchend_func});
    }
    function add_slider_click(e) {
        var maxdistance = 0;
        var prev_degree = 0;
        var new_degree1, new_degree2;
        degrees_slider.forEach(function(degree) {
            if (maxdistance < (degree - prev_degree))
            {
                maxdistance = (degree - prev_degree);
                new_degree1 = Math.round(prev_degree + maxdistance / 3);
                new_degree2 = Math.round(prev_degree + maxdistance / 1.5);
                //console.log('+ max:' + maxdistance + ' prev:' + prev_degree + ' new1:' + new_degree1 + ' new2:' + new_degree2);
            }
            prev_degree = degree;
        })
        final_degree = degrees_slider[0];
        if (degrees_slider[0] == 0)
        {
            final_degree = 360;
        }
        if (maxdistance < (final_degree - prev_degree))
        {
            maxdistance = (final_degree - prev_degree);
            new_degree1 = Math.round(prev_degree + maxdistance / 3);
            new_degree2 = Math.round(prev_degree + maxdistance / 1.5);
            //console.log('+ max:' + maxdistance + ' prev:' + prev_degree + ' new1:' + new_degree1 + ' new2:' + new_degree2);
        }
        degrees_slider.push(new_degree1);
        degrees_slider.push(new_degree2);
        degrees_slider.sort(function(a, b) {
            return a - b
        });
        add_slider(new_degree1);
        add_slider(new_degree2);
        rotate_pie(degrees_slider);
    }
    function delete_slider(e)
    {
        if (timeout == 0 && move == false)
        {
            if (typeof e.pageX === "undefined" || typeof e.pageY === "undefined") {
                var mPos = {x: e.originalEvent.touches[0].pageX, y: e.originalEvent.touches[0].pageY};
            }
            else
            {
                var mPos = {x: e.pageX, y: e.pageY};
            }

            var atan = Math.atan2(mPos.x - radius - offsetX, mPos.y - radius - offsetY);
            deg = -atan / (Math.PI / 180) + 180; // final (0-360 positive) degrees from mouse position 
            deg = Math.round(deg);
            var prev_degree = 0;
            var deg1, deg2, deg1_id, deg2_id, i;
            degrees_slider.forEach(function(degree) {
                //console.log('deg: ' + deg + ' prev_degree:' + prev_degree + ' degree:' + degree)

                if (deg > prev_degree && deg < degree)
                {
                    deg1 = prev_degree;
                    deg2 = degree;
                    deg1_id = deg_to_id(deg1);
                    deg2_id = deg_to_id(deg2);
                }
                prev_degree = degree;
            });
            if (deg1 == 0 || deg1 == 360 || deg2 == 0 || deg2 == 360)
            {

            }
            else
            {
                var r = confirm('sure you want to delete ' + to_time(deg1) + '-' + to_time(deg2) + '?');
                if (r == true) {

                    //console.log('---');
                    degrees_slider = new Array();
                    for (var index in degreesbyid) {
                        if (degreesbyid.hasOwnProperty(index)) {
                            console.log(index + ' ' + deg1_id + ' ' + deg2_id)
                            if (index != deg1_id && index != deg2_id)
                            {
                                degrees_slider.push(degreesbyid[index]);
                                //console.log('+ ' + degreesbyid[index]);
                            }
                            else
                            {
                                //console.log('- ' + degreesbyid[index]);
                                delete degreesbyid[index];
                            }
                        }
                    }
                    //console.log('---');
                    sliders -= 2;
                    $('#rotationSlider_' + (deg1_id)).remove();
                    $('#rotationSlider_' + (deg2_id)).remove();
                    degrees_slider.sort(function(a, b) {
                        return a - b
                    });
                    rotate_pie(degrees_slider);
                }
            }
        }
    }


    function deg_to_id(deg)
    {
        for (var index in degreesbyid) {
            if (degreesbyid.hasOwnProperty(index)) {
                if (deg == degreesbyid[index])
                {
                    return index;
                }
            }
        }
    }}
);
function to_time(deg)
{
    time = (deg / 360) * 1440;
    var d = new Date(2014, 1, 1, 0, time, 0, 0);
    hours = pad(d.getHours());
    minutes = pad(d.getMinutes());
    return(hours + ':' + minutes);
}

function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}