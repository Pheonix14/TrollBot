const emojis = require("./../config/emojis.json");
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
					.setCustomId('digbutton')
					.setLabel('Dig Again')
					.setEmoji(emojis.shovel)
        .setStyle(ButtonStyle.Secondary),
			);
    
const currency = db.table("currency");

const settings = db.table("settings")

const items = db.table("items");

const times = db.table("times");

const counts = db.table("counts");
    
if (interaction.customId === 'digbutton') {

await interaction.deferUpdate();
  
  let user = interaction.user;

let register = await settings.get(`${user.id}.register`)

if (register === undefined) register = 'false';
    
    if (register === 'false') {
return interaction.followUp({content: `**${emojis.cross} Use /register To Register Your Account In My Database**`, ephemeral: true})
    }

    
let shovel = await items.get(`${user.id}.shovel`)

if (shovel === undefined) shovel = 0;
    
    if (shovel === 0) {
      return interaction.followUp({content: "**You Didn't Have A Shovel**", ephemeral: true})
    }

        let timeout = 20000;
        let dig = await times.get(`${user.id}.dig`);

        if (dig !== undefined && timeout - (Date.now() - dig) > 0) {
            let time = ms(timeout - (Date.now() - dig));

            let embed1 = new EmbedBuilder()
                .setColor(embeds.color)
                .setDescription(`**You've Already Dig And Collected Reward\n\nDig Again In ${time}**`)
          .setFooter({text: `${user.tag}`})
            return interaction.followUp({embeds: [embed1], ephemeral: true})
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
      .setDescription(`**You Got ${emojis.dirt} Dirt While Digging**`)
          .setFooter({text: `${user.tag}`})
            return interaction.followUp({embeds: [embed2], components: [row]}) 


}
    
if (item[result] === 'Sand') {


  await items.add(`${user.id}.sand`, 1)

await counts.add(`${user.id}.digs`, 1)

await currency.add(`${user.id}.inventory_worth`, values.sand)
  
await times.set(`${user.id}.dig`, Date.now())
  

let embed3 = new EmbedBuilder()
                .setColor(embeds.color)
      .setDescription(`**You Got ${emojis.sand} Sand While Digging**`)
          .setFooter({text: `${user.tag}`})
            return interaction.followUp({embeds: [embed3], components: [row]}) 


}

  if (item[result] === 'Worm') {


    await items.add(`${user.id}.worm`, 1)

await counts.add(`${user.id}.digs`, 1)

await currency.add(`${user.id}.inventory_worth`, values.worm)
    
await times.set(`${user.id}.dig`, Date.now())
  

let embed4 = new EmbedBuilder()
                .setColor(embeds.color)
      .setDescription(`**You Got A ${emojis.worm} Worm While Digging**`)
          .setFooter({text: `${user.tag}`})
            return interaction.followUp({embeds: [embed4], components: [row]}) 


  }

if (item[result] === 'Irom') {

  await items.add(`${user.id}.iron`, 1)

await counts.add(`${user.id}.digs`, 1)

await currency.add(`${user.id}.inventory_worth`, values.iron)
  
await times.set(`${user.id}.dig`, Date.now())

let embed5 = new EmbedBuilder()
                .setColor(embeds.color)
      .setDescription(`**You Got A ${emojis.iron} Iron While Digging**`)
          .setFooter({text: `${user.tag}`})
            return interaction.followUp({embeds: [embed5], components: [row]}) 

  
}

    if (item[result] === 'Fossil') {
  
await items.add(`${user.id}.fossil`, 1)

await counts.add(`${user.id}.digs`, 1)

await currency.add(`${user.id}.inventory_worth`, values.fossil)
      
await times.set(`${user.id}.dig`, Date.now())
  
      
let embed6 = new EmbedBuilder()
                .setColor(embeds.color)
      .setDescription(`**You Got A ${emojis.fossil} Fossil While Digging**`)
          .setFooter({text: `${user.tag}`})
            return interaction.followUp({embeds: [embed6], components: [row]}) 


}

if (item[result] === 'Nothing') {
  

await counts.add(`${user.id}.digs`, 1)
await items.sub(`${user.id}.shovel`, 1)
await currency.sub(`${user.id}.inventory_worth`, values.shovel)
  
await times.set(`${user.id}.dig`, Date.now())
  

let embed7 = new EmbedBuilder()
                .setColor(embeds.color)
      .setDescription(`**You Got Nothing And Your Shovel Broke While Digging**`)
          .setFooter({text: `${user.tag}`})
            return interaction.followUp({embeds: [embed7], components: [row]}) 


}

}
    
      });

}