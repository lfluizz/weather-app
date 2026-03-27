// Constantes

const apiKey = 'API_KEY_AQUI'; 

const cityInput = document.querySelector('#search-input');
const form = document.querySelector('#search');
const weatherContainer = document.querySelector('.weather');
const alertDiv = document.querySelector('#alert');

//Campos 

const cityNameh1 = document.querySelector('#cityName');
const tempValue = document.querySelector('#temp-value');
const tempDescription = document.querySelector('#temp-description');
const tempImg = document.querySelector('#temp-img');

const tempMaxP = document.querySelector('#temp-max');
const tempMinP = document.querySelector('#temp-min');
const humidtyP = document.querySelector('#humidity');
const windP = document.querySelector('#wind');

const alertMsg = document.querySelector('#alert-mensage');
const loadingMsg = document.querySelector('#loading');


// Eventos 

form.addEventListener('submit', buscarEpreencher);

//Funções

async function buscarEpreencher(event) {
    event.preventDefault()
    const city = cityInput.value;
    cityInput.value = '';
    
    if (city.trim() === '') {

        mostrarErro('Campo vazio');
        return
    }

    alertDiv.classList.add('off');
    weatherContainer.classList.add('off');
    loadingMsg.classList.remove('off');


    const json = await buscarDados(city);
    
    if (json.cod == 404) {     

        mostrarErro('Cidade não encontrada')
        return
    }

    if (json.cod != 200) {
        mostrarErro('Não foi possível buscar os dados');
        return
    }
    
    alertDiv.classList.add('off')
    weatherContainer.classList.remove('off');
    
    loadingMsg.classList.add('off');

    preencherDados(json);
}


async function buscarDados(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

    const response = await fetch(url);
    const data = await response.json();

    return data;

}

function preencherDados(json) {
   
    cityNameh1.textContent = `${json.name}, ${json.sys.country}`;
    tempValue.innerHTML = `${json.main.temp.toFixed(1)} °C`;
    tempDescription.textContent = json.weather[0].description;
    tempImg.setAttribute('src', `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`);
    
    tempMaxP.innerHTML = `${json.main.temp_max.toFixed(1) } °C`;
    tempMinP.innerHTML = `${json.main.temp_min.toFixed(1) } °C`;
    humidtyP.textContent = `${json.main.humidity}%`;
    windP.textContent = `${(json.wind.speed * 3.6).toFixed(1) } km/h`
}

function mostrarErro(msg) {
    weatherContainer.classList.add('off');
    loadingMsg.classList.add('off');
    
    alertDiv.classList.remove('off');
    alertMsg.textContent = msg;
}

