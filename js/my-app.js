// Initialize your app
var myApp = new Framework7({animateNavBackIcon: true});
// Export selectors engine
var $$ = Framework7.$;
// Add views
var view1 = myApp.addView('#view-1', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
var view2 = myApp.addView('#view-2', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
var view3 = myApp.addView('#view-3', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
}); /*
 var view4 = myApp.addView('#view-4', {
 // Because we use fixed-through navbar we can enable dynamic navbar
 dynamicNavbar: true
 });
 */
document.ontouchmove = function(e) {
    e.preventDefault()
};
$('#changes').on({'touchmove': allowscroll});
function allowscroll(e) {
    e.stopPropagation();
}

$('#dev_close').click(function() {
    closewebapp();
});
$('#dev_reload').click(function() {
    location.reload();
});
myApp.showPreloader();
$(function() {

    setTimeout(function() {
        $('.button-help').click(function() {
            help_function_on($('.view.active .page_title').attr('tit'), $('.view.active .page_title'), false);
        });

        if (day == '')
        {
            window.location.href = "no_internet.html";
        }
        check_online(2000)
        set_day();
        get_target_temp().done(function(result) {
            set_target_to_temp(result);
            create_switches(true);
            set_time(200);
            myApp.hidePreloader();
        });
    }, 2000);
    set_to_servertemp(100);
});

//set some variables
day = '';
program_state = 'on';
manual_temp = false;
temp_day = 0;
temp_night = 0;
time = 0;
active_list_switch = -1;
active_array = new Array();
program = '';
r_program = '';
get_value('WeekProgramState', 'week_program_state').done(function(result) {
    program_state = result;
    if (program_state == 'off')
    {
        $('#changes').addClass('switches_inactive');
        $('#changes_inactive').show();
    }
});
get_value('day', 'current_day').done(function(result) {
    day = result;
    get_value('time', 'time').done(function(result) {
        time = get_datetime(day, result);
    });
});

get_value('dayTemperature', 'day_temperature').done(function(result) {
    temp_day = result;
});
get_value('nightTemperature', 'night_temperature').done(function(result) {
    temp_night = result;
});

get_program().done(function(result) {
    program = result[0];
    r_program = result[1];
});


$('#changes_inactive').click(function() {
    switch_on_program();
});
$('#debug_day').change(function() {
    set_value('day', 'current_day', this.value).done(function(result) {
        set_day();
        reinit_switches(true);
    });
});
$('#debug_time').change(function() {

//{"current_day":"Saturday"}
    set_value('time', 'time', this.value);
    var tim = (this.value).split(":");
    time.setMinutes(tim[1]);
    time.setHours(tim[0]);
    reinit_switches(true);
});

$('#set_temps').click(function() {

    myApp.modal({title: 'Set Day/Night Temperatures',
        text: '<div class="daynight-set-container"><div class="day-set_text">Temp. Day<input type="text" id="temp_input_day" class="modal-prompt-input" value="' + temp_day + '"></div>\n\
                <div class="night-set_text">Temp. Night<input type="text" id="temp_input_night" class="modal-prompt-input" value="' + temp_night + '"></div></div>',
        buttons: [
            {text: 'Cancel'}, {text: 'Ok',
                onClick: function(modal) {
                    var tmp_day = $(modal).find('#temp_input_day').val();
                    var tmp_night = $(modal).find('#temp_input_night').val();
                    if (tmp_day <= 30 && tmp_day >= 5 && tmp_night <= 30 && tmp_night >= 5)
                    {
                        temp_day = tmp_day;
                        temp_night = tmp_night;

                        set_value('dayTemperature', 'day_temperature', temp_day);
                        set_value('nightTemperature', 'night_temperature', temp_night);

                        get_target_temp().done(function(result) {
                            set_target_to_temp(result);
                        });
                    }
                    else
                    {
                        myApp.alert('Please choose a temperature between 5 and 30 degrees.', 'Invalid temperature.');
                    }
                }
            }
        ]})
})

$('#targetTempupArrow').click(function() {
    var temp = $('#targetTempText').html() + '.' + String(parseInt($('#targetTempSmall').html()));
    temp++;
    if (temp > 30)
    {
        temp = 30;
    }
    set_target_to_temp(temp);
    set_value('currentTemperature', 'current_temperature', temp);
    switch_off_program(false, temp);
});
$('#targetTempdownArrow').click(function() {

    var temp = $('#targetTempText').html() + '.' + String(parseInt($('#targetTempSmall').html()));
    temp--;
    if (temp < 5)
    {
        temp = 5;
    }
    set_target_to_temp(temp);
    set_value('currentTemperature', 'current_temperature', temp);
    switch_off_program(false, temp);
});
$$('#targetTemp').on('click', function() {
    var temp = $('#targetTempText').html() + '.' + String(parseInt($('#targetTempSmall').html()));
    var is_checked = '';
    if (program_state == 'off')
    {
        is_checked = 'checked';
    }
    myApp.modal({title: 'Set Custom Temperature',
        text: '<div class="temp-set-container"><div class="temp-set_text">Temperature<input type="text" id="temp_input" class="modal-prompt-input" value="' + temp + '"></div>\n\
 <div class="vac-mode"><div class="item-title label">Vacation mode</div><div class="item-input"><label class="label-switch"><input type="checkbox" id="vacation_input" ' + is_checked + '><div class="checkbox"></div></label></div></div></div>',
        buttons: [
            {text: 'Cancel'}, {text: 'Ok',
                onClick: function(modal) {
                    temp = $(modal).find('#temp_input').val();
                    var vacation = $(modal).find('#vacation_input').is(':checked');
                    if (temp <= 30 && temp >= 5)
                    {
                        if (vacation)
                        {
                            set_value('weekProgramState', 'week_program_state', 'off');
                        }
                        else
                        {
                            switch_on_program();
                        }
                        set_target_to_temp(temp);
                        switch_off_program(vacation, temp);
                        set_value('currentTemperature', 'current_temperature', temp);
                    }
                    else
                    {
                        myApp.alert('Please choose a temperature between 5 and 30 degrees.', 'Invalid temperature.');
                    }
                }
            }
        ]})
});
$$('.klok-link').on('click', function() {
    myApp.showIndicator();
    klok_load($(this).find('.item-title').html());
});

$('.button-week-bottom').click(function() {
    if ($('#view-2 .pages .page').length != 1)
    {
        view2.goBack();
    }
})

$('.button-rest').click(function() {
    if ($('#view-2 .pages .page').length != 1)
    {
        $('#view-2 .pages .page').each(function() {
            if ($(this).attr('data-page') == 'index-2')
            {
                $(this).removeClass('page-on-left');
            }
            else
            {
                $(this).remove();
            }
        });
        view2.destroy();
        view2 = myApp.addView('#view-2', {
            // Because we use fixed-through navbar we can enable dynamic navbar
            dynamicNavbar: true
        });
    }
})