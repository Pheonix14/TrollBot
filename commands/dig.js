const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB({ filePath: "././database/database.sqlite" });
const ms = require("ms");
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");
const values = require("./../JSON/values.json");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('dig')
		.setDescription('⛏️ Dig And Get Some Items'),
                   
	async execute(interaction, client) {
await interaction.deferReply();

const economy = db.table("economy");

  let user = interaction.user;

let register = await economy.get(`${user.id}.register`)

if (register === undefined) register = 'false';
    
    if (register === 'false') {
return interaction.editReply(`${emojis.cross} Use /register To Register Your Account In My Database`)
    }

    
let shovel = await economy.get(`${user.id}.shovel`)

    if (shovel === undefined) {
      return interaction.editReply(`${emojis.cross} You Didn't Have A Shovel`)
    }

        let timeout = 20000;
        let dig = await economy.get(`${user.id}.dig`);

        if (dig !== undefined && timeout - (Date.now() - dig) > 0) {
            let time = ms(timeout - (Date.now() - dig));

            let embed1 = new EmbedBuilder()
                .setColor(embeds.color)
                .setDescription(`${emojis.cross} You've Already Dig And Collected Reward\n\nDig Again In ${time}`)
          .setFooter({text: `${embeds.footer}`})
            return interaction.editReply({embeds: [embed1]})
        } 

const items = ["Dirt", "Sand", "Worm", "Iron", "Fossil"];

    let result = Math.floor(Math.random() * items.length);

if (items[result] === 'Dirt') {
  
await economy.add(`${user.id}.dirt`, 1)

await economy.add(`${user.id}.digs`, 1)

await economy.add(`${user.id}.inventory_worth`, values.dirt)
  
await economy.set(`${user.id}.dig`, Date.now())
  

let embed2 = new EmbedBuilder()
                .setColor(embeds.color)
      .setDescription(`You Got ${emojis.dirt} Dirt While Digging`)
          .setFooter({text: `${embeds.footer}`})
            return interaction.editReply({embeds: [embed2]}) 


}
    
if (items[result] === 'Sand') {


  await economy.add(`${user.id}.sand`, 1)

await economy.add(`${user.id}.digs`, 1)

await economy.add(`${user.id}.inventory_worth`, values.sand)
  
await economy.set(`${user.id}.dig`, Date.now())
  

let embed3 = new EmbedBuilder()
                .setColor(embeds.color)
      .setDescription(`You Got ${emojis.sand} Sand While Digging`)
          .setFooter({text: `${embeds.footer}`})
            return interaction.editReply({embeds: [embed3]}) 


}

  if (items[result] === 'Worm') {


    await economy.add(`${user.id}.worm`, 1)

await economy.add(`${user.id}.digs`, 1)

await economy.add(`${user.id}.inventory_worth`, values.worm)
    
await economy.set(`${user.id}.dig`, Date.now())
  

let embed4 = new EmbedBuilder()
                .setColor(embeds.color)
      .setDescription(`You Got A ${emojis.worm} Worm While Digging`)
          .setFooter({text: `${embeds.footer}`})
            return interaction.editReply({embeds: [embed4]}) 


  }

if (items[result] === 'Irom') {

  await economy.add(`${user.id}.iron`, 1)

await economy.add(`${user.id}.digs`, 1)

await economy.add(`${user.id}.inventory_worth`, values.iron)
  
await economy.set(`${user.id}.dig`, Date.now())

let embed5 = new EmbedBuilder()
                .setColor(embeds.color)
      .setDescription(`You Got A ${emojis.iron} Iron While Digging`)
          .setFooter({text: `${embeds.footer}`})
            return interaction.editReply({embeds: [embed5]}) 

  
}

    if (items[result] === 'Fossil') {
  
await economy.add(`${user.id}.fossil`, 1)

await economy.add(`${user.id}.digs`, 1)

await economy.add(`${user.id}.inventory_worth`, values.fossil)
      
await economy.set(`${user.id}.dig`, Date.now())
  
      
let embed6 = new EmbedBuilder()
                .setColor(embeds.color)
      .setDescription(`You Got A ${emojis.fossil} Fossil While Digging`)
          .setFooter({text: `${embeds.footer}`})
            return interaction.editReply({embeds: [embed6]}) 


}
    
	},
  }