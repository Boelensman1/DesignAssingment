load = function load() {
    var horizontal_gps = '51.447906';
    var vertical_gps = '5.484286';
    $("#program_div_Map").append('<iframe width = "500" height = "500" seamless src = "https://www.google.com/maps/embed/v1/view?key=AIzaSyApMoyCzQ9zApkU4pKPpRPRfG-7eQdVPXY&center=' + horizontal_gps + ',' + vertical_gps + '&zoom=18&maptype=satellite"></iframe>');
    $('#location_indicator').html('X You are here.<br>&emsp;(' + horizontal_gps + ',' + vertical_gps + ')');
}
