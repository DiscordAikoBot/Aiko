const Discord = require("discord.js");
const { cyan } = require("../../colours.json")
const db = require('quick.db')

module.exports = {
    config: {
        name: "level-settings",
        usage: "(command)",
        category: "levelling",
        description: "Displays your level",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {

      const level = new db.table('LEVEL_SYSTEM');

      let check = level.fetch(`toggle_${message.guild.id}`)
      if(check === 'on') {
        c = "<:tick_yes:746298071951867906> THE LEVELLING SYSTEM IS TURNED ON"
      } else {
        c = "<:tick_no:746298075643117620> THE LEVELLING SYSTEM IS TURNED OFF"
      }

      const channel = level.fetch(`channel_${message.guild.id}`)
      const lvl_chn = bot.channels.cache.get(channel)

      const lvl_msg = level.fetch(`message_${message.guild.id}`)

      const role = new db.table("LEVEL_ROLES");
      const levelrole = role.fetch(message.guild.id);

      let result;
      if(!levelrole || !levelrole.length) {
        result = "<:tick_no:746298075643117620> LEVEL ROLES ARE NOT SET"
      } else {
        result = "<:tick_yes:746298071951867906> LEVEL ROLES ARE SET"
      }
      
      const elements = [
        `${c}`,
        ` `,
        `**>|** Channel: ${lvl_chn ? lvl_chn: "NONE"}`,
        `**>|** Message: \`\`\`${lvl_msg ? lvl_msg: "NONE"}\`\`\``,
        `${result}`
      ]

      const embed = new Discord.MessageEmbed()
            .setColor("CYAN")
            .setAuthor("LEVELLING SETTINGS", message.guild.iconURL())
            .setDescription(elements.join("\n"))

      const roleEmbed = new Discord.MessageEmbed()
            .setAuthor('Level Role(s)', message.guild.iconURL())
            .setColor('#8a2b24')
      for(let role of levelrole) {
    
            let roles = role.role
            let message = role.message
            embed.addField(`Level ${message}: `, `<@&${role}>`)

      }

      message.channel.send(embed)

    }
} 