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
          .setDescription("[Invite link (recommended)](https://discord.com/oauth2/authorize?client_id=764051652436819968&scope=bot&permissions=1036348662)\n[Invite link (admin)](https://discord.com/oauth2/authorize?client_id=764051652436819968&permissions=8&scope=bot)")
          .setFooter('AIKO BOT | https://aiko.cf')

      message.channel.send(embed)

    }
}