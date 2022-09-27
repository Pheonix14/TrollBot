const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const embeds = require("./../config/embed.json");
const emojis = require("./../config/emojis.json");
const links = require("./../config/links.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('support')
    .setDescription('Get Help Releted Me 📌'),
  async execute(interaction, client) {

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel('Support')
          .setURL(links.support_server)
          .setEmoji(emojis.support)
          .setStyle('Link'),
      );

    const embed = new EmbedBuilder()
      .setColor(embeds.color)
      .setTitle(`TrollBot Support ${emojis.support}`)
      .setDescription(`**Join Our Support Server For Bug Report, General Inquiries, Updates, Suggestions And Etc. Get Reply From Our Support Team Under 24 hours. Click The Button To Join Our Support Server.**`)


      .setFooter({ text: `${embeds.footer}` });

    return interaction.editReply({ embeds: [embed], components: [row] });
  },
};