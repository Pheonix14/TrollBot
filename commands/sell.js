const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB({ filePath: "././database/database.sqlite" });
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");
const prices = require("./../JSON/prices.json");
const values = require("./../JSON/values.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sell')
		.setDescription('💰 sell something')
     .addStringOption(option => option.setName('item').setDescription('Give Me A Item To Buy').setRequired(true)
  .addChoices(
				{ name: 'Phone', value: 'phone' },
				{ name: 'Laptop', value: 'laptop' },
				{ name: 'Shovel', value: 'shovel' },
    { name: 'Fishing Rod', value: 'rod' },
{ name: 'Bank Upgrader', value: 'bank' },
))
  .addNumberOption(option => option.setName('quantity').setDescription('A Quantity You Want To Sell')),
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
    

if (item === 'phone') {

  let phone = await economy.get(`${user.id}.phone`)
  
if (phone < quantity) return interaction.editReply({content: "You didn't Have That Much Phone To Sell", ephemeral: true })

let totalph = values.phone * quantity;

  await economy.sub(`${user.id}.phone`, quantity)

  await economy.sub(`${user.id}.inventory_worth`, prices.phone)

await economy.add(`${user.id}.balance`, totalph)
  
  let embedph = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`Selled ${quantity}x Phone ${emojis.phone} For ${emojis.troll_coin} ${totalph}`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedph]})
}


if (item === 'laptop') {

  let laptop = await economy.get(`${user.id}.laptop`)
  
if (laptop < quantity) return interaction.editReply({content: "You didn't Have That Much Laptop To Sell", ephemeral: true })

let totallap = values.laptop * quantity;

  await economy.sub(`${user.id}.laptop`, quantity)

  await economy.sub(`${user.id}.inventory_worth`, prices.laptop)

await economy.add(`${user.id}.balance`, totallap)
  
  let embedlap = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`Selled ${quantity}x Laptop ${emojis.laptop} For ${emojis.troll_coin} ${totallap}`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedlap]})
}

if (item === 'shovel') {

  let shovel = await economy.get(`${user.id}.shovel`)
  
if (shovel < quantity) return interaction.editReply({content: "You didn't Have That Much Shovel To Sell", ephemeral: true })

let totalsho = values.shovel * quantity;

  await economy.sub(`${user.id}.shovel`, quantity)

  await economy.sub(`${user.id}.inventory_worth`, prices.shovel)

await economy.add(`${user.id}.balance`, totalsho)
  
  let embedsho = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`Selled ${quantity}x Shovel ${emojis.shovel} For ${emojis.troll_coin} ${totalsho}`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedsho]})
}


if (item === 'rod') {

  let fishing_rod = await economy.get(`${user.id}.fishing_rod`)
  
if (fishing_rod < quantity) return interaction.editReply({content: "You didn't Have That Much Fishing Rod To Sell", ephemeral: true })

let totalrod = values.fishing_rod * quantity;

  await economy.sub(`${user.id}.fishing_rod`, quantity)

  await economy.sub(`${user.id}.inventory_worth`, prices.fishing_rod)

await economy.add(`${user.id}.balance`, totalrod)
  
  let embedrod = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`Selled ${quantity}x Fishing Rod ${emojis.fishing_rod} For ${emojis.troll_coin} ${totalrod}`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedrod]})
}

if (item === 'bank') {

  let bank = await economy.get(`${user.id}.bank_upgrader`)
  
if (bank < quantity) return interaction.editReply({content: "You didn't Have That Much Bank Upgrader To Sell", ephemeral: true })

let totalbank = values.bank_upgrader * quantity;

  await economy.sub(`${user.id}.bank_upgrader`, quantity)

  await economy.sub(`${user.id}.inventory_worth`, prices.bank_upgrader)

await economy.add(`${user.id}.balance`, totalbank)
  
  let embedbank = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`Selled ${quantity}x Bank Upgrader ${emojis.bank_upgrader} For ${emojis.troll_coin} ${totalbank}`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedbank]})
}

	},
}