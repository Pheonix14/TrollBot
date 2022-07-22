const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const embeds = require("./../config/embed.json");
const emojis = require("./../config/emojis.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('updates')
		.setDescription('Know About Letest Updates 📜'),
	async execute(interaction, client) {

  const embed = new EmbedBuilder()
  .setColor(embeds.color)
    .setTitle(`**TrollBot Updates**`)
.setDescription(`No Updates`)
  
.setFooter({text: `${embeds.footer}`})
    .setTimestamp();

	return interaction.reply({embeds: [embed] });

  },
};