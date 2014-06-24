$(function(){
    $('.dynamicheight').each(function() {
        var $div = $(this);
        var width = $div.width();
        $div.css('height', width);  
    });
    
    $(function() {
        var $wrapper = $('#wrapper');
        var screenheight = $wrapper.height();
        var $top = $('#targetTempContainer');
        var topheight = $top.width();
        var $bottom = $('#weekButtonContainer');
        var bottomheight = $bottom.height();
        var listheight = screenheight - topheight - bottomheight;
        $('#weekButtonContainer').css('height', bottomheight);
//        $('#weekScheduleButton').css('padding-top', 0.3*bottomheight);
//        $('#weekScheduleButton').css('padding-bottom', 0.3*bottomheight);
        $('#switchListContainer').css('height', listheight);
    });
    
 });

