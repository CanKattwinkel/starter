import {StorageService} from './storage.service';


export class StorageServiceMock implements Partial<StorageService> {

  fakeStorage: { [key: string]: any } = {};

  async getItem<T>(key: string): Promise<T> {
    return Promise.resolve(this.fakeStorage[key] as T);
  }

  async setItem<T>(key: string, item: T): Promise<T> {
    this.fakeStorage[key] = item;
    return Promise.resolve(item);
  }

  async removeItem(key: string): Promise<void> {
    delete  this.fakeStorage[key];
    return Promise.resolve();
  }

  async clear(): Promise<void> {
    this.fakeStorage = {};
    return Promise.resolve();
  }

}
