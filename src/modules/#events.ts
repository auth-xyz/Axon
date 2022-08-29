import { client, commands } from "./#client";
import { Handler } from "./#handler";

import * as fs from "fs";
import * as path from "path";

import { Prefix, Token } from "../../resources/config/config.json";

export default class $events {
  public static init() {
    client.on("ready", () => {
      console.log(`[127.0.0.1] : [${client.user.username}] : online`);
    });

    client.on("messageCreate", (message) => {
      if (message.author.bot === true) return;
      if (message.content.startsWith(Prefix)) {
        const Folder = fs.readdirSync(path.join(__dirname, '../../resources/commands/'));
        const Files = Folder.filter((f) => f.endsWith('ts'));
        
        const args = message.content.slice(Prefix.length).split(/ + /);
        const command = args.shift().toLowerCase();
        
        for (var c of Files) {
          const cmd = require(`../../resources/commands/${c}`);
          const name = cmd.default.__Name;
          const alias = cmd.default.$ALIASES

          commands.set(name, cmd);
        }
        Handler(message, command, args).then(() => {
          console.log(`[127.0.0.1] : Loaded ${commands.size}`);
        })
      }
      console.log(
        `[127.0.0.1] : (${message.author.username}) User sent an message`
      );
      /*
      if (message.author.bot) return;
      if (!message.content.startsWith(Prefix)) return;
      const commans = fs.readdirSync(path.join(__dirname, "../res/commands"));
      const commandFiles = commans.filter((f) => f.endsWith(".ts"));
      const args = message.content.slice(Prefix.length).split(/ +/);
      const command = args.shift().toLowerCase();

      // if (message.content == 'a!') message.channel.send('sup')

      for (const file of commandFiles) {
        const command = require(`../res/commands/${file}`);
        const cmdName = command.default.__Name;
        const cmdAliases = command.default.$ALIASES;

        commands.set(cmdName, command);
        if (cmdAliases) {
          cmdAliases.forEach((alias: any) => {
            commands.set(alias, command);
          });
        }
      }
      console.log("Commands loaded: " + commands.size);
      Handler(message, command, args);

      */
    });

    client.login(Token);
  }
}
