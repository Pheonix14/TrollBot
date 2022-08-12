const { AttachmentBuilder, SlashCommandBuilder } = require("discord.js");
const { memerkey } = require("./../config/config.json");
const Meme = require("memer-api");
const memer = new Meme(memerkey);


module.exports = {
	data: new SlashCommandBuilder()
		.setName('violence')
		.setDescription("👿 violence. Meme Command")
		.addStringOption(option => option.setName('text').setDescription('Give Me A Text').setRequired(true)),
	async execute(interaction) {
		await interaction.deferReply();
    const text = interaction.options.getString('text');
    

memer.violence(text)
    .then(image => {

    const attachment = new AttachmentBuilder(image, { name: 'violence.png' });
      
		return interaction.editReply({files: [attachment] });
})

	},
}