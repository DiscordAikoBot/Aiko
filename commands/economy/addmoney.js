const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const { red_light, green_light, red_dark } = require('../../colours.json');
const { permCheck } = require('../../functions.js')

module.exports = {
  config: {
    name: 'addmoney',
    usage: '(command) (user) (amount)',
    category: 'economy',
    description: 'Pays a user a certain amount of money',
    accessableby: 'Members'
  },
  run: async (bot, message, args) => {
    let error = new MessageEmbed()
    .setTitle("Error")
    .setDescription("You don't have permission. Earn money urself kid.")
    .setColor(red_light)
      let perm = permCheck(message, false, 'addmoney')
      if(perm === false) return message.channel.send(error);
    

    let amount = args[0]
    if(isNaN(amount)) return message.channel.send('Please send a valid number.');

    const economy = new db.table('economy');
    economy.add(`balance.${message.guild.id}.${message.author.id}`, amount)

    message.channel.send('Done!')
  }
}