// *********************************************************************************************
// the below function will build a multitrace barchart for the year selected, as well as a table
// additionally, it will build the mapbox air quality map
// *********************************************************************************************

function buildBarChart(selectTheYear) {

    const barUrl = `/aqi_data/year/${selectTheYear}`

    d3.json(barUrl).then(function (data) {

        const BAR = document.getElementById("bar");
        const stateCountyForYear = data.map(a => a.state_county);

        // ***************************************************************
        // tracing good, moderate, unhealthy sensitive, unhealthy, v unhealthy, and hazard bars.
        // the bar chart will only show the 25 worst counties in the year selected.
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

        const modPercBar = {
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

        const unSentPercBar = {
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

        const unhealPercBar = {
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

        const vUnhealPercBar = {
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

        const hazPercBar = {
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

        const barData = [goodPercBar, modPercBar, unSentPercBar, unhealPercBar, vUnhealPercBar, hazPercBar];

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
        };

        //***************************************************************
        //plot data for bar chart
        //***************************************************************

        Plotly.newPlot(BAR, barData, barLayout, { responsive: true });

        //***************************************************************
        //build table as a supplement to bar chart
        //table will slice top 10 counties with best air quality
        //***************************************************************

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

        //***************************************************************
        //build air quality map using mapbox
        //map will feature all counties in US in a colorscale
        //***************************************************************

        mapboxgl.accessToken = `pk.eyJ1IjoidHllbGxhaW5laG8iLCJhIjoiY2szdXRwbmhuMDRwZDNsbWZoNWRkMXF5eCJ9.PsDsO5MS0chNEsLaOvBhsw`;
        const map = new mapboxgl.Map({
            container: 'mapid', // container id
            style: 'mapbox://styles/tyellaineho/ck3m5htnr4eo71cqxdut8a6he', //hosted style id
            center: [-98, 38.88], // starting position
            zoom: 4 // starting zoom
        });

        map.on("load", function () {

            const colorScale = chroma
                .scale("YlGnBu")
                .padding(0.15)
                .domain([0, 100]);

            function getColor(val) {
                return colorScale(val).hex();
            }

            const colors = {};

            data.forEach(function (county) {
                var GEOID = county.fips;
                const value = county.good_percentage;
                const color = getColor(value);
                if (!colors[color]) {
                    colors[color] = [];
                }
                colors[color].push(GEOID);
            });

            const colorExpression = ["match", ["get", "GEOID"]];
            const colorQuantiles = Object.entries(colors).forEach(function ([color, GEOIDs]) {
                colorExpression.push(GEOIDs, color);
            });

            colorExpression.push("rgba(0,0,0,0)");

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
                    "fill-opacity": 0.7,
                    "fill-color": colorExpression
                }
            });

            // add specs for hoverover popup on map

            const popup = new mapboxgl.Popup({ closeOnClick: false })

            map.on("mouseover", "counties", function (e) {
                const coordinates = e.lngLat;
                var GEOID = e.features[0].properties.GEOID;
                const countyName = e.features[0].properties.BASENAME;
                const details = data.find(function (county) {
                    const response_GEOID = county.state + county.county;
                    return response_GEOID;
                });

                const resultArray = data.filter(obj => {
                    return obj.fips === GEOID
                });
                const resultStAbbr = resultArray.map(a => a.state_abbr);
                const resultGoodDays = resultArray.map(a => a.good_days);
                const resultDaysMeas = resultArray.map(a => a.days_with_aqi);

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

//***************************************************************************************************
//initializing function to create line plot
//***************************************************************************************************

function buildLineGraph(state_county) {

    const ozoneUrl = `/ozone_data/all`
    d3.json(ozoneUrl).then(function (data) {

        // selecting data by county
        function selcounty(data) {
            return data.state_county === state_county;
        }
        const counties = data.filter(selcounty);
        const ozoneline = {
            x: counties.map(a => a.year),
            y: counties.map(a => a.arithmetic_mean),
            name: `Average Ozone Pollution`,
            type: 'linegraph',
        }

        var ozoneLayout = {
            yaxis: {
                title: {
                    text: 'Ozone parts per million'
                },
            },
            line: {
                color: "rgb(255, 152, 99)"
            }
        }

        const ozonelinedata = [ozoneline];

        const LINE = document.getElementById("linegraph");
        Plotly.newPlot(LINE, ozonelinedata, ozoneLayout, { responsive: true });

    });

};


//***************************************************************************************************
//initializing function to create sunburst plot
//***************************************************************************************************

function createBurstPlot(select_state, select_year) {
    Plotly.d3.json(`/ozone_state/${select_state}/${select_year}`, function (err, rows) {
        function unpack(rows, key) {
            return rows.map(function (row) {
                return row[key];
            });
        }

        const first_twenty = rows.slice(0, 20);

        const burstData = [
            {
                type: "sunburst",
                maxdepth: 4,
                labels: unpack(rows, 'county'),
                values: unpack(rows, ('arithmetic_mean').toString()),
                parents: unpack(rows, 'state')
            }
        ];

        const burstLayout = {
            margin: { l: 0, r: 0, b: 0, t: 0 },
            sunburstcolorway: [
                "#C1682C", "#EBA75F", "#4BA5A4", "#1D71BA", "#0E3C51",
                "#FF5E5B", "#F0DCD0", "#2F6690", "#D60A55", "#07B7BE"
            ],
            extendsunburstcolorway: true
        };
        Plotly.newPlot('sunburst', burstData, burstLayout, { showSendToCloud: true, responsive: true });
    });
};

//***************************************************************************************************
//initializing function to append years onto option bar, and create charts with first year indicated.
//***************************************************************************************************

function init() {

    //***************************************************************
    //find year options to build bar chart
    //***************************************************************

    // Grab a reference to the dropdown select element
    var barSelector = d3.select("#selDataset");

    // Use the list of years to populate the select options
    arrOfYears = [2018, 2017, 2016, 2015, 2014, 2013]

    // append options for multitrace bar chart
    arrOfYears.forEach((year) => {
        barSelector
            .append("option")
            .text(year)
            .property("value", year);

    });

    // Use the first year to create the bar chart
    const firstYear = arrOfYears[0];
    buildBarChart(firstYear);

    //***************************************************************
    //find state_county options to build line chart
    //***************************************************************

    // append options for ozone county data, as well as state data
    // this is used to load 
    const ozoneUrl = `/ozone_data/all`
    d3.json(ozoneUrl).then(function (data) {

        const lineSelector = d3.select("#selLine");
        // Get the counties and filter the list to only contain unique values
        arrOfCounties = [];
        for (i = 0; i < data.length; i += 6) {
            arrOfCounties.push(data[i].state_county);
        }

        arrOfCounties.forEach((state_county) => {
            const lineOptions = lineSelector
                .append("option")
                .text(state_county)
                .property("value", state_county);

        });

        const firstCounty = arrOfCounties[0];
        buildLineGraph(firstCounty);
    });


    //***************************************************************
    // obtaining state data and year for sunburst
    //***************************************************************

    // const ozoneStateUrl = `/ozone_data/${selState}/${selYear}`
    d3.json(ozoneUrl).then(function (data) {

        // append year options for sunburst graph
        const burstYearSelector = d3.select("#select_year");
        const arrOfBurstYears = [2018, 2017, 2016, 2015, 2014, 2013]

        arrOfBurstYears.forEach((year) => {
            burstYearSelector
                .append("option")
                .text(year)
                .property("value", year);
        });

        const burstStateSelector = d3.select("#select_state");
        // Get the states and filter the list to only contain unique values
        arrOfStates = [];
        arrOfDups = [];
        arrOfStates.push(data[0].state);

        for (i = 1; i < data.length; i++) {
            if (data[i].state === data[i - 1].state) {
                arrOfDups.push(data[i.state])
            } else {
                arrOfStates.push(data[i].state);
            }
        };

        arrOfStates.forEach((state) => {
            const burstOptions = burstStateSelector
                .append("option")
                .text(state)
                .property("value");

        });

        // Use the first year and state to create the sunburst chart
        const sunburstState = arrOfStates[0]
        const sunburstYear = arrOfYears[0]
        createBurstPlot(sunburstState, sunburstYear);
    });

};

function optionChanged(newYear) {
    // Fetch new year everytime the optionChanged is clicked
    buildBarChart(newYear);
};


function getBurstOption() {
    //fetch new state and year and create plot when getBurstOption is clicked
    select_state =
        document.querySelector('#select_state').value;
    select_year =
        document.querySelector('#select_year').value;
    createBurstPlot(select_state, select_year);
};

function lineOptionChanged(new_county) {
    // Fetch new county everytime the lineOptionChanged is clicked
    buildLineGraph(new_county);
};

// initialize function for webpage
init();