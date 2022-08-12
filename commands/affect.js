const { AttachmentBuilder, SlashCommandBuilder } = require("discord.js");
const { memerkey } = require("./../config/config.json");
const Meme = require("memer-api");
const memer = new Meme(memerkey);


module.exports = {
	data: new SlashCommandBuilder()
		.setName('affect')
		.setDescription("🍷 affect. Image Command")
		.addUserOption(option => option.setName('user').setDescription('Give Me A User').setRequired(true)),
	async execute(interaction) {
		const user = interaction.options.getUser('user');

    await interaction.deferReply();
const avatar = user.displayAvatarURL({ dynamic: true });

memer.affect(avatar)
    .then(image => {

    const attachment = new AttachmentBuilder(image, { name: 'affect.png' });
      
		return interaction.editReply({files: [attachment] });
})

	},
};