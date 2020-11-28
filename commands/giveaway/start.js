const ms = require ("ms");
const Discord = require("discord.js");
const db = require('quick.db');

module.exports = {
  config: {
    name: "giveaway",
    category: "Giveaway",
    description: "Starts a giveaway",
    usage: "giveaway <channel mention> <time> <number of winners> <prize> "
  },
    run: async (client, message, args) => {

          const invalidEmbed = new Discord.MessageEmbed()
              .setAuthor("Giveaway Command", client.user.displayAvatarURL({
                  format: "png",
                  dynamic: true,
                  size: 2048
              }))
              .setColor("#eb0936")
              .setTitle("Invalid Arguments")
              .addFields({
                  name: "USAGE",
                  value: "```giveaway <channel mention> <time> <number of winners> <prize>```"
              }, {
                  name: "EXAMPLES",
                  value: "`giveaway #giveaways 1hr 1 NINTENDO SWITCH`\n`giveaway #public-chat 50d 5 DISCORD NITRO`"
              });

        const { permCheck } = require('../../functions.js')
        let perm = permCheck(message, false, 'giveawaystart')
        if(perm === false) return message.channel.send('Not enough perms dummy');

        if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("<:tick_no:746298075643117620> I don't have permission to perform this command! I need **MANAGE MESSAGES** permission to perform this command!");

        const giveawayChannels = message.mentions.channels.first();
        

        if (!args[0]) return message.channel.send(invalidEmbed);
        
        if(!giveawayChannels) {
          giveawayDuration = args[0];
          giveawayWinners = args[1];
          giveawayPrize = args.slice(2).join(" ");
          giveawayChannel = message.channel;
        } else {
          giveawayDuration = args[1];
          giveawayWinners = args[2];
          giveawayPrize = args.slice(3).join(" ");
          giveawayChannel = giveawayChannels;
        }

        if (!giveawayDuration || isNaN(ms(giveawayDuration))) return message.channel.send({embed: {color:'#de2121', description:"<:tick_no:746298075643117620> Pleae provide a valid duration. Example - 10d, 5h, 6m, 2s\nUnits - day, hours, minutes, seconds, d, hr, mins, sec"}});

        if (!giveawayPrize) return message.channel.send({embed: {color:'#de2121', description:"<:tick_no:746298075643117620> Please provide a prize you are giving in the giveaway."}});

        const mentions = message.mentions;
        if (/<@&?!?\d{18}>|@everyone|@here/g.test(message.content)) return message.channel.send({embed: {color:'#de2121', description:"<:tick_no:746298075643117620> Don't think about abusing commands by adding `@everyone`."}});

        if (isNaN(giveawayWinners) || parseInt(giveawayWinners) < 1) return message.channel.send({embed: {color:'#de2121', description:"<:tick_no:746298075643117620> Please provide a valid number of winners!"}});

        const giveaway = client.giveawaysManager.start(giveawayChannel, {
            time: ms(giveawayDuration),
            prize: giveawayPrize,
            winnerCount: giveawayWinners,
            hostedBy: message.author,
            messages: {
                giveaway: "<:rilpyay:768684868124540948>  **GIVEAWAY** <:rilpyay:768684868124540948> ",
                giveawayEnded: "<:rilpyay:768684868124540948>   **GIVEAWAY ENDED**  <:rilpyay:768684868124540948> ",
                timeRemaining: "Time remaining: **{duration}**",
                inviteToParticipate: "React with <:rilpyay:768684868124540948> to enter",
                winMessage: "Congrats {winners}, you won **{prize}**",
                embedFooter: "Giveaway time!",
                noWinner: "🙁**NO ONE PARTICIPATED IN THE GIVEAWAY.**",
                hostedBy: "Hosted by {user}",
                winners: "Winner(s)",
                endedAt: "Ends at",
                units: {
                    seconds: "seconds"||"sec",
                    minutes: "minutes"||"mins",
                    hours: "hours"||"hr",
                    days: "days"||"d",
                    pluralS: false
                }
            }
        });

        message.channel.send(`Giveaway starting in ${giveawayChannel}`);
    }
};