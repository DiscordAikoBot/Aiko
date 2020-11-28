const db = require('quick.db')
const { MessageEmbed } = require('discord.js')

module.exports = {
  config: {
    name: "blacklisted",
    description: "Blacklists a word from being sent",
    usage: "(word)",
    category: "settings",
    accessableby: "Moderator",
    aliases: ["blacklistwords", "blacklistedwords"]
  },
  run: async (bot, message, args) => {

    if (message.author.id != "255327008576241674") return message.channel.send("This command is only available to Developers as of right now.");


    let blacklistrn = db.get(`settings.${message.guild.id}.blacklist`)
    if(!blacklistrn) return message.channel.send(`This guild doesn't have any blacklisted words.`);

    blacklistrn = blacklistrn.join(', ')

    let embed = new MessageEmbed()
    .setAuthor("Aiko", bot.user.displayAvatarURL({
                  format: "png",
                  dynamic: true,
                  size: 2048
              }))
    .setColor("#eb0936")
    .setTitle('Blacklisted Words')
    .setDescription(`The words that are blacklisted in this guild are: \n**${blacklistrn}**`)


    message.channel.send(embed)
  }
}