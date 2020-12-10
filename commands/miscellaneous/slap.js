const { MessageEmbed } = require("discord.js");

module.exports = {
  config: {
    name: "slap",
    description: "type the command to 'slap' a user!",
    usage: "(user)",
    category: "miscellaneous",
    accessableBy: "Members"
  },
  run: async (bot, message, args) => {
    const slappedUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author

    const damage = Math.floor(Math.random() * 10);

    if (!args[0]) return message.channel.send("Specify someone to slap! Correct Syntax: ?slap <@User>");

    if (!slappedUser) return message.channel.send("That user doesn't exist!");

    if (slappedUser === message.author) return message.channel.send("You can't slap yourself, idiot!")

    const embed2 = new MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(`${author.username} has slapped ${slappedUser.user.username}!`)
      .setDescription(`Damage: ${damage}/10`)
      .setImage("https://aiko.cf/emotes/slap.gif")
      .setFooter("Aiko | Slap")
      .setTimestamp();
    return message.channel.send(embed2);
  }
}