require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
  ],
  partials: ['CHANNEL']
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('guildMemberAdd', member => {
  const importantInfoChannelId = '1377545637868077107'; // Important Info channel ID
  const verifyChannelId = '1376477770166702103';       // Verify channel ID

  const welcomeMessage = `👋 Welcome to **Bookie Enterprises**!

Check out <#${importantInfoChannelId}> for important information, and make sure to verify in <#${verifyChannelId}> to gain access to the rest of the server.

🎉 Enjoy your stay!`;

  member.send(welcomeMessage).catch(err => {
    console.log(`❌ Could not DM ${member.user.tag}. They might have DMs off.`);
  });
});


client.on('messageCreate', message => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === '!myrules') {
    const embed = new EmbedBuilder()
      .setTitle('Rules')
      .setDescription('• No spamming\n• No mature content\n• No leaking Premium Bookie tips (If you are suspected, investigations will follow and your Premium Bookie account may be suspended)')
      .setColor(0x1458f8) // 1333704 in hex
      .setAuthor({ name: 'Bookie Enterprises - Important Information', iconURL: 'https://i.postimg.cc/PfzvMdPs/Bookie-Enterprises-Logo.png' })
      .setFooter({ text: 'Rules are subject to change at any time' });

    message.channel.send({ embeds: [embed] });
  }

  if (message.content.toLowerCase() === '!verifying') {
    const embed = new EmbedBuilder()
      .setTitle('Verifying')
      .setDescription('Use `/v` in this channel to verify your account and gain access to the rest of the server if you haven\'t already been verified!')
      .setColor(0x1458f8)
      .setAuthor({ name: 'Bookie Enterprises - Important Information', iconURL: 'https://i.postimg.cc/PfzvMdPs/Bookie-Enterprises-Logo.png' });

    message.channel.send({ embeds: [embed] });
  }
});

client.commands = new Map();

// Load all command files from 'commands' folder
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// Message event handler
client.on('messageCreate', message => {
  if (!message.content.startsWith('!') || message.author.bot) return;

  const args = message.content.slice(1).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);
  if (command) {
    command.execute(message, args);
  }
});

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Bot is online');
});

app.listen(3000, () => {
  console.log('Uptime server is running on port 3000');
});

client.login(process.env.TOKEN);
