const { Command } = require("discord.js-commando");

module.exports = class botCommand extends Command {
  constructor(client) {
    super(client, {
      name: "boost",
      group: "ia",
      memberName: "boost",
      guildOnly: true,
      description: "Boost the server!",
      throttling: {
        usages: 2,
        duration: 5,
      },
    });

    // Keep track of the previous embed message ID
    this.previousEmbedMessageID = null;
  }

  async run(message) {
    const embedContent = {
      content: "@everyone",
      embed: {
        color: 4296191,
        title: "<:online:1225139255760781373> Server Boost!",
        description: "> Hey there! We're excited to let you know that we have multiple spots available on our ERLC server. If you're up for some fun and want to experience some amazing roleplay, we'd love for you to join our community and help us climb to the top of the leaderboard. Come on in and let's have a blast together!",
        thumbnail: {
              url: "https://cdn.discordapp.com/attachments/1224970670807711874/1225009092293296169/msrp.png?ex=662ac65f&is=662974df&hm=cf98bef97113de44844927b2da0f61b1f222a403ec5a369aaf766de3106fbee8&"
            },
            image: {
              url: "https://cdn.discordapp.com/attachments/1224970670807711874/1225008975783657472/MSRP_3.png?ex=662ac643&is=662974c3&hm=85f04535bbb649a4edc1ff01a2dc51409da53f6278ac5aefc10ecb2cbc2f315c&"
            },
      },
    };

    // If there is a previous embed message, delete it
    if (this.previousEmbedMessageID) {
      try {
        const previousEmbedMessage = await message.channel.messages.fetch(this.previousEmbedMessageID);
        await previousEmbedMessage.delete();
      } catch (error) {
        console.error("Error deleting previous embed message:", error);
      }
    }

    message.delete().catch(error => {
      console.error("Error deleting command message:", error);
    });

    // Send the new embed message and store its ID as the previous one
    message.say(embedContent)
      .then(sentMessage => {
        this.previousEmbedMessageID = sentMessage.id;
      })
      .catch(error => {
        console.error("Error sending embed message:", error);
      });
  }
};