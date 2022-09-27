const { EmbedBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName('Balance')
.setType(ApplicationCommandType.User),
	async execute(interaction, client) {

    const db = require("./../database/connect.js");
    

    
    const currency = db.table("currency");

const settings = db.table("settings")
    
    const user = interaction.targetUser;

    let register = await settings.get(`${interaction.user.id}.register`)
    
if (register === undefined) register = 'false';
    
    if (register === 'false') {
return interaction.editReply(`${emojis.cross} Use /register To Register Your Account In My Database`)
    }

    
let bal = await currency.get(`${user.id}.balance`)

if (bal === undefined) bal = 0;

let bank = await currency.get(`${user.id}.bank`)
    
if (bank === undefined) bank = 0;

let invw = await currency.get(`${user.id}.inventory_worth`)
    
if (invw === undefined) invw = 0;

let bank_space = await currency.get(`${user.id}.bank_space`)
    
if (bank_space === undefined) bank_space = 0;

let net = bal + bank + invw
    
const embed = new EmbedBuilder()
  .setColor(embeds.color)
.setDescription(`**${user.username}'s Balance**\n**Pocket:** ${emojis.troll_coin} ${bal}\n**Troll Bank:** ${emojis.troll_coin} ${bank} / ${bank_space}\n**Net Worth:** ${emojis.troll_coin} ${net}`)
.setFooter({text: `${embeds.footer}`});
    
		return interaction.editReply({embeds: [embed]});
	},
}