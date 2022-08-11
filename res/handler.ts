import { MessageEmbed } from "discord.js";
import { commands } from "../src/collections";
import { Owner } from '../config/config.json';



export async function Handler(message: any, command: any, args: any) {
    // If the user sends only the prefix ignore it
    if (command.length <= 1) return;


    const embed = new MessageEmbed()
        .setTitle('Permission Denied')
        .setThumbnail(message.author.displayAvatarURL())
        .addField('Reason:', 'This command has the ownerOnly property set to true.',true)
        .addField(`Code:`, `\`{ name: \'${command}\', ownerOnly: true }\``);

    const cmds = commands.get(command);
    if (!cmds) return;

    if (cmds.default._ownerOnly == true && message.author.id !== Owner) return message.delete().then(() => message.channel.send({ embeds: [embed], content: `${message.author}` }));
    if (!message.member.permissions.has(cmds.default._permissions)) return message.delete().then(() => message.channel.send(`${message.author} You do not have permission to use this command.`));
    


    return await cmds.default.Process(message, args);
}
