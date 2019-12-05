function init() {
    // Grab a reference to the dropdown select element
    var dropDown = d3.select("select");

    console.log(d3.select("select"));

    dropDown
        .append("option")
        .text("state_county")


    const url = `/ozone_data/all`
    d3.json(url).then(function (data) {

        // Get the counties and filter the list to only contain unique values
        arrOfCounties = [];
        for(i=0; i < data.length; i+=6){
            arrOfCounties.push(data[i].state_county);
        }
        console.log(arrOfCounties);


        arrOfCounties.forEach((state_county) => {
            // console.log("should have added this dropdown item: " + state_county);

            var options = dropDown.append("option").text(state_county);

            // options.text(function(d) {
            //     return d.state_county;
                // })

            // dropDown
            //     .append("option")
            //     .text(state_county)
            })


        // Use the first sample from the list to build the initial plots
        const firstCounty = arrOfCounties[0];
        buildBarChart(firstCounty);
        })
    }

init();