import { MessageEmbed } from "discord.js";
import { connection } from "../scripts/db";

const Command = {
    CommandName: "delete",
    CommandDescription: "Deletes a specific user from the database",

    // Properties

    _ownerOnly: true,
    _permissions: ["ADMINISTRATOR"],
    _aliases: ["del"],

    // Command

    async Process(message:any,args:any) {
        
    }
}
export default Command;