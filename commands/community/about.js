const { Command } = require("discord.js-commando");
const fetch = require("node-fetch");

module.exports = class botCommand extends (
  Command
) {
  constructor(client) {
    super(client, {
      name: "about",
      group: "community",
      memberName: "about",
      guildOnly: true,
      description: "Who are you?",
      throttling: {
        usages: 2,
        duration: 5,
      },
    });
  }

  async run(message) {
    message.say({
      embed: {
        color: 4296191,
        description: "Hey! I am the MSRP Utilities bot, I handle a lot of the day-to-day tasks within Missouri State Roleplay.\n\nThis bot was created by <@1207735882321240134> for the MSRP community.",
        thumbnail: {
                  url: "https://cdn.discordapp.com/attachments/1224970670807711874/1225009092293296169/msrp.png?ex=662ac65f&is=662974df&hm=cf98bef97113de44844927b2da0f61b1f222a403ec5a369aaf766de3106fbee8&"
                },
        image: {
              url: "https://cdn.discordapp.com/attachments/1224970670807711874/1225008975783657472/MSRP_3.png?ex=662ac643&is=662974c3&hm=85f04535bbb649a4edc1ff01a2dc51409da53f6278ac5aefc10ecb2cbc2f315c&"
            },
      },
    });
  }
};
