const { AttachmentBuilder, SlashCommandBuilder } = require("discord.js");
const { memerkey } = require("./../config/config.json");
const Meme = require("memer-api");
const memer = new Meme(memerkey);


module.exports = {
	data: new SlashCommandBuilder()
		.setName('facts')
		.setDescription("📙 facts. Meme Command")
		.addStringOption(option => option.setName('text').setDescription('Give Me A Text').setRequired(true)),
	async execute(interaction) {
		
    const text = interaction.options.getString('text');
    

memer.facts(text)
    .then(image => {

    const attachment = new AttachmentBuilder(image, { name: 'facts.png' });
      
		return interaction.editReply({files: [attachment] });
})

	},
}