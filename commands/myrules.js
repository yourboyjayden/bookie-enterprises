const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'myrules',
  execute: async (message) => {
    const embed = new EmbedBuilder()
      .setTitle('Rules')
      .setDescription(
        '• No spamming\n' +
        '• No mature content\n' +
        '• No leaking Premium Bookie tips (If you are suspected, investigations will follow and your Premium Bookie account may be suspended)'
      )
      .setColor(0x1458f8) // 1333704 in hex
      .setAuthor({ name: 'Bookie Enterprises - Important Information', iconURL: 'https://i.postimg.cc/PfzvMdPs/Bookie-Enterprises-Logo.png' })
      .setFooter({ text: 'Rules are subject to change at any time' });

    const sentMessage = await message.channel.send({ embeds: [embed] });

    // Auto-delete for non-admins after 30 seconds
    if (!message.member.roles.cache.some(role => role.name === 'Admin')) {
      setTimeout(() => {
        sentMessage.delete().catch(() => {});
      }, 30000);
    }
  }
};
