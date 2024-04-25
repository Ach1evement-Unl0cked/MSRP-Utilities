const { Command } = require("discord.js-commando");
const fetch = require("node-fetch");

module.exports = class botCommand extends (
  Command
) {
  constructor(client) {
    super(client, {
      name: "bot",
      group: "utility",
      memberName: "bot",
      description: "General & technical bot information",
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
        author: {
          name: "AnthonyVTdev",
          icon_url: "https://i.imgur.com/GhivChe.gif",
          url: "https://github.com/AnthonyVanTonder",
        },
        description: "Bot by [AnthonyVTdev](https://github.com/AnthonyVanTonder). Join Our Discord Server For Support Or Help [https://discord.gg/ZAzGRFTv59](https://discord.gg/ZAzGRFTv59). Made with [Discord.js Commando](https://github.com/discordjs/Commando#readme)\n\n**Thanks You:**\n[AnIdiots.guide](https://anidiots.guide)\n[Discordjs.guide](https://discordjs.guide/)\n[Discordjs Support Server](https://discord.gg/djs)\n[AnthonyVanTonder](https://github.com/AnthonyVanTonder)",
        fields: [
          {
            name: "Prefix",
            value: `\`${this.client.config.prefix}\``,
            inline: true,
          },
          {
            name: "Version",
            value: `\`${require("../../package.json").version}\``,
            inline: true,
          },
          {
            name: "Config File Version",
            value: `\`${this.client.config.version}\``,
            inline: true,
          },
          {
            name: "Docs",
            value: "https://github.com/AnthonyVanTonder/Discord-ModMail-Bot/blob/master/README.md",
          },
        ],
      },
    });
  }
};
