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
    { name: 'Junk', value: 'junk' },
    { name: 'Common Fish', value: 'common' },
    { name: 'Uncommon Fish', value: 'uncommon' },
    { name: 'Rare Fish', value: 'rare' },
    { name: 'Legendary Fish', value: 'legendary' },
    { name: 'Dirt', value: 'dirt' },
    { name: 'Sand', value: 'sand' },
    { name: 'Worm', value: 'worm' },
    { name: 'Iron', value: 'iron' },
    { name: 'Fossil', value: 'fossil' },
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
    
if (quantity === 0) quantity = 1;

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


if (item === 'junk') {

  let junk = await economy.get(`${user.id}.junk`)
  
if (junk < quantity) return interaction.editReply({content: "You didn't Have That Much Junk To Sell", ephemeral: true })

let totaljunk = values.junk * quantity;

  await economy.sub(`${user.id}.junk`, quantity)

  await economy.sub(`${user.id}.inventory_worth`, values.junk)

await economy.add(`${user.id}.balance`, totaljunk)
  
  let embedjunk = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`Selled ${quantity}x Junk ${emojis.junk} For ${emojis.troll_coin} ${totaljunk}`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedjunk]})
}


if (item === 'common') {

  let common = await economy.get(`${user.id}.common_fish`)
  
if (common < quantity) return interaction.editReply({content: "You didn't Have That Much Common Fish To Sell", ephemeral: true })

let totalcom = values.common_fish * quantity;

  await economy.sub(`${user.id}.common_fish`, quantity)

  await economy.sub(`${user.id}.inventory_worth`, values.common_fiah)

await economy.add(`${user.id}.balance`, totalcom)
  
  let embedcom = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`Selled ${quantity}x Common Fish ${emojis.common_fish} For ${emojis.troll_coin} ${totalcom}`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedcom]})
}

if (item === 'uncommon') {

  let uncom = await economy.get(`${user.id}.uncommon_fish`)
  
if (uncom < quantity) return interaction.editReply({content: "You didn't Have That Much Uncommon Fish To Sell", ephemeral: true })

let totaluncom = values.uncommon_fish * quantity;

  await economy.sub(`${user.id}.uncommon_fish`, quantity)

  await economy.sub(`${user.id}.inventory_worth`, values.uncommon_fish)

await economy.add(`${user.id}.balance`, totaluncom)
  
  let embeduncom = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`Selled ${quantity}x Uncommon Fish ${emojis.uncommon_fish} For ${emojis.troll_coin} ${totaluncom}`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embeduncom]})
}
 
if (item === 'rare') {

  let rare = await economy.get(`${user.id}.rare_fish`)
  
if (rare < quantity) return interaction.editReply({content: "You didn't Have That Much Rare Fish To Sell", ephemeral: true })

let totalrare = values.rare_fish * quantity;

  await economy.sub(`${user.id}.rare_fish`, quantity)

  await economy.sub(`${user.id}.inventory_worth`, values.rare_fish)

await economy.add(`${user.id}.balance`, totalrare)
  
  let embedrare = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`Selled ${quantity}x Rare Fish ${emojis.rare_fish} For ${emojis.troll_coin} ${totalrare}`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedrare]})
}
   

if (item === 'legendary') {

  let leg = await economy.get(`${user.id}.legendary_fish`)
  
if (leg < quantity) return interaction.editReply({content: "You didn't Have That Much Legendary Fish To Sell", ephemeral: true })

let totalleg = values.legendary_fish * quantity;

  await economy.sub(`${user.id}.legendary_fish`, quantity)

  await economy.sub(`${user.id}.inventory_worth`, values.legendary_fish)

await economy.add(`${user.id}.balance`, totalleg)
  
  let embedleg = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`Selled ${quantity}x Legendary Fish ${emojis.legendary_fish} For ${emojis.troll_coin} ${totalleg}`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedleg]})
}

if (item === 'dirt') {

  let dirt = await economy.get(`${user.id}.dirt`)
  
if (dirt < quantity) return interaction.editReply({content: "You didn't Have That Much dirt To Sell", ephemeral: true })

let totaldirt = values.dirt * quantity;

  await economy.sub(`${user.id}.dirt`, quantity)

  await economy.sub(`${user.id}.inventory_worth`, values.dirt)

await economy.add(`${user.id}.balance`, totaldirt)
  
  let embeddirt = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`Selled ${quantity}x Dirt ${emojis.dirt} For ${emojis.troll_coin} ${totaldirt}`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embeddirt]})
}

    if (item === 'sand') {

  let sand = await economy.get(`${user.id}.sand`)
  
if (sand < quantity) return interaction.editReply({content: "You didn't Have That Much Sand To Sell", ephemeral: true })

let totalsand = values.sand * quantity;

  await economy.sub(`${user.id}.sand`, quantity)

  await economy.sub(`${user.id}.inventory_worth`, values.sand)

await economy.add(`${user.id}.balance`, totalsand)
  
  let embedsand = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`Selled ${quantity}x Sand ${emojis.sand} For ${emojis.troll_coin} ${totalsand}`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedsand]})
}

if (item === 'worm') {

  let worm = await economy.get(`${user.id}.worm`)
  
if (worm < quantity) return interaction.editReply({content: "You didn't Have That Much Worm To Sell", ephemeral: true })

let totalworm = values.worm * quantity;

  await economy.sub(`${user.id}.worm`, quantity)

  await economy.sub(`${user.id}.inventory_worth`, values.worm)

await economy.add(`${user.id}.balance`, totalworm)
  
  let embedworm = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`Selled ${quantity}x Worm ${emojis.worm} For ${emojis.troll_coin} ${totalworm}`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedworm]})
}

if (item === 'iron') {

  let iron = await economy.get(`${user.id}.iron`)
  
if (iron < quantity) return interaction.editReply({content: "You didn't Have That Much Iron To Sell", ephemeral: true })

let totaliron = values.iron * quantity;

  await economy.sub(`${user.id}.iron`, quantity)

  await economy.sub(`${user.id}.inventory_worth`, values.iron)

await economy.add(`${user.id}.balance`, totaliron)
  
  let embediron = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`Selled ${quantity}x Iron ${emojis.iron} For ${emojis.troll_coin} ${totaliron}`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embediron]})
}
    
if (item === 'fossil') {

  let fossil = await economy.get(`${user.id}.fossil`)
  
if (fossil < quantity) return interaction.editReply({content: "You didn't Have That Much Fossil To Sell", ephemeral: true })

let totalfossil = values.fossil * quantity;

  await economy.sub(`${user.id}.fossil`, quantity)

  await economy.sub(`${user.id}.inventory_worth`, values.fossil)

await economy.add(`${user.id}.balance`, totalfossil)
  
  let embedfossil = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`Selled ${quantity}x Fossil ${emojis.fossil} For ${emojis.troll_coin} ${totalfossil}`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedfossil]})
}

	},
}