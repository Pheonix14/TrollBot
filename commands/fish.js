const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ms = require("ms");
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");
const values = require("./../JSON/values.json");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('fish')
		.setDescription('🎣 Fish And Catch Some Fishes'),
                   
	async execute(interaction, client) {

const db = require("./../database/connect.js");
    
await interaction.deferReply();

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

    
let fishingrod = await items.get(`${user.id}.fishing_rod`)

    if (fishingrod === undefined) {
      return interaction.editReply(`${emojis.cross} You Didn't Have A Fishing Rod`)
    }

        let timeout = 20000;
        let fish = await times.get(`${user.id}.fish`);

        if (fish !== undefined && timeout - (Date.now() - fish) > 0) {
            let time = ms(timeout - (Date.now() - fish));

            let embed1 = new EmbedBuilder()
                .setColor(embeds.color)
                .setDescription(`${emojis.cross} You've Already Fish And Collected Reward\n\nFish Again In ${time}`)
          .setFooter({text: `${embeds.footer}`})
            return interaction.editReply({embeds: [embed1]})
        } 

const fishes = ["Junk", "Common Fish", "Uncommon Fish", "Rare Fish", "Legendary Fish"];

    let result = Math.floor(Math.random() * fishes.length);

if (fishes[result] === 'Junk') {
  
await items.add(`${user.id}.junk`, 1)

await counts.add(`${user.id}.fishes`, 1)

await currency.add(`${user.id}.inventory_worth`, values.junk)
  
await times.set(`${user.id}.fish`, Date.now())
  

let embed2 = new EmbedBuilder()
                .setColor(embeds.color)
      .setDescription(`You Got A ${emojis.junk} Junk While Fishing`)
          .setFooter({text: `${embeds.footer}`})
            return interaction.editReply({embeds: [embed2]}) 


}
    
if (fishes[result] === 'Common Fish') {


  await items.add(`${user.id}.common_fish`, 1)

await counts.add(`${user.id}.fishes`, 1)

await currency.add(`${user.id}.inventory_worth`, values.common_fish)
  
await times.set(`${user.id}.fish`, Date.now())
  

let embed3 = new EmbedBuilder()
                .setColor(embeds.color)
      .setDescription(`You Got A ${emojis.common_fish} Common Fish While Fishing`)
          .setFooter({text: `${embeds.footer}`})
            return interaction.editReply({embeds: [embed3]}) 


}

  if (fishes[result] === 'Uncommon Fish') {


    await items.add(`${user.id}.uncommon_fish`, 1)

await counts.add(`${user.id}.fishes`, 1)

await currency.add(`${user.id}.inventory_worth`, values.uncommon_fish)
    
await times.set(`${user.id}.fish`, Date.now())
  

let embed4 = new EmbedBuilder()
                .setColor(embeds.color)
      .setDescription(`You Got A ${emojis.uncommon_fish} Uncommon Fish While Fishing`)
          .setFooter({text: `${embeds.footer}`})
            return interaction.editReply({embeds: [embed4]}) 


  }

if (fishes[result] === 'Rare Fish') {

  await items.add(`${user.id}.rare_fish`, 1)

await counts.add(`${user.id}.fishes`, 1)

await currency.add(`${user.id}.inventory_worth`, values.rare_fish)
  
await times.set(`${user.id}.fish`, Date.now())

let embed5 = new EmbedBuilder()
                .setColor(embeds.color)
      .setDescription(`You Got A ${emojis.rare_fish} Rare Fish While Fishing`)
          .setFooter({text: `${embeds.footer}`})
            return interaction.editReply({embeds: [embed5]}) 

  
}

    if (fishes[result] === 'Legendary Fish') {
  
await items.add(`${user.id}.legendary_fish`, 1)

await counts.add(`${user.id}.fishes`, 1)

await currency.add(`${user.id}.inventory_worth`, values.legendary_fish)
      
await times.set(`${user.id}.fish`, Date.now())
  
      
let embed6 = new EmbedBuilder()
                .setColor(embeds.color)
      .setDescription(`You Got A ${emojis.legendary_fish} Legendary Fish While Fishing`)
          .setFooter({text: `${embeds.footer}`})
            return interaction.editReply({embeds: [embed6]}) 


}
    
	},
   }