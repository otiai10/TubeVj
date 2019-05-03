/**
 * TODO: Leave comment why this file exists
 */

export declare interface ipcRenderer {
  on: (key: string, handler: (ev: any, arg: any) => void) => void;
  send: (key: string, arg: any) => void;
}