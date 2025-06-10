const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  name: 'myrules',
  description: 'Sends the rules embed',

  execute(message, args) {
    // Skip if command is from a bot
    if (message.author.bot) return;

    message.channel.send({ embeds: [embed] }).then(sentMessage => {
      // Only delete if user is NOT an admin
      if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        setTimeout(() => {
          sentMessage.delete().catch(err => console.log("Message already deleted or no perms."));
        }, 30_000); // 30 seconds
      }
    });
  }
};
