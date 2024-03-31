function weather() {
  let input = document.getElementById("input").value;
  let iconn = document.getElementById("iconImg");
  let iconDescription = document.getElementById("description");
  let locationTemp = document.getElementById("temp");
  let locationName = document.getElementById("city");
  let locationState = document.getElementById("state");
  let locationHumidity = document.getElementById("humid");
  let windSpeed = document.getElementById("wind");
  let locationDate = document.getElementById("date");
  let locationTime = document.getElementById("time");
  let sunrise = document.getElementById("rise");
  let sunset = document.getElementById("set");
  let notification = document.getElementById("notify");
  let display = document.getElementById("info");
  let pageError = document.querySelector(".not-found");
  let currentWeather = document.getElementById("current");
  let erase = document.getElementById('erase');
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=1369021a9ab99c5a39d4f59fef56c43d&units=metric`
  )
    .then(function (data) {
      return data.json();
    })
    .then((response) => {
      console.log(response);
      // console.log(response.cod);
      let codee = response.cod;
      let code = parseInt(codee);
      console.log(code);

      if (input && code == 200) {
        // display.classList.contains("show");
        display.classList.remove("hide");
        display.classList.add("show");
        pageError.classList.remove("show");
        pageError.classList.add("hide");
        currentWeather.classList.remove("hide");
        currentWeather.classList.add("show");
        notification.innerHTML = "";
        erase.innerHTML = `<svg style="color:grey;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
  <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
</svg>`;
      } else if (code == 404) {
        display.classList.remove("hide");
        display.classList.add("show");
        currentWeather.classList.remove("show");
        currentWeather.classList.add("hide");
        pageError.classList.remove("hide");
        pageError.classList.add("show");
        erase.innerHTML = `<svg style="color:grey;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
  <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
</svg>`;
        notification.innerHTML = `<code style='color: red;'>City ${input} is not found <code/>`;
      } else {
        display.classList.remove("show");
        display.classList.add("hide");
        notification.innerHTML =
          "<code style='color: red;'>please input a location, connect to the internet and try again!<code/>";
      }

      let info = response.main;

      // temperature
      let temperature = info.temp;
      locationTemp.innerHTML = temperature + "°c";
      let descript = response.weather[0].description;

      // weather icon
      let img = response.weather[0].icon;
      iconn.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${img}@2x.png`
      );

      iconDescription.innerHTML = descript;

      // humidity
      let humid = info.humidity;
      locationHumidity.innerHTML = `${humid}  %`;

      // city & country
      let city = response.name;
      let locationCountry = response.sys.country;
      locationName.innerHTML = `${city}, ${locationCountry}.`;

      // sunsrise & sunset
      let sun = response.sys.sunset;
      var newDate = new Date(sun * 1000);
      sunset.innerHTML = "Sunset: " + newDate.toLocaleTimeString();

      let sunr = response.sys.sunrise;
      var newDatee = new Date(sunr * 1000);
      sunrise.innerHTML = "Sunrise: " + newDatee.toLocaleTimeString();

      //  wind speed
      let speedd = response.wind.speed;
      windSpeed.innerHTML = speedd + "m/s";

      // location time
      let timezoneSeconds = response.timezone;
      let timezoneMilliseconds = timezoneSeconds * 1000;
            let isDST = response.timezone > response.timezone_offset;
            // new Date().getTimezoneOffset()<(timezoneSeconds / 60);

            // consIdering DST
      const currentTimeUTC = new Date();
      // const localTime = new Date(
        // currentTimeUTC.getTime() + timezoneMilliseconds + (isDST ? 360000;
        let localTime;
        if(isDST){
        localTime = new Date( currentTimeUTC.getTime() + timezoneMilliseconds + 3600000);
        } else{
        localTime = new Date(
          currentTimeUTC.getTime() + timezoneMilliseconds - 3600000)
        };
      locationTime.innerHTML = localTime.toLocaleTimeString();
      locationDate.innerHTML = localTime.toLocaleDateString();
      console.log(isDST);
      
      // let time = output.timezone;
      // // var zone = new Date(time);
      // // currentTime.innerHTML = zone.toLocaleTimeString();
      // let date = new Date();
      // locationDate.innerHTML = date.toDateString();
      // let time = new Date();
      // locationTime.innerHTML = time.toLocaleString();
    })

    // error message
    .catch((err) => {
      console.log(err.message);
    });
}
function erase(){
    let input = document.getElementById("input");
    var clrInput = input.value.slice(-1, 0);
      input.value = clrInput;

}
function clearr() {

  let clear = document.getElementById("info");
  let clearBtn = document.getElementById("clearBtn");
  if (clear.classList.contains("show")) {
    clear.classList.remove("show");
    clear.classList.add("hide");
    clearBtn.classList.add("hide");
  } else {
    clear.classList.remove("hide");
    clear.classList.add("show");
  }
}
// random background image
let body = document.body;
let random = Math.floor(Math.random() * 12);
imgSrc = `./image/${random}.jpg`;
body.style.backgroundImage = `url(${imgSrc})`;

// function displayApp(){
//   // let button = document.getElementById('btn');
//   let title = document.getElementById('title').value;
//   let fname = document.getElementById('fname').value;
//   let displayAll = document.getElementById('displayAll');
//     let log = document.getElementById("log");
// let submitResponse = document.getElementById('submitResponse');
//   if( title && fname && displayAll.classList.contains("hide") && log.classList.contains('show')){
//      displayAll.classList.remove("hide");
//       displayAll.classList.add("show");
//       log.classList.remove('show');
//       log.classList.add('hide');
//   }
//        else{
//         submitResponse.innerHTML = '<code style="color: red;"> please input your details and try again! <code/>';
//        }
// }
