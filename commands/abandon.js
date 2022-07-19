const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require("discord.js");
const { memerkey } = require("./../config/config.json");
const Meme = require("memer-api");
const memer = new Meme(memerkey);


module.exports = {
	data: new SlashCommandBuilder()
		.setName('abandon')
		.setDescription("👶 abandon. Meme Command")
		.addStringOption(option => option.setName('text').setDescription('Give Me A Text').setRequired(true)),
	async execute(interaction) {
		
    const text = interaction.options.getString('text');

memer.abandon(text)
    .then(image => {

    const attachment = new MessageAttachment(image, "abandon.png");
      
		return interaction.reply({files: [attachment] });
})

	},
};