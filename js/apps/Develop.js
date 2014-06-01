load = function load() {
    $('#warning').click(function() {
        $('body').append('<div id=warning_dev><img src="./img/Warning.png"><div id="warning_devtext">Heartrate falling rapidly! You are strongly advised to call 911.</div><div id="warning_proceed">click to acknowledge</div></div>');
        $('#warning_proceed').click(function() {
            $('#warning_dev').remove();
        });
    });
};