const { Command } = require("discord.js-commando");
const fs = require("fs");

module.exports = class lockBotCommand extends Command {
  constructor(client) {
    super(client, {
      name: "lock",
      group: "support",
      memberName: "lock",
      guildOnly: true,
      description: "Toggles the Remote Support System.",
    });
  }

  run(message) {
    let t = this;
    async function updateConfigProp(property, value) {
      let data = t.client.config;
      data.modmail[property] = value;
      fs.writeFile("./config.json", JSON.stringify(data, null, 3), (err) => {
        if (err) return t.client.cn.error("Config", err);
        t.client.cn.log("Config", `The config file has been saved! Updated property ${property} to value ${value}`);
      });
      t.client.config = await require("../../config.json");
    }

    if (this.client.config.modmail.enabled) {
      updateConfigProp("enabled", false);
      this.client.log("Support System Locked", `The support system has been locked by a user in #${message.channel.name}`, 968392, message);
      message.channel.send("🔒 Locked ModMail.");
    } else {
      updateConfigProp("enabled", true);
      this.client.log("Support System Unlocked", `The support system has been unlocked by a user in #${message.channel.name}`, 968392, message);
      message.channel.send("🔓 Unlocked ModMail.");
    }
  }
};
