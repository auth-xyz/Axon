import { EmbedBuilder, TextChannel } from "discord.js";
import { commands, client } from "./#client";
import { Owner, Prefix } from '../../resources/config/config.json';

export async function Handler(message: any, command: any) {
    const cmds = commands.get(command);    
    if (command.length <= 1) return;


    // Get the command properties and check if the user has them
    const props =
    {
        __IsOwnerOnly: cmds.default.__IsOwnerOnly,
        __IsServerOnly: cmds.default.__IsServerOnly,

        $PERMISSIONS: cmds.default.$PERMISSIONS,
        $ALIASES: cmds.default.$ALIASES
    }

    const args = message.content.slice(Prefix.length).trim().split(/ +/g);
    if (props.__IsOwnerOnly == true && message.author.id !== Owner) return message.delete().then(() => {console.log('a')});
    for (const perm of props.$PERMISSIONS) {
        if (perm == null) continue;
        else if (!message.member.permissions.has(perm)) {
            return message.delete().then(() => {console.log('a')});
        }
    }




    return await cmds.default.Main(message,args);
}


