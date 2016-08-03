var apiKey = require('./../.env').apiKey;

$( document ).ready(function() {
  $('#locateUser').click(locateUser);
  var map;
  $.get('https://maps.googleapis.com/maps/api/js?key='+ apiKey + '&callback=initMap').then(function(response){
    console.log(response);
     var div = $("#map");
     var coord = {center: {lat: -34.397, lng: 150.644}, scrollwheel: false,zoom: 8};

      map = new google.maps.Map(div,coord);

   }).fail(function(error) {
     $("#map").text("error!");
   });

   $("#map").show();
});






  // $.get("https://maps.googleapis.com/maps/api/js?key=AIzaSyAq0xMzQ6dJfhJUarrYKwWLiuBEsZyvxcY&callback=initMap",function initMap() {
  //     var div = document.getElementById('map');
  //     var coord = {center: {lat: -34.397, lng: 150.644},
  //       scrollwheel: false,
  //       zoom: 8};
  //   var newMap = new google.maps.Map(div,coord);
  //   });
});

//google maps functions
function locateUser() {
  // If the browser supports the Geolocation API
  if (navigator.geolocation){
    var positionOptions = {
      enableHighAccuracy: true,
      timeout: 10 * 1000 // 10 seconds
    };
    navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, positionOptions);
  }
  else {
    alert("Your browser doesn't support the Geolocation API");
  }
}
// this is the success callback from telling the navigator (your browser) to get the current user's position
// we do this on line 13 above. We pass in a function to call on success, a function to call on error, and some options to tell the geolocation api how we want it to run.
// on successfully locating the user, geolocationSuccess() gets called automatically, and it is passed the user's position as an argument.
// on error, geolocationError is called.


function geolocationSuccess(position) {
  // here we take the `position` object returned by the geolocation api
  // and turn it into google maps LatLng object by calling the google.maps.LatLng constructor function
  // it takes 2 arguments: one for latitude, one for longitude.
  // You could refactor this section to pass google maps your own coordinates rather than using geolocation for the user's current location.
  // But you must use coordinates to use this method.
  var userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  var myOptions = {
    zoom : 16,
    center : userLatLng,
    mapTypeId : google.maps.MapTypeId.ROADMAP
  };
  // Draw the map - you have to use 'getElementById' here.
  var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
  // Place the marker
  new google.maps.Marker({
    map: mapObject,
    position: userLatLng
  });
}

function geolocationError(positionError) {
  alert(positionError);
}
