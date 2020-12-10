const Discord = require("discord.js");

module.exports = {
    config: {
        name: "invite",
        usage: "(command)",
        category: "miscellaneous",
        description: "Get the bot invite link.",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {

      const embed = new Discord.MessageEmbed()
          .setColor("#03fcbe")
          .setTitle("Invite Links")
          .setDescription("[Invite link (recommended)](https://discord.com/api/oauth2/authorize?client_id=764051652436819968&permissions=103634866&redirect_uri=https%3A%2F%2Faiko.cf&response_type=code&scope=bot%20identify)\n[Invite link (admin)](https://discord.com/api/oauth2/authorize?client_id=764051652436819968&permissions=8&redirect_uri=https%3A%2F%2Faiko.cf&response_type=code&scope=bot%20identify)")
          .setFooter('AIKO BOT | https://aiko.cf')

      message.channel.send(embed)

    }
}