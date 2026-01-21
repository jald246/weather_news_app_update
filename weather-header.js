const apiKey = "0371c49fb172bd62cb4a97ace4b8a605";
const weatherURL =  `https://api.openweathermap.org/data/2.5/weather?q=tooele&units=imperial&appid=${apiKey}`;
const newsURL = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=b34121ecd12d4fdab01b1905e4d62571`;
/* const forecastURL =`https://api.openweathermap.org/data/2.5/forecast?q=tooele&units=imperial&appid=${apiKey}`; */


async function getData() {
    try{
      let response = await fetch(weatherURL);
      let data = await response.json();

      let newsResponse = await fetch(newsURL);
      let newsData = await newsResponse.json();

      displayNews(newsData);
 
      displayCurrent(data);

    } catch (error) {
      console.error("Error", error);
      alert("error")
    }
  }

getData(); 

  function displayCurrent(data){

      let temEle = document.getElementById('current-temp')
      let humEle = document.getElementById('current-humid')
      let windSpeedEle = document.getElementById('current-windSpeed')
      let currentDesEle = document.getElementById('current-desc')
      let windChillEle = document.getElementById('current-windChill')
      let cityEle = document.getElementById('five-city')
      let iconEle = document.getElementById('img')

      let temp = data.main.temp;
      let humidity = data.main.humidity;
      let wind = data.wind.speed;
      let currentDescription = data.weather[0].description;
      let city = data.name

      let windChill = "N/A";
      if (temp <= 50 && wind > 3){
        windChill = 35.74 + 0.6215
        * temp -35.75 * Math.pow(wind, 0.16) +0.4275 
        * temp * Math.pow(wind, 0.16);
      windChill = Math.round(windChill) + "°F"
      }

      if (temEle) temEle.textContent = temp
      if (humEle) humEle.textContent = humidity
      if (windSpeedEle) windSpeedEle.textContent = wind 
      if (currentDesEle) currentDesEle.innerText = currentDescription
      if (windChillEle) windChillEle.textContent = windChill 
      if (cityEle) cityEle.innerText = city
      if (iconEle) {
        iconEle.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        alt = "weatherImg"
      }
  }

  function displayNews(newsData){
    if (!newsData.articles || newsData.articles.length === 0) return;
    const articles = newsData.articles;
    let mainArticle = articles[0]

    let newsHeader = document.getElementById('header-article')
    let newsImg = document.getElementById('header-img')
    let newsDesc = document.getElementById('header-desc')

      if (newsHeader) {
        newsHeader.textContent = mainArticle.title
        newsHeader.href = mainArticle.url
      }
      if (newsDesc) newsDesc.innerText = mainArticle.description
      if (newsImg) {newsImg.src = mainArticle.urlToImage}

    for (let i = 1; i < 5; i++) {
    let subArticle = articles[i]

    let header = document.getElementById(`article-link-${i}`)
    if (header) {
      header.textContent = subArticle.title
      header.href = subArticle.url
    }
    let description = document.getElementById(`article-desc-${i}`)
    if (description) description.textContent = subArticle.description

    let img = document.getElementById(`article-img-${i}`)
    if(img) {img.src = subArticle.urlToImage}
  }
  }
  

  let currentDate = new Date().toLocaleDateString();
  let date = document.querySelector("#updated");

  date.textContent = currentDate;

  let currentYear = new Date().getFullYear();
  let year = document.querySelector("#year");

  year.textContent = currentYear;