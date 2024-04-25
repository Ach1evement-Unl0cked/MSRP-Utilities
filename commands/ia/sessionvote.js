const { Command } = require("discord.js-commando");
const fetch = require("node-fetch");

module.exports = class botCommand extends (
  Command
) {
  constructor(client) {
    super(client, {
      name: "sessionvote",
      group: "ia",
      memberName: "sessionvote",
      guildOnly: true,
      description: "Begin a vote to start one of our Sessions!",
      throttling: {
        usages: 1,
        duration: 120,
      },
    });
  }

  async run(message) {
    const sentMessage = await message.say({
      content: "@everyone",
      embed: {
        color: 4296191,
        title: "<:idle:1225139267660021900> MSRP Session Vote",
        description: "Hey there! We're trying to schedule a session and we'd love to know if you're available to attend. If you are, please react with a <:online:1232930086223745046> below. Just a quick reminder that we require you to join the session after you vote!",
        thumbnail: {
                  url: "https://cdn.discordapp.com/attachments/1224970670807711874/1225009092293296169/msrp.png?ex=662ac65f&is=662974df&hm=cf98bef97113de44844927b2da0f61b1f222a403ec5a369aaf766de3106fbee8&"
                },
        image: {
          url: "https://cdn.discordapp.com/attachments/1224970670807711874/1225008975389655060/MSRP_4.png?ex=662ac643&is=662974c3&hm=2833f290606edc3204f600df21f22a72b032f8f6a30825feec5d0a0cbfd9c0b5&"
        },
      },
    });

    message.delete().catch(error => {
      console.error("Error deleting command message:", error);
    });

    // React to the message with the desired custom emoji
    const customEmoji = this.client.emojis.cache.get("1232930086223745046"); // Replace "1232930086223745046" with the ID of your custom emoji
    if (!customEmoji) {
      return console.error("Custom emoji not found!");
    }

    await sentMessage.react(customEmoji);

    // Initialize reaction count
    let reactionCount = sentMessage.reactions.cache.get(customEmoji.id).count - 1; // Subtract 1 to exclude the bot's reaction

    // Keep track of users who voted
    const voters = new Set();

    // Listen for reaction add events
    this.client.on("messageReactionAdd", async (reaction, user) => {
      if (reaction.message.id === sentMessage.id && reaction.emoji.id === customEmoji.id && !user.bot) {
        // Increment reaction count
        reactionCount++;

        // Add user to voters set
        voters.add(user.id);

        // Update the message content with the updated reaction count
        sentMessage.edit({
          content: "@everyone",
          embed: {
            color: 4296191,
            title: "<:idle:1225139267660021900> MSRP Session Vote",
            description: `Hey there! We're trying to schedule a session and we'd love to know if you're available to attend. If you are, please react with a <:online:1232930086223745046> below. Just a quick reminder that we require you to join the session after you vote!`,
            thumbnail: {
                  url: "https://cdn.discordapp.com/attachments/1224970670807711874/1225009092293296169/msrp.png?ex=662ac65f&is=662974df&hm=cf98bef97113de44844927b2da0f61b1f222a403ec5a369aaf766de3106fbee8&"
                },
                image: {
                  url: "https://cdn.discordapp.com/attachments/1224970670807711874/1225008975389655060/MSRP_4.png?ex=662ac643&is=662974c3&hm=2833f290606edc3204f600df21f22a72b032f8f6a30825feec5d0a0cbfd9c0b5&"
                },
            fields: [
              {
                name: "Current Votes",
                value: `${reactionCount}`,
              },
            ],
          },
        });

        // Check if the number of votes reaches 10
        if (reactionCount >= 10) {
          // Create a new embed with the names of the users who voted
          const votedUsers = Array.from(voters).map(userId => `<@${userId}>`).join(", ");

          await message.say({
            content: `${votedUsers} @everyone`,
            embed: {
              color: 4296191,
              title: "<:online:1225139255760781373> MSRP Server Startup",
              description: `Hey there! I'm excited to let you know that our ERLC server is now online and ready for some fun roleplaying action. You're invited to join us using the information below for an amazing experience. We can't wait to see you there!`,
              thumbnail: {
              url: "https://cdn.discordapp.com/attachments/1224970670807711874/1225009092293296169/msrp.png?ex=662ac65f&is=662974df&hm=cf98bef97113de44844927b2da0f61b1f222a403ec5a369aaf766de3106fbee8&"
            },
            image: {
              url: "https://cdn.discordapp.com/attachments/1224970670807711874/1225008975783657472/MSRP_3.png?ex=662ac643&is=662974c3&hm=85f04535bbb649a4edc1ff01a2dc51409da53f6278ac5aefc10ecb2cbc2f315c&"
            },
              fields: [
                {
                  name: "Voters",
                  value: `${votedUsers}`,
                },
              ],
            },
          });

          // Delete the original embed
          await sentMessage.delete();
        }
      }
    });
  }
};
