import { Clock } from './classes.js';
// В HTML-сторінці додати користувачу можливість створювати свій дашборд годинників. Це годинники для різних куточків світу. Необхідно додати input-поле та button, у разі кліка на якому буде створюватися новий годинник. Реалізація WorldClock відбувається через class. Кожен екземпляр такого класу — новий годинник. У класі повинні бути такі компоненти:

// getCurrentDate
// getCurrentDateTime
// deleteClock
// 1 кнопка — показує користувачу час у текстовому варіанті
// 2 кнопка — показує користувачу поточну дату й час у текстовому варіанті

// 3 кнопка — видаляє годинник зі «стіни» годинників



const apiKey = '77BMBDPL4AY6';
// const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const cityApi = 'https://api.timezonedb.com/v2.1/';
const geoApi = 'https://geocode.xyz/';
const wrong = "went wrong"

const main = document.querySelector('main');
let clocks = [];

async function createClockPanel() {
    // controll
    const controll = createElement('div');
    controll.classList.add('controll');
    const form = cretaeForm()
    form.onsubmit = formHandler;
    controll.append(form)
    // clocklist
    const clockList = createElement('ul');
    clockList.classList.add('clockList');
    // get info
    const initialClock = new Clock("UA", "Kyiv", "Europe/Kyiv", new Date());
    clocks.push(initialClock)
    clockList.append(initialClock.createClock());
    initialClock.startClock();




    async function formHandler(e) {
        e.preventDefault();
        const inputValue = e.target.elements.cityName.value;
        const inputField = e.target.elements.cityName;

        inputField.style.border = "";
        inputField.placeholder = "";

        const info = await getTimeZone(inputValue);

        if (info && info.status === "OK") {
            const { countryCode, regionName, zoneName, formatted } = info;
            console.log(info)
            const clockInfo = new Clock(countryCode, regionName, zoneName, formatted);
            clocks.push(clockInfo);

            const newClock = clockInfo.createClock();
            clockList.append(newClock);
            clockInfo.startClock();
            console.log(clocks)
        } else {
            inputField.value = "";
            inputField.placeholder = wrong;
            inputField.style.border = "2px solid red";
        }

        inputField.value = ""; 
    }


    main.append(controll, clockList);
}

function createElement(tag) {
    return document.createElement(tag);
}

function cretaeForm() {
    const form = createElement('form');
    const input = createElement('input');
    input.type = 'text';
    input.name = 'cityName';
    input.value = 'london';

    const formButton = createElement('button');
    formButton.type = "submit";
    formButton.innerText = "Ok"
    form.append(input, formButton)
    return form
}


async function getTimeZone(city) {
    // Сначала получаем широту и долготу города
    const geocodeUrl = `${geoApi}${city}?json=1`;
    const geocodeResponse = await fetch(geocodeUrl);
    const geocodeData = await geocodeResponse.json();

    const latitude = geocodeData.latt;
    const longitude = geocodeData.longt;

    if (!latitude || !longitude) {
        console.error('Не удалось получить координаты города');
        return;
    }

    // Получаем информацию о часовом поясе на основе координат
    const timezoneUrl = `${cityApi}get-time-zone?key=${apiKey}&format=json&by=position&lat=${latitude}&lng=${longitude}`;
    const timezoneResponse = await fetch(timezoneUrl);
    const timezoneData = await timezoneResponse.json();

    if (timezoneData.status === 'OK') {
        // console.log('Часовой пояс:', timezoneData.zoneName);
        // console.log('Местное время:', timezoneData.formatted);
        return timezoneData;
    } else {
        // console.error('Ошибка при получении часового пояса:', timezoneData.message);
        return timezoneData;
    }
    // console.log(city)
}


createClockPanel();
