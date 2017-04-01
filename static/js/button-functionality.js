var checkboxes = $(':checkbox');
$("#showPinnedCoursesButton").click(function () {
    if (pinnedCourses.length == 0) {
        alert("No courses are currently pinned.\n To pin a course, hover over it and click the pin icon next to its name.");
    }
    else {
        $.each($('.course-box'), function () {
            // Check if pinnedCourses does not contain this course
            if (pinnedCourses.indexOf($(this).attr("acr")) == -1) {
                if ($(this).attr("semester") == currentSemester) {
                    $(this).hide();
                }
            }
            ;
        });
    }
});


$("#restoreAllCoursesButton").click(function () {
    $.each($('.course-box'), function () {
        $(this).show();
    });
    // Check all checkboxes
    checkboxes.prop('checked', true);
});


$("#restoreAndRemoveAllPins").click(function () {
    pinnedCourses = [];
    $.each($('.course-box'), function () {
        $(this).removeClass("pinned");
        $(this).show();
    });

    $("#showPinnedCoursesButton").addClass("disabled");


    // Check all checkboxes
    checkboxes.prop('checked', true);

    // Disable the "Show pinned couses" button since no courses are pinned
    $("#showPinnedCoursesButton").addClass("disabled");

});
