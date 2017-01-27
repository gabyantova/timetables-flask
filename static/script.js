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