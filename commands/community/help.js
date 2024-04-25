const { Command } = require("discord.js-commando");

module.exports = class botCommand extends (
  Command
) {
  constructor(client) {
    super(client, {
      name: "help",
      group: "community",
      memberName: "help",
      guildOnly: true,
      description: "List all the bots commands, and the permisions required to use them.",
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
        title: "The Missouri State Roleplay Utilities Bot Commands:",
        description: "Users will require the specified role+ to run the command. Any bugs should be reported to <@1207735882321240134>",
        footer: "Missouri State Roleplay",
        fields: [
          {
            name: "Directive",
            value: `\`${this.client.config.prefix}\`announce \n \`${this.client.config.prefix}\`broadcast`,
          },
          {
            name: "Support Staff",
            value: `\`${this.client.config.prefix}\`block \n \`${this.client.config.prefix}\`lock \n \`${this.client.config.prefix}\`snippet `,
          },
          {
            name: "Management",
            value: `\`${this.client.config.prefix}\`runcommand`,
          },
          {
            name: "Internal Affairs",
            value: `\`${this.client.config.prefix}\`sessionboost \n \`${this.client.config.prefix}\`servershutdown \n \`${this.client.config.prefix}\`sessionvote \n \`${this.client.config.prefix}\`staffvote`,
          },
          {
            name: "Moderation",
            value: `\`${this.client.config.prefix}\`serverinfo \n \`${this.client.config.prefix}\`players \n \`${this.client.config.prefix}\`vehicles \n`,
          },
          {
            name: "Community Member",
            value: `\`${this.client.config.prefix}\`help \n \`${this.client.config.prefix}\`about`
          },
        ],
      },
    });
  }
};
