import { v4 as uuidv4 } from "uuid";
import { connection } from "../scripts/db";
import { MessageEmbed, TextChannel } from "discord.js";
import { checkIfUsed, validateKey } from "../scripts/db";

import crypto from "crypto";

const Command = {
  CommandName: "register",
  CommandDescription: "Registers a user in the database",

  // Properties

  _ownerOnly: false,
  _permissions: ["VIEW_MESSAGE_HISTORY"],
  _aliases: ["reg"],

  // Command

  Process(message: any, args: any) {
    if (!args) return;

    const user_id = message.author.id;
    const user_name = message.author.username;
    const user_uuid = uuidv4();

    const token = args[0];
    const embed = new MessageEmbed()
      .setTitle("User Registration")
      .addField("User ID", `\`${user_id}\``, true)
      .addField("User Name", `\`${user_name}\``, true)
      .addField("User UUID", `\`${user_uuid}\``)
      .setThumbnail(message.author.displayAvatarURL())
      .setTimestamp();

    
    connection.query("SELECT * FROM registration WHERE user$TOKEN = ?" || "SELECT * FROM registration WHERE user$ID = ?", [token] || [user_id], (err, result) => {
      if (err) throw err;
      if (result.length > 0) return message.reply('Your token is already registered, if you think this is a mistake please contact a staff member');
      const sql = "INSERT INTO registration (user$UUID, user$TOKEN, user$NAME, user$ID) VALUES (?, ?, ?, ?)";
      const values = [user_uuid, token, user_name, user_id];
      connection.query(sql, values, (err, result) => {
        // Delete the message
        message.delete();
        if (err) throw err;
        result.message="User registered";
        console.log(result);
        const channel = message.guild.channels.cache.get("1006709102346514441") as TextChannel;
        channel.send({embeds:[embed]});
      });
    
    });




  },
};
export default Command;
