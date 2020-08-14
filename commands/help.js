const discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  let embed = new discord.RichEmbed()
    .setTitle("Example! - Commands")
    .addField("Help", "Shows this.", true)
    .addField("Kick", "Kicks a specified member from the guild.", false)
    .addField("Ban", "Bans a specified member from the guild.", true)
    .addField("Purge", "Purges a number of messages.", false)
    .addField("Ping", "Shows the ping to the servers.", true)
    .addField("Clear", "Purges a number of messages.", false)
    .setFooter("Copyright Ssmidge Developement");
  message.channel.send(embed);
};

module.exports.help = {
  name: "help",
};
