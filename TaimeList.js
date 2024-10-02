const images = {

    "ButomusUmbellatus" :{
        "EestiName": 'Harilik luigelill ',
        "LatinName": 'Butomus umbellatus',

    },

}

function loadDataAndMerge() {
    // Загружаем данные из JSON-файла
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка при загрузке файла');
            }
            return response.json();
        })
        .then(newData => {
            // Проверяем и добавляем данные, если они не дублируются
            for (const key in newData) {
                if (key !== "" && !images.hasOwnProperty(key)) {
                    images[key] = {
                        "EestiName": newData[key]["EestiName"],
                        "LatinName": newData[key]["LatinName"],
             
                    };
                }
            }

            // Выводим данные в консоль
            console.log(images);

            // Отправляем обновленные данные на сервер
            sendDataToServer();
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}

document.addEventListener("DOMContentLoaded", function() {
    // Этот код будет выполнен после загрузки всех элементов страницы

    // Запускаем функцию loadDataAndMerge() при загрузке страницы
    loadDataAndMerge();
});

     //   document.getElementById('updateButton').addEventListener('click', function() {
     //       loadDataAndMerge();
     //   });

function sendDataToServer() {
    // Преобразуйте объект images в строку JSON
    const wolfJSON = JSON.stringify(images);

    // Отправьте объект как текст на сервер
    fetch('upload.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Указываем, что это JSON
        },
        body: wolfJSON, // Отправляем объект wolf на сервер
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка при отправке данных на сервер');
            }
            console.log('Данные успешно отправлены на сервер');
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}


