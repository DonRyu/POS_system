export interface IElectronAPI {
  send: () => Promise<void>,
  sendAsync: () => Promise<void>,
  receive: () => Promise<void>
}

declare global {
  interface Window {
    api?:any
  }
}
