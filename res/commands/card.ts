import { v4 as uuidv4 } from "uuid";
import { connection } from "../scripts/db";
import crypto from "crypto";
import { MessageButton, MessageEmbed } from "discord.js";

const Command = {
  CommandName: "admincard",
  CommandDescription: "Shows the admin card of a user",

  // Properties

  _ownerOnly: false,
  _permissions: ["BAN_MEMBERS"],
  _aliases: ["card"],

  // Command

  async Process(message: any, args: any) {
    // Get all roles with ADMINISTRATOR and BAN_MEMBERS permission and name them staff
    const staff = message.guild.roles.cache.filter(
      (role) =>
        role.permissions.has("ADMINISTRATOR") ||
        role.permissions.has("BAN_MEMBERS")
    );

    const checkIfStaff = (uid) => {
      return staff.some((role) => role.members.has(uid));
    }



    const highest_role = message.member.roles.highest.name;

    // Get the signature that corresponds to the user id
    const sql = "SELECT * FROM misc WHERE user_id = ?";
    const user_id = message.author.id;

    const user$ID = message.author.id;
    const user$ROLE = highest_role;

    const embed = new MessageEmbed()
      .setTitle("Admin Card")
      .addField("Highest Role", user$ROLE, true)
      .addField("Discord ID", user$ID, true)
      .addField("isStaff", `\`${checkIfStaff(user$ID)}\``, true)
      .addField("Logged Occurences", "TBD", true)
      .addField("Banned Members", "TBD", true)
      .addField("Warned Members", "TBD", true)
      .setThumbnail(message.author.displayAvatarURL())
      .setTimestamp();

    connection.query(sql, [user_id], async (err, result) => {
      if (err) throw err;
      // Get the signature that corresponds to the user id and add it to the embed
      if (result.length > 0) {
        embed.addField("Signature", `\`\`\`${result[0].signature}\`\`\``);
        message.channel.send({ embeds: [embed] });
      } else {
        message.channel.send({ embeds: [embed] });
      }
    });
    message.delete();
    //await message.channel.send({ embeds: [embed] });
  },
};
export default Command;
