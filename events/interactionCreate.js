
module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
    
if (interaction.isChatInputCommand()) {
console.log(`${interaction.user.tag} (${interaction.user.id}) Triggered /${interaction.commandName}`);
  
}
    if (interaction.isUserContextMenuCommand()) {
console.log(`${interaction.user.tag} (${interaction.user.id}) Triggered`);
  
    }

if (interaction.isSelectMenu()) {
  
console.log(`${interaction.user.tag} (${interaction.user.id}) Used Select Menu`);

}

if (interaction.isModalSubmit()) {

console.log(`${interaction.user.tag} (${interaction.user.id}) Submitted Modal`);
  
}
    
	},
};