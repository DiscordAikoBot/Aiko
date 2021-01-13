const Discord = require('discord.js');
const db = require("quick.db");

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


module.exports = {
    config: {
        name: "secretsanta",
        description: "",
        usage: "secretsanta",
        category: "moderation",
        accessableby: "",
        aliases: ["ss"]
    },
    run: async (bot, message, args) => {

      const ss = new db.table('SECRET_SANTA');

      if (args[0] === 'stop') {

        if(!message.member.hasPermission("ADMINISTRATOR")) return;

        const members = ss.fetch(message.guild.id)
        if(!members) return;

        let lists = []

        for(let mem of members) {
          let users = mem.user
          lists.push(users)
        } 

        console.log(lists)
        
        let undelivered = 0;

        lists.forEach(function (e) {
          const list = lists[Math.floor(Math.random() * lists.length)];
          if(list === e) {
            shuffle(lists);
          }
          const m = message.guild.members.cache.get(e);
          const lu = message.guild.members.cache.get(list);
          m.user.send(`Your Secret Santa 🎅 is - <@${list}> (${lu.user.username}).`)
          shuffle(lists);
        })

      } else {

        if(Date.now() === 1608866221973) return message.channel.send("Secret Santa access is closed. :lock:")

        if (ss.get(message.guild.id)) {
              if (ss.get(message.guild.id).find(user => user.user === message.author.id)) return message.channel.send({embed : {color:'#de2121', description:"<:tick_no:746298075643117620> You are already registered for Secret Santa!"}})
          } 

        if(!ss.fetch(message.guild.id)) {
          ss.set(message.guild.id, [{user: message.author.id}]);
        } else {
          ss.push(message.guild.id, {user: message.author.id});
        }

        message.channel.send("You have joined Secret Santa 🎅. Secret Santa will be accessable till 25th December!")
        
      }

    }
}