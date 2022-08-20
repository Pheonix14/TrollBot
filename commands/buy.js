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
)),
	async execute(interaction, client) {

const user = interaction.user;

await interaction.deferReply();

    const economy = db.table("economy");
    
    const item = interaction.options.getString('item');


let balance = await economy.get(`${user.id}.balance`);


  if (balance === undefined) balance = 0;

    
if (item === 'phone') {
  
if (balance < prices.phone) return interaction.editReply({content: "You didn't Have Enough Money To Buy It", ephemeral: true })

  await economy.add(`${user.id}.phone`, 1)

  await economy.add(`${user.id}.inventory_worth`, prices.phone)

await economy.sub(`${user.id}.balance`, prices.phone)
  
  let embedph = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`Purchased A Phone ${emojis.phone} For ${emojis.troll_coin} ${prices.phone}`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedph]})
}

if (item === 'laptop') {
  
if (balance < prices.laptop) return interaction.editReply({content: "You didn't Have Enough Money To Buy It", ephemeral: true })

  await economy.add(`${user.id}.laptop`, 1)

await economy.add(`${user.id}.inventory_worth`, prices.laptop)
  
await economy.sub(`${user.id}.balance`, prices.phone)
  
  let embedlap = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`Purchased A Laptop ${emojis.laptop} For ${emojis.troll_coin} ${prices.laptop}`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedlap]})
}
    
if (item === 'shovel') {
  
if (balance < prices.shovel) return interaction.editReply({content: "You didn't Have Enough Money To Buy It", ephemeral: true })

  await economy.add(`${user.id}.shovel`, 1)

await economy.add(`${user.id}.inventory_worth`, prices.shovel)
  
await economy.sub(`${user.id}.balance`, prices.shovel)
  
  let embedsho = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`Purchased A Shovel ${emojis.shovel} For ${emojis.troll_coin} ${prices.shovel}`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedsho]})
}

if (item === 'rod') {
  
if (balance < prices.fishing_rod) return interaction.editReply({content: "You didn't Have Enough Money To Buy It", ephemeral: true })

  await economy.add(`${user.id}.fishing_rod`, 1)

await economy.add(`${user.id}.inventory_worth`, prices.fishing_rod)
  
await economy.sub(`${user.id}.balance`, prices.shovel)
  
  let embedfis = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`Purchased A Fishing Rod ${emojis.fishing_rod} For ${emojis.troll_coin} ${prices.fishing_rod}`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedfis]})
}


if (item === 'bank') {
  
if (balance < prices.bank_upgrader) return interaction.editReply({content: "You didn't Have Enough Money To Buy It", ephemeral: true })

  await economy.add(`${user.id}.bank_upgrader`, 1)

await economy.add(`${user.id}.inventory_worth`, prices.bank_upgrader)
  
await economy.sub(`${user.id}.balance`, prices.shovel)
  
  let embedfis = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`Purchased A Bank Upgrader ${emojis.bank_upgrader} For ${emojis.troll_coin} ${prices.bank_upgrader}`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedfis]})
                          }
    
	},
}