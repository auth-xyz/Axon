import { Handler } from "../res/handler";
import { Prefix } from "../config/config.json";
import { commands } from "../src/collections";
import * as Database from "../res/scripts/db";

import { client } from "./client";
import { stdout } from "process";

import * as fs from "fs";
import * as path from "path";
import c from 'ansi-colors';
import { TextChannel } from "discord.js";

const ascii = fs.readFileSync(
  path.join(__dirname, "../config/ascii.txt"),
  "utf8"
);


export default class __events__ {
  public static initialize() {
    client.on("messageCreate", (message) => {
      if (message.author.bot) return;
      if (!message.content.startsWith(Prefix)) return;
      const commans = fs.readdirSync(path.join(__dirname, "../res/commands"));
      const commandFiles = commans.filter((f) => f.endsWith(".ts"));
      const args = message.content.slice(Prefix.length).split(/ +/);
      const command = args.shift().toLowerCase();

      if (message.content == 'a!') message.channel.send('sup')

      for (const file of commandFiles) {
        const command = require(`../res/commands/${file}`);
        const cmdName = command.default.CommandName;
        const cmdAliases = command.default._aliases;

        commands.set(cmdName, command);
        if (cmdAliases) {
          cmdAliases.forEach((alias: any) => {
            commands.set(alias, command);
          });
        }
      }
      console.log("Commands loaded: " + commands.size);
      Handler(message, command, args);
    });

    client.on("ready", () => {
      client.user.setActivity("You.", {
        type: "WATCHING",
      });
    client.user.setStatus("dnd");


      var string = `\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n
 ${c.yellow(`${ascii}`)}
    ${c.yellow(`Bot Status : Connected`)}
    ${c.yellow(`Bot Prefix : ${Prefix}`)}
              
    ${c.yellow(`Owner ID : 739729459724156999`)}\n\n\n
`;
      
      stdout.write(string);
    });

    client.on("guildMemberAdd", (member) => {
      const channel = member.guild.channels.cache.find(
        (ch) => ch.id === "1006709101486686343"
      ) as TextChannel;
      if (!channel) return;
      channel.send(`Welcome to the server, ${member}`);
    });

    Database.default.initialize();

  }
}
