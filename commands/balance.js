const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB({ filePath: "././database/database.sqlite" });
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('balance')
		.setDescription('💸 balance. economy command')
  .addUserOption(option => option.setName('user').setDescription('Give Me A User')),
                   
	async execute(interaction, client) {

    await interaction.deferReply();

const economy = db.table("economy");
    
    const user = interaction.options.getUser('user');

let bal2 = await economy.get(`${interaction.user.id}.balance`)

if (bal2 === undefined) bal2 = 0;

let bank2 = await economy.get(`${interaction.user.id}.bank`)
    
if (bank2 === undefined) bank2 = 0;

let Total2 = bal2 + bank2

    
const embed0 = new EmbedBuilder()
  .setColor(embeds.color)
.setDescription(`**Your Balance**\n**Pocket:** ${emojis.troll_coin} ${bal2}\n**Troll Bank:** ${emojis.troll_coin} ${bank2}\n**Total:** ${emojis.troll_coin} ${Total2}`)
.setFooter({text: `${embeds.footer}`});

if (!user) return interaction.editReply({embeds: [embed0]});
    
let bal = await economy.get(`${user.id}.balance`)

if (bal === undefined) bal = 0;

let bank = await economy.get(`${user.id}.bank`)
    
if (bank === undefined) bank = 0;

let Total = bal + bank

    const embed = new EmbedBuilder()
  .setColor(embeds.color)
.setDescription(`**${user.username}'s Balance**\n**Pocket:** ${emojis.troll_coin} ${bal}\n**Troll Bank:** ${emojis.troll_coin} ${bank}\n**Total:** ${emojis.troll_coin} ${Total}`)
.setFooter({text: `${embeds.footer}`});

  return interaction.editReply({embeds: [embed]});


	},
}