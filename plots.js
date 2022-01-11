function init() {
    // Select the dropdown menu
    var selector = d3.select("#selDataset");
  
    // Read data from JSON file
    d3.json("samples.json").then((data) => {
      console.log(data);

      // Assign the 'names' array to a new variable
      var sampleNames = data.names;

      // Loop through each element in the 'sampleNames' array,
      // For each element in the array, a dropdown menu option is appended:
      // -> 'text' of each dropdown menu option is the ID
      // -> Its value property is also assigned the ID.
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
    });
};

// This function takes an ID number as input argument
function buildMetadata(sample) {
  // Pull the entire dataset in JSON file
  d3.json("samples.json").then((data) => {
    // Get the metadata array from the dataset
    var metadata = data.metadata;
    // Filter for an object in the array with 'id'property matched the input argument
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    // Since the results of filter() method are returned as an array,
    // the first item in the array is selected and assigned with object variable
    var result = resultArray[0];
    // Select 'Demographic Info' panel with id = 'sample-metadata'
    var PANEL = d3.select("#sample-metadata");
    // Clear the contents of thew panel
    PANEL.html("");

    // Get the key-value pair of demographic info from the select object
    var demographicInfo = Object.entries(result);
    
    // For each key-value pair:
    demographicInfo.forEach(([key, value]) =>
      // Append a H6 heading with 'location' to the panel
      PANEL.append("h6").text(key.toUpperCase() + ": " + value)
    );
  });
};

function optionChanged(newSample) {
  // The demographic information panel is populated with a specific volunteer's information
  buildMetadata(newSample);
  // The volunteer's data is visualized in a separate 'div'
  //buildCharts(newSample);
};

init();