var base_url = 'http://pcwin889.win.tue.nl/2id40-ws/20/';
var list_switches = 0;
var list_switches_time = new Array();

var help_function = new Object();

help_function.overview = new Object();
help_function.overview.id = 'help_overview';
help_function.overview.number = 3;

help_function.week = new Object();
help_function.week.id = 'help_week';
help_function.week.number = 1;

help_function.klok = new Object();
help_function.klok.id = 'help_klok';
help_function.klok.number = 6;

var prev_titel = '';


function get_value(val1, val2)
{// create a deferred object
    var r = $.Deferred();
    $.ajax({url: base_url + val1, dataType: 'json'}).done(function(result) {
        r.resolve(result[val2]);
    });
    return r;
}
function get_values(val1, val2)
{// create a deferred object
    var r = $.Deferred();
    $.ajax({url: base_url + val1, dataType: 'json'}).done(function(result) {
        r.resolve(result[val2]);
    });
    return r;
}

function help_function_on(titel, titel_id, hide_back)
{
    if ($('#help').is(':visible'))
    {

        $(titel_id).html(prev_titel);
        $('#help').html('');
        $('.help-pagination').html('');
        $('#help').hide();
        $('.help-pagination').hide();
        if (hide_back == true)
        {
            $('.back_div').show();
            $(titel_id).css('margin-right', '0px');
        }
    }
    else
    {
        prev_titel = $(titel_id).html();
        $('#help').html('<div class="swiper-container"><div class="swiper-wrapper"></div></div>');
        $('#help').show();
        $('.help-pagination').show();

        if (hide_back == true)
        {
            $('.back_div').hide();
            $(titel_id).html('Help (Clock)');
            $(titel_id).css('margin-right', '-100px');
        }
        else
        {
            $(titel_id).html('Help (' + prev_titel + ')');
        }
        var mySwiper = $('.swiper-container').swiper({pagination: '.help-pagination'
        });
        for (i = 1; i <= help_function[titel].number; i++) {
            var img_src = './img/help/' + help_function[titel].id + i + '.png';
            if (i !== 1 || help_function[titel].number == 1)
            {
                var newSlide = mySwiper.createSlide('<img src="' + img_src + '"></img>');
            }
            else
            {
                var newSlide = mySwiper.createSlide('<img src="' + img_src + '"></img><div id="help-slide"><span>swipe for more &lt; </span></div>');
            }
            newSlide.append();
        }
    }
}

function set_value(val1, val2, value)
{
    //create a deferred object
    var r = $.Deferred();
    var datastring = '{"' + val2 + '":"' + value + '"}';
    $.ajax({url: base_url + val1, type: 'PUT', contentType: 'application/json', data: datastring, dataType: 'json'}).done(function(result) {
        r.resolve(result);
    });
    return r;
}

function set_values(val1, value)
{
    //create a deferred object
    var r = $.Deferred();
    var datastring = value;
    $.ajax({url: base_url + val1, type: 'PUT', contentType: 'application/json', data: datastring, dataType: 'json'}).done(function(result) {
        r.resolve(result);
    });
    return r;
}

function set_to_servertemp(timeout)
{
    get_value('currentTemperature', 'current_temperature').done(function(result) {
        set_to_temp(result);
    });

    setTimeout(function() {
        set_to_servertemp(timeout);
    }, timeout);
}

function set_to_temp(temp)
{
    $('#currentTemp').html(Math.floor(temp));
    $('#currentTempSmall').html(Number(temp).after());
}
function set_target_to_temp(temp)
{
    $('#targetTempText').html(Math.floor(temp));
    $('#targetTempSmall').html(Number(temp).after());
}


function set_time(timeout)
{
    get_value('time', 'time').done(function(result) {
        $('#cur_time span').html(result);
        var tim = result.split(":");
        time.setMinutes(tim[1]);
        if (tim[1] == '00')
        {
            time.setHours(tim[0]);
            if (result == '00:00')
            {
                set_day();
            }
        }
    });
    update_switchmenu();
    setTimeout(function() {
        set_time(timeout);
    }, timeout);
}
function set_day()
{
    get_value('day', 'current_day').done(function(result) {
        var x = day2number(result);
        if (x == 0)
        {
            x = 31;
        }
        time.setDate(x);
        $('#cur_day span').html(result)
    });
}
function get_target_temp()
{// create a deferred object
    var r = $.Deferred();
    if (program_state == 'on' && manual_temp == false)
    {
        active_array = get_active_switch(day, 0);
        if (active_array[2] == 'day')
        {

            r.resolve(temp_day);
        }
        else
        {

            r.resolve(temp_night);
        }
    }
    else
    {
        get_value('currentTemperature', 'current_temperature').done(function(result) {
            r.resolve(result);
        });

    }
    return r;
}
function get_active_switch(dag, recur)
{
    if (recur > 7)
    {
        return -1;
    }

    active_program = program[dag].switch;
    var smallest = 1;
    var active_switch_id = 0;

    for (var switc in program[dag].switches)
    {
        var swit = program[dag].switches[switc];
        if (swit.state == 'on')
        {
            var tim = get_datetime(dag, swit.time);
            tim = get_time_to(tim, 3);
            if ((tim > smallest || smallest == 1) && tim <= 0)
            {
                smallest = tim;
                active_switch_id = switc;
            }
        }
    }
    tim = get_datetime(dag, program[dag].switches[active_switch_id].time);
    var result;
    if (smallest == 1)
    {
        var dag2 = day2number(dag) - 1;
        if (dag2 < 0)
        {
            dag2 = 6;
        }
        dag2 = number2day(dag2);
        result = get_active_switch(dag2, recur + 1)
    }
    else
    {
        result = [active_switch_id, dag, program[dag].switches[active_switch_id].type];
    }
    return result;
}

function create_switches(show_all)
{
    for (var entry in program)
    {
        for (var switc in program[entry].switches)
        {
            if (entry == active_array[1] && switc == active_array[0] && active_list_switch == -1 && program_state == 'on' && manual_temp == false)
            {
                active_list_switch = list_switches + 1;
            }
            var swit = program[entry].switches[switc];
            if (swit.state == 'on')
            {
                var d = get_datetime(entry, swit.time);
                add_switchmenu((swit.type == 'night'), d, show_all);
            }
        }
    }
    if (list_switches == 0)
    {
        $('#switches_menu').append('<li class="item-content switch_active" time_till_active="1" id="switch_noswitches"><div class="item-media"><i class="icon icon-noswitches"></i></div><div class="item-inner"><div class="item-title switch-time">No switches defined.</div><div class="item-after item-time-change">NOW</div></div></li>');
    }
    switches_sort();
}

function get_program()
{
// create a deferred object
    var r = $.Deferred();
    get_values('weekProgram', 'week_program').done(function(result) {
        var retur = jQuery.extend(true, {}, result.days);

        var midnight_obj = new Object();
        midnight_obj.state = 'on';
        midnight_obj.time = '00:00';
        midnight_obj.type = 'night';
        for (var entry in retur)
        {
            var is_midnight = false;
            for (var switc in retur[entry].switches)
            {
                var swit = retur[entry].switches[switc];
                if (swit.state == 'on')
                {
                    if (swit.time == '00:00')
                    {
                        is_midnight = true;
                    }
                }
            }
            if (is_midnight == false)
            {
                retur[entry].switches.push(midnight_obj);
            }
        }
        r.resolve([retur, result.days]);
    })
    return r;
}


function add_switchmenu(type, tim, all)
{
    list_switches++;
    list_switches_time[list_switches] = tim;
    if (list_switches <= 5 || all == true)
    {
        var icon = 'icon-sun';
        if (type == 1)
        {
            var icon = 'icon-moon';
        }
        var minutes = tim.getMinutes();
        if (minutes < 10)
        {
            minutes = '0' + minutes;
        }
        var item_time = number2day(tim.getDay()) + ', ' + tim.getHours() + ':' + minutes;
        var item_time_change = ''; //get_time_to(tim, true);
        if (active_list_switch != list_switches || program_state == 'off' || manual_temp == true)
        {
            $('#switches_menu').append('<li class="item-content" time_till_active="1" id="switch_' + list_switches + '"><div class="item-media"><i class="icon ' + icon + '"></i></div><div class="item-inner"><div class="item-title switch-time">' + item_time + '</div><div class="item-after item-time-change">' + item_time_change + '</div></div></li>');
        }
        else
        {
            $('#switches_menu').append('<li class="item-content switch_active" time_till_active="0" id="switch_' + list_switches + '"><div class="item-media"><i class="icon ' + icon + '"></i></div><div class="item-inner"><div class="item-title switch-time">' + item_time + '</div><div class="item-after item-time-change">NOW</div></div></li>');
        }
    }
}

function switches_sort()
{
    update_time_till_active();
    $("#switches_menu li").sort(asc_sort).appendTo('#switches_menu');
}

function update_time_till_active()
{
    $('#switches_menu li').each(function() {
        var idd = $(this).attr('id').substr(7);
        if (idd == active_list_switch && program_state == 'on' && manual_temp == false || list_switches == 0) {
            $(this).attr('time_till_active', 0);
        }
        else
        {
            var tim2 = get_time_to(list_switches_time[idd], 0);
            $(this).attr('time_till_active', tim2);
        }
    });
}
function update_switchmenu()
{
    $('#switches_menu li').each(function() {
        var idd = $(this).attr('id').substr(7);
        var tim2 = get_time_to(list_switches_time[idd], 1);
        if (tim2 == 'NOW' && program_state == 'on')
        {
            if (manual_temp == true)
            {
                $("#switch_manual").hide("slow", function() {
                    $('#switch_manual').remove();
                });
                manual_temp = false;
            }
            $('#switches_menu li.switch_active').removeClass('switch_active');
            $(this).addClass('switch_active');
            $(this).find('.item-time-change').html(tim2);
            if ($(this).find('.item-media i').hasClass('icon-sun'))
            {
                set_target_to_temp(temp_day);
            }
            else
            {
                set_target_to_temp(temp_night);
            }
            active_list_switch = idd;
            switches_sort();
        }
        if (idd != active_list_switch)
        {
            $(this).find('.item-time-change').html(tim2);
        }
    });
}

function get_datetime(day, tim)
{
    tim = tim.split(":");
    var hours = tim[0];
    var minutes = tim[1];
    var d = new Date(0, 0, day2number(day), hours, minutes, 0, 0);
    return d;
}

Number.prototype.after = function() {
    var value = parseInt(this.toString().split(".")[1], 10);
    return value ? value : 0;
}

function day2number(day) {
    switch (day)
    {
        case 'Monday':
            {
                return 1;
                break;
            }
        case 'Tuesday':
            {
                return 2;
                break;
            }
        case 'Wednesday':
            {
                return 3;
                break;
            }
        case 'Thursday':
            {
                return 4;
                break;
            }
        case 'Friday':
            {
                return 5;
                break;
            }
        case 'Saturday':
            {
                return 6;
                break;
            }
        case 'Sunday':
            {
                return 0;
                break;
            }

    }
}

function number2day(dag)
{

    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    return weekday[dag];
}

function get_time_to(date1, format)
{
    var newtime = date1 - time;
    if (format == 1)
    {
        var str;
        if (newtime < 0 || newtime > 23 * 60 * 60 * 1000 || ((newtime > 12 * 60 * 60 * 1000) && (date1.getDate() != time.getDate())))
        {
            var days_togo = date1.getDay() - time.getDay();
            if (days_togo <= 0)
            {
                days_togo += 7;
            }
            if (days_togo == 1)
            {
                str = 'Tomorrow';

            }
            else
            {
                str = 'In ' + days_togo + ' days';
            }
        }
        else {
            if (newtime == 0)
            {
                str = 'NOW';
            }
            else
            {
                var tim2;
                tim2 = new Date(newtime);
                str = 'in ';
                var minutes = tim2.getMinutes();
                var hours = tim2.getHours();
                if (hours > 1)
                {
                    str += hours + ' hours'
                }
                else
                {
                    str += minutes + ' minutes'
                }
            }
        }

        return str;
    }
    else
    {
        if (format == 0)
        {
            if ((newtime < 0))
            {
                if (date1.getDay() == 0)
                {
                    var date3 = new Date(1900, 0, 7, date1.getHours(), date1.getMinutes(), 0, 0);
                }
                else
                {
                    var date3 = new Date(0, 0, date1.getDate() + 7, date1.getHours(), date1.getMinutes(), 0, 0);
                }
                newtime = date3 - time;
            }
        }
        return newtime;
    }
}

function asc_sort(a, b) {
    return (parseInt($(b).attr('time_till_active'))) < parseInt(($(a).attr('time_till_active'))) ? 1 : -1;
}

function reinit_switches(show_all)
{
    list_switches = 0;
    list_switches_time = new Array();
    $('#switches_menu').html('');
    create_switches(show_all);
}

function switch_off_program(is_vacation, temp)
{
    manual_temp = true;
    reinit_switches(true);
    if (is_vacation == false)
    {
        $('#switches_menu').append('<li class="item-content switch_active" time_till_active="-1" id="switch_manual"><div class="item-media"><i class="icon icon-manual"></i></div><div class="item-inner"><div class="item-title switch-time">Manual Temperature (' + temp + '°). Click to remove.</div><div class="item-after item-time-change">NOW</div></div></li>');
        $("#switches_menu li").sort(asc_sort).appendTo('#switches_menu');
        $('#switch_manual').click(function() {
            set_value('weekProgramState', 'week_program_state', 'off');
            switch_on_program();
        });
    }
    else
    {
        program_state = 'off';
        $('#changes').addClass('switches_inactive');
        $('#changes_inactive').show();
    }

}

function switch_on_program()
{
    manual_temp = false;
    program_state = 'on';
    set_value('weekProgramState', 'week_program_state', 'on');
    reinit_switches(true);
    get_target_temp().done(function(result) {
        set_target_to_temp(result);
    });
    $('#changes').removeClass('switches_inactive');
    $('#changes_inactive').hide('slow');
}

function check_online(timeout)
{
    if (navigator.onLine == true)
    {
        var base_url = 'http://pcwin889.win.tue.nl/2id40-ws/20/';
        $.ajax({url: base_url + 'time', dataType: 'json'}).always(function(result) {
            if (result.hasOwnProperty('time') == false) {
                //er is geen internet!
                window.location.href = "no_internet.html";
            }
        });

    }
    else
    {
        //er is geen internet!
        window.location.href = "no_internet.html";
    }

    setTimeout(function() {
        check_online(timeout)
    }, timeout);
}