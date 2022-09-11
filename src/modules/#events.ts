import { client, commands } from "./#client";
import { Handler } from "./#handler";

import * as fs from "fs";
import * as path from "path";

import { Prefix, Token } from "../../resources/config/config.json";
import { TextChannel } from "discord.js";

export default class $events {
  public static init() {
    client.on("ready", () => {
      console.log(`[127.0.0.1] : [${client.user.username}] : online`);
    });

    client.on("guildMemberAdd", (member) => {
      console.log(`New User "${member.user.username}" has joined "${member.guild.name}"` );
    });

    client.on("messageCreate", (message) => {
      if (message.author.bot === true) return;
      if (message.content.startsWith(Prefix)) {
        const Folder = fs.readdirSync(
          path.join(__dirname, "../../resources/commands/")
        );
        const Files = Folder.filter((f) => f.endsWith("ts"));

        const args = message.content.slice(Prefix.length).split(/ + /);
        const command = args.shift().toLowerCase();

        for (var c of Files) {
          const cmd = require(`../../resources/commands/${c}`);
          const name = cmd.default.__Name;
          const alias = cmd.default.$ALIASES;

          commands.set(name, cmd);
        }
        Handler(message, command).then(() => {
          console.log(`[127.0.0.1] : Loaded ${commands.size}`);
        });
      }
    });

    client.login(Token);
  }
}
