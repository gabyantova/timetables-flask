/*var logo = $("#logo");

logo.on("scroll", function(e) {

    if (this.scrollTop > 50) {
        logo.addClass("collapse");
    } else {
        logo.removeClass("collapse");
    }

});

*/
$(document).ready(function(){
    //alert("Hello! I am an alert box!!");

    //var header = $("#header");

    //header.on("scroll", function(e) {

    //    if (this.scrollTop > 50) {
    //        header.addClass("collapse");
    //    } else {
    //        header.removeClass("collapse");
    //    }

    //})


    $(window).on("scroll touchmove", function () {
        $('#header').toggleClass('collapse', $(document).scrollTop() > 0);
    });







});