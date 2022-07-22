const { AttachmentBuilder, SlashCommandBuilder } = require("discord.js");
const { memerkey } = require("./../config/config.json");
const Meme = require("memer-api");
const memer = new Meme(memerkey);


module.exports = {
	data: new SlashCommandBuilder()
		.setName('search')
		.setDescription("🔍 search. Meme Command")
		.addStringOption(option => option.setName('text').setDescription('Give Me A Text').setRequired(true)),
	async execute(interaction) {
		
    const text = interaction.options.getString('text');
    

memer.search(text)
    .then(image => {

    const attachment = new AttachmentBuilder(image, { name: 'search.png' });
      
		return interaction.reply({files: [attachment] });
})

	},
}