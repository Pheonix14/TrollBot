const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const embeds = require("./../config/embed.json");
const emojis = require("./../config/emojis.json");
const links = require("./../config/links.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('invite')
    .setDescription('Invite Me On Your Server ➕'),
  async execute(interaction, client) {

    
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel('Invite Now')
          .setURL(links.invite)
          .setEmoji(emojis.bot)
          .setStyle('Link'),
      );

    const embed = new EmbedBuilder()
      .setColor(embeds.color)
      .setDescription(`**Click The Button Below To Invite TrollBot To Your Servers!**`)
      .setFooter({ text: `${embeds.footer}` });

    return interaction.editReply({ embeds: [embed], components: [row] });
  },
};