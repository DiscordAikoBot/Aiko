const { MessageEmbed } = require("discord.js");
const translate = require("@k3rn31p4nic/google-translate-api");

module.exports = {
    config: {
        name: "translate",
        aliases: ["tr"],
        usage: "translate <to: language> <word>",
        category: "miscellaneous",
        description: "Translate message from one language to other.",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        let language = args[0];
        let text = args.slice(1).join(" ");

        if (!language) return message.channel.send("Please specify a language to translate! Correct Syntax: ?translate <Language> <Text>. To view the language codes visit <http://www.mathguide.de/info/tools/languagecode.html>");
        if (language.length !== 2) return message.channel.send("Please specify a language that is over 2 characters! Example: en. To view the language codes visit <http://www.mathguide.de/info/tools/languagecode.html>");
        if (!text) return message.channel.send("Please specify a piece of text to translate! Correct Syntax: ?translate <Language> <Text>");
        
            const result = await translate(text, { to: language }).catch(err => {
              return;
            })
            if(!result) return message.channel.send("😔 The input language is not supported by us. Sorry for the inconvenience.")
            const embed = new MessageEmbed()
                .setColor("RANDOM")
                .setAuthor("Text Translated!")
                .setDescription(result.text)
                .setFooter("Aiko | Translate")
                .setTimestamp();
            return message.channel.send(embed);
    }
}