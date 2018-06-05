var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(queryUrl, function(data) {
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {
    console.log(earthquakeData);
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + "Magnitude: " + feature.properties.mag + ". " + new Date(feature.properties.time) + "</p>");
    }

    var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature
      });

      createMap(earthquakes);
    }
    
function createMap(earthquakes) {
    let mapboxUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';
    let accessToken = 'pk.eyJ1IjoicmluY2tkIiwiYSI6ImNpamc3ODR1aDAxMmx0c2x0Zm9lc3E1OTAifQ.pIkP7PdJMrR5TBIp93Dlbg';
    let streetMap = L.tileLayer(mapboxUrl, {id: 'mapbox.light', maxZoom: 20, accessToken: accessToken});
    let darkMap = L.tileLayer(mapboxUrl, {id: 'mapbox.dark', maxZoom: 20, accessToken: accessToken});
    let satelliteMap = L.tileLayer(mapboxUrl, {id: 'mapbox.satellite', maxZoom: 20, accessToken: accessToken});
    let comicMap = L.tileLayer(mapboxUrl, {id: 'mapbox.comic', maxZoom: 20, accessToken: accessToken});
    let piratesMap = L.tileLayer(mapboxUrl, {id: 'mapbox.pirates', maxZoom: 20, accessToken: accessToken});
    let pencilMap = L.tileLayer(mapboxUrl, {id: 'mapbox.pencil', maxZoom: 20, accessToken: accessToken});

    var baseMaps = {
        "Street Map": streetMap,
        "Dark Map": darkMap,
        "Satellite Map": satelliteMap,
        "Comic Map": comicMap,
        "Pirates Map": piratesMap,
        "Pencil Map": pencilMap
        };
    
    var overlayMaps = {
    Earthquakes: earthquakes
    };

    var myMap = L.map("map", {
    center: [
        0, 50
    ],
    zoom: 2,
    layers: [satelliteMap, earthquakes]
    });

    L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
    }).addTo(myMap);
}