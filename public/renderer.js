const { dialog } = window.require("electron").remote;
const fs = require("fs");

//const filepath = "C:/Users/centi/Desktop/отчет.txt"; // you need to save the filepath when you open the file to update without use the filechooser dialog againg

// Access some stored data

function Openfile() {
  dialog
    .showOpenDialog({ properties: ["openFile"] })
    .then(result => {
      //  console.log(result.canceled)
      //  console.log(result.filePaths)

      // Открытие файла
      if (result.filePaths[0] !== undefined) {
        if (result.filePaths[0].match(/.18i/)) {
          fs.readFile(result.filePaths[0], "utf-8", (err, data) => {
            if (err) {
              dialog.showMessageBox({
                type: "error",
                buttons: ["Окей"],
                defaultId: 2,
                title: "Что то не так",
                message: "Ошибка: " + err.message
              });
              return;
            }

            // ! Проход построчнный
            let arr = data.split("\n");
            let counter = 0;
            var ostanovka = true; //* Если дошли до конца TEC карты то пропускать следующие строки
            var date = true; //* Если один раз нашли время, то второй раз не искать
            let element_bumber = 0;
            let massive = []; //* Общий массив элементов
            let massivehour = []; //* По часовый массив
            arr.forEach(function(line, i) {
              counter++;

              if (ostanovka) {
                // ! Работа с временем -------------------------------------------------------
                //* Парсим время отчета из файла
                if (line.match(/ADDNEQ2/) && date) {
                  var linenew = line.split("AIUB");
                  var myau = linenew[1].split("PGM");
                  var options = {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    weekday: "long",
                    timezone: "UTC",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric"
                  };

                  var datafile = new Date(
                    Date.parse(myau[0].trim())
                  ).toLocaleString("ru", options);
                  var body = document.getElementById("root");
                  body.classList.add("process-file");
                  document.getElementById("datafile").innerHTML = datafile;
                  date = false;
                }
                // ! ------------------------------------------------------------------------

                // ! Работа с Долготой широтой -------------------------------------------------------

                //* Проход по блокам широты
                if (line.match(/END OF TEC MAP/)) {
                  massive.push(massivehour);
                  massivehour = [];
                  if (line.match(/25/)) {
                    ostanovka = false; //* Останавливаем на половине файла (так как дальше идет RMS карта а не TEC)
                    // console.log(i); //* Номер строки всегда от 11 0000 до 12 0000
                    //* Это необходимо использовать ибо в Javascript нельзя выйти из foreach (every, some не хочу использовать как и try catch)
                  }
                }
                if (line.match(/180.0   5.0 450.0/) && ostanovka) {
                  //counter+5
                  //* Достаем широту из каждого блока
                  var shirota = parseFloat(line.split("-180.0")[0].trim());
                  //* Проход значениям TEC (по долготе, в одной широте)
                  //* Элементов строго на 5 строк, с 1 по 4 имеют по 16 значений, 5 тый только 9. 73 значения в одном блоке широт
                  var dolgota = -180;
                  for (var i = counter; i <= counter + 4; i++) {
                    //console.log(arr[i-1]);
                    var lineint = arr[i].trim(); //* Получаем чистую строку с цифрами
                    var re = /[\s,]+/; //* Получаем массив значений TEC в одной строке путем деление строки регулярным выражением
                    var linesplit = lineint.trim().split(re); //* Массив значений по долготе в одной широте

                  
                    linesplit.forEach(function(element) {
                      element_bumber++;

                      //* element - это значение TEC
                      //* Создание каждого объекта (массива)
                      //  var elem_arr = []; //* Обявление массива

                      massivehour.push(
                        new (function() {
                          this.name = element_bumber;
                          this.coordinates = [
                            parseInt(dolgota),
                            parseFloat(shirota)
                          ];
                          this.score = element*18000;
                        })()
                      );

                      /*
                    elem_arr.coordinates = []; //* Обявление массива координат в объекте
                    elem_arr.name = "myatat"; //* Добавляем название для точки в нашем случае номер объекта
                    elem_arr.coordinates.push(
                      parseInt(dolgota),
                      parseFloat(shirota)
                    ); //* Добавляем в объект значение координаты [долгота. широта] в строгой типизации
                    elem_arr.score = element; //* Добавляем в объект значение TEC
*/

                      //massivehour.push(elem_obj); //* Добавляем полученный объект в общий массив
                      dolgota = dolgota + 5; //* Прибавляем деление в 5 градусов
                    });
                  }
                }

                // ! ------------------------------------------------------------------------
              }
            });
            //* Работа с LocalStorage
            localStorage.clear();
            try {
              localStorage.setItem("massive", JSON.stringify(massive));
            } catch (e) {
              if (e == QUOTA_EXCEEDED_ERR) {
                dialog.showMessageBox({
                  type: "danger",
                  buttons: ["Окей"],
                  defaultId: 2,
                  title: "Ошибка",
                  message: "Массив не сохранился, размер больше 5мб",
                  detail: "Позовите Алтуна"
                });
              }
            }
        //    console.log(JSON.parse(localStorage.getItem("massive")));


          });
        } else {
          dialog.showMessageBox({
            type: "warning",
            buttons: ["Окей"],
            defaultId: 2,
            title: "Ошибка",
            message: "Файл неверного расширения! ",
            detail: "Выберите файл ionex с расширением .18i"
          });
        }
      } else {
        dialog.showMessageBox({
          type: "info",
          buttons: ["Окей"],
          defaultId: 2,
          title: "Ошибка",
          message: "Вы не выбрали файл",
          detail: "Выберите файл с расширением ionex!"
        });
      }
    })
    .catch(err => {
      dialog.showMessageBox({
        type: "error",
        buttons: ["Окей"],
        defaultId: 2,
        title: "Что то не так",
        message: "Ошибка: " + err
      });
    });
}
