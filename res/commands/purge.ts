import { MessageEmbed } from "discord.js";
import { connection } from "../scripts/db";

const Command = {
    CommandName: "purge",
    CommandDescription: "Deletes a specific amount of messages",

    // Properties

    _ownerOnly: true,
    _permissions: ["ADMINISTRATOR"],
    _aliases: ["end"],

    // Command

    async Process(message:any,args:any) {
        if (!args) return message.channel.send("Please specify an amount of messages to delete");
        if (isNaN(args[0])) return message.channel.send("Please specify a valid number");
        if (args[0] > 100) return message.channel.send("Please specify a number less than 100");
        if (args[0] < 1) return message.channel.send("Please specify a number greater than 0");

        await message.channel.bulkDelete(parseInt(args[0]), true).catch(err => {
            console.error(err);
            message.channel.send("There was an error trying to purge messages in this channel!");
        });
    }
}
export default Command;