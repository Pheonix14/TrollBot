const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");
const { admins } = require("./../config/settings.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('settings-titles')
		.setDescription('💎 set a cool title on your profile')
   .addStringOption(option => option.setName('title').setDescription('choose a option').setRequired(true)
  .addChoices(
{ name: 'Halloween Player', value: 'hallo22' },
    { name: 'Robber', value: 'robber' },
    { name: 'Poor Beggar', value: 'beggar' },
    { name: 'Top Criminal', value: 'criminal' },
    { name: 'Pro Gambler', value: 'gambler' },
    { name: 'The King', value: 'king' },
    { name: 'A Warrior', value: 'warrior' },
    { name: 'Gold Investor', value: 'gold_invest' },
)),
	async execute(interaction, client) {

const db = require("./../database/connect.js");
    
  

const user = interaction.user;
    
const settings = db.table("settings");

const titles = db.table("titles");

 const items = db.table("items");

let register = await settings.get(`${user.id}.register`)

if (register === undefined) register = 'false';
    
    if (register === 'false') {
return interaction.editReply(`**${emojis.cross} Use /register To Register Your Account In My Database**`)
    }
    
const title = interaction.options.getString('title');

let phone = await items.get(`${user.id}.phone`)

  if (phone === undefined) phone = 0;


if (phone === 0) {
  return interaction.editReply("**You Need A Phone To Use This Command. Tip: use /shop and /buy to buy a phone**")
}

  if (title === "hallo22") {
    
let hallo22 = await titles.get(`${user.id}.halloween_2022`)

if (hallo22 === undefined) hallo22 = 'false';

if (hallo22 === 'false') {
  interaction.editReply("**you didn't have this title**")
} else {
  await settings.set(`${user.id}.title`, 'Halloween Player')
 interaction.editReply("**Successfully Set** ***Halloween Player*** **Title**")

}
    
  }

if (title === "robber") {
    
let robber = await titles.get(`${user.id}.robber`)

if (robber === undefined) robber = 'false';

if (robber === 'false') {
  interaction.editReply("**you didn't have this title**")
} else {
  await settings.set(`${user.id}.title`, 'Robber')
 interaction.editReply("**Successfully Set** ***Robber*** **Title**")

}
    
}

    if (title === "beggar") {
    
let beggar = await titles.get(`${user.id}.beggar`)

if (beggar === undefined) beggar = 'false';

if (beggar === 'false') {
  interaction.editReply("**you didn't have this title**")
} else {
  await settings.set(`${user.id}.title`, 'Poor Beggar')
 interaction.editReply("**Successfully Set** ***Poor Beggar*** **Title**")

}
    
    }

if (title === "criminal") {
    
let criminal = await titles.get(`${user.id}.criminal`)

if (criminal === undefined) criminal = 'false';

if (criminal === 'false') {
  interaction.editReply("**you didn't have this title**")
} else {
  await settings.set(`${user.id}.title`, 'Top Criminal')
 interaction.editReply("**Successfully Set** ***Top Criminal*** **Title**")

}
    
}

if (title === "gambler") {
    
let gambler = await titles.get(`${user.id}.gambler`)

if (gambler === undefined) gambler = 'false';

if (gambler === 'false') {
  interaction.editReply("**you didn't have this title**")
} else {
  await settings.set(`${user.id}.title`, 'Pro Gambler')
 interaction.editReply("**Successfully Set** ***Pro Gambler*** **Title**")

}
    
}

if (title === "king") {
    
let king = await titles.get(`${user.id}.king`)

if (king === undefined) king = 'false';

if (king === 'false') {
  interaction.editReply("**you didn't have this title**")
} else {
  await settings.set(`${user.id}.title`, 'The King')
 interaction.editReply("**Successfully Set** ***The King*** **Title**")

}
    
}

if (title === "warrior") {
    
let warrior = await titles.get(`${user.id}.warrior`)

if (warrior === undefined) warrior = 'false';

if (warrior === 'false') {
  interaction.editReply("you didn't have this title")
} else {
  await settings.set(`${user.id}.title`, 'A Warrior')
 interaction.editReply("**Successfully Set** ***A Warrior*** **Title**")

}
    
}

if (title === "gold_invest") {
    
let gold_invest = await titles.get(`${user.id}.gold_invest`)

if (gold_invest === undefined) gold_invest = 'false';

if (gold_invest === 'false') {
  interaction.editReply("**you didn't have this title**")
} else {
  await settings.set(`${user.id}.title`, 'Gold Investor')
 interaction.editReply("**Successfully Set** ***Gold Investor*** **Title**")

}
    
}
    
	},
}