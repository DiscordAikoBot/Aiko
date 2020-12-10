const { MessageEmbed } = require('discord.js')

module.exports = {
    config: {
        name: "info",
        description: "self explanitory.",
        usage: "(command)",
        category: "moderation",
        accessableby: "members",
        aliases: ["rule"]
    },
    run: async (bot, message, args) => {
      let terms = 'https://discord.com/terms'
      let guidelines = 'https://discord.com/guidelines'
        let rules = new MessageEmbed()
            .setColor('7289da')
            .setTitle('AIKO - Information')
            .setURL('https://aiko.cf/#home')
            .setThumbnail(message.guild.iconURL({ dynamic : true }))
            .addField('Information', [
              '\u200b',
              //1
              `**What is Aiko?**`,
              'Aiko is a brand new Discord Bot, with many useful features, such as Moderation, Economy, Leveling, Welcoming, Information, and much more. Aiko ensures to provide safe, reliable commands for its users.',
              '\u200b',
              `**Why Aiko?**`,
              'You should choose Aiko over other bots, as we\'re completely user-friendly, and have many features, some which bots such as MEE6, Eli, and Dyno don\'t have.',
              '\u200b',
              '**How do I invite Aiko to my server?**',
              'You can invite Aiko to your server by going to our website [Here](https://aiko.cf/#home), and clicking the `+ Invite` button.'
            ])
            .addField('Socials', [
              '**-** [Website](https://aiko,cf/#home)',
              '**-** [Instagram](https://instagram.com/aiko.cf)',
              '**-** [Twitter](https://twitter.com/aiko_cf)'
            ])
            if(message.author == '774340378933067806' || '588236633535676416') {
              message.delete()
              return message.channel.send(rules);
            } else {
              return;
            }
    }
}