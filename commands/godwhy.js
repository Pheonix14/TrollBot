const { AttachmentBuilder, SlashCommandBuilder } = require("discord.js");
const { memerkey } = require("./../config/config.json");
const Meme = require("memer-api");
const memer = new Meme(memerkey);


module.exports = {
	data: new SlashCommandBuilder()
		.setName('godwhy')
		.setDescription("🤦 godwhy. Meme Command")
		.addStringOption(option => option.setName('text').setDescription('Give Me A Text').setRequired(true)),
	async execute(interaction) {
		
    const text = interaction.options.getString('text');
    

memer.godwhy(text)
    .then(image => {

    const attachment = new AttachmentBuilder(image, { name: 'godwhy.png' });
      
		return interaction.reply({files: [attachment] });
})

	},
}