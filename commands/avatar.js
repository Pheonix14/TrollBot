const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const embeds = require("./../config/embed.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription("🙋 See Someone's Avatar")
  .addUserOption(option => option.setName('user').setDescription('Give Me A User').setRequired(true)),
	async execute(interaction, client) {

    const user = interaction.options.getUser('user');
    
const avatar = user.displayAvatarURL({ dynamic: true });

const embed = new EmbedBuilder()
  .setColor(embeds.color)
  .setImage(avatar)
.setTitle(`${user.username}'s Avatar`)
.setFooter({text: `${embeds.footer}`});
    
		return interaction.reply({embeds: [embed]});
	},
}