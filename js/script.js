
// Fonction appelée lors du click du bouton
function start () {

  //Récupère la ville
  let cityname = document.getElementById('city-input').value;

  // Création de l'objet apiWeather
  const apiWeather = new API_WEATHER(cityname);

  // Appel de la fonction fetchTodayForecast
  apiWeather
    .fetchTodayForecast()
    .then(function(response) {
      // Récupère la donnée d'une API
      const data = response.data;

      // On récupère l'information principal
      const main = data.weather[0].main;
      const description = data.weather[0].description;
      const temp = data.main.temp;
      const icon = apiWeather.getHTMLElementFromIcon(data.weather[0].icon);

      // Modifier le DOM
      document.getElementById('today-forecast-main').innerHTML = main;
      document.getElementById('today-forecast-more-info').innerHTML = description;
      document.getElementById('icon-weather-container').innerHTML = icon;
      document.getElementById('today-forecast-temp').innerHTML = `${temp}°C`;
      
    })
    .catch(function(error) {
      // Affiche une erreur
      console.error(error);
    });


    // Appel de la fonction 
    apiWeather
    .getThreeDayForecast()
    .then(function(response) {
     
      const data = response.data;
     
      // On stocke les données par clase
      mainTab = document.getElementsByClassName('mainDays');
      descriptionTab = document.getElementsByClassName('descriptionDays');
      iconTab = document.getElementsByClassName('iconDays');
      tempTab = document.getElementsByClassName('tempDays');

      // Pour chaque jour on récupère les données 
      for(let i = 0; i<3; i++){
        mainTab[i].innerHTML = data.list[i+1].weather[0].main;
        descriptionTab[i].innerHTML = data.list[i+1].weather[0].description;
        iconTab[i].innerHTML = apiWeather.getHTMLElementFromIcon(data.list[i+1].weather[0].icon);
        myTemp = data.list[i+1].temp.day;
        tempTab[i].innerHTML = `${myTemp}°C`;
      }  
    })
    .catch(function(error) {
      // Affiche une erreur
      console.error(error);
    });

}



