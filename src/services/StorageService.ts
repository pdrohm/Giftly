import AsyncStorage from '@react-native-async-storage/async-storage';

export interface IStorageService {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
  clear(): Promise<void>;
  getAllKeys(): Promise<string[]>;
  multiGet(keys: string[]): Promise<[string, string | null][]>;
  multiSet(keyValuePairs: [string, string][]): Promise<void>;
  multiRemove(keys: string[]): Promise<void>;
}

export class AsyncStorageService implements IStorageService {
  async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error(`Error getting item with key ${key}:`, error);
      throw new Error(`Failed to get item: ${key}`);
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error setting item with key ${key}:`, error);
      throw new Error(`Failed to set item: ${key}`);
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item with key ${key}:`, error);
      throw new Error(`Failed to remove item: ${key}`);
    }
  }

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw new Error('Failed to clear storage');
    }
  }

  async getAllKeys(): Promise<string[]> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return [...keys];
    } catch (error) {
      console.error('Error getting all keys:', error);
      throw new Error('Failed to get all keys');
    }
  }

  async multiGet(keys: string[]): Promise<[string, string | null][]> {
    try {
      const pairs = await AsyncStorage.multiGet(keys);
      return [...pairs];
    } catch (error) {
      console.error('Error getting multiple items:', error);
      throw new Error('Failed to get multiple items');
    }
  }

  async multiSet(keyValuePairs: [string, string][]): Promise<void> {
    try {
      await AsyncStorage.multiSet(keyValuePairs);
    } catch (error) {
      console.error('Error setting multiple items:', error);
      throw new Error('Failed to set multiple items');
    }
  }

  async multiRemove(keys: string[]): Promise<void> {
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error('Error removing multiple items:', error);
      throw new Error('Failed to remove multiple items');
    }
  }
}

export class StorageService {
  private storage: IStorageService;

  constructor(storage: IStorageService = new AsyncStorageService()) {
    this.storage = storage;
  }

  private getUserKey(userId: string, key: string): string {
    return `user_${userId}_${key}`;
  }

  async getUserObject<T>(userId: string, key: string): Promise<T | null> {
    const userKey = this.getUserKey(userId, key);
    return this.getObject<T>(userKey);
  }

  async setUserObject<T>(userId: string, key: string, value: T): Promise<void> {
    const userKey = this.getUserKey(userId, key);
    await this.setObject<T>(userKey, value);
  }

  async getUserString(userId: string, key: string): Promise<string | null> {
    const userKey = this.getUserKey(userId, key);
    return this.getString(userKey);
  }

  async setUserString(userId: string, key: string, value: string): Promise<void> {
    const userKey = this.getUserKey(userId, key);
    await this.setString(userKey, value);
  }

  async clearUserData(userId: string): Promise<void> {
    try {
      const allKeys = await this.getAllKeys();
      const userKeys = allKeys.filter(key => key.startsWith(`user_${userId}_`));
      if (userKeys.length > 0) {
        await this.removeMultipleItems(userKeys);
      }
    } catch (error) {
      console.error(`Error clearing data for user ${userId}:`, error);
      throw new Error(`Failed to clear user data: ${userId}`);
    }
  }

  async getUserKeys(userId: string): Promise<string[]> {
    try {
      const allKeys = await this.getAllKeys();
      return allKeys.filter(key => key.startsWith(`user_${userId}_`));
    } catch (error) {
      console.error(`Error getting keys for user ${userId}:`, error);
      throw new Error(`Failed to get user keys: ${userId}`);
    }
  }

  async getString(key: string): Promise<string | null> {
    return this.storage.getItem(key);
  }

  async setString(key: string, value: string): Promise<void> {
    await this.storage.setItem(key, value);
  }

  async getObject<T>(key: string): Promise<T | null> {
    try {
      const value = await this.storage.getItem(key);
      if (value === null) return null;
      return JSON.parse(value) as T;
    } catch (error) {
      console.error(`Error parsing object for key ${key}:`, error);
      return null;
    }
  }

  async setObject<T>(key: string, value: T): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value);
      await this.storage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error serializing object for key ${key}:`, error);
      throw new Error(`Failed to store object: ${key}`);
    }
  }

  async getBoolean(key: string): Promise<boolean | null> {
    const value = await this.storage.getItem(key);
    if (value === null) return null;
    return value === 'true';
  }

  async setBoolean(key: string, value: boolean): Promise<void> {
    await this.storage.setItem(key, value.toString());
  }

  async getNumber(key: string): Promise<number | null> {
    const value = await this.storage.getItem(key);
    if (value === null) return null;
    const parsed = parseFloat(value);
    return isNaN(parsed) ? null : parsed;
  }

  async setNumber(key: string, value: number): Promise<void> {
    await this.storage.setItem(key, value.toString());
  }

  async hasKey(key: string): Promise<boolean> {
    const value = await this.storage.getItem(key);
    return value !== null;
  }

  async removeItem(key: string): Promise<void> {
    await this.storage.removeItem(key);
  }

  async clear(): Promise<void> {
    await this.storage.clear();
  }

  async getAllKeys(): Promise<string[]> {
    return this.storage.getAllKeys();
  }

  async getMultipleObjects<T>(keys: string[]): Promise<Record<string, T | null>> {
    try {
      const pairs = await this.storage.multiGet(keys);
      const result: Record<string, T | null> = {};
      
      for (const [key, value] of pairs) {
        if (value === null) {
          result[key] = null;
        } else {
          try {
            result[key] = JSON.parse(value) as T;
          } catch {
            result[key] = null;
          }
        }
      }
      
      return result;
    } catch (error) {
      console.error('Error getting multiple objects:', error);
      throw new Error('Failed to get multiple objects');
    }
  }

  async setMultipleObjects<T>(keyValuePairs: Record<string, T>): Promise<void> {
    try {
      const pairs: [string, string][] = Object.entries(keyValuePairs).map(
        ([key, value]) => [key, JSON.stringify(value)]
      );
      await this.storage.multiSet(pairs);
    } catch (error) {
      console.error('Error setting multiple objects:', error);
      throw new Error('Failed to set multiple objects');
    }
  }

  async removeMultipleItems(keys: string[]): Promise<void> {
    await this.storage.multiRemove(keys);
  }
}

export const storageService = new StorageService(); 