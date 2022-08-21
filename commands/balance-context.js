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

    const economy = db.table("economy");
    
    const user = interaction.targetUser;

let bal = await economy.get(`${user.id}.balance`)

if (bal === undefined) bal = 0;

let bank = await economy.get(`${user.id}.bank`)
    
if (bank === undefined) bank = 0;

let invw = await economy.get(`${user.id}.inventory_worth`)
    
if (invw === undefined) invw = 0;

let bank_space = await economy.get(`${user.id}.bank_space`)
    
if (bank_space === undefined) bank_space = 0;

let net = bal + bank + invw
    
const embed = new EmbedBuilder()
  .setColor(embeds.color)
.setDescription(`**${user.username}'s Balance**\n**Pocket:** ${emojis.troll_coin} ${bal}\n**Troll Bank:** ${emojis.troll_coin} ${bank} / ${bank_space}\n**Net Worth:** ${emojis.troll_coin} ${net}`)
.setFooter({text: `${embeds.footer}`});
    
		return interaction.editReply({embeds: [embed]});
	},
}