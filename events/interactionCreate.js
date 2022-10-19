
module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
    
if (interaction.isChatInputCommand()) {
console.log(`${interaction.user.tag} (${interaction.user.id}) Triggered /${interaction.commandName} In ${interaction.guild.name} (${interaction.guild.id})`);
  
}
    if (interaction.isUserContextMenuCommand()) {
console.log(`${interaction.user.tag} (${interaction.user.id}) Triggered ${interaction.commandName} In ${interaction.guild.name} (${interaction.guild.id})`);
  
    }

if (interaction.isSelectMenu()) {
  
console.log(`${interaction.user.tag} (${interaction.user.id}) Used Select Menu In ${interaction.guild.name} (${interaction.guild.id})`);

}

if (interaction.isModalSubmit()) {

console.log(`${interaction.user.tag} (${interaction.user.id}) Submitted Modal From ${interaction.guild.name} (${interaction.guild.id})`);
  
}
    
	},
};