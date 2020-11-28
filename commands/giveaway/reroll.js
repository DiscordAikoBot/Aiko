const ms = require('ms');
const Discord = require("discord.js");

module.exports = {
  config: {
    name: "reroll",
    category: "giveaway",
    description: "Starts a giveaway",
    usage: "giveaway <channel mention> <time> <number of winners> <prize> "
  },
    run: async (client, message, args) => {
          const invalidEmbed = new Discord.MessageEmbed()
              .setAuthor("ReRoll Giveaway Command", client.user.displayAvatarURL({
                  format: "png",
                  dynamic: true,
                  size: 2048
              }))
              .setColor("#eb0936")
              .setTitle("Invalid Arguments")
              .addFields({
                  name: "USAGE",
                  value: "```reroll <giveaway message ID>```"
              }, {
                  name: "EXAMPLES",
                  value: "`reroll 51615641165161`"
              });
        const { permCheck } = require('../../functions.js')
        let perm = permCheck(message, false, 'giveawayreroll')
        if(perm === false) return message.channel.send('Not enough perms dummy');

        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("<:tick_no:746298075643117620> I don't have permission to perform this command! I need **MANAGE MESSAGES** permission to perform this command!");

        if(!args[0]) return message.channel.send(invalidEmbed);
        
        const giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === args.join(" ")) || client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        if (!giveaway) return message.channel.send({embed: {color:'#de2121', description:"<:tick_no:746298075643117620> Couldn't find a giveaway with that ID/name"}});

        client.giveawaysManager.reroll(giveaway.messageID)
        .catch((err) => {
            message.channel.send({embed: {color:'#de2121', description:err}});
        });
    }
};