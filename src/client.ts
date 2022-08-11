import { Client, Intents } from 'discord.js';
const allInt = new Intents(32627)
export const client = new Client({ intents: allInt });