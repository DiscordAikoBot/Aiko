const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    config: {
        name: "last",
        description: "Get the information about a ticket",
        usage: "ticket-info",
        category: "ticket",
        accessableby: "",
        aliases: ["it"]
    },
    run: async (bot, message, args) => {

  let ticketcount = db.fetch(`${message.guild.id}-ticketcount`)

  let reasonfetch = db.fetch(`${message.guild.id}-closeticketreason`)

  let user = db.fetch(`${message.guild.id}-ticketopener`)

  let reasonfetch2 = db.fetch(`${message.guild.id}-ticketreason`)

  let transcriptfetch = db.fetch(`${message.guild.id}_${user.id}-transcript`)

  if(ticketcount == null) ticketcount = 0
  if(reasonfetch == null) reasonfetch = 'None'
  if(user == null) user = 'None'
  if(reasonfetch2 == null) reasonfetch2 = 'None'
  if(transcriptfetch == null) transcriptfetch = 'None'

  let embed = new Discord.MessageEmbed()
  .setColor('#e64b0e')
  .setTitle(`Ticket Information`)
  .setDescription(`Opened By: ${message.author}\nTicket Reason: \`${reasonfetch2}\`\nClose Reason: \`${reasonfetch}\`\nTicket Number: \`${ticketcount}\`\nTranscript: [Here](${transcriptfetch})`)
    message.channel.send(embed)




    }
}