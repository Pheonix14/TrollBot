const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");
const prices = require("./../JSON/prices.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('use')
		.setDescription('🏦 use a item')
   .addStringOption(option => option.setName('item').setDescription('Give Me A Item To use').setRequired(true)
  .addChoices({ name: 'Bank Upgrader', value: 'bank' },
              { name: 'Starter Kit', value: 'starter_kit' },

))
  .addNumberOption(option => option.setName('quantity').setDescription('A Quantity You Want To Use')),
	async execute(interaction, client) {

const db = require("./../database/connect.js");
    
  

const currency = db.table("currency");

const settings = db.table("settings");

const items = db.table("items");

let register = await settings.get(`${interaction.user.id}.register`)

if (register === undefined) register = 'false';
    
    if (register === 'false') {
return interaction.editReply(`${emojis.cross} Use /register To Register Your Account In My Database`)
    }
    
const item = interaction.options.getString('item');

let quantity = interaction.options.getNumber('quantity');

if (quantity === null) quantity = 1;
    
if (quantity === 0) quantity = 1;

if (item === 'bank') {

let bank_upgrader = await items.get(`${interaction.user.id}.bank_upgrader`)

if (bank_upgrader === undefined) bank_upgrader = 0;
  
if (bank_upgrader < quantity) return interaction.editReply({content: "You didn't Have That Much Bank Upgrader To Use", ephemeral: true })

const random = Math.floor(Math.random() * (110000 -  + 80000)) + 80000;

let totalbank = random * quantity;

await items.sub(`${interaction.user.id}.bank_upgrader`, quantity)

  await currency.sub(`${interaction.user.id}.inventory_worth`, prices.bank_upgrader)
  
  await currency.add(`${interaction.user.id}.bank_space`, totalbank)

  
  let embed1 = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`You Used ${quantity}x Bank Upgrader ${emojis.bank_upgrader} And Got ${emojis.troll_coin} ${totalbank} Bank Space`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embed1]})
}

if (item === 'starter_kit') {

let starter_kit = await items.get(`${interaction.user.id}.starter_kit`)

if (starter_kit === undefined) starter_kit = 0;
  
if (starter_kit < quantity) return interaction.editReply({content: "You didn't Have That Much Starter Kit To Use", ephemeral: true })

  let totalbal = 50000 * quantity;

await items.sub(`${interaction.user.id}.starter_kit`, quantity)
  
  await currency.add(`${interaction.user.id}.balance`, totalbal)

await items.add(`${interaction.user.id}.shovel`, quantity)

await items.add(`${interaction.user.id}.fishing_rod`, quantity)

await items.add(`${interaction.user.id}.phone`, quantity)
  
  let embed2 = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`You Used ${quantity}x Starter Kit ${emojis.starter_kit} And Got

+ ${emojis.troll_coin} ${totalbal}
+ x${quantity} ${emojis.shovel} Shovel
+ x${quantity} ${emojis.fishing_rod} Fishing Rod
+ x${quantity} ${emojis.phone} Phone`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embed2]})
}

    
	},
}