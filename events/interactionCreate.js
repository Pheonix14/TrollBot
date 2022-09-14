module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		console.log(`\x1b[34m`, `[logger] Status: ${interaction.user.tag} Triggered ${interaction.commandName} In ${interaction.guild.name}`, `\x1b[0m`);
	},
};