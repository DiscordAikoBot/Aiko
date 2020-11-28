const { MessageEmbed } = require("discord.js");
const mc = require('mc-stats')
const mcapi = require('mojang-api')
let date = new Date();
date.setMonth(0);
const { spec } = require("../../colours.json")

module.exports = {
    config: {
        name: "swstats",
        usage: "(command)",
        category: "miscellaneous",
        description: "Displays all commands that the bot has.",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {

      let username = args[0]
      if(!username) return message.channel.send("Please provide a valid username!")

      let stats = mc.hypixelPlayer(username, process.env.HYPIXEL).then(result => {

        if (result.errors) return message.channel.send('User is invalid or has never joined the server. If you believe this is a mistake try running the command again.');

        let embed = new MessageEmbed()
        .setTitle(`${username}'s Skywars Stats!`)
        .setColor(spec)
        .setDescription(`Kills: ${result.statistics.skywars.kills} \nWins: ${result.statistics.skywars.wins} \nCoins: ${result.statistics.skywars.coins} \nTokens: ${result.statistics.skywars.tokens} \nExperience: ${result.statistics.skywars.experience} \nSouls: ${result.statistics.skywars.souls} \nSoul-Well Uses: ${result.statistics.skywars.soul_well_uses} \nSouls gathered: ${result.statistics.skywars.souls_gathered} \nSouls payed: ${result.statistics.skywars.souls_payed} \nLegendary souls found: ${result.statistics.skywars.souls_found_legendary} \nRare souls found: ${result.statistics.skywars.souls_found_rare} \nWinstreak: ${result.statistics.skywars.winstreak} \nHighest winstreak: ${result.statistics.skywars.highest_winstreak} \nLosses: ${result.statistics.skywars.losses} \nGames played: ${result.statistics.skywars.games_played} \nVoid kills: ${result.statistics.skywars.void_kills} \nMelee kills: ${result.statistics.skywars.meelee_kills} \nMost kills in a single game: ${result.statistics.skywars.most_kills} \nAssists: ${result.statistics.skywars.assists} \nHighest killstreak: ${result.statistics.skywars.highest_killstreak} \nDeaths: ${result.statistics.skywars.deaths} \nPlayers survived: ${result.statistics.skywars.players_survived} \nQuits: ${result.statistics.skywars.quits} \nLast gamemode played: ${result.statistics.skywars.last_gamemode}`)
        message.channel.send(embed)
    })
    }
}