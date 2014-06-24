var currenttemp, targettemp;
currenttemp = 22;
targettemp = 20;
nextswitchtype = 0;
switches = 0;
$(function() {
    setTimeout('fake_temp(5000)', 5000);
    set_currenttemp(currenttemp);
    set_targettemp(targettemp);

    $('#upArrowContainer').click(function() {
        set_targettemp(targettemp + 1);
    });

    $('#downArrowContainer').click(function() {
        set_targettemp(targettemp - 1);
    });

    var d1 = new Date()
    var d2 = new Date(d1);
    d2.setHours(d1.getHours() + 1);
    add_tempswitch(d2);
    d2.setHours(d1.getHours() + 3);
    d2.setMinutes(d1.getMinutes() + 16);
    add_tempswitch(d2);
    d2.setHours(d1.getHours() + 6);
    d2.setMinutes(d1.getMinutes() + 30);
    add_tempswitch(d2);

    d2.setHours(d1.getHours() + 12);
    d2.setMinutes(d1.getMinutes() + 10);
    add_tempswitch(d2);
});
function add_tempswitch(time)
{
    nextswitchtype = !nextswitchtype;
    switches++;
    if (nextswitchtype == 0)
    {
        $('#switchListContainer').append('<div id="switch' + switches + '" class="switch night"></div>');
    }
    else
    {
        $('#switchListContainer').append('<div id="switch' + switches + '" class="switch day"></div>');
    }
    $('#switch' + switches).append('<div class="switch_img_div"></div><div class="switch_text_div"><span></span></div>');
    setTimeout('resize_tempswitch(' + switches + ')', 1);

    $('#switch' + switches + ' .switch_text_div span').html(format_date(time));

}
function resize_tempswitch(switches)
{
    height = $('#switch' + switches).height();
    $('#switch' + switches + ' .switch_img_div').height(height);
    $('#switch' + switches + ' .switch_img_div').width(height);
    $('#switch' + switches + ' .switch_text_div').height(height);
    $('#switch' + switches + ' .switch_text_div').width($('#switch' + switches).width() - height);
    $('#switch' + switches + ' .switch_text_div').textfill({maxFontPixels: -1});

}
function set_currenttemp(temp)
{
    currenttemp = temp;
    $('#currentTempText').width($('#currentTemp').width());
    var height = $('#currentTemp').height();
    $('#currentTempText').height(height);
    $('#currentTempText').css({'line-height': height + 'px'});
    $('#currentTempText span').html(temp + '');
    $('#currentTempText').textfill({maxFontPixels: -1});
    var size = parseInt($('#currentTempText span').css('font-size')) * 0.9;
    $('#currentTempText span').css({'font-size': size + 'px'});
}
function set_targettemp(temp)
{
    targettemp = temp;
    $('#targetTemp').width($('#targetTemp').width());
    var height = $('#targetTemp').height();
    $('#targetTempText').height(height);
    $('#targetTempText').css({'line-height': height + 'px'});
    $('#targetTempText span').html(temp + '');
    $('#targetTempText').textfill({maxFontPixels: -1});
    var size = parseInt($('#targetTempText span').css('font-size')) * 0.9;
    $('#targetTempText span').css({'font-size': size + 'px'});
}

function fake_temp(timeout)
{
    if (currenttemp > targettemp)
    {
        set_currenttemp(currenttemp - 1);
    }
    else if (currenttemp < targettemp)
    {
        set_currenttemp(currenttemp + 1);
    }

    setTimeout('fake_temp(' + timeout + ')', timeout);
}

function format_date(date)
{
    var formattedDate = new Date(date);
    var m = ('0' + formattedDate.getMinutes()).slice(-2);
    var h = ('0' + formattedDate.getHours()).slice(-2);

    return (h + ':' + m);
}