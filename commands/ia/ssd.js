const { Command } = require("discord.js-commando");

module.exports = class botCommand extends Command {
  constructor(client) {
    super(client, {
      name: "servershutdown",
      group: "ia",
      memberName: "servershutdown",
      guildOnly: true,
      description: "Shutdown the server",
      throttling: {
        usages: 2,
        duration: 5,
      },
    });
  }

async run(message) {
    // Delete all messages in the channel
    message.channel.bulkDelete(100, true)
      .then(() => {
        // Send the first embed after deletion
        message.say({
          embed: {
            color: 4296191,
            title: "MSRP Server Information",
            description: "> Sessions are not scheduled at specific times, they are hosted based on staff availability and community demand.\n\n> Code: MOSRPP\n> Owner: <@1207735882321240134>\n> Co-Owners: <@962865970320384000>, <@791184993107705866>",
            thumbnail: {
              url: "https://cdn.discordapp.com/attachments/1224970670807711874/1225009092293296169/msrp.png?ex=662ac65f&is=662974df&hm=cf98bef97113de44844927b2da0f61b1f222a403ec5a369aaf766de3106fbee8&"
            },
            image: {
              url: "https://cdn.discordapp.com/attachments/1224970670807711874/1225008975783657472/MSRP_3.png?ex=662ac643&is=662974c3&hm=85f04535bbb649a4edc1ff01a2dc51409da53f6278ac5aefc10ecb2cbc2f315c&"
            },
          },
        });

        // Delete messages again
        message.channel.bulkDelete(100, true)
          .then(() => {
            // Send the second embed after second deletion
            message.say({
              embed: {
                color: 4296191,
                title: "<:idle:1225139393472368754> MSRP Server Shutdown",
                description: "> Hey there! Our server is currently taking a breather, but don't worry, we'll be back up and running soon. We kindly ask you to hold off from joining the server while it's down. Keep an eye on this channel for updates on the next session. Thanks for your understanding!",
                thumbnail: {
                  url: "https://cdn.discordapp.com/attachments/1224970670807711874/1225009092293296169/msrp.png?ex=662ac65f&is=662974df&hm=cf98bef97113de44844927b2da0f61b1f222a403ec5a369aaf766de3106fbee8&"
                },
                image: {
                  url: "https://cdn.discordapp.com/attachments/1224970670807711874/1225008975389655060/MSRP_4.png?ex=662ac643&is=662974c3&hm=2833f290606edc3204f600df21f22a72b032f8f6a30825feec5d0a0cbfd9c0b5&"
                },
              },
            });
          })
          .catch((error) => console.error("Error clearing messages:", error));
      })
      .catch((error) => console.error("Error clearing messages:", error));
  }
};