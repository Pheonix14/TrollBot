const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB({ filePath: "././database/database.sqlite" });
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");
const prices = require("./../JSON/prices.json");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('buy')
		.setDescription('🛒 buy something from store')
     .addStringOption(option => option.setName('item').setDescription('Give Me A Item To Buy').setRequired(true)
  .addChoices(
				{ name: 'Phone', value: 'phone' },
				{ name: 'Laptop', value: 'laptop' },
				{ name: 'Shovel', value: 'shovel' },
    { name: 'Fishing Rod', value: 'rod' },
{ name: 'Bank Upgrader', value: 'bank' },
))
  .addNumberOption(option => option.setName('quantity').setDescription('A Quantity You Want To Buy')),
	async execute(interaction, client) {

const user = interaction.user;

await interaction.deferReply();

    const economy = db.table("economy");

let register = await economy.get(`${user.id}.register`)

if (register === undefined) register = 'false';
    
    if (register === 'false') {
return interaction.editReply(`${emojis.cross} Use /register To Register Your Account In My Database`)
    }
    
    const item = interaction.options.getString('item');

    let quantity = interaction.options.getNumber('quantity');

let balance = await economy.get(`${user.id}.balance`);


  if (balance === undefined) balance = 0;

    if (quantity === null) quantity = 1;
    
if (quantity === 0) quantity = 1;
    
if (item === 'phone') {

let totalph = prices.phone * quantity
  
if (balance < totalph) return interaction.editReply({content: "You didn't Have Enough Money To Buy It", ephemeral: true })

  await economy.add(`${user.id}.phone`, quantity)

  await economy.add(`${user.id}.inventory_worth`, totalph)

await economy.sub(`${user.id}.balance`, totalph)
  
  let embedph = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`Purchased ${quantity}x Phone ${emojis.phone} For ${emojis.troll_coin} ${totalph}`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedph]})
}

if (item === 'laptop') {

let totallap = prices.laptop * quantity
  
if (balance < totallap) return interaction.editReply({content: "You didn't Have Enough Money To Buy It", ephemeral: true })

  await economy.add(`${user.id}.laptop`, quantity)

await economy.add(`${user.id}.inventory_worth`, totallap)
  
await economy.sub(`${user.id}.balance`, totallap)
  
  let embedlap = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`Purchased ${quantity}x Laptop ${emojis.laptop} For ${emojis.troll_coin} ${totallap}`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedlap]})
}
    
if (item === 'shovel') {

let totalsho = prices.shovel * quantity
  
if (balance < totalsho) return interaction.editReply({content: "You didn't Have Enough Money To Buy It", ephemeral: true })

  await economy.add(`${user.id}.shovel`, quantity)

await economy.add(`${user.id}.inventory_worth`, totalsho)
  
await economy.sub(`${user.id}.balance`, totalsho)
  
  let embedsho = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`Purchased ${quantity}x Shovel ${emojis.shovel} For ${emojis.troll_coin} ${totalsho}`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedsho]})
}

if (item === 'rod') {
  
let totalrod = prices.fishing_rod * quantity

if (balance < totalrod) return interaction.editReply({content: "You didn't Have Enough Money To Buy It", ephemeral: true })

  await economy.add(`${user.id}.fishing_rod`, quantity)

await economy.add(`${user.id}.inventory_worth`, totalrod)
  
await economy.sub(`${user.id}.balance`, totalrod)
  
  let embedfis = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`Purchased ${quantity}x Fishing Rod ${emojis.fishing_rod} For ${emojis.troll_coin} ${totalrod}`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedfis]})
}


if (item === 'bank') {

let totalbank = prices.bank_upgrader * quantity
  
if (balance < totalbank) return interaction.editReply({content: "You didn't Have Enough Money To Buy It", ephemeral: true })

  await economy.add(`${user.id}.bank_upgrader`, quantity)

await economy.add(`${user.id}.inventory_worth`, totalbank)
  
await economy.sub(`${user.id}.balance`, totalbank)
  
  let embedbank = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`Purchased ${quantity}x Bank Upgrader ${emojis.bank_upgrader} For ${emojis.troll_coin} ${totalbank}`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedtotal]})
                          }
    
	},
}