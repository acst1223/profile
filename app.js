// dotenv
require('dotenv').config();
const { sendMail } = require('./mail');

// discord
// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, Partials} = require('discord.js');
const token = process.env.DISCORD_TOKEN;

// Create a new client instance
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessages,
    // GatewayIntentBits.MessageContent
  ], partials: [
      Partials.Channel,
      Partials.Message,
      Partials.User
  ] });

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
}

client.on(Events.InteractionCreate, async interaction => {
  // if (!interaction.isChatInputCommand()) return;
  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
    } else {
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  }
});

client.on(Events.MessageCreate, async message => {
  // if (message.guild) return;
  if (message.author.bot) return;
  try {
    await sendMail(process.env.TO_MAIL_ADDR);
    console.log(message.author.username);
  } catch (error) {
    console.error(error);
  }
  // console.log(message);
  /*
  try {
    await client.users.send(message.author.id, message.content);
  } catch (error) {
    console.error(error);
    console.log(message);
  }
   */
});

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token);


const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// middleware
const STATIC_DIRNAME = "public";
app.use(express.static(STATIC_DIRNAME));

app.get("/", (req, res) => {

  res.sendFile(`${__dirname}/${STATIC_DIRNAME}/index.html`);
});

app.get("/photo", (req, res) => {
  res.sendFile(`${__dirname}/${STATIC_DIRNAME}/photo.html`);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});