$(function () {


var $filterCheckboxes = $('input[type="checkbox"]');

$filterCheckboxes.on('change', function() {

  var selectedFilters = {};

  $filterCheckboxes.filter(':checked').each(function() {

    if (!selectedFilters.hasOwnProperty(this.name)) {
      selectedFilters[this.name] = [];
    }

    selectedFilters[this.name].push(this.value);

  });

  // create a collection containing all of the filterable elements
  var $filteredResults = $('.subject');

  // loop over the selected filter name -> (array) values pairs
  $.each(selectedFilters, function(name, filterValues) {

    // filter each .flower element
    $filteredResults = $filteredResults.filter(function() {

      var matched = false,
        currentFilterValues = $(this).data('category').split(' ');

      // loop over each category value in the current .flower's data-category
      $.each(currentFilterValues, function(_, currentFilterValue) {

        // if the current category exists in the selected filters array
        // set matched to true, and stop looping. as we're ORing in each
        // set of filters, we only need to match once

        if ($.inArray(currentFilterValue, filterValues) != -1) {
          matched = true;
          return false;
        }
      });

      // if matched is true the current .flower element is returned
      return matched;

    });
  });

  $('.subject').hide().filter($filteredResults).show();

});

    // var $chkbxFilter_all = $('#all');
    //
    // //When you click "ALL", the other checkboxes turn off.
    // $chkbxFilter_all.click(function() {
    // 	  $(".sort").prop('checked',false);
    // 	  $chkbxFilter_all.prop('checked',true);
    // });
    //
    // //The action when the checkboxes is clicked.
    // $("#select label input").click(function() {
    //
    //    $(this).parent().toggleClass("selected");
    //
    //    $.each($chkbxFilter_tags, function() {
    //        if($('#' + this).is(':checked')) {
    //                     $("#result " + $chkbxFilter_blocks + ":not(." + this + ")").addClass('hidden-not-' + this);
    //                     $chkbxFilter_all.prop('checked',false).parent().removeClass("selected");
    //            }
    //        else if($('#' + this).not(':checked')) {
    //                     $("#result " + $chkbxFilter_blocks + ":not(." + this + ")").removeClass('hidden-not-' + this);
    //            }
    //    });
    //
    //    //If all checkboxes is not selected, add class="selected" to "ALL".
    //    if ($('.sort:checked').length == 0 ){
    //        $chkbxFilter_all.prop('checked',true).parent().addClass("selected");
    //        $(".sort").parent().removeClass("selected");
    //    }
    // });
});


///*var logo = $("#logo");
//
//logo.on("scroll", function(e) {
//
//    if (this.scrollTop > 50) {
//        logo.addClass("collapse");
//    } else {
//        logo.removeClass("collapse");
//    }
//
//});
//
//*/
//
//
//
//$(document).ready(function(){
//
//
//
//        mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FieWFudG92YSIsImEiOiJjaXlhNXRsOW8wMDIyMzNxcDdxdTk3dGcwIn0.gNNtUvGPe9zNblVthu__Yg';
//
//        var map = new mapboxgl.Map({
//            container: 'map-one',
//            style: 'mapbox://styles/mapbox/streets-v9',
//            zoom: 17,
//            center: [4.899, 52.372]
//        });
//
//        $('.modal').on('shown.bs.modal', function() {
//          alert("hi")
//          map.invalidateSize();
//          map.resize();
//        });
//
//
//
//
//
////    L.mapbox.accessToken = 'pk.eyJ1IjoiZ2FieWFudG92YSIsImEiOiJjaXlhNXRsOW8wMDIyMzNxcDdxdTk3dGcwIn0.gNNtUvGPe9zNblVthu__Yg';
////    L.mapbox.map('map-one', 'mapbox.streets').setView([38.8929, -77.0252], 14);
////
//
////    mapbox.accessToken =  'pk.eyJ1IjoiZ2FieWFudG92YSIsImEiOiJjaXlhNXRsOW8wMDIyMzNxcDdxdTk3dGcwIn0.gNNtUvGPe9zNblVthu__Yg';
////
////    var map = new mapbox.Map({
////    container: ‘map-one’, // container id
////    center: [38.8929, -77.0252], // starting position. I have two variables sLatitude and sLongitude here to pass the Latitude and Longitude from the Server Side.
////    zoom: 9 // starting zoom
////    });
////
////    function MapModal() {
////        $(‘#Map_Modal’).modal();
////    }
////
////    function MapResize() {
////        map.resize(); // We will use the map.resize() function, to resize the MapBox map  once the modal has finished loading.
////    }
////
////    // Given that your modal has the id #modal
////    // and your map is under the variable map. The ‘shown.bs.modal’ event handler is an in-built event handler for Bootstrap Modals.
////    $(‘#Map_Modal’).on(‘shown.bs.modal’, function () {
////        map.resize();
////    });
//
//
//
//
//    //alert("Hello! I am an alert box!!");
//
//    //var header = $("#header");
//
//    //header.on("scroll", function(e) {
//
//    //    if (this.scrollTop > 50) {
//    //        header.addClass("collapse");
//    //    } else {
//    //        header.removeClass("collapse");
//    //    }
//
//    //})
//
//
//    $(window).on("scroll touchmove", function () {
//        $('#header').toggleClass('collapse', $(document).scrollTop() > 0);
//    });
//
////
////
////    $('.modal').on('shown.bs.modal', function() {
////      alert("hi")
////      map.invalidateSize();
////      map.resize();
////      map.setStyle('mapbox://styles/mapbox/4-v9')
////    });
////
//
//
//});