const { dialog } = window.require("electron").remote;
const fs = require("fs");

//const filepath = "C:/Users/centi/Desktop/отчет.txt"; // you need to save the filepath when you open the file to update without use the filechooser dialog againg

function Openfile() {
  dialog
    .showOpenDialog({ properties: ["openFile"] })
    .then(result => {
      //  console.log(result.canceled)
      //  console.log(result.filePaths)

      // Открытие файла
      if (result.filePaths[0] !== undefined) {
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
          arr.forEach(function(line) {
            counter++;

            // ! Работа с временем -------------------------------------------------------
            if (line.match(/ADDNEQ2/)) {
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
            }
            // ! ------------------------------------------------------------------------

            // ! Работа с Долготой широтой -------------------------------------------------------

            if (line.match(/180.0   5.0 450.0/)) {
              //counter+5
              for (var i = counter + 1; i <= counter + 5; i++) {
                //console.log(arr[i-1]);

                var lineint = arr[i - 1].trim();
                var linetwoprobels = lineint.trim().split(" ");
                var linethreeprobels = lineint.trim().split("  ");
                if (
                  linethreeprobels.length === 9 ||
                  linethreeprobels.length === 16
                ) {
                  console.log(linethreeprobels.length);
                } else if (
                  linetwoprobels.length === 9 ||
                  linetwoprobels.length === 16
                ) {
                  console.log(linetwoprobels.length);
                } else {
                  /*
                  for (var i = 0; i < lineint.length; i++) {
                    console.log(lineint[i]);
                  }*/
                }

                /*

                console.log(lineint.length);
               for(var i = 0; i<lineint.length; i++){
                  var chislo;
         
                }
               
*/
                /*
                  if (simvol!==' ') {
                    chislo=simvol+chislo;
                  }else{
                    console.log(chislo);

                  }*/

                /*
                if(arr[i-1].trim().split(" ").length!==9 || arr[i-1].trim().split(" ").length!==16){
                  console.log(arr[i-1].trim().split(" ").length);
                }*/
              }
              console.log("-----------");
              // var shirota = parseFloat(line.split("-180.0")[0].trim());
            }

            // ! ------------------------------------------------------------------------
          });

          //console.log(data.length);
          // document.getElementById('textarea').value=data;
          // Change how to handle the file content
          //    console.log("Содержание файла : " + data);
        });
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
