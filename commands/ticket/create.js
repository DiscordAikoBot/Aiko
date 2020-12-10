const Discord = require('discord.js');
const db = require('quick.db');
const ms = require("parse-ms");
const randomstring = require("randomstring");
const date = require('date-and-time');
const hastebin = require('hastebin');

module.exports = {
    config: {
        name: "create",
        description: "Creates a ticket",
        usage: "create",
        category: "tickets",
        accessableby: "",
        aliases: ["cr"]
    },
    run: async (bot, message, args) => {

  const ticket = new db.table("TICKET_SYSTEM");
  let permembed = new Discord.MessageEmbed()
  .setColor('#e64b0e')
  .setDescription(`Error. Give Me The Permission: Manage Channels`)

  if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send(permembed);

  const user2 = message.author;
  const timeout = 180000;
  const daily = await ticket.fetch(`ticketcooldown_${message.guild.id}_${message.author.id}`);

  const check = ticket.fetch(`${message.guild.id}_${message.author.name}`)
  if(check) return message.channel.send({embed: {color:"RED", description:`You already have a ticket opened - <#${check}>`}})

  if (daily !== null && timeout - (Date.now() - daily) > 0) {
    let time = ms(timeout - (Date.now() - daily));
  
  const timeEmbed = new Discord.MessageEmbed()
    .setColor("#e64b0e")
    .setDescription(`You have a cooldown of ${time.minutes}m ${time.seconds}s until you can open another ticket`);
  message.channel.send(timeEmbed)
  
  } else {
  const numbers = randomstring.generate({
    length: 5,
    charset: 'numeric'
  });

  const authorsend2 = new Discord.MessageEmbed()
    .setColor('#e64b0e')
    .setDescription(`You already have a ticket open`)

  let topic1 = ticket.fetch(`${message.guild.id}-topic1`)
  let topic2 = ticket.fetch(`${message.guild.id}-topic2`)
  let topic3 = ticket.fetch(`${message.guild.id}-topic3`)
  let topic4 = ticket.fetch(`${message.guild.id}-topic4`)
  let topic5 = ticket.fetch(`${message.guild.id}-topic5`)


  if(topic1 == null) topic1 = 'Not Set';
  if(topic2 == null) topic2 = 'Not Set';
  if(topic3 == null) topic3 = 'Not Set';
  if(topic4 == null) topic4 = 'Not Set';
  if(topic5 == null) topic5 = 'Not Set';


  ticket.add(`${message.guild.id}-ticketcount`, 1)
  ticket.set(message.guild.id, {
    no: numbers,
    ticketopener: message.author.id,
  });

  const ticketcount = ticket.fetch(`${message.guild.id}-ticketcount`)

  const channelsend1 = new Discord.MessageEmbed()
    .setColor('#e64b0e')
    .setTitle(`Support Ticket: ${ticketcount}`)
    .setDescription(`Hello ${message.author},\n\nThank you for making a ticket. The support team will help you as soon as they can.\n\n**Ticket Catergory:** ${topic1}`)

  const channelsend2 = new Discord.MessageEmbed()
    .setColor('#e64b0e')
    .setTitle(`Support Ticket: ${ticketcount}`)
    .setDescription(`\n\nHello ${message.author},\n\nThank you for making a ticket. The support team will help you as soon as they can.\n\n**Ticket Catergory:** ${topic2}`)

  const channelsend3 = new Discord.MessageEmbed()
    .setColor('#e64b0e')
    .setTitle(`Support Ticket: ${ticketcount}`)
    .setDescription(`\n\nHello ${message.author},\n\nThank you for making a ticket. The support team will help you as soon as they can.\n\n**Ticket Catergory:** ${topic3}`)

  const channelsend4 = new Discord.MessageEmbed()
    .setColor('#e64b0e')
    .setTitle(`Support Ticket: ${ticketcount}`)
    .setDescription(`\n\nHello ${message.author},\n\nThank you for making a ticket. The support team will help you as soon as they can.\n\n**Ticket Catergory:** ${topic4}`)

  const channelsend5 = new Discord.MessageEmbed()
    .setColor('#e64b0e')
    .setTitle(`Support Ticket: ${ticketcount}`)
    .setDescription(`\n\nHello ${message.author},\n\nThank you for making a ticket. The support team will help you as soon as they can.\n\n**Ticket Catergory:** ${topic5}`)

  const cancelembed = new Discord.MessageEmbed()
    .setColor('#e64b0e')
    .setDescription(`Ticket Cancelled`)

  const input = new Discord.MessageEmbed()
    .setColor('#e64b0e')
    .setDescription(`Please choose from one of the following ticket topics: \n\n1: ${topic1}\n2: ${topic2}\n3: ${topic3}\n4: ${topic4}\n5: ${topic5}`)
    .setFooter(`This will expire in 40 seconds then you will be put on a 3 minute cooldown`)

  const msg = await message.channel.send(input)
    await msg.react("1️⃣")
    await msg.react("2️⃣")
    await msg.react("3️⃣")
    await msg.react("4️⃣")
    await msg.react("5️⃣")
    await msg.react("❌")

  const categoryName = "TICKETS";
  const category = message.guild.channels.cache.find(channel => channel.type === "category" && channel.name === categoryName);
  const ticketlog = ticket.get(`${message.guild.id}_ticketlog`)
  const logchannel = bot.channels.cache.get(ticketlog);
  const role = db.get(`${message.guild.id}-ticketrole`)

  const filter = (reaction, user) => ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
  msg.awaitReactions(filter, {
    max: 1,
    time: 40000
  }).then(collected => {
        const reaction = collected.first();
        switch (reaction.emoji.name) {

          case '1️⃣':
            if(!category) return message.channel.send("Please ask the management to setup ticket system.")

            var name = `ticket-${numbers}`;
            message.guild.channels.create(name, {
                type: 'text',
                parent: category,
                permissionOverwrites: [
                  {
                    id: message.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL'],
                  },
                  {
                    id: message.author.id,
                    allow: ['VIEW_CHANNEL',
                            'SEND_MESSAGES',
                            'READ_MESSAGE_HISTORY'               
                          ]
                  },
                  {
                    id: message.author.id,
                    deny: ['MENTION_EVERYONE']
                  },
                ],
              }).then(createdchannel => { 

                createdchannel.send(channelsend1)
                console.log(topic1)
                createdchannel.setTopic(`Support Ticket ${numbers} - ${message.author.username} - ${topic1}`)
                ticket.set(`${message.guild.id}_${message.author.name}`, createdchannel.id)
                const chname = createdchannel.id
                
                message.reply(`A ticket has been created for you : <#${chname}>`).then(msg => {
                    msg.delete({ timeout: 4000 })
                    }).catch(console.error);;

                  role.forEach(x => {
                    let y = message.guild.roles.cache.find(r => r.id === x);
                    if(!y) return;
                    
                    createdchannel.updateOverwrite(y, { VIEW_CHANNEL: true})
                  })
                
              })

              msg.delete()

            break;

          case '2️⃣':
            if(!category) return message.channel.send("Please ask the management to setup ticket system.")

            var name = `ticket-${numbers}`;
            message.guild.channels.create(name, {
                type: 'text',
                parent: category,
                permissionOverwrites: [
                  {
                    id: message.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL'],
                  },
                  {
                    id: message.author.id,
                    allow: ['VIEW_CHANNEL',
                            'SEND_MESSAGES',
                            'READ_MESSAGE_HISTORY'               
                          ]
                  },
                  {
                    id: message.author.id,
                    deny: ['MENTION_EVERYONE']
                  },
                ],
              }).then(createdchannel => { 

                createdchannel.send(channelsend1)
                createdchannel.setTopic(`Support Ticket ${numbers} - ${message.author.username}`)
                ticket.set(`${message.guild.id}_${message.author.name}`, createdchannel.id)
                msg.delete()
                const chname = createdchannel.id
                console.log("T2")
                console.log(topic2)
                message.reply(`A ticket has been created for you : <#${chname}>`).then(msg => {
                    msg.delete({ timeout: 4000 })
                    }).catch(console.error);;

                    role.forEach(x => {
                    let y = message.guild.roles.cache.find(r => r.id === x);
                    if(!y) return;
                    
                    createdchannel.updateOverwrite(y, { VIEW_CHANNEL: true})
                  })

              })
              msg.delete()
                
            break;

          case '3️⃣':
            if(!category) return message.channel.send("Please ask the management to setup ticket system.")

            var name = `ticket-${numbers}`;
            message.guild.channels.create(name, {
                type: 'text',
                parent: category,
                permissionOverwrites: [
                  {
                    id: message.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL'],
                  },
                  {
                    id: message.author.id,
                    allow: ['VIEW_CHANNEL',
                            'SEND_MESSAGES',
                            'READ_MESSAGE_HISTORY'               
                          ]
                  },
                  {
                    id: message.author.id,
                    deny: ['MENTION_EVERYONE']
                  },
                ],
              }).then(createdchannel => { 

                createdchannel.send(channelsend1)
                createdchannel.setTopic(`Support Ticket ${numbers} - ${message.author.username}`)
                ticket.set(`${message.guild.id}_${message.author.name}`, createdchannel.id)
                msg.delete()
                const chname = createdchannel.id
                console.log("T3")
                message.reply(`A ticket has been created for you : <#${chname}>`).then(msg => {
                    msg.delete({ timeout: 4000 })
                }).catch(console.error);;

                role.forEach(x => {
                  let y = message.guild.roles.cache.find(r => r.id === x);
                  if(!y) return;
                    
                  createdchannel.updateOverwrite(y, { VIEW_CHANNEL: true})
                });
                
              });
              msg.delete()

            break;

          case '4️⃣':
            if(!category) return message.channel.send("Please ask the management to setup ticket system.")

            var name = `ticket-${numbers}`;
            message.guild.channels.create(name, {
                type: 'text',
                parent: category,
                permissionOverwrites: [
                  {
                    id: message.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL'],
                  },
                  {
                    id: message.author.id,
                    allow: ['VIEW_CHANNEL',
                            'SEND_MESSAGES',
                            'READ_MESSAGE_HISTORY'               
                          ]
                  },
                  {
                    id: message.author.id,
                    deny: ['MENTION_EVERYONE']
                  },
                ],
              }).then(createdchannel => { 

                createdchannel.send(channelsend1)
                createdchannel.setTopic(`Support Ticket ${numbers} - ${message.author.username}`)
                console.log("T4")
                const chname = createdchannel.id
                msg.delete()
                ticket.set(`${message.guild.id}_${message.author.name}`, createdchannel.id)
                message.reply(`A ticket has been created for you : <#${chname}>`).then(msg => {
                    msg.delete({ timeout: 4000 })
                }).catch(console.error);;


                role.forEach(x => {
                  let y = message.guild.roles.cache.find(r => r.id === x);
                  if(!y) return;
                    
                  createdchannel.updateOverwrite(y, { VIEW_CHANNEL: true})
                });
                
              });
              msg.delete()
                
            break;

          case '5️⃣':
            if(!category) return message.channel.send("Please ask the management to setup ticket system.")

            var name = `ticket-${numbers}`;
            message.guild.channels.create(name, {
                type: 'text',
                parent: category,
                permissionOverwrites: [
                  {
                    id: message.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL'],
                  },
                  {
                    id: message.author.id,
                    allow: ['VIEW_CHANNEL',
                            'SEND_MESSAGES',
                            'READ_MESSAGE_HISTORY'               
                          ]
                  },
                  {
                    id: message.author.id,
                    deny: ['MENTION_EVERYONE']
                  },
                ],
              }).then(createdchannel => { 

                createdchannel.send(channelsend1)
                createdchannel.setTopic(`Support Ticket ${numbers} - ${message.author.username}`)
                ticket.set(`${message.guild.id}_${message.author.name}`, createdchannel.id)
                const chname = createdchannel.id
                msg.delete()
                message.reply(`A ticket has been created for you : <#${chname}>`).then(msg => {
                    msg.delete({ timeout: 4000 })
                }).catch(console.error);;
                console.log("T5")

                role.forEach(x => {
                  let y = message.guild.roles.cache.find(r => r.id === x);
                  if(!y) return;
                    
                  createdchannel.updateOverwrite(y, { VIEW_CHANNEL: true})
                });
                
              });
              msg.delete()
        
            break;
            
          case '❌':
          msg.delete()
          ticket.subtract(`${message.guild.id}-ticketcount`, 1) 
          return message.channel.send(cancelembed)
        }
      });
    ticket.set(`ticketcooldown_${message.guild.id}_${message.author.id}`, Date.now())
      }

    }
}