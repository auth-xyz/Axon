import { Token } from "../config/config.json";
import { createConnection } from "mysql";
import { client } from "./client";
import __events__ from "./events";
const connection = createConnection({
  host: "localhost",
  user: "DBot",
  password: "FcdNmf2His4dfuv",
  database: "axon",
});

export default class __client_class__ {
  public static async initialize() {
    __events__.initialize();
    client.login(Token);



  
  }
}
