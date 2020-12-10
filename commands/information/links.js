const { MessageEmbed } = require("discord.js");
const { cyan } = require("../../colours.json");

module.exports = {
  config: {
    name: "links",
    category: "information",
    description: 'Gives the user an embed about where they can see the links related to Aiko.'
},
    run: async(bot, message, args) => {
      const embed = new MessageEmbed()
        .setColor(cyan)
        .setAuthor("Aiko Related Links")
        .addFields(
          {
            name: "Website",
            value: "https://aiko.cf/",
            inline: false,
          },
          {
            name: "Support Server",
            value: "https://discord.gg/JgcqdsAdWY/",
            inline: false,
          },
          {
            name: "Top.gg Page",
            value: "https://top.gg/bot/764051652436819968/",
            inline: false,
          },
        )
        .setTimestamp()
        .setFooter("Aiko | Links");
      return message.channel.send(embed);
    }
}