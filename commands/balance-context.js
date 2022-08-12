const { EmbedBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB({ filePath: "././database/database.sqlite" });
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName('Balance')
.setType(ApplicationCommandType.User),
	async execute(interaction, client) {

await interaction.deferReply();
    
    const user = interaction.targetUser;

let bal = await db.get(`${user.id}.balance`)

if (bal === undefined) bal = 0;

let bank = await db.get(`${user.id}.bank`)
    
if (bank === undefined) bank = 0;

let Total = bal + bank
    
const embed = new EmbedBuilder()
  .setColor(embeds.color)
.setDescription(`**${user.username}'s Balance**\n**Pocket:** ${emojis.troll_coin} ${bal}\n**Troll Bank:** ${emojis.troll_coin} ${bank}\n**Total:** ${emojis.troll_coin} ${Total}`)
.setFooter({text: `${embeds.footer}`});
    
		return interaction.editReply({embeds: [embed]});
	},
}