const Discord = require('discord.js');
const db = require('quick.db');
const date = require('date-and-time')
const hastebin = require('hastebin')

module.exports = {
    config: {
        name: "timeout",
        description: "Starts a timeout for a ticket",
        usage: "timeout",
        category: "ticket",
        accessableby: "",
    },
    run: async (bot, message, args) => { 

    let notallowed = new Discord.MessageEmbed()
    .setColor('#e64b0e')
    .setDescription(`You Don't have enough permissions!`)

    const { permCheck } = require('../../functions.js')
    let perm = permCheck(message, false, 'tickettimeout')
    if(perm === false) return message.channel.send(notallowed);

  const ticket = new db.table("TICKET_SYSTEM");

  let cancelembed = new Discord.MessageEmbed()
    .setColor('#e64b0e')
    .setDescription(`Timeout Stopped`)

  let input = new Discord.MessageEmbed()
    .setColor('#e64b0e')
    .setDescription(`Timeout Started\n\nThis Ticket Will Close In 15 Minutes If No One Reacts To This Message`)

  let msg = await message.channel.send(input)
  await msg.react("✅")

  bot.on('messageReactionAdd', (messageReaction, user) => {
    if(user.bot) return;
  })
  
  let user = ticket.fetch(`${message.guild.id}.ticketopener`)

  message.channel.messages.fetch()
  .then(messages => {
    let text = "";

  for (let [key, value] of messages) {
        const now = new Date();
      let dateString = `${date.format(now, 'YYYY/MM/DD HH:mm:ss', true)}`;

      text += `${dateString} | ${value.author.tag}: ${value.content}\n`;
  }

  hastebin.createPaste(text, {
          raw: true,
          contentType: 'text/plain',
          server: 'https://hastebin.com'

      })
      .then(data => {
          console.log(`Created paste: ${data}`);
          
  
    let ticketcount = ticket.fetch(`${message.guild.id}-ticketcount`)



    let closedticket = new Discord.MessageEmbed()
    .setColor('#e64b0e')
    .setDescription(`Ticket Closed. This Ticket Will Be Deleted In 10 Minutes\n\n[Ticket Transcript](${data}) Or Run \`ticket.last\` To Get Additional Info`)



    let logchannelembed = new Discord.MessageEmbed()
    .setColor('#e64b0e')
    .setTitle(`Ticket Closed`)
    .setDescription(`Closed By: ${message.author}\nTicket Number: \`${ticketcount}\`\nClose Reason: \`Timeout\`\nTranscript: [Here](${data})`)

    let logchannel = message.guild.channels.cache.find(cl => cl.name == "ticket-logs" && cl.type == "text")

    const filter = (reaction, user) => ['✅'].includes(reaction.emoji.name) && !user.bot;

      msg.awaitReactions(filter, {
        max: 1,
        time: 900000
      }).then(collected => {
        const reaction = collected.first();
        switch (reaction.emoji.name) {
          case '✅':
            msg.delete()
          return message.channel.send(cancelembed)
        }
      }).catch(collected => {
        logchannel.send(logchannelembed) 
        ticket.delete(`${message.guild.id}_${message.author.name}`)  
        message.channel.send(closedticket)
        msg.delete()
        setTimeout(() => {
          message.channel.delete()
        }, 600000);
        
      })
    })
      

    })
  }
}