const db = require('quick.db');


module.exports = { 
    config: {
        name: "stats",  //command name
        aliases: ["stats-info", "stat-inf", "statinf", "statsinfo", "stat"], // other command names if you dont need delete this line
        description: "", // Description of cmd
        accessableby: "Member", // accessed by who
        category: "rpg", // what category is it under

    },
    run: async (bot, message, args) => {
        const statsa = new db.table('stats');
        statmessage = "";
        bot.rpg.stats.forEach(stat => {
          int = statsa.get(`${stat}.${message.guild.id}.${message.author.id}`);
          if (int === null) {
            int = 0;
          }
          statmessage = statmessage + `\n${stat}: ${int}`
          
        })
        
        message.channel.send(statmessage);
    }
}