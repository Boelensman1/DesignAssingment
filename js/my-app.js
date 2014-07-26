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
$(function() {
    setTimeout(function() {
        set_day();
        get_target_temp().done(function(result) {
            set_target_to_temp(result);
            create_switches(true);
            set_time(200);
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
    program = result;
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
$('#targetTempupArrow').click(function() {
    var temp = parseInt($('#targetTempText').html());
    if (temp < 30)
    {
        temp++;
        set_target_to_temp(temp);
        //set_value('weekProgramState', 'week_program_state', 'off');
        set_value('currentTemperature', 'current_temperature', temp);
    }
    switch_off_program(false, temp);
});
$('#targetTempdownArrow').click(function() {

    var temp = parseInt($('#targetTempText').html());
    if (temp > 5)
    {
        temp--;
        set_target_to_temp(temp);
        //set_value('weekProgramState', 'week_program_state', 'off');
        set_value('currentTemperature', 'current_temperature', temp);
    }
    switch_off_program(false, temp);
});
$$('#targetTemp').on('click', function() {
    var temp = parseInt($('#targetTempText').html()) + (parseInt($('#targetTempSmall').html()) * 0.1);
    myApp.modal({title: 'Set Custom Temperature',
        text: 'Temperature?<input type="text" id="temp_input" class="modal-prompt-input" value="' + temp + '">\n\
 <div class="item-title label">Vacation mode</div><div class="item-input"><label class="label-switch"><input type="checkbox" id="vacation_input"><div class="checkbox"></div></label></div>',
        buttons: [
            {text: 'Cancel'}, {text: 'Ok',
                onClick: function(modal) {
                    temp = $(modal).find('#temp_input').val();
                    var vacation = $(modal).find('#vacation_input').is(':checked');
                    if (temp <= 30 && temp >= 5)
                    {
                        set_target_to_temp(temp);
                        switch_off_program(vacation, temp);
                        if (vacation)
                        {
                            set_value('weekProgramState', 'week_program_state', 'off');
                        }
                        set_value('currentTemperature', 'current_temperature', temp);
                    }
                    else
                    {
                        myApp.alert('Please choose a temperature between 5 and 30 degrees.');
                    }
                }
            }
        ]})
});
$$('.klok-link').on('click', function() {
    klok_load($(this).find('.item-title').html());
});