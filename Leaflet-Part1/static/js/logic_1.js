// Create link to get geoJSON data
const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson';

// Fetch geoJSON data and console log it
d3.json(url).then(function (data) {
    console.log("Data: ", data);
    createMaps(data.features);
});

// Create map object
let myMap = L.map("mapid", {
    center: [39.00, 34.00],
    zoom: 3,
});
function createMaps(earthquake) {
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);

    // Iterate through the earthquake data and create markers for each one
    earthquake.forEach(function (quake) {
        L.circle([quake.geometry.coordinates[1], quake.geometry.coordinates[0]], {
            fillOpacity: 0.75,
            color: "white",
            fillColor: "purple",
            radius: markerSize(quake.properties.mag)
        }).bindPopup("<h3>" + quake.properties.place +
            "</h3><hr><p>" + new Date(quake.properties.time) + "</p>")
            .addTo(myMap);
    });
}
earthquake.forEach(function (quake) {

    // Get the depth of the earthquake
    let depth = quake.geometry.coordinates[2];

    // Set the color of the marker based on the depth of the earthquake
    let markerColor;
    if (depth < 10) {
        markerColor = "green";
    } else if (depth < 20) {
        markerColor = "yellow";
    } else {
        markerColor = "red";
    }

    L.circle([quake.geometry.coordinates[1], quake.geometry.coordinates[0]], {
        fillOpacity: 0.75,
        color: "white",
        fillColor: markerColor,
        radius: markerSize(quake.properties.mag)
    }).bindPopup("<h3>" + quake.properties.place +
        "</h3><hr><p>" + new Date(quake.properties.time) + "</p>")
        .addTo(myMap);
});
// }
// function markerSize(magnitude) {
//     return magnitude * 20000;
// }

function createLegend() {
    let legend = L.control({ position: 'bottomright' });

    legend.onAdd = function (map) {
        let div = L.DomUtil.create('div', 'info legend'),
            depths = [0, 10, 20],
            labels = ["<strong>Depth (km)</strong>"],
            colors = ["green", "yellow", "red"];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (let i = 0; i < depths.length; i++) {
            div.innerHTML +=
                labels.push(
                    '<i style="background:' + colors[i] + '"></i> ' +
                    depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+'));
        }

        div.innerHTML = labels.join('<br>');
        return div;
    };

legend.addTo(myMap);
};

d3.json(url).then(function (data) {
    createMaps(data.features);
    createLegend();
});
