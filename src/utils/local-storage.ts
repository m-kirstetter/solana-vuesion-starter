/* istanbul ignore file */
export default class LocalStorage {
  static get(name: string): string | null {
    return process.client ? localStorage.getItem(name) : null;
  }

  static set(name: string, val: any): void {
    return process.client ? localStorage.setItem(name, val) : null;
  }
}
