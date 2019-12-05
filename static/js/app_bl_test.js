function buildBarChart(state_county) {
    
    const url = `/ozone_data/all`
    d3.json(url).then(function (data) {

        // selecting data by county
        function selcounty(data) {
            return data.state_county === state_county;
        }
        const counties = data.filter(selcounty);
            const ozoneline = {
                x: counties.map(a => a.year),
                y: counties.map(a => a.arithmetic_mean),
                name: 'Average ozone pollution',
                type: 'scatter',
                }

        var layout = {
            yaxis: {
                title: {
                text: 'Ozone parts per million'
                // font: {
                //   family: 'Courier New, monospace',
                //   size: 18,
                //   color: '#7f7f7f'
                    }
                }
            }

            const ozonelinedata = [ozoneline];

            const SCATTER = document.getElementById("scatter");
            Plotly.purge(SCATTER);
            Plotly.plot(SCATTER, ozonelinedata, layout);

    })

}

function optionChanged(state_county) {
    // Fetch new data each time a new sample is selected
    buildBarChart(state_county);
}