const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
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
    { name: 'Toilet Paper', value: 'toilet_paper' },
    { name: 'Cool Meow', value: 'cool_meow' },
    { name: 'Troll Sword', value: 'troll_sword' },
    { name: 'Golden Troll Coin', value: 'golden_troll_coin' },
    { name: 'Troll Crown', value: 'troll_crown' },
))
  .addNumberOption(option => option.setName('quantity').setDescription('A Quantity You Want To Buy')),
	async execute(interaction, client) {

const db = require("./../database/connect.js");
    
const user = interaction.user;



    const currency = db.table("currency");

const items = db.table("items");

const settings = db.table("settings");

let register = await settings.get(`${user.id}.register`)

if (register === undefined) register = 'false';
    
    if (register === 'false') {
return interaction.editReply(`${emojis.cross} Use /register To Register Your Account In My Database`)
    }
    
    const item = interaction.options.getString('item');

    let quantity = interaction.options.getNumber('quantity');

let balance = await currency.get(`${user.id}.balance`);


  if (balance === undefined) balance = 0;

    if (quantity === null) quantity = 1;
    
if (quantity === 0) quantity = 1;
    
if (item === 'phone') {

let totalph = prices.phone * quantity
  
if (balance < totalph) return interaction.editReply({content: "You didn't Have Enough Money To Buy It", ephemeral: true })

  await items.add(`${user.id}.phone`, quantity)

  await currency.add(`${user.id}.inventory_worth`, totalph)

await currency.sub(`${user.id}.balance`, totalph)
  
  let embedph = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`Purchased ${quantity}x Phone ${emojis.phone} For ${emojis.troll_coin} ${totalph}`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedph]})
}

if (item === 'laptop') {

let totallap = prices.laptop * quantity
  
if (balance < totallap) return interaction.editReply({content: "You didn't Have Enough Money To Buy It", ephemeral: true })

  await items.add(`${user.id}.laptop`, quantity)

await currency.add(`${user.id}.inventory_worth`, totallap)
  
await currency.sub(`${user.id}.balance`, totallap)
  
  let embedlap = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`Purchased ${quantity}x Laptop ${emojis.laptop} For ${emojis.troll_coin} ${totallap}`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedlap]})
}
    
if (item === 'shovel') {

let totalsho = prices.shovel * quantity
  
if (balance < totalsho) return interaction.editReply({content: "You didn't Have Enough Money To Buy It", ephemeral: true })

  await items.add(`${user.id}.shovel`, quantity)

await currency.add(`${user.id}.inventory_worth`, totalsho)
  
await currency.sub(`${user.id}.balance`, totalsho)
  
  let embedsho = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`Purchased ${quantity}x Shovel ${emojis.shovel} For ${emojis.troll_coin} ${totalsho}`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedsho]})
}

if (item === 'rod') {
  
let totalrod = prices.fishing_rod * quantity

if (balance < totalrod) return interaction.editReply({content: "You didn't Have Enough Money To Buy It", ephemeral: true })

  await items.add(`${user.id}.fishing_rod`, quantity)

await currency.add(`${user.id}.inventory_worth`, totalrod)
  
await currency.sub(`${user.id}.balance`, totalrod)
  
  let embedfis = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`Purchased ${quantity}x Fishing Rod ${emojis.fishing_rod} For ${emojis.troll_coin} ${totalrod}`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedfis]})
}


if (item === 'bank') {

let totalbank = prices.bank_upgrader * quantity
  
if (balance < totalbank) return interaction.editReply({content: "You didn't Have Enough Money To Buy It", ephemeral: true })

  await items.add(`${user.id}.bank_upgrader`, quantity)

await currency.add(`${user.id}.inventory_worth`, totalbank)
  
await currency.sub(`${user.id}.balance`, totalbank)
  
  let embedbank = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`Purchased ${quantity}x Bank Upgrader ${emojis.bank_upgrader} For ${emojis.troll_coin} ${totalbank}`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedbank]})
                          }

    if (item === 'toilet_paper') {

let totaltp = prices.toilet_paper * quantity
  
if (balance < totaltp) return interaction.editReply({content: "You didn't Have Enough Money To Buy It", ephemeral: true })

  await items.add(`${user.id}.toilet_paper`, quantity)

await currency.add(`${user.id}.inventory_worth`, totaltp)
  
await currency.sub(`${user.id}.balance`, totaltp)
  
  let embedtp = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`Purchased ${quantity}x Toilet Paper ${emojis.toilet_paper} For ${emojis.troll_coin} ${totaltp}`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedtp]})
    }
    

if (item === 'cool_meow') {

let totalmeow = prices.cool_meow * quantity
  
if (balance < totalmeow) return interaction.editReply({content: "You didn't Have Enough Money To Buy It", ephemeral: true })

  await items.add(`${user.id}.cool_meow`, quantity)

await currency.add(`${user.id}.inventory_worth`, totalmeow)
  
await currency.sub(`${user.id}.balance`, totalmeow)
  
  let embedmeow = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`Purchased ${quantity}x Cool Meow ${emojis.cool_meow} For ${emojis.troll_coin} ${totalmeow}`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedmeow]})
}

if (item === 'troll_sword') {

let totalts = prices.troll_sword * quantity
  
if (balance < totalts) return interaction.editReply({content: "You didn't Have Enough Money To Buy It", ephemeral: true })

  await items.add(`${user.id}.troll_sword`, quantity)

await currency.add(`${user.id}.inventory_worth`, totalts)
  
await currency.sub(`${user.id}.balance`, totalts)
  
  let embedts = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`Purchased ${quantity}x Troll Sword ${emojis.troll_sword} For ${emojis.troll_coin} ${totalts}`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedts]})
}


if (item === 'golden_troll_coin') {

let totalgtc = prices.golden_troll_coin * quantity
  
if (balance < totalgtc) return interaction.editReply({content: "You didn't Have Enough Money To Buy It", ephemeral: true })

  await items.add(`${user.id}.golden_troll_coin`, quantity)

await currency.add(`${user.id}.inventory_worth`, totalgtc)
  
await currency.sub(`${user.id}.balance`, totalgtc)
  
  let embedgtc = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`Purchased ${quantity}x Golden Troll Coin ${emojis.golden_troll_coin} For ${emojis.troll_coin} ${totalgtc}`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedgtc]})
}


    if (item === 'troll_crown') {

let totalcrown = prices.troll_crown * quantity
  
if (balance < totalcrown) return interaction.editReply({content: "You didn't Have Enough Money To Buy It", ephemeral: true })

let crowns = await items.get(`${user.id}.troll_crown`)

if (crowns > 10) return interaction.editReply({content: "You Cannot Buy More Then 10 Crowns", ephemeral: true })
      
  await items.add(`${user.id}.troll_crown`, quantity)

await currency.add(`${user.id}.inventory_worth`, totalcrown)
  
await currency.sub(`${user.id}.balance`, totalcrown)
  
  let embedcrown = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`Purchased ${quantity}x Troll Crown ${emojis.troll_crown} For ${emojis.troll_coin} ${totalcrown}`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedcrown]})
    }

	},
}