const { AttachmentBuilder, SlashCommandBuilder } = require("discord.js");
const { memerkey } = require("./../config/config.json");
const Meme = require("memer-api");
const memer = new Meme(memerkey);


module.exports = {
	data: new SlashCommandBuilder()
		.setName('egg')
		.setDescription("🥚 egg. Image Command")
		.addUserOption(option => option.setName('user').setDescription('Give Me A User').setRequired(true)),
	async execute(interaction) {
    await interaction.deferReply();
		const user = interaction.options.getUser('user');
    
const avatar = user.displayAvatarURL({ dynamic: true });

memer.egg(avatar)
    .then(image => {

    const attachment = new AttachmentBuilder(image, { name: 'egg.png' });
      
		return interaction.editReply({files: [attachment] });
})

	},
}