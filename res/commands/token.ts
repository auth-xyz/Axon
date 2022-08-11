import { v4 as uuidv4 } from "uuid";
import { connection } from "../scripts/db";
import crypto from "crypto";
import { MessageButton, MessageEmbed } from "discord.js";

const Command = {
  CommandName: "token",
  CommandDescription: "Registers a token in the database",

  // Properties

  _ownerOnly: false,
  _permissions: ["BAN_MEMBERS"],
  _aliases: ["tk"],

  // Command

  Process(message: any, args: any) {
    const staff = message.guild.roles.cache.filter(
      (role) =>
        role.permissions.has("ADMINISTRATOR") ||
        role.permissions.has("BAN_MEMBERS")
    );
    console.log(staff);


    if (!args) return;

    const input = args[0];
    const roblox_id = input.replace("https://www.roblox.com/users/", "").replace("/profile", "");
    const highest_role = message.member.roles.highest.name;


    const user$ID = message.author.id;
    const user$RID = roblox_id;
    const user$ROLE = highest_role;

    // Check if the input is a roblox url
    if (!input.startsWith("https://www.roblox.com/users/")) return message.channel.send("Please provide a valid roblox profile link");

    const generator = (u, rd) => {
      const u$HASH = crypto.createHash("sha512").update(u).digest('hex');
      const rd$HASH = crypto.createHash("sha512").update(rd).digest('hex');

      rd$HASH.substring(0, 8); u$HASH.substring(0, 8);

      const prefix = `.AXON-${u$HASH.substring(0,16)}\\${rd$HASH.substring(0,8)}\\${user$ROLE.toUpperCase()}`;
      return prefix;
    };
    const token= generator(user$ID, user$RID);
    // Message author url
    const embed = new MessageEmbed()
      .setTitle("Token Generation")
      .setDescription(`Your token is: \`${token}\``)
      .addField('Highest Role', user$ROLE, true)
      .addField('Roblox ID', user$RID, true)
      .addField('Discord ID', user$ID, true)
      .setThumbnail(message.author.displayAvatarURL())
      .setTimestamp();
    
      
      const sql = "INSERT INTO validation (token) VALUES (?)";
      const values = [token];
      
      connection.query("SELECT * FROM validation WHERE token = ?", [token], (err, result) => {
        if (err) throw err;
        if (result.length > 0) return message.channel.send("You already have a token");
        connection.query(sql, values, (err, result) => {
          if (err) throw err;
          result.message="Token generated";
          console.log(result);
          message.author.send({embeds:[embed]}).catch(() => {
            return message.channel.send("I couldn't send you a DM, please enable them").then(() => {
              message.channel.send({embeds:[embed]});
            });
          })
        });
    });

  },
};
export default Command;
