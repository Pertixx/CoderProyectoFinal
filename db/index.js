import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("MainDB");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS createdRecipes (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, image TEXT NOT NULL, ingredients BLOB NOT NULL, duration TEXT NOT NULL, category INTEGER NOT NULL);",
        [],
        () => resolve(),
        (_, err) => reject(err)
      );
    });
  });

  return promise;
};

export const insertRecipe = (title, image, ingredients, duration, category) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO createdRecipes (title, image, ingredients, duration, category) VALUES (?, ?, ?, ?, ?)",
        [title, image, ingredients, duration, category],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });

  return promise;
};

export const fetchCreatedRecipes = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM createdRecipes",
        [],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });

  return promise;
};

export const deleteDatabase = () => {
  db.closeAsync();
  db.deleteAsync("MainDB");
};
