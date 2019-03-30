// from data.js

var tbody = d3.select("tbody");

var tableData=d3.json("/api/schools");
// var url = "/api/schools";
  
    //console.log(response);

function displayData(tableData){
  tableData.forEach(function(record){
        // console.log(record);
    var row = tbody.append("tr");
  
    Object.entries(record).forEach(function([key, value]){
      var cell = row.append("td");
      cell.text(value);
    });
  })};
  
  displayData(tableData);

// YOUR CODE HERE!


// console.log(tableData);

// // Step 1: Loop Through `data` and console.log each record object

// function displayData(tableData){
//     tableData.forEach(function(record){
//       // console.log(record);
//       var row = tbody.append("tr");

//       Object.entries(record).forEach(function([key, value]){
//           var cell = row.append("td");
//           cell.text(value);
//         });
// })};

// displayData(tableData);



var button = d3.select("#filter-btn");
var button2 = d3.select("#reset-btn")

// filter data with desired date
button.on("click", function(){
    d3.event.preventDefault();
    var inputspg_score1 = d3.select("#spg_score1");
    var inputspg_score2 = d3.select("#spg_score2");
    var inputfull_address = d3.select("#full_address");
    var inputschool_name = d3.select("#school_name");
    var inputgrade = d3.select("#grade");
    var inputschool_type_txt = d3.select("#school_type_txt");

    newData = tableData.filter(function(sighting){
      if(
        (sighting.spg_score >= document.getElementById("spg_score1").value|| inputspg_score1.property("value")==="")&&
        (sighting.spg_score <= document.getElementById("spg_score2").value|| inputspg_score2.property("value")==="")&&
        (sighting.full_address.toLowerCase().indexOf(inputfull_address.property("value").toLowerCase()) >-1 ||inputfull_address.property("value")==="") &&
        (sighting.school_name.toLowerCase().indexOf(inputschool_name.property("value").toLowerCase()) >-1||inputschool_name.property("value")==="") &&
        (sighting.grade.toLowerCase().indexOf(inputgrade.property("value").toLowerCase())>-1 ||inputgrade.property("value")==="")&&
        (sighting.school_type_txt.toLowerCase().indexOf(inputschool_type_txt.property("value").toLowerCase())>-1 ||inputschool_type_txt.property("value")==="")
      ){
        return true;
      }
      return false;
    }) ;
    
    // newData = tableData.filter(function(sighting){
    //   if(
    //     (sighting.datetime===inputDate.property("value")||inputDate.property("value")==="") &&
    //     (sighting.city===inputCity.property("value")||inputCity.property("value")==="") &&
    //     (sighting.state===inputState.property("value")||inputState.property("value")==="") &&
    //     (sighting.country===inputCountry.property("value")||inputCountry.property("value")==="") &&
    //     (sighting.shape===inputShape.property("value")||inputShape.property("value")==="")
    //   ){
    //     return true;
    //   }
    //   return false;
    
    tbody.html("");
    displayData(newData);
    
})

button2.on("click",function() {
  d3.event.preventDefault();
  tbody.html("");
  displayData(tableData);
})





