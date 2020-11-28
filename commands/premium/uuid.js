const { MessageEmbed } = require("discord.js")
const { spec } = require("../../color.json")
const db = require('quick.db')

module.exports= {
    config: {
        name: "uuid",
        description: "Adds a role to a member of the guild!",
        usage: "(command)",
        category: "developer",
        accessableby: "Administrators",
        aliases: ["code", "premium"]
    },
    run: async (bot, message, args) => {
      const link = 'http://aiko.cf';
      const arguments2 = ["generate", "redeem", "help", "buy"];
      /*First Arg ISSUE [1]*/
      const invalidargs1embed = new MessageEmbed() /*if first arg dont include any listed*/
          .setColor('RED')
          .setTitle('Error')
          .addField('Issue', 'Invalid first argument provided.')
          .addField('Arguments', '`generate`, `redeem`, `buy`, `help`')
      /*Help*/
      const helpembed = new MessageEmbed() /*arg 1 is help*/
          .setColor('BLUE')
          .setTitle('Aiko Premium - Help')
          .addField('What is Aiko Premium?', 'Aiko Premium is a feature added by the Aiko Development Team, to help fund the project. Aiko Premium will get you heaps of awesome features, for only `$3.99USD/Month`.')
          .addField('How can I buy Aiko Premium?', 'If you would like to buy Aiko Premium, you can use the command `?premium buy`. *will be added at a later date, once fruits & typhoon are done with paypal.*')
          .addField('How do I redeem Aiko Premium?', 'To redeem Aiko Premium, you will need to enter your email, so that Aiko can send you a UUID. Be careful though, as each UUID only has **one** use.', '\u200b')
          .addField('Aiko Premium - Commands', '`redeem`, `buy`, `generate`, `help`, `buy`', '\u200b')
          
          .addField('ㅤ', 'For more information on Aiko Premium, visit our website [Here](' + link + ')')
      /*Second Arg ISSUE [1]*/
      const noarg2generateembed = new MessageEmbed()
          .setColor('RED')
          .setTitle('Error')
          .addField('Issue', 'No second argument provided.')
          .addField('Arguments', '`(userid)`')
      /*First Arg ISSUE [2]*/
      const argumentembed = new MessageEmbed() /*first arg*/
          .setColor('RED')
          .setTitle('Error')
          .addField('Issue', 'No first argument provided.\nㅤ')
          .addField('Arguments', '`generate`, `redeem`, `help`\nㅤ')
          .addField('Examples', '`?premium generate`\n`?premium redeem (token)`\n`?premium help`')
      /*Second Arg ISSUE [2]*/
      const argumentembed2 = new MessageEmbed() /*second arg*/
          .setColor('RED')
          .setTitle('Error')
          .addField('Issue', 'No second argument provided.\nㅤ')
          .addField('Arguments', '`(userid)`, `(token)`\nㅤ')
          .addField('Examples', '`?premium generate`\n`?premium redeem (token)`')
      /*Buy*/
      const buyembed = new MessageEmbed()
          .setColor('BLUE')
          .setTitle('Aiko Premium - Buy')
          .addField('How do I buy Aiko Premium?', 'Go to the [Aiko Support Server](https://discord.gg/RHv9r8JSZx), and use the `?redeem (email)` command. Now, go to [This Link](https://aiko.cf), and pay `$3.99USD`. Once done, wait paitently for an email by Aiko.')
          .addField('Is this a scam?', 'No, Aiko Premium is completely safe. Your email and/or DM could take up to 3 hours to come through. Please be patient.\n**NOTE: IF YOU DONT HAVE AN EMAIL LINKED YOU WILL BE DMED BY THE BOT WITH YOUR UUID.**')

      const user = message.mentions.members.first()
      const developers = ["774340378933067806", "588236633535676416", "563980783828860944", "511923439725182987", "455046083953950731", "417513231293087744", "255327008576241674", "738000272730619933"];
       
            if (!developers.includes(message.author.id)) {
              return;
            } else {


              
              if(!args[0]) {
                return message.channel.send(argumentembed);
              } else {
                /*Help Argument*/
                if(args[0] == 'help') {
                  return message.channel.send(helpembed)
                } else {
                  /*Buy Argument*/
                  if(args[0] == 'buy') {
                    return message.channel.send(buyembed)
                  } else if(!args[1]) {
                    if (!arguments2.includes(args[0])) {
                      return message.channel.send(invalidargs1embed)
                    /*Redeem Argument*/


                    
                  /*} else if(args[0] === 'redeem') {
                    adding this shii later :)
                    }*/



                  } else {
                    /*Generate Argument*/
                    if(args[0] == 'generate') {
                      /*UUID Generator*/
                      function uuidgen() {
                        return 'xxxxxx-xxxxxx-xxxxxx-xxxxxx-xxxxxx'.replace(/[xy]/g, function(c) {
                          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                          return v.toString(16);
                          /*Check UUID*/
                          let uuidcheck = uuidgen()
                          if(uuidcheck = 'true') {
                            return;
                          } else {
                            uuidcheck = 'true';
                              function uuidgen() {
                                return 'xxxxxx-xxxxxx-xxxxxx-xxxxxx-xxxxxx'.replace(/[xy]/g, function(c) {
                                  var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                                    return v.toString(16);
                                })
                              }
                          }
                        })
                      }

                      let st = uuidgen()
                      
                      const uuid = new MessageEmbed()
                          .setColor('BLUE')
                          .setTitle('UUID')
                          .setDescription(st)
                      message.channel.send(uuid)

                      /*Automail*/
                      const { mail } = require('../../functions.js')
                      
                      mail(st)
                    }
                    }
                  }
                }
              }
      }
  }
}