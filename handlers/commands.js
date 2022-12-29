const { EmbedBuilder } = require("discord.js");
const embeds = require("./../config/embed.json");
const emojis = require("./../config/emojis.json");
const links = require("./../config/links.json");
const { maintenance, admins, nonDeffer_cmd } = require("./../config/settings.json");
const wait = require('node:timers/promises').setTimeout;

module.exports = client => {

  client.on('interactionCreate', async interaction => { 
	
  if (!interaction.isChatInputCommand()) return;
        
	const command = client.commands.get(interaction.commandName);
  

	if (nonDeffer_cmd.includes(interaction.commandName)) {

if (maintenance === "true") {
if (!admins.includes(interaction.user.id)) return interaction.reply(`**Bot Is Under Maintenance. Please Try Again Leter**`)
}
    
	  try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
	await interaction.reply({ content: '**There was an error while executing this command!**', ephemeral: true });
    }
	} else {
	  
await interaction.deferReply();

 
  if (maintenance === "true") {
if (!admins.includes(interaction.user.id)) return interaction.editReply(`**Bot Is Under Maintenance. Please Try Again Leter**`);
}
    
const db = require("./../database/connect.js");
    
const ban = db.table("ban");

const items = db.table("items");
    
let banned = await ban.get(`${interaction.user.id}.ban`)
    
if (banned === undefined) bal2 = "false";

if (banned === "true") {

let ban_reason = await ban.get(`${interaction.user.id}.reason`)
  
if (ban_reason === undefined) ban_reason = "Reason Not Provided";

const embed = new EmbedBuilder()
  .setColor(embeds.color)
    .setTitle(`**TrollBot Suspension**`)
.setDescription(`**You Are Banned From Using TrollBot Due To Breaking Our ToS.

Reason: ${ban_reason}

If You Believe You Got Banned By Mistake Go To [Appeal](${links.appeal}) And Submit The Form.**`)
  .setFooter({text: `${embeds.footer}`});

	return interaction.editReply({embeds: [embed] });

}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
	await interaction.editReply({ content: '**There was an error while executing this command!**', ephemeral: true });
	}
  }
});

}