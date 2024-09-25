
// Реалізуй клас User. Під час створення екземпляру на базі цього класу, обʼєкт повинен мати вигляд {name: ‘Petro’, role: ‘admin’} (role може бути або admin або user). У разі невірно переданих даних такого об’єкта — попереджати за допомогою alert-у відповідне поле, яке введено некоректно. У класі User повинні бути такі компоненти:

// getName
// getRole
// login
// logout
// сhangeName
// changePassword
// У класі Admin повинні бути такі компоненти:

// addUser
// removeUser
// changeUserRole
// getAllUsers
// removeAllUsers



// class User {
//     constructor(name) {

//         if (!name || typeof name !== 'string') {
//             alert('Incorrect name');
//             return;
//         }
//         this.name = name;
//         this.role = 'user';
//         this.password = this.#generatePassword();
//     }
//     #generatePassword(length = 10) {
//         const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~<>?';
//         let password = '';

//         for (let i = 0; i < length; i++) {
//             const randomIndex = Math.floor(Math.random() * chars.length);
//             password += chars[randomIndex];
//         }

//         return password;
//     }
//     login() {
//         console.log(`${this.role} - ${this.name} login`)
//     }
//     logout() {
//         console.log(`${this.role} - ${this.name} logout`)
//     }
//     get getName() {
//         return this.name;
//     }
//     get getRole() {
//         return this.role;
//     }
//     set changeName(value) {
//         if (!value || typeof value !== 'string') {
//             alert('Incorrect name');
//         } else {
//             this.name = value;
//         }
//     }
//     set changePassword(value) {
//         if (!value || value.length < 6) {
//             alert('Password should be at least 6 characters long');
//         } else {
//             this.password = value;
//         }
//     }
// }


// class Admin extends User {
//     constructor(name) {
//         super(name);
//         this.role = 'admin';
//     }
//     addUser(){
//         console.log('addUser')
//     }
//     removeUser(){
//         console.log("removeUser")
//     }
//     changeUserRole(){
//         console.log("changeUserRole")
//     }
//     getAllUsers(){
//         console.log("getAllUsers")
//     }
//     removeAllUsers(){
//         console.log('removeAllUsers')
//     }
// }

// const user1 = new User("Petro");
// console.log(user1); 
// user1.logout()

// const admin1 = new Admin("Ivan");
// console.log(admin1);
// admin1.login();

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
const geoApi = 'https://geocode.xyz/'

const main = document.querySelector('main');

async function createClockPanel() {
    
    const controll = createElement('div');
    controll.classList.add('controll');
    const clockList = createElement('ul');
    clockList.classList.add('clockList');

    const info = await getTimeZone('Kyiv');

    if(info){
        console.log(info)
    }

    

    main.append(controll, clockList);
}

function createElement(tag) {
    return document.createElement(tag);
}



async function getTimeZone(city) {
    // Сначала получаем широту и долготу города
    const geocodeUrl =`${geoApi}${city}?json=1`;
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
        return timezoneData.message;
    }
}
createClockPanel();
