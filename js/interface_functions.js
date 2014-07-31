
function lock()
{
    if (is_locked == true)
    {
//the device is already locked
        exit;
    }
    is_locked = true;
}
function updateClock() {
    var now = new Date(),
            minutes = now.getMinutes(),
            hours = now.getHours();
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    var time = hours + ':' + minutes;
    $('.top_time').html(time);
    // call this function again in 1000ms
    setTimeout(updateClock, 1000);
}

function init_programs(programs, swiperParent, swiperNested)
{
    var curpage = 1;
    var curpos = 0;
    programs.forEach(function(program) {
        curpos++;
        if (curpos > 4)
        {
            curpos = 1;
            curpage++;
            //Create new instance of slide:
            var program_page = '<div class="progam_container" id=content' + curpage + '><div class="progam_row progam_row_top"></div><div class="progam_row progam_row_bot"></div></div>';
            var progam_slide = swiperNested.createSlide(program_page);
            progam_slide.append() // - new slide will be added as the last slide of slider after all existing slides
        }
        var where = '#content' + curpage;
        if (curpos <= 2) {
            where = where + ' .progam_row_top';
        }
        else
        {
            where = where + ' .progam_row_bot';
        }
        $(where).append('<div class="program_icon program_' + curpos + '" id="program_' + program + '"><img src="./img/icons/' + program + '.png" alt="' + program + '"></div>');
    });
    $('.program_icon').click(function() {
        if (recenttouch == 0)
        {
            startload();
            //Create new instance of slide:
            var id = this.id.substr(8);
            $.get('./apps/' + id + '.html')
                    .done(function(data) {
                        var status_div, swipe, content, settings, progam_slide;
                        status_div = '<div class="topbar"> <div class="top_time">10:15</div><img src="./img/Setting.png" alt="setting" class="program_settings"></div>';
                        settings = '<div class="back face app_settings" id="program_divsettings_' + id + '">loading...</div>';
                        content = status_div + '<div class="flip"><div class="card"><div id="program_div_' + id + '" class="front face content_div">' + data + '</div>' + settings + '</div></div></div></div></div>';
                        progam_slide = swiperParent.createSlide(content);
                        progam_slide.append() // - new slide will be added as the last slide of slider after all existing slides

                        updateClock();
                        load = function load()
                        {
                            alert('error, load not defined');
                        };
                        flip_show = function flip_show() {
                        };
                        flip_hide = function flip_show() {
                        };
                        load_settings = function flip_show() {
                        };
                        $.getScript('./js/apps/' + id + '.js', function() {
                            load();
                        });
                        $('.program_settings').click(function() {
                            if ($('.card').hasClass('flipped'))
                            {
                                flip_show();
                                $(".program_settings").attr('src', './img/Setting.png');
                                $('.card').removeClass('flipped');
                            }
                            else
                            {
                                flip_hide();
                                $(".program_settings").attr('src', './img/Back.png');
                                $('.card').addClass('flipped');
                            }
                        });
                        swiperParent.swipeNext();
                        stopload();

                        $.get('./apps/' + id + '_settings.html')
                                .done(function(data) {
                                    $('#program_divsettings_' + id).html(data);
                                    load_settings();
                                });
                    });
        }
        recenttouch = 0;
    })
}

function startload()
{
    console.log('started loading');
    $("body").addClass("loading");
}
function stopload()
{
    $("body").removeClass("loading");
}
function stoprecent()
{
    recenttouch = 0;
}

function playSound(el, soundfile) {
    if (el.mp3) {
        if (el.mp3.paused)
            el.mp3.play();
        else
            el.mp3.pause();
    } else {
        el.mp3 = new Audio(soundfile);
        el.mp3.play();
    }
}

function PauseSound(el, soundfile) {
    if (el.mp3) {
        if (el.mp3.paused)
        {
            alert('abc');
        }
        else
        {
            el.mp3.pause();
        }
    }
}