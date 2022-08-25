const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB({ filePath: "././database/database.sqlite" });
const ms = require("ms");
const emojis = require("./../config/emojis.json");
const embeds = require("./../config/embed.json");



module.exports = {
	data: new SlashCommandBuilder()
		.setName('fish')
		.setDescription('🎣 Fish And Catch Some Fishes'),
                   
	async execute(interaction, client) {
await interaction.deferReply();

const economy = db.table("economy");

  let user = interaction.user;

let register = await economy.get(`${user.id}.register`)

if (register === undefined) register = 'false';
    
    if (register === 'false') {
return interaction.editReply(`${emojis.cross} Use /register To Register Your Account In My Database`)
    }

    
let fishingrod = await economy.get(`${user.id}.fishing_rod`)

    if (fishingrod === undefined) {
      return interaction.editReply(`${emojis.cross} You Didn't Have A Fishing Rod`)
    }

        let timeout = 20000;
        let fish = await economy.get(`${user.id}.fish`);

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
  
await economy.add(`${user.id}.junk`, 1)

await economy.add(`${user.id}.fishes`, 1)

await economy.set(`${user.id}.fish`, Date.now())
  

let embed2 = new EmbedBuilder()
                .setColor(embeds.color)
      .setDescription(`You Got A ${emojis.junk} Junk While Fishing`)
          .setFooter({text: `${embeds.footer}`})
            return interaction.editReply({embeds: [embed2]}) 


}
    
if (fishes[result] === 'Common Fish') {


  await economy.add(`${user.id}.common_fish`, 1)

await economy.add(`${user.id}.fishes`, 1)

await economy.set(`${user.id}.fish`, Date.now())
  

let embed3 = new EmbedBuilder()
                .setColor(embeds.color)
      .setDescription(`You Got A ${emojis.common_fish} Common Fish While Fishing`)
          .setFooter({text: `${embeds.footer}`})
            return interaction.editReply({embeds: [embed3]}) 


}

  if (fishes[result] === 'Uncommon Fish') {


    await economy.add(`${user.id}.uncommon_fish`, 1)

await economy.add(`${user.id}.fishes`, 1)

await economy.set(`${user.id}.fish`, Date.now())
  

let embed4 = new EmbedBuilder()
                .setColor(embeds.color)
      .setDescription(`You Got A ${emojis.uncommon_fish} Uncommon Fish While Fishing`)
          .setFooter({text: `${embeds.footer}`})
            return interaction.editReply({embeds: [embed4]}) 


  }

if (fishes[result] === 'Rare Fish') {

  await economy.add(`${user.id}.rare_fish`, 1)

await economy.add(`${user.id}.fishes`, 1)

await economy.set(`${user.id}.fish`, Date.now())

let embed5 = new EmbedBuilder()
                .setColor(embeds.color)
      .setDescription(`You Got A ${emojis.rare_fish} Rare Fish While Fishing`)
          .setFooter({text: `${embeds.footer}`})
            return interaction.editReply({embeds: [embed5]}) 

  
}

    if (fishes[result] === 'Legendary Fish') {
  
await economy.add(`${user.id}.legendary_fish`, 1)

await economy.add(`${user.id}.fishes`, 1)

await economy.set(`${user.id}.fish`, Date.now())
  
      
let embed6 = new EmbedBuilder()
                .setColor(embeds.color)
      .setDescription(`You Got A ${emojis.legendary_fish} Legendary Fish While Fishing`)
          .setFooter({text: `${embeds.footer}`})
            return interaction.editReply({embeds: [embed6]}) 


}
    
	},
   }