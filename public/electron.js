const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

require("update-electron-app")({
  repo: "kitze/react-electron-example",
  updateInterval: "1 hour",
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 950,
    height: 830,
    autoHideMenuBar: true,
    resizable: false,
    icon: __dirname + "/favicon_old.ico",

    webPreferences: { nodeIntegration: true, webSecurity: false },
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  // mainWindow.setMenu(null); // Скрыть меню
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
