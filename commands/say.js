const discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    if (!message.member.permissions.hasPermission("MANAGE_MESSAGES")) {
        message.reply("Sorry, you don't have permissions to use this!");
    } else {
        const sayMessage = args.join(" ");
        message.delete().catch((O_o) => { });
        message.channel.send(sayMessage);
    }
}

module.exports.help = {
    name: "say",
};



