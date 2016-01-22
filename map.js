var url='http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png';
var attrib='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>';
var cartoDbMap = new L.TileLayer(url, {attribution: attrib}); 

var customMarker = L.circleMarker;

var map = L.map('map', {
    center: [40.71623733, -73.98472309],
    zoom: 15,
    fullscreenControl: true,
    fullscreenControlOptions: {
        position: 'topleft'
    },
    layers: [cartoDbMap]
});

$.ajax({
    url: "https://raw.githubusercontent.com/mtvaccaro/les_liquor_licenses/master/active_licenses.json",
    success: function(response) {
        $.each(eval(response), function(key, val) {  
        var lon = val.lon;
        var lat = val.lat;
        var address = val.Address;
        var premises = val.Premises;
        var popUpContent = "<dl><dt>"+premises+"</dt>"
                            + "<dt>Address: "+address+"</dt>"
                            "</dl>";
        
        marker = new customMarker([lat,lon], {
            opacity: 0.5
        });
        marker.bindPopup(popUpContent);
        marker.setRadius(4);
        marker.addTo(map)
    });
    }
});
/*
$.ajax({
    url: "https://raw.githubusercontent.com/mtvaccaro/les_liquor_licenses/master/pending_licenses.json",
    success: function(response) {
        $.each(eval(response), function(key, val) {  
        var longitude = val.lon;
        var latitude = val.lat;

        marker = new customMarker([latitude,longitude], {
            opacity: 0.3
        });
        marker.setRadius(1);
        marker.addTo(map)
    });
    }
});
*/
