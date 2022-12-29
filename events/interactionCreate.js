
module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
    
if (interaction.isChatInputCommand()) {
console.log(`➥ ${interaction.user.tag} Triggered /${interaction.commandName}`);
  
}
    if (interaction.isUserContextMenuCommand()) {
console.log(`➥ ${interaction.user.tag} Triggered ${interaction.commandName}`);
  
    }

if (interaction.isStringSelectMenu()) {
  
console.log(`➥ ${interaction.user.tag} Used Select Menu (${interaction.customId})`);

}

if (interaction.isModalSubmit()) {

console.log(`➥ ${interaction.user.tag} Submitted Modal (${interaction.customId})`);
  
}

if (interaction.isButton()) {
  
console.log(`➥ ${interaction.user.tag} Used Button (${interaction.customId})`);
}
    
	},
};