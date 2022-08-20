const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('📶 Bot Latency'),
	async execute(interaction, client) {
await interaction.deferReply();
const embed = new EmbedBuilder()
  .setColor(embeds.color)
.setDescription(`${emojis.discord} Api Latency - ${interaction.client.ws.ping}ms`)
.setFooter({text: `${embeds.footer}`});

  return interaction.editReply({embeds: [embed]});
	},
}