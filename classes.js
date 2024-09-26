
export class Clock {
    constructor(country, city, zone, formatted) {
        this.country = country;  // Страна
        this.city = city;        // Город
        this.zone = zone;        // Часовой пояс
        this.formatted = new Date(formatted); // Сохраняем дату как объект Date для удобной работы с ней
    }

    // Создание структуры часов
    createClock() {
        const li = document.createElement('li');
        const clock = document.createElement('div');
        clock.className = "clock";

        const zone = document.createElement('h4');
        zone.innerText = this.city;

        // Элемент для отображения времени
        this.timeDisplay = document.createElement('p');
        this.updateTimeDisplay(); // Показать начальное время

        // Кнопка для удаления
        const removeButton = document.createElement('button');
        removeButton.className = "removeButton";
        removeButton.innerText = 'Remove';
        removeButton.onclick = () => this.removeClock(li);

        // Создаем циферблат и стрелки
        const clockFace = document.createElement('div');
        clockFace.className = 'clock-face';
        
        this.hourHand = document.createElement('div');
        this.hourHand.className = 'hand hour-hand';

        this.minuteHand = document.createElement('div');
        this.minuteHand.className = 'hand minute-hand';

        this.secondHand = document.createElement('div');
        this.secondHand.className = 'hand second-hand';

        // Добавляем стрелки на циферблат
        clockFace.append(this.hourHand, this.minuteHand, this.secondHand);

        // Собираем всю структуру часов
        clock.append(zone, this.timeDisplay, clockFace, removeButton);
        li.append(clock);

        return li;
    }

    // Обновление отображения времени и стрелок
    updateTimeDisplay() {
        // Обновляем текстовое представление времени
        if (this.timeDisplay) {
            this.timeDisplay.innerText = this.formatted.toLocaleTimeString();
        }

        const now = this.formatted;
        const seconds = now.getSeconds();
        const minutes = now.getMinutes();
        const hours = now.getHours();

        // Вычисляем углы для каждой стрелки
        const secondsDegrees = ((seconds / 60) * 360) + 90;
        const minutesDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;
        const hoursDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90;

        // Применяем углы к CSS трансформации стрелок, проверяем существование элементов
        if (this.secondHand) {
            this.secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
        }
        if (this.minuteHand) {
            this.minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
        }
        if (this.hourHand) {
            this.hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
        }
    }

    // Запуск часов с локальным обновлением времени
    startClock() {
        this.updateTimeDisplay();  // Обновляем сразу при запуске
        this.intervalId = setInterval(() => {
            this.formatted.setSeconds(this.formatted.getSeconds() + 1); // Увеличение времени на 1 секунду
            this.updateTimeDisplay(); // Обновляем отображаемое время и стрелки
        }, 1000);
    }

    // Удаление часов
    removeClock(clockElement) {
        clearInterval(this.intervalId);  // Останавливаем таймер
        clockElement.remove();  // Удаляем элемент
    }
}

