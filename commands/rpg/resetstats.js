const db = require('quick.db');
module.exports = { 
    config: {
        name: "reset-stats",  //command name
        //aliases: ["stats", "stat-inf", "statinf", "statsinfo", "stat"], // other command names if you dont need delete this line
        description: "", // Description of cmd
        accessableby: "Member", // accessed by who
        category: "rpg", // what category is it under

    },
    run: async (bot, message, args) => {
        const stats = new db.table('stats');
        int = stats.set(`int.${message.guild.id}.${message.author.id}`, 0);
    }
}