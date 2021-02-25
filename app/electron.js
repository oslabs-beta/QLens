'use strict'
// Import parts of electron to use
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const { ipcMain } = require('electron');
const process = require('process');
const server = require('./server/schema');
const fs = require('fs');
const os = require('os');
const fixPath = require('fix-path');
// Connect to mongodb
const MongoClient = require('mongodb').MongoClient;
// Executing terminal commands using JS
const { exec } = require('child_process');
const { autoUpdater } = require('electron-updater');

// Add React extension for development
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Keep a reference for dev mode
let dev = false;

// Determine the mode (dev or production)
if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath)) {
  dev = true;
}

// Temporary fix for broken high-dpi scale factor on Windows (125% scaling)
// info: https://github.com/electron/electron/issues/9691
if (process.platform === 'win32') {
  app.commandLine.appendSwitch('high-dpi-support', 'true')
  app.commandLine.appendSwitch('force-device-scale-factor', '1')
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024, // width of the window
    height: 768, // height of the window
    show: false, // don't show until window is ready
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  let indexPath;

  // Determine the correct index.html file
  // (created by webpack) to load in dev and production
  if (dev && process.argv.indexOf('--noDevServer') === -1) {
    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:8080',
      pathname: 'index.html',
      slashes: true
    })
  } else {
    indexPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, '../dist/index.html'),
      slashes: true
    })
  }

  // Load the index.html
  mainWindow.loadURL(indexPath)

  // Don't show the app window until it is ready and loaded
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()

    // Open the DevTools automatically if developing
    if (dev) {
      installExtension(REACT_DEVELOPER_TOOLS)
        .catch(err => console.log('Error loading React DevTools: ', err))
      mainWindow.webContents.openDevTools()
    }
  })

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
  mainWindow.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify();
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow()
  // otherWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

if (!fs.existsSync(path.join(process.resourcesPath, "/schemafiles/"))) {
  fs.mkdirSync(path.join(process.resourcesPath, "/schemafiles/"));
}
let testpath = path.join(process.resourcesPath, "/schemafiles/qlens.json")

if (process.resourcesPath !== 'win32') fixPath();

ipcMain.on('URI', (event, arg) => {

    // Connect to mongodb
    MongoClient.connect(arg).then(() => {
      const query = `extract-mongo-schema -d "${arg}" -o ${testpath}`;
      event.sender.send('console', process.platform)
      //Using exec to run extract-mongo-schema package in terminal
      exec(query, (error, stdout, stderr) => {
        event.sender.send('URI-reply', path.join(process.resourcesPath))
    })
  })

  let filepath = path.join(process.resourcesPath, "/schemafiles")
  let file;
  let extractedSchemas;
  // Watching for changes in root directory. (The adding of json file with schema)
  const watcher = fs.watch(filepath, (events, trigger) => {
    // console.log(`there was a ${event} at ${trigger}`);
    // Once change happens (file is added) read schema.json file
    file = fs.readFileSync(path.join(process.resourcesPath, "/schemafiles/qlens.json"));
    //  console.log('SERVER.JS =========> ', Buffer.from(file).toString())
    extractedSchemas = Buffer.from(file).toString();
    if (extractedSchemas) {
      // send locals data to client, close this watch function
      watcher.close();
      if (fs.existsSync(path.join(process.resourcesPath, "/schemafiles/qlens.json"))) {
        fs.unlinkSync(path.join(process.resourcesPath, "/schemafiles/qlens.json"));
        console.log('file Deleted');
      }
      event.sender.send('URI-reply', extractedSchemas)
    }
  })
});

autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available');
});
autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded');
});

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});
