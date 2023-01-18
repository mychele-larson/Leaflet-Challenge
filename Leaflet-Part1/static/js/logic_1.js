// Create map object
let myMap = L.map("mapid", {
    center: [39.00, 34.00],
    zoom: 3,
});

// Add tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Create link to get geoJSON data
const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson';

// Promise pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Fetch geoJSON data and console log it
d3.json(url).then(function (error, data) {
    L.geoJson(data).addTo(myMap);
    console.log(data);
});
