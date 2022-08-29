import { EmbedBuilder, TextChannel } from "discord.js";
import { commands } from "./#client";
import { Owner } from '../../resources/config/config.json';

export async function Handler(message: any, command: any, args: any) {
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

    




    return await cmds.default.Main(message,args);
}
