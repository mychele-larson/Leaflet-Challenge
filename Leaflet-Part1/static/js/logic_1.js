// // Create link to get geoJSON data
// const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson';

// // Promise pending
// const dataPromise = d3.json(url);
// console.log("Data Promise: ", dataPromise);

// // Create map object
// let myMap = L.map("mapid", {
//     center: [39.00, 34.00],
//     zoom: 3,
// });


// function createMaps(earthquake) 
//     var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     }).addTo(myMap);

//     // Fetch geoJSON data and console log it
// d3.json(url).then(function (data) {
//     createMaps(data.features);

// });

// function markerSize(magnitude) {
//     return magnitude * 20000;
// }
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson";

// Perform a GET request to the query URL/
d3.json(url).then(function (data) {
    // Once we get a response, send the data.features object to the createFeatures function.
    createMaps(data.features);

});

// Function to determine marker size 
function markerSize(magnitude) {
    return magnitude * 20000;
}

// Functipon to determine marker color
function chooseColor(depth) {
    if (depth < 10) return "chartreuse";
    else if (depth < 30) return "greenyellow";
    else if (depth < 50) return "yellow";
    else if (depth < 70) return "orange";
    else if (depth < 90) return "lightsalmon";
    else return "red";
}

function createMaps(earthquake) {
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    var myMap = L.map("mapid", {
        center: [37.09, -95.71],
        zoom: 5,
        layers: street
    });

    // Loop through the cities array, and create one marker for each city object.
    for (var i = 0; i < earthquake.length; i++) {
        L.circle([earthquake[i].geometry.coordinates[1], earthquake[i].geometry.coordinates[0]], {
            fillOpacity: 0.75,
            color: "black",
            weight: .5,
            fillColor: chooseColor(earthquake[i].geometry.coordinates[2]),
            // Setting our circle's radius to equal the output of our markerSize() function:
            // This will make our marker's size proportionate to earthquake magnitude
            radius: markerSize(earthquake[i].properties.mag)
        }).bindPopup(`<h1>${earthquake[i].properties.place}</h1> ` +
            `<hr> <h3>Magnitude: ${earthquake[i].properties.mag} &emsp; Depth: ${earthquake[i].geometry.coordinates[2]}</h3>`).addTo(myMap);
    }
    // ------- Legend specific -------------------------------------------
    var legend = L.control({ position: "bottomright" });

    legend.onAdd = function (map) {
        var div = L.DomUtil.create("div", "legend");

        div.innerHTML += '<i style="background: chartreuse"></i><span>-10-10</span><br>';
        div.innerHTML += '<i style="background: greenyellow"></i><span>10-30</span><br>';
        div.innerHTML += '<i style="background: yellow"></i><span>30-50</span><br>';
        div.innerHTML += '<i style="background: orange"></i><span>50-70</span><br>';
        div.innerHTML += '<i style="background: orangered"></i><span>70-90</span><br>';
        div.innerHTML += '<i style="background: red"></i><span>90+</span><br>';

        return div;
    };

    legend.addTo(myMap);
    // ----------- Legend -------------------------------------------------------
}
