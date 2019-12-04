function buildBarChart(state_county) {
    const url = `/ozone_data/<state_county>/<year>`
    d3.json(url).then(function (data) {
        console.log(data);

        // filtering data for county 
        function selcounty(data) {
            return data.state_county === "Alabama_Baldwin";
        }
        const counties = data.filter(selcounty);
        console.log(counties);
        // const stateCounty2018 = counties.map(a => a.state_county);
        // console.log(stateCounty2018);
            const ozoneline = {
                x: counties.map(a => a.year),
                // .slice(0, 50),
                y: counties.map(a => a.arithmetic_mean),
                name: 'Average ozone pollution',
                type: 'scatter'
            };
            console.log(ozoneline);
            // console.log(ozoneline2018)
            const ozonelinedata = [ozoneline];

            const SCATTER = document.getElementById("scatter");
            Plotly.plot(SCATTER, ozonelinedata, { responsive: true });


    })

}



buildBarChart();

function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
    // Use the list of sample names to populate the select options
    d3.json(url).then(function (data) {
        
        function pickstatecounty(data) {
            return(data.state_county)
        }

    arrOfCounties = [data.state_county]
    console.log(arrOfCounties);
//     arrOfYears = [2018, 2017, 2016, 2015, 2014, 2013]
//     arrOfYears.forEach((year) => {
//         selector
//             .append("option")
//             .text(year)
//             .property("value", year);
//     })
//     // Use the first sample from the list to build the initial plots
//     const firstYear = arrOfYears[0];
//     buildBarChart(firstYear);
    })

// function optionChanged(newYear) {
//     // Fetch new data each time a new sample is selected
//     buildBarChart(newYear);
//     // buildMetadata(newSample);
}

init();