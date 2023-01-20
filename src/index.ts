import {app, BrowserWindow, ipcMain} from "electron";

declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: any;
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
let mainWindow: BrowserWindow;

const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const iniPath = path.join(__dirname, '../../pos.yaml');
const config = yaml.load(fs.readFileSync(iniPath, 'utf8'));


const mysql = require('mysql')
let pool = mysql.createPool({
  host: config.database_Address,
  user: 'root',
  password: 'password',
  database: 'pos_local'
})

function getConnection(callback: any) {
  pool.getConnection(function (err: any, conn: any) {
    if (!err) {
      callback(conn);
    } else {
      console.log('db connection error', err)
    }
  });
}


if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 768,
    width: 1024,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
    autoHideMenuBar: true,
    frame: false
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.webContents.openDevTools();
};


ipcMain.on("toMain", (event, data) => {
  console.log(`Received [${data}] from renderer browser`);
  // mainWindow.webContents.send("fromMain", ' here is main! ');
});

ipcMain.on('login', (event, arg) => {
  getConnection((conn: any) => {
    conn.query('SELECT * FROM staff WHERE id=? AND passwd=?', [arg.id, arg.password], (err: any, rows: any) => {

      if (err || rows.length == 0) {
        event.reply('asynchronous-reply', false);
        return;
      } else {
        event.reply('asynchronous-reply', true);
      }
    })
    conn.release();
  })
});


ipcMain.on('apiKey', (event) => {
  return event.reply('asynchronous-reply', config.apiKey);
})


app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
