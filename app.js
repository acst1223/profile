// dotenv
require('dotenv').config();

// discord
// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
const token = process.env.DISCORD_TOKEN;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

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