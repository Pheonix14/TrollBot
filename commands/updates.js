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
.setDescription(`**Version - 1.1.0

- Updated Discord.js v13 To v14

- Updated Discord Api v9 To v10

- Added /avatar Command

- Added Avatar Context Menu Command

- Crash Issue Fixed

- Bug Fixes

**`)
  
.setFooter({text: `${embeds.footer}`})
    .setTimestamp();

	return interaction.reply({embeds: [embed] });

  },
};