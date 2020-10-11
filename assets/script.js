$(document).ready(function() {
    console.log("hello, javascript is working")

    var storedSearches = JSON.parse(localStorage.getItem("storedSearches")) || [] ;
    console.log("storedSearches", storedSearches)

    //a loop to populate past searches on the page for easy access
    for (var i = 0; i < storedSearches.length; i++) {
        var addLi = $("<li>")
        var addBtn = $("<button>")
        $(addBtn).attr({"trype": "button", "class": "btn btn-light", "id": storedSearches[i]})
        $(addBtn).text(storedSearches[i])
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
        var cityCurrent = $(this.id).val();
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

        

    });
    }

});