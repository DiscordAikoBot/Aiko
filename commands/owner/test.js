const doc = require('authy-verify');
const { MessageEmbed } = require('discord.js')
const aiko = require('aiko-premium')


module.exports = {
    config: {
        name: "test",
        description: "shuts down the bot!",
        usage: "!shutdown",
        accessableby: "Bot Owner"
    },
    run: async (bot, message, args) => {
    const creatorIDs = ["774340378933067806", "455046083953950731", "738000272730619933"];
    let terms = 'https://discord.com/terms'
    let guidelines = 'https://discord.com/guidelines'    
            if (!creatorIDs.includes(message.author.id)) {
              return;
            } else {
              message.delete()
              const rules = new MessageEmbed()
                .setColor('fffffe')
                .setTitle('Aiko Support - Rules & Regulations')
                .addField('General Rules', [
                  '\u200b',
                  `**Spamming**`,
                  'Please try to avoid spamming, as it makes the server harder to moderate, and can also be very annoying.',
                  '\u200b',
                  `**Revealing Personal Information**`,
                  'If you get caught sharing personal information (IP\'s, Addresses, Emails, Credit Cards, etc) you will be banned instantly.',
                  '\u200b',
                  `**Respect**`,
                  'Please treat all other members of this server with respect.',
                  '\u200b',
                  `**Bypassing Blacklisted Words**`,
                  'Please avoid bypassing the chat filter. If you\'re caught doing this, you will be punished.',
                  '\u200b',
                  `**NSFW**`,
                  'NSFW and/or gore will not be tolerated whatsoever.',
                  '\u200b',
                  `**Advertisement**`,
                  'Please refrain from advertising.',
                  '\u200b',
                  `**Threats**`,
                  'Any threats will not be tolerated whatsoever.',
                  '\u200b',
                  `**Discrimination & Slurs**`,
                  'Slurs and/or racism will not be tolerated whatsover. If you do this, you will be punished.',
                  '\u200b'
                ])
              .addField('Voice Chat Rules', [
                '\u200b',
                `**Earrape**`,
                'Earrape will not be tolerated whatsoever. If you are caught doing this, you will be muted from Voice Channels.',
                '\u200b',
                `**Voice Changers**`,
                'Voice Changers are only allowed if everyone else in the Voice Channel are alright with it.',
                '\u200b',
                `**Blasting Music**`,
                'Blasting Music is not allowed. If you do this, you will be blocked from using our Music Commands.',
                '\u200b'
              ])
              .addField('Additional Rules', [
                '\u200b',
                `**-** Make sure to follow the [Discord TOS](${terms}).`,
                `**-** Make sure to follow the [Discord Guidelines](${guidelines}).`
            ])
            return message.channel.send(rules)
            }
    }
}