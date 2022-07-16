const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require("discord.js");
const { memerkey } = require("./../config/config.json");
const Meme = require("memer-api");
const memer = new Meme(memerkey);


module.exports = {
	data: new SlashCommandBuilder()
		.setName('obama')
		.setDescription("🧑‍💼 obama. Meme Command")
		.addStringOption(option => option.setName('text').setDescription('Give Me A Text').setRequired(true)),
	async execute(interaction) {
		
    const text = interaction.options.getString('text');

    const avatar = interaction.user.displayAvatarURL({ dynamic: true });

memer.obama(text, avatar)
    .then(image => {

    const attachment = new MessageAttachment(image, "obama.png");
      
		return interaction.reply({files: [attachment] });
})

	},
}