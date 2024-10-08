declare global {
  interface Window {
    attachEvent: (event: string, callback: () => void) => void;
    detachEvent: (event: string, callback: () => void) => void;
  }

  interface Document {
    attachEvent: (event: string, callback: () => void) => void;
    detachEvent: (event: string, callback: () => void) => void;
  }
}

export default global;
