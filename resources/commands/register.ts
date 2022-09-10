import { PermissionsBitField, EmbedBuilder } from "discord.js";
import { DatabaseClient, Database } from "../../src/database/connection";

const Command = {
  // String Properties

  __Name: "register",
  __Desc: "aa",

  // Bool Properties

  __IsOwnerOnly: false,
  __IsServerOnly: false,

  // Array Properties

  $PERMISSIONS: [null],
  $ALIASES: [null],

  // Main Function

  async Main(message, args) {
    console.log(message.member);
    console.log(message.author);
    await DatabaseClient.connect();
    const props = {
      user_id: message.author.id,
      user_name: message.author.username,
      user_roles: message.member._roles,
    };

    Database.collection("Registration").insertOne(props, (err, res) => {
      if (err) throw err;
      console.log(
        `[127.0.0.1] : Database-Request ${JSON.stringify(res, null, "\t")}`
      );
    });

    const embed = new EmbedBuilder()
    .setTitle(`Registration Successful`)
    .setDescription(`\`\`\`json\n{ "status": 200, "database_status": 200 }\`\`\``)
    .setThumbnail(message.author.avatarURL())
    .addFields(
      { name: "**User ID**", value: `\`${props.user_id}\``, inline: true },
      { name: "**User Name**", value: `\`${props.user_name}\``, inline: true },
      { name: "**User Roles**", value: `\`${props.user_roles}\``, inline: true }
    )
    .setFooter({text: "© 2022, Axon Project"});

    message.channel.send({ embeds: [embed] }).then(() => {
        message.reply("You can now view your user-card with \`a!card\`\nOr use \`a!sign\` to add a signature to your user-card!");
    })
  },
};

export default Command;
