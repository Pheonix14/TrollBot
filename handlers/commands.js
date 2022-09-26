const { InteractionType, EmbedBuilder } = require("discord.js");
const embeds = require("./../config/embed.json");
const links = require("./../config/links.json");

module.exports = client => {

  client.on('interactionCreate', async interaction => { 
	if (!interaction.type === InteractionType.ApplicationCommand) return;

const db = require("./../database/connect.js");
    
	const command = client.commands.get(interaction.commandName);
    
	if (!command) return;

const ban = db.table("ban");

let banned = await ban.get(`${interaction.user.id}.ban`)
    
if (banned === undefined) bal2 = "false";

if (banned === "true") {

let ban_reason = await ban.get(`${interaction.user.id}.reason`)
  
if (ban_reason === undefined) ban_reason = "Reason Not Provided";

const embed = new EmbedBuilder()
  .setColor(embeds.color)
    .setTitle(`TrollBot Suspension`)
.setDescription(`You Are Banned From Using TrollBot Due To Breaking Our ToS.

Reason: ${ban_reason}

If You Believe You Got Banned By Mistake Go To [Appeal](${links.appeal}) And Submit The Form.`)
  .setFooter({text: `${embeds.footer}`});

	return interaction.reply({embeds: [embed] });


}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
	await interaction.editReply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

}