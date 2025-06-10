const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'imnew',
  description: 'Sends the welcome embed for new members',
  async execute(message) {
    if (message.content.toLowerCase() !== '!imnew') return;

    // Create the embed
    const embed = new EmbedBuilder()
      .setTitle('New Members')
      .setDescription('• Make sure to verify in <#1376477770166702103> to get access to the rest of the server!\n• Losses on tips provided by Bookie Enterprises will be compensated for up to $500k, provided the sufficient information is provided and the circumstance is rational.')
      .setColor(0x1458f8)
      .setAuthor({ name: 'Bookie Enterprises - Important Information', iconURL: 'https://i.postimg.cc/PfzvMdPs/Bookie-Enterprises-Logo.png' });

    // Send embed to channel
    const sentMessage = await message.channel.send({ embeds: [embed] });

    // Check if user has the "Admin" role
    const isAdmin = message.member.roles.cache.some(role => role.name.toLowerCase() === 'admin');

    // If not admin, delete embed after 30 seconds
    if (!isAdmin) {
      setTimeout(() => {
        sentMessage.delete().catch(() => {
          // Ignore errors if message is already deleted
        });
      }, 30000);
    }
  },
};
