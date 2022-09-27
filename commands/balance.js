const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('balance')
		.setDescription('💸 check balance')
  .addUserOption(option => option.setName('user').setDescription('Give Me A User')),
                   
	async execute(interaction, client) {

const db = require("./../database/connect.js");

    

    const currency = db.table("currency");
    
const settings = db.table("settings");


    const user = interaction.options.getUser('user');

let register = await settings.get(`${interaction.user.id}.register`)

if (register === undefined) register = 'false';
    
    if (register === 'false') {
return interaction.editReply(`${emojis.cross} Use /register To Register Your Account In My Database`)
    }

if (!user) {
  

let bal2 = await currency.get(`${interaction.user.id}.balance`)

if (bal2 === undefined) bal2 = 0;

let bank2 = await currency.get(`${interaction.user.id}.bank`)
    
if (bank2 === undefined) bank2 = 0;

let invw2 = await currency.get(`${interaction.user.id}.inventory_worth`)
    
if (invw2 === undefined) invw2 = 0;

let bank_space2 = await currency.get(`${interaction.user.id}.bank_space`)
    
if (bank_space2 === undefined) bank_space2 = 0;


let net2 = bal2 + bank2 + invw2;

    
const embed0 = new EmbedBuilder()
  .setColor(embeds.color)
.setDescription(`**Your Balance**\n**Pocket:** ${emojis.troll_coin} ${bal2}\n**Troll Bank:** ${emojis.troll_coin} ${bank2} / ${bank_space2}\n**Net Worth:** ${emojis.troll_coin} ${net2}`)
.setFooter({text: `${embeds.footer}`});

interaction.editReply({embeds: [embed0]});
    
}

if (user) {
  
let bal = await currency.get(`${user.id}.balance`)

if (bal === undefined) bal = 0;

let bank = await currency.get(`${user.id}.bank`)
    
if (bank === undefined) bank = 0;

let invw = await currency.get(`${user.id}.inventory_worth`)
    
if (invw === undefined) invw2 = 0;

let bank_space = await currency.get(`${user.id}.bank_space`)
    
if (bank_space === undefined) bank_space = 0;
    
let net = bal + bank + invw;

    const embed = new EmbedBuilder()
  .setColor(embeds.color)
.setDescription(`**${user.username}'s Balance**\n**Pocket:** ${emojis.troll_coin} ${bal}\n**Troll Bank:** ${emojis.troll_coin} ${bank} / ${bank_space}\n**Net Worth:** ${emojis.troll_coin} ${net}`)
.setFooter({text: `${embeds.footer}`});

  return interaction.editReply({embeds: [embed]});

}

	},
}