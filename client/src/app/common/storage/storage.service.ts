import {Injectable} from '@angular/core';
import {NgForage} from 'ngforage';

/**
 * Wraps the ngforage/LocalForage Service */
@Injectable()
export class StorageService {

  constructor(private readonly ngf: NgForage) {
  }


  async getItem<T>(key: string): Promise<T> {
    return this.ngf.getItem<T>(key);
  }

  async setItem<T>(key: string, item: T): Promise<T> {
    return this.ngf.setItem(key, item);
  }

  async removeItem(key: string): Promise<void> {
    return this.ngf.removeItem(key);
  }

  async clear(): Promise<void> {
    return this.ngf.clear();
  }

}
