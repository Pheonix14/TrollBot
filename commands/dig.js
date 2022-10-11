const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ms = require("ms");
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");
const values = require("./../JSON/values.json");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('dig')
		.setDescription('⛏️ Dig And Get Some Items'),
                   
	async execute(interaction, client) {

const db = require("./../database/connect.js");


const currency = db.table("currency");

const settings = db.table("settings")

const items = db.table("items");

const times = db.table("times");

const counts = db.table("counts");

  let user = interaction.user;

let register = await settings.get(`${user.id}.register`)

if (register === undefined) register = 'false';
    
    if (register === 'false') {
return interaction.editReply(`${emojis.cross} Use /register To Register Your Account In My Database`)
    }

    
let shovel = await items.get(`${user.id}.shovel`)

    if (shovel === undefined) {
      return interaction.editReply(`${emojis.cross} You Didn't Have A Shovel`)
    }

        let timeout = 20000;
        let dig = await times.get(`${user.id}.dig`);

        if (dig !== undefined && timeout - (Date.now() - dig) > 0) {
            let time = ms(timeout - (Date.now() - dig));

            let embed1 = new EmbedBuilder()
                .setColor(embeds.color)
                .setDescription(`${emojis.cross} You've Already Dig And Collected Reward\n\nDig Again In ${time}`)
          .setFooter({text: `${embeds.footer}`})
            return interaction.editReply({embeds: [embed1]})
        } 

const item = ["Dirt", "Sand", "Worm", "Iron", "Fossil", "Nothing"];

    let result = Math.floor(Math.random() * item.length);

if (item[result] === 'Dirt') {
  
await items.add(`${user.id}.dirt`, 1)

await counts.add(`${user.id}.digs`, 1)

await currency.add(`${user.id}.inventory_worth`, values.dirt)
  
await times.set(`${user.id}.dig`, Date.now())
  

let embed2 = new EmbedBuilder()
                .setColor(embeds.color)
      .setDescription(`You Got ${emojis.dirt} Dirt While Digging`)
          .setFooter({text: `${embeds.footer}`})
            return interaction.editReply({embeds: [embed2]}) 


}
    
if (item[result] === 'Sand') {


  await items.add(`${user.id}.sand`, 1)

await counts.add(`${user.id}.digs`, 1)

await currency.add(`${user.id}.inventory_worth`, values.sand)
  
await times.set(`${user.id}.dig`, Date.now())
  

let embed3 = new EmbedBuilder()
                .setColor(embeds.color)
      .setDescription(`You Got ${emojis.sand} Sand While Digging`)
          .setFooter({text: `${embeds.footer}`})
            return interaction.editReply({embeds: [embed3]}) 


}

  if (item[result] === 'Worm') {


    await items.add(`${user.id}.worm`, 1)

await counts.add(`${user.id}.digs`, 1)

await currency.add(`${user.id}.inventory_worth`, values.worm)
    
await times.set(`${user.id}.dig`, Date.now())
  

let embed4 = new EmbedBuilder()
                .setColor(embeds.color)
      .setDescription(`You Got A ${emojis.worm} Worm While Digging`)
          .setFooter({text: `${embeds.footer}`})
            return interaction.editReply({embeds: [embed4]}) 


  }

if (item[result] === 'Irom') {

  await items.add(`${user.id}.iron`, 1)

await counts.add(`${user.id}.digs`, 1)

await currency.add(`${user.id}.inventory_worth`, values.iron)
  
await times.set(`${user.id}.dig`, Date.now())

let embed5 = new EmbedBuilder()
                .setColor(embeds.color)
      .setDescription(`You Got A ${emojis.iron} Iron While Digging`)
          .setFooter({text: `${embeds.footer}`})
            return interaction.editReply({embeds: [embed5]}) 

  
}

    if (item[result] === 'Fossil') {
  
await items.add(`${user.id}.fossil`, 1)

await counts.add(`${user.id}.digs`, 1)

await currency.add(`${user.id}.inventory_worth`, values.fossil)
      
await times.set(`${user.id}.dig`, Date.now())
  
      
let embed6 = new EmbedBuilder()
                .setColor(embeds.color)
      .setDescription(`You Got A ${emojis.fossil} Fossil While Digging`)
          .setFooter({text: `${embeds.footer}`})
            return interaction.editReply({embeds: [embed6]}) 


}

if (item[result] === 'Nothing') {
  

await counts.add(`${user.id}.digs`, 1)
await items.sub(`${user.id}.shovel`, 1)
await currency.sub(`${user.id}.inventory_worth`, values.shovel)
  
await times.set(`${user.id}.dig`, Date.now())
  

let embed7 = new EmbedBuilder()
                .setColor(embeds.color)
      .setDescription(`You Got Nothing And Your Shovel Broke While Digging`)
          .setFooter({text: `${embeds.footer}`})
            return interaction.editReply({embeds: [embed7]}) 


}
    
	},
  }