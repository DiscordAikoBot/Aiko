const { MessageEmbed } = require('discord.js');
const { cyan } = require("../../colours.json")

module.exports = {
  config: {
    name: 'support',
    category: "information",
    description: 'Gives the user an embed about where they can get help for the bot.'
},
    run: async (bot, message, args) => {
    
    const supportEmbed = new MessageEmbed()
        .setColor(cyan)
        .setTitle('Aiko Support')
        .setDescription('Need help? No worries! Here are some ways you can get help from developers or staff of Aiko. :3')
        .addFields(
            { name: 'Discord Server', value: 'https://discord.gg/vYX9CkD', inline: false },
            { name: 'Website', value: 'https://aikobot.us.to', inline: false }
        )
        .setFooter('Aiko | Support');
      return message.channel.send(supportEmbed);
    }
}