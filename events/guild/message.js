const fs = require('fs');
const readline = require('readline');
const db = require('quick.db');
const { MessageEmbed, Discord, SnowflakeUtil } = require('discord.js');
const { green_light } = require('../../colours.json');
const companion = require('little-api-companion');

module.exports = async (bot, message) => { 

  if(message.author.bot || message.channel.type === "dm") return;
  
  //   //anti-spam and anti-spam-ping, please leave commented until I finish it - Caitlin-chan
  /*
    haspinged = new db.table("haspinged");
    enablecheck = db.get(message.guild.id + "anti-ping disabled");
    if (enablecheck === false) {
        pinglimit = db.get(message.guild.id + "anti-ping pings");
        timelimit = db.set(message.guild.id + "anti-ping seconds");
        if (message.mentions.users.first()) {
            pingmsg = message.id;
            pinged = haspinged.get(message.author.id + "--messages");
            if (!pinged) {
                pinged = [ message.id ];
                haspinged.set(message.author.id + "--messages", pinged);
            } else {
                pinged.push(message.id);
                firstping = SnowflakeUtil.deconstruct(pinged[0]).timestamp / 1000;
                lastping = (SnowflakeUtil.deconstruct(pinged[pinged.length - 1]).timestamp / 1000) + timelimit;
                if (firstping > lastping) {
                    pinged.shift();
                }
                if (pinged.length > pinglimit) {
                    try {
                        for (const lastmsg of pinged) {
                            pingmessage = await message.channel.messages.fetch(lastmsg);
                            if (pingmessage) await pingmessage.delete();
                        }
                        await message.channel.send("<@" + message.author + ">" + " has been muted for 5 minutes. Reason: Spam pinging.");
                        await haspinged.delete(message.author.id + "--messages");
                        return;
                    } catch (err) {
                        console.log("error");
                        await haspinged.delete(message.author.id + "--messages");
                    }
                } else {
                    haspinged.set(message.author.id + "--messages", pinged);
                }
            }
        }
    }
        
    */
  //   //anti-spam and anti-spam-ping, please leave commented until I finish it - Caitlin-chan
  //   // code looks decent, 👍 - Daemon
  //   //make the option of ping limit and timelimit to be set by admin of guild
  //   //and a option to disable it
  //   //and option like if action mute is there then mute or delete or if both is set both
  //   //- TYPHOON

    


    let blacklist = db.get(`settings.${message.guild.id}.blacklist`)
    
    let ch = false
    let msgc = message.content.toLowerCase()
    
    if(blacklist) {
        blacklist.forEach(x => {
        if(message.content.includes(x)) {
            if(!message.member.hasPermission(["ADMINISTRATOR"])) return ch = true
        }
        })
    }

    if(ch === true) {
      message.delete()
      return message.channel.send('Your message contained a blacklisted word!');
    }
  
   let prefix = db.get(`${message.guild.id}.prefix`)
   if(!prefix) {
     db.set(`${message.guild.id}.prefix`, '?')
   }
  // LEVELLING

  const level = new db.table('LEVEL_SYSTEM');
  const chx = level.fetch(`channel_${message.guild.id}`);
  const toggle = level.fetch(`toggle_${message.guild.id}`)
  const role = new db.table("LEVEL_ROLES");
  let roles = role.fetch(message.guild.id)
  if(!roles) role.set(message.guild.id, [])
  const levels = role.fetch(`${message.guild.id}.level`)


  if(toggle === 'on') {
    if(!message.content.startsWith(prefix)) {
            const levels = new db.table('level')
        levels.add(`points.${message.guild.id}.${message.author.id}`, 1)
    let points = levels.get(`points.${message.guild.id}.${message.author.id}`)
      let rank = levels.get(`rank.${message.guild.id}.${message.author.id}`)
      if(!rank) {
          levels.set(`rank.${message.guild.id}.${message.author.id}`, 1)
      }
      let check = rank * 25
      if(points >= check) {
          levels.add(`rank.${message.guild.id}.${message.author.id}`, 1)
          let ranksend = levels.get(`rank.${message.guild.id}.${message.author.id}`)
          if (ranksend === levels){
            message.member.roles.add(roles)
          }
          let msg = level.fetch(`message_${message.guild.id}`);
          if(!msg) msg = `🎉 ${message.author} has levelled up to **${ranksend}** 🎉`;
          
          let user = msg.replace(/{user}/g, message.author);
          let usertag = user.replace(/{usertag}/g, message.author.tag);
          let username = usertag.replace(/{username}/g, message.author.username);
          let userlevel = username.replace(/{userlevel}/g, ranksend);


          let rankEmbed = new MessageEmbed()
          .setColor(green_light)
          .setTitle('Level Up')
          .setDescription(userlevel)
        
          const channel = bot.channels.cache.get(chx)
          if (channel) channel.send(rankEmbed);
          
          
        }
      }
  } else if (toggle === 'off') {

          return console.log(`NO LEVELLING SYSTEM SET ${member.guild.name}`)
      }


    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    if(!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
    
    if(commandfile) commandfile.run(bot, message, args)
}
