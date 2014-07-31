base_url="http://pcwin889.win.tue.nl/2id40-ws/20/";var list_switches=0,list_switches_time=[],help_function={overview:{}};help_function.overview.id="help_overview";help_function.overview.number=4;help_function.week={};help_function.week.id="help_week";help_function.week.number=1;help_function.klok={};help_function.klok.id="help_klok";help_function.klok.number=6;
var prev_titel="",myApp=new Framework7({animateNavBackIcon:!0}),$$=Framework7.$,view1=myApp.addView("#view-1",{dynamicNavbar:!0}),view2=myApp.addView("#view-2",{dynamicNavbar:!0}),view3=myApp.addView("#view-3",{dynamicNavbar:!0});document.ontouchmove=function(a){a.preventDefault()};$("#changes").on({touchmove:allowscroll});function allowscroll(a){a.stopPropagation()}myApp.showPreloader();
$(function(){setTimeout(function(){$(".button-help").click(function(){help_function_on($(".view.active .page_title").attr("tit"),$(".view.active .page_title"),!1)});""==day&&(window.location.href="no_internet.html");check_online(2E3);set_day();get_target_temp().done(function(a){set_target_to_temp(a);create_switches(!0);set_time(200);myApp.hidePreloader();"false"!=localStorage.firststartup&&(localStorage.setItem("firststartup","false"),myApp.popover(".popover-help",".button-help"))})},2E3);set_to_servertemp(100)});
day="";program_state="on";manual_temp=!1;time=temp_night=temp_day=0;active_list_switch=-1;active_array=[];r_program=program="";get_value("WeekProgramState","week_program_state").done(function(a){program_state=a;"off"==program_state&&($("#changes").addClass("switches_inactive"),$("#changes_inactive").show())});get_value("day","current_day").done(function(a){day=a;get_value("time","time").done(function(a){time=get_datetime(day,a,!0)})});
get_value("dayTemperature","day_temperature").done(function(a){temp_day=a});get_value("nightTemperature","night_temperature").done(function(a){temp_night=a});get_program().done(function(a){program=a[0];r_program=a[1]});$("#changes_inactive").click(function(){switch_on_program()});
$("#set_temps").click(function(){"off"==program_state?myApp.alert("Setting day/night temperatures while in vacation mode. The changes won't take effect until vacation mode is switched off.","Warning",function(){show_set_temps()}):!0==manual_temp?myApp.alert("Setting day/night temperatures while a manual temperature is set. The changes won't take effect until after the manual temperature period has ended.","Warning",function(){show_set_temps()}):show_set_temps()});
$("#targetTempupArrow").click(function(){var a=$("#targetTempText").html()+"."+String(parseInt($("#targetTempSmall").html()));a++;30<a&&(a=30);set_target_to_temp(a);set_value("currentTemperature","current_temperature",a);switch_off_program(!1,a)});$("#targetTempdownArrow").click(function(){var a=$("#targetTempText").html()+"."+String(parseInt($("#targetTempSmall").html()));a--;5>a&&(a=5);set_target_to_temp(a);set_value("currentTemperature","current_temperature",a);switch_off_program(!1,a)});
$$("#targetTemp").on("click",function(){var a=$("#targetTempText").html()+"."+String(parseInt($("#targetTempSmall").html())),b="";"off"==program_state&&(b="checked");myApp.modal({title:"Set Custom Temperature",text:'<div class="temp-set-container"><div class="temp-set_text">Temperature<input type="text" id="temp_input" class="modal-prompt-input" value="'+a+'"></div>\n <div class="vac-mode"><div class="item-title label">Vacation mode</div><div class="item-input"><label class="label-switch"><input type="checkbox" id="vacation_input" '+
b+'><div class="checkbox"></div></label></div></div></div>',buttons:[{text:"Cancel"},{text:"Ok",onClick:function(b){a=$(b).find("#temp_input").val();b=$(b).find("#vacation_input").is(":checked");30>=a&&5<=a?(b?set_value("weekProgramState","week_program_state","off"):switch_on_program(),set_target_to_temp(a),switch_off_program(b,a),set_value("currentTemperature","current_temperature",a)):myApp.alert("Please choose a temperature between 5 and 30 degrees.","Invalid temperature.")}}]})});
$$(".klok-link").on("click",function(){myApp.showIndicator();klok_load($(this).find(".item-title").html())});$$(".debug-link").on("click",function(){debug_load()});$(".button-week-bottom").click(function(){1!=$("#view-2 .pages .page").length&&view2.goBack()});
$(".button-rest").click(function(){$("body").off();document.ontouchstart=function(a){return!0};1!=$("#view-2 .pages .page").length&&($("#view-2 .pages .page").each(function(){"index-2"==$(this).attr("data-page")?$(this).removeClass("page-on-left"):$(this).remove()}),view2.destroy(),view2=myApp.addView("#view-2",{dynamicNavbar:!0}))});function get_value(a,b){var c=$.Deferred();$.ajax({url:base_url+a,dataType:"json"}).done(function(a){c.resolve(a[b])});return c}
function get_values(a,b){var c=$.Deferred();$.ajax({url:base_url+a,dataType:"json"}).done(function(a){c.resolve(a[b])});return c}
function help_function_on(a,b,c){if($("#help").is(":visible"))$(b).html(prev_titel),$("#help").html(""),$(".help-pagination").html(""),$("#help").hide(),$(".help-pagination").hide(),!0==c&&($(".back_div").show(),$(b).css("margin-right","0px"));else for(prev_titel=$(b).html(),$("#help").html('<div class="swiper-container"><div class="swiper-wrapper"></div></div>'),$("#help").show(),$(".help-pagination").show(),!0==c?($(".back_div").hide(),$(b).html("Help (Clock)"),$(b).css("margin-right","-100px")):
$(b).html("Help ("+prev_titel+")"),b=$(".swiper-container").swiper({pagination:".help-pagination"}),i=1;i<=help_function[a].number;i++)c="./img/help/"+help_function[a].id+i+".png",(1!==i||1==help_function[a].number?b.createSlide('<img src="'+c+'"></img>'):b.createSlide('<img src="'+c+'"></img><div id="help-slide"><span>swipe for more &lt; </span></div>')).append()}
function set_value(a,b,c){var d=$.Deferred();$.ajax({url:base_url+a,type:"PUT",contentType:"application/json",data:'{"'+b+'":"'+c+'"}',dataType:"json"}).done(function(a){d.resolve(a)});return d}function set_values(a,b){var c=$.Deferred();$.ajax({url:base_url+a,type:"PUT",contentType:"application/json",data:b,dataType:"json"}).done(function(a){c.resolve(a)});return c}
function set_to_servertemp(a){get_value("currentTemperature","current_temperature").done(function(a){set_to_temp(a)});setTimeout(function(){set_to_servertemp(a)},a)}function set_to_temp(a){$("#currentTemp").html(Math.floor(a));$("#currentTempSmall").html(Number(a).after())}function set_target_to_temp(a){$("#targetTempText").html(Math.floor(a));$("#targetTempSmall").html(Number(a).after())}
function set_time(a){get_value("time","time").done(function(a){$("#cur_time span").html(a);var c=a.split(":");time.setMinutes(c[1]);"00"==c[1]&&(time.setHours(c[0]),"00:00"==a&&set_day())});update_switchmenu();setTimeout(function(){set_time(a)},a)}function set_day(){get_value("day","current_day").done(function(a){var b=day2number(a)+7;time.setDate(b);$("#cur_day span").html(a)})}
function get_target_temp(){var a=$.Deferred();"on"==program_state&&!1==manual_temp?(active_array=get_active_switch(day,0),"day"==active_array[2]?a.resolve(temp_day):a.resolve(temp_night)):get_value("currentTemperature","current_temperature").done(function(b){a.resolve(b)});return a}
function get_active_switch(a,b){if(7<b)return-1;active_program=program[a]["switch"];var c=1,d=0,e;for(e in program[a].switches){var f=program[a].switches[e];"on"==f.state&&(f=get_datetime(a,f.time,!0),f=get_time_to(f,3),(f>c||1==c)&&0>=f&&(c=f,d=e))}get_datetime(a,program[a].switches[d].time,!0);1==c?(c=day2number(a)-1,0>c&&(c=6),c=number2day(c),c=get_active_switch(c,b+1)):c=[d,a,program[a].switches[d].type];return c}
function create_switches(a){for(var b in program)for(var c in program[b].switches){b==active_array[1]&&c==active_array[0]&&-1==active_list_switch&&"on"==program_state&&!1==manual_temp&&(active_list_switch=list_switches+1);var d=program[b].switches[c];if("on"==d.state){var e=get_datetime(b,d.time,!0);add_switchmenu("night"==d.type,e,a)}}0==list_switches&&$("#switches_menu").append('<li class="item-content switch_active" time_till_active="1" id="switch_noswitches"><div class="item-media"><i class="icon icon-noswitches"></i></div><div class="item-inner"><div class="item-title switch-time">No switches defined.</div><div class="item-after item-time-change">NOW</div></div></li>');
switches_sort()}function get_program(){var a=$.Deferred();get_values("weekProgram","week_program").done(function(b){var c=jQuery.extend(!0,{},b.days),d={state:"on",time:"00:00",type:"night"},e;for(e in c){var f=!1,g;for(g in c[e].switches){var h=c[e].switches[g];"on"==h.state&&"00:00"==h.time&&(f=!0)}!1==f&&c[e].switches.push(d)}a.resolve([c,b.days])});return a}
function add_switchmenu(a,b,c){list_switches++;list_switches_time[list_switches]=b;if(5>=list_switches||!0==c)c="icon-sun",1==a&&(c="icon-moon"),a=b.getMinutes(),10>a&&(a="0"+a),a=number2day(b.getDay())+", "+b.getHours()+":"+a,b=get_time_to(b,!0),active_list_switch!=list_switches||"off"==program_state||!0==manual_temp?$("#switches_menu").append('<li class="item-content" time_till_active="1" id="switch_'+list_switches+'"><div class="item-media"><i class="icon '+c+'"></i></div><div class="item-inner"><div class="item-title switch-time">'+
a+'</div><div class="item-after item-time-change">'+b+"</div></div></li>"):$("#switches_menu").append('<li class="item-content switch_active" time_till_active="0" id="switch_'+list_switches+'"><div class="item-media"><i class="icon '+c+'"></i></div><div class="item-inner"><div class="item-title switch-time">'+a+'</div><div class="item-after item-time-change">NOW</div></div></li>')}function switches_sort(){update_time_till_active();$("#switches_menu li").sort(asc_sort).appendTo("#switches_menu")}
function update_time_till_active(){$("#switches_menu li").each(function(){var a=$(this).attr("id").substr(7);a==active_list_switch&&"on"==program_state&&!1==manual_temp||0==list_switches?$(this).attr("time_till_active",0):(a=get_time_to(list_switches_time[a],0),$(this).attr("time_till_active",a))})}
function update_switchmenu(){$("#switches_menu li").each(function(){var a=$(this).attr("id").substr(7),b=get_time_to(list_switches_time[a],1);"NOW"==b&&"on"==program_state&&(!0==manual_temp&&($("#switch_manual").hide("slow",function(){$("#switch_manual").remove()}),manual_temp=!1),$("#switches_menu li.switch_active").removeClass("switch_active"),$(this).addClass("switch_active"),$(this).find(".item-time-change").html(b),$(this).find(".item-media i").hasClass("icon-sun")?set_target_to_temp(temp_day):
set_target_to_temp(temp_night),active_list_switch=a,switches_sort());a!=active_list_switch&&$(this).find(".item-time-change").html(b)})}function get_datetime(a,b,c){b=b.split(":");var d=b[0];b=b[1];return"Sunday"!=a||!1==c?new Date(0,0,day2number(a)+7,d,b,0,0):new Date(1900,0,7,d,b,0,0)}Number.prototype.after=function(){var a=parseInt(this.toString().split(".")[1],10);return a?a:0};
function day2number(a){switch(a){case "Monday":return 1;case "Tuesday":return 2;case "Wednesday":return 3;case "Thursday":return 4;case "Friday":return 5;case "Saturday":return 6;case "Sunday":return 0}}function number2day(a){var b=Array(7);b[0]="Sunday";b[1]="Monday";b[2]="Tuesday";b[3]="Wednesday";b[4]="Thursday";b[5]="Friday";b[6]="Saturday";return b[a]}
function get_time_to(a,b){var c=a-time;1==b&&(c=a-time);0==a.getDay()&&6E4==c&&(c=0);if(1==b){if(0>c||828E5<c||432E5<c&&a.getDate()!=time.getDate())c=a.getDate()-time.getDate(),a.getDate(),time.getDate(),0>=c&&(c+=7),c=1==c?"Tomorrow":"In "+c+" days";else if(0==c)c="NOW";else{var d;d=new Date(c);var c="in ",e=d.getMinutes();d=d.getHours();c=1<d?c+(d+" hours"):c+(e+" minutes")}return c}0==b&&0>c&&(c=new Date(0,0,a.getDate()+7,a.getHours(),a.getMinutes(),0,0)-time);return c}
function asc_sort(a,b){return parseInt($(b).attr("time_till_active"))<parseInt($(a).attr("time_till_active"))?1:-1}function reinit_switches(a){list_switches=0;list_switches_time=[];$("#switches_menu").html("");create_switches(a);return!0}
function switch_off_program(a,b){manual_temp=!0;reinit_switches(!0);!1==a?($("#switches_menu").append('<li class="item-content switch_active" time_till_active="-1" id="switch_manual"><div class="item-media"><i class="icon icon-manual"></i></div><div class="item-inner"><div class="item-title switch-time">Fixed temp. Click to remove.</div><div class="item-after item-time-change">NOW</div></div></li>'),$("#switches_menu li").sort(asc_sort).appendTo("#switches_menu"),$("#switch_manual").click(function(){set_value("weekProgramState",
"week_program_state","off");switch_on_program()})):(program_state="off",$("#changes").addClass("switches_inactive"),$("#changes_inactive").show())}function switch_on_program(){manual_temp=!1;program_state="on";set_value("weekProgramState","week_program_state","on");reinit_switches(!0);get_target_temp().done(function(a){set_target_to_temp(a)});$("#changes").removeClass("switches_inactive");$("#changes_inactive").hide("slow")}
function check_online(a){!0==navigator.onLine?$.ajax({url:base_url+"time",dataType:"json"}).always(function(a){!1==a.hasOwnProperty("time")&&(window.location.href="no_internet.html")}):window.location.href="no_internet.html";setTimeout(function(){check_online(a)},a)}
function show_set_temps(){myApp.modal({title:"Set Temperatures",text:'<div class="daynight-set-container"><div class="day-set_text">Day temperature<input type="text" id="temp_input_day" class="modal-prompt-input" value="'+temp_day+'"></div>\n                <div class="night-set_text">Night temperature<input type="text" id="temp_input_night" class="modal-prompt-input" value="'+temp_night+'"></div></div>',buttons:[{text:"Cancel"},{text:"Ok",onClick:function(a){var b=$(a).find("#temp_input_day").val();
a=$(a).find("#temp_input_night").val();30>=b&&5<=b&&30>=a&&5<=a?(temp_day=String(Math.floor(b))+"."+String(Number(b).after()),temp_night=String(Math.floor(a))+"."+String(Number(a).after()),set_value("dayTemperature","day_temperature",temp_day),set_value("nightTemperature","night_temperature",temp_night),get_target_temp().done(function(a){set_target_to_temp(a)}),myApp.addNotification({title:"Temperatures",message:"Day temperature set to "+temp_day+"\u00b0C and night temperature set to "+temp_night+
"\u00b0C",hold:4E3,closeIcon:!1})):myApp.alert("Please choose a temperature between 5 and 30 degrees.","Invalid temperature.")}}]})}var degrees_slider,sliders=0,day_clock,reversed,degreesbyid={},prev_degree_sliders,timeout=0,offsetX,newdegree,sliderWidth,sliderHeight,moveobj,moveid,offsetY,$container,move,radius,$slider,$degrees;reversed=!1;var rad=Math.PI/180;
function klok_load(a){degrees_slider=[];sliders=0;reversed=!1;degreesbyid={};sliderWidth=newdegree=offsetX=timeout=prev_degree_sliders=0;sliderHeight;$degrees=$slider=radius=move=$container=offsetY=moveid=moveobj=0;move_deg_prev=-1;day_clock=a;setTimeout(function(){$(".help-clock").click(function(){help_function_on("klok",$(".klok-title"),!0)});$(".klok-title").html(day_clock);$container=$("#rotationSliderContainer");$slider=$(".rotationSlider");$degrees=$("#rotationSliderDegrees");offsetX=$("#rotationSliderContainer").offset().left;
offsetY=$("#rotationSliderContainer").offset().top;document.ontouchstart=function(a){a.preventDefault()};$("#add_slider").click(add_slider_click);var a=Framework7.prototype.device;if(a.iphone)$("body").on({touchmove:touchmove_func});else $("body").on({mousemove:touchmove_func});if(a.iphone)$("#rotationSliderContainer").on({click:delete_slider});else $("#rotationSliderContainer").on({mousedown:delete_slider});$("#clock_apply").click(sliders_apply_clicked);$("#clock_revert").click(function(){myApp.confirm("Are sure you want to undo ALL changes you made to this day?",
"Confirmation",function(){myApp.showIndicator();klok_reload()})});move=!1;newdegree=moveid=0;sliderHeight=sliderWidth=40;radius=$container.width()/2;sliders=0;var a=[],c;for(c in r_program[day_clock].switches){var d=r_program[day_clock].switches[c];"on"==d.state&&(d=time2deg(d.time),360==d&&(d=0),add_slider(d,!1),a.push(d))}a.sort(function(a,b){return a-b});rotate_pie(a);$("#clock_date").html(day_clock);myApp.hideIndicator()},500)}
function klok_reload(){move=!1;newdegree=moveid=0;degrees_slider=[];sliders=0;reversed=!1;degreesbyid={};move=moveobj=timeout=prev_degree_sliders=0;move_deg_prev=-1;$(".rotationSlider").remove();var a=[],b;for(b in r_program[day_clock].switches){var c=r_program[day_clock].switches[b];"on"==c.state&&(c=time2deg(c.time),360==c&&(c=0),add_slider(c,!1),a.push(c))}a.sort(function(a,b){return a-b});rotate_pie(a);myApp.hideIndicator()}
function sliders_apply_clicked(a){myApp.actions([{text:"Apply to:",label:!0},{text:day_clock,onClick:function(){sliders_apply([day_clock])}},{text:"Multiple days...",onClick:function(){select_days()}},{text:"Cancel",red:!0}])}
function select_days(){myApp.modal({text:'<div class="list-block smart-select-list-days"><ul><li><div class="item-divider">select days</div></li><li><label class="label-checkbox item-content"><input type="checkbox" name="checkbox-1406307247818" value="Monday"><div class="item-media"><i class="icon icon-form-checkbox"></i></div><div class="item-inner"><div class="item-title">Monday</div></div></label></li><li><label class="label-checkbox item-content"><input type="checkbox" name="checkbox-1406307247818" value="Tuesday"><div class="item-media"><i class="icon icon-form-checkbox"></i></div><div class="item-inner"><div class="item-title">Tuesday</div></div></label></li><li><label class="label-checkbox item-content"><input type="checkbox" name="checkbox-1406307247818" value="Wednesday"><div class="item-media"><i class="icon icon-form-checkbox"></i></div><div class="item-inner"><div class="item-title">Wednesday</div></div></label></li><li><label class="label-checkbox item-content"><input type="checkbox" name="checkbox-1406307247818" value="Thursday"><div class="item-media"><i class="icon icon-form-checkbox"></i></div><div class="item-inner"><div class="item-title">Thursday</div></div></label></li><li><label class="label-checkbox item-content"><input type="checkbox" name="checkbox-1406307247818" value="Friday"><div class="item-media"><i class="icon icon-form-checkbox"></i></div><div class="item-inner"><div class="item-title">Friday</div></div></label></li><li><label class="label-checkbox item-content"><input type="checkbox" name="checkbox-1406307247818" value="Saturday"><div class="item-media"><i class="icon icon-form-checkbox"></i></div><div class="item-inner"><div class="item-title">Saturday</div></div></label></li><li><label class="label-checkbox item-content"><input type="checkbox" name="checkbox-1406307247818" value="Sunday"><div class="item-media"><i class="icon icon-form-checkbox"></i></div><div class="item-inner"><div class="item-title">Sunday</div></div></label></li></ul></div>',buttons:[{text:"Cancel",
red:!0},{text:"Apply",onClick:function(){var a=[];$(".smart-select-list-days ul li").each(function(){!0==$(this).find("input").prop("checked")&&a.push($(this).find("input").val())});sliders_apply(a)}}]});$(".smart-select-list-days ul li .item-content input").each(function(){$(this).val()==day_clock&&$(this).attr("checked","checked")})}
function sliders_apply(a){myApp.showIndicator();a.forEach(function(a){r_program[a].switches=Array(10);var b=reversed,e=-1,f;for(degrees_slider.forEach(function(g){1==b?(e++,f={state:"on",type:"night"},f.time=to_time(g),r_program[a].switches[e]=f,b=0):(e++,f={state:"on",type:"day"},f.time=to_time(g),r_program[a].switches[e]=f,b=1)});9>e;)e++,1==b?(r_program[a].switches[e]={state:"off",type:"night",time:"00:00"},b=0):(r_program[a].switches[e]={state:"off",type:"day",time:"00:00"},b=1)});var b={week_program:{}};
b.week_program.days=r_program;b.week_program.state=program_state;b=JSON.stringify(b,null,2);set_values("WeekProgram",b).done(function(b){get_program().done(function(b){program=b[0];r_program=b[1];get_target_temp().done(function(b){set_target_to_temp(b);reinit_switches(!0);myApp.hideIndicator();myApp.addNotification({title:"Weekprogram",message:"Succesfully set new weekprogram for "+a.join(", "),hold:3E3,closeIcon:!1})})})})}
function touchstart_func(a){klok_load_loc();if(0==timeout)if(timeout=1,setTimeout(function(){timeout=0},1),!0==move)move=!1,$(this).removeClass("touchslider_active"),$(this).find(".rotationSlider_time").html(to_time(newdegree)),degreesbyid[moveid]=newdegree,$degrees.html("");else{move=!0;moveobj=this;moveid=$(moveobj).attr("id").substr(15);$(this).addClass("touchslider_active");$(this).removeClass("touchslider_new");prev_degree_sliders=[];for(var b in degreesbyid)b!=moveid?prev_degree_sliders.push(degreesbyid[b]):
newdegree=degreesbyid[b]}}function touchend_func(a){move=!1;$(this).removeClass("touchslider_active");$(this).find(".rotationSlider_time").html(to_time(newdegree));degreesbyid[moveid]=newdegree;$degrees.html("")}
function touchmove_func(a){var b;if(!0==move){"undefined"===typeof a.pageX||"undefined"===typeof a.pageY?(b=a.originalEvent.touches[0].pageX,a=a.originalEvent.touches[0].pageY):(b=a.pageX,a=a.pageY);deg=-Math.atan2(b-radius-offsetX,a-radius-offsetY)/(Math.PI/180)+180;b=Math.round(deg);360==b&&(b=0);for(a=move_deg_prev!=b;!0==a;)a=!1,-1!=degrees_slider.indexOf(b)&&(a=!0,move_deg_prev<b?(b+=2,360<=b&&(b-=360)):(b-=2,0>b&&(b+=360)));X=Math.round(radius*Math.sin(b*Math.PI/180));Y=Math.round(radius*-Math.cos(b*
Math.PI/180));$(moveobj).css({left:X+radius-sliderWidth/2,top:Y+radius-sliderHeight/2});move_deg_prev=b;$degrees.html(to_time(b));$("#imageRotateDegrees").val(b);newdegree=b;degrees_temp=prev_degree_sliders.slice(0);degrees_temp.push(b);degrees_temp.sort(function(a,b){return a-b});rotate_pie(degrees_temp)}}
function rotate_pie(a){degrees_slider=a.slice(0);$(function(){if(1<sliders||1==sliders&&0!==a[0]&&360!==a[0]){$("#pie").html("");var b=Raphael("pie"),c=0,d=reversed;a.forEach(function(a){1==d?(sector(radius,radius,radius,c,a,b,!0,{fill:"grey","stroke-width":0}),d=0):(sector(radius,radius,radius,c,a,b,!0,{fill:"black","stroke-width":0}),d=1);console.log(c+" - "+a+" : "+d);c=a});console.log(c+" - 360 : "+d);1==d?sector(radius,radius,radius,c,360,b,!0,{fill:"grey","stroke-width":0}):sector(radius,radius,
radius,c,360,b,!0,{fill:"black","stroke-width":0})}else $("#pie").html(""),b=Raphael("pie"),0==sliders?(sector(radius,radius,radius,1,360,b,!1,{fill:"black"}),sector(radius,radius,radius,0,1,b,!1,{fill:"black"})):(sector(radius,radius,radius,0,2,b,!1,{fill:"grey",stroke:"grey"}),sector(radius,radius,radius,1,360,b,!0,{fill:"grey",stroke:"grey"}))})}
function sector(a,b,c,d,e,f,g,h){d+=90;e+=90;var m=a+c*Math.cos(-d*rad),k=a+c*Math.cos(-e*rad),n=b+c*Math.sin(-d*rad),l=b+c*Math.sin(-e*rad);f.path(["M",a,b,"L",m,n,"A",c,c,0,+(180<e-d),0,k,l,"z"]).attr(h);!0==g&&f.path(["M",a,b,"L",k,l]).attr({stroke:"green","stroke-width":5});return 1}
function add_slider(a,b){360==a&&(a=0);sliders++;for(i=1;i<=sliders;i++)if(!degreesbyid.hasOwnProperty(i)){var c=i;break}!1==b?$container.append('<div id="rotationSlider_'+c+'" class="rotationSlider"><div class="rotationSlider_time">'+to_time(a)+"</div></div>"):$container.append('<div id="rotationSlider_'+c+'" class="rotationSlider touchslider_new"><div class="rotationSlider_time">NEW</div></div>');var d=a;X=Math.round(radius*Math.sin(d*Math.PI/180));Y=Math.round(radius*-Math.cos(d*Math.PI/180));
$("#rotationSlider_"+c).css({left:X+radius-sliderWidth/2,top:Y+radius-sliderHeight/2});degreesbyid[c]=a;$(".rotationSlider").off();Framework7.prototype.device.iphone?($(".rotationSlider").on({touchstart:touchstart_func}),$(".rotationSlider").on({touchend:touchend_func})):($(".rotationSlider").on({mousedown:touchstart_func}),$(".rotationSlider").on({mouseup:touchend_func}));10==sliders&&$("#add_slider").addClass("button_disabled")}
function add_slider_click(a){if(10>sliders){var b=0,c=0,d,e;0<sliders?(degrees_slider.forEach(function(a){b<a-c&&(b=a-c,d=Math.round(c+b/3),e=Math.round(c+b/1.5));c=a}),final_degree=360,1==degrees_slider.length&&(d=Math.round(c+120),e=Math.round(c+240)),b<=final_degree-c&&(b=final_degree-c,d=Math.round(c+b/3),e=Math.round(c+b/1.5)),360<d&&(d-=360),360<e&&(e-=360),9>sliders?(degrees_slider.push(d),degrees_slider.push(e),degrees_slider.sort(function(a,b){return a-b}),add_slider(d,!0),add_slider(e,!0)):
(degrees_slider.push(d),degrees_slider.sort(function(a,b){return a-b}),add_slider(d,!0))):(degrees_slider.push(0),add_slider(360,!0));rotate_pie(degrees_slider)}else myApp.popover(".popover-switches",this)}
function delete_slider(a){var b;if(0==timeout&&!1==move&&0<sliders){"undefined"===typeof a.pageX||"undefined"===typeof a.pageY?(b=a.originalEvent.touches[0].pageX,a=a.originalEvent.touches[0].pageY):(b=a.pageX,a=a.pageY);deg=-Math.atan2(b-radius-offsetX,a-radius-offsetY)/(Math.PI/180)+180;deg=Math.round(deg);var c=0,d,e,f,g;degrees_slider.forEach(function(a){deg>c&&deg<a&&(d=c,e=a,f=deg_to_id(d),g=deg_to_id(e));c=a});void 0==d&&(d=c,e=360,f=deg_to_id(d),g=null);1==sliders?myApp.confirm("Are sure you want to delete the last switch?",
"Confirmation",function(){finish_delete(d,e,f,g)}):myApp.confirm("Are sure you want to delete the period "+to_time(d)+"-"+to_time(e)+"?","Confirmation",function(){finish_delete(d,e,f,g)})}}
function finish_delete(a,b,c,d){$("#add_slider").removeClass("button_disabled");if(1==sliders)degreesbyid={},degrees_slider=[],$(".rotationSlider").remove(),sliders-=1;else{degrees_slider=[];for(var e in degreesbyid)degreesbyid.hasOwnProperty(e)&&(console.log(e+" "+c+" "+d),e!=c&&e!=d?degrees_slider.push(degreesbyid[e]):delete degreesbyid[e]);$("#rotationSlider_"+c).remove();$("#rotationSlider_"+d).remove();degrees_slider.sort(function(a,b){return a-b});sliders=null==d||null==c?sliders-1:sliders-
2}rotate_pie(degrees_slider)}function deg_to_id(a){for(var b in degreesbyid)if(degreesbyid.hasOwnProperty(b)&&a==degreesbyid[b])return b}function klok_load_loc(){offsetX=$("#rotationSliderContainer").offset().left;offsetY=$("#rotationSliderContainer").offset().top}function to_time(a){var b=new Date(0,0,0,0,a/360*1440,0,0);hours=pad(b.getHours());minutes=pad(b.getMinutes());360==a&&(hours=24);return hours+":"+minutes}function pad(a){return 10>a?"0"+a:a}
function time2deg(a){a=a.split(":");return(3600*a[0]+60*a[1])/86400*360}
function debug_load(){setTimeout(function(){$("#dev_reload").click(function(){location.reload()});$("#dev_to_first").click(function(){localStorage.setItem("firststartup","true")});$("#cur_day span").html(day);$("#debug_day").change(function(){set_value("day","current_day",this.value).done(function(a){set_day();reinit_switches(!0)})});$("#debug_time").change(function(){set_value("time","time",this.value);var a=this.value.split(":");time.setMinutes(a[1]);time.setHours(a[0]);reinit_switches(!0)})},500)}
;