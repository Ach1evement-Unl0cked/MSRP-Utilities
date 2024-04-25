const { Command } = require("discord.js-commando");
const fetch = require("node-fetch");

module.exports = class GetVehiclesCommand extends Command {
  constructor(client) {
    super(client, {
      name: "vehicles",
      group: "moderation",
      memberName: "vehicles",
      guildOnly: true,
      description: "Get the list of vehicles from the server.",
      throttling: {
        usages: 2,
        duration: 5,
      },
    });
  }

  async run(message) {
    try {
      const response = await fetch('https://api.policeroleplay.community/v1/server/vehicles', {
        method: 'GET',
        headers: {
          "Server-Key": process.env['apiKey']
        },
      });

      if (response.ok) {
        const vehicles = await response.json();
        if (vehicles.length > 0) {
          const vehicleList = vehicles.map(vehicle => `${vehicle.Owner} - ${vehicle.Name} // ${vehicle.Texture}`).join('\n');
          message.say({
            embed: {
              color: 4296191,
              title: "List of Vehicles",
              description: vehicleList,
            },
          });
        } else {
          message.say({
            embed: {
              color: 4296191,
              description: "No vehicles found",
            },
          });
        }
      } else {
        message.say({
          embed: {
            color: 16711680,
            description: "Failed to get vehicles data",
          },
        });
      }
    } catch (error) {
      console.error("Error getting vehicles data:", error);
      message.say({
        embed: {
          color: 16711680,
          description: "Error getting vehicles data",
        },
      });
    }
  }
};
