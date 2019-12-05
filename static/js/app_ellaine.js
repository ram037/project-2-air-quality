function buildBarChart(fips) {
    const url = `/aqi_data/all`
    d3.json(url).then(function (data) {
        console.log(data);

        // filtering data for 2018
        function selYear2018(data) {
            return data.year === 2018;
        }
        const year2018 = data.filter(selYear2018);
        console.log(year2018);
        const stateCounty2018 = year2018.map(a => a.state_county);
        console.log(stateCounty2018);
        // tracing good, moderate, unhealthy sensitive, unhealthy, v unhealthy, and hazard bars.
        const goodPercBar2018 = {
            x: year2018.map(a => a.good_percentage).slice(0, 50),
            y: stateCounty2018,
            name: 'Good Days',
            orientation: 'h',
            marker: { color: 'rgb(25, 100, 126)' },
            type: 'bar'
        };

        var modPercBar2018 = {
            x: year2018.map(a => a.moderate_percentage).slice(0, 50),
            y: stateCounty2018,
            name: 'Moderate Days',
            orientation: 'h',
            type: 'bar',
            marker: { color: 'rgb(17,157,164)' },
        };

        var unSentPercBar2018 = {
            x: year2018.map(a => a.unhealthy_sensitive_percentage).slice(0, 50),
            y: stateCounty2018,
            name: 'Unhealthy Sensitive Days',
            orientation: 'h',
            type: 'bar',
            marker: { color: 'rgb(255,177,36)' },
        };

        var unhealPercBar2018 = {
            x: year2018.map(a => a.unhealthy_percentage).slice(0, 50),
            y: stateCounty2018,
            name: 'Unhealthy Days',
            orientation: 'h',
            type: 'bar',
            marker: { color: 'rgb(75,63,114)' },
        };

        var vUnhealPercBar2018 = {
            x: year2018.map(a => a.very_unhealthy_percentage).slice(0, 50),
            y: stateCounty2018,
            name: 'Very Unhealthy Days',
            orientation: 'h',
            type: 'bar',
            marker: { color: 'rgb(198,63,114)' },
        };

        var hazPercBar2018 = {
            x: year2018.map(a => a.hazardous_percentage).slice(0, 50),
            y: stateCounty2018,
            name: 'Hazardous Days',
            orientation: 'h',
            type: 'bar',
            marker: { color: 'rgb(207,68,65)' },
        };

        var data2018 = [goodPercBar2018, modPercBar2018, unSentPercBar2018, unhealPercBar2018, vUnhealPercBar2018, hazPercBar2018];

        const layout2018 = {
            title: '50 Cities with the Worst Air Quality 2018',
            barmode: 'stack',
            height: 1000,
            width: 1000
        };
        // filter data for 2017
        function selYear2017(data) {
            return data.year === 2017;
        }
        const year2017 = data.filter(selYear2017);
        console.log(year2017);
        const stateCounty2017 = year2017.map(a => a.state_county);
        console.log(stateCounty2017);
        // tracing good, moderate, unhealthy sensitive, unhealthy, v unhealthy, and hazard bars.
        const goodPercBar2017 = {
            x: year2017.map(a => a.good_percentage).slice(0, 50),
            y: stateCounty2017,
            name: 'Good Days',
            orientation: 'h',
            marker: { color: 'rgb(25, 100, 126)' },
            type: 'bar'
        };

        var modPercBar2017 = {
            x: year2017.map(a => a.moderate_percentage).slice(0, 50),
            y: stateCounty2017,
            name: 'Moderate Days',
            orientation: 'h',
            type: 'bar',
            marker: { color: 'rgb(17,157,164)' },
        };

        var unSentPercBar2017 = {
            x: year2017.map(a => a.unhealthy_sensitive_percentage).slice(0, 50),
            y: stateCounty2017,
            name: 'Unhealthy Sensitive Days',
            orientation: 'h',
            type: 'bar',
            marker: { color: 'rgb(255,177,36)' },
        };

        var unhealPercBar2017 = {
            x: year2017.map(a => a.unhealthy_percentage).slice(0, 50),
            y: stateCounty2017,
            name: 'Unhealthy Days',
            orientation: 'h',
            type: 'bar',
            marker: { color: 'rgb(75,63,114)' },
        };

        var vUnhealPercBar2017 = {
            x: year2017.map(a => a.very_unhealthy_percentage).slice(0, 50),
            y: stateCounty2017,
            name: 'Very Unhealthy Days',
            orientation: 'h',
            type: 'bar',
            marker: { color: 'rgb(198,63,114)' },
        };

        var hazPercBar2017 = {
            x: year2017.map(a => a.hazardous_percentage).slice(0, 50),
            y: stateCounty2017,
            name: 'Hazardous Days',
            orientation: 'h',
            type: 'bar',
            marker: { color: 'rgb(207,68,65)' },
        };

        var data2017 = [goodPercBar2017, modPercBar2017, unSentPercBar2017, unhealPercBar2017, vUnhealPercBar2017, hazPercBar2017];

        const layout2017 = {
            title: '50 Cities with the Worst Air Quality 2017',
            barmode: 'stack',
            height: 1000,
            width: 1000
        };

        // filter data for 2016
        function selYear2016(data) {
            return data.year === 2016;
        }
        const year2016 = data.filter(selYear2016);
        console.log(year2016);
        const stateCounty2016 = year2016.map(a => a.state_county);
        console.log(stateCounty2016);
        // tracing good, moderate, unhealthy sensitive, unhealthy, v unhealthy, and hazard bars.
        const goodPercBar2016 = {
            x: year2016.map(a => a.good_percentage).slice(0, 50),
            y: stateCounty2016,
            name: 'Good Days',
            orientation: 'h',
            marker: { color: 'rgb(25, 100, 126)' },
            type: 'bar'
        };

        var modPercBar2016 = {
            x: year2016.map(a => a.moderate_percentage).slice(0, 50),
            y: stateCounty2016,
            name: 'Moderate Days',
            orientation: 'h',
            type: 'bar',
            marker: { color: 'rgb(17,157,164)' },
        };

        var unSentPercBar2016 = {
            x: year2016.map(a => a.unhealthy_sensitive_percentage).slice(0, 50),
            y: stateCounty2016,
            name: 'Unhealthy Sensitive Days',
            orientation: 'h',
            type: 'bar',
            marker: { color: 'rgb(255,177,36)' },
        };

        var unhealPercBar2016 = {
            x: year2016.map(a => a.unhealthy_percentage).slice(0, 50),
            y: stateCounty2016,
            name: 'Unhealthy Days',
            orientation: 'h',
            type: 'bar',
            marker: { color: 'rgb(75,63,114)' },
        };

        var vUnhealPercBar2016 = {
            x: year2016.map(a => a.very_unhealthy_percentage).slice(0, 50),
            y: stateCounty2016,
            name: 'Very Unhealthy Days',
            orientation: 'h',
            type: 'bar',
            marker: { color: 'rgb(198,63,114)' },
        };

        var hazPercBar2016 = {
            x: year2016.map(a => a.hazardous_percentage).slice(0, 50),
            y: stateCounty2016,
            name: 'Hazardous Days',
            orientation: 'h',
            type: 'bar',
            marker: { color: 'rgb(207,68,65)' },
        };

        var data2016 = [goodPercBar2016, modPercBar2016, unSentPercBar2016, unhealPercBar2016, vUnhealPercBar2016, hazPercBar2016];

        const layout2016 = {
            title: '50 Cities with the Worst Air Quality 2016',
            barmode: 'stack',
            height: 1000,
            width: 1000
        };

        // filter data for 2015
        function selYear2015(data) {
            return data.year === 2015;
        }
        const year2015 = data.filter(selYear2015);
        console.log(year2015);
        const stateCounty2015 = year2015.map(a => a.state_county);
        console.log(stateCounty2015);
        // tracing good, moderate, unhealthy sensitive, unhealthy, v unhealthy, and hazard bars.
        const goodPercBar2015 = {
            x: year2015.map(a => a.good_percentage).slice(0, 50),
            y: stateCounty2015,
            name: 'Good Days',
            orientation: 'h',
            marker: { color: 'rgb(25, 100, 126)' },
            type: 'bar'
        };

        var modPercBar2015 = {
            x: year2015.map(a => a.moderate_percentage).slice(0, 50),
            y: stateCounty2015,
            name: 'Moderate Days',
            orientation: 'h',
            type: 'bar',
            marker: { color: 'rgb(17,157,164)' },
        };

        var unSentPercBar2015 = {
            x: year2015.map(a => a.unhealthy_sensitive_percentage).slice(0, 50),
            y: stateCounty2015,
            name: 'Unhealthy Sensitive Days',
            orientation: 'h',
            type: 'bar',
            marker: { color: 'rgb(255,177,36)' },
        };

        var unhealPercBar2015 = {
            x: year2015.map(a => a.unhealthy_percentage).slice(0, 50),
            y: stateCounty2015,
            name: 'Unhealthy Days',
            orientation: 'h',
            type: 'bar',
            marker: { color: 'rgb(75,63,114)' },
        };

        var vUnhealPercBar2015 = {
            x: year2015.map(a => a.very_unhealthy_percentage).slice(0, 50),
            y: stateCounty2015,
            name: 'Very Unhealthy Days',
            orientation: 'h',
            type: 'bar',
            marker: { color: 'rgb(198,63,114)' },
        };

        var hazPercBar2015 = {
            x: year2015.map(a => a.hazardous_percentage).slice(0, 50),
            y: stateCounty2015,
            name: 'Hazardous Days',
            orientation: 'h',
            type: 'bar',
            marker: { color: 'rgb(207,68,65)' },
        };

        var data2015 = [goodPercBar2015, modPercBar2015, unSentPercBar2015, unhealPercBar2015, vUnhealPercBar2015, hazPercBar2015];

        const layout2015 = {
            title: '50 Cities with the Worst Air Quality 2015',
            barmode: 'stack',
            height: 1000,
            width: 1000
        };

        // filter data for 2014
        function selYear2014(data) {
            return data.year === 2014;
        }
        const year2014 = data.filter(selYear2014);
        console.log(year2014);
        const stateCounty2014 = year2014.map(a => a.state_county);
        console.log(stateCounty2014);
        // tracing good, moderate, unhealthy sensitive, unhealthy, v unhealthy, and hazard bars.
        const goodPercBar2014 = {
            x: year2014.map(a => a.good_percentage).slice(0, 50),
            y: stateCounty2014,
            name: 'Good Days',
            orientation: 'h',
            marker: { color: 'rgb(25, 100, 126)' },
            type: 'bar'
        };

        var modPercBar2014 = {
            x: year2014.map(a => a.moderate_percentage).slice(0, 50),
            y: stateCounty2014,
            name: 'Moderate Days',
            orientation: 'h',
            type: 'bar',
            marker: { color: 'rgb(17,157,164)' },
        };

        var unSentPercBar2014 = {
            x: year2014.map(a => a.unhealthy_sensitive_percentage).slice(0, 50),
            y: stateCounty2014,
            name: 'Unhealthy Sensitive Days',
            orientation: 'h',
            type: 'bar',
            marker: { color: 'rgb(255,177,36)' },
        };

        var unhealPercBar2014 = {
            x: year2014.map(a => a.unhealthy_percentage).slice(0, 50),
            y: stateCounty2014,
            name: 'Unhealthy Days',
            orientation: 'h',
            type: 'bar',
            marker: { color: 'rgb(75,63,114)' },
        };

        var vUnhealPercBar2014 = {
            x: year2014.map(a => a.very_unhealthy_percentage).slice(0, 50),
            y: stateCounty2014,
            name: 'Very Unhealthy Days',
            orientation: 'h',
            type: 'bar',
            marker: { color: 'rgb(198,63,114)' },
        };

        var hazPercBar2014 = {
            x: year2014.map(a => a.hazardous_percentage).slice(0, 50),
            y: stateCounty2014,
            name: 'Hazardous Days',
            orientation: 'h',
            type: 'bar',
            marker: { color: 'rgb(207,68,65)' },
        };

        var data2014 = [goodPercBar2014, modPercBar2014, unSentPercBar2014, unhealPercBar2014, vUnhealPercBar2014, hazPercBar2014];

        const layout2014 = {
            title: '50 Cities with the Worst Air Quality 2014',
            barmode: 'stack',
            height: 1000,
            width: 1000
        };

        // filter data for 2013
        function selYear2013(data) {
            return data.year === 2013;
        }
        const year2013 = data.filter(selYear2013);
        console.log(year2013);
        const stateCounty2013 = year2013.map(a => a.state_county);
        console.log(stateCounty2013);
        // tracing good, moderate, unhealthy sensitive, unhealthy, v unhealthy, and hazard bars.
        const goodPercBar2013 = {
            x: year2013.map(a => a.good_percentage).slice(0, 50),
            y: stateCounty2013,
            name: 'Good Days',
            orientation: 'h',
            marker: { color: 'rgb(25, 100, 126)' },
            type: 'bar'
        };

        var modPercBar2013 = {
            x: year2013.map(a => a.moderate_percentage).slice(0, 50),
            y: stateCounty2013,
            name: 'Moderate Days',
            orientation: 'h',
            type: 'bar',
            marker: { color: 'rgb(17,157,164)' },
        };

        var unSentPercBar2013 = {
            x: year2013.map(a => a.unhealthy_sensitive_percentage).slice(0, 50),
            y: stateCounty2013,
            name: 'Unhealthy Sensitive Days',
            orientation: 'h',
            type: 'bar',
            marker: { color: 'rgb(255,177,36)' },
        };

        var unhealPercBar2013 = {
            x: year2013.map(a => a.unhealthy_percentage).slice(0, 50),
            y: stateCounty2013,
            name: 'Unhealthy Days',
            orientation: 'h',
            type: 'bar',
            marker: { color: 'rgb(75,63,114)' },
        };

        var vUnhealPercBar2013 = {
            x: year2013.map(a => a.very_unhealthy_percentage).slice(0, 50),
            y: stateCounty2013,
            name: 'Very Unhealthy Days',
            orientation: 'h',
            type: 'bar',
            marker: { color: 'rgb(198,63,114)' },
        };

        var hazPercBar2013 = {
            x: year2013.map(a => a.hazardous_percentage).slice(0, 50),
            y: stateCounty2013,
            name: 'Hazardous Days',
            orientation: 'h',
            type: 'bar',
            marker: { color: 'rgb(207,68,65)' },
        };

        var data2013 = [goodPercBar2013, modPercBar2013, unSentPercBar2013, unhealPercBar2013, vUnhealPercBar2013, hazPercBar2013];

        const layout2013 = {
            title: '50 Cities with the Worst Air Quality 2013',
            barmode: 'stack',
            height: 1000,
            width: 1000
        };

        const BAR = document.getElementById("bar");
        Plotly.plot(BAR, data2018, layout2018, { responsive: true });
        Plotly.plot('bar2', data2017, layout2017, { responsive: true });
        Plotly.plot('bar3', data2016, layout2016, { responsive: true });
        Plotly.plot('bar4', data2015, layout2015, { responsive: true });
        Plotly.plot('bar5', data2014, layout2014, { responsive: true });
        Plotly.plot('bar6', data2013, layout2013, { responsive: true });

        function randomize() {
            Plotly.animate(BAR, {
              data: data2017,
              traces: [0],
              layout: layout2017
            }, {
              transition: {
                duration: 500,
                easing: 'cubic-in-out'
              },
                frame: {
                    duration: 500
                }
            })
          }

        // function updatePlotly(newdata) {
        //     var PIE = document.getElementById("pie");
        //     Plotly.restyle(PIE, "values", [newdata]);
        //   }

    })




}




buildBarChart();