const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
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
    { name: "Jack-o'-lantern", value: 'jacko' },
    { name: 'Toilet Paper', value: 'toilet_paper' },
    { name: 'Cool Meow', value: 'cool_meow' },
    { name: 'Troll Sword', value: 'troll_sword' },
    { name: 'Golden Troll Coin', value: 'golden_troll_coin' },
    { name: 'Troll Crown', value: 'troll_crown' },
))
  .addNumberOption(option => option.setName('quantity').setDescription('A Quantity You Want To Sell')),
	async execute(interaction, client) {

const db = require("./../database/connect.js");
    
const user = interaction.user;


const items = db.table("items")

    const currency = db.table("currency");

const settings = db.table("settings");

let register = await settings.get(`${user.id}.register`)

if (register === undefined) register = 'false';
    
    if (register === 'false') {
return interaction.editReply(`**${emojis.cross} Use /register To Register Your Account In My Database**`)
    }
    
    const item = interaction.options.getString('item');

    let quantity = interaction.options.getNumber('quantity');

let balance = await currency.get(`${user.id}.balance`);


  if (balance === undefined) balance = 0;

    if (quantity === null) quantity = 1;
    
if (quantity === 0) quantity = 1;

if (item === 'phone') {

  let phone = await items.get(`${user.id}.phone`)
  
if (phone < quantity) return interaction.editReply({content: "**You didn't Have That Much Phone To Sell**", ephemeral: true })

let totalph = values.phone * quantity;

  await items.sub(`${user.id}.phone`, quantity)

  await currency.sub(`${user.id}.inventory_worth`, prices.phone)

await currency.add(`${user.id}.balance`, totalph)
  
  let embedph = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`**Selled ${quantity}x Phone ${emojis.phone} For ${emojis.troll_coin} ${totalph}**`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedph]})
}


if (item === 'laptop') {

  let laptop = await items.get(`${user.id}.laptop`)
  
if (laptop < quantity) return interaction.editReply({content: "**You didn't Have That Much Laptop To Sell**", ephemeral: true })

let totallap = values.laptop * quantity;

  await items.sub(`${user.id}.laptop`, quantity)

  await currency.sub(`${user.id}.inventory_worth`, prices.laptop)

await currency.add(`${user.id}.balance`, totallap)
  
  let embedlap = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`**Selled ${quantity}x Laptop ${emojis.laptop} For ${emojis.troll_coin} ${totallap}**`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedlap]})
}

if (item === 'shovel') {

  let shovel = await items.get(`${user.id}.shovel`)
  
if (shovel < quantity) return interaction.editReply({content: "**You didn't Have That Much Shovel To Sell**", ephemeral: true })

let totalsho = values.shovel * quantity;

  await items.sub(`${user.id}.shovel`, quantity)

  await currency.sub(`${user.id}.inventory_worth`, prices.shovel)

await currency.add(`${user.id}.balance`, totalsho)
  
  let embedsho = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`**Selled ${quantity}x Shovel ${emojis.shovel} For ${emojis.troll_coin} ${totalsho}**`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedsho]})
}


if (item === 'rod') {

  let fishing_rod = await items.get(`${user.id}.fishing_rod`)
  
if (fishing_rod < quantity) return interaction.editReply({content: "**You didn't Have That Much Fishing Rod To Sell**", ephemeral: true })

let totalrod = values.fishing_rod * quantity;

  await items.sub(`${user.id}.fishing_rod`, quantity)

  await currency.sub(`${user.id}.inventory_worth`, prices.fishing_rod)

await currency.add(`${user.id}.balance`, totalrod)
  
  let embedrod = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`**Selled ${quantity}x Fishing Rod ${emojis.fishing_rod} For ${emojis.troll_coin} ${totalrod}**`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedrod]})
}

if (item === 'bank') {

  let bank = await items.get(`${user.id}.bank_upgrader`)
  
if (bank < quantity) return interaction.editReply({content: "**You didn't Have That Much Bank Upgrader To Sell**", ephemeral: true })

let totalbank = values.bank_upgrader * quantity;

  await items.sub(`${user.id}.bank_upgrader`, quantity)

  await currency.sub(`${user.id}.inventory_worth`, prices.bank_upgrader)

await currency.add(`${user.id}.balance`, totalbank)
  
  let embedbank = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`**Selled ${quantity}x Bank Upgrader ${emojis.bank_upgrader} For ${emojis.troll_coin} ${totalbank}**`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedbank]})
}


if (item === 'junk') {

  let junk = await items.get(`${user.id}.junk`)
  
if (junk < quantity) return interaction.editReply({content: "**You didn't Have That Much Junk To Sell**", ephemeral: true })

let totaljunk = values.junk * quantity;

  await items.sub(`${user.id}.junk`, quantity)

  await currency.sub(`${user.id}.inventory_worth`, values.junk)

await currency.add(`${user.id}.balance`, totaljunk)
  
  let embedjunk = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`**Selled ${quantity}x Junk ${emojis.junk} For ${emojis.troll_coin} ${totaljunk}**`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedjunk]})
}


if (item === 'common') {

  let common = await items.get(`${user.id}.common_fish`)
  
if (common < quantity) return interaction.editReply({content: "**You didn't Have That Much Common Fish To Sell**", ephemeral: true })

let totalcom = values.common_fish * quantity;

  await items.sub(`${user.id}.common_fish`, quantity)

  await currency.sub(`${user.id}.inventory_worth`, values.common_fish)

await currency.add(`${user.id}.balance`, totalcom)
  
  let embedcom = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`**Selled ${quantity}x Common Fish ${emojis.common_fish} For ${emojis.troll_coin} ${totalcom}**`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedcom]})
}

if (item === 'uncommon') {

  let uncom = await items.get(`${user.id}.uncommon_fish`)
  
if (uncom < quantity) return interaction.editReply({content: "**You didn't Have That Much Uncommon Fish To Sell**", ephemeral: true })

let totaluncom = values.uncommon_fish * quantity;

  await items.sub(`${user.id}.uncommon_fish`, quantity)

  await currency.sub(`${user.id}.inventory_worth`, values.uncommon_fish)

await currency.add(`${user.id}.balance`, totaluncom)
  
  let embeduncom = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`**Selled ${quantity}x Uncommon Fish ${emojis.uncommon_fish} For ${emojis.troll_coin} ${totaluncom}**`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embeduncom]})
}
 
if (item === 'rare') {

  let rare = await items.get(`${user.id}.rare_fish`)
  
if (rare < quantity) return interaction.editReply({content: "**You didn't Have That Much Rare Fish To Sell**", ephemeral: true })

let totalrare = values.rare_fish * quantity;

  await items.sub(`${user.id}.rare_fish`, quantity)

  await currency.sub(`${user.id}.inventory_worth`, values.rare_fish)

await currency.add(`${user.id}.balance`, totalrare)
  
  let embedrare = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`**Selled ${quantity}x Rare Fish ${emojis.rare_fish} For ${emojis.troll_coin} ${totalrare}**`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedrare]})
}
   

if (item === 'legendary') {

  let leg = await items.get(`${user.id}.legendary_fish`)
  
if (leg < quantity) return interaction.editReply({content: "**You didn't Have That Much Legendary Fish To Sell**", ephemeral: true })

let totalleg = values.legendary_fish * quantity;

  await items.sub(`${user.id}.legendary_fish`, quantity)

  await currency.sub(`${user.id}.inventory_worth`, values.legendary_fish)

await currency.add(`${user.id}.balance`, totalleg)
  
  let embedleg = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`**Selled ${quantity}x Legendary Fish ${emojis.legendary_fish} For ${emojis.troll_coin} ${totalleg}**`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedleg]})
}

if (item === 'dirt') {

  let dirt = await items.get(`${user.id}.dirt`)
  
if (dirt < quantity) return interaction.editReply({content: "**You didn't Have That Much dirt To Sell**", ephemeral: true })

let totaldirt = values.dirt * quantity;

  await items.sub(`${user.id}.dirt`, quantity)

  await currency.sub(`${user.id}.inventory_worth`, values.dirt)

await currency.add(`${user.id}.balance`, totaldirt)
  
  let embeddirt = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`**Selled ${quantity}x Dirt ${emojis.dirt} For ${emojis.troll_coin} ${totaldirt}**`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embeddirt]})
}

    if (item === 'sand') {

  let sand = await items.get(`${user.id}.sand`)
  
if (sand < quantity) return interaction.editReply({content: "**You didn't Have That Much Sand To Sell**", ephemeral: true })

let totalsand = values.sand * quantity;

  await items.sub(`${user.id}.sand`, quantity)

  await currency.sub(`${user.id}.inventory_worth`, values.sand)

await currency.add(`${user.id}.balance`, totalsand)
  
  let embedsand = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`**Selled ${quantity}x Sand ${emojis.sand} For ${emojis.troll_coin} ${totalsand}**`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedsand]})
}

if (item === 'worm') {

  let worm = await items.get(`${user.id}.worm`)
  
if (worm < quantity) return interaction.editReply({content: "**You didn't Have That Much Worm To Sell**", ephemeral: true })

let totalworm = values.worm * quantity;

  await items.sub(`${user.id}.worm`, quantity)

  await currency.sub(`${user.id}.inventory_worth`, values.worm)

await currency.add(`${user.id}.balance`, totalworm)
  
  let embedworm = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`**Selled ${quantity}x Worm ${emojis.worm} For ${emojis.troll_coin} ${totalworm}**`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedworm]})
}

if (item === 'iron') {

  let iron = await items.get(`${user.id}.iron`)
  
if (iron < quantity) return interaction.editReply({content: "**You didn't Have That Much Iron To Sell**", ephemeral: true })

let totaliron = values.iron * quantity;

  await items.sub(`${user.id}.iron`, quantity)

  await currency.sub(`${user.id}.inventory_worth`, values.iron)

await currency.add(`${user.id}.balance`, totaliron)
  
  let embediron = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`**Selled ${quantity}x Iron ${emojis.iron} For ${emojis.troll_coin} ${totaliron}**`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embediron]})
}
    
if (item === 'fossil') {

  let fossil = await items.get(`${user.id}.fossil`)
  
if (fossil < quantity) return interaction.editReply({content: "**You didn't Have That Much Fossil To Sell**", ephemeral: true })

let totalfossil = values.fossil * quantity;

  await items.sub(`${user.id}.fossil`, quantity)

  await currency.sub(`${user.id}.inventory_worth`, values.fossil)

await currency.add(`${user.id}.balance`, totalfossil)
  
  let embedfossil = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`**Selled ${quantity}x Fossil ${emojis.fossil} For ${emojis.troll_coin} ${totalfossil}**`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedfossil]})
}

if (item === 'jacko') {

  let jacko = await items.get(`${user.id}.Jacko_lantern`)
  
if (jacko < quantity) return interaction.editReply({content: "**You didn't Have That Much Jack-o'-lantern To Sell**", ephemeral: true })

let totaljacko = values.jacko * quantity;

  await items.sub(`${user.id}.Jacko_lantern`, quantity)

  await currency.sub(`${user.id}.inventory_worth`, values.jacko)

await currency.add(`${user.id}.balance`, totaljacko)
  
  let embedjacko = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`**Selled ${quantity}x Jack-o'-lantern ${emojis.jacko} For ${emojis.troll_coin} ${totaljacko}**`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedjacko]})
}

if (item === 'toilet_paper') {

  let toilet_paper = await items.get(`${user.id}.toilet_paper`)
  
if (toilet_paper < quantity) return interaction.editReply({content: "**You didn't Have That Much Toilet Paper To Sell**", ephemeral: true })

let totalpaper = values.toilet_paper * quantity;

  await items.sub(`${user.id}.toilet_paper`, quantity)

  await currency.sub(`${user.id}.inventory_worth`, values.toilet_paper)

await currency.add(`${user.id}.balance`, totalpaper)
  
  let embedpaper = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`**Selled ${quantity}x Toilet Paper ${emojis.toilet_paper} For ${emojis.troll_coin} ${totalpaper}**`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedpaper]})
}

  if (item === 'cool_meow') {

  let cool_meow = await items.get(`${user.id}.cool_meow`)
  
if (cool_meow < quantity) return interaction.editReply({content: "**You didn't Have That Much Cool Meow To Sell**", ephemeral: true })

let totalmeow = values.cool_meow * quantity;

  await items.sub(`${user.id}.cool_meow`, quantity)

  await currency.sub(`${user.id}.inventory_worth`, values.cool_meow)

await currency.add(`${user.id}.balance`, totalmeow)
  
  let embedmeow = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`**Selled ${quantity}x Cool Meow ${emojis.cool_meow} For ${emojis.troll_coin} ${totalmeow}**`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedmeow]})
  }

if (item === 'troll_sword') {

  let troll_sword = await items.get(`${user.id}.troll_sword`)
  
if (troll_sword < quantity) return interaction.editReply({content: "**You didn't Have That Much Troll Sword To Sell**", ephemeral: true })

let totalsword = values.troll_sword * quantity;

  await items.sub(`${user.id}.troll_sword`, quantity)

  await currency.sub(`${user.id}.inventory_worth`, values.troll_sword)

await currency.add(`${user.id}.balance`, totalsword)
  
  let embedsword = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`**Selled ${quantity}x Troll Sword ${emojis.troll_sword} For ${emojis.troll_coin} ${totalsword}**`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedsword]})
}

if (item === 'golden_troll_coin') {

  let golden_troll_coin = await items.get(`${user.id}.golden_troll_coin`)
  
if (golden_troll_coin < quantity) return interaction.editReply({content: "**You didn't Have That Much Golden Troll Coin To Sell**", ephemeral: true })

let totalcoin = values.golden_troll_coin * quantity;

  await items.sub(`${user.id}.golden_troll_coin`, quantity)

  await currency.sub(`${user.id}.inventory_worth`, values.golden_troll_coin)

await currency.add(`${user.id}.balance`, totalcoin)
  
  let embedcoin = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`**Selled ${quantity}x Golden Troll Coin ${emojis.golden_troll_coin} For ${emojis.troll_coin} ${totalcoin}**`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedcoin]})
}

if (item === 'troll_crown') {

  let troll_crown = await items.get(`${user.id}.troll_crown`)
  
if (troll_crown < quantity) return interaction.editReply({content: "**You didn't Have That Much Troll Crown To Sell**", ephemeral: true })

let totalcrown = values.troll_crown * quantity;

  await items.sub(`${user.id}.troll_crown`, quantity)

  await currency.sub(`${user.id}.inventory_worth`, values.troll_crown)

await currency.add(`${user.id}.balance`, totalcrown)
  
  let embedcrown = new EmbedBuilder()
                .setColor(embeds.color)
.setDescription(`**Selled ${quantity}x Troll Crown ${emojis.troll_crown} For ${emojis.troll_coin} ${totalcrown}**`)
.setFooter({text: `${embeds.footer}`});

  interaction.editReply({embeds: [embedcrown]})
    }
    
	},
}