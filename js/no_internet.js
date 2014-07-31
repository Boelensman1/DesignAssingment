/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(function() {
    check_online(1000)
});
function check_online(timeout)
{
    if (navigator.onLine == true)
    {
        var base_url = 'http://pcwin889.win.tue.nl/2id40-ws/20/';
        //var base_url = 'http://localhost:8080/20/';
        $.ajax({url: base_url + 'time', dataType: 'json'}).always(function(result) {
            if (result.hasOwnProperty('time')) {
                //er is weer internet!
                window.location.href = "index.html";
            }
        });

    }

    setTimeout(function() {
        check_online(timeout)
    }, timeout);
}