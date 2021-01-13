const { MessageEmbed } = require("discord.js")
const ms = require("ms");
const db = require('quick.db')
const color = require('../../color.json')
 
module.exports = {
    config: {
        name: "tempmute",
        description: "tempmutes a user from the server",
        usage: "(user) (time. forever for perm) (reason)",
        category: "moderation",
        accessableby: "Moderators",
        aliases: ["tm"]
    },
    run: async (bot, message, args) => {

      let mutee = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.get(args[0])
      if(!mutee) return message.channel.send("Please mention the user that you want to mute");
      if (mutee.id === message.author.id) {
        return message.reply("You can't mute yourself...");
      }


      let time = args[1];
      if(!time) return message.channel.send('Specify the time please');
      
      let reason = args.slice(2).join(" ");
      if(!reason) reason = "No reason provided.";


      let muterole = message.guild.roles.cache.find(r => r.name === "Muted")
      if(!muterole) {
        message.guild.roles.create({
          data: {
            name: 'Muted',
          }
        }).then(role => {
          message.guild.channels.cache.forEach(x => {
            x.updateOverwrite(role, { SEND_MESSAGES: false });
          })
        })
        muterole = message.guild.roles.cache.find(r => r.name === "Muted")
      }
      mutee.roles.add(muterole)


      let rit = ms(time)

      rit = Date.now() + rit

      let sty = db.get(`tempmutes`) || [];

      let xtd = {member: mutee, timer: rit}

      db.push(`tempmutes`, xtd)


        setTimeout(function(){
          if(mutee.roles.cache.some(r => r.id === muterole)) return;
          mutee.roles.remove(muterole)
          mutee.send(`You have been unmuted on \`${message.guild.name}\``).catch(e => {
            return;
          })

          let temp = db.get(`tempmutes`)
          if(!Array.isArray(temp)) return db.delete(`tempmutes`)
          let yrtd = temp.filter(s => s.member !== mutee && s.guild !== message.guild)

          db.set(`tempmutes`, yrtd)
          
          }, ms(time))




          message.channel.send(`${mutee.user.tag} has been muted for ${ms(ms(time))}`)

          db.push(`punishment.${message.guild.id}.${mutee.id}`, `Type: TempMute - Reason: ${reason} - Staff: ${message.author.username}`)
        
        let wembed = new MessageEmbed()
          .setColor(color.green)
          .setAuthor(``, message.guild.iconURL)
          .setDescription(`**You have been temporarily muted on ${message.guild.name}** \n Punished by: ${message.author.tag} \n Reason: ${reason} \n Length: ${time}`)
          mutee.send(wembed).catch(err => {
            return;
          })

        let embed = new MessageEmbed()
          .setColor(color.green)
          .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
          .addField("Moderation:", "mute")
          .addField("Mutee:", mutee.user.tag)
          .addField("Moderator:", message.author.tag)
          .addField("Reason:", reason)
          .addField("Length:", time)
          .setTimestamp()

          let chnl = message.guild.channels.cache.find(r => r.id === db.get(`data.${message.guild.id}.modlog`))
        if(chnl) {
          chnl.send(embed)
        }

    }
}