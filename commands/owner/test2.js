const doc = require('authy-verify');
const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')


module.exports = {
    config: {
        name: "gif",
        description: "shuts down the bot!",
        usage: "!shutdown",
        accessableby: "Bot Owner"
    },
    run: async (bot, message, args) => {
    const creatorIDs = ["588236633535676416", "255327008576241674", "455046083953950731", "738000272730619933"];
       
            if (!creatorIDs.includes(message.author.id)) {
              return message.channel.send('You are not the owner of the bot').then(m => m.delete(5000));
            }

            let item = args.slice(0).join(" ")
            if(!item) return message.channel.send('Please add the thing you would like to search for in a gif')

            

              loadCuties(message)
      
      function loadCuties() {
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=aneHLn1iNaLSOyEXPqxDahfhkYnCc2hE&q=${item}&limit=200&offset=0&rating=g&lang=en`)
          .then(res => res.json())
          .then(y => postRandomCutie(y.data))
      }

      function postRandomCutie(urls) {
        let arrayNum = Math.floor(Math.random()*urls.length)
        let country = urls[arrayNum]


            let sembed = new MessageEmbed()
            //.setColor(cyan)
            .setAuthor(`${bot.user.username} meme!`, message.guild.iconURL)
            .setImage(country.images.original.url) //whatchu finna do?
            .setTimestamp()
            .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL)
        
        message.channel.send(sembed)
    }

           
    }
}