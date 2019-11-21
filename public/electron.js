const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
/*
const appremote  = require('electron').remote;
let dialog = appremote.dialog;
let fs = require('fs');*/



const path = require("path");
const isDev = require("electron-is-dev");



let mainWindow;

require("update-electron-app")({
 // repo: "kitze/react-electron-example",
  updateInterval: "1 hour"
});

function createWindow() {
  mainWindow = new BrowserWindow({ width: 900, height: 680, webPreferences: { nodeIntegration: true }});
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});





/*
dialog.showOpenDialog((fileNames) => {


});*/
