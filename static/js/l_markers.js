/**
 * Function to display 
 * 
 */
function builddata() {

    // Use `d3.json` to fetch the metadata for a sample
    var metadataJson = d3.json("/api/d3");
    
    // Use d3 to select the panel with id of `#sample-metadata`
    metadataDiv = d3.select("#grades-d3");
  
    // Use `.html("") to clear any existing metadata
    metadataDiv.html("");
  
    // Use `Object.entries` to add each key and value pair to the panel
    // Append new tags for each key-value in the metadata.
    metadataJson.then(function(metadata) {
       Object.entries(metadata).forEach(([key, value]) => {
        var newline = metadataDiv.append("div");
        newline.text(key +": " + value);
      });
    });
  }
  
  builddata();