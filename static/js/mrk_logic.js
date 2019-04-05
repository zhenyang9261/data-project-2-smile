var map; 

//Initialize an object containing icosn for each layer group
var icons = {
  Regular: L.ExtraMarkers.icon({
    icon: 'ion-settings',
    iconColor: 'white',
    markerColor: 'yellow',
    shape: 'star'
  }),
  Magnet: L.ExtraMarkers.icon({
    icon: 'ion-android-bicyle',
    iconColor: 'white',
    markerColor: 'red',
    shape: 'circle'
  }),
  Hospital: L.ExtraMarkers.icon({
    icon: 'ion-minus-circled',
    iconColor: 'white',
    markerColor: 'blue-dark',
    shape: 'penta'
  })
};

//ADVANCED
// Initialize the LayerGroups
var layers = {
  Regular: new L.LayerGroup(),
  Magnet: new L.LayerGroup(),
  Hospital: new L.LayerGroup
}; 

//Create an overlays object to add to the layer control
var overlays = {
  "Regular": layers.Regular,
  "Magnet": layers.Magnet,
  "Hospital": layers.Hospital
};

//Create a legend to display information about our map
var info = L.control({
  position: 'bottomright'
});

//When the layer control is added, insert a div with the class of 'legend'
info.onAdd = function() {
  var div = L.DomUtil.create('div', 'legend');
  return div;
};

function createMap(schoolLocations) {

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
map = L.map("map-id", {
  center: [35.782169, -80.793457],
  zoom: 12,
  layers: [lightmap, schoolLocations,
  layers.Regular,
  layers.Magnet,
  layers.Hospital
]
});

//Add the info legend to the map
info.addTo(map);

//Create layer control
L.control.layers(baseMaps, overlayMaps, overlays, {
  collapsed: false
}).addTo(map);
};

// Perform an API call to the NC School endpoint
d3.request("/api/mrkdata", function(response) {

  // Pull the "schools" property off of response
  var schools = JSON.parse(response.response);
 
  // Initialize an array to hold school markers
  var schoolMarkers = [];

  // Loop through the schools array
  for (var index = 0; index < schools.length; index++) {
    var school = schools[index];

    var schoolMarker = L.marker([school.lat, school.lon])
      .bindPopup("<h6><b>" + school.district_name + "<h6></b>" + "<h6><b>School Name: </b>" + school.school_name + "<h6><b>School Type: </b>" + school.school_type_txt + "<h6>" + "<h6><b>School Score: </b>" + school.spg_score + "<h6>" + "<h6><b>Student Body: </b>" + school.student_num + "<h6>" + "<h6><b>School Calendar: </b>" + school.calendar_only_txt + "<h6>");

    //Add the marker to the schoolMarkers array
    schoolMarkers.push(schoolMarker);
  }

   // Create a layer group made from the school markers array, pass it into the createMap function
   createMap(L.layerGroup(schoolMarkers));

   //Create an object to keep track of the number of markers in each layer
var schoolCount = {
  Regular: 0,
  Magnet: 0,
  Hospital: 0
};

//Initialize a schoolStatusCode, used as a key to access the appropriate layers, icons, and school count for the layer group
var schoolStatusCode; 

//Loop through the schools
for (var i = 0; i < schools.length; i++) 
{
  var type = Object.assign({}, schools[i]);

  //If school is regular, then assign regular status
  if (type.school_type_txt === 'Hospital School') {
    schoolStatusCode = "Hospital";
  }

  else if (type.school_type_txt === 'Magnet School') {
    schoolStatusCode = "Magnet";
  }

  else {
    schoolStatusCode = "Regular";
  }

  //Update the school count
  schoolCount[schoolStatusCode]++;

  //Create new marker with appropriate icon/coordinates
  var newMarker = L.marker([school.lat, school.lon], {
    icon: icons[schoolStatusCode]
  });

  //Add the new marker to the appropriate layer
  newMarker.addTo(layers[schoolStatusCode]);

  //Bind popup.
  newMarker.bindPopup("<h6><b>" + school.district_name + "<h6></b>" + "<h6><b>School Name: </b>" + school.school_name + "<h6><b>School Type: </b>" + school.school_type_txt + "<h6>" + "<h6><b>School Score: </b>" + school.spg_score + "<h6>" + "<h6><b>Student Body: </b>" + school.student_num + "<h6>" + "<h6><b>School Calendar: </b>" + school.calendar_only_txt + "<h6>");
}

  //Call the updateLegend function
  updateLegend(schoolCount);
});

function updateLegend(schoolCount) {
  document.querySelector('.legend').innerHTML = [
    "<p class='Regular'>Regular Schools: " + schoolCount.Regular + "</p>",
    "<p class='Hospital'>Hospital Schools: " + schoolCount.Hospital + "</p>",
    "<p class='Magnet'>Magnet Schools: " + schoolCount.Magnet + "</p>",
  ].join("");
}





