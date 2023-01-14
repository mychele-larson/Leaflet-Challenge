// Create map object

let myMap = L.map("mapid", {
    center: [39.00, 34.00],
    zoom:3,
});

// Add tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap); 

// Create link to get geoJSON data
var link = 'https://earthquake.usgs.gov/fdsnws/event/1/[application.json[?format=geojson]]';

{
    "type": "Feature",
        "geometry": {
        "type": "Point",
            "coordinates": [125.6, 10.1]
    },
    "properties": {
        "name": "Dinagat Islands"
    }
}
{
    type: "FeatureCollection",
        metadata: {
        generated: Long Integer,
            url: String,
                title: String,
                    api: String,
                        count: Integer,
                            status: Integer
    },
    bbox: [
        minimum longitude,
        minimum latitude,
        minimum depth,
        maximum longitude,
        maximum latitude,
        maximum depth
    ],
        features: [
            {
                type: "Feature",
                properties: {
                    mag: Decimal,
                    place: String,
                    time: Long Integer,
                    updated: Long Integer,
                    tz: Integer,
                    url: String,
                    detail: String,
                    felt: Integer,
                    cdi: Decimal,
                    mmi: Decimal,
                    alert: String,
                    status: String,
                    tsunami: Integer,
                    sig: Integer,
                    net: String,
                    code: String,
                    ids: String,
                    sources: String,
                    types: String,
                    nst: Integer,
                    dmin: Decimal,
                    rms: Decimal,
                    gap: Decimal,
                    magType: String,
                    type: String
                },
                geometry: {
                    type: "Point",
                    coordinates: [
                        longitude,
                        latitude,
                        depth
                    ]
                },
                id: String
            },
    …
        ]
}

// d3.json(link).then(function (data) {
//     console.log(data);

//     for (var i = 0; i < data.length; i++) {
//         var location = data[i].location;

//         if (location) {
//             L.marker([location.coordinates[0], location.coordinates[1]]).addTo(myMap);
//         }
//     }
// });


// function createFeatures(data) {
//     for (i = 0; i < data.length; i++) {
//         feature = data[i];
//         let color = markerColor(feature);
//         let radius = markerRadius(feature);
//         let marker = L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
//             title: feature.properties.place,
//             color: color,
//             fillColor: color,
//             fillOpacity: 0.5,
//             radius: feature.properties.mag * 10000
//         }
//         ).bindPopup("<strong>" + feature.properties.place + "</strong><br>" +
//             Date(feature.properties.time) + "<hr />" +
//             "depth: " + feature.geometry.coordinates[2] + " km <br>magnitude: " + feature.properties.mag
//         ).addTo(myMap);
//     }
// };

// determine  marker color by depth
// function markerColor(feature) {
//     depth = feature.geometry.coordinates[2];

//     //console.log(depth);
//     let color = "black";
//     let colorList = [
//         '#fced05',
//         '#fdb805',
//         '#ef8724',
//         '#d35a33',
//         '#ac343a',
//         '#7e1638',
//         '#4d022e'

//     ];
//     // less than 10 km deep
//     if (depth < 0 || depth < 10) {
//         color = colorList[0];
//     }
//     // 10-100 km
//     else if (depth < 100) {
//         color = colorList[1];
//     }
//     // 100-200km
//     else if (depth < 200) {
//         color = colorList[2];
//     }
//     // 200-300 km
//     else if (depth < 300) {
//         color = colorList[3];
//     }
//     // 300-400km
//     else if (depth < 400) {
//         color = colorList[4];
//     }
//     // 400-500
//     else if (depth < 500) {
//         color = colorList[5];
//     }
//     //>500
//     else if (depth >= 500) {
//         color = colorList[6];
//     }
//     return color;
// };

// // determine marker size by radius
// function markerRadius(feature) {
//     magnitude = feature.properties.mag;
//     let mag = 0
//     if (magnitude >= 0) {
//         mag = Math.sqrt(magnitude) * 1000
//     }
//     return mag;
// };

// // legend
// var legend = L.control({ position: 'bottomright' });

// legend.onAdd = function (map) {
//     // colors
//     var div = L.DomUtil.create('div', 'info legend'),
//         depth = [0, 10, 100, 200, 300, 400, 500, '> 500'],
//         labels = [];
//     colorList = [
//         '#fced05',
//         '#fdb805',
//         '#ef8724',
//         '#d35a33',
//         '#ac343a',
//         '#7e1638',
//         '#4d022e'
//     ];

//     // legend
//     div.innerHTML +=
//         '<h3> Depth of Earthquake</h3>';
//     for (var i = 0; i < colorList.length; i++) {
//         if (i == colorList.length - 1) {
//             div.innerHTML +=
//                 '<i style="background:' + colorList[i] + '"></i> ' +
//                 '>' + depth[i] + ' km' + '<br>';
//         }
//         else if (i === 0) {
//             div.innerHTML +=
//                 '<i style="background:' + colorList[i] + '"></i> ' +
//                 '<' + depth[i + 1] + ' km' + '<br>';
//         }
//         else {
//             div.innerHTML +=
//                 '<i style="background:' + colorList[i] + '"></i> ' +
//                 depth[i] + '-' + depth[i + 1] + ' km' + '<br>';
//         }
//     }
//     div.innerHTML += '<br>'
//     return div;
// };

// legend.addTo(myMap);