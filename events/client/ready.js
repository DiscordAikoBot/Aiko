const { Manager } = require("erela.js");
const fetch = require("node-fetch")
const db = require('quick.db');
const client = require('discord.js')
const { GiveawaysManager } = require("discord-giveaways");
client.rpg = []
client.rpg.stats = ["int", "str", "wis", "dex", "con", "cha"];
//console.log(client.rpg.stats)
module.exports = bot => {

   fetch(`https://top.gg/api/bots/764051652436819968/stats`, {
    method: "POST",
    headers: { 
        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc2NDA1MTY1MjQzNjgxOTk2OCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjA1OTYyNTE0fQ.I6bd5CAt6cKOrFW2BDI7yckpCifA-dhbtQMWBVTEtNw",
        "Content-Type": "application/json"
        },
        body: JSON.stringify({"server_count": bot.guilds.cache.size })
      }).then(response => response.text())
    .then(console.log).catch(console.error);


    console.log(`${bot.user.tag} is online`);

    bot.music = new Manager({
      nodes: [
        {
          host: process.env.HOST, 
          port: 3001,
          password: process.env.PASS
          },
          ],
            autoPlay: true,
            send: (id, payload) => {
              const guild = bot.guilds.cache.get(id);
              if (guild) guild.shard.send(payload);
            } 
          })
        .on("nodeConnect", node => console.log(`Successfully Connected To Node.`))
        .on("nodeError", (node, error) => console.log(`Node "${node.options.identifier}" encountered an error: ${error.message}.`))
        .on("trackStart", (player, track) => {
          const channel = bot.channels.cache.get(player.textChannel);
          channel.send(`Now playing: \`${track.title}\`, requested by \`${track.requester.tag}\`.`);
          })
          .on("queueEnd", player => {
            const channel = bot.channels.cache.get(player.textChannel);
            channel.send("Queue has ended.");
            player.destroy();
            });

    bot.music.init(bot.user.id);
    bot.on("raw", d => bot.music.updateVoiceState(d))


    
// Starts updating currents giveaways
const manager = new GiveawaysManager(bot, {
    storage: "./giveaways.json",
    updateCountdownEvery: 10000,
    default: {
        botsCanWin: false,
        exemptPermissions: [],
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});
// We now have a giveawaysManager property to access the manager everywhere!
bot.giveawaysManager = manager;


    bot.levels = new Map()
        .set("none", 0.0)
        .set("low", 0.10)
        .set("medium", 0.15)
        .set("high", 0.25);

    bot.user.setPresence({
            status: 'online',
            activity: {
                name: '?help | aiko.cf',
               type: 'WATCHING'
            }
       })

  let mutes = db.get(`tempmutes`);
    if(mutes) {

      mutes.forEach(std => {



        let guild = bot.guilds.cache.get(std.member.guildID);
        if(!guild) return console.log('qu');

        guild.members.fetch(std.member.userID).then(mutee => {
          if(!mutee) return console.log('mem');

        let time = std.timer - Date.now()

        if(time <= 0) {

          let temp = db.get(`tempmutes`)
          if(!Array.isArray(temp)) return db.delete(`tempmutes`)
          let yrtd = temp.filter(s => s.member !== mutee)

          db.set(`tempmutes`, yrtd)
        } else {

   setTimeout(function(){


     let muterole = guild.roles.cache.find(r => r.name === "Muted")
     if(!muterole) return console.log('Mute role');


          if(mutee.roles.cache.some(r => r.id === muterole)) return;
          mutee.roles.remove(muterole)
          mutee.send(`You have been unmuted on \`${guild.name}\``).catch(e => {
            return;
          })

          let temp = db.get(`tempmutes`)
          if(!Array.isArray(temp)) return db.delete(`tempmutes`)
          let yrtd = temp.filter(s => s.member !== mutee && s.guild !== guild)

          if(yrtd.length <= 0) return db.delete(`tempmutes`);

          db.set(`tempmutes`, yrtd)
          
          }, time)

        }
        })
      
      })
    

    }


  
  
};



