$(document).ready(function(){
  if(typeof window.navigator.geolocation != "undefined"){
    window.navigator.geolocation.getCurrentPosition(getWeather);
  }else{
    $(".weather-info").html("Location service disabled.");
  }

  $("#f2c").click(function(){
    var forc = $(this).attr("data-forc");
    if(forc === "f"){//to Celsius
      $("#f2c").html("C");
      $("#tempDisplay").html($(this).attr("data-cvalue"));
      $(this).attr("data-forc",'c');
    }else{
      $("#f2c").html("F");
      $("#tempDisplay").html($(this).attr("data-fvalue"));
      $(this).attr("data-forc",'f');
    }
  });
});

function getWeather(position){
  $.ajax({
    url : "http://api.openweathermap.org/data/2.5/weather?lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&appid=23e759e53bfc406af5d083810918e144",
    method : "GET",
    dataType : "json",
    success :function(response){
      console.log(response);
      displayWeather(response);
    }
  });
}

function displayWeather(weather){
  $("#location").html(weather.name);
  $("#weather").html(weather.weather[0].main);
  var kvalue = weather.main.temp,
      fvalue = parseInt(kvalue * 9/5 - 459.67),
      cvalue = parseInt((5/9) * (fvalue-32));
  $("#tempDisplay").html(fvalue);
  $("#f2c").attr("data-fvalue", fvalue);
  $("#f2c").attr("data-cvalue", cvalue);
}

function updateIcon(){
  
}