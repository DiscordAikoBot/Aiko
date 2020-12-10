const db = require('quick.db');
module.exports = { 
    config: {
        name: "reset-pings",  //command name
        //aliases: ["", ""], // other command names if you dont need delete this line
        description: "", // Description of cmd
        accessableby: "Member", // accessed by who
        category: "rpg", // what category is it under

    },
    run: async (bot, message, args) => {
        if (message.author.id === "563980783828860944") {
            await haspinged.delete(message.author.id + "--messages");
            await haspinged.delete(message.author.id + "--timestamps");
        }
    }
}
                    
                    