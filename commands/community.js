const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const embeds = require("./../config/embed.json");
const emojis = require("./../config/emojis.json");
const links = require("./../config/links.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('community')
    .setDescription('Join My Community Server'),
  async execute(interaction, client) {

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel('Community')
          .setURL(links.community_server)
          .setEmoji(emojis.community)
          .setStyle('Link'),
      );

    const embed = new EmbedBuilder()
      .setColor(embeds.color)
      .setTitle(`TrollBot Community ${emojis.community}`)
      .setDescription(`**Join Our Community Server And Play TrollBot With Peoples, Enjoy Events, Talk And Make Friends, Test TrollBot Beta And Get Rewards. Join Now**`)
      .setFooter({ text: `${embeds.footer}` });

    return interaction.editReply({ embeds: [embed], components: [row] });
  },
};