import { networkInterfaces } from "os";
import { PermissionsBitField } from 'discord.js'

export async function getLocalIP() {
    const netinterfaces = networkInterfaces();
    const ip = {}

    for (const name of Object.keys(netinterfaces)) {
        for (const net of netinterfaces[name]) {
            // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
            // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
            const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
            if (net.family === familyV4Value) {
                if (!ip[name]) {
                    ip[name] = [];
                }
                
                ip[name].push(net.address);
            }
        }
    }

    return console.log(ip);
}
