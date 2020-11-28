const db = require('quick.db');
const events = [
  "You find an abandoned building, the paint peeling on the outside walls. The door is open a crack, what will you do? \n`?rpg look-inside` `?rpg run-away`"
  ,
  "You decide to look inside. Approaching the door you start to hear wind coming from inside. Once you walk in, you're hit with a cold blast of air, and a light switch is next to you. The first light switch is on, the second one is off. \n`?rpg turn-off-1` `?rpg turn-on-2`"
  ,
  "You decide to run away, but you start to hear something run after you. You run faster, not knowing what to do. You see an open sewer hole on one side of the road, and a running, empty car on the other. \n`?rpg steal-car` `?rpg hop-in-sewer`"
  ,
  "You decide to turn off the first light switch. The fan turns off and the cold air stops blowing. Slowly the frosty air starts to clear."
]

const choices = [
  'start'
  ,
  'look-inside'
  ,
  'run-away'
  ,
  'turn-off-1'
  ,
  'turn-on-2'
  ,
  'steal-car'
  ,
  'hop-in-sewer'
]
module.exports = { 
    config: {
        name: "r",  //command name
        //aliases: ["", ""], // other command names if you dont need delete this line
        description: "rpg game", // Description of cmd
        accessableby: "Member", // accessed by who
        category: "rpg", // what category is it under

    },
    run: async (bot, message, args) => {
      command = args[0];
      for (index = 0; index < choices.length; index++) {
        switch (command) {
          case choices[index]:
              await message.channel.send(events[index]);
            break;
        }
      }
    }
}


/*
const prefix = '?rpg ';
var tmsg = null;
const Database = require('@replit/database');

const servermembers = new Database();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setActivity('?rpg help');
});

client.on('message', async function(message) {
	if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot)
		return;
	const args = message.content
		.slice(prefix.length)
		.trim()
		.split(' ');
	const command = args.shift().toLowerCase();
	targs = args.join(' ');
  let checkblacklist = await servermembers.get(`blacklisted-${message.guild.id}`);
  if (checkblacklist === "true") return;
	let member = new Discord.GuildMember(message);
  for (index = 0; index < choices.length; index++) {
    switch (command) {
      case choices[index]:
        await message.channel.send(events[index]);
        fs.appendFile('logs.txt', `\n [Guild.${message.guild.id}] ${command} <${targs}>`, function (err) {
          if (err) throw err;
          console.log('Updated!');
        });
        break;
    }
  } 
});
*/
/*let cgus = args[0];
      message.channel.send("You find a tower, and you want to get to the top. What do you want to do? `?ttt climb` or `?ttt stairs` ( Use ?ttt <option> )");
      if (!args[0]) return message.channel.send("You find a tower, and you want to get to the top. What do you want to do? `?climbgear` or `?usestairs` ( Use ?ttt <option> )");
      if (args[0] !== "stairs") return message.channel.send("Please provide a valid option to get to the top of the tower!");
      if (args[0] !== "climb") return message.channel.send("Please provide a valid option to get to the top of the tower!");
      */