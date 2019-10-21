var myMap = L.map("map", {
    center: [35, -120],
    zoom: 4
  });
  
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);
  
  var newtry = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  
    
  function chooseColor(x) {
    x = x*15
    switch (true) {
    case (x < 10):
      return "green";
    case (x < 20):
      return "yellow";
    case (x < 30):
      return "orange";
    case (x < 40):
      return "orangered";
    case (x < 50):
      return "red";
    case (x < 200):
      return "firebrick";
    default:
      return "gray";
    }
  };
  
  function chooseSize(x) {
    x = x*200
    switch(true) {
     case (x > 0):
        return x
     default:
        return 1
    }
  };
  
  d3.json(newtry, function(response) {
  
    console.log(response);
     
    var num_feats = response.features
    for (var i = 0; i < num_feats.length; i++) {
         var location = num_feats[i].geometry;
         var magnitude = num_feats[i].properties.mag;
      
      if (location) {
        console.log(magnitude);
        L.circle([location.coordinates[1], location.coordinates[0]], {
          color:chooseColor(magnitude),
          radius: 500
        }).bindPopup("<h3> Magnitude:" + magnitude + "</h3> <hr> <p>Location: " + num_feats[i].properties.place + "</p>")
        .addTo(myMap);
      }
    }
  
  });