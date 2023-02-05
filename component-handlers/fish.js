const emojis = require("./../config/emojis.json");
const config = require("./../config/config.json");
const values = require("./../JSON/values.json");
const embeds = require("./../config/embed.json");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const ms = require('ms');

module.exports = client => {

  client.on('interactionCreate', async interaction => { 

if (!interaction.isButton()) return;

const db = require("./../database/connect.js");
    
const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('fishbutton')
					.setLabel('Fish Again')
					.setEmoji(emojis.fishing_rod)
        .setStyle(ButtonStyle.Secondary),
			);
    
const currency = db.table("currency");

const settings = db.table("settings")

const items = db.table("items");

const times = db.table("times");

const counts = db.table("counts");
    
if (interaction.customId === 'fishbutton') {

await interaction.deferUpdate();
  
  let user = interaction.user;

if(config.settings.maintenance) {
if (!config.settings.admins.includes(interaction.user.id)) return interaction.followUp(`**Bot Is Under Maintenance. Please Try Again Leter**`)
}
  
let register = await settings.get(`${user.id}.register`)

if (register === undefined) register = 'false';
    
    if (register === 'false') {
return interaction.followUp({content: `**${emojis.cross} Use /register To Register Your Account In My Database**`, ephemeral: true})
    }

    
let fishingrod = await items.get(`${user.id}.fishing_rod`)

if (fishingrod === undefined) fishingrod = 0;
  
    if (fishingrod === 0) {
      return interaction.followUp({content: "**You Didn't Have A Fishing Rod**", ephemeral: true })
    }

        let timeout = 20000;
        let fish = await times.get(`${user.id}.fish`);

        if (fish !== undefined && timeout - (Date.now() - fish) > 0) {
            let time = ms(timeout - (Date.now() - fish));

            let embed1 = new EmbedBuilder()
                .setColor(embeds.color)
                .setDescription(`**You've Already Fish And Collected Reward\n\nFish Again In ${time}**`)
          .setFooter({text: `${user.tag}`})
            return interaction.followUp({embeds: [embed1], ephemeral: true})
        } 

  
const fishes = ["Junk", "Common Fish", "Uncommon Fish", "Rare Fish", "Legendary Fish", "Nothing"];

    let result = Math.floor(Math.random() * fishes.length);

if (fishes[result] === 'Junk') {
  
await items.add(`${user.id}.junk`, 1)

await counts.add(`${user.id}.fishes`, 1)

await currency.add(`${user.id}.inventory_worth`, values.junk)
  
await times.set(`${user.id}.fish`, Date.now())
  

let embed2 = new EmbedBuilder()
                .setColor(embeds.color)
      .setDescription(`**You Got A ${emojis.junk} Junk While Fishing**`)
          .setFooter({text: `${user.tag}`})
            return interaction.followUp({embeds: [embed2], components: [row]}) 


}
    
if (fishes[result] === 'Common Fish') {


  await items.add(`${user.id}.common_fish`, 1)

await counts.add(`${user.id}.fishes`, 1)

await currency.add(`${user.id}.inventory_worth`, values.common_fish)
  
await times.set(`${user.id}.fish`, Date.now())
  

let embed3 = new EmbedBuilder()
                .setColor(embeds.color)
      .setDescription(`**You Got A ${emojis.common_fish} Common Fish While Fishing**`)
          .setFooter({text: `${user.tag}`})
            return interaction.followUp({embeds: [embed3], components: [row]}) 


}

  if (fishes[result] === 'Uncommon Fish') {


    await items.add(`${user.id}.uncommon_fish`, 1)

await counts.add(`${user.id}.fishes`, 1)

await currency.add(`${user.id}.inventory_worth`, values.uncommon_fish)
    
await times.set(`${user.id}.fish`, Date.now())
  

let embed4 = new EmbedBuilder()
                .setColor(embeds.color)
      .setDescription(`**You Got A ${emojis.uncommon_fish} Uncommon Fish While Fishing**`)
          .setFooter({text: `${user.tag}`})
            return interaction.followUp({embeds: [embed4], components: [row]}) 


  }

if (fishes[result] === 'Rare Fish') {

  await items.add(`${user.id}.rare_fish`, 1)

await counts.add(`${user.id}.fishes`, 1)

await currency.add(`${user.id}.inventory_worth`, values.rare_fish)
  
await times.set(`${user.id}.fish`, Date.now())

let embed5 = new EmbedBuilder()
                .setColor(embeds.color)
      .setDescription(`**You Got A ${emojis.rare_fish} Rare Fish While Fishing**`)
          .setFooter({text: `${user.tag}`})
            return interaction.followUp({embeds: [embed5], components: [row]}) 

  
}

    if (fishes[result] === 'Legendary Fish') {
  
await items.add(`${user.id}.legendary_fish`, 1)

await counts.add(`${user.id}.fishes`, 1)

await currency.add(`${user.id}.inventory_worth`, values.legendary_fish)
      
await times.set(`${user.id}.fish`, Date.now())
  
      
let embed6 = new EmbedBuilder()
                .setColor(embeds.color)
      .setDescription(`**You Got A ${emojis.legendary_fish} Legendary Fish While Fishing**`)
          .setFooter({text: `${user.tag}`})
            return interaction.followUp({embeds: [embed6], components: [row]}) 


}

if (fishes[result] === 'Nothing') {
  

await counts.add(`${user.id}.fishes`, 1)

await items.sub(`${user.id}.fishing_rod`, 1)
await currency.sub(`${user.id}.inventory_worth`, values.fishing_rod)
      
await times.set(`${user.id}.fish`, Date.now())
  
      
let embed7 = new EmbedBuilder()
                .setColor(embeds.color)
      .setDescription(`**You Got Nothing And Your Fishing Rod Broke While Fishing**`)
          .setFooter({text: `${user.tag}`})
            return interaction.followUp({embeds: [embed7], components: [row]}) 


}
}
    
      });

}