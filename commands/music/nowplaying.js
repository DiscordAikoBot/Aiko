const { MessageEmbed } = require("discord.js")
const { stripIndents } = require("common-tags")
const ms = require('ms')

module.exports = { 
    config: {
        name: "nowplaying",
        aliases: ["np", "now"],
        description: "Displays what the bot is currently playing.",
        accessableby: "Member",
        category: "music",
    },
    run: async (bot, message, args) => {
       const { channel } = message.member.voice;

        const player = bot.music.players.get(message.guild.id);
        
        if(!player) return message.channel.send("No song/s currently playing in this guild.");
        if (!channel) return message.channel.send("You need to be in a voice channel to use the leave command.");
        const { title, author, duration, thumbnail } = player.queue.current;

        console.log(player.queue.current)

        const embed = new MessageEmbed()
            .setAuthor("Current Song Playing.", message.author.displayAvatarURL)
            .setThumbnail(thumbnail)
            .setDescription(stripIndents`
            ${player.playing ? "▶️" : "⏸️"} **${title}** \`${ms(duration)}\` by ${author}
            `);

        return message.channel.send(embed);
    }
}