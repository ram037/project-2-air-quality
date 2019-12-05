function buildBarChart(selectTheYear) {

    const url = `/aqi_data/year/${selectTheYear}`

    d3.json(url).then(function (data) {

        const BAR = document.getElementById("bar");

        const stateCountyForYear = data.map(a => a.state_county);
        console.log(stateCountyForYear);

        // ***************************************************************
        // tracing good, moderate, unhealthy sensitive, unhealthy, v unhealthy, and hazard bars.
        // ***************************************************************

        // ***************************************************************
        // good_percentage
        // ***************************************************************
        const goodPercBar = {
            x: data.map(a => a.good_percentage).slice(0, 25),
            y: stateCountyForYear,
            name: 'Good Days',
            orientation: 'h',
            marker: { color: 'rgb(25, 100, 126)' },
            type: 'bar',
        };

        //***************************************************************
        //mod_percentage
        //***************************************************************

        var modPercBar = {
            x: data.map(a => a.moderate_percentage).slice(0, 25),
            y: stateCountyForYear,
            name: 'Moderate Days',
            orientation: 'h',
            type: 'bar',
            marker: { color: 'rgb(17,157,164)' },
        };

        //***************************************************************
        //unhealthy_sensitive_percentage
        //***************************************************************

        var unSentPercBar = {
            x: data.map(a => a.unhealthy_sensitive_percentage).slice(0, 25),
            y: stateCountyForYear,
            name: 'Unhealthy Sensitive Days',
            orientation: 'h',
            type: 'bar',
            marker: { color: 'rgb(255,177,36)' },
        };

        //***************************************************************
        //unhealthy_percentage
        //***************************************************************

        var unhealPercBar = {
            x: data.map(a => a.unhealthy_percentage).slice(0, 25),
            y: stateCountyForYear,
            name: 'Unhealthy Days',
            orientation: 'h',
            type: 'bar',
            marker: { color: 'rgb(75,63,114)' },
        };

        //***************************************************************
        //very_unhealthy_percentage
        //***************************************************************

        var vUnhealPercBar = {
            x: data.map(a => a.very_unhealthy_percentage).slice(0, 25),
            y: stateCountyForYear,
            name: 'Very Unhealthy Days',
            orientation: 'h',
            type: 'bar',
            marker: { color: 'rgb(198,63,114)' },
        };

        //***************************************************************
        //hazardous_percentage
        //***************************************************************

        var hazPercBar = {
            x: data.map(a => a.hazardous_percentage).slice(0, 25),
            y: stateCountyForYear,
            name: 'Hazardous Days',
            orientation: 'h',
            type: 'bar',
            marker: { color: 'rgb(207,68,65)' },
        };

        //***************************************************************
        //build traces
        //***************************************************************

        var barData = [goodPercBar, modPercBar, unSentPercBar, unhealPercBar, vUnhealPercBar, hazPercBar];

        //***************************************************************
        //build layout
        //***************************************************************

        const barLayout = {
            title: { text: `25 Counties with the Worst Air Quality ${selectTheYear}`, size: 18 },
            barmode: 'stack',
            yaxis: {
                automargin: true
            },
            height: 600,
            // width: 1000,
        };

        //***************************************************************
        //plot data
        //***************************************************************

        Plotly.newPlot(BAR, barData, barLayout, { responsive: true });


        const tableData = d3.select("tbody")
        tableData.html("");

        d3.select("tbody")
            .selectAll("tr")
            .data(data.slice((data.length) - 10))
            .enter()
            .append("tr")
            .html(function (d) {
                return `<td>${(d.county)}</td><td>${(d.state_abbr)}</td>`;
            });


        mapboxgl.accessToken = 'pk.eyJ1IjoidHllbGxhaW5laG8iLCJhIjoiY2szbTQ1b2xlMWJiNzNldDd5b2FtcGx2ciJ9.8v4tIXDp9vgHU3JVJQuGpg';
        var map = new mapboxgl.Map({
            container: 'mapid', // container id
            style: 'mapbox://styles/tyellaineho/ck3m5htnr4eo71cqxdut8a6he', //hosted style id
            center: [-98, 38.88], // starting position
            zoom: 4 // starting zoom
        });

        map.on("load", function () {

            var colorScale = chroma
                .scale("YlGnBu")
                .padding(0.15)
                .domain([0, 100]);

            function getColor(val) {
                return colorScale(val).hex();
            }

            var colors = {};

            data.forEach(function (county) {
                var GEOID = county.fips;
                var value = county.good_percentage;
                var color = getColor(value);
                if (!colors[color]) {
                    colors[color] = [];
                }
                colors[color].push(GEOID);
            });

            var colorExpression = ["match", ["get", "GEOID"]];
            var colorQuantiles = Object.entries(colors).forEach(function ([color, GEOIDs]) {
                colorExpression.push(GEOIDs, color);
            });

            colorExpression.push("rgba(0,0,0,0)");
            console.log(colorExpression);

            map.addLayer({
                id: "counties",
                type: "fill",
                source: {
                    type: "vector",
                    tiles: [
                        "https://gis-server.data.census.gov/arcgis/rest/services/Hosted/VT_2017_050_00_PY_D1/VectorTileServer/tile/{z}/{y}/{x}.pbf"
                    ]
                },
                "source-layer": "County",
                paint: {
                    "fill-opacity": 0.8,
                    "fill-color": colorExpression
                }
            });

            var popup = new mapboxgl.Popup({ closeOnClick: false })

            map.on("mouseover", "counties", function (e) {
                console.log(e);
                var coordinates = e.lngLat;
                var GEOID = e.features[0].properties.GEOID;
                var countyName = e.features[0].properties.BASENAME;
                var details = data.find(function (county) {
                    var response_GEOID = county.state + county.county;
                    return response_GEOID;
                });

                var resultArray = data.filter(obj => {
                    return obj.fips === GEOID
                });
                console.log(resultArray);
                var resultStAbbr = resultArray.map(a => a.state_abbr);
                var resultGoodDays = resultArray.map(a => a.good_days);
                var resultDaysMeas = resultArray.map(a => a.days_with_aqi);

                popup.setLngLat(coordinates)
                    .setHTML(`<h5>County : ${countyName} <br>
                    State: ${resultStAbbr} <br>
                    Good Days: ${resultGoodDays} <br>
                    Days Measured: ${resultDaysMeas}</h5>`)
                    .addTo(map);
            });

            map.on("mouseleave", "counties", function () {
                popup.remove();
            });
        });

    })
};


//***************************************************************
//initializing function to append years onto option bar, and create charts with first year indicated.
//***************************************************************

function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    arrOfYears = [2018, 2017, 2016, 2015, 2014, 2013]

    arrOfYears.forEach((year) => {
        selector
            .append("option")
            .text(year)
            .property("value", year);

    })

    // Use the first sample from the list to build the initial plots
    const firstYear = arrOfYears[0];
    buildBarChart(firstYear);
};

function optionChanged(newYear) {
    // Fetch new data each time a new sample is selected
    buildBarChart(newYear);
    // buildMetadata(newSample);
};

init();

function createPlot(select_state, select_year) {
    Plotly.d3.json(`/ozone_state/${select_state}/${select_year}`, function (err, rows) {
        function unpack(rows, key) {
            return rows.map(function (row) {
                return row[key];
            });
        }

        const first_twenty = rows.slice(0, 20);
        console.log(first_twenty);

        var data = [
            {
                type: "sunburst",
                maxdepth: 4,
                labels: unpack(rows, 'county'),
                values: unpack(rows, ('arithmetic_mean').toString()),
                parents: unpack(rows, 'state')
            }
        ];

        var layout = {
            margin: { l: 0, r: 0, b: 0, t: 0 },
            sunburstcolorway: [
                "#636efa", "#EF553B", "#00cc96", "#ab63fa", "#19d3f3",
                "#e763fa", "#FECB52", "#FFA15A", "#FF6692", "#B6E880"
            ],
            extendsunburstcolorway: true
        };
        Plotly.newPlot('myDiv', data, layout, { showSendToCloud: true });
    })
}

function getOption() {
    select_state =
        document.querySelector('#select_state').value;
    select_year =
        document.querySelector('#select_year').value;
    createPlot(select_state, select_year);
} 