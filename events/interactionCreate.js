module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		console.log(`[log-maneger] Status: ${interaction.user.tag} Triggered ${interaction.commandName} In ${interaction.guild.name} 📜`);
	},
};