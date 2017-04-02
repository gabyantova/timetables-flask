
var currentSemester = "1";

    $(".semester-tab").click(function () {
        currentSemester = $(this).attr("semester");
    });


    // Prevent from modal opening when a pin or an X is clicked
    $('.title_bar_icon').on('click', function (e) {
        e.stopPropagation();
    });
