# Leaflet-Challenge
### Module 15 Challenge

### Due Jan 23 by 11:59pm Points 100 Submitting a text entry box or a website url 

Background
The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

### Instructions:

    Part 1: Create the Earthquake Visualization

    Part 2: Gather and Plot More Data (Optional with no extra points earning)


![image](https://user-images.githubusercontent.com/110074895/211966871-5129582c-d23f-4495-bc8c-3da0efacad5a.png)


The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the USGS GeoJSON Feed: http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php

When you click a dataset (such as "All Earthquakes from the Past 7 Days"), you will be given a JSON representation of that data. Use the URL of this JSON to pull in the data for the visualization.

Import and visualize the data by doing the following:

1) Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude.
2) Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.

     ** Hint: The depth of the earth can be found as the third coordinate for each earthquake.

3) Include popups that provide additional information about the earthquake when its associated marker is clicked.
4) Create a legend that will provide context for your map data.
5) Your visualization should look something like the preceding map.

### Part 2: Gather and Plot More Data (Optional with no extra points earning)
Plot a second dataset on your map to illustrate the relationship between tectonic plates and seismic activity. You will need to pull in this dataset and visualize it alongside your original data. Data on tectonic plates can be found at https://github.com/fraxen/tectonicplates Links to an external site..

This part is completely optional; you can complete this part as a way to challenge yourself and boost your new skills.

The following image is an example screenshot of what you should produce:

![image](https://user-images.githubusercontent.com/110074895/211967808-1816566c-03f3-4917-a3ab-95e2f91dd6f5.png)


Perform the following tasks:

 1) Plot the tectonic plates dataset on the map in addition to the earthquakes.

 2) Add other base maps to choose from.

 3) Put each dataset into separate overlays that can be turned on and off independently.

 4) Add layer controls to your map.

