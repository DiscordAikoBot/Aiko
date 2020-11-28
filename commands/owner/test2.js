const doc = require('authy-verify');
const { MessageEmbed } = require('discord.js')
const aiko = require('aiko-premium')


module.exports = {
    config: {
        name: "generatekey",
        description: "shuts down the bot!",
        usage: "!shutdown",
        accessableby: "Bot Owner"
    },
    run: async (bot, message, args) => {
    const creatorIDs = ["255327008576241674", "455046083953950731", "738000272730619933"];
       
            if (!creatorIDs.includes(message.author.id)) {
              return message.channel.send('You are not the owner of the bot').then(m => m.delete(5000));
            }

            let yt = ''

            aiko.generate().then(x => {
              message.channel.send(x)
            })
    }
}/* delete this, not needed */