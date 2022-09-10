import { Client, GatewayIntentBits,IntentsBitField, Collection, Partials } from "discord.js";
export const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

export const commands = new Collection<string, any>();
