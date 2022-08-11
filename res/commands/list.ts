import mysql from "mysql";
import { connection } from "../scripts/db";

const Command = {
    CommandName: "list",
    CommandDescription: "Lists all registred users in the database",

    // Properties

    _ownerOnly: false,
    _permissions: ["ADMINISTRATOR"],
    _aliases: ["ls"],

    // Command

    async Process(message:any,args:any) {
        const query = "SELECT * FROM registration";
        connection.query(query, (err, result) => {
            if (err) throw err;
            if(result.length <= 0) return message.channel.send("There are no users in the database.");
            let users = [];
            for(let i = 0; i < result.length; i++) {
                users.push(`${result[i].user_name}-${result[i].user_hash}`);
            }
            message.channel.send(`\`\`\`\n${users.join(", ")}\`\`\``);
        })

        //await connection.end();
    }
}
export default Command;