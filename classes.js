
export class Clock {
    constructor(country, city, zone, formatted) {
        this.country = country;  // Страна
        this.city = city;        // Город
        this.zone = zone;        // Часовой пояс
        this.formatted = new Date(formatted); // Сохраняем дату как объект Date для удобной работы с ней
    }

    // Создание структуры часов
    createClock() {
        const li = document.createElement('li')
        const clock = document.createElement('div');
        clock.className = "clock";

        const zone = document.createElement('h4');
        zone.innerText = this.city;

        this.timeDisplay = document.createElement('p'); // Элемент для отображения времени
        this.updateTimeDisplay(); // Показать начальное время

        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        removeButton.onclick = () => this.removeClock(li);

        clock.append(zone, this.timeDisplay , removeButton);
        li.append(clock)

        return li;
    }

    // Обновление отображения времени
    updateTimeDisplay() {
        this.timeDisplay.innerText = this.formatted.toLocaleTimeString(); // Форматирование времени в читаемую строку
    }

    // Запуск часов с локальным обновлением времени
    startClock() {
        setInterval(() => {
            this.formatted.setSeconds(this.formatted.getSeconds() + 1); // Увеличение времени на 1 секунду
            this.updateTimeDisplay(); // Обновление отображаемого времени
        }, 1000);
    }
    removeClock(clockElement) {
        clearInterval(this.intervalId); 
        clockElement.remove(); 
    }
}
