const discord = require("discord.js");
const config = require("./config.json");
const fs = require("fs");
const client = new discord.Client();
client.commands = new discord.Collection();
const cooldown = new Set();
const sleep = (waitTimeInMs) =>
  new Promise((resolve) => setTimeout(resolve, waitTimeInMs));

fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);

  var jsFiles = files.filter((f) => f.split(".").pop() === "js");

  if (jsFiles.length < -0) {
    console.log("Cant find files");
    return;
  }

  jsFiles.forEach((f, i) => {
    var fileGet = require(`./commands/${f}`);
    console.log(`Command ${f} loaded`);

    client.commands.set(fileGet.help.name, fileGet);
  });
});

function startup() {
  client.user.setStatus("dnd");
  console.log(
    `Bot has started, with ${client.channels.size} channels of ${client.guilds.size} guilds`
  );
}

client.on("ready", () => {
  startup();
});

client.on("guildCreate", (guild) => {
  client.user.setPresence({
    game: {
      name: `over ${client.guilds.size} servers`,
      type: "WATCHING",
    },
  });
});

client.on("guildDelete", (guild) => {
  client.user.setPresence({
    game: {
      name: `over ${client.guilds.size} servers`,
      type: "WATCHING",
    },
  });
});

client.on("guildMemberAdd", (member) => {
  console.log("User" + member.user.tag + "has joined the server!");

  var role = member.guild.roles.find("[-] Verified", "user");
  member.addRole("741687993114296441", "AutoRole");
});

client.on("guildMemberAdd", (member) => {
  console.log("User" + member.user.tag + "has joined the server!");

  var role = member.guild.roles.find("[-] Verified", "user");
  member.addRole("741773906490294392", "AutoRole");
});

client.on("guildMemberAdd", (member) => {
  console.log("User" + member.user.tag + "has joined the server!");

  var role = member.guild.roles.find("[-] Verified", "user");
  member.addRole("720846030098268262", "AutoRole");
});

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
});

client.on("message", async (message) => {
  if (
    message.content.startsWith(
      "6$(&*&566677sdf7dsufusdaufy7^&**(*&&^*()%^ujochxduhsfduhsfduighfduighfds6^&$%^*^$56$%^%&*^&%$%^&^%^%^%%%%^&%&^%&^%Uhuywhedyfdwg8yftyqw87fyt6qewrtqw4frygqw4yfrtw44tw44^&%^*$$%&*^$$^&%$^&$$&%^&^&%&&$$$$^%&$^%$&^%$^%$%^&$%^$^&$^$$&$^&%$%$%^$^$$$$#$#%#$##$#$#$#$^^#$#$#$####$#$%#$#%$#^$%#%##%#$#$$#%#$$#$#$%##$#$#$#$##%"
    )
  ) {
    return;
  }
  if (message.author.bot) return;

  if (message.channel.type === "dm") {
    if (message.content.startsWith("!")) {
      message.reply("DM commands are not Enabled!");
    }
    console.log(
      `New Dm!: "${message}" was sent by ${message.author.tag} with the id of ${message.author.id}`
    );
    return;
  }

  var prefix = config.prefix;

  if (!message.content.startsWith(prefix)) return;

  var messageArray = message.content.split(" ");

  var command = messageArray[0];

  var arguments = messageArray.slice(1);

  var commands = client.commands.get(command.slice(prefix.length));

  if (commands) commands.run(client, message, arguments);
});

client.login(config.token);
