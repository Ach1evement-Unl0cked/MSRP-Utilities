const { Command } = require("discord.js-commando");
const fetch = require("node-fetch");

module.exports = class GetVehiclesCommand extends Command {
  constructor(client) {
    super(client, {
      name: "players",
      group: "moderation",
      memberName: "players",
      guildOnly: true,
      description: "Get the list of players from the server.",
      throttling: {
        usages: 2,
        duration: 5,
      },
    });
  }

  async run(message) {
    try {
      const response = await fetch('https://api.policeroleplay.community/v1/server/players', {
        method: 'GET',
        headers: {
          "Server-Key": process.env['apiKey']
        },
      });

if (response.ok) {
        const players = await response.json();
        if (players.length > 0) {
          const categorizedPlayers = {};
          players.forEach(player => {
            if (!categorizedPlayers[player.Team]) {
              categorizedPlayers[player.Team] = [];
            }
            categorizedPlayers[player.Team].push(player);
          });

          let playerList = '';
          for (const team in categorizedPlayers) {
            playerList += `**${team}**\n`;
            playerList += categorizedPlayers[team].map(player => `\`${player.Player} [${player.Callsign || ''}] | ${player.Permission}\``).join('\n') + '\n';
          }

          message.say({
            embed: {
              color: 4296191,
              title: "List of Players",
              description: playerList,
            },
          });
        } else {
          message.say({
            embed: {
              color: 4296191,
              description: "No players found",
            },
          });
        }
      } else {
        message.say({
          embed: {
            color: 16711680,
            description: "Failed to get players data",
          },
        });
      }
    } catch (error) {
      console.error("Error getting players data:", error);
      message.say({
        embed: {
          color: 16711680,
          description: "Error getting players data",
        },
      });
    }
  }
};