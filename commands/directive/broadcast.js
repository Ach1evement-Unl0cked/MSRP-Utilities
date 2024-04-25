const { Command } = require("discord.js-commando");

module.exports = class dmAllCommand extends Command {
  constructor(client) {
    super(client, {
      name: "broadcast",
      group: "directive",
      memberName: "broadcast",
      guildOnly: true,
      description: "Broadcast a message to every message within the server.",

      args: [
        {
          key: "content",
          prompt: "Type out your message",
          type: "string",
        },
      ],
    });
  }

  async run(message, { content }) {
    message.guild.members.cache.array().forEach((member) => {
      try {
        if (!member.user.bot) member.send(content);
      } catch (e) {
        message.say(e.substring(0, 1999));
      }
    });
    this.client.log("DM All", `Sent DM to everyone with content \`\`\`${content}\`\`\``, 9283238, message);
  }
};
