const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'myrules',
  description: 'Sends the server rules embed',
  async execute(message) {
    if (message.content.toLowerCase() !== '!myrules') return;

    // Create the embed
    const embed = new EmbedBuilder()
      .setTitle('Server Rules')
      .setDescription('These are the server rules. Please follow them!')
      .setColor(0xFF0000) // You can adjust the color as needed
      .setAuthor({ name: 'Bookie Enterprises - Rules', iconURL: 'https://i.postimg.cc/PfzvMdPs/Bookie-Enterprises-Logo.png' });

    // Send the embed
    const sentMessage = await message.channel.send({ embeds: [embed] });

    // Check if user has "Admin" role
    const isAdmin = message.member.roles.cache.some(role => role.name.toLowerCase() === 'admin');

    // Delete the message after 30s if not admin
    if (!isAdmin) {
      setTimeout(() => {
        sentMessage.delete().catch(() => {
          // Ignore errors (e.g., already deleted)
        });
      }, 30000);
    }
  },
};
