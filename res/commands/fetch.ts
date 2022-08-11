import { MessageEmbed } from "discord.js";
import { connection } from "../scripts/db";

const Command = {
  CommandName: "fetch",
  CommandDescription: "Fetches a specific user from the database",

  // Properties

  _ownerOnly: false,
  _permissions: ["ADMINISTRATOR"],
  _aliases: ["get"],

  // Command

  async Process(message: any, args: any) {
    if (args[0] == "user") {
      const query = "SELECT * FROM registration WHERE user_id = ?";
      connection.query(query, args[1], (err, result) => {
        if (err) throw err;
        if (result.length <= 0) return message.channel.send("Specified user not found.");
        const embed = new MessageEmbed()
          .setTitle("User Information")
          .addField("User Name", result[0].user_name, true)
          .addField("User ID", result[0].user_id, true)
          .addField("User Hash", result[0].user_hash, true)
          .addField("Roblox ID", result[0].user_input, true)
          .addField("Rank", result[0].user_rank, true);

        message.channel.send({ embeds: [embed] });
      });
    }
  },
};
export default Command;
