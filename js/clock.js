/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var degrees_slider, sliders = 0, day, reversed, degreesbyid = new Object(), prev_degree_sliders, timeout = 0, offsetX, newdegree, sliderWidth, sliderHeight, moveobj, moveid, offsetY, $container, move, radius, $slider, $degrees;
reversed = 1;
function klok_load(dag)
{
    degrees_slider = new Array()
    sliders = 0
    reversed = 1
    degreesbyid = new Object()
    prev_degree_sliders = 0
    timeout = 0
    offsetX = 0
    newdegree = 0
    sliderWidth = 0
    sliderHeight
    moveobj = 0
    moveid = 0
    offsetY = 0
    $container = 0
    move = 0
    radius = 0
    $slider = 0
    $degrees = 0;

    day = dag;
    setTimeout(function() {
        $('.klok-title').html(dag);
        $container = $('#rotationSliderContainer');
        $slider = $('.rotationSlider');
        $degrees = $('#rotationSliderDegrees');
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



        $('#clock_apply').click(sliders_apply_clicked);
        $('#clock_reverse').click(function() {
            reversed = !reversed;
            rotate_pie(degrees_slider);
        });


        move = false
        moveid = 0;
        newdegree = 0;
        sliderWidth = 50;
        sliderHeight = sliderWidth;
        radius = $container.width() / 2;
        sliders = 0;

        var degrees_slider_tmp = new Array();
        for (var switc in program[dag].switches)
        {
            var swit = program[dag].switches[switc];
            if (swit.state == 'on')
            {
                reversed = (swit.type == 'day');
                var degg = time2deg(swit.time);
                if (degg == 0)
                {
                    degg = 360;
                }
                add_slider(degg);
                degrees_slider_tmp.push(degg);
            }
        }
        degrees_slider_tmp.sort(function(a, b) {
            return a - b
        });

        rotate_pie(degrees_slider_tmp);

        var today = new Date();
        var dd = today.getDate();

        if (dd < 10) {
            dd = '0' + dd
        }
        $('#clock_date').html(dd);
    }, 500);
}
function sliders_apply_clicked(e)
{
    var buttons = [
        {
            text: 'Apply to:',
            label: true
        },
        {
            text: day,
            onClick: function() {
                sliders_apply([day]);
            }
        },
        {
            text: 'Multiple days...',
            onClick: function() {
                select_days();
            }
        },
        {
            text: 'Cancel',
            red: true
        },
    ];
    myApp.actions(buttons);
}
function select_days()
{
    myApp.modal({
        text: '<div class="list-block smart-select-list-days"><ul><li><div class="item-divider">select days</div></li><li><label class="label-checkbox item-content"><input type="checkbox" name="checkbox-1406307247818" value="Monday" checked=""><div class="item-media"><i class="icon icon-form-checkbox"></i></div><div class="item-inner"><div class="item-title">Monday</div></div></label></li><li><label class="label-checkbox item-content"><input type="checkbox" name="checkbox-1406307247818" value="Tuesday"><div class="item-media"><i class="icon icon-form-checkbox"></i></div><div class="item-inner"><div class="item-title">Tuesday</div></div></label></li><li><label class="label-checkbox item-content"><input type="checkbox" name="checkbox-1406307247818" value="Wednesday"><div class="item-media"><i class="icon icon-form-checkbox"></i></div><div class="item-inner"><div class="item-title">Wednesday</div></div></label></li><li><label class="label-checkbox item-content"><input type="checkbox" name="checkbox-1406307247818" value="Thursday"><div class="item-media"><i class="icon icon-form-checkbox"></i></div><div class="item-inner"><div class="item-title">Thursday</div></div></label></li><li><label class="label-checkbox item-content"><input type="checkbox" name="checkbox-1406307247818" value="Friday"><div class="item-media"><i class="icon icon-form-checkbox"></i></div><div class="item-inner"><div class="item-title">Friday</div></div></label></li><li><label class="label-checkbox item-content"><input type="checkbox" name="checkbox-1406307247818" value="Saturday"><div class="item-media"><i class="icon icon-form-checkbox"></i></div><div class="item-inner"><div class="item-title">Saturday</div></div></label></li><li><label class="label-checkbox item-content"><input type="checkbox" name="checkbox-1406307247818" value="Sunday"><div class="item-media"><i class="icon icon-form-checkbox"></i></div><div class="item-inner"><div class="item-title">Sunday</div></div></label></li></ul></div>',
        buttons: [
            {
                text: 'Apply',
                onClick: function() {
                    var dagen = new Array();
                    $('.smart-select-list-days ul li').each(function() {
                        if ($(this).find('input').prop('checked') == true)
                        {
                            dagen.push($(this).find('input').val());
                        }
                    });
                    sliders_apply(dagen);
                }
            },
        ]
    });
}

function sliders_apply(dagen)
{

    dagen.forEach(function(dag) {
        program[dag].switches = new Array(10);
        var even = reversed;
        var i = -1;
        var object;
        degrees_slider.forEach(function(degree) {
            if (even == 1)
            {
                i++;
                object = {"state": "on", "type": "night"};
                object.time = to_time(degree);
                program[dag].switches[i] = (object);
                even = 0;
            }
            else
            {
                i++;
                object = {"state": "on", "type": "day"};
                object.time = to_time(degree);
                program[dag].switches[i] = object;
                even = 1;
            }
        });
        while (i < 9)
        {
            i++;
            if (even == 1)
            {
                program[dag].switches[i] = {"state": "off", "type": "night", "time": "00:00"};
                even = 0;
            }
            else
            {
                program[dag].switches[i] = {"state": "off", "type": "day", "time": "00:00"};
                even = 1;
            }

        }
    });

    var json = new Object;
    json.week_program = new Object;
    json.week_program.days = program;
    json.week_program.state = program_state;
    var json_text = JSON.stringify(json, null, 2);
    $('#test').html(json_text);

    set_values('WeekProgram', json_text).done(function(result)
    {
        //   alert(result);
    });
}
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
            $(this).removeClass('touchslider_active');
            degreesbyid[moveid] = newdegree;
            $degrees.html('');
        }
        else
        {
            move = true;
            moveobj = this;
            moveid = $(moveobj).attr('id').substr(15);
            //if (moveid !== '1')
            if (true)
            {
                $(this).removeClass('touchslider_active');
                prev_degree_sliders = new Array();
                for (i = 1; i < (sliders + 1); i++) {
                    if (i != moveid)
                    {
                        prev_degree_sliders.push(degreesbyid[i]);
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
                if ($(this).hasClass('topslider_inactive'))
                {
                    $(this).removeClass('topslider_inactive');
                    degrees_slider.push(360);
                    rotate_pie(degrees_slider);
                }
                else
                {
                    $(this).addClass('topslider_inactive');
                    degrees_slider.pop();
                    rotate_pie(degrees_slider);
                }
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
        var even = reversed;
        degrees.forEach(function(degree) {
            if (even == 1)
            {
                sector(radius, radius, radius, degreeprev, degree, paper, {"fill": "grey"});
                even = 0;
            }
            else
            {
                sector(radius, radius, radius, degreeprev, degree, paper, {"fill": "black"});
                even = 1;
            }
            console.log(degreeprev + ' - ' + (degree) + ' : ' + even);
            degreeprev = degree;
        });

        console.log(degreeprev + ' - ' + (360) + ' : ' + even);
        if (even == 1)
        {
            sector(radius, radius, radius, degreeprev, 360, paper, {"fill": "grey"});
        }
        else
        {
            sector(radius, radius, radius, degreeprev, 360, paper, {"fill": "black"});
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
    if (degree == 0)
    {
        degree = 360;
    }
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
    if (sliders < 10)
    {
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

        if (sliders == 10)
        {
            $('#add_slider').addClass('button_disabled');
            myApp.popover('.popover-switches', this);
        }
    }
    else
    {

        myApp.popover('.popover-switches', this);
    }

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
        /*if (deg1 == 0 || deg1 == 360 || deg2 == 0 || deg2 == 360)
         {
         
         }*/
        if (sliders <= 2) {

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
}

function klok_load_loc()
{
    offsetX = $('#rotationSliderContainer').offset().left;
    offsetY = $('#rotationSliderContainer').offset().top;
}
function to_time(deg)
{
    var tim = (deg / 360) * 1440;
    var d = new Date(0, 0, 0, 0, tim, 0, 0);
    hours = pad(d.getHours());
    minutes = pad(d.getMinutes());
    return(hours + ':' + minutes);
}

function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}

function time2deg(tim)
{
    var tim = tim.split(":");
    return ((tim[0] * 60 * 60 + tim[1] * 60) / (60 * 60 * 24)) * 360;
}