const DB_NAME = "ResumeAppDB";
const STORE_NAME = "userData";
const VERSION = 1;

export const initDB = () => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "key" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const saveToDB = async (key: string, cleanValue: any) => {
  const value = JSON.parse(JSON.stringify(cleanValue));
  const db = await initDB();
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    store.put({ key, value });
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
};

export const getFromDB = async (key: string) => {
  const db = await initDB();
  return new Promise<any>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(key);
    request.onsuccess = () => resolve(request.result?.value);
    request.onerror = () => reject(request.error);
  });
};

export const clearIndexedDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(DB_NAME);

    request.onsuccess = () => {
      console.log("IndexedDB ResumeDB berhasil dihapus");
      resolve(true);
    };

    request.onerror = (event) => {
      console.error("Gagal hapus IndexedDB:", event);
      reject(event);
    };

    request.onblocked = () => {
      console.warn("Penghapusan diblok karena ada koneksi terbuka");
      reject("Blocked");
    };
  });
};
