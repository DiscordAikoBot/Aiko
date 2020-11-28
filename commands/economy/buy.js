const { MessageEmbed } = require('discord.js');
//Messages

const shopUI1 = new MessageEmbed() //if you have enough money to buy
    .setColor('GREEN')
    .setAuthor('Success')
    .setDescription(`You've successfully bought for`)

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
