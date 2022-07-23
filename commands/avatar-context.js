const { EmbedBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
const embeds = require("./../config/embed.json");

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName('Avatar')
.setType(ApplicationCommandType.User),
	async execute(interaction, client) {

    const avatar = interaction.targetUser.displayAvatarURL({ dynamic: true });

    const user = interaction.targetUser;

const embed = new EmbedBuilder()
  .setColor(embeds.color)
  .setImage(avatar)
.setTitle(`${user.username}'s Avatar`)
.setFooter({text: `${embeds.footer}`});
    
		return interaction.reply({embeds: [embed]});
	},
}