const { MessageEmbed } = require("discord.js")
const { spec } = require("../../color.json")
const db = require('quick.db')
const { cmds } = require('../../lang.js')

module.exports= {
    config: {
        name: "cmdcreate",
        description: "Adds a role to a member of the guild!",
        usage: "(command)",
        category: "developer",
        accessableby: "Administrators",
        aliases: ["code", "premium"]
    },
    run: async (bot, message, args) => {

      const developers = ["774340378933067806", "588236633535676416", "563980783828860944", "511923439725182987", "455046083953950731", "417513231293087744", "255327008576241674", "738000272730619933"];
       
            if (!developers.includes(message.author.id)) return;

            cmds()


    }
}