const { Command } = require("discord.js-commando");
const fetch = require("node-fetch");

module.exports = class GetServerInfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: "serverinfo",
      group: "moderation",
      memberName: "serverinfo",
      guildOnly: true,
      description: "Get information about the server.",
      throttling: {
        usages: 2,
        duration: 5,
      },
    });
  }

  async run(message) {
    try {
      const response = await fetch('https://api.policeroleplay.community/v1/server', {
        method: 'GET',
        headers: {
          "Server-Key": process.env['apiKey']
        },
      });

      if (response.ok) {
        const serverInfo = await response.json();
        const formattedInfo = `
          **Server Name:** ${serverInfo.Name}
          **Join Key:** ${serverInfo.JoinKey}
          **Account Verification Requirement:** ${serverInfo.AccVerifiedReq}
          **Team Balance:** ${serverInfo.TeamBalance ? 'Enabled' : 'Disabled'}
        `;
        message.say({
          embed: {
            color: 4296191,
            title: "Server Information",
            description: formattedInfo,
          },
        });
      } else {
        message.say({
          embed: {
            color: 16711680,
            description: "Failed to get server information",
          },
        });
      }
    } catch (error) {
      console.error("Error getting server information:", error);
      message.say({
        embed: {
          color: 16711680,
          description: "Error getting server information",
        },
      });
    }
  }
};