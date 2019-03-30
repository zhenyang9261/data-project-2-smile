// Create the tile layer that will be the background of our map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

// Initialize all of the LayerGroups we'll be using
var layers = {
  REGULAR: new L.LayerGroup(),
  MAGNET: new L.LayerGroup(),
  HOSPITAL: new L.LayerGroup()
};

// Create the map with our layers
var map = L.map("map-id", {
  center: [35.782169, -80.793457],
  zoom: 12,
  layers: [
    layers.REGULAR,
    layers.MAGNET,
    layers.HOSPITAL
  ]
});

// Add our 'lightmap' tile layer to the map
lightmap.addTo(map);

// Create an overlays object to add to the layer control
var overlays = {
  "Regular": layers.REGULAR,
  "Magnet": layers.MAGNET,
  "Hospital": layers.HOSPITAL
};

// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(map);

// Create a legend to display information about our map
var info = L.control({
  position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};
// Add the info legend to the map
info.addTo(map);

// Initialize an object containing icons for each layer group
var icons = {
  REGULAR: L.ExtraMarkers.icon({
    icon: "ion-settings",
    iconColor: "white",
    markerColor: "yellow",
    shape: "star"
  }),
  MAGNET: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "red",
    shape: "circle"
  }),
  HOSPITAL: L.ExtraMarkers.icon({
    icon: "ion-minus-circled",
    iconColor: "white",
    markerColor: "blue-dark",
    shape: "penta"
  })
};

// Perform an API call to the NC School endpoint
d3.json("/api/mrkdata", createMarkers);

  // Create an object to keep of the number of markers in each layer
  
function createMarkers(data) {

  
  console.log('this is the data for the markers', data)
  var schoolCount = {
    REGULAR: 0,
    MAGNET: 0,
    HOSPITAL: 0
  };

  // Initialize a schoolStatusCode, which will be used as a key to access the appropriate layers, icons, and school count for layer group
  var schoolStatusCode; 

  var district_name = data['district_name'];
  var lat = data['lat'];
  var lon = data['lon'];
  // Loop through the schools
  for (var i = 0; i < infoSchools.length; i++) {
    current_name = district_name[i];
    current_lat = lat[i];
    current_lon = lon[i];
  }
}



  //   // Loop through the stations (they're the same size and have partially matching data)
  //   for (var i = 0; i < stationInfo.length; i++) {

  //     // Create a new station object with properties of both station objects
  //     var station = Object.assign({}, stationInfo[i], stationStatus[i]);
  //     // If a station is listed but not installed, it's coming soon
  //     if (!station.is_installed) {
  //       stationStatusCode = "COMING_SOON";
  //     }
  //     // If a station has no bikes available, it's empty
  //     else if (!station.num_bikes_available) {
  //       stationStatusCode = "EMPTY";
  //     }
  //     // If a station is installed but isn't renting, it's out of order
  //     else if (station.is_installed && !station.is_renting) {
  //       stationStatusCode = "OUT_OF_ORDER";
  //     }
  //     // If a station has less than 5 bikes, it's status is low
  //     else if (station.num_bikes_available < 5) {
  //       stationStatusCode = "LOW";
  //     }
  //     // Otherwise the station is normal
  //     else {
  //       stationStatusCode = "NORMAL";
  //     }

  //     // Update the station count
  //     stationCount[stationStatusCode]++;
  //     // Create a new marker with the appropriate icon and coordinates
  //     var newMarker = L.marker([station.lat, station.lon], {
  //       icon: icons[stationStatusCode]
  //     });

  //     // Add the new marker to the appropriate layer
  //     newMarker.addTo(layers[stationStatusCode]);

  //     // Bind a popup to the marker that will  display on click. This will be rendered as HTML
  //     newMarker.bindPopup(station.name + "<br> Capacity: " + station.capacity + "<br>" + station.num_bikes_available + " Bikes Available");
  //   }

  //   // Call the updateLegend function, which will... update the legend!
  //   updateLegend(updatedAt, stationCount);
  // });


// Update the legend's innerHTML with the last updated time and station count
function updateLegend(time, stationCount) {
  document.querySelector(".legend").innerHTML = [
    "<p>Updated: " + moment.unix(time).format("h:mm:ss A") + "</p>",
    "<p class='out-of-order'>Out of Order Stations: " + stationCount.OUT_OF_ORDER + "</p>",
    "<p class='coming-soon'>Stations Coming Soon: " + stationCount.COMING_SOON + "</p>",
    "<p class='empty'>Empty Stations: " + stationCount.EMPTY + "</p>",
    "<p class='low'>Low Stations: " + stationCount.LOW + "</p>",
    "<p class='healthy'>Healthy Stations: " + stationCount.NORMAL + "</p>"
  ].join("");
}
