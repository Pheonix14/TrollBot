const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB({ filePath: "././database/database.sqlite" });
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");
const prices = require("./../JSON/prices.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('use')
		.setDescription('🏦 use a item')
   .addStringOption(option => option.setName('item').setDescription('Give Me A Item To use').setRequired(true)
  .addChoices(
{ name: 'Bank Upgrader', value: 'bank' },
))
  .addNumberOption(option => option.setName('quantity').setDescription('A Quantity You Want To Use')),
	async execute(interaction, client) {
  
  await interaction.deferReply();

const economy = db.table("economy");

let register = await economy.get(`${interaction.user.id}.register`)

if (register === undefined) register = 'false';
    
    if (register === 'false') {
return interaction.editReply(`${emojis.cross} Use /register To Register Your Account In My Database`)
    }
    
const item = interaction.options.getString('item');

let quantity = interaction.options.getNumber('quantity');

if (quantity === null) quantity = 1;
    
if (quantity === 0) quantity = 1;
    
  let bank_upgrader = await economy.get(`${interaction.user.id}.bank_upgrader`)

if (bank_upgrader === undefined) bank_upgrader = 0;

if (item === 'bank') {
  
if (bank_upgrader < quantity) return interaction.editReply({content: "You didn't Have That Much Bank Upgrader To Use", ephemeral: true })

const random = Math.floor(Math.random() * (110000 -  + 80000)) + 80000;

let totalbank = random * quantity;
  
  await economy.add(`${interaction.user.id}.bank_space`, totalbank)


await economy.sub(`${interaction.user.id}.bank_upgrader`, quantity)

  await economy.sub(`${interaction.user.id}.inventory_worth`, prices.bank_upgrader)
  
  let embed1 = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`You Used ${quantity}x Bank Upgrader ${emojis.bank_upgrader} And Got ${emojis.troll_coin} ${totalbank} Bank Space`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embed1]})
}

	},
}