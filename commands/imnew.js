const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  name: 'imnew',
  description: 'Explains what to do when you join the server.',
  async execute(message, args) {
    // Skip if the user has admin permissions
    if (message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return;

    const embed = new EmbedBuilder()
      .setTitle('Welcome to the Server!')
      .setDescription(
        'Here’s how to get started:\n' +
        '📌 Check <#1377545637868077107> for important information\n' +
        '✅ Use <#1376477770166702103> to verify your account\n' +
        '🎉 Enjoy your stay!'
      )
      .setColor(0x00AE86);

    const sentMessage = await message.channel.send({ embeds: [embed] });

    // Delete the message after 30 seconds
    setTimeout(() => {
      sentMessage.delete().catch(() => {});
    }, 30000); // 30,000 ms = 30 seconds
  }
};
