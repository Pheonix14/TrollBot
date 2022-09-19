const emojis = require("./../config/emojis.json");


module.exports = client => {

client.on('interactionCreate', async interaction => {

const db = require("./../database/connect.js");

const settings = db.table(`settings`)
  
	if (!interaction.isModalSubmit()) return;
	if (interaction.customId === 'myModal') {

await interaction.deferReply();
    
const submitted_bio = interaction.fields.getTextInputValue('bio');

let register = await settings.get(`${interaction.user.id}.register`)

if (register === undefined) register = 'false';
    
if (register === 'false') 
return interaction.editReply(`${emojis.cross} Use /register To Register Your Account In My Database`);

await settings.set(`${interaction.user.id}.bio`, submitted_bio)
    
		await interaction.editReply({ content: `Your Profile Bio Changed To **${submitted_bio}** Successfully!` });
	}
});
}