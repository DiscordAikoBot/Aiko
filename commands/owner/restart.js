const db = require('quick.db')

module.exports = { 
    config: {
        name: "restart",
        description: "Restart",
        accessableby: "Bot Owner",
        type: "owner",
        usage: `eval <input>`
    },
    run: async (bot, message, args) => {

      const creatorIDs = ["255327008576241674", "455046083953950731", "738000272730619933"];
       
            if (!creatorIDs.includes(message.author.id)) {
              return message.channel.send('You are not the owner of the bot').then(m => m.delete(5000));
            }

      function resetBot(channel) {
        channel.send('Restarting...')
        .then(msg => bot.destroy())
        .then(() => bot.login(process.env.TOKEN));
      }

      resetBot(message.channel);


    }
}