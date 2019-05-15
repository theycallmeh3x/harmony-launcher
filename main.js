const electron = require('electron')
const { app, BrowserWindow, Menu, ipcMain} = require('electron')
const url = require('url');
const path = require('path');

let mainWindow;
let addWindow;

// LIsten for app to be ready
app.on('ready', function(){
  // Create new window
  mainWindow = new BrowserWindow({});
  // Load html in window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes:true
  }));
  // Quit app when closed
  mainWindow.on('closed', function(){
    app.quit();
  });

  //Build menu from template
  const mm = Menu.buildFromTemplate(mmTemplate);
  // Insert Menu
  Menu.setApplicationMenu(mm);
});

// Handle create new window
function createAddWindow(){
    // Create new window
    addWindow = new BrowserWindow({
      width: 300,
      height: 200,
      title: 'Enter Steam ID'
    });
    // Load hmtl into window
    addWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'steamID.html'),
      protocol:'file',
      slashes: true
    }));
    //Garbage collection handle
    addWindow.on('closed', function(){
      addWindow = null;
    });
}

//Catch steamID:set
ipcMain.on('steamID:set', function(e, item){
  console.log(item);
  mainWindow.webContents.send('steamID:set', item);
  addWindow.close();
});

// Create menu template
const mmTemplate = [
  {
    label:'Settings',
    submenu: [
      {
        label: 'Set Steam ID',
        click(){
          createAddWindow();
        }
      },
      {
        label: 'Quit',
        accelerator:process.platform == 'darwin' ? 'Command+Q' :
        'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]
  }
];

// Add devleoper tools item if not in production
if(process.env.NODE_ENV !== 'production'){
  mmTemplate.push({
    label: 'Developer Tools',
    submenu: [
      {
        label: 'Toggle Developer Console',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      },

    ]
  });
}
