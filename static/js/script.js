// DECLARING GLOBAL VARIABLES
var pinnedCourses = [];

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FieWFudG92YSIsImEiOiJjaXlhNXRsOW8wMDIyMzNxcDdxdTk3dGcwIn0.gNNtUvGPe9zNblVthu__Yg';


$(document).ready(function () {

    $(".dayOfTheWeek").stick_in_parent({
        offset_top: 155
    });


    $(window).on("scroll touchmove", function () {
        $('#header').toggleClass('collapse', $(document).scrollTop() > 0);
    });


    $('[data-toggle="tooltip"]').tooltip();

    $("#semester1-table").addClass("active");
    var checkboxes = $(':checkbox');

    // Check all checkboxes
    checkboxes.prop('checked', true);



    /////////////////
    ///  SORTING  ///
    /////////////////


    var bySubject = ["[data-category~='CS']", "[data-category~='AI']", "[data-category~='CG']", "[data-category~='SE']", "[data-category~='unclassified']"];
    var byYear = ["[data-category~='year1']", "[data-category~='year2']", "[data-category~='year3']", "[data-category~='year4']", "[data-category~='year5']"];
    $("input[name=subject]").on("change", function () {
        var value = $(this).attr("value");
        if (this.checked){
            bySubject.push("[data-category~='" + value + "']");
        }
        else{
            bySubject.splice(bySubject.indexOf("[data-category~='" + value + "']"), 1);
        }
    });
    $("input[name=year]").on("change", function () {
        var value = $(this).attr("value");
        if (this.checked){
            byYear.push("[data-category~='" + value + "']");
        }
        else{
            byYear.splice(byYear.indexOf("[data-category~='" + value + "']"), 1);
        }
    });



    $("input").on("change", function () {
        var subjectSelector = '';
        var yearSelector = '';

        var $allCourseBoxes = $('.course-box');

            $($('input[name=subject]:checked')).each(function (index, bySubject) {
                subjectSelector += "[data-category~='" + bySubject.id + "'],";
            });
            subjectSelector=subjectSelector.slice(0,-1);

            $($('input[name=year]:checked')).each(function (index, byYear) {
                yearSelector += "[data-category~='" + byYear.id + "'],";
            });
            yearSelector=yearSelector.slice(0,-1);


        $allCourseBoxes.hide();
        $allCourseBoxes.filter(subjectSelector).filter(yearSelector).show();

    });


});
