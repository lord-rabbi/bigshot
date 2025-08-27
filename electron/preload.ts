
export interface ElectronAPI {
  sendMessage: (msg: string) => void;
  onMessage: (callback: (data: any) => void) => void;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}



