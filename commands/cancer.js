const { AttachmentBuilder, SlashCommandBuilder } = require("discord.js");
const { memerkey } = require("./../config/config.json");
const Meme = require("memer-api");
const memer = new Meme(memerkey);


module.exports = {
	data: new SlashCommandBuilder()
		.setName('cancer')
		.setDescription("cancer 🧞. Image Command")
		.addUserOption(option => option.setName('user').setDescription('Give Me A User').setRequired(true)),
	async execute(interaction) {
		const user = interaction.options.getUser('user');
    
const avatar = user.displayAvatarURL({ dynamic: true });

memer.cancer(avatar)
    .then(image => {

    const attachment = new AttachmentBuilder(image, { name: 'cancer.png' });
      
		return interaction.reply({files: [attachment] });
})

	},
}