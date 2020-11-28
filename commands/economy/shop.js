const { MessageEmbed } = require('discord.js');

//Messages

const shopUI1 = new MessageEmbed() //main Shop/arg0 isnt provided
    .setColor('GREEN')
    .setAuthor('Select A Category.')
    .addField('Perks', 'cash increasements to beg, working, and hobbies.', true)
    .addField('Bank', 'Increase bank storage.', true)
    .addField('Workers', 'Level up and buy workers.', true)
    .addField('Misc', 'Miscellaneous Items.', true)

const shopUI2 = new MessageEmbed() //Perks Shop/arg0 is "perks"
    .setColor('GREEN')
    .setAuthor('Perks')
    .addField('Credit Card ($20,000)', 'pay increases by 10% forever.')
    .addField('PayDay ($25,000)', 'pay increases by 20% for 1 day.')

const shopUI3 = new MessageEmbed() //Bank Shop/arg0 is "bank"
    .setColor('GREEN')
    .setAuthor('Bank')
    .addField('Add $1,000 ($1,500)', 'adds $1,000 to your bank size.')
    .addField('Add $10,000 ($10,500)', 'adds $10,000 to your bank size.')
    .addField('Add $100,000 ($100,500)', 'adds $100,000 to your bank size.')

const shopUI4 = new MessageEmbed() //Workers Shop/arg0 is "workers"
    .setColor('GREEN')
    .setAuthor('Workers')
    .addField('Buy Worker ($10,000)', 'buys 1 worker')
    .addField('Level Up Worker ($100,000)', 'levels up your worker.')

const shopUI5 = new MessageEmbed() //Misc Shop/arg0 is "misc"
    .setColor('GREEN')
    .setAuthor('Miscellaneous')
    .addField('Fishing Rod ($10,000)', 'lets you go fishing.')
    .addField('Drill ($100,000)', 'lets you rob a bank. 3 uses.')

module.exports = { 
    config: {
        name: "shop",
        description: "Shop UI To Buy Stuff",
        usage: "(category)",
        category: "miscellaneous",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
      
	    if (!args.length) {
		        message.channel.send(shopUI1);
	    }
	    else if(args[0] === 'perks') {
	    	return message.channel.send(shopUI2);
      }
      else if(args[0] === 'bank') {
        return message.channel.send(shopUI3);
      }
      else if(args[0] === 'workers') {
        return message.channel.send(shopUI4);
      }
      else if(args[0] === 'misc' || 'miscellaneous') {
        return message.channel.send(shopUI5);     
      }
    }
}
