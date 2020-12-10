const { MessageEmbed } = require("discord.js")
const { cyan } = require("../../colours.json");
const fetch = require('node-fetch');
const aiko = require('aiko-premium')
const { getMember } = require('../../functions.js')

module.exports = { 
    config: {
        name: "avatar",
        description: "Sends the user's profile picture!",
        usage: "(user)",
        category: "miscellaneous",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {

      /*let st = false
      await aiko.check(message).then(r => {
        st = r
      })
      if(st === false) return message.channel.send('This command is only available for premium servers!');*/
      
      
      let user = getMember(message, args[0])

      if(!user) {

              let embed = new MessageEmbed()
            .setColor(cyan)
            .setAuthor(`${bot.user.username}`, bot.user.displayAvatarURL())
            .setImage(message.author.displayAvatarURL())
            message.channel.send(embed)
      } else {
          let embed = new MessageEmbed()
            .setColor(cyan)
            .setAuthor(`${bot.user.username}`, bot.user.displayAvatarURL())
            .setImage(user.user.displayAvatarURL())
            message.channel.send(embed)
      }
    }
}