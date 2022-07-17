const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const embeds = require("./../config/embed.json");
const emojis = require("./../config/emojis.json");
const links = require("./../config/links.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('invite')
    .setDescription('Install/Invite Me On Your Server ➕'),
  async execute(interaction, client) {

    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setLabel('Invite Now')
          .setURL(links.invite)
          .setEmoji(emojis.bot)
          .setStyle('LINK'),
      );

    const embed = new MessageEmbed()
      .setColor(embeds.color)
      .setTitle(`TrollBot Invite`)
      .setDescription(``)
      .setFooter({ text: `${embeds.footer}` });

    return interaction.reply({ embeds: [embed], components: [row] });
  },
};