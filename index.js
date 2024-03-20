function weather() {
  let input = document.getElementById("input").value;
  let iconn = document.getElementById("iconImg");
  let iconDescription = document.getElementById('description');
  let locationTemp = document.getElementById("temp");
  let locationHeat = document.getElementById("heat");
  let locationName = document.getElementById("city");
  let locationState = document.getElementById("state");
  // let locationCountry = document.getElementById("country");
  let locationHumidity = document.getElementById("humid");
  let windSpeed = document.getElementById("wind");
  let locationDate = document.getElementById('date');
  let locationTime = document.getElementById('time');
  let sunrise = document.getElementById('rise');
  let sunset = document.getElementById('set');

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=1369021a9ab99c5a39d4f59fef56c43d&units=metric`
  )
    .then(function (data) {
      return data.json();
    })
    .then((response) => {
      console.log(response);
      let info = response.main;
      let img =response.weather[0].icon;
      iconn.setAttribute('src', `http://openweathermap.org/img/wn/${img}@2x.png`);
      let temperature = info.temp;
      locationTemp.innerHTML = temperature + "°c";
      let descript = response.weather[0].description;
      iconDescription.innerHTML = descript;
      let humid = info.humidity;
      locationHumidity.innerHTML = `${humid}  gm/m`;
      // let heatIndex = info.heat;
      // locationHeat.innerHTML = heatIndex
      let city = response.name;
      let locationCountry = response.sys.country;
      locationName.innerHTML = `${city}, ${locationCountry}.`;

       let sun = response.sys.sunset;
    var newDate = new Date(sun * 1000);
    sunset.innerHTML ='Sunset: ' + newDate.toLocaleTimeString();

    let sunr = response.sys.sunrise;
    var newDatee = new Date(sunr * 1000);
    sunrise.innerHTML = 'Sunrise: ' + newDatee.toLocaleTimeString();

    // let time = output.timezone;
    // // var zone = new Date(time);
    // // currentTime.innerHTML = zone.toLocaleTimeString();

    let speedd = response.wind.speed;
    windSpeed.innerHTML = speedd + "km/h";
      // let date = new Date();
      // locationDate.innerHTML = date.toDateString();
      let time = new Date();
      locationTime.innerHTML = time.toLocaleString();


    })
    .catch((err) => {
      console.log(err);
    });
}
let body = document.body;
let main = document.getElementById("cont");
let random = Math.floor(Math.random() * 12);
console.log(random);
imgSrc = random + ".jpg";
console.log(imgSrc);
body.style.backgroundImage = `url(${imgSrc})`;
