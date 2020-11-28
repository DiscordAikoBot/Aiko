const { MessageEmbed } = require("discord.js")
const { cyan } = require("../../colours.json");
const { get } = require("https");

module.exports = { 
    config: {
        name: "nekolewd",
        description: "Lewd for yall horny weebs",
        usage: "",
        category: "miscellaneous",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
    
          get(`https://neko-love.xyz/api/v1/nekolewd`, (res) => {
          const { statusCode } = res;
          if (statusCode != 200) {
              res.resume;
          }
          res.setEncoding("utf8");
          let rawData = '';
          res.on("data", (chunk) => {
              rawData += chunk;
          });
          res.on("end", () => {
              try {
                  const parsedData = JSON.parse(rawData);
                  const data = parsedData.url

                  let sembed = new MessageEmbed()
                      .setColor(cyan)
                      .setAuthor(`thanks to Typhoon and dark for making Horny weebs days`, message.guild.iconURL)
                      .setImage(data)
                      .setTimestamp()
                      .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL)
                  if (message.channel.nsfw) {

                    message.channel.send(sembed)
                  } else {
                    message.channel.send("Use this command in NSFW Channel!")
                  }
              } catch (e) {
                  console.error(e.message);
              }
          });
      }).on("error", (err) => {
          console.error(err.message);
      });

    
    }
}