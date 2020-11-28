const Discord = require("discord.js");

module.exports = {
    config: {
        name: "slist",
        description: "Shows the server list the bot is in",
        usage: "slist",
        accessableby: "Bot Owner",
        aliases: ["botstop"]
    },
    run: async (bot, message, args) => {

let i0 = 0;
		    let i1 = 10;
		    let page = 1;

        let description =
        `Total Servers - ${bot.guilds.cache.size}\n\n` +
        bot.guilds.cache
        .sort((a, b) => b.memberCount - a.memberCount)
        .map(r => r)
        .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}`)
        .slice(0, 10)
        .join('\n');

		const embed = new Discord.MessageEmbed()
			.setAuthor(
				message.author.tag,
				message.author.displayAvatarURL({ dynamic: true }),
			)
			.setColor('BLUE')
			.setFooter(bot.user.username)
			.setTitle(`Page - ${page}/${Math.ceil(bot.guilds.cache.size / 10)}`)
			.setDescription(description);

		const msg = await message.channel.send(embed);

		await msg.react('⬅');
		await msg.react('➡');
		await msg.react('❌');

		const collector = msg.createReactionCollector(
			(reaction, user) => user.id === message.author.id,
		);

		collector.on('collect', async (reaction, user) => {
			if (reaction._emoji.name === '⬅') {
			// Updates variables
				i0 = i0 - 10;
				i1 = i1 - 10;
				page = page - 1;

				// if there is no guild to display, delete the message
				

				description =
 `Total Servers - ${bot.guilds.cache.size}\n\n` +
 bot.guilds.cache
 	.sort((a, b) => b.memberCount - a.memberCount)
 	.map(r => r)
 	.map(
 		(r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}`,
 	)
 	.slice(i0, i1)
 	.join('\n');

				embed
					.setTitle(
						`Page - ${page}/${Math.round(bot.guilds.cache.size / 10 + 1)}`,
					)
					.setDescription(description);

				msg.edit(embed);
			}

			if (reaction._emoji.name === '➡') {
			// Updates variables
				i0 = i0 + 10;
				i1 = i1 + 10;
				page = page + 1;

				// if there is no guild to display, delete the message
				

				description =
`Total Servers - ${bot.guilds.cache.size}\n\n` +
bot.guilds.cache
	.sort((a, b) => b.memberCount - a.memberCount)
	.map(r => r)
	.map(
		(r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}`,
	)
	.slice(i0, i1)
	.join('\n');

				embed
					.setTitle(
						`Page - ${page}/${Math.round(bot.guilds.cache.size / 10 + 1)}`,
					)
					.setDescription(description);

				// Edit the message
				msg.edit(embed);
			}

			if (reaction._emoji.name === '❌') {
				return msg.delete();
			}

			// Remove the reaction when the user react to the message
			await reaction.users.remove(message.author.id);
		});
    }
}