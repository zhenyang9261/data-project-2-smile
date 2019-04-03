function createMap(schoolLocations) {

  console.log("Starting map function");

// Create the tile layer that will be the background of our map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

//Basemaps
var baseMaps = {
  "Light Map": lightmap
};

//Overlay map object to hold schools layers
var overlayMaps = {
  "School Locations": schoolLocations
};

//Create map object with options
var map = L.map("map-id", {
  center: [35.782169, -80.793457],
  zoom: 12,
  layers: [lightmap, schoolLocations]
});

//Create layer control
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(map);

console.log("End of maps function.");
};

// Perform an API call to the NC School endpoint

d3.request("/api/mrkdata", function(response) {
  
  console.log('this is the data for the markers', response);

  // Pull the "schools" property off of response
  var schools = JSON.parse(response.response);
  console.log('this is the schools json dat', schools)
  console.log(schools);

  // Initialize an array to hold school markers
  var schoolMarkers = [];

  // Loop through the schools array
  for (var index = 0; index < schools.length; index++) {
    var school = schools[index];

    var schoolMarker = L.marker([school.lat, school.lon])
      .bindPopup("<h6><b>" + school.district_name + "<h6></b>" + "<h6><b>School Type: </b>" + school.school_type_txt + "<h6>" + "<h6><b>School Score: </b>" + school.spg_score + "<h6>" + "<h6><b>Student Body: </b>" + school.student_num + "<h6>" + "<h6><b>School Calendar: </b>" + school.calendar_only_txt + "<h6>");

    //Add the marker to the schoolMarkers array
    schoolMarkers.push(schoolMarker);
  }

   // Create a layer group made from the school markers array, pass it into the createMap function
   createMap(L.layerGroup(schoolMarkers));
});

console.log("This is the createMarkers function");