const { MessageEmbed } = require('discord.js');
const { cyan } = require("../../colours.json");

module.exports = {
  config: {
    name: 'faq',
    category: "information",
    description: 'Gives the user an embed about where they can see the frequently asked questions.'
},
    run: async (bot, message, args) => {

      const faqEmbed = new MessageEmbed()
        .setColor(cyan)
        .setTitle('Frequently Asked Questions')
        .setDescription('There are questions that people always talk about. In this message, we answer them!')
        .addFields(
          { name: "Why are some commands not working?", value: "There are many answers to this question. Sometimes it isn't working because we are adding commands or features. Other times it may be the permissions Aiko has or the permissions you have. If the bot hasn't been working for you for over an hour, join our Support Discord server.", inline: false },
          { name: "Does Aiko have a website?", value: "Yes! We infact do! https://aikobot.us.to/", inline: false },
          { name: "Does Aiko have a Discord Support Server?", value: "Yes! We do! https://discord.com/invite/vYX9CkD", inline: false },
          { name: "Does Aiko have a dashboard?", value: "Unfortunately, we don't. We do have commands that might replace a dashboard. Like the prefix command or the permadd command.", inline: false }
        )
        .setFooter('Aiko | FAQ');
      return message.channel.send(faqEmbed);
    }
}