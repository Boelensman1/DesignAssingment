load = function load() {
    var swiperNested2 = new Swiper('.swiper-nested2', {
        moveStartThreshold: 0,
        pagination: '.pagination2'
    });

    $('.avg_input').each(function() {
        $(this).html(Math.round(40 + Math.random() * 20 - Math.random() * 20) + 'bpm');
    });

    init_click_avg();

    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });
    // generate an array of random data
    var random_data = [], random_data1 = [], time = (new Date()).getTime(), i;

    for (i = -99999; i <= 0; i++) {
        random_data.push([
            time + i * 1000,
            Math.round(70 + Math.random() * 20 - Math.random() * 20)
        ]);
        random_data1.push([
            time + i * 1000,
            Math.round(40 + Math.random() * 20 - Math.random() * 20)
        ]);
    }
    // Create the chart
    create_chart('Heartrate_chart', random_data);
    create_chart2('Bloodpressure_chart', random_data, random_data1);
    create_chart('Conductivity_chart', random_data);
    create_chart('Bodytemp_chart', random_data);
};

load_settings = function load_settings()
{
    $('.heart_warning').click(function() {
        $('.heart_warning').css('border', "4px white solid");
        $(this).css('border', "4px blue solid");
        if ($(this).css('background-color') != 'rgb(255, 0, 0)')
        {
            $('#warnings_settings').html('Warn when the value differs this much<br><button id="thresh_off" class="thresh">off</button><button class="thresh_on" style="color:blue;">5%</button><button class="thresh_on">10%</button><button class="thresh_on">20%</button><button class="thresh_on">50%</button>');
        }
        else
        {
            $('#warnings_settings').html('Warn when the value differs this much<br><button id="thresh_off" class="thresh" style="color:blue;">off</button><button class="thresh_on">5%</button><button class="thresh_on">10%</button><button class="thresh_on">20%</button><button class="thresh_on">50%</button>');

        }
        var prev = this;
        $('#thresh_off').click(function() {
            $(prev).css('background-color', 'red');
            $('.thresh_on').css('color', 'black');
            $(this).css('color', 'blue');
            update_warnings();
        });
        $('.thresh_on').click(function() {
            $(prev).css('background-color', 'green');
            $('#thresh_off').css('color', 'black');
            $('.thresh_on').css('color', 'black');
            $(this).css('color', 'blue');
            update_warnings();
        });
    });
}




flip_show = function flip_show()
{
    $('.pagination2').show();
}

flip_hide = function flip_show()
{
    $('.pagination2').hide();
}

function update_warnings()
{
    var text = '';
    $('#heart_warnings_set').html('');
    $('.heart_warning').each(function() {
        if ($(this).css('background-color') != 'rgb(255, 0, 0)') {
            text = text + $(this).html() + ', ';
        }
    });
    if (text == '')
    {
        $('#heart_warnings_set').html('None');
    }
    else
    {
        $('#heart_warnings_set').html(text.substr(0, text.length - 2));
    }
}
function create_chart(div_name, data)
{
    $('#' + div_name).highcharts('StockChart', {
        credits: {
            enabled: false
        },
        tooltip: {
            enabled: false
        },
        chart: {
            events: {load: function() {

                    // set up the updating of the chart each second
                    var series = this.series[0];
                    setInterval(function() {
                        var x = (new Date()).getTime(), // current time
                                y = Math.round(70 + Math.random() * 20 - Math.random() * 20);
                        series.addPoint([x, y], true, true);
                    }, 1000);
                }
            }
        },
        rangeSelector: {
            buttonSpacing: 100,
            buttonTheme: {// styles for the buttons
                fill: 'white',
                r: 8,
                style: {
                    color: '#039',
                    fontWeight: 'bold',
                    fontSize: '20pt'
                }, states: {
                    hover: {
                        fill: 'white'
                    },
                    select: {
                        fill: 'white'
                    }
                }
            },
            labelStyle: {
                color: 'white'
            },
            buttons: [{
                    count: 1,
                    type: 'minute',
                    text: '1Min'
                }, {
                    count: 5,
                    type: 'minute',
                    text: '5Min'
                }, {
                    count: 1,
                    type: 'day',
                    text: 'Day'
                }, {
                    type: 'year',
                    count: 1,
                    text: 'Year'
                }, {
                    type: 'all',
                    text: 'All'
                }],
            inputEnabled: false,
            selected: 0
        },
        exporting: {
            enabled: false
        },
        series: [{
                name: 'Random data',
                data: data
            }]
    });
}


function init_click_avg()
{
    $('#switch_avg_heart').click(function() {
        startload();
        $('.avg_input').each(function() {
            $(this).html(Math.round(20 + Math.random() * 10 - Math.random() * 10) + '°C');
        });
        $('#avg_what').html('Ambient Temperature');
        $(this).attr('id', 'switch_avg_tmp');
        $(this).html('Switch to "Heart Rate"');
        init_click_avg();
        stopload();
    });
    $('#switch_avg_tmp').click(function() {
        startload();
        $('.avg_input').each(function() {
            $(this).html(Math.round(40 + Math.random() * 20 - Math.random() * 20) + 'bpm');
        });
        $('#avg_what').html('Heart Rate');
        $(this).attr('id', 'switch_avg_heart');
        $(this).html('Switch to "Ambient Temp."');
        init_click_avg();
        stopload();
    });
}

function create_chart2(div_name, data, data1)
{
    $('#' + div_name).highcharts('StockChart', {
        credits: {
            enabled: false
        },
        tooltip: {
            enabled: false
        },
        chart: {
            events: {load: function() {

                    // set up the updating of the chart each second
                    var series = this.series[0];
                    setInterval(function() {
                        var x = (new Date()).getTime(), // current time
                                y = Math.round(70 + Math.random() * 20 - Math.random() * 20);
                        series.addPoint([x, y], true, true);
                    }, 1000);
                    // set up the updating of the chart each second
                    var series1 = this.series[1];
                    setInterval(function() {
                        var x = (new Date()).getTime(), // current time
                                y = Math.round(40 + Math.random() * 20 - Math.random() * 20);
                        series1.addPoint([x, y], true, true);
                    }, 1000);
                }
            }
        },
        rangeSelector: {
            buttonSpacing: 100,
            buttonTheme: {// styles for the buttons
                fill: 'white',
                r: 8,
                style: {
                    color: '#039',
                    fontWeight: 'bold',
                    fontSize: '20pt'
                }, states: {
                    hover: {
                        fill: 'white'
                    },
                    select: {
                        fill: 'white'
                    }
                }
            },
            labelStyle: {
                color: 'white'
            },
            buttons: [{
                    count: 1,
                    type: 'minute',
                    text: '1Min'
                }, {
                    count: 5,
                    type: 'minute',
                    text: '5Min'
                }, {
                    count: 1,
                    type: 'day',
                    text: 'Day'
                }, {
                    type: 'year',
                    count: 1,
                    text: 'Year'
                }, {
                    type: 'all',
                    text: 'All'
                }],
            inputEnabled: false,
            selected: 0
        },
        exporting: {
            enabled: false
        },
        series: [{
                name: 'Random data',
                data: data
            }, {
                name: 'Random data',
                data: data1
            }]
    });
}