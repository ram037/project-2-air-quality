function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  var metadataURL = "/metadata/" + sample;
    // Use d3 to select the panel with id of `#sample-metadata`
    d3.json(metadataURL).then(function(sample){
      var sampleData = d3.select(`#sample-metadata`);
    // Use `.html("") to clear any existing metadata
      sampleData.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
      Object.entries(sample).forEach(function([key,value]){
        var row = sampleData.append("p");
        row.text(`${key}:${value}`)
      })
    });
}



function buildCharts(sample) {
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var url = "/samples/" + sample;
  // @TODO: Build a Bubble Chart using the sample data
  d3.json(url).then(function(data){
    var x_axis = data.otu_ids;
    var y_axis = data.sample_values;
    var text = data.otu_ids
    var size = data.sample_values;
    var color = data.otu_ids;
  
    var bubble_chart = {
      x: x_axis,
      y: y_axis,
      text: text,
      mode: `markers`,
      marker: {
        size: size,
        color: color
      }
    };

    var data = [bubble_chart];

    var layout = {
      title: "Belly Button Bacteria",
      xaxis: {title: "OTU ID"}
    };
    Plotly.newPlot("bubble", data, layout);