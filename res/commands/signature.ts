import mysql from "mysql";
import { connection } from "../scripts/db";

const Command = {
  CommandName: "signature",
  CommandDescription:
    "Allows the staff member to have their own signature on their admin card",

  // Properties

  _ownerOnly: false,
  _permissions: ["ADMINISTRATOR"],
  _aliases: ["sign"],

  // Command

  async Process(message: any, args: any) {
    if (!args) return;

    const signature = args.join(" ");

    const sql = "INSERT INTO misc (user_id, signature) VALUES (?, ?)";
    const user_id = message.author.id;
    // Check if the user already has a signature
    const check = "SELECT * FROM misc WHERE user_id = ?";
    connection.query(check, [user_id], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        const update = "UPDATE misc SET signature = ? WHERE user_id = ?";
        connection.query(update, [signature, user_id], (err, result) => {
          if (err) throw err;
          message.channel.send("Your signature has been updated.");
        });
      } else {
        connection.query(sql, [user_id, signature], (err, result) => {
          if (err) throw err;
          message.channel.send("Your signature has been set.");
        });
      }
    });
  },
};
export default Command;
