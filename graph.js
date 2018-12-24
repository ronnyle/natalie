
Plotly.d3.csv('valuesnewchapter.csv', function(err, rows) {

    var xAxis = 'SelfTransendence',
        yAxis = 'OpenessToChange',
        zAxis = 'Conservation';

      function unpack(rows, key) {
          return rows.map(function(row) { return row[key]; });
      }

      function getMarkerColor(label, labels) {
          return ['blue','red','yellow', 'black', 'orange', 'green'][labels.indexOf(label)];
      }
      
      var grouped = [];
      rows.forEach(r => {
        if (!grouped[r['Group Name']])
            grouped[r['Group Name']] = [];
        grouped[r['Group Name']].push(r);
      });

      var groupNames = Object.keys(grouped);
      var data = [];
      Object.entries(grouped).forEach(kv => {
          var color = getMarkerColor(kv[0], groupNames);
          data.push({
            x: unpack(kv[1], xAxis),
            y: unpack(kv[1], yAxis),
            z: unpack(kv[1], zAxis),
            mode: 'markers',
            type: 'scatter3d',
            showlegend: true,
            name: kv[0],
            marker: {
              color: color,
              size: 2
            }});
          data.push({
            alphahull: 7,
            opacity: 0.1,
            type: 'mesh3d',
            color: color,
            x: unpack(kv[1], xAxis),
            y: unpack(kv[1], yAxis),
            z: unpack(kv[1], zAxis)
          })
      });

  var layout = {
    height: 720,
    width: 1080,
    scene: {
        aspectratio: {
            x: 1,
            y: 1,
            z: 1
        },
        camera: {
            center: {
                x: 0,
                y: 0,
                z: 0
            },
            eye: {
                x: 1.25,
                y: 1.25,
                z: 1.25
            },
            up: {
                x: 0,
                y: 0,
                z: 1
            }
        },
        xaxis: {
            title: xAxis,
            type: 'linear',
            zeroline: false
        },
        yaxis: {
            title: yAxis,
            type: 'linear',
            zeroline: false
        },
        zaxis: {
            title: zAxis,
            type: 'linear',
            zeroline: false
        }
    },
    title: 'Values'
  };

  Plotly.newPlot('myDiv', data, layout, {showSendToCloud: true});

});