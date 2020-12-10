const { MessageEmbed } = require("discord.js");
const giphy = require('giphy-api')('aneHLn1iNaLSOyEXPqxDahfhkYnCc2hE');

module.exports = {
  config: {
    name: "hug",
    description: "type the command to 'hug' a user!",
    usage: "(user)",
    category: "miscellaneous",
    accessableBy: "Members"
  },
  run: async (bot, message, args) => {
    const huggedUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    const { guild, author, user } = message;

    if (!args[0]) return message.channel.send("Specify someone to hug! Correct Syntax: ?hug <@User>");

    if (!huggedUser) return message.channel.send("That user doesn't exist!");

    if (huggedUser === author) return message.channel.send("Don't be that lonely :\(");

    const hug = giphy.random('hug', function (err, res) {
            return(res => res.data)
            return(data => data.link);
    });


          let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`${author.username} has hugged ${huggedUser.user.username}!`)
            .setImage(hug)
            .setFooter("Aiko | Hug")
            .setTimestamp();
          return message.channel.send(embed);
        
  }
}