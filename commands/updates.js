const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const embeds = require("./../config/embed.json");
const emojis = require("./../config/emojis.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('updates')
		.setDescription('Know About Letest Updates 📜'),
	async execute(interaction, client) {
await interaction.deferReply();
  const embed = new EmbedBuilder()
  .setColor(embeds.color)
    .setTitle(`**TrollBot Updates**`)
.setDescription(`**Version - 1.1.1

- Improvements In Some Commands

- Ping Issue Fixed

- Crash Issue Fixed

- Bug Fixes

- Performance Optimised

Thank You!
- TrollBot Development
**`)
  
.setFooter({text: `${embeds.footer}`})
    .setTimestamp();

	return interaction.editReply({embeds: [embed] });

  },
};