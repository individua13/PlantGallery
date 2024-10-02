const imageOut = document.querySelector(".image-out");
const imageEst = document.querySelector(".Eesti");
const imageLat = document.querySelector(".Latin");


// Функция для случайной сортировки массива
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Перемешиваем список wolf
const keys = Object.keys(wolf);
shuffleArray(keys);

const promises = []; // Массив для промисов загрузки изображений

// Ваш код для добавления изображений
keys.forEach(function(key) {
    let img = document.createElement('img');
    img.setAttribute('data-key', key);

    // Попробуйте разные расширения изображений
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];

    for (const ext of imageExtensions) {
        const imageUrl = `Taine/${key}.${ext}`;
        const image = new Image();
        const promise = new Promise((resolve, reject) => {
            image.onload = function() {
                img.src = imageUrl;
                resolve(); // Разрешить промис после загрузки изображения
            };
            image.onerror = function() {
                reject(new Error(`Не удалось загрузить изображение: ${imageUrl}`));
            };
        });
        promises.push(promise);
        image.src = imageUrl; // Начать загрузку изображения
    }

    imageOut.append(img);
});

// Дождитесь загрузки всех изображений перед выполнением других действий
Promise.all(promises)
    .then(() => {
        // Все изображения загружены, выполните необходимые действия здесь
    })
    .catch(error => {
        console.error('Ошибка при загрузке изображений:', error);
    });


imageOut.addEventListener('click', showInfo);

// Функция для показа информации
function showInfo(event) {
    const key = event.target.dataset['key'];

    // Проверяем, есть ли ключ
    if (key === undefined) {
        return;
    }

    // Переключаем класс 'active' для выделения
    event.target.classList.toggle('active');

    // Если элемент активен, показываем информацию
    if (event.target.classList.contains('active')) {
        imageEst.textContent = "Eestikeelne nimi: " + images[key]['EestiName'];
        imageLat.textContent = "Ladinakeelne nimi: " + images[key]['LatinName'];

    } else {
        imageEst.textContent = "Eestikeelne nimi: "; // Очищаем текст при снятии выделения
        imageLat.textContent = "Ladinakeelne nimi: ";

    }

    // Предотвращаем всплытие события, чтобы не срабатывал обработчик на родительских элементах
    event.stopPropagation();
}