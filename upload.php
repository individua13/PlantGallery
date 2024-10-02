<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $uploadDir = 'Kalad/';

    // Проверяем, есть ли папка, и создаем ее, если необходимо
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

  $fileName = $_FILES['photo']['name'];
  $fileTmpName = $_FILES['photo']['tmp_name'];
  $extension = pathinfo($fileName, PATHINFO_EXTENSION); // Получаем расширение файла
  $newFileName = $_POST['name'] . '.' . $extension; // Формируем новое имя файла

  $destination = $uploadDir . $newFileName; // Полный путь к новому файлу


    // Перемещаем загруженный файл в папку
    if (move_uploaded_file($fileTmpName, $destination)) {

        echo 'Файл успешно загружен. Данные загружены.';

        // Перенаправление на другую страницу через 2 секунды
        echo '<script>
            setTimeout(function() {
                window.location.href = "https://torugurud.ee/Taime/";
            }, 2000);
        </script>';


        // Получаем данные из POST-запроса
        $name = $_POST['name'];
        $Eestiname = $_POST['Eestiname'];
        $LatinName = $_POST['LatinName'];


        // Загружаем существующие данные из файла JSON
        $data = json_decode(file_get_contents('data.json'), true);

        // Добавляем новую запись в объект данных
        $data[$name] = [
            "EestiName" => $Eestiname,
            "LatinName" => $LatinName

        ];

        // Сохраняем обновленные данные обратно в файл
        file_put_contents('data.json', json_encode($data));
    } else {
        echo 'Ошибка при загрузке файла.';
    }
} else {
    echo 'Недопустимый метод запроса.';
}
?>

<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получаем JSON-строку с объектом wolf, отправленную с клиента
    $wolfJSON = file_get_contents('php://input');

    // Путь к файлу JavaScript, в котором хотите сохранить объект wolf
    $filePath = 'ListScript.js';

    // Преобразуем JSON-строку в объект PHP
    $wolf = json_decode($wolfJSON, true);

    if ($wolf !== null) {
        // Преобразуем объект PHP обратно в строку JSON
        $updatedWolfJSON = json_encode($wolf);

        // Записываем обновленные данные в файл JavaScript
        if (file_put_contents($filePath, 'let wolf = ' . $updatedWolfJSON . ';' . PHP_EOL) !== false) {
            echo 'Данные успешно обновлены в файле на сервере';
        } else {
            echo 'Ошибка при обновлении данных в файле на сервере';
        }
    } else {
        echo 'Ошибка при декодировании JSON-строки';
    }
} else {
    echo 'Недопустимый метод запроса.';
}
?>


