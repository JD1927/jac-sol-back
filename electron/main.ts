// Import necesarios
import { app, BrowserWindow } from 'electron';
import { bootstrap } from './../src/main';

// Inicializamos la ventana de Electron
let win: BrowserWindow;
function createWindow() {
  bootstrap();
  win = new BrowserWindow({ width: 800, height: 600 });

  win.loadURL('http://localhost:3000');

  win.on('closed', () => {
    win = null;
  });
}
// Para ver el estado de la app
app.on('ready', createWindow)

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
})