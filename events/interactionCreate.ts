module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		console.log(`[data-manager] Status: ${interaction.user.tag} (${interaction.user.id}) In ${interaction.guild.name} (${interaction.guild.id}) Triggered An Interaction. 📡`);
	},
};