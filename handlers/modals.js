const emojis = require("./../config/emojis.json");


module.exports = client => {

client.on('interactionCreate', async interaction => {

  if (!interaction.isModalSubmit()) return;

await interaction.deferReply();

const db = require("./../database/connect.js");
  
const settings = db.table(`settings`);

const items = db.table(`items`);

let register = await settings.get(`${interaction.user.id}.register`)

if (register === undefined) register = 'false';
    
if (register === 'false') 
return interaction.editReply(`${emojis.cross} Use /register To Register Your Account In My Database`);
    
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

	return interaction.editReply({embeds: [embed] });


}

	
	if (interaction.customId === 'myModal') {


let phone = await items.get(`${interaction.user.id}.phone`)

  if (phone === undefined) phone = 0;

if (phone === 0) {
  return interaction.editReply("You Need A Phone To Use This Command. Tip: use /shop and /buy to buy a phone")
}
    
const submitted_bio = interaction.fields.getTextInputValue('bio');


await settings.set(`${interaction.user.id}.bio`, submitted_bio)
    
		await interaction.editReply({ content: `Your Profile Bio Changed To **${submitted_bio}** Successfully!` });
	}
});
}