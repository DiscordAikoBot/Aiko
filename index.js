let dotenv = require('dotenv');
dotenv.config();


const { Client, Collection } = require('discord.js');
const bot = new Client({ partials: ['MESSAGE', 'REACTION']});

const keepAlive = require('./server.js');
keepAlive(bot);

['aliases', 'commands'].forEach(x => (bot[x] = new Collection()));
['console', 'command', 'event'].forEach(x => require(`./handlers/${x}`)(bot));


//bot.haspinged = new Discord.Collection();
//anti-spam and anti-spam-ping, please leave commented until I finish it - Caitlin-chan

bot.login(process.env.TOKEN);