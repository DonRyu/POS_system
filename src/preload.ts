const {contextBridge, ipcRenderer} = require("electron");


contextBridge.exposeInMainWorld(
  "api", {

    sendAsync(channel: any, user: object) {
      let validChannels = ["login", "apiKey","store_info"];
      if (validChannels.includes(channel)) {

        return new Promise((resolve) => {
          ipcRenderer.once('asynchronous-reply', (_, arg) => {
            resolve(arg);
          });
          ipcRenderer.send(channel, user);
        });
      }
    },
    send: (channel: any, data: any) => {
      let validChannels = ["toMain", "apiKey"];
      if (validChannels.includes(channel)) {
        return ipcRenderer.send(channel, data);
      }
    },
    receive: (channel: any, func: any) => {
      let validChannels = ["fromMain", "apiKey"]; // IPC채널들 추가
      if (validChannels.includes(channel)) {
        ipcRenderer.on(channel, (event, arg) =>{
          console.log('@@@',arg)
          return arg
        });
      }
    }
  }
);
