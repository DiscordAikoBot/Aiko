const Discord = require('discord.js')


module.exports = {
    config: {
        name: "ticket-help",
        description: "Get the ticket commands available",
        usage: "ticket-help",
        category: "ticket",
        accessableby: "",
        aliases: ["th"]
    },
    run: async (bot, message, args) => {


    let embed = new Discord.MessageEmbed()
    .setTitle("Support Tickets Help")
    .addField("Creating a Ticket [Alias: cr]", "`?create`")
    .addField("Closing a Ticket [Alias: cl]", "`?close [reason]`")
    .addField("Adding a User To The Ticket [Alias: a]", "`?add [usermention]`")
    .addField("Removing a User From The Ticket [Alias: r]", "`?remove [usermention]`")
    .addField("Last Ticket Information [Alias: it]", "`?last`")
    .addField("ADMIN | Rename a Ticket [Alias: rn]", "`?rename [name]`")
    .addField("ADMIN | Timing Out a Ticket [Alias: to]", "`?timeout`")
    .addField("ADMIN | Setting Up Ticket Topics [Alias: s]", "`?set [1 - 5] [Topic]`")
    .addField("ADMIN | Setting Up The Server [Alias: su]", "`?setup-ticket`")
    .setColor("#e64b0e")
    message.channel.send(embed)

    }
}