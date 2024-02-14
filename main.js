
const apiKey = '7b978fecbfdfd461e3b48a0ceb98956c';


function displayWeather(data) {
    const cityElement = document.querySelector('.city'); 
    const temperatureElement = document.querySelector('.temperature'); 

  
    cityElement.textContent = data.name; 
    temperatureElement.textContent = data.main.temp; 
}


function getWeatherByLocation(latitude, longitude) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  
    fetch(apiUrl)
        .then(response => response.json()) 
        
        .then(data => {
            displayWeather(data); 
        })
        .catch(error => {
            console.log('Erreur lors de la récupération des données météo :', error);
        });
}


function getWeatherByCity(cityName) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;


    fetch(apiUrl)
        .then(response => response.json()) 
        .then(data => {
            displayWeather(data); 
        })
        .catch(error => {
            console.log('Erreur lors de la récupération des données météo :', error);
        });
}


function handleButtonClick() {
    const cityName = prompt("Entrez le nom de votre ville :");
    if (cityName) {
        getWeatherByCity(cityName); 
    } else {
        alert("Veuillez entrer un nom de ville valide.");
    }
}


const btn = document.querySelector("button");
btn.addEventListener("click", handleButtonClick);


function getLocation() {
    if (navigator.geolocation) {
        
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            getWeatherByLocation(latitude, longitude); 
        });
    } else {
        alert("La géolocalisation n'est pas supportée par votre navigateur.");
    }
}


getLocation();
