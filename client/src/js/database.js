import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    console.log("Post to the database");
    // create connection and pick version
    const contactDb = await openDB("jate", 1);
    //create transaction and specify database and privledges
    const tx = jateDB.transaction("jate", "readwrite");
    // Open object store.
    const store = tx.objectStore("jate");
    // Use the .put() method on the store and pass in the content.
    const request = store.put({ value: content });
    // Get confirmation of the request.
    const result = await request;
    console.log("🚀 - data saved to the database", result);
  } catch (err) {
    console.error("putDb not implemented");
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    console.log("Get from the database");
    // create connection and pick version
    const contactDb = await openDB("jate", 1);
    //create transaction and specify database and privledges
    const tx = jateDB.transaction("jate", "readonly");
    // Open object store.
    const store = tx.objectStore("jate");
    // Use the .put() method on the store and pass in the content.
    const request = store.getAll();
    // Get confirmation of the request.
    const result = await request;
    console.log("result.value", result);
  } catch (err) {
    console.error("putDb not implemented");
  }
};

initdb();
