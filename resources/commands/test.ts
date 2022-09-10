import { PermissionsBitField } from 'discord.js';
import { connection } from '../../src/database/connection';

const Command = {
    // String Properties

    __Name: 'register', 
    __Desc: 'aa',

    // Bool Properties

    __IsOwnerOnly   : false, 
    __IsServerOnly  : false, 

    // Array Properties

    $PERMISSIONS    : [null], 
    $ALIASES        : [null],

    // Main Function

    async Main(message,args) {
        const sql = 'INSERT INTO user_information (user_id, user_name, user_roles) VALUES (?,?,?)';
        const roles = message.member._roles;
        const role = []
        
        roles.forEach(r => {
            var a=message.guild.roles.cache.get(r).name
            role.push(a);            
        });
        
        const values = [message.author.id, message.author.username, role];
        connection.query(sql,values, (err,res) => {
            if (err) throw err;
            res.message = 'Successfully registered new user.';
            res._______________________________________________ = '';

            res.roles = `${role}`;
            res.user = `${message.author.tag}`;
            res.id = `${message.author.id}`;


            message.reply(`Successfully registered you!\n\`\`\`json\n${JSON.stringify(res, null, '\t')}\`\`\``);
            console.log(res);
        })
        

        //return message.reply()
    }
}

export default Command;