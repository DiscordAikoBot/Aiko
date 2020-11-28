const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const { red_light, green_light } = require('../../colours.json');
const { shuffle } = require("../../functions.js");
const randomWords = require('random-words');
const ms = require('parse-ms');

const timedefault = 60 * 60 * 500;

module.exports = {
  config: {
    name: 'work',
    usage: '(command)',
    category: 'economy',
    description: 'Shows Your Balance',
    accessableby: 'Members'
  },
  run: async (bot, message, args) => {
    
    const economy = new db.table('economy')
    if (!economy.has(`balance.${message.guild.id}`)) economy.set(`balance.${message.guild.id}`, {});

    const lastWorked = economy.get(`work.${message.guild.id}.${message.author.id}`);
    const levels = new db.table('level')

    let timeout = timedefault / levels.get(`rank.${message.guild.id}.${message.author.id}`) 

    if (lastWorked && Date.now() - lastWorked < timeout) {
      const time = ms(timeout - (Date.now() - lastWorked));
  
      const timeEmbed = new MessageEmbed()
        .setColor(red_light)
        .setDescription(`:x: You've already worked recently\n\nWork again in ${time.minutes}m ${time.seconds}s`);
        
      return message.channel.send(timeEmbed);
    }

    let word = randomWords()
    console.log(word)
    let shuffled = shuffle(word.split(''))
    let joinedShuffled = shuffled.join('')

    message.channel.send(`Task: Unscramble the word: ${joinedShuffled}`)

    const filter = m => m.author.id === message.author.id;
    const collector = message.channel.createMessageCollector(filter, { max: 1, time: 15000 });
    
    collector.on('collect', m => {
        let answerLower = m.content.toLowerCase()
      if(answerLower == word) {
        
        economy.set(`work.${message.guild.id}.${message.author.id}`, Date.now());
        economy.add(`${message.guild.id}.${message.author.id}.work.amount`, 1)
          
          let levels = new db.table('level')
          
          let ranksend = levels.get(`rank.${message.guild.id}.${message.author.id}`)
          let rankfinal = ranksend / 5

          if(economy.get(`${message.guild.id}.${message.author.id}.work.amount`) <= 1) {
            economy.set(`${message.guild.id}.${message.author.id}.work.amount`, 1)
          }
        
        let amount = economy.get(`${message.guild.id}.${message.author.id}.work.amount`) * 250
        amount = amount * rankfinal
        if(amount < 0) { amount = 0 }
        console.log(amount)
        economy.add(`balance.${message.guild.id}.${message.author.id}`, amount);

        let embed = new MessageEmbed()
        .setColor(green_light)
        .setTitle('Success')
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .setDescription(`Your boss is proud of you and gave you ${amount} dollars!`)
        message.channel.send(embed);
      } else {
          economy.subtract(`${message.guild.id}.${message.author.id}.work.amount`, 1)
          if(economy.get(`${message.guild.id}.${message.author.id}.work.amount`) <= 1) {
            economy.set(`${message.guild.id}.${message.author.id}.work.amount`, 1)
          }
          economy.set(`work.${message.guild.id}.${message.author.id}`, Date.now());
          let badpay = economy.get(`${message.guild.id}.${message.author.id}.work.amount`) * 250 / 5
          if(badpay < 0) { badpay = 0 }
          let failEmbed = new MessageEmbed()
          .setColor(red_light)
          .setAuthor(bot.user.username, bot.user.displayAvatarURL())
          .setDescription(`Your boss is mad at you and gave you ${badpay} dollars!`)
          message.channel.send(failEmbed);
          return;
      }
      });
    
    collector.on('end', collected => {
      if(!collected.size > 0) {
        message.channel.send(`You Have ran out of time the word was ${word}`);
        economy.subtract(`${message.guild.id}.${message.author.id}.work.amount`, 1)
        economy.set(`work.${message.guild.id}.${message.author.id}`, Date.now());
        if(economy.get(`${message.guild.id}.${message.author.id}.work.amount`) <= 1) {
            economy.set(`${message.guild.id}.${message.author.id}.work.amount`, 1)
          }
        return;
      }
      
    })

  }
}


