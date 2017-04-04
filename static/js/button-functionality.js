var checkboxes = $(':checkbox');

$("#showPinnedCoursesButton").click(function () {
    // Alert the user why the button currently has no functionality
    if (pinnedCourses.length == 0) {
        alert("No courses are currently pinned.\nTo pin a course, hover over it and click the pin icon next to its name.");
    }
    // Hide all courses whose acronym is not in the pinned courses list
    else {
        $.each($('.course-box'), function () {
            // Check if pinnedCourses does not contain this course
            if (pinnedCourses.indexOf($(this).attr("acr")) == -1) {
                if ($(this).attr("semester") == currentSemester) {
                    $(this).hide();
                }
            }
        });
    }
});


// When the "Restore all courses" button is clicked
$("#restoreAllCoursesButton").click(function () {
    // Restore all courses
    $.each($('.course-box'), function () {
        $(this).show();
    });
    // Check all checkboxes
    checkboxes.prop('checked', true);
});

// When the "Restore all courses and remove pins" button is clicked
$("#restoreAndRemoveAllPins").click(function () {
    // Empty the "pinned courses" list
    pinnedCourses = [];
    // Remove 'pinned' classes and restore courses
    $.each($('.course-box'), function () {
        $(this).removeClass("pinned");
        $(this).show();
    });

    // Check all checkboxes because all courses are shown
    checkboxes.prop('checked', true);

    // Disable the "Show pinned courses" button
    // since no courses are pinned
    $("#showPinnedCoursesButton").addClass("disabled");

});


$("input[id=checkallsubjects]").on("change", function () {
    if ($("#checkallsubjects").prop('checked') == false){
        $("input[name=subject]").prop('checked', false);
        $("#checkallsubjectslabel").html("Check all");
    }
    else{
        $("input[name=subject]").prop('checked', true);
        $("#checkallsubjectslabel").html("Uncheck all");
    }

});

$("input[id=checkallyears]").on("change", function () {
    if ($("#checkallyears").prop('checked') == false){
        $("input[name=year]").prop('checked', false);
        $("#checkallyearslabel").html("Check all");
    }
    else{
        $("input[name=year]").prop('checked', true);
        $("#checkallyearslabel").html("Uncheck all");
    }

});

