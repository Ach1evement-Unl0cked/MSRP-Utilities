const { Command } = require("discord.js-commando");
const fetch = require("node-fetch");

module.exports = class botCommand extends Command {
  constructor(client) {
    super(client, {
      name: "runcommand",
      group: "management",
      memberName: "runcommand",
      guildOnly: true,
      description: "Run an In-Game Command through Remote-Management.",
      throttling: {
        usages: 2,
        duration: 5,
      },
    });
  }

  async run(message) {
    try {
      const commandContent = message.content.replace("!runcommand", "").trim(); // Extracting the command content
      const response = await fetch('https://api.policeroleplay.community/v1/server/command', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Server-Key": process.env['apiKey']
        },
        body: JSON.stringify({ command: commandContent }), // Sending the command content in the body
      });

      if (response.ok) {
        message.say({
          embed: {
            color: 4296191,
            title: "Command Sent Successfully",
            description: `Command: \`${commandContent}\`\n\nSent By: \ ${message.author}\ `,
          },
        });
      } else {
        message.say({
          embed: {
            color: 16711680,
            description: "Failed to send command",
          },
        });
      }
    } catch (error) {
      console.error("Error sending command:", error);
      message.say({
        embed: {
          color: 16711680,
          description: "Error sending command",
        },
      });
    }
    message.delete().catch(error => {
      console.error("Error deleting command message:", error);
    });
  }
};
