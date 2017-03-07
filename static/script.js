$(function () {

    var bySubject = [], byYear = [], byLocation = [];

    $("input[name=subject]").on("change", function () {
        if (this.checked) bySubject.push("[data-category~='" + $(this).attr("value") + "']");
        else removeA(bySubject, "[data-category~='" + $(this).attr("value") + "']");
    });

    $("input[name=year]").on("change", function () {
        if (this.checked) byYear.push("[data-category~='" + $(this).attr("value") + "']");
        else removeA(byYear, "[data-category~='" + $(this).attr("value") + "']");
    });

    $("input").on("change", function () {
        var str = "Include items \n";
        var selector = '', yearSelector = '';

        var $lis = $('.table >tbody >tr >td > .subject'), $checked = $('input:checked');

        if ($checked.length) {

            if (bySubject.length) {
                if (str == "Include items \n") {
                    str += "    " + "with (" + bySubject.join(',') + ")\n";
                    $($('input[name=subject]:checked')).each(function (index, bySubject) {
                        if (selector === '') {
                            selector += "[data-category~='" + bySubject.id + "']";
                        } else {
                            selector += ",[data-category~='" + bySubject.id + "']";
                        }
                    });
                } else {
                    str += "    AND " + "with (" + bySubject.join(' OR ') + ")\n";
                    $($('input[name=subject]:checked')).each(function (index, bySubject) {
                        selector += "[data-category~='" + bySubject.id + "']";
                    });
                }
            }

            if (byYear.length) {
                if (str == "Include items \n") {
                    str += "    " + "with (" + byYear.join(' OR ') + ")\n";
                    $($('input[name=year]:checked')).each(function (index, byYear) {
                        if (selector === '') {
                            selector += "[data-category~='" + byYear.id + "']";
                        } else {
                            selector += ",[data-category~='" + byYear.id + "']";
                        }
                    });
                } else {
                    str += "    AND " + "with (" + byYear.join(' OR ') + ")\n";
                    $($('input[name=year]:checked')).each(function (index, byYear) {
                        if (yearSelector === '') {
                            yearSelector += "[data-category~='" + byYear.id + "']";
                        } else {
                            yearSelector += ",[data-category~='" + byYear.id + "']";
                        }
                    });
                }
            }

            $lis.hide();
            console.log(selector);
            console.log(yearSelector);
            if (yearSelector === '') {
                $lis.filter(selector).show();
            } else {
                $lis.filter(selector).filter(yearSelector).show();
            }

        }
        else {
            $lis.show();
        }

        $("#whatfilters").html(str);

    });

    function removeA(arr) {
        var what, a = arguments, L = a.length, ax;
        while (L > 1 && arr.length) {
            what = a[--L];
            while ((ax = arr.indexOf(what)) !== -1) {
                arr.splice(ax, 1);
            }
        }
        return arr;
    }
});

$( document ).ready( function(){
    //$("#semester2").hide();

    var checkboxes = $( ':checkbox' );

    // Check all checkboxes
    checkboxes.prop( 'checked', true );

});

var pinnedCourses = [];



// $("#showPinnedCoursesButton").click(function() {
//
//     $.each($('.course-box'), function( index, value ) {
//       alert( index + ": " + value );
//     });
//     $.each([ 52, 97 ], function( index, value ) {
//       alert( index + ": " + value );
//     });
//
//     $('.course-box').each(function(i, obj) {
//         $(this).hide();
//     });
//     pinnedCourses.each(function (item) {
//         item.show()
//     })
// });
//


// function showPinnedCourses() {
//  pinnedCourses.forEach(function (item) {
//      item.hide()
//  })
// };
//
