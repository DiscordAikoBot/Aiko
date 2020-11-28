const { green_light } = require("../../colours.json");
const fetch = require("node-fetch");
const { MessageEmbed } = require('discord.js')

module.exports = {
  config: {
    name: "mc",
    aliases: ["mcstatus"],
    usage: "<IP>",
    category: "miscellaneous",
    description: "Gets the status of a Minecraft server.",
    accessableby: "Members"
  },
  run: async (bot, message, args) => {

    if (!args[0]) {
      return await message.reply("please specify a server!");
    }

    if(args[0].includes('minehut')) return message.channel.send('As of right now minehut servers are not supported due to there different structure.')
    const res = await fetch(`https://eu.mc-api.net/v3/server/ping/${args[0]}`);
    const data = await res.json();

    const colors = [
      "§0",
      "§2",
      "§3",
      "§4",
      "§5",
      "§6",
      "§7",
      "§8",
      "§9",
      "§a",
      "§b",
      "§c",
      "§d",
      "§e",
      "§f",
      "§o",
      "§l",
      "§m",
      "§n",
      "§k"
    ];

    if(data.error) return message.channel.send('Invalid server ip')

    let motd = ''
    
    if(data.description.text) {
      motd = data.description.text
    } else {
      motd = data.description
    }

    colors.forEach(x => {
      motd = motd.replace(x, '')
    })

    let on = ''

    if(data.online === true) {
      on = 'online'
    } else {
      on = 'offline'
    }

    console.log(data.favicon)

    let embed = new MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`${args[0]}'s status`)
    .setThumbnail(data.favicon)
    .setDescription(`Server is ${on}. \nPlayers: ${data.players.online} \/ ${data.players.max}. \nMOTD: ${motd}`)
    
    message.channel.send(embed)
  }
};