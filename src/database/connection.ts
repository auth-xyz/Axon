import { URI, USER } from '../../resources/config/db.json';

import { MongoClient } from "mongodb";

const db = new MongoClient(URI);
const dbname = "Axon-DB";

const database = db.db(dbname);

export {
    db as DatabaseClient,
    database as Database
};