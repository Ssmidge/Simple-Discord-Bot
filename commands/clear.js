const discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  if (!message.member.permissions.hasPermission("MANAGE_MESSAGES")) {
    message.reply("Sorry, you don't have permissions to use this!");
  } else {
    const deleteCount = parseInt(args[0], 10);

    if (!deleteCount || deleteCount < 0 || deleteCount > 100)
      return message.reply(
        "Please provide a number between 2 and 100 for the number of messages to delete"
      );

    const fetched = await message.channel.fetchMessages({ limit: deleteCount });

    i = 1;
    const msggtodel = deleteCount + i;
    console.log(msggtodel + " Messages where deleted!");
    message.channel
      .bulkDelete(msggtodel)
      .catch((error) =>
        message.reply(`Couldn't delete messages because of: ${error}`)
      );
  }
};

module.exports.help = {
  name: "clear",
};
