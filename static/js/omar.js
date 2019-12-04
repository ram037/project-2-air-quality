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
createPlot(select_state, select_year)
