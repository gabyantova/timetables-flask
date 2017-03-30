$(".x").click(function () {

    // Retrieve the acronym of clicked course
    var clickedXAcr = $(this).closest(".course-box").attr("acr");

    // If pinnedCourses contains the acronym of clicked box
    if (pinnedCourses.indexOf(clickedXAcr) > -1) {
        // Remove clicked course from pinnedCourses array
        pinnedCourses.splice(pinnedCourses.indexOf(clickedXAcr), 1);
    }

    // Remove pinned class and hide each coursebox with same acronym
    $("div[acr=" + clickedXAcr + "]").each(function () {
        $(this).removeClass("pinned");
        $(this).hide();
    });


});


$(".pin").click(function () {

    // need to fix
    if (pinnedCourses.length && !$("#showPinnedCoursesButton").hasClass("disabled")){
        $("#showPinnedCoursesButton").addClass("disabled");
    }
    else if (pinnedCourses.length == 0){
        $("#showPinnedCoursesButton").removeClass("disabled");
    }

    // if ($("#showPinnedCoursesButton").hasClass("disabled")){
    //     $('.tooltip').not(this).hide();
    // }
    // else{
    //     //$('[data-toggle="tooltip"]').tooltip("hide");
    // }

    // Retrieve the acronym of clicked course
    var clickedPinAcr = $(this).closest(".course-box").attr("acr");

    // Check if pinnedCourses contains this course
    // If it does, remove it from the list
    if (pinnedCourses.indexOf(clickedPinAcr) > -1) {
        pinnedCourses.splice(pinnedCourses.indexOf(clickedPinAcr), 1);
    }
    // Otherwise, add it to the list
    else {
        pinnedCourses.push(clickedPinAcr);
    }

    // Add the 'pinned' class to each coursebox with same acronym
    $("div[acr=" + clickedPinAcr + "]").each(function () {
        $(this).toggleClass("pinned");
    });

});

