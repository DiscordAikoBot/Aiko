const Discord = require("discord.js");

module.exports = {
  config: {
    name: "delete-giveaway",
    category: "giveaway",
    aliases: ["delgiveaway", "delgive"],
    description: "Delete a running giveaway with the giveaway message ID",
    usage: "delete-giveaway <giveaway message ID>"
    },
    run: async (client, message, args) => {

      
        const invalidEmbed = new Discord.MessageEmbed()
              .setAuthor("Delete Giveaway Command", client.user.displayAvatarURL({
                  format: "png",
                  dynamic: true,
                  size: 2048
              }))
              .setColor("#eb0936")
              .setTitle("Invalid Arguments")
              .addFields({
                  name: "USAGE",
                  value: "```delete-giveaway <giveaway message ID>```"
              }, {
                  name: "EXAMPLES",
                  value: "`delete-giveaway 1555462135165`"
              });

        const { permCheck } = require('../../functions.js')
        let perm = permCheck(message, false, 'giveawaydelete')
        if(perm === false) return message.channel.send('Not enough perms dummy');

        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("<:tick_no:746298075643117620> I don't have permission to perform this command! I need **MANAGE MESSAGES** permission to perform this command!");

        if(!args[0]) return message.channel.send(invalidEmbed);
        

        client.giveawaysManager.delete(args[0]).then(() => {
            message.channel.send("Success! Giveaway deleted!");
        }).catch((err) => {
            message.channel.send({embed: {color:'#de2121', description:`<:tick_no:746298075643117620> No giveaway found for ${args[0]}, please check and try again`}});
        });
    }
};