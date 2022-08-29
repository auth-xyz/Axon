const Command = {
    // String Properties

    __Name: 'test', 
    __Desc: 'AAAA',

    // Bool Properties

    __IsOwnerOnly   : false, // True for bot owner only
    __IsServerOnly  : false, // True for server owner only

    // Array Properties

    $PERMISSIONS    : [null],
    $ALIASES        : [null],

    // Main Function

    async Main(message,args) {
        // Code's function goes here
        return message.channel.send(`FUCK YOU\n${message.author}`);
    }
}

export default Command;