const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('📶 Bot Latency'),
	async execute(interaction, client) {

const embed = new MessageEmbed()
  .setColor(embeds.color)
.setDescription(`${emojis.bot} Bot Ping - ${Date.now() - interaction.createdTimestamp}ms

${emojis.discord} Api Latency - ${interaction.client.ws.ping}ms`)
  
.setFooter({text: `${embeds.footer}`})
    .setTimestamp();
    
		return interaction.reply({embeds: [embed]});
	},
}