const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('meme')
		.setDescription('😂 Funny Memes'),
	async execute(interaction, client) {

  let data = await fetch ("http://meme-api.herokuapp.com/gimme/meme").then(res => res.json())

const embed = new EmbedBuilder()
  .setColor(embeds.color)
  .setURL(`${data.postLink}`)
  .setTitle(`${data.title}`)
.setImage(`${data.url}`)
  .setFooter({text: `${embeds.footer}`});
    
		return interaction.reply({embeds: [embed]});
	},
}