import { createConnection } from "mysql";

export const connection = createConnection({
  host: "localhost",
  user: "DBot",
  password: "FcdNmf2His4dfuv",
  database: "axon",
});

export default class Database {
  public static async initialize() {
    connection.connect((err) => {
      if (err) throw err;
    });
  }
}

export function validateKey(key, callback) {
  const query = "SELECT * FROM validation WHERE token = ?";
  connection.query(query, key, (err, result) => {
    if (err) throw err;
    if (result.length <= 0) return false;
    callback(result);
    return true;
  });
}

export function checkIfUsed(key, callback) {
  const query = "SELECT * FROM registration WHERE token = ?";
  connection.query(query, key, (err, result) => {
    if (err) throw err;
    if (result.length <= 0) return false;
    callback(result);
    return true;
  });
}
