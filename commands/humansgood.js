const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require("discord.js");
const { memerkey } = require("./../config/config.json");
const Meme = require("memer-api");
const memer = new Meme(memerkey);


module.exports = {
	data: new SlashCommandBuilder()
		.setName('humansgood')
		.setDescription("🙋 humansgood. Meme Command")
		.addStringOption(option => option.setName('text').setDescription('Give Me A Text').setRequired(true)),
	async execute(interaction) {
		
    const text = interaction.options.getString('text');
    

memer.humansgood(text)
    .then(image => {

    const attachment = new MessageAttachment(image, "humansgood.png");
      
		return interaction.reply({files: [attachment] });
})

	},
}