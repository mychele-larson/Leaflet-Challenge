// Use this link to get the GeoJSON data
const url  = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson"

// Create promise
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

d3.json(url).then(function (data) {
    console.log(data)
});

// Perform a GET request to the query URL/
// d3.json(url).then(function (data) {

    // Once we get a response, send the data.features object to the createFeatures function.
    createEarthquakes(data.features);


    function createEarthquakes(earthquakeData) {

        var markers = [];

        for (var i = 0; i < earthquakeData.length; i++) {

            var lat = earthquakeData[i].geometry.coordinates[1]
            var lng = earthquakeData[i].geometry.coordinates[0]
            var coord = [lat, lng]
            var depth = earthquakeData[i].geometry.coordinates[2]
            var mag = earthquakeData[i].properties.mag
            var color = "";
            if (depth < 10) {
                color = "#77FF33"
            }
            else if (depth < 30) {
                color = "#33FF35"
            }
            else if (depth < 50) {
                color = "#FFE033"
            }
            else if (depth < 70) {
                color = "#FF8E33"
            }
            else if (depth < 90) {
                color = "#FF7133"
            }
            else {
                color = "#FF4A33"
            }
            markers.push(
                L.circle(coord, {
                    stroke: false,
                    fillOpacity: 0.75,
                    color: "black",
                    fillColor: color,
                    radius: mag * 10000
                }).bindPopup(`<h3>${earthquakeData[i].properties.place}</h3><hr><p><h2>Depth: ${(earthquakeData[i].geometry.coordinates[2])} km</h2></p><p><h2>Magnitude: ${(earthquakeData[i].properties.mag)}</h2></p>
      `)
            )
        }

        var earthquakes = L.layerGroup(markers)

        createMap(earthquakes);
    }

    function createMap(earthquakes) {

        // Create the base layers.
        var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        })

        var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        });

        // Create a baseMaps object.
        var baseMaps = {
            "Street Map": street,
            "Topographic Map": topo
        };

        // Create an overlay object to hold our overlay.
        var overlayMaps = {
            "Earthquakes": earthquakes
        };

        // Create our map, giving it the streetmap and earthquakes layers to display on load.
        var myMap = L.map("map", {
            center: [
                37.09, -95.71
            ],
            zoom: 5,
            layers: [street, earthquakes]
        });

        // Create a layer control.
        // Pass it our baseMaps and overlayMaps.
        // Add the layer control to the map.
        L.control.layers(baseMaps, overlayMaps, {
            collapsed: false
        }).addTo(myMap);

        function legnedColors(depth) {
            if (depth < 10) {
                return "#77FF33"
            }
            else if (depth < 30) {
                return "#33FF35"
            }
            else if (depth < 50) {
                return "#FFE033"
            }
            else if (depth < 70) {
                return "#FF8E33"
            }
            else if (depth < 90) {
                return "#FF7133"
            }
            else {
                return "#FF4A33"
            }
        }

        var legend = L.control({
            position: "bottomright",
            fillcolor: "white",
            collapsed: false,
            title: "Earthquake Depth"
        });

        legend.onAdd = function () {
            var div = L.DomUtil.create("div", "legend");
            var depth = [9, 29, 49, 69, 89, 500];
            var labels = ["<10", "10-30", "30-50", "50-70", "70-90", "90+"];
            div.innerHTML = '<div>Earthquake Depth (Km) </div>';
            for (var i = 0; i < depth.length; i++) {
                div.innerHTML += '<i style="background:' + legnedColors(depth[i]) + '">&nbsp;&nbsp;&nbsp;&nbsp;</i>&nbsp;' +
                    labels[i] + '<br>';
            }
            return div;
        };

        legend.addTo(myMap);
    };