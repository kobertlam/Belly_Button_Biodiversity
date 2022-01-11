// Plot simple line chart
Plotly.newPlot("plotArea_Line", [{x: [1, 2, 3], y: [10, 20, 30]}]);

// Plot simple bar chart
var trace = {
    x: ["burrito", "pizza", "chicken"],
    y: [10, 18, 5],
    type: "bar"
};

var layout = {
    title: "Luncheon Survey",
    xaxis: {title: "Food Option"},
    yaxis: {title: "Number of Respondents"}
};

// Plot another bar chart
Plotly.newPlot("plotArea_Bar", [trace], layout);

var trace_2 = {
    x: ["nonalcoholic beer", "nonalcoholic wine", "nonalcoholic martini", "nonalcoholic margarita", "ice tea", "nonalcoholic rum & coke", "nonalcoholic mai tai", "nonalcoholic gin & tonic"],
    y: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
    type: "bar"
   };
var data_2 = [trace_2];

var layout_2 = {
    title: "'Bar' Chart",
    xaxis: {title: "Drinks"},
    yaxis: {title: "% of Drinks Ordered"}
   };
Plotly.newPlot("plotArea_Bar2", data_2, layout_2);

// Plot a pie chart
var trace_3 = {
    labels: ["nonalcoholic beer", "nonalcoholic wine", "nonalcoholic martini", "nonalcoholic margarita",
    "ice tea", "nonalcoholic rum & coke", "nonalcoholic mai tai", "nonalcoholic gin & tonic"],
    values: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
    type: 'pie'
  };
  var data_3 = [trace_3];
  var layout_3 = {
    title: "'Pie' Chart",
  };
  Plotly.newPlot("plotArea_Pie", data_3, layout_3);

  // Plot a scatter plot
  var trace_4a = {
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
    mode: 'markers',
    type: 'scatter'
  };
  
  var trace_4b = {
    x: [2, 3, 4, 5],
    y: [16, 5, 11, 9],
    mode: 'lines',
    type: 'scatter'
  };
  
  var trace_4c = {
    x: [1, 2, 3, 4],
    y: [12, 9, 15, 12],
    mode: 'lines+markers',
    type: 'scatter'
  };
  
  var data_4 = [trace_4a, trace_4b, trace_4c];
  
  var layout_4 = {
    title: "Scatter Plot"
   };

  Plotly.newPlot('plotArea_Scatter', data_4, layout_4);
