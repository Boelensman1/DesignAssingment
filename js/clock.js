$(function() {
    var clock = Snap('#clock');
    var hours1 = clock.rect(239, 230, 2, 165).attr({fill: "#282828", transform: "r" + 10 * 30 + "," + 240 + "," + 240});
    var minutes1 = clock.rect(239, 220, 2, 210).attr({fill: "#282828", transform: "r" + 10 * 6 + "," + 240 + "," + 240});
    var seconds1 = clock.rect(240, 20, 1, 240).attr({fill: "#ff6400"});
    var middle1 = clock.circle(240, 240, 2).attr({fill: "#ff6400"});

// CLOCK Timer
    var updateTime = function(_clock, _hours, _minutes, _seconds) {
        var currentTime, hour, minute, second;
        currentTime = new Date();
        second = currentTime.getSeconds();
        minute = currentTime.getMinutes();
        hour = currentTime.getHours();
        hour = (hour > 12) ? hour - 12 : hour;
        hour = (hour == '00') ? 12 : hour;

        if (second == 0) {
            //got to 360deg at 60s
            second = 60;
        } else if (second == 1 && _seconds) {
            //reset rotation transform(going from 360 to 6 deg)
            _seconds.attr({transform: "r" + 0 + "," + 240 + "," + 240});
        }
        if (minute == 0) {
            minute = 60;
        } else if (minute == 1) {
            _minutes.attr({transform: "r" + 0 + "," + 240 + "," + 240});
        }
        _hours.animate({transform: "r" + hour * 30 + "," + 240 + "," + 240}, 200, mina.elastic);
        _minutes.animate({transform: "r" + minute * 6 + "," + 240 + "," + 240}, 200, mina.elastic);
        if (_seconds) {
            _seconds.animate({transform: "r" + second * 6 + "," + 240 + "," + 240}, 500, mina.elastic);
        }
    }
    var updateSeconds = function(_clock, _seconds) {
        var currentTime, second;
        currentTime = new Date();
        second = currentTime.getSeconds();

        if (second == 0) {
            //got to 360deg at 60s
            second = 60;
        } else if (second == 1 && _seconds) {
            //reset rotation transform(going from 360 to 6 deg)
            _seconds.attr({transform: "r" + 0 + "," + 240 + "," + 240});
        }
        if (_seconds) {
            _seconds.attr({transform: "r" + second * 6 + "," + 240 + "," + 240});
        }
    }

//update the clock
    setInterval(function() {
        updateTime(clock, hours1, minutes1, seconds1);
    }, 1000);
});