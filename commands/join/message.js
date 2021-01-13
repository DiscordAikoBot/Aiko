const { MessageEmbed } = require("discord.js")
const { aqua } = require("../../colours.json");
const db = require('quick.db');

module.exports = {
    config: {
        name: "joinmessage",
        description: "Sets role to give to users when they join!",
        usage: "(role)",
        category: "settings",
        accessableby: "Administrators"
    },
    run: async (bot, message, args) => {
        
    const { permCheck } = require('../../functions.js');
    let perm = permCheck(message, false, 'joinrsfsf');
    if(perm === false) return message.channel.send('You do not have permissions!');


    const filter = m => m.author.id === message.author.id;

    const collector = message.channel.createMessageCollector(filter, { max: 1, time: 15000 });

    const contentembed = new MessageEmbed()
                          .setColor('#eb0936')
                          .setDescription("Please send the join message along with the tags")
                          .addField("Available Tags: ", `
                          {user} - mention the user.
                          {usertag} - show the username with discriminator.
                          {username} - show the username.`)
                    message.channel.send(contentembed)


    collector.on('collect', m => {

                     

                    const levelmsgEmbed = new MessageEmbed()
                        .setAuthor("JOIN MESSAGE SET")
                        .setColor('#10de47')
                        .setDescription(`Set join messsage to:\n \`\`\`${m}\`\`\` `)
                    
                    message.channel.send(levelmsgEmbed);
    })
    }
}