const { AttachmentBuilder, SlashCommandBuilder } = require("discord.js");
const { memerkey } = require("./../config/config.json");
const Meme = require("memer-api");
const memer = new Meme(memerkey);


module.exports = {
	data: new SlashCommandBuilder()
		.setName('piccolo')
		.setDescription("👽 piccolo. Meme Command")
		.addStringOption(option => option.setName('text').setDescription('Give Me A Text').setRequired(true)),
	async execute(interaction) {
		
    const text = interaction.options.getString('text');
    

memer.piccolo(text)
    .then(image => {

    const attachment = new AttachmentBuilder(image, { name: 'piccolo.png' });
      
		return interaction.reply({files: [attachment] });
})

	},
}