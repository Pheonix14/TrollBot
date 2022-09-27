const { AttachmentBuilder, SlashCommandBuilder } = require("discord.js");
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

    const attachment = new AttachmentBuilder(image, { name: 'abandom.png' });
      
		return interaction.editReply({files: [attachment] });
})

	},
};