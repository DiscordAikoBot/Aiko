module.exports = {
    config: {
        name: "reload",
        description: "reloads a bot command!",
        usage: "!reload",
        accessableby: "Bot Owner",
        aliases: ["creload"]
    },
    run: async (bot, message, args) => {
    const creatorIDs = ["255327008576241674", "455046083953950731", "738000272730619933"];
       
            if (!creatorIDs.includes(message.author.id)) {
              return message.channel.send('You are not the owner of the bot').then(m => m.delete(5000));
            }


    if(!args[0]) return message.channel.send("Please provide a command to reload!")

    const file = args[0]
    if(!file) return message.channel.send("Please pass a file.");

    const cmd = args.slice(1).join(" ").toLowerCase()
    if(!cmd) return message.channel.send("Please pass a command you want to restart.");

    const command = message.client.commands.get(cmd)
	                  || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmd));
    if (!command) return message.channel.send(`There is no command with name or alias \`${cmd}\``)
    
    delete require.cache[require.resolve(`../../commands/${file}/${cmd}.js`)];
            client.commands.delete(args[1]);
            const pull = require(`../../commands/${file}/${cmd}.js`)
            client.commands.set(cmd, pull)

    message.channel.send(`Command \`${command.name}\` was reloaded!`);
    }
}