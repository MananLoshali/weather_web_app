const submitButton = document.querySelector(".button");
const wrapperClass = document.querySelector(".wrapper");
const mainContainer = document.querySelector(".main-container");
const paragraph = document.querySelector(".para");
console.log(paragraph);
let API_URL;
const API_KEY = "4f27a2e8c82ed11fbb94c973dc52fd52";

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  wrapperClass.style.display = "none";
  paragraph.style.display = "none";
  const inputField = document.querySelector(".input").value;
  const tempUnit = document.querySelector(".select-tag").value;
  API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputField}&units=${tempUnit}&appid=${API_KEY}`;
  fetchData();
});

const fetchData = async () => {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    if (data.cod === 200) {
      wrapperClass.style.display = "block";
      updateData(data);
    } else {
      paragraph.style.display = "block";
      paragraph.textContent = data.message;
      console.log(data.message);
    }
  } catch (error) {
    paragraph.style.display = "block";
    paragraph.textContent = "Something went wrong!!! Check your connection";
    console.log(error);
  }
};

const updateData = (data) => {
  const weatherImg = document.querySelector(".weather-image");
  let id = data.weather[0].id;
  if (id == 800) {
    weatherImg.src = "assests/clear.png";
  } else if (id >= 200 && id <= 232) {
    weatherImg.src = "assests/storm.png";
  } else if (id >= 600 && id <= 622) {
    weatherImg.src = "assests/snow.png";
  } else if (id >= 701 && id <= 781) {
    weatherImg.src = "assests/fog.png";
  } else if (id >= 801 && id <= 804) {
    weatherImg.src = "assests/sun.png";
  } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
    weatherImg.src = "assests/rain.png";
  }

  let sunriseData = data.sys.sunrise;
  let sunsetData = data.sys.sunset;

  var sunrisedate = new Date(sunriseData * 1000);
  var sunsetdate = new Date(sunsetData * 1000);

  var srhours = sunrisedate.getHours();
  // Minutes part from the timestamp
  var srminutes = "0" + sunrisedate.getMinutes();
  //   // Seconds part from the timestamp
  //   var srseconds = "0" + sunrisedate.getSeconds();

  // Will display time in 10:30:23 format
  var sunriseTime = srhours + ":" + srminutes.substr(-2);
  console.log(sunriseTime);

  var sshours = sunsetdate.getHours();
  // Minutes part from the timestamp
  var ssminutes = "0" + sunsetdate.getMinutes();
  // Seconds part from the timestamp
  //   var ssseconds = "0" + sunsetdate.getSeconds();

  // Will display time in 10:30:23 format
  var sunsetTime = sshours + ":" + ssminutes.substr(-2);
  console.log(sunsetTime);

  document.querySelector(".city-name").textContent = data.name;
  document.querySelector(".country-name").textContent = data.sys.country;
  document.querySelector(".main-desc").textContent = data.weather[0].main;
  document.querySelector(".desc").textContent = data.weather[0].description;
  document.querySelector(".temperature").innerHTML = `${Math.round(
    data.main.temp
  )}&deg;`;
  document.querySelector("#min-temp").innerHTML = `${Math.round(
    data.main.temp_min
  )}&deg;`;
  document.querySelector("#max-temp").innerHTML = `${Math.round(
    data.main.temp_max
  )}&deg;`;
  document.querySelector("#pressure").textContent = data.main.pressure;
  document.querySelector("#humidity").textContent = data.main.humidity;
  document.querySelector("#wind-speed").textContent = `${data.wind.speed}km/hr`;
  document.querySelector("#sunrise").textContent = sunriseTime;
  document.querySelector("#sunset").textContent = sunsetTime;
};
