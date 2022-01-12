function init() {
  // Grab a reference to the dropdown select element
  let selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    let sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    let firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    let metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    let result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    let PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // console.log(data);
    // 3. Create a variable that holds the samples array. 
    let samples = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    let resultArray = samples.filter(sampleObj => sampleObj.id == sample);

    // 3-1. Create a variable that filters the metadata array for the object with the desired sample number.
    let metadata = data.metadata;
    let metaDataResultArray = metadata.filter(sampleObj => sampleObj.id == sample);

    // 5. Create a variable that holds the first sample in the array.
    let result = resultArray[0];

    // 3-2. Create a variable that holds the first sample in the metadata array.
    let metaDataResult = metaDataResultArray[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;

    // 3-3. Create a variable that holds the washing frequency,
    // and convert to a floating point number
    let wFreq = parseFloat(metaDataResult.wfreq);

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    let yticks = otu_ids.slice(0,10).map(id => 'OTU ' + id).reverse();

    // Get the top 10 otu_labels and sample_values in descending order
    let xticks = sample_values.slice(0,10).reverse();
    let texts = otu_labels.slice(0,10).reverse();

    // 8. Create the trace for the bar chart.
    let barData = [{
      x: xticks,
      y: yticks,
      text : texts,
      type: "bar",
      orientation: 'h'
    }];
    // 9. Create the layout for the bar chart. 
    let barLayout = {
      title: "Top 10 Bacteria Cultures Found"
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);

    // 2-1. Create the trace for the bubble chart.
    let bubbleData = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: 'Jet'
      },
      type: 'scatter'
    }];

    // 2-2. Create the layout for the bubble chart.
    let bubbleLayout = {
      hovermode: 'closest',
      title: 'Bacteria Cultures Per Sample',
      xaxis: {title: "OTU ID" },
      height: 500,
      width: 1200
    };

    // 2-3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    // 3-4. Create the trace for the gauge chart.
    var gaugeData = [{
      domain: { x: [0, 1], y: [0, 1] },
      value: wFreq,
      title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [null, 10],
                dtick: "2"
              },
        steps: [
          { range: [0, 2], color: "red" },
          { range: [2, 4], color: "orange" },
          { range: [4, 6], color: "yellow" },
          { range: [6, 8], color: "lightgreen" },
          { range: [8, 10], color: "green" }
        ],
        bar: { color: "dimgrey"}
      }
    }];
    
    // 3-5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 500,
      height: 450
    };

    // 3-6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
}
