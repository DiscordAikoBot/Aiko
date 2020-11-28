const db = require('quick.db');
module.exports = { 
    config: {
        name: "read",  //command name
        //aliases: ["", ""], // other command names if you dont need delete this line
        description: "", // Description of cmd
        accessableby: "Member", // accessed by who
        category: "rpg", // what category is it under

    },
    run: async (bot, message, args) => {
        const stats = new db.table('stats');
        int = Math.floor(Math.random() * 6);
        message.channel.send(`You decide to read a book, and enjoy the amazing story! +${int} Int`)
        stats.add(`int.${message.guild.id}.${message.author.id}`, int);
    }
}

