$(document).ready(function() {
    console.log("hello, javascript is working")

    var storedSearches = JSON.parse(localStorage.getItem("storedSearches")) || [] ;
    console.log("storedSearches", storedSearches)

    //a loop to populate past searches on the page for easy access
    for (var i = 0; i < storedSearches.length; i++) {
        var addLi = $("<li>")
        var addBtn = $("<button>")
        $(addBtn).attr({"type": "button", "class": "btn btn-light", "id": storedSearches[i]})
        $(addBtn).text(storedSearches[i])
        $(addBtn).val(storedSearches[i])
        $(addLi).append(addBtn)
        $(".pastSearches").prepend(addLi)
    }

    //    onClick function to save city name to local storage and start functions to run API request 
    $("#searchBtn").click(function() {
        var cityCurrent = $.trim($(this).siblings("input").val());
        console.log("cityCurrent", cityCurrent)
        storedSearches.push(cityCurrent)
        window.localStorage.setItem("storedSearches", JSON.stringify(storedSearches))
        var addLi = $("<li>")
        var addBtn = $("<button>")
        $(addBtn).attr({"trype": "button", "class": "btn btn-light", "id": cityCurrent})
        $(addBtn).text(cityCurrent)
        $(addLi).append(addBtn)
        $(".pastSearches").prepend(addLi)
        currentWeather(cityCurrent)
    })

    // on click function for past cities 
    $(".btn-light").click(function() {
        var cityCurrent = $(this).val();
        console.log("cityCurrent", cityCurrent)
        currentWeather(cityCurrent)
    })

    // function to add search data after 
    function currentWeather(cityCurrent) {
        var city = cityCurrent
        console.log("city", city)

        // Constructing queryURL using city for current weather
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=fdd6f8efa4fbb992f2faddee7d45c8de";
       
        // Performing an AJAX request with the queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      })

      // After data comes back from the request
      .then(function(response) {
        
        console.log(response, "response from ajax request");

        // storing the data from the AJAX request in the results variable
        var results = response;
        var addName = $(".currentName").text(response.name + " (" + moment().format('l') + ")");
        $(".currentName").append(addName)

        var addTemp = $(".currentTemp").text("Temperature: " + Math.round(response.main.temp) + " °F");
        $(".currentTemp").append(addTemp);

        var addHum = $(".currentHum").text("Humidity: " + response.main.humidity);
        $(".currentHum").append(addHum);

        var addWs = $(".currentWs").text("Wind Speed: " + response.wind.speed);
        $(".currentWs").append(addWs);

        var currentLat = response.coord.lat
        var currentLon = response.coord.lon
        console.log(currentLat, currentLon)
        runUv(currentLat,currentLon)

    });
    }

    function runUv(currentLat, currentLon) {
        var lat = currentLat
        var lon = currentLon

         // Constructing queryURL using lat and lon for UV index
         var queryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=fdd6f8efa4fbb992f2faddee7d45c8de";
       
         // Performing an AJAX request with the queryURL
       $.ajax({
         url: queryURL,
         method: "GET"
       })
 
       // After data comes back from the request
       .then(function(response) {
         
         console.log(response.value, "response from ajax request for UV");

         var addUv = $("#uvIndex").text(response.value); 
         $("#uvIndex").append(addUv);

         if (response.value <= 3) {
             var addColor = $("#uvIndex").css("background-color", "green");
             addColor.css("color", "white");
             $(".uvIndex").append(addColor);
         } else if (response.value <= 7) {
            var addColor = $("#uvIndex").css("background-color", "yellow");
            addColor.css("color", "black");
            $("#uvIndex").append(addColor);
         } else {
            var addColor = $("#uvIndex").css("background-color", "red");
            addColor.css("color", "white");
            $("#uvIndex").append(addColor);
         }
 

       })
    }
});