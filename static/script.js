// DECLARING GLOBAL VARIABLES
var pinnedCourses = [];


$(document).ready(function () {

    var bySubject = ["[data-category~='CS']", "[data-category~='AI']", "[data-category~='CG']", "[data-category~='SE']"], byYear = ["[data-category~='year1']", "[data-category~='year2']", "[data-category~='year3']", "[data-category~='year4']", "[data-category~='year5']"], byYear2 = [], byYear3 = [], byYear4 = [], byYear5 = [], byLocation = [];
    // var bySubject = [], byYear = [], byYear2 = [], byYear3 = [], byYear4 = [], byYear5 = [], byLocation = [];
    $("input[name=subject]").on("change", function () {
        if (this.checked) bySubject.push("[data-category~='" + $(this).attr("value") + "']");
        else removeA(bySubject, "[data-category~='" + $(this).attr("value") + "']");
    });
    $("input[name=year]").on("change", function () {
        if (this.checked) byYear.push("[data-category~='" + $(this).attr("value") + "']");
        else removeA(byYear, "[data-category~='" + $(this).attr("value") + "']");
    });
    /* $("input[name=year2]").on("change", function () {
     if (this.checked) byYear2.push("[data-category~='" + $(this).attr("value") + "']");
     else removeA(byYear2, "[data-category~='" + $(this).attr("value") + "']");
     });
     $("input[name=year3]").on("change", function () {
     if (this.checked) byYear3.push("[data-category~='" + $(this).attr("value") + "']");
     else removeA(byYear3, "[data-category~='" + $(this).attr("value") + "']");
     });
     $("input[name=year4]").on("change", function () {
     if (this.checked) byYear4.push("[data-category~='" + $(this).attr("value") + "']");
     else removeA(byYear4, "[data-category~='" + $(this).attr("value") + "']");
     });
     $("input[name=year5]").on("change", function () {
     if (this.checked) byYear5.push("[data-category~='" + $(this).attr("value") + "']");
     else removeA(byYear5, "[data-category~='" + $(this).attr("value") + "']");
     });*/

    $("input").on("change", function () {
        var str = "Include items \n";
        var selector = '', yearSelector = '', yearSelector2 = '', yearSelector3 = '', yearSelector4 = '', yearSelector5 = '';

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
                    /*str += "    AND " + "with (" + bySubject.join(' OR ') + ")\n";
                     $($('input[name=subject]:checked')).each(function (index, bySubject) {
                     selector += "[data-category~='" + bySubject.id + "']";
                     });*/


                    str += "    AND " + "with (" + bySubject.join(' OR ') + ")\n";
                    $($('input[name=subject]:checked')).each(function (index, bySubject) {
                        if (selector === '') {
                            selector += "[data-category~='" + bySubject.id + "']";
                        } else {
                            selector += ",[data-category~='" + bySubject.id + "']";
                        }
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
            /*
             if (byYear2.length) {
             if (str == "Include items \n") {
             str += "    " + "with (" + byYear2.join(' OR ') + ")\n";
             $($('input[name=year]:checked')).each(function (index, byYear2) {
             if (selector === '') {
             selector += "[data-category~='" + byYear2.id + "']";
             } else {
             selector += ",[data-category~='" + byYear2.id + "']";
             }
             });
             } else {
             str += "    AND " + "with (" + byYear.join(' OR ') + ")\n";
             $($('input[name=year]:checked')).each(function (index, byYear2) {
             if (yearSelector2 === '') {
             yearSelector2 += "[data-category~='" + byYear2.id + "']";
             } else {
             yearSelector2 += ",[data-category~='" + byYear2.id + "']";
             }
             });
             }
             }
             if (byYear3.length) {
             if (str == "Include items \n") {
             str += "    " + "with (" + byYear3.join(' OR ') + ")\n";
             $($('input[name=year]:checked')).each(function (index, byYear3) {
             if (selector === '') {
             selector += "[data-category~='" + byYear3.id + "']";
             } else {
             selector += ",[data-category~='" + byYear3.id + "']";
             }
             });
             } else {
             str += "    AND " + "with (" + byYear.join(' OR ') + ")\n";
             $($('input[name=year]:checked')).each(function (index, byYear3) {
             if (yearSelector3 === '') {
             yearSelector3 += "[data-category~='" + byYear3.id + "']";
             } else {
             yearSelector3 += ",[data-category~='" + byYear3.id + "']";
             }
             });
             }
             }
             if (byYear4.length) {
             if (str == "Include items \n") {
             str += "    " + "with (" + byYear4.join(' OR ') + ")\n";
             $($('input[name=year]:checked')).each(function (index, byYear4) {
             if (selector === '') {
             selector += "[data-category~='" + byYear4.id + "']";
             } else {
             selector += ",[data-category~='" + byYear4.id + "']";
             }
             });
             } else {
             str += "    AND " + "with (" + byYear.join(' OR ') + ")\n";
             $($('input[name=year]:checked')).each(function (index, byYear4) {
             if (yearSelector4 === '') {
             yearSelector4 += "[data-category~='" + byYear4.id + "']";
             } else {
             yearSelector4 += ",[data-category~='" + byYear4.id + "']";
             }
             });
             }
             }
             if (byYear4.length) {
             if (str == "Include items \n") {
             str += "    " + "with (" + byYear5.join(' OR ') + ")\n";
             $($('input[name=year]:checked')).each(function (index, byYear5) {
             if (selector === '') {
             selector += "[data-category~='" + byYear5.id + "']";
             } else {
             selector += ",[data-category~='" + byYear5.id + "']";
             }
             });
             } else {
             str += "    AND " + "with (" + byYear.join(' OR ') + ")\n";
             $($('input[name=year]:checked')).each(function (index, byYear5) {
             if (yearSelector5 === '') {
             yearSelector5 += "[data-category~='" + byYear5.id + "']";
             } else {
             yearSelector5 += ",[data-category~='" + byYear5.id + "']";
             }
             });
             }
             }*/

            $lis.hide();
            console.log(selector);
            console.log(yearSelector);
            // if (yearSelector === '' && yearSelector2 === '' && yearSelector3 === '' && yearSelector4 === '' && yearSelector5 === '') {
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

$(document).ready(function () {
    $("#semester1-table").addClass("active");
    var checkboxes = $(':checkbox');

    // Check all checkboxes
    checkboxes.prop('checked', true);

});


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
