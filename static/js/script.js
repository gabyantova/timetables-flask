// DECLARING GLOBAL VARIABLES
var pinnedCourses = [];
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FieWFudG92YSIsImEiOiJjaXlhNXRsOW8wMDIyMzNxcDdxdTk3dGcwIn0.gNNtUvGPe9zNblVthu__Yg';

var bounds = [
    [-3.312635, 55.896151], // Southwest coordinates
    [ -3.127241, 55.983255]  // Northeast coordinates
];


$(document).ready(function () {

    // always display day of the week right underneath the header
    $(".dayOfTheWeek").stick_in_parent({
        offset_top: 170
    });

    // always display header on top
    $(window).on("scroll touchmove", function () {
        $('#header').toggleClass('collapse', $(document).scrollTop() > 0);
    });

    // initialise the tooltip for the "Show pinned courses" button
    $('[data-toggle="tooltip"]').tooltip();

    // The first semester is active by default
    $("#semester1-table").addClass("active");
    var checkboxes = $(':checkbox');

    // Check all checkboxes at page load
    checkboxes.prop('checked', true);




    
    /////////////////
    ///  SORTING  ///
    /////////////////

    var bySubject = ["[data-category~='CS']", "[data-category~='AI']", "[data-category~='CG']", "[data-category~='SE']", "[data-category~='unclassified']"];
    var byYear = ["[data-category~='year1']", "[data-category~='year2']", "[data-category~='year3']", "[data-category~='year4']", "[data-category~='year5']"];

    // listen for changes in the 'subject' checkboxes
    $("input[name=subject]").on("change", function () {
        var value = $(this).attr("value");
        // if it has been checked
        if (this.checked){
            // add a filtering string to the bySubject array
            bySubject.push("[data-category~='" + value + "']");
        }
        // if it has been unchecked
        else{
            // remove the filtering string from the byYear array
            bySubject.splice(bySubject.indexOf("[data-category~='" + value + "']"), 1);
        }
    });

    // listen for changes in the 'subject' checkboxes
    $("input[name=year]").on("change", function () {
        var value = $(this).attr("value");
        // if it has been checked
        if (this.checked){
            // add a filtering string to the byYear array
            byYear.push("[data-category~='" + value + "']");
        }
        // if it has been unchecked
        else{
            // remove the filtering string from the byYear array
            byYear.splice(byYear.indexOf("[data-category~='" + value + "']"), 1);
        }
    });

    // listen for changes in any of the checkboxes
    $("input").on("change", function () {
        var subjectSelector = '';
        var yearSelector = '';
        var $allCourseBoxes = $('.course-box');

            $($('input[name=subject]:checked')).each(function (index, bySubject) {
                subjectSelector += "[data-category~='" + bySubject.id + "'],";
            });
            // remove last character because it's a comma
            subjectSelector=subjectSelector.slice(0,-1);

            $($('input[name=year]:checked')).each(function (index, byYear) {
                yearSelector += "[data-category~='" + byYear.id + "'],";
            });
            // remove last character because it's a comma
            yearSelector=yearSelector.slice(0,-1);


        // first hide all, then display the ones we need
        $allCourseBoxes.hide();
        $allCourseBoxes.filter(subjectSelector).filter(yearSelector).show();
    });
});
