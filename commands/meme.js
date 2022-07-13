const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('meme')
		.setDescription('Replies with Funny Meme!'),
	async execute(interaction, client) {

  let data = await fetch ("http://meme-api.herokuapp.com/gimme/memes").then(res => res.json())

const embed = new MessageEmbed()
  .setColor(embeds.color)
  .setURL(`${data.postLink}`)
  .setTitle(`${data.title}`)
.setImage(`${data.url}`)
  .setFooter({text: `${embeds.footer}`})
    .setTimestamp();
    
		return interaction.reply({embeds: [embed]});
	},
}