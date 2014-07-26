// Initialize your app
var myApp = new Framework7();
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
});
var view4 = myApp.addView('#view-4', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
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